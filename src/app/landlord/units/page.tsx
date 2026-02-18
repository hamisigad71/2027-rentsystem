"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { mockUnits, mockBuildings } from "@/data/mockData";

export default function UnitsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "occupied" | "vacant"
  >("all");

  const filteredUnits =
    filterStatus === "all"
      ? mockUnits
      : mockUnits.filter((u) => u.status === filterStatus);

  const getBuilding = (buildingId: string) =>
    mockBuildings.find((b) => b.id === buildingId);

  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Units</h2>
          <p className="text-gray-600 mt-1">Manage all your rental units</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStatus === "all" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All ({mockUnits.length})
          </Button>
          <Button
            variant={filterStatus === "occupied" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("occupied")}
          >
            Occupied ({mockUnits.filter((u) => u.status === "occupied").length})
          </Button>
          <Button
            variant={filterStatus === "vacant" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("vacant")}
          >
            Vacant ({mockUnits.filter((u) => u.status === "vacant").length})
          </Button>
        </div>

        {/* Units Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Unit
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Building
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Type
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Floor
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Rent
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr
                  key={unit.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{unit.number}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {getBuilding(unit.buildingId)?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{unit.type}</td>
                  <td className="px-6 py-4 text-gray-700">{unit.floor}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    KSh {unit.rent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      text={unit.status === "occupied" ? "Occupied" : "Vacant"}
                      type={unit.status === "occupied" ? "success" : "warning"}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUnit(unit);
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

      {/* Unit Details Modal */}
      <Modal
        isOpen={showModal && !!selectedUnit}
        onClose={() => setShowModal(false)}
        title={`Unit #${selectedUnit?.number}`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="text-gray-900 font-medium">{selectedUnit?.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Floor</p>
              <p className="text-gray-900 font-medium">{selectedUnit?.floor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rent Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                KSh {selectedUnit?.rent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge
                text={
                  selectedUnit?.status === "occupied" ? "Occupied" : "Vacant"
                }
                type={
                  selectedUnit?.status === "occupied" ? "success" : "warning"
                }
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Building</p>
            <p className="text-gray-900">
              {getBuilding(selectedUnit?.buildingId)?.name}
            </p>
          </div>
          <Button className="w-full">Edit Unit</Button>
        </div>
      </Modal>
    </LandlordLayout>
  );
}
