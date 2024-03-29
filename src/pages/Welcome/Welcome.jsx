import css from './Welcome.module.css';
import { Link } from 'react-router-dom';
import { Container } from 'components/common/Container/Container';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { deleteCars } from 'redux/car/carSlice';
import { deleteFilter } from 'redux/filter/filterSlice';
import { motion, AnimatePresence } from 'framer-motion';

export const Welcome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteCars());
    dispatch(deleteFilter());
  }, [dispatch]);

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={css.welcomeSection}
      >
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
      </motion.section>
    </AnimatePresence>
  );
};
