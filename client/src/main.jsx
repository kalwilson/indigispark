import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/main.scss';
import { BrandProvider } from './context/BrandContext.jsx';
import { ApiProvider } from './context/ApiContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApiProvider>
        <BrandProvider>
          <App />
        </BrandProvider>
      </ApiProvider>
    </BrowserRouter>
  </StrictMode>
);
