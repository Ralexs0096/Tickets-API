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

type Reply = Brand  | { error: {} };
type UpdateBrandRoute = {
  Body: Brand;
  Params: BrandRequestParams;
  Reply: Reply;
};

const url = "/brand/:id";

const handler: RouteHandler<UpdateBrandRoute> = async (req, reply) => {
  const idBrand = req.params.id;
  const newBrandName = req.body.name;

  const brandResponse = await BrandModel.query().findById(idBrand);

  if (!brandResponse) {
    return reply.status(404).send({error :{
      message: "This brand does not exist",
    }});
  }

  if (
    brandResponse.name.toLocaleLowerCase() === newBrandName.toLocaleLowerCase()
  ) {
    return reply.status(200).send({
      name: newBrandName,
    });
  }

  await BrandModel.query().updateAndFetchById(idBrand, {
    name: newBrandName.toUpperCase(),
  });

  reply.status(200).send({
    name: newBrandName,
  });
};

const schema = {
  operationId: "updateBrand",
  tags: ["Brand"],
  summary: "Update a Brand.",
  params: BrandRequestParamsSchema,
  body: BrandSchema,
  response: {
    200: BrandSchema,
    400: {
      title: "InvalidBrand",
      description: "Invalid or missing Brand data.",
      type: "object",
      required: ["name"],
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
