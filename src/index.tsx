// import ReactDOM from 'react-dom/client';
import React from 'react';
import BaseLayout from '@app/layouts/base-layout';
import ReactDOM from 'react-dom/client';
import '@app/app-style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <BaseLayout />
  </QueryClientProvider>,
);
