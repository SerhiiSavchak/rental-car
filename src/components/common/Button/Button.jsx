import css from './Button.module.css';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  handleClick: PropTypes.func,
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  width: PropTypes.string,
  margin: PropTypes.string,
};
