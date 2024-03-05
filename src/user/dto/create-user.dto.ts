import { User } from '../entities/user.entity';

export type CreateUserDto = Pick<User, 'login' | 'password'>;
