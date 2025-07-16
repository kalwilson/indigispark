import { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';
import './BrandTypeStep.scss';
import { humanReadable } from '../../utils/formatting';

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

  // clears the prset/default backend healer type, but still lets user select healer
  useEffect(() => {
    if (brandData.type === 'healer' && !brandData._hasUserSelectedType) {
      setBrandData((prev) => ({ ...prev, type: '', summary: null }));
      setBrandSummary(null);
    } else if (brandData.type) {
      if (brandData.summary) {
        setBrandSummary(brandData.summary);
      } else if (allSummaries[brandData.type]?.summaries?.length) {
        const summaries = allSummaries[brandData.type].summaries;
        const randomIndex = Math.floor(Math.random() * summaries.length);
        setBrandSummary(summaries[randomIndex]);
      }
    } else {
      setBrandSummary(null);
    }
  }, [brandData.type, brandData.summary, allSummaries]);

  // updates brandData, picks a random summary for display, checks for user selection
  const handleTypeSelect = (type) => {
    setBrandData((prev) => ({
      ...prev,
      type,
      _hasUserSelectedType: true,
    }));

    const summaries = allSummaries[type]?.summaries;
    if (summaries?.length) {
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
    const summaries = allSummaries[type]?.summaries;

    if (summaries && summaries.length) {
      let newSummary;
      let attempts = 0;
      const maxAttempts = 10;

      do {
        const randomIndex = Math.floor(Math.random() * summaries.length);
        newSummary = summaries[randomIndex];
        attempts++;
      } while (newSummary === brandSummary && attempts < maxAttempts);

      setBrandSummary(newSummary);
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
        <h2 className="brandtype__heading">
          Pick the path your brand travels.
        </h2>
        <p className="brandtype__tagline">
          Your brand is a presence. A way of showing up in the world.
        </p>
        <p className="brandtype__info">
          Choose the role that resonates most with your values and creative
          spirit. There's no wrong path, only the one that feels true.
        </p>
        <details className="brandtype__details">
          <summary className="brandtype__help">
            Not sure which to pick? Click here!
          </summary>
          <p className="brandtype__hint">
            Read through the types and choose the one that feels most like your
            brand's role in the world. If more than one calls to you, follow
            your gut — you can always reroll summaries later.
          </p>
        </details>
        {brandTypes.length === 0 ? (
          <p className="brandtype__loading">Loading brand types...</p>
        ) : (
          <div className="brandtype__types">
            {brandTypes.map((type) => (
              <button
                type="button"
                key={type}
                className={`brandtype__type${
                  brandData.type === type ? ' brandtype__type--selected' : ''
                }`}
                onClick={() => handleTypeSelect(type)}
              >
                {humanReadable(type)}
              </button>
            ))}
          </div>
        )}
        {!brandData.type ? (
          <>&nbsp;</>
        ) : (
          <p>
            <strong>
              {'The ' + humanReadable(brandData.type) + "'s Path: "}
            </strong>
            {allSummaries[brandData.type]?.description}
          </p>
        )} 
        <div className="brandtype__summary">
          {brandData.type && brandSummary ? (
            <>
              <p className="brandtype__summary-text">“{brandSummary}”</p>
              <button
                type="button"
                className="brandtype__reroll-btn"
                onClick={rerollSummary}
              >
                Reroll Summary
              </button>
            </>
          ) : (
            <p className="brandtype__summary-placeholder"> &nbsp; </p>
          )}
        </div>

        <button className="brandtype__button" type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Next'}
        </button>
        {error && <p className="form__error-message">{error}</p>}
      </form>
    </section>
  );
};

export default BrandTypeStep;
