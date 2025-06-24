import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext.jsx';

const PromptStep = () => {
  const navigate = useNavigate();
  const { brandData, setBrandData } = useBrand();

  const [formData, setFormData] = useState({
    // k/v pairs from context
    purpose: brandData.purpose || '',
    goals: brandData.goals || '',
    values: brandData.values || '',
    type: brandData.type || 'healer',
    mode: brandData.mode || 'static',
  });
  return <></>;
};

export default PromptStep;
