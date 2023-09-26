import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandSchema from "../../schemas/Brand.json";
import { BrandRequestParams } from "../../types/BrandRequestParams";
import BrandRequestParamsSchema from "../../schemas/BrandRequestParams.json";
import { Brand } from "../../types/Brand";
import BrandModel from "../../models/brand";

type Reply = Brand | { error: { code: string; message: string } };
type UpdateBrandRoute = {
  Body: Brand;
  Params: BrandRequestParams;
  Reply: Reply;
};

const url = "/brand/:id";

const handler: RouteHandler<UpdateBrandRoute> = async (req, reply) => {
  try {
    const brandId = req.params.id;
    const newBrandName = req.body.name;

     const brandToUpdate = await BrandModel.query().findById(brandId);

    if (!brandToUpdate) {
      return reply.status(404).send({
        error: {
          code: "unknow",
          message: "This brand does not exist",
        },
      });
    }

    if (
      brandToUpdate.name.toLocaleLowerCase() ===
      newBrandName.toLocaleLowerCase()
    ) {
      return reply.status(200).send({
        name: newBrandName,
      });
    }

    await BrandModel.query().updateAndFetchById(brandId, {
      name: newBrandName.toUpperCase(),
    });

    reply.status(200).send({
      name: newBrandName,
    });
  } catch (error) {
    return reply.status(500).send({
      error: {
        code: 'unknown',
        message: `An unknown error occurred when trying to update brands. Error: ${error}`
      }
    });
  }
};

const schema = {
  operationId: "updateBrand",
  tags: ["Brand"],
  summary: "Update a Brand.",
  params: BrandRequestParamsSchema,
  body: BrandSchema,
  response: {
    200: BrandSchema,
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
      description: "An unknown error occurred when trying to update brands.",
      type: "object",
      required: ["error"],
      properties: {
        error: {},
      },
    },
  },
};

const updateBrand: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  UpdateBrandRoute
> = {
  method: "PUT",
  url,
  handler,
  schema,
};

export default updateBrand;
