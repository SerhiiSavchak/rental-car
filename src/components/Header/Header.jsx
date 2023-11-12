import css from './Header.module.css';
import PropTypes from 'prop-types';

export const Header = ({ children }) => {
  return <header className={css.header}>{children}</header>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
