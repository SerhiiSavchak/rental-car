import css from './Welcome.module.css';
import { Link } from 'react-router-dom';
import { Container } from 'components/common/Container/Container';

export const Welcome = () => {
  return (
    <section className={css.welcomeSection}>
      <Container>
        <h1 className={css.welcomeTitle}>Welcome to Rental Car!</h1>
        <p className={css.welcomeTopText}>
          We are the largest car rental company in Ukraine.
        </p>
        <p className={css.welcomeText}>
          We will prove that renting is fast, easy and comfortable!
        </p>
        <Link className={css.welcomeBottomLink} to="/catalog">
          Rent a car now
        </Link>
      </Container>
    </section>
  );
};
