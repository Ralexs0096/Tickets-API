import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions,
} from 'fastify';
import AreaModel from '../../models/area';
import AreaSchema from '../../schemas/Area.json';
import AreaRequestParamsSchema from '../../schemas/AreaRequestParams.json';
import ErrorSchemaJson from '../../schemas/ErrorSchema.json';
import { Area } from '../../types/Area';
import { AreaRequestParams } from '../../types/AreaRequestParams';
import { ErrorSchema } from '../../types/ErrorSchema';

interface Reply {
  error: ErrorSchema;
}
interface DeleteAreaRoute {
  Body: Area;
  Params: AreaRequestParams;
  Reply: Reply;
}

const url = '/area/:id';

const handler: RouteHandler<DeleteAreaRoute> = async (req, reply) => {
  try {
    const { id: areaId } = req.params;
    const areaResponse = await AreaModel.query().findById(areaId);

    if (!areaResponse) {
      return reply.status(404).send({
        error: {
          error: 'Not Found',
          code: 'NotFound',
          message: 'This area does not exist',
        },
      });
    }

    await AreaModel.query().deleteById(areaId);

    return reply.status(204).send();
  } catch (error) {
    return reply.status(500).send({
      error: {
        error: `${error}`,
        code: 'Unknown',
        message: 'An unknown error occurred when trying to delete an area.',
      },
    });
  }
};

const schema = {
  operationId: 'deleteArea',
  tags: ['Area'],
  summary: 'Delete an Area or some Areas at the same time',
  params: AreaRequestParamsSchema,
  body: AreaSchema,
  response: {
    201: AreaSchema,
    404: {
      title: 'InvalidArea',
      description: 'Invalid or missing Area data.',
      type: 'object',
      require: ['error'],
      properties: {
        error: ErrorSchemaJson,
      },
    },
    500: {
      title: 'Error',
      description: 'An unknown error occurred when trying to delete areas.',
      type: 'object',
      require: ['error'],
      properties: {
        error: ErrorSchemaJson,
      },
    },
  },
};

const deleteArea: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  DeleteAreaRoute
> = {
  method: 'DELETE',
  url,
  handler,
  schema,
};

export default deleteArea;
