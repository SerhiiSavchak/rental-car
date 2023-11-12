import css from './Favorite.module.css';
import { Container } from 'components/common/Container/Container';

import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { getFavoriteCars, getCars } from 'redux/selectors';
import { fetchCars } from 'redux/car/carOperations';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteCars } from 'redux/car/carSlice';
import { FavoriteList } from 'components/favorite/FavoriteList/FavoriteList';
import { deleteFilter } from 'redux/filter/filterSlice';

export const Favorite = () => {
  const dispatch = useDispatch();

  const favoriteCars = useSelector(getFavoriteCars);

  const cars = useSelector(getCars);

  const filteredCars = cars.filter(car => favoriteCars.includes(car.id));

  useEffect(() => {
    dispatch(deleteCars());
    dispatch(fetchCars({ limit: '' }));
    return () => {
      dispatch(deleteCars());
      dispatch(deleteFilter());
    };
  }, [dispatch]);

  return (
    <section className={css.favoriteSection}>
      <Container>
        <FavoriteList>
          {filteredCars && filteredCars.length !== 0 ? (
            filteredCars.map(car => <CatalogItem key={car.id} car={car} />)
          ) : (
            <p className={css.favoriteText}>No favorite car found</p>
          )}
        </FavoriteList>
      </Container>
    </section>
  );
};
