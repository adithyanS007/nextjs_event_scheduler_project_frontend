'use client';

import { gql, useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      startTime
      location
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export default function HomePage() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EVENTS);

  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT, {
    update(cache, { data: { deleteEvent: success } }, { variables }) {
      if (success) {
        // Remove the deleted event from the cache to update the UI
        const existingEvents = cache.readQuery({ query: GET_EVENTS });
        const newEvents = existingEvents.events.filter(e => e._id !== variables.id);
        cache.writeQuery({
          query: GET_EVENTS,
          data: { events: newEvents },
        });
      }
    },
    onError(err) {
      alert(`Failed to delete: ${err.message}`);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent({ variables: { id } });
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-600 to-emerald-400 py-12 px-4 sm:px-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-white mb-6 text-center">
      Upcoming Events
    </h1>

    <Link
      href="/new-event"
      className="mb-6 inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded shadow"
    >
      + Add Event
    </Link>

    <div className="w-full max-w-4xl">
      <ul className="space-y-4">
        {data.events.map((event) => (
          <li
            key={event._id}
            className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow hover:shadow-md transition duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {event.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {new Date(event.startTime).toLocaleString()} &mdash; {event.location}
              </p>
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-4 flex gap-2 flex-wrap justify-end">
              <Link
                href={`/event/${event._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                View
              </Link>
              <button
                onClick={() => router.push(`/event/${event._id}/edit`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-sm cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

}
