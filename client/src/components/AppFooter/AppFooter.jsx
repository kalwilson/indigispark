import { CopyrightIcon } from '../AppIcons';
import './AppFooter.scss';

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="site-footer">
        <section className="site-footer__section--copyright">
          <CopyrightIcon size={12} /> {currentYear} Kal Wilson /
          <a
            href="https://linkedin.com/in/kalwilson"
            target="_blank"
            className="site-footer__outside-link"
          >
            Web Developer
          </a>
        </section>
      </footer>
    </>
  );
};

export default AppFooter;
