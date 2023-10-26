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
  Reply: Brand[] | { error: ErrorSchema };
};

const url = "/brand";

export const handler: RouteHandler<FetchAllBrands> = async (req, reply) => {
  try {
    const brands = await BrandModel.query().select("name");
    if (brands.length > 0) {
      return reply.status(200).send(brands);
    } else {
      return reply.status(404).send({
        error: {
          error: "Not Found",
          code: "notFound",
          message: "There are not Brands currently",
        },
      });
    }
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: "Unknown",
        message: "An unknown error occurred when trying to fetch brands.",
      },
    });
  }
};

const schema = {
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
      description: "An unknown error occurred when trying to fetch brands.",
      type: "object",
      require: ["error"],
      properties: {
        error: ErrorSchemaJson,
      },
    },
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
