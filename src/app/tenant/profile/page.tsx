"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Home, Calendar, Save, Camera, X, Shield, Clock, CreditCard, Star } from "lucide-react";
import { mockTenants } from "@/data/mockData";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
  "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
];

export default function TenantProfilePage() {
  const currentTenant = mockTenants[0];
  const { profileImage, updateProfileImage, userName, updateUserName } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || currentTenant.name,
    email: currentTenant.email,
    phone: currentTenant.phone,
    emergencyContact: "Sarah Connor",
    emergencyPhone: "(555) 999-8888",
  });

  const handleSave = () => {
    updateUserName(formData.name);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TenantLayout>
      <div className="min-h-screen bg-slate-50 font-sans">
        {/* Premium Cover Header */}
        <div className="h-64 relative group">
          <img 
            src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop" 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 pb-12 relative -mt-32">
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-10">
              
              {/* Header: Avatar & Name */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg bg-slate-100 overflow-hidden relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
                    <img 
                      src={profileImage || AVATAR_PRESETS[0]} 
                      alt="Profile" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 pt-2 w-full">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{formData.name}</h1>
                      <div className="flex items-center gap-2 mt-2 text-slate-500 font-medium">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">Tenant</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Home className="w-4 h-4" /> Unit {currentTenant.unitId}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "outline" : "primary"}
                      className={isEditing ? "border-slate-300 text-slate-700 hover:bg-slate-50" : "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"}
                    >
                      {isEditing ? "Cancel Edit" : "Edit Profile"}
                    </Button>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rent</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">${currentTenant.rent}<span className="text-xs text-slate-400 font-normal">/mo</span></p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lease Ends</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">Dec 31, 2024</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                          <Star className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rating</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">Excellent</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                          <Shield className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deposit</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900">$1,500</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-10"></div>

              {/* Information Form */}
              <div className="grid md:grid-cols-2 gap-10 md:gap-14">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <Mail className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
                  </div>
                  
                  <div className="space-y-5 pl-2">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 font-medium ${
                          isEditing 
                            ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-600"
                        }`}
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 font-medium ${
                          isEditing 
                            ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                      <Shield className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Emergency Contact</h3>
                  </div>

                  <div className="space-y-5 pl-2">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 font-medium ${
                          isEditing 
                            ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-600"
                        }`}
                      />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 font-medium ${
                          isEditing 
                            ? "bg-white border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm" 
                            : "bg-slate-50/50 border-transparent text-slate-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="px-6">Cancel</Button>
                  <Button onClick={handleSave} className="bg-slate-900 text-white px-8 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 transition-shadow">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
            
            {/* Banner Footer */}
            {!isEditing && (
              <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Member since October 2023</span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lease Status</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-green-700">Active & Compliant</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-black/20 transform animate-in zoom-in-95 duration-200 scale-100">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <h3 className="text-xl font-bold text-slate-900">Update Profile Picture</h3>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8">
              {/* File Upload Area */}
              <div className="mb-8">
                <label className="group block w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-xl bg-slate-50 group-hover:bg-blue-50/50 group-hover:border-blue-400 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="mb-1 text-sm font-semibold text-slate-700">Click to upload photo</p>
                      <p className="text-xs text-slate-500">SVG, PNG, JPG (Max 2MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            updateProfileImage(base64String);
                            setShowAvatarModal(false);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </label>
              </div>

              <div className="relative flex py-2 items-center mb-6">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or choose a preset</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {AVATAR_PRESETS.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      updateProfileImage(url);
                      setShowAvatarModal(false);
                    }}
                    className={`relative aspect-square rounded-2xl overflow-hidden hover:ring-4 hover:ring-blue-100 transition-all duration-200 group ${
                      profileImage === url ? "ring-4 ring-blue-500 ring-offset-2" : "ring-1 ring-slate-200"
                    }`}
                  >
                    <img src={url} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </TenantLayout>
  );
}
