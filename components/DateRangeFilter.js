'use client';

import { useState } from 'react';

export default function DateRangeFilter({ onFilter }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleFilter = () => {
    if (from && to) {
      onFilter({ from, to });
    }
  };

  return (
    <div className="mb-6 p-4 rounded-lg text-white shadow-md flex flex-col sm:flex-row sm:items-end gap-4">
      <div className="flex-1">
        <label className="block text-sm font-semibold mb-1">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 text-black"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold mb-1">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 text-black"
        />
      </div>
      <button
        onClick={handleFilter}
        className="bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-100 transition"
      >
        Filter
      </button>
    </div>
  );
}
