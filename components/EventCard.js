'use client';

import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <li className="p-4 border rounded shadow hover:bg-gray-50 transition">
      <Link href={`/event/${event._id}`}>
        <h2 className="font-semibold text-lg">{event.title}</h2>
        <p>{new Date(event.startTime).toLocaleString()} — {event.location}</p>
      </Link>
    </li>
  );
}
