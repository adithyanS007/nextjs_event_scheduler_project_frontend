import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'https://nextjs-event-scheduler-project-back.vercel.app',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
