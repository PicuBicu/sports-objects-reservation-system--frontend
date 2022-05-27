export interface JwtPayload {
  roles: string[];
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}
