import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { InfoIcon, XmarkIcon } from '../../components/AppIcons';
import './HomePage.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const { brandData, setBrandData } = useBrand();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section className="homepage">
      <h1 className="homepage__heading">Lightling Labs</h1>
      <p className="homepage__tagline">Spark your brand's journey with care.</p>
      <p className="homepage__description">
        Thoughtful tools to help Indigenous creators name, shape, and share
        their creative identity. Rooted in heart, culture, and vision.
      </p>
      <div className="homepage__mode-buttons">
        <div className="homepage__section">
          <p className="homepage__label">
            Choose your experience!
            <button
              className="homepage__info-button"
              onClick={() => setShowInfo(true)}
              aria-label="What do these options mean?"
            >
              <InfoIcon size={20} color="#4b6cb7" />
            </button>
          </p>

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
      {/* change to /brand-type here */}
      <button
        onClick={() => navigate('/brand-type')}
        className="homepage__button"
      >
        Get Started
      </button>
      {showInfo && (
        <div className="homepage__info-text">
          <button
            className="homepage__info-button"
            onClick={() => setShowInfo(false)}
          >
            <XmarkIcon size={20} color="#d64545" />
          </button>
          <p className="homepage__info-description">
            <span className="homepage__info-description--bold">
              Manual Mode
            </span>
            lets you choose everything yourself from preset data.
          </p>
          <p className="homepage__info-description">
            <span className="homepage__info-description--bold">AI Assist</span>
            generates custom smart suggestions and names.
          </p>
        </div>
      )}
    </section>
  );
};

export default HomePage;
