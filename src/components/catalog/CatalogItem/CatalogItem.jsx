import { Button } from 'components/common/Button/Button';
import css from './CatalogItem.module.css';
import { useState } from 'react';
import sprite from 'images/icons/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite, deleteFavorite } from 'redux/favorite/favoriteSlice';
import { getFavoriteCars } from 'redux/selectors';
import { fetchCarById } from 'redux/car/carOperations';

export const CatalogItem = ({ car }) => {
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
    <li id={car.id} className={css.catalogMainItem}>
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
        <img className={css.catalogImg} alt="car" src={car.img} />
      </div>
      <div className={css.catalogThumb}>
        <div className={css.catalogWrap}>
          <h2 className={css.catalogTitle}>
            {car.model.length > 8 ? `${car.make},` : `${car.make}`}
            <span className={css.catalogMakeSpan}>
              {' '}
              {car.model.length > 8 ? '' : `${car.model},`}
            </span>
            <span className={css.catalogSpan}> {car.year}</span>
          </h2>
          <p className={css.catalogTopText}>{car.rentalPrice}</p>
        </div>
        <ul className={css.catalogList}>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>
              {car.address.split(' ')[3].slice(0, -1)}
            </p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.address.split(' ')[4]}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.rentalCompany}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.type}</p>
          </li>

          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.model}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.mileage}</p>
          </li>
          <li className={css.catalogItem}>
            <p className={css.catalogItemText}>{car.engineSize}</p>
          </li>
        </ul>
        <Button
          id={car.id}
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
