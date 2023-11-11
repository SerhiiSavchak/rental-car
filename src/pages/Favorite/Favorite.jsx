import css from './Favorite.module.css';
import { Container } from 'components/common/Container/Container';
import { CatalogList } from 'components/catalog/CatalogList/CatalogList';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { getFavoriteCars, getCars } from 'redux/selectors';
import { fetchCars } from 'redux/car/carOperations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Favorite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCars({ limit: '' }));
  }, [dispatch]);

  const favoriteCars = useSelector(getFavoriteCars);
  const cars = useSelector(getCars);
  const filteredCars = cars.filter(car => favoriteCars.includes(car.id));

  return (
    <section className={css.favoriteSection}>
      <Container>
        <CatalogList>
          {filteredCars.length !== 0 &&
            filteredCars.map(car => <CatalogItem key={car.id} car={car} />)}
        </CatalogList>
      </Container>
    </section>
  );
};
