export const timeStampToString = (timestamp) => {
  var date = new Date(parseInt(timestamp));
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    ", " +
    date.getDate() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear()
  );
};
