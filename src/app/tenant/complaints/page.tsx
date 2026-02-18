"use client";

import React, { useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TenantComplaintsPage() {
  const currentTenant = mockTenants[0];
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Maintenance",
  });

  const tenantComplaints = mockComplaints.filter(
    (c) => c.tenantId === currentTenant.id,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Maintenance Requests
            </h2>
            <p className="text-gray-600 mt-1">
              Report and track maintenance issues
            </p>
          </div>
          <Button onClick={() => setShowNewComplaint(true)}>
            <Plus className="w-5 h-5" />
            New Request
          </Button>
        </div>

        {/* Complaints Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tenantComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedComplaint(complaint);
                setShowDetails(true);
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    {complaint.title}
                  </h3>
                  <p className="text-sm text-gray-600">{complaint.category}</p>
                </div>
                {getStatusIcon(complaint.status)}
              </div>

              <p className="text-gray-700 text-sm mb-4">
                {complaint.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Reported: {complaint.createdDate}
                </span>
                <Badge
                  text={
                    complaint.status.charAt(0).toUpperCase() +
                    complaint.status.slice(1).replace("-", " ")
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
            <div className="col-span-full text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No maintenance requests yet</p>
              <Button onClick={() => setShowNewComplaint(true)}>
                <Plus className="w-4 h-4" />
                Submit Your First Request
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* New Complaint Modal */}
      <Modal
        isOpen={showNewComplaint}
        onClose={() => {
          setShowNewComplaint(false);
          setFormData({ title: "", description: "", category: "Maintenance" });
        }}
        title="Submit Maintenance Request"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Leaky faucet"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>HVAC</option>
              <option>Maintenance</option>
              <option>Noise</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the issue in detail..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              onClick={() => {
                setShowNewComplaint(false);
                setFormData({
                  title: "",
                  description: "",
                  category: "Maintenance",
                });
              }}
            >
              Submit Request
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowNewComplaint(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={showDetails && !!selectedComplaint}
        onClose={() => setShowDetails(false)}
        title={selectedComplaint?.title}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium text-gray-900">
                {selectedComplaint?.category}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Priority</p>
              <Badge
                text={
                  selectedComplaint?.priority.charAt(0).toUpperCase() +
                  selectedComplaint?.priority.slice(1)
                }
                type={
                  selectedComplaint?.priority === "high"
                    ? "error"
                    : selectedComplaint?.priority === "medium"
                      ? "warning"
                      : "info"
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
                text={
                  selectedComplaint?.status.charAt(0).toUpperCase() +
                  selectedComplaint?.status.slice(1).replace("-", " ")
                }
                type={
                  selectedComplaint?.status === "resolved"
                    ? "success"
                    : selectedComplaint?.status === "in-progress"
                      ? "warning"
                      : "error"
                }
              />
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Add Comment
          </Button>
        </div>
      </Modal>
    </TenantLayout>
  );
}
