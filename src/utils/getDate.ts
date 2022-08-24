export const getDate = (timezone: number) => {
  const dt = new Date();
  dt.setHours(dt.getUTCHours() + timezone / 3600);
  return dt;
};
