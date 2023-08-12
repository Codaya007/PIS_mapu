export function mapISOStringToDate(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  return formattedDate;
}

export function getTimeAgo(isoString, start = "Publicado hace") {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now - date;

  // Millisegundos en cada unidad de tiempo
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diff < minute) {
    return `${start} unos segundos`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${start} ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${start} ${hours} hora${hours !== 1 ? "s" : ""}`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${start} ${days} día${days !== 1 ? "s" : ""}`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${start} ${weeks} semana${weeks !== 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(diff / month);
    return `${start} ${months} mes${months !== 1 ? "es" : ""}`;
  }
}
