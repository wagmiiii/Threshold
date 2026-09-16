import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ErrorBoundary } from './ErrorBoundary';

window.addEventListener('error', (e) => {
  document.body.innerHTML += `<div style="color:red;padding:20px;font-family:monospace;z-index:9999;position:relative;">GLOBAL ERROR: ${e.message} <br> ${e.filename}:${e.lineno} <br> ${e.error?.stack}</div>`;
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
