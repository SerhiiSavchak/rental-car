import css from './Button.module.css';

export const Button = ({ text, type }) => {
  return <button type={type}>{text}</button>;
};
