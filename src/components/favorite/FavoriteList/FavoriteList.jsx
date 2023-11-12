import css from './FavoriteList.module.css';

export const FavoriteList = ({ children }) => {
  return <ul className={css.favoriteList}>{children}</ul>;
};
