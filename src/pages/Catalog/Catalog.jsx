import css from './Catalog.module.css';
import { CatalogForm } from 'components/catalog/CatalogForm/CatalogForm';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { Container } from 'components/common/Container/Container';
import { CarModal } from 'components/common/CarModal/CarModal';
import { fetchCars } from 'redux/car/carOperations';
import { getCarsIsLoading, getCurrentCar, getShowModal ,getCarsError } from 'redux/selectors';
import { TailSpin } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export const Catalog = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const currentCar = useSelector(getCurrentCar);
  const isLoading = useSelector(getCarsIsLoading);
  const error = useSelector(getCarsError);

  const isShowModal = useSelector(getShowModal);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={css.catalogSection}
      >
        <Container>
          <CatalogForm />

          <CatalogList page={page} setPage={setPage} />
        </Container>
      </motion.section>
      {isShowModal && <CarModal car={currentCar} />}
      {isLoading && (
        <div className={css.loaderWrap}>
          <TailSpin color="#3470ff" />
        </div>
      )}
		{error && <p className={css.catalogErrorText}>Oops... Try later</p>}
    </>
  );
};
