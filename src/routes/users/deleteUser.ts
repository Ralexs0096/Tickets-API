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
import UserRequestParamsSchema from "../../schemas/UserRequestParams.json"

type Reply = ErrorSchema;
type DeleteUserRoute = {
  Body: User;
  Params: UserRequestParams;
  Reply: Reply;
};

const url = "/user/:id";

const handler: RouteHandler<DeleteUserRoute> = async (req, rep) => {
  try {
    const userId = req.params.id;
    const userToDelete = await UserModel.query().findById(userId);

    if (!userToDelete) {
      return rep.status(404).send({
        error: "Not found",
        statusCode: 404,
        message: "This user does not exist",
      });
    }

    await UserModel.query().deleteById(userId);

    rep.status(204).send();
  } catch (error) {
    return rep.status(500).send({
      error: `${error}`,
      statusCode: 500,
      message: "An unknown error occurred when trying to delete a user.",
    });
  }
};

const schema = {
    operationId: "deleteUser",
    tags: ["User"],
    summary: "Delete a User",
    params: UserRequestParamsSchema,
    description: "Endpoint for deleting a user.",
    response: {
        204:{},
        404:ErrorSchemaJson,
        500:ErrorSchemaJson
    }
}

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