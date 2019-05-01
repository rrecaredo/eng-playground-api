import { DynamoStore, ModelConstructor } from '@shiftcoders/dynamo-easy';
import { DynamoDB } from 'aws-sdk';

const dynamoClient = new DynamoDB(
  { endpoint: process.env.DYNAMO_ENDPOINT }
  );

export default <P, T extends ModelConstructor<P>>(type: T): DynamoStore<P> => {
    return new DynamoStore(type, dynamoClient);
};
