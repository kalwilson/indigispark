import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext.jsx';
import { useNavigate } from 'react-router-dom';

const PromptStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const { mode } = brandData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

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
    <form onSubmit={handleSubmit}>
      <h2>Tell us about your brand</h2>

      <label>
        Brand Type:
        <select name="type" value={brandData.type} onChange={handleChange}>
          <option value="healer">Healer</option>
          <option value="teacher">Teacher</option>
          <option value="visionary">Visionary</option>
        </select>
      </label>

      <label>
        Purpose:
        <textarea
          name="purpose"
          value={brandData.purpose}
          onChange={handleChange}
        />
      </label>

      <label>
        Goals:
        <textarea
          name="goals"
          value={brandData.goals}
          onChange={handleChange}
        />
      </label>

      <label>
        Values:
        <textarea
          name="values"
          value={brandData.values}
          onChange={handleChange}
        />
      </label>

      <label>
        Audience:
        <textarea
          name="audience"
          value={brandData.audience}
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Thinking...' : 'Next'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default PromptStep;
