import { Link, useLocation, useNavigate } from 'react-router-dom';
import { QuestionIcon, HomeIcon, ArrowLeftIcon } from '../AppIcons';
import './AppHeader.scss';
const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showBackButton = !['/', '/summary'].includes(location.pathname);

  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <ul className="site-nav__list">
            <li className="site-nav__item">
              {showBackButton && (
                <button onClick={() => navigate(-1)} className="site-nav__link">
                  <ArrowLeftIcon
                    size={19}
                    style={{
                      transform: 'translateY(1px)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  back
                </button>
              )}
            </li>
            <li className="site-nav__item--end">
              {location.pathname === '/about' ? (
                <Link to="/" className="site-nav__link">
                  <HomeIcon size={19} /> home
                </Link>
              ) : (
                <Link to="/about" className="site-nav__link">
                  <QuestionIcon size={19} /> about
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default AppHeader;
