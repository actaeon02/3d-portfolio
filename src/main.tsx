import {StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (msg.includes('THREE.Clock: This module has been deprecated')) return;
  if (msg.includes('React Router Future Flag Warning')) return;
  if (msg.includes('Please ensure that the container has a non-static position')) return;
  originalWarn(...args);
};

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);