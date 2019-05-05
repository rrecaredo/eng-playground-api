import BaseUserDto from './base-user.dto';
import { IsDefined } from 'class-validator';

export default class ExtendedUserDto extends BaseUserDto {
  @IsDefined()
  displayName: string;
  createdAt?: string;
};
