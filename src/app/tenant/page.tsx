"use client";

import React from "react";
import TenantLayout from "@/components/TenantLayout";
import DashboardCard from "@/components/DashboardCard";
import Button from "@/components/Button";
import Link from "next/link";
import Badge from "@/components/Badge";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  FileText,
  Plus,
} from "lucide-react";
import { mockTenants, mockPayments, mockComplaints } from "@/data/mockData";

export default function TenantDashboard() {
  // Mock current tenant
  const currentTenant = mockTenants[0];
  const tenantPayments = mockPayments.filter(
    (p) => p.tenantId === currentTenant.id,
  );
  const tenantComplaints = mockComplaints.filter(
    (c) => c.tenantId === currentTenant.id,
  );

  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(1);
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome, {currentTenant.name}!
          </h2>
          <p className="text-gray-600 mt-1">
            Unit {currentTenant.unitId} • Here's your rental status
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Monthly Rent"
            value={`KSh ${currentTenant.rent.toLocaleString()}`}
            icon={DollarSign}
            color="blue"
          />
          <DashboardCard
            title="Balance Due"
            value={`KSh ${currentTenant.arrears.toLocaleString()}`}
            icon={AlertCircle}
            color={currentTenant.arrears > 0 ? "red" : "green"}
          />
          <DashboardCard
            title="Next Due Date"
            value={nextPaymentDate.toLocaleDateString()}
            icon={Calendar}
            color="blue"
          />
          <DashboardCard
            title="Active Complaints"
            value={
              tenantComplaints.filter((c) => c.status !== "resolved").length
            }
            icon={FileText}
            color="yellow"
          />
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Payment Status</h3>
            <Link href="/tenant/payments">
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Make Payment
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rent Amount</p>
              <p className="text-2xl font-bold text-blue-600">
                KSh {currentTenant.rent.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Amount Paid</p>
              <p className="text-2xl font-bold text-green-600">
                KSh {currentTenant.paidAmount.toLocaleString()}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Balance Due</p>
              <p className="text-2xl font-bold text-red-600">
                KSh {currentTenant.arrears.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-linear-to-r from-green-500 to-green-600 h-full transition-all"
              style={{
                width: `${(currentTenant.paidAmount / currentTenant.rent) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {Math.round((currentTenant.paidAmount / currentTenant.rent) * 100)}%
            paid
          </p>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Recent Payments
            </h3>
            <div className="space-y-3">
              {tenantPayments.slice(0, 4).map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{payment.month}</p>
                    <p className="text-xs text-gray-600">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">KSh {payment.amount.toLocaleString()}</p>
                    <Badge
                      text={payment.status === "completed" ? "Paid" : "Pending"}
                      type={
                        payment.status === "completed" ? "success" : "warning"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Your Complaints
            </h3>
            <div className="space-y-3">
              {tenantComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-400"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {complaint.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {complaint.category}
                      </p>
                    </div>
                    <Badge
                      text={
                        complaint.status === "resolved"
                          ? "Resolved"
                          : complaint.status === "in-progress"
                            ? "In Progress"
                            : "Pending"
                      }
                      type={
                        complaint.status === "resolved"
                          ? "success"
                          : complaint.status === "in-progress"
                            ? "warning"
                            : "error"
                      }
                    />
                  </div>
                </div>
              ))}
              {tenantComplaints.length === 0 && (
                <p className="text-sm text-gray-600 p-3 text-center">
                  No complaints filed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
