"use client";

import { useState } from "react";

export default function DateTestPage() {
  const [testDate, setTestDate] = useState("2025-10-15T04:57:54.492Z");
  const [formattedDate, setFormattedDate] = useState("");

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const handleFormat = () => {
    setFormattedDate(formatDate(testDate));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Date Formatting Test</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Date String:
        </label>
        <input
          type="text"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleFormat}
          className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Format Date
        </button>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Formatted Date</h3>
        <p className="text-xl">{formattedDate || "Click 'Format Date' to see result"}</p>
      </div>
    </div>
  );
}