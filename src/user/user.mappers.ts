import ExtendedUserDto from './extended-user.dto';
import { User } from './user.model';

export const mapUserDtoToModel = (userDto: ExtendedUserDto): User => {
  return {
    username: userDto.username,
    password: userDto.password,
    displayName: userDto.displayName || ''
  } as User;
};
