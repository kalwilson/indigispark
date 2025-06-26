import { AppHeader, AppFooter, Container } from '../index';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container>{children}</Container>
      <AppFooter />
    </>
  );
};

export default DefaultLayout;
