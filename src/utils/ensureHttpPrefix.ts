export const ensureHttpPrefix = (url?: string) => {
  if (!url) {
    return "";
  }
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`;
  }
  return url;
};
