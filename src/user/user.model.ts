import { MinLength, IsDefined } from "class-validator";
import { Model, PartitionKey } from '@shiftcoders/dynamo-easy'

@Model()
export class User {
    @PartitionKey()
    @MinLength(6)
    username: string;
    @MinLength(6)
    password: string;
    @IsDefined()
    displayName: string;
    createdAt?: string;
}