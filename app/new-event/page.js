// 📁 app/new-event/page.js
'use client';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import EventForm from '../../components/EventForm';

const ADD_EVENT = gql`
  mutation AddEvent(
    $title: String!
    $description: String
    $startTime: String!
    $endTime: String!
    $location: String!
    $isRecurring: Boolean!
    $recurrenceRule: String
  ) {
    addEvent(
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

export default function NewEventPage() {
  const router = useRouter();
  const [addEvent, { loading }] = useMutation(ADD_EVENT, {
    onCompleted: (data) => {
      router.push(`/event/${data.addEvent._id}`);
    },
  });

  const handleSubmit = async (formData) => {
    await addEvent({
      variables: {
        title: formData.title,
        description: formData.description,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        location: formData.location,
        isRecurring: formData.isRecurring,
        recurrenceRule: formData.isRecurring ? formData.recurrenceRule : null,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-400 px-4 py-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Create New Event</h1>
        <EventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
} 