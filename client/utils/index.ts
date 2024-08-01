export const objectToLocaleString = (obj) => {
  return new Date(Date.UTC(obj.year, +obj.month - 1, obj.day)).toLocaleDateString("ru");
};

export const getHoursAndMinutes = (date) => {
  const hours = new Date(date).getUTCHours();
  let minutes = new Date(date).getUTCMinutes().toString();

  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};
