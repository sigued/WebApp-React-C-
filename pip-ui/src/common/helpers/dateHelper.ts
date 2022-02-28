export function formatDate(date: String) {
  const dateFormat = new Date(date.toString());
  const year = dateFormat.getFullYear();
  const month = twoDigits(dateFormat.getMonth() + 1);
  const day = twoDigits(dateFormat.getDate());
  const hour = twoDigits(dateFormat.getHours());
  const minute = twoDigits(dateFormat.getMinutes());
  const seconde = twoDigits(dateFormat.getSeconds());
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconde
  );
}

function twoDigits(date: number) {
  if (date.toString().length < 2) {
    return "0" + date;
  }
  return date;
}

// Todo it use Order and EmailInvitation as parameter
export function sortDate(orders: any[]) {
  orders.sort((a, b) => (a.creationDate > b.creationDate ? -1 : 1));
  return orders;
}
