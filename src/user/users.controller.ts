import { Controller, Get, Post, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { getAllUsers } from './user.repository';
import { registerUser } from './user.repository';
import { getJwtToken } from './user.service';
import { mapUserDtoToModel } from './user.mappers';
import { ValidationPipe } from '../infrastructure/validate.pipe';
import BaseUserDto from './base-user.dto';
import IToken from './token.interface';
import ExtendedUserDto from './extended-user.dto';

@Controller('users')
export class UsersController {
    @Get()
    async users(@Req() request: any): Promise<any> {
      const users = await getAllUsers();
      return users;
    }

    @Get(':id')
    async getUser(@Req() request: any): Promise<any> {
      return '';
    }

    @Post()
    async register(@Body(new ValidationPipe()) user: ExtendedUserDto): Promise<IToken> {
      try {
        await registerUser(user);
        const token = await getJwtToken(user);
        return token;
      } catch (e) {
          throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) user: BaseUserDto): Promise<IToken> {

      return await getJwtToken(mapUserDtoToModel(user as ExtendedUserDto));
    }
}
