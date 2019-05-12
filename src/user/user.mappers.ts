import BaseUserDto from './base-user.dto';
import { User } from './user.model';

export const mapUserDtoToModel = (userDto: BaseUserDto): User => {
  return {
    username: userDto.username,
    password: userDto.password,
  } as User;
};
