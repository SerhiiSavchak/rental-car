import { Button } from 'components/common/Button/Button';
import css from './CatalogItem.module.css';
import { useState } from 'react';
import errorImg from 'images/noImg.svg';
import sprite from 'images/icons/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, deleteFavorite } from 'redux/favorite/favoriteSlice';
import { getFavoriteCars } from 'redux/selectors';
import { fetchCarById } from 'redux/car/carOperations';
import PropTypes from 'prop-types';

export const CatalogItem = ({ car }) => {
	const {id,img, make, model, year, rentalPrice, rentalCompany, address, type, mileage, engineSize} = car;
  const dispatch = useDispatch();
  const favorite = useSelector(getFavoriteCars);
  const [isFavorite, setIsFavorite] = useState(favorite.includes(car.id));

  const onInfoClick = id => {
    dispatch(fetchCarById(id));
  };

  const onFavoriteClick = id => {
    setIsFavorite(!isFavorite);

    !favorite.includes(id)
      ? dispatch(setFavorite(id))
      : dispatch(deleteFavorite(id));
  };

  return (
    <li id={id} className={css.catalogMainItem}>
      <button
        onClick={() => onFavoriteClick(car.id)}
        className={css.catalogFavBtn}
        type="button"
      >
        <svg className={css.catalogIcon}>
          {isFavorite ? (
            <use href={sprite + '#icon-heart-blue'}></use>
          ) : (
            <use href={sprite + '#icon-heart'}></use>
          )}
        </svg>
      </button>
      <div className={css.catalogImgWrap}>
        <img
          className={css.catalogImg}
          alt="car"
          style={!img ? { minWidth: '315px' } : {}}
          loading="lazy"
          src={img ? img : errorImg}
        />
      </div>
      <div className={css.catalogThumb}>
        <div className={css.catalogWrap}>
          <h2 className={css.catalogTitle}>
            {model.length > 7 ? `${make},` : `${make}`}
            <span className={css.catalogMakeSpan}>
              {' '}
              {model.length > 7 ? '' : `${model},`}
            </span>
            <span className={css.catalogSpan}> {year}</span>
          </h2>
          <p className={css.catalogTopText}>{rentalPrice}</p>
        </div>
        <ul className={css.catalogList}>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>
              {car.address.split(' ')[3].slice(0, -1)}
            </p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{address.split(' ')[4]}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{rentalCompany}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{type}</p>
          </li>

          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{model}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{mileage}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{engineSize}</p>
          </li>
        </ul>
        <Button
          id={id}
          handleClick={onInfoClick}
          type="button"
          text="Learn more"
          width="274px"
          height="44px"
          padding="12px 99px"
        />
      </div>
    </li>
  );
};

CatalogItem.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    img: PropTypes.string,
    description: PropTypes.string.isRequired,
    fuelConsumption: PropTypes.string.isRequired,
    engineSize: PropTypes.string.isRequired,
    accessories: PropTypes.arrayOf(PropTypes.string).isRequired,
    functionalities: PropTypes.arrayOf(PropTypes.string).isRequired,
    rentalPrice: PropTypes.string.isRequired,
    rentalCompany: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rentalConditions: PropTypes.string.isRequired,
    mileage: PropTypes.number.isRequired,
  }),
};
