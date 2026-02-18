'use client';

import React, { useState } from 'react';
import LandlordLayout from '@/components/LandlordLayout';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { mockComplaints } from '@/data/mockData';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function ComplaintsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  const filteredComplaints =
    filterStatus === 'all' ? mockComplaints : mockComplaints.filter((c) => c.status === filterStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Maintenance Complaints</h2>
          <p className="text-gray-600 mt-1">Manage tenant complaints and maintenance requests</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStatus === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All ({mockComplaints.length})
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('pending')}
          >
            Pending ({mockComplaints.filter((c) => c.status === 'pending').length})
          </Button>
          <Button
            variant={filterStatus === 'in-progress' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('in-progress')}
          >
            In Progress ({mockComplaints.filter((c) => c.status === 'in-progress').length})
          </Button>
          <Button
            variant={filterStatus === 'resolved' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('resolved')}
          >
            Resolved ({mockComplaints.filter((c) => c.status === 'resolved').length})
          </Button>
        </div>

        {/* Complaints Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{complaint.title}</h3>
                  <p className="text-sm text-gray-600">{complaint.tenantName}</p>
                </div>
                {getStatusIcon(complaint.status)}
              </div>

              <p className="text-gray-700 mb-4">{complaint.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-600">Category</p>
                  <p className="text-sm font-medium text-gray-900">{complaint.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Priority</p>
                  <Badge
                    text={complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    type={
                      complaint.priority === 'high'
                        ? 'error'
                        : complaint.priority === 'medium'
                        ? 'warning'
                        : 'info'
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge
                  text={complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}
                  type={
                    complaint.status === 'resolved'
                      ? 'success'
                      : complaint.status === 'in-progress'
                      ? 'warning'
                      : 'error'
                  }
                />
                <span className="text-xs text-gray-600">Reported: {complaint.createdDate}</span>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedComplaint(complaint);
                  setShowModal(true);
                }}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={showModal && !!selectedComplaint}
        onClose={() => setShowModal(false)}
        title={selectedComplaint?.title}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Tenant</p>
              <p className="font-medium text-gray-900">{selectedComplaint?.tenantName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="font-medium text-gray-900">{selectedComplaint?.unitId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium text-gray-900">{selectedComplaint?.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <Badge
                text={selectedComplaint?.priority.charAt(0).toUpperCase() + selectedComplaint?.priority.slice(1)}
                type={
                  selectedComplaint?.priority === 'high'
                    ? 'error'
                    : selectedComplaint?.priority === 'medium'
                    ? 'warning'
                    : 'info'
                }
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Description</p>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {selectedComplaint?.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Reported</p>
              <p className="text-gray-900">{selectedComplaint?.createdDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge
                text={selectedComplaint?.status.charAt(0).toUpperCase() + selectedComplaint?.status.slice(1).replace('-', ' ')}
                type={
                  selectedComplaint?.status === 'resolved'
                    ? 'success'
                    : selectedComplaint?.status === 'in-progress'
                    ? 'warning'
                    : 'error'
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1">Update Status</Button>
            <Button variant="outline" className="flex-1">
              Assign to Contractor
            </Button>
          </div>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
