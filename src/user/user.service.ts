
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import IToken from './token.interface';
import { getUser } from './user.repository';
import { User } from './user.model';
import { NotFoundException } from '@nestjs/common';

export const getJwtToken = async (user: User): Promise<IToken | never> => {
    const existingUser = await getUser(user.username) as User;
    const isValid = await compare(user.password, existingUser.password);
    
    if (!isValid) throw new NotFoundException();
    return getToken(existingUser);
};

const getToken = (user: User): IToken => {
    const token = sign({ username: user.username, displayName: user.displayName },
      'maricoelquelolea', { expiresIn: 86400 });
    return { token, userId: user.username, displayName: user.displayName };
};
