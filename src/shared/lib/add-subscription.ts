export const addSubscription = (expireDate: string, periodAdded: number) => {
  if (expireDate === "Lifetime") return "Lifetime";

  const parsedExpireDate = new Date(expireDate);

  const getISOString = (value: number) => {
    return new Date(value).toISOString();
  };

  if (!expireDate || parsedExpireDate.getTime() < Date.now()) {
    return getISOString(Date.now() + periodAdded);
  }

  return getISOString(parsedExpireDate.getTime() + periodAdded);
};
