import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import UserSchema from "../../schemas/User.json";
import { UserRequestParams } from "../../types/UserRequestParams";
import UserRequestParamsSchema from "../../schemas/UserRequestParams.json";
import { User } from "../../types/User";
import UserModel from "../../models/user";
import { ErrorSchema } from "../../types/ErrorSchema";
import ErrorSchemaJson from "../../schemas/ErrorSchema.json";

type Reply = User | { error: ErrorSchema };
type UpdateUserRoute = {
  Body: User;
  Params: UserRequestParams;
  Reply: Reply;
};

const url = "/user/:id";

const handler: RouteHandler<UpdateUserRoute> = async (req, reply) => {
  try {
    const { id: userId } = req.params;
    const { firstName, areaId, lastName } = req.body;

    const newUserFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const newUserLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    const newUserAreaId = areaId;

    const userToUpdate = await UserModel.query().findById(userId);

    if (!userToUpdate) {
      return reply.status(404).send({
        error: {
          error: "Not Found",
          code: "NotFound",
          message: "This user does not exist",
        },
      });
    }

    await UserModel.query().updateAndFetchById(userId, {
      firstName: newUserFirstName,
      lastName: newUserLastName,
      areaId: newUserAreaId,
    });
    return reply.status(200).send({
      firstName: newUserFirstName,
      lastName: newUserLastName,
      areaId: newUserAreaId,
    });
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: "Unknown",
        message: "An unknown error occurred when trying to update a user.",
      },
    });
  }
};

const schema = {
  operationId: "updateUser",
  tags: ["User"],
  summary: "Update a User.",
  params: UserRequestParamsSchema,
  body: UserSchema,
  response: {
    200: UserSchema,
    404: {
      title: "InvalidUser",
      description: "Invalid or missing User data.",
      type: "object",
      require: ["error"],
      properties: {
        error: ErrorSchemaJson,
      },
    },

  },
};

const updateUser: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  UpdateUserRoute
> = {
  method: "PUT",
  url,
  handler,
  schema,
};

export default updateUser;
