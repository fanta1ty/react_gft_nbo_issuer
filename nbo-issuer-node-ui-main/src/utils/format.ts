export const formatNationalId = (value?: string) => {
  if (!value) return "";
  return value.replace(/(\d)(?=(\d{4})+$)/g, "$1 ");
};
