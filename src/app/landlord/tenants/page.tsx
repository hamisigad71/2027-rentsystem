'use client';

import React, { useState } from 'react';
import LandlordLayout from '@/components/LandlordLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { AlertTriangle } from 'lucide-react';
import { mockTenants } from '@/data/mockData';

export default function TenantsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tenants</h2>
          <p className="text-gray-600 mt-1">Manage all your tenants and their information</p>
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Unit</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Rent</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Arrears</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockTenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{tenant.name}</p>
                      <p className="text-xs text-gray-600">{tenant.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{tenant.unitId}</td>
                  <td className="px-6 py-4 text-gray-700">{tenant.email}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">KSh {tenant.rent.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${
                        tenant.arrears > 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      KSh {tenant.arrears.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        text={tenant.status === 'active' ? 'Active' : 'Inactive'}
                        type={tenant.status === 'active' ? 'success' : 'error'}
                      />
                      {tenant.arrears > 0 && (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTenant(tenant);
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

      {/* Tenant Details Modal */}
      <Modal
        isOpen={showModal && !!selectedTenant}
        onClose={() => setShowModal(false)}
        title={selectedTenant?.name}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{selectedTenant?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">{selectedTenant?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit ID</p>
              <p className="text-gray-900 font-medium">{selectedTenant?.unitId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Move-in Date</p>
              <p className="text-gray-900">{selectedTenant?.moveInDate}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-gray-900">KSh {selectedTenant?.rent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  KSh {selectedTenant?.paidAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Arrears</p>
                <p
                  className={`text-2xl font-bold ${
                    selectedTenant?.arrears > 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  KSh {selectedTenant?.arrears.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1">Send Message</Button>
            <Button variant="outline" className="flex-1">
              Edit Details
            </Button>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
