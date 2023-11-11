import css from './CatalogList.module.css';

export const CatalogList = ({ children }) => {
  return <ul className={css.catalogList}>{children}</ul>;
};
