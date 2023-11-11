import css from './CarModal.module.css';
import { useEffect } from 'react';
import { deleteCurrentCar } from 'redux/car/carSlice';
import sprite from 'images/icons/sprite.svg';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
export const CarModal = ({ car, setIsShowModal }) => {
  const dispatch = useDispatch();
  const rentalData = car.rentalConditions;

  const convertNum = number => {
    const num = String(number);
    let result;

    switch (num.length) {
      case 3:
        result = `${num[0]},0${num[1]}${num[2]}`;
        break;
      case 4:
        result = `${num[0]},${num[1]}${num[2]}${num[3]}`;

        break;
      case 5:
        result = `${num[0]},${num[1]}${num[2]}${num[3]}${num[3]}`;
        break;
      default:
        return;
    }

    return result;
  };

  useEffect(() => {
    const onEscKeyPress = e => {
      if (e.key === 'Escape') {
        setIsShowModal(false);
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
  }, [setIsShowModal]);

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

  const modalRoot = document.querySelector('#modal-root');
  return createPortal(
    <div onClick={onHandleClick} id="backdrop" className={css.modalBackdrop}>
      <div className={css.modalWindow}>
        <div className={css.modalContent}>
          {' '}
          <button className={css.modalBtn} id="close" onClick={onHandleClick}>
            <svg id="close" className={css.modalIcon}>
              <use id="close" href={sprite + '#icon-close'}></use>
            </svg>
          </button>
          <img className={css.modalImg} src={car.img} alt="car" />
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
                <p className={css.modalTopText}>{car.address.split(' ')[4]}</p>
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
            <h3 className={css.modalTitle}>Accessories and functionalities:</h3>
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
                  {`${rentalData.split(' ')[0]} ${rentalData.split(' ')[1]} `}{' '}
                  <span className={css.modalBottomSpan}>{`${rentalData
                    .split(' ')[2]
                    .slice(0, 2)}`}</span>
                </p>
              </li>
              <li className={css.modalBottomItem}>
                <p className={css.modalBottomText}>
                  {rentalData.slice(15, 39)}
                </p>
              </li>
              <li className={css.modalBottomItem}>
                <p className={css.modalBottomText}>
                  {rentalData.slice(39, -1)}
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
      </div>
    </div>,
    modalRoot
  );
};
