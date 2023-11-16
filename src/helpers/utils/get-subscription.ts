import { ReactNode } from "react";

export const getSubcription = (expire_date: string) => {
  if (!expire_date) {
    return "No subscription";
  } else {
    if (expire_date === "Lifetime") {
      return "Lifetime";
    }

    return new Date(expire_date).toLocaleString() as ReactNode;
  }
};
