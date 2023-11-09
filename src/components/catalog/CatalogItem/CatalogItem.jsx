import css from './CatalogItem.module.css';

export const CatalogItem = ({ car }) => {
  console.log(car);
  return (
    <li>
      <p>{car.id}</p>
      <p>{car.rentalPrice}</p>
      <p>{car.make}</p>
    </li>
  );
};
