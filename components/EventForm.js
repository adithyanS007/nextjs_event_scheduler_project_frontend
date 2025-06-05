// 📁 components/EventForm.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function EventForm({ onSubmit, initialData = {}, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    isRecurring: false,
    recurrenceRule: '',
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (initialData && !initialized.current) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
        startTime: initialData.startTime
          ? new Date(initialData.startTime).toISOString().slice(0, 16)
          : '',
        endTime: initialData.endTime
          ? new Date(initialData.endTime).toISOString().slice(0, 16)
          : '',
      }));
      initialized.current = true;
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.startTime || !form.endTime || !form.location) {
      alert('Please fill all required fields.');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="datetime-local"
        name="startTime"
        value={form.startTime}
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        value={form.endTime}
        onChange={handleChange}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <label className="block">
        <input
          type="checkbox"
          name="isRecurring"
          checked={form.isRecurring}
          onChange={handleChange}
          className="mr-2"
        />
        Recurring Event
      </label>
      {form.isRecurring && (
        <input
          name="recurrenceRule"
          value={form.recurrenceRule}
          onChange={handleChange}
          placeholder="e.g., weekly, monthly"
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
