// import ReactDOM from 'react-dom/client';
import React from 'react';
import BaseLayout from '@app/layouts/base-layout';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BaseLayout />
  </React.StrictMode>,
);
