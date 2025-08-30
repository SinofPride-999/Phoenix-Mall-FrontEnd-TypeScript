import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Paperclip, Smile, Search, MoreVertical,
  Trash2, Reply, Edit, Check, CheckCheck, Clock,
  Image, File, Video, Music, X, Menu, ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Footer from '@/components/layout/Footer';

// Mock data for chats and messages
const mockChats = [
  {
    id: 1,
    name: "Sarah Johnson",
    lastMessage: "Hey! I'm interested in the camera you're selling",
    timestamp: "2:45 PM",
    unreadCount: 3,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    isOnline: true
  },
  {
    id: 2,
    name: "Tech Gadgets Store",
    lastMessage: "Your order has been shipped!",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "https://images.unsplash.com/photo-1560472355-536de3962603?w=150&h=150&fit=crop",
    isOnline: false
  },
  {
    id: 3,
    name: "Michael Chen",
    lastMessage: "I can offer $250 for the watch",
    timestamp: "12:30 PM",
    unreadCount: 1,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: true
  },
  {
    id: 4,
    name: "Fashion Boutique",
    lastMessage: "New summer collection is here!",
    timestamp: "Tuesday",
    unreadCount: 0,
    avatar: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=150&h=150&fit=crop",
    isOnline: false
  },
  {
    id: 5,
    name: "Alex Rivera",
    lastMessage: "When can I come to check the furniture?",
    timestamp: "Monday",
    unreadCount: 0,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    isOnline: false
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      text: "Hi there! I saw your listing for the DSLR camera. Is it still available?",
      sender: "them",
      timestamp: "2:30 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 2,
      text: "Yes, it's still available!",
      sender: "me",
      timestamp: "2:32 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 3,
      text: "That's great! Could you tell me more about its condition?",
      sender: "them",
      timestamp: "2:33 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 4,
      text: "It's in excellent condition. I've only used it a few times. Comes with all original accessories.",
      sender: "me",
      timestamp: "2:35 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 5,
      text: "Here are some photos I took with it last week",
      sender: "me",
      timestamp: "2:35 PM",
      status: "read",
      isEdited: false,
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
        caption: "Nature photography sample"
      }
    },
    {
      id: 6,
      text: "Wow, these look amazing! The quality is really good.",
      sender: "them",
      timestamp: "2:40 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 7,
      text: "I'm definitely interested. Would you consider $400?",
      sender: "them",
      timestamp: "2:42 PM",
      status: "read",
      isEdited: false
    },
    {
      id: 8,
      text: "The lowest I can go is $450. It's practically new.",
      sender: "me",
      timestamp: "2:43 PM",
      status: "read",
      isEdited: true
    },
    {
      id: 9,
      text: "Okay, I can do $450. When can I pick it up?",
      sender: "them",
      timestamp: "2:45 PM",
      status: "delivered",
      isEdited: false
    }
  ]
};

const Messaging = () => {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      setMessages(mockMessages[activeChat as keyof typeof mockMessages] || []);
      scrollToBottom();
    }
  }, [activeChat]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if ((newMessage.trim() === '' && selectedFiles.length === 0) || !activeChat) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      isEdited: false,
      media: selectedFiles.length > 0 ? selectedFiles[0] : null,
      replyingTo: replyingTo || null
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setReplyingTo(null);
    setSelectedFiles([]);
    scrollToBottom();

    // Simulate message being sent and delivered
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Simulate message being read
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMsg.id ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).map(file => {
      const type = file.type.split('/')[0];
      return {
        type,
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      };
    });

    setSelectedFiles([...selectedFiles, ...newFiles]);
  };

  // Remove selected file
  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  // Handle right-click/long press on message
  const handleMessageContext = (e: React.MouseEvent | React.TouchEvent, message: any) => {
    e.preventDefault();

    if ('touches' in e) {
      // Long press on mobile
      setSelectedMessage(message);
      setContextMenu({ visible: true, x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else {
      // Right click on desktop
      setSelectedMessage(message);
      setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
    }
  };

  // Handle message deletion
  const handleDeleteMessage = () => {
    if (!selectedMessage) return;

    setMessages(messages.filter(msg => msg.id !== selectedMessage.id));
    setContextMenu({ visible: false, x: 0, y: 0 });
    setSelectedMessage(null);
  };

  // Handle message reply
  const handleReply = () => {
    if (!selectedMessage) return;

    setReplyingTo(selectedMessage);
    setContextMenu({ visible: false, x: 0, y: 0 });
    setSelectedMessage(null);
    messageInputRef.current?.focus();
  };

  // Handle message edit
  const handleEdit = () => {
    if (!selectedMessage) return;

    setEditingMessage(selectedMessage);
    setNewMessage(selectedMessage.text);
    setContextMenu({ visible: false, x: 0, y: 0 });
    setSelectedMessage(null);
    messageInputRef.current?.focus();
  };

  // Handle saving edited message
  const handleSaveEdit = () => {
    if (!editingMessage) return;

    setMessages(messages.map(msg =>
      msg.id === editingMessage.id
        ? { ...msg, text: newMessage, isEdited: true, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : msg
    ));

    setNewMessage('');
    setEditingMessage(null);
  };

  // Cancel reply or edit
  const cancelAction = () => {
    setReplyingTo(null);
    setEditingMessage(null);
    setNewMessage('');
  };

  // Render message status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return <Check className="w-3 h-3 text-gray-400" />;
    }
  };

  // Render media icon based on type
  const renderMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Music className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Header />

      {/* Chat List Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map(chat => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: "#f5f5f5" }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border-b border-gray-100 cursor-pointer flex items-start ${activeChat === chat.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                  {chat.unreadCount}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat View */}
      <div className={`flex-1 flex flex-col ${activeChat ? 'flex' : 'hidden md:flex'}`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center">
              <button
                className="md:hidden mr-3 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setActiveChat(null)}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={mockChats.find(c => c.id === activeChat)?.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <h2 className="font-semibold">{mockChats.find(c => c.id === activeChat)?.name}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-3">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      onContextMenu={(e) => handleMessageContext(e, message)}
                      onTouchStart={(e) => {
                        // Set long press timer
                        const timer = setTimeout(() => {
                          handleMessageContext(e, message);
                        }, 500);

                        // Store timer to clear if touch ends
                        e.currentTarget.addEventListener('touchend', () => clearTimeout(timer), { once: true });
                      }}
                    >
                      {/* Reply indicator */}
                      {message.replyingTo && (
                        <div className={`w-full mb-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                          <div className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                            Replying to: {message.replyingTo.text.substring(0, 30)}...
                          </div>
                        </div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`relative max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 ${
                          message.sender === 'me'
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                        }`}
                      >
                        {/* Media content */}
                        {message.media && (
                          <div className="mb-2">
                            {message.media.type === 'image' ? (
                              <img
                                src={message.media.url}
                                alt={message.media.caption || 'Attachment'}
                                className="rounded-lg max-w-full h-auto"
                              />
                            ) : (
                              <div className="flex items-center p-2 bg-gray-100 rounded-lg">
                                {renderMediaIcon(message.media.type)}
                                <div className="ml-2 truncate">
                                  <p className="text-sm font-medium truncate">{message.media.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {Math.round(message.media.size / 1024)} KB
                                  </p>
                                </div>
                              </div>
                            )}
                            {message.media.caption && (
                              <p className="text-xs mt-1 text-gray-600">{message.media.caption}</p>
                            )}
                          </div>
                        )}

                        {/* Message text */}
                        <p className="text-sm">{message.text}</p>

                        {/* Message metadata */}
                        <div className={`flex items-center mt-1 text-xs ${message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                          <span className="mr-1">{message.timestamp}</span>
                          {message.isEdited && <span className="mr-1">(edited)</span>}
                          {message.sender === 'me' && renderStatusIcon(message.status)}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Reply/Edit Preview */}
            {(replyingTo || editingMessage) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-gray-100 border-t border-gray-200 p-3 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    {editingMessage ? 'Editing message' : `Replying to ${replyingTo?.sender === 'me' ? 'yourself' : mockChats.find(c => c.id === activeChat)?.name}`}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {editingMessage ? editingMessage.text : replyingTo?.text}
                  </div>
                </div>
                <button
                  onClick={cancelAction}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-gray-100 border-t border-gray-200 p-3 flex overflow-x-auto space-x-2"
              >
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-lg">
                        {renderMediaIcon(file.type)}
                      </div>
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-3">
              <div className="flex items-end space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
                  <textarea
                    ref={messageInputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent border-none outline-none resize-none text-sm max-h-32"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (editingMessage) {
                          handleSaveEdit();
                        } else {
                          handleSendMessage();
                        }
                      }
                    }}
                  />
                </div>

                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Smile className="w-5 h-5" />
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={editingMessage ? handleSaveEdit : handleSendMessage}
                  disabled={newMessage.trim() === '' && selectedFiles.length === 0}
                  className={`p-2 rounded-full ${newMessage.trim() || selectedFiles.length > 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}`}
                >
                  {editingMessage ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            />
          </>
        ) : (
          // Empty state when no chat is selected
          <div className="flex-1 flex items-center justify-center flex-col p-8 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your messages</h3>
            <p className="text-gray-500 max-w-md">
              Send private messages to sellers or buyers about products. Your conversations will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.visible && (
          <>
            {/* Backdrop with blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
            />

            {/* Context menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bg-white rounded-lg shadow-lg py-2 z-50"
              style={{
                top: contextMenu.y,
                left: contextMenu.x,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <button
                onClick={handleReply}
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </button>
              <button
                onClick={handleEdit}
                className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDeleteMessage}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileBottomNav />
    </div>
  );
};

export default Messaging;
