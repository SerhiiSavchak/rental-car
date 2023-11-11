import css from './Button.module.css';

export const Button = ({
  handleClick,
  id,
  text,
  type,
  padding,
  width,
  height,
  margin,
}) => {
  return (
    <button
      onClick={() => handleClick && handleClick(id)}
      className={css.btn}
      style={{ padding, width, height, margin }}
      type={type}
    >
      {text}
    </button>
  );
};
