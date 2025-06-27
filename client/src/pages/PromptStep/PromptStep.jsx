import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext.jsx';
import { useNavigate } from 'react-router-dom';
import './PromptStep.scss';
import { ExclamationIcon } from '../../components/AppIcons';

const PromptStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const { mode } = brandData;

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

  return (
    <section className="prompt-step">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__heading">Tell us about your brand</h2>

        <label className="form__label">
          Brand Type:
          <select name="type" value={brandData.type} onChange={handleChange}>
            <option value="healer">Healer</option>
            <option value="teacher">Teacher</option>
            <option value="visionary">Visionary</option>
          </select>
        </label>

        <label className="form__label">
          Purpose:
          <textarea
            className={`form__textarea ${
              fieldErrors.purpose ? 'form__textarea--error' : ''
            }`}
            name="purpose"
            value={brandData.purpose}
            onChange={handleChange}
          />
          {fieldErrors.purpose && (
            <p className="form__error-message">
              <span className="form__error-icon" aria-hidden="true">
                <ExclamationIcon size={16} />
              </span>
              {fieldErrors.purpose}
            </p>
          )}
        </label>

        <label className="form__label">
          Goals:
          <textarea
            className={`form__textarea ${
              fieldErrors.goals ? 'form__textarea--error' : ''
            }`}
            name="goals"
            value={brandData.goals}
            onChange={handleChange}
          />
          {fieldErrors.goals && (
            <p className="form__error-message">
              <span className="form__error-icon" aria-hidden="true">
                <ExclamationIcon size={16} />
              </span>
              {fieldErrors.goals}
            </p>
          )}
        </label>

        <label className="form__label">
          Values:
          <textarea
            className={`form__textarea ${
              fieldErrors.values ? 'form__textarea--error' : ''
            }`}
            name="values"
            value={brandData.values}
            onChange={handleChange}
          />
          {fieldErrors.values && (
            <p className="form__error-message">
              <span className="form__error-icon" aria-hidden="true">
                <ExclamationIcon size={16} />
              </span>
              {fieldErrors.values}
            </p>
          )}
        </label>

        <label className="form__label">
          Audience:
          <textarea
            className={`form__textarea ${
              fieldErrors.audience ? 'form__textarea--error' : ''
            }`}
            name="audience"
            value={brandData.audience}
            onChange={handleChange}
          />
          {fieldErrors.audience && (
            <p className="form__error-message">
              <span className="form__error-icon" aria-hidden="true">
                <ExclamationIcon size={16} />
              </span>
              {fieldErrors.audience}
            </p>
          )}
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
