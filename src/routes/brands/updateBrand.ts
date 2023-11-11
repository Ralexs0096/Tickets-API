import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import BrandSchema from '../../schemas/Brand.json';
import { BrandRequestParams } from '../../types/BrandRequestParams';
import BrandRequestParamsSchema from '../../schemas/BrandRequestParams.json';
import { Brand } from '../../types/Brand';
import BrandModel from '../../models/brand';
import { ErrorSchema } from '../../types/ErrorSchema';
import ErrorSchemaJson from '../../schemas/ErrorSchema.json';

type Reply = Brand | { error: ErrorSchema };
type UpdateBrandRoute = {
  Body: Brand;
  Params: BrandRequestParams;
  Reply: Reply;
};

const url = '/brand/:id';

const handler: RouteHandler<UpdateBrandRoute> = async (req, reply) => {
  try {
    const { id: brandId } = req.params;
    const { name: newBrandName } = req.body;

    const brandToUpdate = await BrandModel.query().findById(brandId);

    if (!brandToUpdate) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'This brand does not exist',
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

    return reply.status(200).send({
      name: newBrandName,
    });
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to update brands.',
      },
    });
  }
};

const schema = {
  operationId: 'updateBrand',
  tags: ['Brand'],
  summary: 'Update a Brand.',
  params: BrandRequestParamsSchema,
  body: BrandSchema,
  response: {
    200: BrandSchema,
    404: {
      title: 'InvalidBrand',
      description: 'Invalid or missing Brand data.',
      type: 'object',
      require: ['error'],
      properties: {
        error: ErrorSchemaJson,
      },
    },
    500: {
      title: 'Error',
      description: 'An unknown error occurred when trying to update brands.',
      type: 'object',
      require: ['error'],
      properties: {
        error: ErrorSchemaJson,
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
  method: 'PUT',
  url,
  handler,
  schema,
};

export default updateBrand;
