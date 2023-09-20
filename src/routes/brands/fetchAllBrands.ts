import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import { Brand } from "../../types/Brand";

type FetchAllBrandsResponse = {
  Reply: Brand[] | { error: {} };
};

const url = "/brand";

export const handler: RouteHandler<FetchAllBrandsResponse> = async (req,reply) => {
  try {
    const brands = await BrandModel.query().select("name");
    if (brands.length > 0) {
      reply.status(200).send(brands);
    } else {
      reply.status(404).send({
        error: "No brands found.",
      });
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    reply.status(500).send({
      error: "Internal server error.",
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
  },
};

const fetchAllBrands: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FetchAllBrandsResponse
> = {
  method: "GET",
  url,
  handler,
  schema,
};

export default fetchAllBrands;
