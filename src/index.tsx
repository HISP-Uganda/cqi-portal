import React from 'react';
import ReactDOM from 'react-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ChakraProvider } from "@chakra-ui/react"
import App from './App';
import 'antd/dist/antd.css';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false
      },
    },
  }
)

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
