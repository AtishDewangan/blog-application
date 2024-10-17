"use client"; // Use this directive to ensure that it works on the client side

import { useState } from "react";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-purple-500 ${className}`}
      />
    </div>
  );
}
