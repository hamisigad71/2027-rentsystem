import React from "react";
import { ChevronDown } from "lucide-react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed",
  outline:
    "border border-gray-300 text-gray-700 hover:border-gray-400 bg-white disabled:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100 disabled:text-gray-400",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      suppressHydrationWarning
      className={`font-medium transition-colors flex items-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
