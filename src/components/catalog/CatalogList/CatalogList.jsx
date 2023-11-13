import css from './CatalogList.module.css';
import { CatalogItem } from 'components/catalog/CatalogItem/CatalogItem';
import { Button } from 'components/common/Button/Button';
import { getClientFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { getCars, getCarResponse } from 'redux/selectors';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

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

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={css.catalogList}
      >
        {filteredCars() &&
          filteredCars().map(car => <CatalogItem key={car.id} car={car} />)}
       
      </motion.ul>
		{carResponse.length >= 12 && filteredCars().length >= 12 && (
          <Button
            handleClick={onLoadMore}
            text="Load more"
            type="button"
            padding="10px 44px"
            margin="70px auto 0px"
          />
        )}
    </AnimatePresence>
  );
};

CatalogList.propTypes = {
  setPage: PropTypes.func,
};
