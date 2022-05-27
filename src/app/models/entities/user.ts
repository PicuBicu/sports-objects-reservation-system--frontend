import { Address } from './address';

export interface User {
  expiresAt: string;
  jwtToken: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: String[];
  address: Address;
}
