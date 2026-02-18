"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const incomeData = [
  { month: "Jan", income: 12500 },
  { month: "Feb", income: 13200 },
  { month: "Mar", income: 12800 },
  { month: "Apr", income: 14100 },
  { month: "May", income: 13900 },
  { month: "Jun", income: 14500 },
];

const occupancyData = [
  { month: "Jan", occupied: 35, vacant: 5 },
  { month: "Feb", occupied: 36, vacant: 4 },
  { month: "Mar", occupied: 36, vacant: 4 },
  { month: "Apr", occupied: 37, vacant: 3 },
  { month: "May", occupied: 37, vacant: 3 },
  { month: "Jun", occupied: 38, vacant: 2 },
];

export default function ReportsPage() {
  return (
    <LandlordLayout>
      <div className="p-6 md:p-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h2>
          <p className="text-gray-600 mt-1">
            Track property performance and trends
          </p>
        </div>

        {/* Income Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Monthly Income
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#2563eb"
                dot={{ fill: "#2563eb" }}
                strokeWidth={2}
                name="Monthly Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Occupancy Rate
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="occupied"
                stackId="a"
                fill="#10b981"
                name="Occupied"
              />
              <Bar dataKey="vacant" stackId="a" fill="#ef4444" name="Vacant" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Average Occupancy Rate</p>
            <p className="text-3xl font-bold text-blue-600">94%</p>
            <p className="text-xs text-gray-600 mt-2">↑ 2% from last quarter</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">
              Total Revenue (6 months)
            </p>
            <p className="text-3xl font-bold text-green-600">$80,100</p>
            <p className="text-xs text-gray-600 mt-2">
              ↑ 5% from previous period
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Collection Rate</p>
            <p className="text-3xl font-bold text-blue-600">98%</p>
            <p className="text-xs text-gray-600 mt-2">↑ 1% from last quarter</p>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
}
