import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.tsx';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000,
        keepPreviousData: true,
        retry: 2,
      },
    },
  }
)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
