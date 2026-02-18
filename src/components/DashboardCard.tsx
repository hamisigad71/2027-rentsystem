import React from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "green" | "red" | "yellow" | "purple" | "pink";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  green: "bg-green-50 text-green-600 border-green-200",
  red: "bg-red-50 text-red-600 border-red-200",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  pink: "bg-pink-50 text-pink-600 border-pink-200",
};

const iconBgClasses = {
  blue: "bg-blue-100",
  green: "bg-green-100",
  red: "bg-red-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  pink: "bg-pink-100",
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
}: DashboardCardProps) {
  return (
    <div
      className={`p-6 rounded-lg border ${colorClasses[color]} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-2 ${
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.direction === "up" ? "↑" : "↓"} {trend.value}% from last
              month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
