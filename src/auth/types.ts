import { JwtPayload } from 'jsonwebtoken';

export interface UserTokens {
  userId: string;
  login: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  login: string;
}
