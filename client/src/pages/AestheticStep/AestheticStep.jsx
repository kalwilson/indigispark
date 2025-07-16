import { useState, useEffect } from 'react';
import { useApi } from '../../context/ApiContext';
import { useBrand } from '../../context/BrandContext.jsx';
import { useNavigate } from 'react-router-dom';

const moods = ['Soft Sovereignty', 'Starborn Mischief', 'Bloomcraft'];

const AestheticStep = () => {
  const { apiUrl } = useApi();
  const { brandData, setBrandData } = useBrand();
  const navigate = useNavigate();

  const [staticMode, setStaticMode] = useState('random');
  // const [aesthetic, setAesthetic] = useState(null);
  const [aesthetics, setAesthetics] = useState([]);
  const [moodGroups, setMoodGroups] = useState([]);
  const [colorGroups, setColorGroups] = useState([]);
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
          name: staticMode === 'byName' ? brandData.name : undefined,
          mood:
            staticMode === 'byMoodGroup' ? brandData.moodTagGroup : undefined,
          color:
            staticMode === 'byColorGroup' ? brandData.colorTagGroup : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const results = data.aestheticData || data.aesthetics;

        if (Array.isArray(results)) {
          setAesthetics(results);
        } else if (results) {
          setAesthetics([results]);
        }
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedAesthetic) => {
    setBrandData({ ...brandData, aesthetic: selectedAesthetic });
    navigate('/summary');
  };

  useEffect(() => {
    const getTagGroups = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/aesthetic/tag-groups`);
        const data = await response.json();

        setMoodGroups(data.moodGroups);
        setColorGroups(data.colorGroups);

        console.log('Fetched mood groups:', data.moodGroups);
        console.log('Fetched color groups:', data.colorGroups);
      } catch (error) {
        console.error('Failed to get tag groups:', error);
      }
    };
    getTagGroups();
  }, [apiUrl]);

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
          <option value="byMoodGroup">By Mood Group</option>
          <option value="byColorGroup">By Color Group</option>
        </select>
      </label>

      {staticMode === 'byMoodGroup' && (
        <label>
          Mood Group:
          <select
            value={brandData.moodTagGroup}
            onChange={(e) =>
              setBrandData({ ...brandData, moodTagGroup: e.target.value })
            }
          >
            {moodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
      )}

      {staticMode === 'byColorGroup' && (
        <label>
          Color Group:
          <select
            value={brandData.colorTagGroup}
            onChange={(e) =>
              setBrandData({ ...brandData, colorTagGroup: e.target.value })
            }
          >
            {colorGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>
      )}

      {staticMode === 'byName' && (
        <label>
          Aesthetic Name:
          <select
            value={brandData.name}
            onChange={(e) =>
              setBrandData({ ...brandData, name: e.target.value })
            }
          >
            {nameOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      )}

      <button onClick={fetchAesthetic} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Aesthetic'}
      </button>

      {/* {aesthetic && (
        <>
          <h3>{aesthetic.name}</h3>
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
            Reroll
          </button>
        </>
      )} */}
      {aesthetics.length > 0 && (
        <div>
          {aesthetics.map((aesthetic, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h3>{aesthetic.name}</h3>
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

              <button onClick={() => handleSelect(aesthetic)}>
                Use this aesthetic
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AestheticStep;
