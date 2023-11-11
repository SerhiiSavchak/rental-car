export const convertNum = number => {
  const num = String(number);
  let result;

  switch (num.length) {
    case 3:
      result = `${num[0]},0${num[1]}${num[2]}`;
      break;
    case 4:
      result = `${num[0]},${num[1]}${num[2]}${num[3]}`;

      break;
    case 5:
      result = `${num[0]},${num[1]}${num[2]}${num[3]}${num[3]}`;
      break;
    default:
      return;
  }

  return result;
};
