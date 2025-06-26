import { Container } from '../index';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default DefaultLayout;
