import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext';
import { useNavigate } from 'react-router-dom';

const NameStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [localVibe, setLocalVibe] = useState(brandData.vibe || 'dreamy'); // Controlled select
  const navigate = useNavigate();

  const fetchNames = async () => {
    setLoading(true);
    setError('');
    setNames([]);

    try {
      const res = await fetch(`${apiUrl}/api/generate-name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          values: brandData.values,
          audience: brandData.goals,
          vibe: localVibe,
          mode: brandData.mode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setNames(
          data.namesData.map((entry) =>
            typeof entry === 'string' ? { name: entry, meaning: '' } : entry
          )
        );
        setBrandData((prev) => ({ ...prev, vibe: localVibe })); // Save vibe to context
      } else {
        throw new Error(data.error || 'Failed to fetch names');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedName) => {
    setBrandData({ ...brandData, selectedName });
    navigate('/aesthetic');
  };

  const handleReroll = () => {
    fetchNames();
  };

  return (
    <div>
      <h2>Choose a Brand Name</h2>

      <label>
        Select a vibe:
        <select
          value={localVibe}
          onChange={(e) => setLocalVibe(e.target.value)}
          disabled={loading}
        >
          <option value="dreamy">Dreamy</option>
          <option value="grounded">Grounded</option>
          <option value="playful">Playful</option>
        </select>
      </label>

      <button
        onClick={fetchNames}
        disabled={loading}
        style={{ marginLeft: '1rem' }}
      >
        {loading ? 'Generating...' : 'Generate Names'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading &&
        names.map((nameObj, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h3>{nameObj.name}</h3>
            {nameObj.meaning && <p>{nameObj.meaning}</p>}
            <button onClick={() => handleSelect(nameObj)}>Use This</button>
          </div>
        ))}

      {!loading && names.length > 0 && (
        <button onClick={handleReroll} style={{ marginTop: '1rem' }}>
          🔁 Show Different Names
        </button>
      )}
    </div>
  );
};

export default NameStep;
