import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import { User } from "../../types/User";
import UserModel from "../../models/user";
import { ErrorSchema } from "../../types/ErrorSchema";
import ErrorSchemaJson from "../../schemas/ErrorSchema.json";
import UserSchema from "../../schemas/User.json"

type FetchAllUsers = {
  Reply: User[] | ErrorSchema;
};

const url = "/user";

export const handler: RouteHandler<FetchAllUsers> = async (req, reply) => {
  try {
    const users = await UserModel.query().select(
      "firstName",
      "lastName",
      "areaId"
    );
    if (users.length === 0) {
      return reply.status(204).send();
    }
    reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send({
      error: `${error}`,
      statusCode: 500,
      message: "An unknown error occurred when trying to fetch users." ,
    });
  }
};

export const schema = {
  operationId: "fetchAllUsers",
  tags: ["User"],
  summary: "Fetch All Users",
  response: {
    200: {
      title: "Users",
      type: "array",
      propiesties:UserSchema
    },
    204: {},
    500: ErrorSchemaJson,
  },
};

const fetchAllUsers: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllUsers
> = {
  method: "GET",
  url,
  handler,
  schema,
};

export default fetchAllUsers;
