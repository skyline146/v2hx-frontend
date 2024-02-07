import { User } from "shared/api/users/models";

export const checkSubscription = (user: User) => {
  if (
    user.subscription_type !== "Lifetime" &&
    (!user.subscription_type || new Date(user.expire_date).getTime() < Date.now())
  ) {
    return false;
  }

  return true;
};
