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
import { UserRequestParams } from "../../types/UserRequestParams";
import UserRequestParamsSchema from "../../schemas/UserRequestParams.json";

type Reply = { error: ErrorSchema };
type DeleteUserRoute = {
  Body: User;
  Params: UserRequestParams;
  Reply: Reply;
};

const url = "/user/:id";

const handler: RouteHandler<DeleteUserRoute> = async (req, reply) => {
  try {
    const userId = req.params.id;
    const userToDelete = await UserModel.query().findById(userId);

    if (!userToDelete) {
      return reply.status(404).send({
        error: {
          error: "Not Found",
          code: "NotFound",
          message: "This user does not exist",
        },
      });
    }

    await UserModel.query().deleteById(userId);

    reply.status(204).send();
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: "Unknown",
        message: "An unknown error occurred when trying to delete an user.",
      },
    });
  }
};

const schema = {
  operationId: "deleteUser",
  tags: ["User"],
  summary: "Delete a User",
  params: UserRequestParamsSchema,
  description: "Endpoint for deleting an user.",
  response: {
    204: {},
    404: {
      title: "InvalidUser",
      description: "Invalid or missing User.",
      type: "object",
      properties: {
        error: ErrorSchemaJson,
      },
    },
  },
};

const deleteUser: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  DeleteUserRoute
> = {
  method: "DELETE",
  url,
  handler,
  schema,
};

export default deleteUser;
