import css from './Catalog.module.css';
import { CatalogForm } from 'components/catalog/CatalogForm/CatalogForm';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { Container } from 'components/common/Container/Container';
import { CarModal } from 'components/common/CarModal/CarModal';
import { fetchCars } from 'redux/car/carOperations';
import { getCarsIsLoading, getCurrentCar } from 'redux/selectors';
import { TailSpin } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

export const Catalog = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const currentCar = useSelector(getCurrentCar);
  const isLoading = useSelector(getCarsIsLoading);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (currentCar) {
      setIsShowModal(true);
    }
  }, [currentCar]);

  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  return (
    <AnimatePresence>
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
      {isShowModal && (
        <CarModal setIsShowModal={setIsShowModal} car={currentCar} />
      )}
      {isLoading && (
        <div className={css.loaderWrap}>
          <TailSpin color="#3470ff" />
        </div>
      )}
    </AnimatePresence>
  );
};
