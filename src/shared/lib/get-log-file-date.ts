export const getLogFileDate = () => {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth() + 1;
  const day = new Date().getUTCDate();

  return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
};
