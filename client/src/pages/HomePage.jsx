import { useNavigate } from 'react-router-dom';
import { useBrand } from '../context/BrandContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { brandData, setBrandData } = useBrand();

  const handleModeChange = (event) => {
    setBrandData({ ...brandData, mode: event.target.value });
  };

  return (
    <div className="homepage">
      <h1 className="homepage__heading">Lightling Labs</h1>
      <p className="homepage__description">
        Gently spark your brand's beginning. Guided tools to help Indigenous
        creators name, shape, and style their creative identity with heart.
      </p>
      <label>
        Choose experience mode:
        <select value={brandData.mode} onChange={handleModeChange}>
          <option value="static">Static</option>
          <option value="ai">AI-Generated</option>
        </select>
      </label>
      <button onClick={() => navigate('/prompts')} className="homepage__button">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
