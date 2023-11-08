import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header/Header';
import { Navigation } from '../Navigation/Navigation';
import { Container } from '../Container/Container';

export const Layout = () => {
  return (
    <>
      <Header>
        <Container>
          <Navigation />
        </Container>
      </Header>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
