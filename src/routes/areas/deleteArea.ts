import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteOptions
} from 'fastify';
import AreaSchema from '../../schemas/Area.json';
import { AreaRequestParams } from '../../types/AreaRequestParams';
import AreaRequestParamsSchema from '../../schemas/AreaRequestParams.json';
import { Area } from '../../types/Area';
import AreaModel from '../../models/area';

type Reply = {};
type DeleteAreaRoute = {
  Body: Area;
  Params: AreaRequestParams;
  Reply: Reply;
};

const url = '/area/:id';

const handler: RouteHandler<DeleteAreaRoute> = async (req, reply) => {
  const areaId = req.params.id;
  const areaResponse = await AreaModel.query().findById(areaId);

  if (!areaResponse) {
    return reply.status(404).send({
      message: 'This area does not exist'
    });
  }

  await AreaModel.query().deleteById(areaId);

  reply.status(204).send();
};

const schema = {
  operationId: 'deleteArea',
  tags: ['Area'],
  summary: 'Delete an Area or some Areas at the same time',
  params: AreaRequestParamsSchema,
  body: AreaSchema,
  response: {
    201: AreaSchema,
    400: {
      title: 'InvalidArea',
      description: 'Invalid or missing Area data.',
      type: 'object',
      required: ['name'],
      properties: {
        error: {}
      }
    }
  }
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
  schema
};

export default deleteArea;
