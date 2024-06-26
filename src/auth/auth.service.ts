import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RefreshResponse, SignInResponse, TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(login: string, password: string): Promise<SignInResponse> {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user) {
      throw new ForbiddenException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException();
    }

    const payload: TokenPayload = { userId: user.id, login: user.login };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async signUp(login: string, password: string): Promise<User> {
    const hashedPassword = await hash(password, Number(process.env.CRYPT_SALT));

    return await this.userService.create({
      login,
      password: hashedPassword,
    });
  }

  async refresh(refreshToken: string): Promise<RefreshResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload: TokenPayload =
        await this.jwtService.verifyAsync(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.userId },
      });

      const newPayload: TokenPayload = { userId: user.id, login: user.login };

      return {
        accessToken: await this.jwtService.signAsync(newPayload, {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        }),
        refreshToken: await this.jwtService.signAsync(newPayload, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } catch {
      throw new ForbiddenException();
    }
  }
}
