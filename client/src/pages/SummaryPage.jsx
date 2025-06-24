import { useBrand } from '../context/BrandContext';
import { useNavigate } from 'react-router-dom';
const SummaryPage = () => {
  const { brandData, setBrandData } = useBrand();
  const navigate = useNavigate();

  const { selectedName, aesthetic, summary } = brandData;

  const handleRestart = () => {
    setBrandData({
      purpose: '',
      goals: '',
      values: '',
      audience: '',
      type: 'healer',
      mode: 'static',
      nameSuggestions: [],
      aesthetic: null,
      summary: '',
      selectedName: '',
      vibe: '',
    });

    navigate('/');
  };

  return (
    <div>
      <h2>Your Brand Summary</h2>
      <p>Name: {selectedName?.name}</p>
      <p>Meaning: {selectedName?.meaning}</p>
      <p>Brand Type: {brandData.type}</p>
      <p>Purpose: {brandData.purpose}</p>
      <p>Goals: {brandData.goals}</p>
      <p>Values: {brandData.values}</p>
      <p>Audience: {brandData.audience}</p>
      <p>Summary: {summary}</p>
      <p>Aesthetic: {aesthetic?.mood}</p>
      <p>{aesthetic?.vibe}</p>
      <p>Colors:</p>
      {aesthetic?.colors.map((color, i) => (
        <div key={i}>
          <span>
            {color.name} ({color.hex})
          </span>
          <div
            style={{
              background: color.hex,
              width: 30,
              height: 30,
              display: 'inline-block',
            }}
          />
        </div>
      ))}
      <p>Motifs:</p>
      <ul>
        {aesthetic?.motifs.map((motif, i) => (
          <li key={i}>{motif}</li>
        ))}
      </ul>
      <p>Styles:</p>
      <ul>
        {aesthetic?.styles.map((style, i) => (
          <li key={i}>{style}</li>
        ))}
      </ul>
      <button onClick={handleRestart}>Start Over?</button>
    </div>
  );
};

export default SummaryPage;
