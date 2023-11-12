import css from './FavoriteList.module.css';
import PropTypes from 'prop-types';

export const FavoriteList = ({ children }) => {
  return <ul className={css.favoriteList}>{children}</ul>;
};

FavoriteList.propTypes = {
  children: PropTypes.node.isRequired,
};
