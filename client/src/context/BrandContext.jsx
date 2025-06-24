import { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brandData, setBrandData] = useState({
    // to-do double check k/v pairs with backend
    purpose: '',
    goals: '',
    values: '',
    type: 'healer',
    mode: 'static',
    staticMode: 'byMood', // random or byMood, only if mode === 'static'
    mood: '',
    nameSuggestions: [],
    aesthetic: null,
    summary: '',
  });

  return (
    <BrandContext.Provider value={{ brandData, setBrandData }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
