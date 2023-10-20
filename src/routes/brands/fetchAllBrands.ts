import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import { Brand } from "../../types/Brand";
import { ErrorSchema } from "../../types/ErrorSchema";
import ErrorSchemaJson from "../../schemas/ErrorSchema.json";

type FetchAllBrands = {
  Reply: Brand[] | ErrorSchema;
};

const url = "/brand";

export const handler: RouteHandler<FetchAllBrands> = async (req, reply) => {
  try {
    const brands = await BrandModel.query().select("name");
    if (brands.length > 0) {
      reply.status(200).send(brands);
    } else {
      reply.status(204).send();
    }
  } catch (error) {
    return reply.status(500).send({
      error: `${error}`,
      statusCode: 500,
      message: `An unknown error occurred when trying to fetch brands. Error: ${error}`,
    });
  }
};

export const schema = {
  operationId: "fetchAllBrands",
  tags: ["Brand"],
  summary: "Fetch All Brands",
  response: {
    200: {
      title: "Brand",
      type: "array",
      required: ["name"],
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
        },
      },
    },
    204: {},
    500: ErrorSchemaJson,
  },
};

const fetchAllBrands: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllBrands
> = {
  method: "GET",
  url,
  handler,
  schema,
};

export default fetchAllBrands;
