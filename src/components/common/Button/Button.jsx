import css from './Button.module.css';

export const Button = ({ text, type, padding, width, height }) => {
  return (
    <button className={css.btn} style={{ padding, width, height }} type={type}>
      {text}
    </button>
  );
};
