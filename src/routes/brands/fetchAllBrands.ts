import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import { Brand } from "../../types/Brand";

type Reply = Brand[] | { error: {} };
type FetchAllBrands = {
  Reply: Reply;
};

const url = "/brand";

export const handler: RouteHandler<FetchAllBrands> = async (req, reply) => {
  const brands = await BrandModel.query().select("name");
  reply.status(200).send(brands);
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
  FetchAllBrands
> = {
  method: "GET",
  url,
  handler,
  schema,
};

export default fetchAllBrands;
