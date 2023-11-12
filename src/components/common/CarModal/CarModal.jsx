import css from './CarModal.module.css';
import { useEffect } from 'react';
import { deleteCurrentCar } from 'redux/car/carSlice';
import sprite from 'images/icons/sprite.svg';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { convertNum } from 'utils/numConverter';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export const CarModal = ({ car, setIsShowModal }) => {
  const dispatch = useDispatch();

  const onHandleClick = e => {
    switch (e.target.id) {
      case 'backdrop':
        setIsShowModal(false);
        dispatch(deleteCurrentCar());

        return;
      case 'close':
        setIsShowModal(false);
        dispatch(deleteCurrentCar());
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    const onEscKeyPress = e => {
      if (e.key === 'Escape') {
        setIsShowModal(false);
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
  }, [setIsShowModal, dispatch]);

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
            <button className={css.modalBtn} id="close" onClick={onHandleClick}>
              <svg id="close" className={css.modalIcon}>
                <use id="close" href={sprite + '#icon-close'}></use>
              </svg>
            </button>
            <img
              className={css.modalImg}
              loading="lazy"
              src={car.img}
              alt="car"
            />
            <div className={css.modalTopThumb}>
              <div className={css.modalTitleWrap}>
                <h2 className={css.modalTopTitle}>
                  {car.make}
                  <span className={css.modalMakeSpan}> {car.model}</span>
                  <span className={css.modalYearSpan}>, {car.year}</span>
                </h2>
              </div>
              <ul className={css.modalTopList}>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>
                    {car.address.split(' ')[3].slice(0, -1)}
                  </p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>
                    {car.address.split(' ')[4]}
                  </p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Id: ${car.id}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Year: ${car.year}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p className={css.modalTopText}>{`Type: ${car.type}`}</p>
                </li>

                <li className={css.modalTopItem}>
                  <p
                    className={css.modalTopText}
                  >{`Fuel Consumption: ${car.fuelConsumption}`}</p>
                </li>
                <li className={css.modalTopItem}>
                  <p
                    className={css.modalTopText}
                  >{`Engine Size: ${car.engineSize}`}</p>
                </li>
              </ul>
            </div>
            <p className={css.modalDescText}>{car.description}</p>
            <div className={css.modalThumb}>
              <h3 className={css.modalTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.modalList}>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.accessories[0]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.functionalities[0]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.accessories[1]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.functionalities[1]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.accessories[2]}</p>
                </li>
                <li className={css.modalItem}>
                  <p className={css.modalText}>{car.functionalities[2]}</p>
                </li>
              </ul>
            </div>
            <div className={css.modalBottomThumb}>
              <h3 className={css.modalBottomTitle}>Rental Conditions: </h3>
              <ul className={css.modalBottomList}>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {`${car.rentalConditions.split(' ')[0]} ${
                      car.rentalConditions.split(' ')[1]
                    } `}{' '}
                    <span
                      className={css.modalBottomSpan}
                    >{`${car.rentalConditions
                      .split(' ')[2]
                      .slice(0, 2)}`}</span>
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {car.rentalConditions.slice(15, 39)}
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    {car.rentalConditions.slice(39, -1)}
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    Mileage:{' '}
                    <span className={css.modalBottomSpan}>
                      {convertNum(car.mileage)}
                    </span>
                  </p>
                </li>
                <li className={css.modalBottomItem}>
                  <p className={css.modalBottomText}>
                    Price:{' '}
                    <span className={css.modalBottomSpan}>
                      {' '}
                      {car.rentalPrice}
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
  setIsShowModal: PropTypes.func.isRequired,
};
