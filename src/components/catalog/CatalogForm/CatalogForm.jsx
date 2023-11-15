import { Button } from 'components/common/Button/Button';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import css from './CatalogForm.module.css';
import sprite from 'images/icons/sprite.svg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setServerFilter, setClientFilter } from 'redux/filter/filterSlice';
import { fetchCars } from 'redux/car/carOperations';
import { deleteCars, deleteCarResponse } from 'redux/car/carSlice';

export const CatalogForm = () => {
  const dispatch = useDispatch();

const makesOptions = ["All",'Buick', 'Volvo', 'HUMMER','Subaru', 'Mitsubishi', 'Nissan', 'Lincoln', 'GMC', 'Hyundai', 'MINI', 'Bentley', 'Ford', 'Toyota', 'Volkswagen', 'Skoda', 'Honda',  'Mercedes-Benz', 'Aston Martin', 'Pontiac', 'Lamborghini', 'Audi',  'BMW',  'Chevrolet',  'Chrysler',  'Kia', 'Land' ].map(make => ({value: make, label:make, className: css.dropDownOption}))

const pricesOptions = [ 'All', '30', '40', '50', '60', '70', '80', '90', '100', '110',  '120', '130', '140',  '150', '160', '170', '180', '190', '200',].map(make => ({value: make, label:make, className: css.dropDownOption}))



  const formInitialState = {
    rentalPrice: '',
    mileageFrom: '',
    mileageTo: '',
  };

  const [make, setMake] = useState('');

  const [formData, setFormData] = useState(formInitialState);

  const onMakesDropChange = value => {
    const inputData = value.value === 'All' ? '' : value.value;
    setMake(inputData);
  };

  const onPricesDropChange = value => {
    const inputData = {
      rentalPrice: value.value === 'All' ? '' : `$${value.value}`,
    };
    setFormData(prevState => ({ ...prevState, ...inputData }));
  };

  const onInputChange = e => {
    const { name, value } = e.target;

    const inputData = {
      [name]: value,
    };

    setFormData(prevState => ({ ...prevState, ...inputData }));
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(deleteCars());
    dispatch(deleteCarResponse());
    dispatch(setServerFilter(make));
    dispatch(setClientFilter(formData));
    dispatch(fetchCars({ page: 1, make, limit: make !== '' ? '' : 12 }));
  };

  return (
    <form onSubmit={onSubmit} className={css.catalogForm}>
      <label className={css.catalogLabel}>
        Car brand
        <Dropdown
          value={make}
          className={css.dropDownMakes}
          controlClassName={css.dropDownCtrl}
          placeholderClassName={css.dropDownPlaceholderMakes}
          menuClassName={css.dropDownMenu}
          options={makesOptions}
          onChange={onMakesDropChange}
          placeholder="Enter the text"
          arrowClosed={
            <svg className={css.iconArrow}>
              <use href={sprite + '#icon-arrow'}></use>
            </svg>
          }
          arrowOpen={
            <svg className={css.iconArrowRotate}>
              <use href={sprite + '#icon-arrow'}></use>
            </svg>
          }
        />
      </label>
      <label className={css.catalogLabel}>
        Price/ 1 hour
        <Dropdown
          value={formData.rentalPrice}
          className={css.dropDownPrices}
          controlClassName={css.dropDownCtrl}
          placeholderClassName={css.dropDownPlaceholderPrices}
          menuClassName={css.dropDownMenu}
          myOptionClassName={css.optionC}
          options={pricesOptions}
          onChange={onPricesDropChange}
          placeholder="To $"
          arrowClosed={
            <svg className={css.iconArrow}>
              <use href={sprite + '#icon-arrow'}></use>
            </svg>
          }
          arrowOpen={
            <svg className={css.iconArrowRotate}>
              <use href={sprite + '#icon-arrow'}></use>
            </svg>
          }
        />
      </label>
      <label className={css.catalogLabel}>
        Сar mileage / km
        <div className={css.catalogInputWrap}>
          <p className={css.catalogInputText}>From</p>
          <input
            value={formData.mileageFrom}
            name="mileageFrom"
            onChange={onInputChange}
            className={css.catalogInput}
            type="number"
          />

          <input
            value={formData.mileageTo}
            name="mileageTo"
            onChange={onInputChange}
            className={css.catalogInput}
            type="number"
          />
          <p className={css.catalogInputText}>To</p>
        </div>
      </label>
      <Button
        type="submit"
        text="Search"
        height="48px"
        width="136px"
        padding="14px 44px"
      />
    </form>
  );
};
