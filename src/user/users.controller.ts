import { Controller, Get, Post, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { getAllUsers } from './user.repository';
import { registerUser } from './user.repository';
import { User } from './user.model';
import { ValidationPipe } from '../infrastructure/validate.pipe';
import { getJwtToken } from './user.service';
import IToken from './token.interface';

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
    async register(@Body(new ValidationPipe()) user: User): Promise<IToken> {
      try {
        await registerUser(user);
        const token = await getJwtToken(user);
        return token;
      } catch (e) {
          throw new HttpException(e.message, HttpStatus.CONFLICT);
      }
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) user: User): Promise<IToken> {
      return await getJwtToken(user);
    }
}
