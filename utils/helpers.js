export const format_date = (date) => {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
};

export const format_plural = (word, amount) => {
  if (amount !== 1) {
    return `${word}s`;
  }

  return word;
};
