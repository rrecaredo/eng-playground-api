import { User } from './user.model';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import storeFactory from '../infrastructure/store-factory';
import { DynamoStore, ModelConstructor } from '@shiftcoders/dynamo-easy';

export const getAllUsers = async () => {
    const users = await new DynamoStore(User).scan().execFetchAll();
    return users.sort((a, b) => a.createdAt <= b.createdAt ? -1 : 1);
};

const userStore = storeFactory<User, ModelConstructor<User>>(User);

export const registerUser = async (user: User) => {
    const found = await userStore
      .scan()
      .whereAttribute('username').equals(user.username)
      .execFetchAll();

    if (found && found.length)
        throw new ConflictException('Username already exists');

    const password = await hash(user.password, 8);

    const newUser : User = {
        username: user.username,
        password,
        displayName: user.displayName,
        createdAt: Date.now().toLocaleString(),
    };

    await userStore
    .put(newUser)
    .exec();

    return newUser;
};

export const getUser = async (username: string) => {
    const found = await userStore
    .scan()
    .whereAttribute('username').equals(username)
    .execFetchAll();

    if (!found || !found.length) throw new NotFoundException();
    return found[0];
};
