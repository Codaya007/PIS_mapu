export function buildURLWithQueryParams(url, params) {
  const searchParams = new URLSearchParams();

  // Recorre los parámetros y añádelos a searchParams si no son undefined
  for (const key in params) {
    if (params[key] !== undefined) {
      searchParams.append(key, params[key]);
    }
  }

  // Construye la URL con los query params
  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

export function getTimeAgo(isoString, start = "Publicado") {
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
    return `${start} hace unos segundos`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${start} hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${start} hace ${hours} hora${hours !== 1 ? "s" : ""}`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${start} hace ${days} día${days !== 1 ? "s" : ""}`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${start} hace ${weeks} semana${weeks !== 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(diff / month);
    return `${start} hace ${months} mes${months !== 1 ? "es" : ""}`;
  }
}

export const deleteDbFields = (obj) => {
  delete obj.createdAt;
  delete obj.deletedAt;
  delete obj.updatedAt;
};
