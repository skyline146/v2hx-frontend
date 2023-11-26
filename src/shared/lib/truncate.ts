export const truncate = (str: string, size: number) => {
  return str.length > size ? str.substring(0, size).concat("...") : str;
};
