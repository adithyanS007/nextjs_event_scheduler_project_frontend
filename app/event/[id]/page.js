'use client';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      title
      description
      startTime
      endTime
      location
      isRecurring
      recurrenceRule
    }
  }
`;

export default function EventDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400">
        <p className="text-red-200 text-lg">Error: {error.message}</p>
      </div>
    );

  const event = data.event;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">{event.title}</h1>
        {event.description && (
          <p className="text-gray-700 whitespace-pre-line text-center">{event.description}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Start:</strong>{' '}
            <span>{new Date(event.startTime).toLocaleString()}</span>
          </div>
          <div>
            <strong>End:</strong>{' '}
            <span>{new Date(event.endTime).toLocaleString()}</span>
          </div>
          <div>
            <strong>Location:</strong> <span>{event.location}</span>
          </div>
          <div>
            <strong>Recurring:</strong>{' '}
            <span>{event.isRecurring ? 'Yes' : 'No'}</span>
          </div>
          {event.isRecurring && (
            <div className="sm:col-span-2">
              <strong>Recurrence Rule:</strong>{' '}
              <span>{event.recurrenceRule}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
