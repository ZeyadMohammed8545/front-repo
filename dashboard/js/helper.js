const DateHandler = (dateStr) => {
  const date = new Date(dateStr);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let Year = date.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  return `${day}-${month}-${Year}`;
};

export { DateHandler };
