import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshResponse, SignInResponse, TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(login: string, password: string): Promise<SignInResponse> {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user) {
      throw new ForbiddenException();
    }

    if (user?.password !== password) {
      throw new ForbiddenException();
    }

    const payload: TokenPayload = { userId: user.id, login: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async signUp(login: string, password: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        login,
        password,
      },
    });
  }

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(
        refreshToken,
      );

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const newPayload: TokenPayload = { userId: user.id, login: user.login };

      return {
        accessToken: await this.jwtService.signAsync(newPayload, {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }),
        refreshToken: await this.jwtService.signAsync(newPayload, {
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch {
      throw new ForbiddenException();
    }
  }
}
