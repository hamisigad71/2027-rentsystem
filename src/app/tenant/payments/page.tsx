"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  History,
  Info,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";

export default function TenantPaymentsPage() {
  const currentTenant = mockTenants[0];
  const tenantPayments = mockPayments.filter((p) => p.tenantId === currentTenant.id);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount] = useState(currentTenant.arrears > 0 ? currentTenant.arrears : 0);
  const [refId, setRefId] = useState("");

  React.useEffect(() => {
    setRefId(`${currentTenant.id}-${new Date().getMonth() + 1}`);
  }, [currentTenant.id]);

  // M-Pesa Logo
  const MpesaLogo = () => (
    <div className="flex items-center gap-1">
      <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-10 object-contain" />
    </div>
  );

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Secure Payments</h2>
          <p className="text-gray-600 mt-1">Manage your rent and utilities securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Summary Box - Redesigned for Premium Feel */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden group">
                <div className="relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl -ml-24 -mb-24" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-blue-100/80 text-xs font-bold uppercase tracking-[0.2em] mb-2">Current Balance</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-black tracking-tight tracking-tighter">KSh {currentTenant.arrears.toLocaleString()}</span>
                        <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Outstanding</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-blue-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6 bg-linear-to-b from-white to-slate-50/50">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700 tracking-tight">Enter Amount to Pay</label>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">Instant Processing</span>
                    </div>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-bold text-lg group-focus-within/input:text-blue-600 transition-colors">KSh</span>
                      </div>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        suppressHydrationWarning
                        className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-2xl font-black text-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm group-hover/input:border-slate-300"
                        placeholder="0.00"
                      />
                      <div className="absolute right-5 inset-y-0 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within/input:bg-blue-50 group-focus-within/input:text-blue-600 transition-all">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button suppressHydrationWarning onClick={() => setAmount(currentTenant.arrears)} className="text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider">Pay Full Amount</button>
                       <button suppressHydrationWarning onClick={() => setAmount(currentTenant.arrears / 2)} className="text-[10px] font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider">Pay Half</button>
                    </div>
                  </div>
                </div>
              </div>

            {/* Payment Methods Selection */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  Choose Payment Method
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 2 of 2</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => setPaymentMethod("mpesa")}
                  suppressHydrationWarning
                  className={`group flex items-center sm:flex-col sm:justify-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    paymentMethod === "mpesa" 
                    ? "border-green-500 bg-green-50/30 shadow-lg shadow-green-500/10" 
                    : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "mpesa" ? "bg-green-500 text-white shadow-lg shadow-green-500/30" : "bg-white text-slate-400"}`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "mpesa" ? "text-green-700" : "text-slate-600"}`}>M-Pesa</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Express Pay</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setPaymentMethod("card")}
                  suppressHydrationWarning
                  className={`group flex items-center sm:flex-col sm:justify-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    paymentMethod === "card" 
                    ? "border-blue-500 bg-blue-50/30 shadow-lg shadow-blue-500/10" 
                    : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "card" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white text-slate-400"}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "card" ? "text-blue-700" : "text-slate-600"}`}>Credit Card</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Visa / Master</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setPaymentMethod("bank")}
                  suppressHydrationWarning
                  className={`group flex items-center sm:flex-col sm:justify-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 active:scale-95 ${
                    paymentMethod === "bank" 
                    ? "border-indigo-500 bg-indigo-50/30 shadow-lg shadow-indigo-500/10" 
                    : "border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "bank" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-white text-slate-400"}`}>
                    <Building className="w-6 h-6" />
                  </div>
                  <div className="text-left sm:text-center">
                    <p className={`text-sm font-black transition-colors ${paymentMethod === "bank" ? "text-indigo-700" : "text-slate-600"}`}>Bank Transfer</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Direct Deposit</p>
                  </div>
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100">
                {paymentMethod === "mpesa" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                          <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">M-Pesa Express</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Direct Push Payment</p>
                        </div>
                      </div>
                      <Badge text="Instant Verify" type="success" />
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group/field">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within/field:text-green-600 transition-colors">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <input 
                          type="tel" 
                          placeholder="0712 345 678"
                          suppressHydrationWarning
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-lg"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 ml-1">
                        <Info className="w-3.5 h-3.5 text-blue-500" />
                        You will receive an automated STK prompt on your mobile device.
                      </p>
                    </div>
                    <Button className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-7 text-lg font-black shadow-xl shadow-green-500/30 rounded-2xl transform active:scale-[0.98] transition-all">
                      Authorize KSh {amount.toLocaleString()}
                    </Button>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center gap-1.5 px-2">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-6 object-contain rounded-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">Credit / Debit Card</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Secure 3D-Authentication</p>
                        </div>
                      </div>
                      <Badge text="Secure Pay" type="success" />
                    </div>

                    <div className="space-y-5">
                      <div className="space-y-2.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Card Number</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            suppressHydrationWarning
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold tracking-[0.1em]"
                          />
                           <div className="absolute right-5 inset-y-0 flex items-center">
                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Card Types" className="h-4 opacity-50" />
                           </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2.5">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Expiry</label>
                          <input type="text" placeholder="MM / YY" suppressHydrationWarning className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold" />
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">CVV</label>
                          <input type="text" placeholder="123" suppressHydrationWarning className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold" />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 py-7 text-lg font-black shadow-xl shadow-blue-500/30 rounded-2xl transform active:scale-[0.98] transition-all">
                      Authorize KSh {amount.toLocaleString()}
                    </Button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 space-y-6">
                      <div className="flex items-center gap-3 border-b border-indigo-100 pb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 leading-none">Direct Deposit Details</h4>
                          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Manual Verification</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="group/cell">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Bank Name</p>
                          <p className="font-black text-slate-900 text-sm">Equity Bank Kenya</p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Account Number</p>
                          <p className="font-black text-slate-900 text-sm tabular-nums">1234 5678 9012</p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Account Holder</p>
                          <p className="font-black text-slate-900 text-sm">RM Property Management</p>
                        </div>
                        <div className="group/cell">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Reference</p>
                          <p className="font-black text-indigo-600 text-sm tabular-nums">{refId}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-900 text-white p-5 rounded-2xl flex gap-4 items-start shadow-xl shadow-blue-900/10">
                      <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white leading-tight">Proof of Payment Required</p>
                        <p className="text-[11px] text-blue-100/70 mt-1 leading-relaxed">Please capture your transaction receipt or enter the reference code below once your transfer is complete.</p>
                      </div>
                    </div>
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 py-7 text-lg font-black shadow-xl rounded-2xl transform active:scale-[0.98] transition-all">
                      Confirm Bank Transfer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Info Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
              <div className="relative z-10">
                <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  Trust & Security
                </h3>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 transition-transform group-hover:scale-110">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">256-bit SSL</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Enterprise Encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 transition-transform group-hover:scale-110">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">Safe-Sync</p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">Real-time settlement</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Partner Ecosystem</p>
                  <div className="flex items-center gap-5 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 pointer-events-none">
                    <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-6 object-contain rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent opacity-50" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  <Info className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="font-black text-xl mb-3 tracking-tight">Concierge Support</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">Experiencing an issue? Our priority support team is standing by to assist with your transaction.</p>
                <button className="w-full py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl text-sm font-black transition-all shadow-lg active:scale-[0.98]">
                  Open Support Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <History className="w-5 h-5" />
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Payment Activity</h3>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Reference</th>
                    <th className="px-8 py-5 text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Month</th>
                    <th className="px-8 py-5 text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Amount</th>
                    <th className="px-8 py-5 text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Status</th>
                    <th className="px-8 py-5 text-left font-black text-slate-400 uppercase tracking-widest text-[10px]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tenantPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group/row">
                      <td className="px-8 py-6 font-black text-blue-600 tabular-nums text-xs">#PAY-{payment.id}</td>
                      <td className="px-8 py-6 font-black text-slate-900">
                        <div className="flex items-center gap-2">
                           <Calendar className="w-3.5 h-3.5 text-slate-300" />
                           {payment.month}
                        </div>
                      </td>
                      <td className="px-8 py-6 font-black text-slate-900 tabular-nums">KSh {payment.amount.toLocaleString()}</td>
                      <td className="px-8 py-6">
                        <div className="transform scale-90 origin-left">
                          <Badge
                            text={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            type={
                              payment.status === 'completed'
                                ? 'success'
                                : payment.status === 'pending'
                                ? 'warning'
                                : 'error'
                            }
                          />
                        </div>
                      </td>
                      <td className="px-8 py-6 text-slate-500 font-bold text-xs">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
