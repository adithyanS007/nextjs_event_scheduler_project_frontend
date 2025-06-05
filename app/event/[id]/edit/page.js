'use client';

import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter, useParams } from 'next/navigation';
import EventForm from '../../../../components/EventForm';

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

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String!
    $description: String
    $startTime: String!
    $endTime: String!
    $location: String!
    $isRecurring: Boolean!
    $recurrenceRule: String
  ) {
    updateEvent(
      id: $id
      title: $title
      description: $description
      startTime: $startTime
      endTime: $endTime
      location: $location
      isRecurring: $isRecurring
      recurrenceRule: $recurrenceRule
    ) {
      _id
    }
  }
`;

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_EVENT, { variables: { id } });

  const [updateEvent, { loading: updating }] = useMutation(UPDATE_EVENT, {
    onCompleted: () => {
      router.push(`/event/${id}`);
    },
  });

  const handleSubmit = (formData) => {
    console.log('Submitting:', formData);

    const { __typename, ...cleanData } = formData;

    updateEvent({
      variables: {
        id,
        title: cleanData.title,
        description: cleanData.description,
        startTime: new Date(cleanData.startTime).toISOString(),
        endTime: new Date(cleanData.endTime).toISOString(),
        location: cleanData.location,
        isRecurring: cleanData.isRecurring,
        recurrenceRule: cleanData.isRecurring ? cleanData.recurrenceRule : null,
      },
    });
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-emerald-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Edit Event</h1>
        <EventForm
          onSubmit={handleSubmit}
          initialData={data.event}
          loading={updating}
        />
      </div>
    </div>
  );
}
