import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import { Brand } from "../../types/Brand";
import BrandRequestParamsSchema from "../../schemas/BrandRequestParams.json";
import { BrandRequestParams } from "../../types/BrandRequestParams";
import { ErrorSchema } from "../../types/ErrorSchema";
import ErrorSchemaJson from "../../schemas/ErrorSchema.json";

type Reply = ErrorSchema;
type DeleteBrandRoute = {
  Body: Brand;
  Params: BrandRequestParams;
  Reply: Reply;
};

const url = "/brand/:id";

const handler: RouteHandler<DeleteBrandRoute> = async (req, reply) => {
  try {
    const brandId = req.params.id;
    const brandToDelete = await BrandModel.query().findById(brandId);

    if (!brandToDelete) {
      return reply.status(404).send({
        error: "Not fount",
        statusCode: 404,
        message: "This brand does not exist",
      });
    }

    await BrandModel.query().deleteById(brandId);

    reply.status(204).send();
  } catch (error) {
    return reply.status(500).send({
      error: `${error}`,
      statusCode: 500,
      message: "An unknown error occurred when trying to delete a brand.",
    });
  }
};

const schema = {
  operationId: "deleteBrand",
  tags: ["Brand"],
  summary: "Delete a Brand",
  params: BrandRequestParamsSchema,
  description: "Endpoint for deleting a brand.",
  response: {
    204: {},
    404: ErrorSchemaJson,
    500: ErrorSchemaJson,
  },
};

const deleteBrand: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  DeleteBrandRoute
> = {
  method: "DELETE",
  url,
  handler,
  schema,
};

export default deleteBrand;
