import css from './Catalog.module.css';
import { CatalogForm } from 'components/catalog/CatalogForm/CatalogForm';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { Container } from 'components/common/Container/Container';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from 'redux/car/carOperations';
import { getCars, getFilter } from 'redux/selectors';

import { useEffect, useState } from 'react';

export const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(getCars);
  const filter = useSelector(getFilter);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCars(page));
  }, [dispatch, page]);

  return (
    <section>
      <Container>
        <CatalogForm />
        <CatalogList>
          {cars.map(car => (
            <CatalogItem key={car.id} car={car} />
          ))}
        </CatalogList>
      </Container>
    </section>
  );
};
