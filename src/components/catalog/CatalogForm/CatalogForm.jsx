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

  const makesOptions = [
    { value: 'All', label: 'All', className: css.dropDownOption },
    { value: 'Buick', label: 'Buick', className: css.dropDownOption },
    { value: 'Volvo', label: 'Volvo', className: css.dropDownOption },
    { value: 'HUMMER', label: 'HUMMER', className: css.dropDownOption },
    { value: 'Subaru', label: 'Subaru', className: css.dropDownOption },
    { value: 'Mitsubishi', label: 'Mitsubishi', className: css.dropDownOption },
    { value: 'Nissan', label: 'Nissan', className: css.dropDownOption },
    { value: 'Lincoln', label: 'Lincoln', className: css.dropDownOption },
    { value: 'GMC', label: 'GMC', className: css.dropDownOption },
    { value: 'Hyundai', label: 'Hyundai', className: css.dropDownOption },
    { value: 'MINI', label: 'MINI', className: css.dropDownOption },
    { value: 'Bentley', label: 'Bentley', className: css.dropDownOption },
    {
      value: 'Mercedes-Benz',
      label: 'Mercedes-Benz',
      className: css.dropDownOption,
    },
    {
      value: 'Aston Martin',
      label: 'Aston Martin',
      className: css.dropDownOption,
    },
    { value: 'Pontiac', label: 'Pontiac', className: css.dropDownOption },
    {
      value: 'Lamborghini',
      label: 'Lamborghini',
      className: css.dropDownOption,
    },
    { value: 'Audi', label: 'Audi', className: css.dropDownOption },
    { value: 'BMW', label: 'BMW', className: css.dropDownOption },
    { value: 'Chevrolet', label: 'Chevrolet', className: css.dropDownOption },
    { value: 'Chrysler', label: 'Chrysler', className: css.dropDownOption },
    { value: 'Kia', label: 'Kia', className: css.dropDownOption },
    { value: 'Land', label: 'Land', className: css.dropDownOption },
  ];

  const pricesOptions = [
    { value: 'All', label: 'All', className: css.dropDownOption },
    { value: '30', label: '30', className: css.dropDownOption },
    { value: '40', label: '40', className: css.dropDownOption },
    { value: '50', label: '50', className: css.dropDownOption },
    { value: '60', label: '60', className: css.dropDownOption },
    { value: '70', label: '70', className: css.dropDownOption },
    { value: '80', label: '80', className: css.dropDownOption },
    { value: '90', label: '90', className: css.dropDownOption },
    { value: '100', label: '100', className: css.dropDownOption },
    { value: '110', label: '110', className: css.dropDownOption },
    { value: '120', label: '120', className: css.dropDownOption },
    { value: '130', label: '130', className: css.dropDownOption },
    {
      value: '140',
      label: '140',
      className: css.dropDownOption,
    },
    {
      value: '150',
      label: '150',
      className: css.dropDownOption,
    },
    { value: '160', label: '160', className: css.dropDownOption },
    { value: '170', label: '170', className: css.dropDownOption },
    { value: '180', label: '180', className: css.dropDownOption },
    { value: '190', label: '190', className: css.dropDownOption },
    { value: '200', label: '200', className: css.dropDownOption },
  ];

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
