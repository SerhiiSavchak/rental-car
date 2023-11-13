import css from './MobileMenu.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import sprite from 'images/icons/sprite.svg';
;

export const MobileMenu = ({ toggleMenu }) => {
  const menuRoot = document.querySelector('#menu-root');
  return createPortal(
    <div className={css.menuBackdrop}>
      <div className={css.menu}>
        <button onClick={toggleMenu} type=" button" className={css.menuBtn}>
          <svg className={css.menuIcon}>
            <use href={sprite + '#icon-close'}></use>
          </svg>
        </button>
        <nav className={css.menuNav}>
          <ul className={css.menuList}>
            <li className={css.menuItem}>
              <Link onClick={toggleMenu} to="/">
                Home
              </Link>
            </li>
            <li className={css.menuItem}>
              <Link onClick={toggleMenu} to="/catalog">
                Catalog
              </Link>
            </li>
            <li className={css.menuItem}>
              <Link onClick={toggleMenu} to="/favorite">
                Favorite
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>,
    menuRoot
  );
};



MobileMenu.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
 };
 