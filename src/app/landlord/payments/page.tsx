"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockPayments } from "@/data/mockData";
import { Download } from "lucide-react";

export default function PaymentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [filterMonth, setFilterMonth] = useState("all");

  const filteredPayments =
    filterMonth === "all"
      ? mockPayments
      : mockPayments.filter((p) => p.month.includes(filterMonth));

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payments</h2>
          <p className="text-gray-600 mt-1">Track all rental payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Total Collected</p>
            <p className="text-2xl font-bold text-green-600">
              KSh {mockPayments.reduce(
                (sum, p) => (p.status === "completed" ? sum + p.amount : sum),
                0,
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              KSh {mockPayments.reduce(
                (sum, p) => (p.status === "pending" ? sum + p.amount : sum),
                0,
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Overdue</p>
            <p className="text-2xl font-bold text-red-600">
              KSh {mockPayments.reduce(
                (sum, p) => (p.status === "overdue" ? sum + p.amount : sum),
                0,
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Tenant
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Unit
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Month
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.tenantName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{payment.unitId}</td>
                  <td className="px-6 py-4 text-gray-700">{payment.month}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    KSh {payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      text={
                        payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)
                      }
                      type={
                        payment.status === "completed"
                          ? "success"
                          : payment.status === "pending"
                            ? "warning"
                            : "error"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowModal(true);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      <Modal
        isOpen={showModal && !!selectedPayment}
        onClose={() => setShowModal(false)}
        title="Payment Details"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Tenant</p>
              <p className="font-medium text-gray-900">
                {selectedPayment?.tenantName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="font-medium text-gray-900">
                {selectedPayment?.unitId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Month</p>
              <p className="font-medium text-gray-900">
                {selectedPayment?.month}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Date</p>
              <p className="font-medium text-gray-900">
                {selectedPayment?.date}
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Amount</p>
              <p className="text-2xl font-bold text-blue-600">
                KSh {selectedPayment?.amount.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 object-contain" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV7Rt2nWT1lLVAYOc0cyDrdbPLrZBkifm_g&s" alt="Visa & Mastercard" className="h-8 object-contain rounded-md" />
            </div>
          </div>
          <div>
            <Badge
              text={
                selectedPayment?.status.charAt(0).toUpperCase() +
                selectedPayment?.status.slice(1)
              }
              type={
                selectedPayment?.status === "completed"
                  ? "success"
                  : selectedPayment?.status === "pending"
                    ? "warning"
                    : "error"
              }
            />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">
              <Download className="w-4 h-4" />
              Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              Send Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
