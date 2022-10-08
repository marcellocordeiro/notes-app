export const fetcher = <T>(url: string) =>
  fetch(url).then((res) => res.json() as T);
