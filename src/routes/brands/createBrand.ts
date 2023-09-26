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
type Reply = Brand[] | { error: { code: string; message: string } };

type CreateBrandRoute = {
  Body: CreateBrand;
  Reply: Reply;
};
const url = "/brand";

export const handler: RouteHandler<CreateBrandRoute> = async (req, reply) => {
  try {
    const brands = req.body.brands;
    const newBrand = brands.map((brand) => {
      return {
        name: brand.name.toUpperCase(),
        /** TODO: update these values with requester USER */
        CreatedBy: "ADMIN_TEST",
        ModifiedBy: "ADMIN_TEST",
        CreatedDate: new Date(),
        ModifiedDate: new Date(),
      };
    });

    const createdBrands = await BrandModel.query().insert(newBrand);

    reply.status(201).send(createdBrands);
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: "unknown",
        message: `An unknown error occurred when trying to create an Brand. Error: ${error}`,
      },
    });
  }
};

export const schema = {
  operationId: "createBrand",
  tags: ["Brand"],
  summary: "Create a new Brand.",
  body: CreateBrandSchema,
  description:
    "Endpoint for creating new brands. Expects an array of brand names in the request body.",
  response: {
    201: {
      type: "array",
      description: "Brand(s) successfully created",
    },
    500: {
      title: "Error",
      description: "An unknown error occurred when trying to create an Brand.",
      type: "object",
      required: ["error"],
      properties: {
        error: {},
      },
    },
  },
};

const createBrand: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  CreateBrandRoute
> = {
  method: "POST",
  url,
  handler,
  schema,
};

export default createBrand;
