export const formatDateYYYYMMDD = (d: string) => {
  let date = new Date(d);
  let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let mm =
    date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  return `${date.getFullYear()}-${mm}-${dd}`;
};
