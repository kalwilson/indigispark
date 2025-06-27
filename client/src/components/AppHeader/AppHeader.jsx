import { Link, useLocation } from 'react-router-dom';
import { QuestionIcon, HomeIcon } from '../AppIcons';
import './AppHeader.scss';
const AppHeader = () => {
  const location = useLocation();

  return (
    <>
      <header className="site-header">
        <nav className="site-nav">
          <ul className="site-nav__list">
            <li className="site-nav__item">
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
