import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Plus,
  Trash2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/contexts/ProfileContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { profile, isLoading, updateProfile, updateAvatar, addAddress, updateAddress, deleteAddress, setDefaultAddress, updateSettings } = useProfile();
  const { user: authUser } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    bio: ''
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    recipient_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: 'Ghana',
    postal_code: '',
    is_default: false
  });

  const [editSettings, setEditSettings] = useState(false);
  const [settingsData, setSettingsData] = useState({
    email_notifications: true,
    sms_notifications: false,
    newsletter_subscription: true,
    two_factor_auth: false,
    language: 'en',
    currency: 'GHS'
  });

  // Initialize edit data when profile loads
  React.useEffect(() => {
    if (profile) {
      setEditData({
        first_name: profile.user.first_name || '',
        last_name: profile.user.last_name || '',
        phone: profile.user.phone || '',
        date_of_birth: profile.user.date_of_birth || '',
        gender: profile.user.gender || '',
        bio: profile.user.bio || ''
      });

      if (profile.settings) {
        setSettingsData({
          email_notifications: profile.settings.email_notifications,
          sms_notifications: profile.settings.sms_notifications,
          newsletter_subscription: profile.settings.newsletter_subscription,
          two_factor_auth: profile.settings.two_factor_auth,
          language: profile.settings.language,
          currency: profile.settings.currency
        });
      }
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in the context
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a storage service first
      // For now, we'll just use a placeholder URL
      const avatarUrl = URL.createObjectURL(file);
      try {
        await updateAvatar(avatarUrl);
      } catch (error) {
        // Error handling is done in the context
      }
    }
  };

  const handleAddAddress = async () => {
    try {
      await addAddress(newAddress);
      setShowAddAddress(false);
      setNewAddress({
        label: '',
        recipient_name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        country: 'Ghana',
        postal_code: '',
        is_default: false
      });
    } catch (error) {
      // Error handling is done in the context
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettings(settingsData);
      setEditSettings(false);
    } catch (error) {
      // Error handling is done in the context
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold font-heading mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar and Basic Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl shadow-soft border border-border p-6"
            >
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {profile.user.avatar_url ? (
                      <img
                        src={profile.user.avatar_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </div>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <h2 className="text-xl font-semibold">
                  {profile.user.first_name} {profile.user.last_name}
                </h2>
                <p className="text-muted-foreground">{profile.user.email}</p>
                <p className="text-sm text-primary mt-1 capitalize">{profile.user.role}</p>
              </div>

              {/* Basic Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{profile.user.email}</span>
                </div>
                {profile.user.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{profile.user.phone}</span>
                  </div>
                )}
                {profile.user.date_of_birth && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{new Date(profile.user.date_of_birth).toLocaleDateString()}</span>
                  </div>
                )}
                {profile.user.gender && (
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="capitalize">{profile.user.gender}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Editable Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl shadow-soft border border-border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input
                    value={editData.first_name}
                    onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input
                    value={editData.last_name}
                    onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Date of Birth</label>
                  <Input
                    type="date"
                    value={editData.date_of_birth}
                    onChange={(e) => setEditData({ ...editData, date_of_birth: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Gender</label>
                  <select
                    value={editData.gender}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </motion.div>

            {/* Addresses Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl shadow-soft border border-border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Addresses</h3>
                <Button
                  size="sm"
                  onClick={() => setShowAddAddress(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </Button>
              </div>

              {showAddAddress && (
                <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-4">Add New Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      placeholder="Label (e.g., Home, Work)"
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    />
                    <Input
                      placeholder="Recipient Name"
                      value={newAddress.recipient_name}
                      onChange={(e) => setNewAddress({ ...newAddress, recipient_name: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    />
                    <Input
                      placeholder="Address Line 1"
                      value={newAddress.address_line1}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                    />
                    <Input
                      placeholder="Address Line 2 (Optional)"
                      value={newAddress.address_line2}
                      onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                    />
                    <Input
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                    <Input
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                    <Input
                      placeholder="Postal Code (Optional)"
                      value={newAddress.postal_code}
                      onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="default-address"
                      checked={newAddress.is_default}
                      onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="default-address" className="text-sm">
                      Set as default address
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddAddress}>Save Address</Button>
                    <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {profile.addresses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No addresses added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.addresses.map((address) => (
                    <div key={address.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{address.label}</h4>
                            {address.is_default && (
                              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-primary" />
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.recipient_name}</p>
                        </div>
                        <div className="flex gap-2">
                          {!address.is_default && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteAddress(address.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{address.address_line1}</p>
                      {address.address_line2 && (
                        <p className="text-sm">{address.address_line2}</p>
                      )}
                      <p className="text-sm">
                        {address.city}, {address.state} {address.postal_code}
                      </p>
                      <p className="text-sm">{address.country}</p>
                      <p className="text-sm mt-2">{address.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl shadow-soft border border-border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </h3>
                {!editSettings ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditSettings(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveSettings}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditSettings(false)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your orders and promotions</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.email_notifications}
                    onChange={(e) => setSettingsData({ ...settingsData, email_notifications: e.target.checked })}
                    disabled={!editSettings}
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive text message updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.sms_notifications}
                    onChange={(e) => setSettingsData({ ...settingsData, sms_notifications: e.target.checked })}
                    disabled={!editSettings}
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter Subscription</p>
                    <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.newsletter_subscription}
                    onChange={(e) => setSettingsData({ ...settingsData, newsletter_subscription: e.target.checked })}
                    disabled={!editSettings}
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settingsData.two_factor_auth}
                    onChange={(e) => setSettingsData({ ...settingsData, two_factor_auth: e.target.checked })}
                    disabled={!editSettings}
                    className="w-4 h-4"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Language</label>
                    <select
                      value={settingsData.language}
                      onChange={(e) => setSettingsData({ ...settingsData, language: e.target.value })}
                      disabled={!editSettings}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    >
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Currency</label>
                    <select
                      value={settingsData.currency}
                      onChange={(e) => setSettingsData({ ...settingsData, currency: e.target.value })}
                      disabled={!editSettings}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    >
                      <option value="GHS">GHS - Ghanaian Cedi</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
