import { Model, PartitionKey } from '@shiftcoders/dynamo-easy'

@Model()
export class User {
    @PartitionKey()
    username: string;
    password: string;
    displayName: string;
    createdAt?: string;
};
