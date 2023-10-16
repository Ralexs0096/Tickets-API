import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import { User } from "../../types/User";
import UserModel from "../../models/user";

type FetchAllUsers = {
  Reply: User[] | { error: { code: string; message: string } };
};

const url = "/user";

export const handler: RouteHandler<FetchAllUsers> = async (req, reply) => {
  try {
    const users = await UserModel.query().select("firstName", "lastName","areaId");
    if (users.length > 0) {
      reply.status(200).send(users);
    } else {
      reply.status(404).send({
        error: {
          code: "unknown",
          message: "No users found.",
        },
      });
    }
  } catch (error) {
    return reply.status(500).send({
        error: {
          code: "unknown",
          message: `An unknown error occurred when trying to fetch users. Error: ${error}`,
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
      title: "User",
      type: "array",
      required: ["firstName ", "lastName","areaId"],
      additionalProperties: false,
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
            type: "string",
          },
          areaId: {
            type: "number" || "null",
          },
      },
    },
    404: {
      title: "InvalidUser",
      description: "Invalid or missing User data.",
      type: "object",
      required: ["error"],
      properties: {
        error: {
          type: "object",
          required: ["code", "message"],
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
    500: {
      title: "Error",
      description: "An unknown error occurred when trying to fetch users.",
      type: "object",
      required: ["error"],
      properties: {
        error: {
          type: "object",
          required: ["code", "message"],
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
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
