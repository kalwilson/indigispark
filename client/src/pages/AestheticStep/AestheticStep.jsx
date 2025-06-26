import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext.jsx';
import { useNavigate } from 'react-router-dom';

const moods = ['Soft Sovereignty', 'Starborn Mischief', 'Bloomcraft'];

const AestheticStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const navigate = useNavigate();

  const [staticMode, setStaticMode] = useState('random');
  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [aesthetic, setAesthetic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAesthetic = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/aesthetic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: brandData.mode,
          staticMode,
          mood: staticMode === 'byMood' ? selectedMood : null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAesthetic(data.aestheticData);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    setBrandData({ ...brandData, aesthetic });
    navigate('/summary');
  };

  return (
    <div>
      <h2>Choose Your Brand Aesthetic</h2>

      <label>
        Mode:
        <select
          value={staticMode}
          onChange={(e) => setStaticMode(e.target.value)}
        >
          <option value="random">Random</option>
          <option value="byMood">Select by Mood</option>
        </select>
      </label>

      {staticMode === 'byMood' && (
        <label>
          Mood:
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            {moods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      )}

      <button onClick={fetchAesthetic} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Aesthetic'}
      </button>

      {aesthetic && (
        <>
          <h3>{aesthetic.mood}</h3>
          <p>{aesthetic.vibe}</p>
          <div>
            <h4>Colors</h4>
            {aesthetic.colors.map((c, i) => (
              <div
                key={i}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <div style={{ background: c.hex, width: 30, height: 30 }} />
                <span>
                  {c.name} ({c.hex})
                </span>
              </div>
            ))}
          </div>

          <h4>Motifs</h4>
          <ul>
            {aesthetic.motifs.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          <h4>Styles</h4>
          <ul>
            {aesthetic.styles.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <button onClick={handleSelect}>Use this aesthetic</button>
          <button onClick={fetchAesthetic} disabled={loading}>
            🔁 Reroll
          </button>
        </>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AestheticStep;
