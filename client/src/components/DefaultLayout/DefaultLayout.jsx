import { AppHeader, AppFooter, Container } from '../index';
import './DefaultLayout.scss';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="layout-wrapper">
        <AppHeader />
        <main className="layout-main">
          <Container>{children}</Container>
        </main>
        <AppFooter />
      </div>
    </>
  );
};

export default DefaultLayout;
