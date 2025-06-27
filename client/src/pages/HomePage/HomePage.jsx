import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { InfoIcon } from '../../components/AppIcons';
import './HomePage.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const { brandData, setBrandData } = useBrand();
  const [showInfo, setShowInfo] = useState(false);

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
      <div className="homepage__mode-buttons">
        <div className="homepage__label-row">
          <p className="homepage__label">
            Choose your experience!{' '}
            <button
              className="homepage__info-button"
              onClick={() => setShowInfo(true)}
              aria-label="What do these options mean?"
            >
              <InfoIcon size={17} color="#4b6cb7" />
            </button>
          </p>

          {showInfo && (
            <div className="homepage__tooltip">
              <p>
                <strong>Manual Mode</strong> lets you choose everything
                yourself.
              </p>
              <p>
                <strong>AI Assist</strong> gives you smart suggestions and
                names.
              </p>
              <button onClick={() => setShowInfo(false)}>Close</button>
            </div>
          )}
          <div className="homepage__button-group">
            <button
              className={`homepage__mode-button ${
                brandData.mode === 'static' ? 'is-active' : ''
              }`}
              onClick={() => setBrandData({ ...brandData, mode: 'static' })}
            >
              Manual Mode
            </button>
            <button
              className={`homepage__mode-button ${
                brandData.mode === 'ai' ? 'is-active' : ''
              }`}
              onClick={() => setBrandData({ ...brandData, mode: 'ai' })}
            >
              AI Assist
            </button>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/prompts')} className="homepage__button">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
