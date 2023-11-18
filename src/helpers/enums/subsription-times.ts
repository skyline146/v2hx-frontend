const day = 24 * 60 * 60 * 1000;

export const SUBSCRIPTION = {
  DAY: new Date(day).getTime(),
  WEEK: new Date(7 * day).getTime(),
  MONTH: new Date(30 * day).getTime(),
  LIFETIME: "Lifetime",
};
