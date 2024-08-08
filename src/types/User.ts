type UserRole = 'user' | 'moderator' | 'administrator';

type UserStatus = 'Active' | 'Blocked';

type UserSubscription = 'free' | 'monthly' | 'yearly';

export interface User {
  id: string;
  email: string;
  name: string;
  lastname: string;
  role: UserRole;
  department: string;
  registeredOn: string;
  status: UserStatus;
  subscriptionPlan: UserSubscription;
}
