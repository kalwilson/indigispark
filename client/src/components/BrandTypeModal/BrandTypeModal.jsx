import { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import './BrandTypeModal.scss';

const BrandTypeModal = () => {
  const { apiUrl } = useApi();
  const [brandDescriptions, setBrandDescriptions] = useState({});

  useEffect(() => {
    const getBrandDescriptions = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/prompts/brand-type-descriptions`
        );
        const data = await response.json();
        setBrandDescriptions(data.descriptions || {});
      } catch (error) {
        console.error('Failed to load brand descriptions:', error);
      }
    };

    getBrandDescriptions();
  }, [apiUrl]);
  return (
    <>
      {Object.entries(brandDescriptions).map(([key, description]) => (
        <div className="modal__section" key={key}>
          <h4 className="modal__heading">{key}</h4>
          <p className="modal__description">{description}</p>
        </div>
      ))}
    </>
  );
};

export default BrandTypeModal;
