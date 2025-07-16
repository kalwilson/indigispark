import { createContext, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  return (
    <ApiContext.Provider value={{ apiUrl }}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
