import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from "fastify";
import BrandModel from "../../models/brand";
import BrandSchema from "../../schemas/Brand.json";
import { Brand } from "../../types/Brand";
import BrandRequestParamsSchema from "../../schemas/BrandRequestParams.json";
import { BrandRequestParams } from "../../types/BrandRequestParams";

type Reply = {};
type DeleteBrandRoute = {
  Body: Brand;
  Params: BrandRequestParams;
  Reply: Reply;
};

const url = "/brand/:id";

const handler: RouteHandler<DeleteBrandRoute> = async (req, reply) => {
  const brandId = req.params.id;
  const brandResponse = await BrandModel.query().findById(brandId);

  !brandResponse
    ? reply.status(404).send({ message: "This brand does not exist" })
    : await BrandModel.query().deleteById(brandId);
  reply.status(204).send();
};

const schema = {
  operationId: "deleteBrand",
  tags: ["Brand"],
  summary: "Delete an Brand",
  params: BrandRequestParamsSchema,
  description: "Endpoint for delete a brand.",
  response: {
    204: BrandSchema,
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
