const day = 24 * 60 * 60 * 1000;

export const SUBSCRIPTION = {
  DAY: new Date(Date.now() + day).toISOString(),
  WEEK: new Date(Date.now() + 7 * day).toISOString(),
  MONTH: new Date(Date.now() + 30 * day).toISOString(),
  LIFETIME: "Lifetime",
};
