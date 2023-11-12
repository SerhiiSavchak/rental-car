import css from './FavoriteList.module.css';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export const FavoriteList = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className={css.favoriteList}
      >
        {children}
      </motion.ul>
    </AnimatePresence>
  );
};

FavoriteList.propTypes = {
  children: PropTypes.node.isRequired,
};
