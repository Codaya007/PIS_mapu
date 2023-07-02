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
