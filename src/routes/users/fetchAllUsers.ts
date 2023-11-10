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
import UserSchema from "../../schemas/User.json";

type FetchAllUsers = {
  Reply: User[] | { error: ErrorSchema };
};

const url = "/user";

export const handler: RouteHandler<FetchAllUsers> = async (req, reply) => {
  try {
    const users = await UserModel.query();
    if (users.length === 0) {
      return reply.status(404).send({
        error: {
          error: "Not Found",
          code: "NotFound",
          message: "There are not Areas currently",
        },
      });
    }

    reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: "Unknown",
        message: "An unknown error occurred when trying to fetch users.",
      },
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
      propiesties: UserSchema,
    },
    404: {
      title: "Not found",
      description: "Invalid or missing Brand data.",
      type: "object",
      require: ["error"],
      properties: {
        error: ErrorSchemaJson,
      },
    },
    500: {
      title: "Error",
      description:
        "An unknown error occurred while attempting to retrieve users data.",
      type: "object",
      require: ["error"],
      properties: {
        error: ErrorSchemaJson,
      },
    },
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
