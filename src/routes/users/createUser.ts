import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import UserModel from '../../models/user';
import { CreateUser } from '../../types/CreateUser';
import { capitalize } from '../../utils/capitalize';
import { ErrorSchema } from '../../types/ErrorSchema';
import ErrorSchemaJson from '../../schemas/ErrorSchema.json';
import { User } from '../../types/User';
import CreateUserSchemaRequestBody from '../../schemas/CreateUser.json';

type Reply = User[] | { error: ErrorSchema };
interface CreateUserRoute {
  Body: CreateUser;
  Reply: Reply;
}

const url = '/user';

export const handler: RouteHandler<CreateUserRoute> = async (req, reply) => {
  try {
    const users = req.body.users;

    const newUser = users.map((user) => {
      return {
        firstName: capitalize(user.firstName),
        lastName: capitalize(user.lastName),
        areaId: user.areaId,
        /** TODO: update these values with requester USER */
        CreatedBy: 'ADMIN_TEST',
        ModifiedBy: 'ADMIN_TEST',
        CreatedDate: new Date(),
        ModifiedDate: new Date(),
      };
    });

    const createdUsers = await UserModel.query().insert(newUser);

    return reply.status(201).send(createdUsers);
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to create users.',
      },
    });
  }
};

export const schema = {
  operationId: 'createUser',
  tags: ['User'],
  summary: 'Create a new User',
  body: CreateUserSchemaRequestBody,
  response: {
    201: {
      type: 'array',
      description: 'User(s) successfully created',
    },
    500: {
      title: 'Error',
      description: 'An unknown error occurred when trying to create users.',
      type: 'object',
      required: ['error'],
      properties: {
        error: ErrorSchemaJson,
      },
    },
  },
};

const createUser: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateUserRoute
> = {
  method: 'POST',
  url,
  handler,
  schema,
};

export default createUser;
