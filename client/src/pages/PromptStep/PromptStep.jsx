import { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext.jsx';
import { useNavigate } from 'react-router-dom';
import './PromptStep.scss';
import { ExclamationIcon } from '../../components/AppIcons';

const PromptStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const { mode } = brandData;

  const [brandTypes, setBrandTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name] && value.trim() !== '') {
      setFieldErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const requiredFields = {
      purpose: { label: 'Purpose', plural: false },
      goals: { label: 'Goals', plural: true },
      values: { label: 'Values', plural: true },
      audience: { label: 'Audience', plural: false },
    };
    const newErrors = {};

    Object.keys(requiredFields).forEach((field) => {
      const { label, plural } = requiredFields[field];
      if (!brandData[field].trim()) {
        newErrors[field] = `${label} ${plural ? 'are' : 'is'} required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setLoading(false);
      return;
    }

    setFieldErrors({});

    try {
      const res = await fetch(`${apiUrl}/api/prompts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...brandData,
          mode: brandData.mode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setBrandData({ ...brandData, summary: data.summary });
        navigate('/names');
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getBrandTypes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/prompts/brand-types`);
        const data = await response.json();
        setBrandTypes(data.types || []);
      } catch (error) {
        console.error('Failed to get all brand types', error);
      }
    };

    getBrandTypes();
  }, [apiUrl]);

  return (
    <section className="prompt-step">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__heading">Tell us about your brand</h2>

        <label className="form__label">
          Brand Type:
          <select
            name="type"
            value={brandData.type}
            onChange={handleChange}
            className="form__select"
          >
            {brandTypes.length === 0 ? (
              <option value="" className="form__option">
                Loading types...
              </option>
            ) : (
              brandTypes.map((type) => (
                <option key={type} value={type} className="form__option">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="form__label" htmlFor="purpose">
          Purpose
          <p className="form__hint">What motivates you to start this brand?</p>
          <p className="form__hint">
            Think about your roots, your why, or the change you want to make.
          </p>
          <textarea
            className={`form__textarea ${
              fieldErrors.purpose ? 'form__textarea--error' : ''
            }`}
            name="purpose"
            id="purpose"
            placeholder="I want to create a space where Indigenous stories and voices feel seen and celebrated."
            value={brandData.purpose}
            onChange={handleChange}
          />
          <p
            className={`form__error-message ${
              fieldErrors.purpose ? 'visible' : ''
            }`}
            aria-live="polite"
          >
            {fieldErrors.purpose ? (
              <>
                <span className="form__error-icon" aria-hidden="true">
                  <ExclamationIcon size={12} />
                </span>
                {fieldErrors.purpose}
              </>
            ) : (
              '\u00A0'
            )}
          </p>
        </label>

        <label className="form__label">
          Goals
          <p className="form__hint">What are you hoping to achieve? </p>
          <p className="form__hint">
            This could be personal, community-based, or business goals.
          </p>
          <textarea
            className={`form__textarea ${
              fieldErrors.goals ? 'form__textarea--error' : ''
            }`}
            name="goals"
            placeholder="Sell original artwork, grow a small community, and collaborate with other Indigenous creatives."
            value={brandData.goals}
            onChange={handleChange}
          />
          <p
            className={`form__error-message ${
              fieldErrors.goals ? 'visible' : ''
            }`}
            aria-live="polite"
          >
            {fieldErrors.goals ? (
              <>
                <span className="form__error-icon" aria-hidden="true">
                  <ExclamationIcon size={12} />
                </span>
                {fieldErrors.goals}
              </>
            ) : (
              '\u00A0'
            )}
          </p>
        </label>

        <label className="form__label">
          Values
          <p className="form__hint">What values guide your brand? </p>
          <p className="form__hint">
            Think about the beliefs or teachings that are most important to you.
          </p>
          <textarea
            className={`form__textarea ${
              fieldErrors.values ? 'form__textarea--error' : ''
            }`}
            name="values"
            placeholder="Authenticity, cultural respect, reciprocity, joy, and intergenerational care."
            value={brandData.values}
            onChange={handleChange}
          />
          <p
            className={`form__error-message ${
              fieldErrors.values ? 'visible' : ''
            }`}
            aria-live="polite"
          >
            {fieldErrors.values ? (
              <>
                <span className="form__error-icon" aria-hidden="true">
                  <ExclamationIcon size={12} />
                </span>
                {fieldErrors.values}
              </>
            ) : (
              '\u00A0'
            )}
          </p>
        </label>

        <label className="form__label">
          Audience
          <p className="form__hint">
            Who do you want to connect with or support?
          </p>
          <p className="form__hint">
            Think about who your work is for and what they need.
          </p>
          <textarea
            className={`form__textarea ${
              fieldErrors.audience ? 'form__textarea--error' : ''
            }`}
            name="audience"
            placeholder="Indigenous youth and culture lovers looking for meaningful, handmade craftwork."
            value={brandData.audience}
            onChange={handleChange}
          />
          <p
            className={`form__error-message ${
              fieldErrors.audience ? 'visible' : ''
            }`}
            aria-live="polite"
          >
            {fieldErrors.audience ? (
              <>
                <span className="form__error-icon" aria-hidden="true">
                  <ExclamationIcon size={12} />
                </span>
                {fieldErrors.audience}
              </>
            ) : (
              '\u00A0'
            )}
          </p>
        </label>

        <button className="form__button" type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Next'}
        </button>
        {error && <p>Error: {error}</p>}
      </form>
    </section>
  );
};

export default PromptStep;
