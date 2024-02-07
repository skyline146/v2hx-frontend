import { SubscriptionType } from "shared/config";

export interface User {
  username: string;
  admin: boolean;
  expire_date: string;
  subscription_type: SubscriptionType;
  is_active_subscription: boolean;
  invitation_code: string;
  code_activations: number;
  is_code_activated: boolean;
}
