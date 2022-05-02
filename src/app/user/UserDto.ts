import Address from "../address/Address";

export default interface UserDto {
  jwtToken: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: String[];
  address: Address;
}
