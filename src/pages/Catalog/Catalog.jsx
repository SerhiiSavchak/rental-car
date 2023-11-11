import css from './Catalog.module.css';
import { CatalogForm } from 'components/catalog/CatalogForm/CatalogForm';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { Container } from 'components/common/Container/Container';
import { CarModal } from 'components/common/CarModal/CarModal';
import { Button } from 'components/common/Button/Button';
import { fetchCars } from 'redux/car/carOperations';
import {
  getCars,
  getCarsIsLoading,
  getFilter,
  getCurrentCar,
} from 'redux/selectors';
import { TailSpin } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Catalog = () => {
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const carResponse = useSelector(getCars);
  const filter = useSelector(getFilter);
  const currentCar = useSelector(getCurrentCar);
  const isLoading = useSelector(getCarsIsLoading);
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
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

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setCars(prevCars => [...prevCars, ...carResponse]);
  }, [carResponse]);

  useEffect(() => {
    if (currentCar) {
      setIsShowModal(true);
    }
  }, [currentCar]);
  useEffect(() => {
    dispatch(fetchCars({ page }));
  }, [dispatch, page]);

  return (
    <>
      <section style={{ padding: '70px 0px' }}>
        <Container>
          <CatalogForm />

          <CatalogList>
            <>
              {filter
                ? filteredCars().map(car => (
                    <CatalogItem key={car.id} car={car} />
                  ))
                : cars.map(car => <CatalogItem key={car.id} car={car} />)}
            </>
          </CatalogList>
          {carResponse.length !== 0 ? (
            <Button
              handleClick={onLoadMore}
              text="Load more"
              type="button"
              padding="10px 44px"
              margin="70px auto 0px"
            />
          ) : (
            <p className={css.catalogText}>Sorry, we are out of cars</p>
          )}
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
