import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import { Brand } from "../../types/Brand";
import CreateBrandSchema from "../../schemas/CreateBrand.json";
import BrandModel from "../../models/brand";
import { CreateBrand } from "../../types/CreateBrand";
type Reply = Brand | { error: {} };

type CreateBrandRoute = {
  Body: CreateBrand;
  Reply: Reply;
};
const url = "/brand";


export const handler: RouteHandler<CreateBrandRoute> = async (req, reply) => {
  try {
    const newBrand = req.body.map((brand) => {
      return {
        name: brand.name?.toLocaleUpperCase(),
      }
    });

    await BrandModel.query().insert(newBrand);

    reply.status(200).send();
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: 'unknown',
        message: `An unknown error occurred when trying to create an Brand. Error: ${error}`
      }
    });
  }
};



export const schema = {
  operationId: 'createBrand',
  tags: ['Brand'],
  summary: 'Create a new Brand.',
  body: CreateBrandSchema,
  response: {
    200: {
      type: 'null'
    },
    400: {
      title: 'InvalidBrand',
      description: 'Invalid or missing Brand data.',
      type: 'object',
      required: ['error'],
      properties: {
        error: {}
      }
    }
  }
};

const createBrand: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateBrandRoute
> = {
  method: 'POST',
  url,
  handler,
  schema
};

export default createBrand;
