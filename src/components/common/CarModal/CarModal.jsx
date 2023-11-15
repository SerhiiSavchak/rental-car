import css from './CarModal.module.css';
import { useEffect } from 'react';
import { deleteCurrentCar } from 'redux/car/carSlice';
import sprite from 'images/icons/sprite.svg';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { convertNum } from 'utils/numConverter';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export const CarModal = ({ car }) => {
	const {id,img, make, model, year, rentalPrice, accessories, functionalities, fuelConsumption, rentalConditions, address, type, mileage, engineSize ,description} = car;
	
  const dispatch = useDispatch();

  const onHandleClick = e => {
    switch (e.target.id) {
      case 'backdrop':
        dispatch(deleteCurrentCar());

        return;
      case 'close':
        dispatch(deleteCurrentCar());
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    const onEscKeyPress = e => {
      if (e.key === 'Escape') {
        dispatch(deleteCurrentCar());
      }
    };
    const bodyScroll = disable => {
      document.body.style.overflow = disable ? 'hidden' : 'auto';
    };
    bodyScroll(true);
    window.addEventListener('keydown', onEscKeyPress);
    return () => {
      bodyScroll(false);
      window.removeEventListener('keydown', onEscKeyPress);
    };
  }, [dispatch]);

  const modalRoot = document.querySelector('#modal-root');
  return createPortal(
    <AnimatePresence>
      <div onClick={onHandleClick} id="backdrop" className={css.modalBackdrop}>
        <motion.div
          initial={{ x: 900 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ x: -900 }}
          className={css.modalWindow}
        >
          <div className={css.modalContent}>
            <button
              type="button"
              className={css.modalBtn}
              id="close"
              onClick={onHandleClick}
            >
              <svg id="close" className={css.modalIcon}>
                <use id="close" href={sprite + '#icon-close'}></use>
              </svg>
            </button>
            <img
              className={css.modalImg}
              loading="lazy"
              src={img}
              alt="car"
            />
            <div className={css.modalTopThumb}>
              <div className={css.modalTitleWrap}>
                <h2 className={css.modalTopTitle}>
                  {make}
                  <span className={css.modalMakeSpan}> {model}</span>
                  <span className={css.modalYearSpan}>, {year}</span>
                </h2>
              </div>
              <ul className={css.modalTopList}>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>
                    {address.split(' ')[3].slice(0, -1)}
                  </p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>
                    {address.split(' ')[4]}
                  </p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Id: ${id}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Year: ${year}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Type: ${type}`}</p>
                </li>

                <li className={css.modalTopItem}>
                  <p
                    className={css.modalTopText}
                  >{`Fuel Consumption: ${fuelConsumption}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p
                    className={css.modalTopText}
                  >{`Engine Size: ${engineSize}`}</p>
                </li>
              </ul>
            </div>
            <p className={css.modalDescText}>{description}</p>
            <div className={css.modalThumb}>
              <h3 className={css.modalTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.modalList}>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{accessories[0]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{functionalities[0]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{accessories[1]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{functionalities[1]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{accessories[2]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{functionalities[2]}</p>
                </li>
              </ul>
            </div>
            <div className={css.modalBottomThumb}>
              <h3 className={css.modalBottomTitle}>Rental Conditions: </h3>
              <ul className={css.modalBottomList}>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {`${rentalConditions.split(' ')[0]} ${
                      rentalConditions.split(' ')[1]
                    } `}{' '}
                    <span
                      className={css.modalBottomSpan}
                    >{`${rentalConditions
                      .split(' ')[2]
                      .slice(0, 2)}`}</span>
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {rentalConditions.slice(15, 39)}
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {rentalConditions.slice(39, -1)}
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    Mileage:{' '}
                    <span className={css.modalBottomSpan}>
                      {convertNum(mileage)}
                    </span>
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    Price:{' '}
                    <span className={css.modalBottomSpan}>
                      {' '}
                      {rentalPrice}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <a href="tel:+380730000000" className={css.modalBottomBtn}>
              Rental car
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    modalRoot
  );
};

CarModal.propTypes = {
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
