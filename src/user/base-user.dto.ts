import { MinLength } from 'class-validator';

export default class BaseUserDto {
  @MinLength(6)
  username: string;
  @MinLength(6)
  password: string;
};
