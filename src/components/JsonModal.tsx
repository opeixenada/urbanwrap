"use client";

import React from "react";
import { X } from "lucide-react";

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: unknown;
}

export const JsonModal: React.FC<JsonModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-7/8 w-full max-w-4xl flex-col rounded-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">Raw JSON Data</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-auto p-4">
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
