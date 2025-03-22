'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import type { Item } from '../../../types/item';

type SlidingSummaryProps = {
  isOpen: boolean;
  items: Item[];
};

export default function SlidingSummary({ isOpen, items }: SlidingSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Summary</h2>
            <button
              onClick={() => {
                const container = document.querySelector('.sliding-summary-component[data-open="true"]');
                if (container) {
                  container.setAttribute('data-open', 'false');
                }
              }}
              className="hover:bg-gray-100 rounded p-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close panel</span>
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="mb-4 p-3 border rounded-lg"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => {
            const container = document.querySelector('.sliding-summary-component[data-open="true"]');
            if (container) {
              container.setAttribute('data-open', 'false');
            }
          }}
        />
      )}
    </div>
  );
}
