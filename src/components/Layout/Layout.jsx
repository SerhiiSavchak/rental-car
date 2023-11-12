import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Navigation } from '../Navigation/Navigation';
import { Container } from '../common/Container/Container';

export const Layout = () => {
  return (
    <>
      <Header>
        <Container>
          <Navigation />
        </Container>
      </Header>

      <Outlet />
    </>
  );
};
