"use client";

import Link from "next/link";
import { 
  Building2, Users, TrendingUp, ArrowRight, CheckCircle2, 
  ShieldCheck, Zap, Globe, Heart, MessageSquare, CreditCard,
  Layers, Star, Smartphone, Briefcase,
  Home, Search, PlusCircle, Bell, User, Camera
} from "lucide-react";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { role, profileImage, userName } = useAuth();

  const getInitials = (name: string | null) => {
    if (!name) return "RM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const profileLink = role === 'landlord' ? '/landlord/profile' : '/tenant/profile';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">RentManager</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
          </div>

          <div className="flex items-center gap-4" suppressHydrationWarning>
            {role ? (
              <Link href={profileLink} className="flex items-center gap-3 group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-none">{userName || "My Account"}</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter mt-1">Logged In</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(userName)}
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 hidden sm:flex">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              The Future of Property Management
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
              Transform Your <br />
              <span className="text-blue-600">Rental Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              RentManager is the all-in-one ecosystem designed to simplify life for both landlords and tenants. From automated payments to seamless communication, manage your Property with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link href="/auth/login?role=landlord">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 px-8 py-7 text-lg group w-full sm:w-auto">
                   Manage Property
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/login?role=tenant">
                <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 bg-white shadow-lg shadow-slate-200/50 px-8 py-7 text-lg w-full sm:w-auto">
                  Join as Tenant
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-40 grayscale filter hover:grayscale-0 transition-all duration-500">
              <Building2 className="w-10 h-10" />
              <ShieldCheck className="w-10 h-10" />
              <Users className="w-10 h-10" />
              <div className="flex items-center gap-4">
                <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-8 object-contain rounded-md" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-100 aspect-square md:aspect-video lg:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-slate-900/20 to-transparent"></div>
            </div>
            {/* Absolute floated elements */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Occupancy Rate</p>
                  <p className="text-xl font-bold text-green-600">98.4%</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Security Plus</p>
                  <p className="text-xs font-medium text-slate-500">Verified Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">1,200+</p>
              <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Active Units</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">99%</p>
              <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Payment Rate</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">24h</p>
              <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Support Response</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">4.9/5</p>
              <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-center">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Our Ecosystem</h2>
          <p className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Tailored for your success</p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Whether you're managing a growing Property or looking for your next home, we provide the tools you need to thrive.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {/* For Landlords */}
          <div className="group relative bg-slate-900 rounded-[2rem] p-10 md:p-16 overflow-hidden text-white transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/40">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Building2 className="w-64 h-64 rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-blue-500/40">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-6">Designed for Landlords</h3>
              <ul className="space-y-5 mb-12">
                 <li className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                  <span>Comprehensive Property Analytics and Real-time Income Tracking</span>
                </li>
                <li className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                  <span>Automated Tenant Verification and Digital Lease Signing</span>
                </li>
                <li className="flex items-start gap-4 text-slate-300">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                  <span>Unified Maintenance Dashboard for Instant Complaint Management</span>
                </li>
              </ul>
              <Link href="/auth/login?role=landlord" suppressHydrationWarning>
                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 py-6 w-full sm:w-auto">
                  <span className="text-slate-900">Explore Enterprise Solutions</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* For Tenants */}
          <div className="group relative bg-white rounded-[2rem] p-10 md:p-16 overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-100">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Users className="w-64 h-64 -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-slate-900/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Built for Tenants</h3>
              <ul className="space-y-5 mb-12">
                <li className="flex items-start gap-4 text-slate-600">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span>Frictionless One-Click Rent Payments via M-Pesa</span>
                    <div className="flex items-center gap-3">
                      <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-6 object-contain opacity-80" />
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-6 object-contain opacity-80 rounded-sm" />
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4 text-slate-600">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                  <span>Digital Service Requests with Direct Landlord Chat Support</span>
                </li>
                <li className="flex items-start gap-4 text-slate-600">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                  <span>Personalized Living History and Transparent Rent Status</span>
                </li>
              </ul>
              <Link href="/auth/login?role=tenant" suppressHydrationWarning>
                <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-6 w-full sm:w-auto">
                  <span className="text-white">Find Your Next Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Feature Highlight */}
      <section id="features" className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda536ad4a?q=80&w=2070&auto=format&fit=crop" 
              alt="Management App Interface" 
              className="rounded-3xl shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-700"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">Property management, <br />reimagined.</h2>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-white shadow-lg rounded-2xl flex items-center justify-center text-blue-600">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Mobile First Experience</h4>
                  <p className="text-slate-600 leading-relaxed">Manage properties or pay rent from anywhere. Our platform is optimized for every screen, ensuring you stay connected 24/7.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-white shadow-lg rounded-2xl flex items-center justify-center text-blue-500">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Integrated Financials</h4>
                  <p className="text-slate-600 leading-relaxed">From automated invoicing to tax-ready reports. Our ledger system keeps every cent accounted for with zero manual effort.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-white shadow-lg rounded-2xl flex items-center justify-center text-orange-600">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Reputation System</h4>
                  <p className="text-slate-600 leading-relaxed">Build trust through our unique rating system. Landlords and tenants can build their profile history for better future opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact CTA Section */}
      <section className="py-24 md:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative group bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(37,99,235,0.25)]">
            {/* Background Texture & Overlays */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="p-10 md:p-20 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-50 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                  Get Started Today
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                  Ready to <span className="text-blue-200">scale</span> your property portfolio?
                </h2>
                <p className="text-lg md:text-xl text-blue-50/80 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  Join 500+ elite managers and thousands of tenants who have already simplified their rental lifestyle with RentManager.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start" suppressHydrationWarning>
                  <Link href="/auth/register">
                    <Button className="h-16 px-10 bg-white text-blue-600 hover:bg-slate-50 font-extrabold text-lg rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 group">
                      <span className="text-blue-600">Join the Ecosystem</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline" className="h-16 px-10 border-white/30 text-white hover:bg-white/10 font-bold text-lg rounded-2xl transition-all hover:border-white/60">
                      <span className="text-white">Access Dashboard</span>
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(idx => (
                      <div key={idx} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-slate-200 overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/100?img=${idx + 10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-blue-100 italic">"Best decision for my buildings!"</p>
                </div>
              </div>

              {/* Visual Side */}
              <div className="hidden lg:block relative h-full">
                <div className="absolute inset-0 bg-linear-to-l from-blue-900/40 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Modern Office Building" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]"
                />
                
                {/* Floating Mockup Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 p-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl animate-bounce-slow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold">RM</div>
                    <div>
                      <p className="text-[10px] font-bold text-blue-200">REVENUE</p>
                      <p className="text-lg font-bold text-white tracking-tight">KSh 420,000</p>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-400 rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-blue-100/60 mt-2 font-medium">92% Collection rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  RM
                </div>
                <span className="font-bold text-lg text-slate-900">RentManager</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Empowering the future of property management with smart tech and seamless experiences.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Platform</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Support</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6">Company</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">&copy; 2024 RentManager Ecosystem. Built for Excellence.</p>
            <div className="flex gap-8">
              <MessageSquare className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Heart className="w-5 h-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
              <Globe className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-3xl p-2 flex items-center justify-around translate-y-0 transition-transform duration-500 active:scale-95">
          <button className="p-3 text-blue-600 flex flex-col items-center gap-1" suppressHydrationWarning>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button className="p-3 text-slate-400 flex flex-col items-center gap-1" suppressHydrationWarning>
            <Search className="w-6 h-6" />
            <span className="text-[10px] font-medium">Search</span>
          </button>
          <div className="-mt-12 bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/40 text-white" suppressHydrationWarning>
            <PlusCircle className="w-7 h-7" />
          </div>
          <button className="p-3 text-slate-400 flex flex-col items-center gap-1" suppressHydrationWarning>
            <Bell className="w-6 h-6" />
            <span className="text-[10px] font-medium">Updates</span>
          </button>
          <Link href={role ? profileLink : "/auth/login"} className="p-3 flex flex-col items-center gap-1">
            <div className={`w-6 h-6 rounded-full overflow-hidden border ${role ? "border-blue-500 shadow-sm" : "border-slate-300"}`}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-[10px] font-bold ${role ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {role ? getInitials(userName) : <User className="w-4 h-4" />}
                </div>
              )}
            </div>
            <span className={`text-[10px] font-bold ${role ? "text-blue-600" : "text-slate-400"}`}>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Add these custom animations to globals.css if needed
// @keyframes animate-bounce-slow {
//   0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
//   50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
// }
