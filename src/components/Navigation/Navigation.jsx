import css from './Navigation.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'images/logo.png';
import { MobileMenu } from 'components/MobileMenu/MobileMenu';
import sprite from 'images/icons/sprite.svg';
import { useState } from 'react';

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const toggleMenu = () => {
    setShowMenu(prevMenuState => !prevMenuState);
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
      <button className={css.headerMenuBtn} onClick={toggleMenu} type="button">
        <svg className={css.headerMenuIcon}>
          <use href={sprite + '#icon-burger'}></use>
        </svg>
      </button>

      {showMenu && (
        <MobileMenu setShowMenu={setShowMenu} toggleMenu={toggleMenu} />
      )}
    </nav>
  );
};


