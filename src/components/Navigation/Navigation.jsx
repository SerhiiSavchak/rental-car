import css from './Navigation.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'images/logo.png';
export const Navigation = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <nav className={css.headerNav}>
      <img
        onClick={handleClick}
        className={css.headerImg}
        src={logo}
        alt="logo"
      />
      <ul className={css.headerList}>
        <li className={css.headerItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={css.headerItem}>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li className={css.headerItem}>
          <Link to="/favorite">Favorite</Link>
        </li>
      </ul>
      <a className={css.headerLink} href="tel:+380730000000">
        +380730000000
      </a>
    </nav>
  );
};
