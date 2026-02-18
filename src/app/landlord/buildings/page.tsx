"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { Plus, Building2 } from "lucide-react";

export default function BuildingsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  const getOccupancyRate = (buildingId: string) => {
    const buildingUnits = mockUnits.filter((u) => u.buildingId === buildingId);
    if (buildingUnits.length === 0) return 0;
    const occupied = buildingUnits.filter(
      (u) => u.status === "occupied",
    ).length;
    return Math.round((occupied / buildingUnits.length) * 100);
  };

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Buildings</h2>
            <p className="text-gray-600 mt-1">Manage all your properties</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-5 h-5" />
            Add Building
          </Button>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBuildings.map((building) => (
            <div
              key={building.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 overflow-hidden relative">
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {building.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{building.address}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600">Total Units</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {building.units}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Occupied</p>
                    <p className="text-2xl font-bold text-green-600">
                      {building.occupiedUnits}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Occupancy</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {getOccupancyRate(building.id)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-green-500 to-green-600 h-full"
                      style={{ width: `${getOccupancyRate(building.id)}%` }}
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="text-xs text-gray-600 mb-4">
                  Year Built: {building.yearBuilt}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setSelectedBuilding(building);
                    setShowModal(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Building Details Modal */}
      <Modal
        isOpen={showModal && !!selectedBuilding}
        onClose={() => setShowModal(false)}
        title={selectedBuilding?.name}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">
                {selectedBuilding?.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Year Built</p>
              <p className="font-medium text-gray-900">
                {selectedBuilding?.yearBuilt}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600">Total Units</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedBuilding?.units}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedBuilding?.occupiedUnits}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Vacant</p>
              <p className="text-2xl font-bold text-red-600">
                {(selectedBuilding?.units || 0) -
                  (selectedBuilding?.occupiedUnits || 0)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Occupancy Rate</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-green-500 to-green-600 h-full"
                  style={{
                    width: `${getOccupancyRate(selectedBuilding?.id)}%`,
                  }}
                />
              </div>
              <span className="text-sm font-semibold">
                {getOccupancyRate(selectedBuilding?.id)}%
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1">Edit Building</Button>
            <Button variant="outline" className="flex-1">
              View Units
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Building Modal */}
      <Modal
        isOpen={showModal && !selectedBuilding}
        onClose={() => setShowModal(false)}
        title="Add New Building"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building Name
            </label>
            <input
              type="text"
              placeholder="e.g., Sunrise Apartments"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Units
              </label>
              <input
                type="number"
                placeholder="24"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                placeholder="2020"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              onClick={() => setShowModal(false)}
            >
              Add Building
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </LandlordLayout>
  );
}
