import React, { createContext, useContext, useEffect, useState } from 'react';
import { profileApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';

interface Address {
  id: number;
  label: string;
  recipient_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

interface UserSettings {
  email_notifications: boolean;
  sms_notifications: boolean;
  newsletter_subscription: boolean;
  two_factor_auth: boolean;
  language: string;
  currency: string;
}

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  bio: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface CompleteProfile {
  user: UserProfile;
  addresses: Address[];
  settings: UserSettings;
}

interface ProfileContextType {
  profile: CompleteProfile | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateAvatar: (avatarUrl: string) => Promise<void>;
  addAddress: (address: Omit<Address, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateAddress: (id: number, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  setDefaultAddress: (id: number) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔄 Refreshing profile...');
      const response = await profileApi.getProfile();
      console.log('✅ Profile response:', response);

      if (response.success) {
        setProfile(response.data);
      }
    } catch (error: any) {
      console.error('❌ Profile refresh error:', error);
      toast({
        title: "Failed to load profile",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, [user]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      console.log('🔄 Updating profile with data:', data);
      const response = await profileApi.updateProfile(data);
      if (response.success) {
        setProfile(prev => prev ? {
          ...prev,
          user: { ...prev.user, ...data }
        } : null);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateAvatar = async (avatarUrl: string) => {
    try {
      const response = await profileApi.updateAvatar(avatarUrl);
      if (response.success) {
        setProfile(prev => prev ? {
          ...prev,
          user: { ...prev.user, avatar_url: avatarUrl }
        } : null);
        toast({
          title: "Avatar Updated",
          description: "Your avatar has been updated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

const addAddress = async (addressData: Omit<Address, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const response = await profileApi.createAddress(addressData);
    if (response.success) {
      await refreshProfile(); // Refresh to get the new address with ID
      toast({
        title: "Address Added",
        description: "Your address has been added successfully",
      });
    }
  } catch (error: any) {
    toast({
      title: "Add Failed",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
};

const updateAddress = async (id: number, addressData: Partial<Address>) => {
  try {
    const response = await profileApi.updateAddress(id, addressData);
    if (response.success) {
      await refreshProfile(); // Refresh to get updated addresses
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully",
      });
    }
  } catch (error: any) {
    toast({
      title: "Update Failed",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
};

const deleteAddress = async (id: number) => {
  try {
    const response = await profileApi.deleteAddress(id);
    if (response.success) {
      setProfile(prev => prev ? {
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== id)
      } : null);
      toast({
        title: "Address Deleted",
        description: "Your address has been deleted successfully",
      });
    }
  } catch (error: any) {
    toast({
      title: "Delete Failed",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
};

const setDefaultAddress = async (id: number) => {
  try {
    const response = await profileApi.setDefaultAddress(id);
    if (response.success) {
      await refreshProfile(); // Refresh to get updated default status
      toast({
        title: "Default Address Set",
        description: "Your default address has been updated successfully",
      });
    }
  } catch (error: any) {
    toast({
      title: "Update Failed",
      description: error.message || "Something went wrong",
      variant: "destructive",
    });
    throw error;
  }
};

  const updateSettings = async (settingsData: Partial<UserSettings>) => {
    try {
      console.log('🔄 Updating settings with data:', settingsData);
      const response = await profileApi.updateSettings(settingsData);
      if (response.success) {
        setProfile(prev => prev ? {
          ...prev,
          settings: { ...prev.settings, ...settingsData }
        } : null);
        toast({
          title: "Settings Updated",
          description: "Your settings have been updated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      isLoading,
      refreshProfile,
      updateProfile,
      updateAvatar,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      updateSettings,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};
