import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import { Brand } from "../../types/Brand";

type FetchAllBrands = {
  Reply: Brand[] | { error: { code: string; message: string } };
};

const url = "/brand";

export const handler: RouteHandler<FetchAllBrands> = async (req, reply) => {
  try {
    const brands = await BrandModel.query().select("name");
    if (brands.length > 0) {
      reply.status(200).send(brands);
    } else {
      reply.status(404).send({
        error: {
          code: "unknown",
          message: "No brands found.",
        },
      });
    }
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: "unknown",
        message: `An unknown error occurred when trying to fetch brands. Error: ${error}`,
      },
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
    404: {
      title: "InvalidBrand",
      description: "Invalid or missing Brand data.",
      type: "object",
      required: ["error"],
      properties: {
        error: {},
      },
    },
    500: {
      title: "Error",
      description: "An unknown error occurred when trying to fetch brands.",
      type: "object",
      required: ["error"],
      properties: {
        error: {},
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
