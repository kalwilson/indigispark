import { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';
import './BrandTypeStep.scss';

const BrandTypeStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const { mode } = brandData;
  const navigate = useNavigate();

  const [brandTypes, setBrandTypes] = useState([]);
  const [allSummaries, setAllSummaries] = useState({});
  const [brandSummary, setBrandSummary] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //   this gets all brand types and summaries
  useEffect(() => {
    const getBrandSummaries = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/prompts/brand-types`);
        const data = await response.json();
        setAllSummaries(data.types || {});
        setBrandTypes(Object.keys(data.types || {}));
      } catch (error) {
        console.error('Failed to get brand summaries:', error);
        setError('Could not load brand types. Please try again later.');
      }
    };

    getBrandSummaries();
  }, [apiUrl]);

  // updates brandData, picks a random summary for display
  const handleTypeSelect = (type) => {
    setBrandData((prev) => ({ ...prev, type }));

    const summaries = allSummaries[type]?.summaries;
    if (summaries && summaries.length) {
      const randomIndex = Math.floor(Math.random() * summaries.length);
      setBrandSummary(summaries[randomIndex]);
    } else {
      setBrandSummary(null);
    }
  };

  //   if they dont like their summary they can reroll
  // to-do: make these summaries only display in static/manual mode.
  const rerollSummary = () => {
    const type = brandData.type;
    const summaries = allSummaries[type];
    if (summaries && summaries.length) {
      const randomIndex = Math.floor(Math.random() * summaries.length);
      setBrandSummary(summaries[randomIndex]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandData.type || !brandSummary) {
      setError('Please select a brand type first.');
      return;
    }

    try {
      setLoading(true);
      setBrandData((prev) => ({ ...prev, summary: brandSummary }));
      navigate('/prompts');
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="brandtype__section">
      <form className="brandtype__form" onSubmit={handleSubmit}>
        <h2 className="brandtype__heading">What's your brand's type?</h2>
        <details className="brandtype__details">
          <summary className="brandtype__summary">Brand type summary</summary>
          <p className="brandtype__hint">Brand type hint.</p>
        </details>

        {brandTypes.length === 0 ? (
          <p className="brandtypes__loading">Loading brand types...</p>
        ) : (
          <div className="brandtype__btn-group">
            {brandTypes.map((type) => (
              <button
                type="button"
                key={type}
                className={`brandtype__btn ${
                  brandData.type === type ? 'selected' : ''
                }`}
                onClick={() => handleTypeSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {brandData.type && brandSummary && (
          <div className="brandtype__summary-box">
            <p className="brandtype__summary-text">“{brandSummary}”</p>
            <button
              type="button"
              className="brandtype__reroll-btn"
              onClick={rerollSummary}
            >
              Reroll Summary
            </button>
          </div>
        )}

        <button className="form__button" type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Next'}
        </button>

        {error && <p className="form__error-message">{error}</p>}
      </form>
    </section>
  );
};

export default BrandTypeStep;
