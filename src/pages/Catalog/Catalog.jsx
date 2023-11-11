import css from './Catalog.module.css';
import { CatalogForm } from 'components/catalog/CatalogForm/CatalogForm';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { Container } from 'components/common/Container/Container';
import { CarModal } from 'components/common/CarModal/CarModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from 'redux/car/carOperations';
import {
  getCars,
  getCarsIsLoading,
  getFilter,
  getCurrentCar,
} from 'redux/selectors';
import { TailSpin } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

export const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(getCars);
  const filter = useSelector(getFilter);
  const currentCar = useSelector(getCurrentCar);
  const isLoading = useSelector(getCarsIsLoading);

  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (currentCar) {
      setIsShowModal(true);
    }
  }, [currentCar]);

  const filteredCars = () => {
    return cars.filter(car => {
      return Object.entries(filter).every(([key, value]) => {
        if (!value) {
          return true;
        }

        if (key === 'mileageFrom') {
          return car.mileage >= value;
        }
        if (key === 'mileageTo') {
          return car.mileage <= value;
        }

        return car[key] === value;
      });
    });
  };
  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page]);

  return (
    <>
      <section style={{ padding: '100px 0px' }}>
        <Container>
          <CatalogForm />
          <CatalogList>
            {filter
              ? filteredCars().map(car => (
                  <CatalogItem key={car.id} car={car} />
                ))
              : cars.map(car => <CatalogItem key={car.id} car={car} />)}
          </CatalogList>
        </Container>
      </section>
      {isShowModal && (
        <CarModal setIsShowModal={setIsShowModal} car={currentCar} />
      )}
      {isLoading && (
        <div className={css.loaderWrap}>
          <TailSpin color="#3470ff" />
        </div>
      )}
    </>
  );
};
