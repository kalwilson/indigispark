import { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brandData, setBrandData] = useState({
    purpose: '',
    goals: '',
    values: '',
    audience: '',
    type: 'healer',
    mood: 'dreamy',
    mode: 'static',
    staticMode: 'byMoodGroup',
    name: '',
    moodTagGroup: '',
    colorTagGroup: '',
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
