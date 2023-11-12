import css from './CatalogList.module.css';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { Button } from 'components/common/Button/Button';
import { getClientFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { getCars, getCarResponse } from 'redux/selectors';

export const CatalogList = ({ setPage }) => {
  const carResponse = useSelector(getCarResponse);
  const cars = useSelector(getCars);

  const clientFilter = useSelector(getClientFilter);

  const filteredCars = () => {
    return cars.filter(car => {
      return Object.entries(clientFilter).every(([key, value]) => {
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
  console.log('filteredCars', filteredCars().length);
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <ul className={css.catalogList}>
      {filteredCars().map(car => (
        <CatalogItem key={car.id} car={car} />
      ))}
      {carResponse.length >= 12 && filteredCars().length >= 12 && (
        <Button
          handleClick={onLoadMore}
          text="Load more"
          type="button"
          padding="10px 44px"
          margin="70px auto 0px"
        />
      )}
    </ul>
  );
};
