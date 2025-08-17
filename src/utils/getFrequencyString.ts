export const getFrequencyString = (n: number) => {
  let times = 'time';
  if (n !== 1) times = times + 's';

  return `${n} ${times} per week`;
};
