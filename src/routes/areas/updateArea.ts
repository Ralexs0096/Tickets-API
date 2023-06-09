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
type UpdateAreaRoute = {
  Body: Area;
  Params: AreaRequestParams;
  Reply: Reply;
};

const url = '/area/:id';

const handler: RouteHandler<UpdateAreaRoute> = async (req, reply) => {
  const idArea = req.params.id;
  const newAreaName = req.body.name;

  const areaResponse = await AreaModel.query().findById(idArea);

  if (!areaResponse) {
    return reply.status(404).send({
      message: 'This area does not exist'
    });
  }

  if (
    areaResponse.name.toLocaleLowerCase() === newAreaName.toLocaleLowerCase()
  ) {
    return reply.status(204).send();
  }

  await AreaModel.query().updateAndFetchById(idArea, {
    name: newAreaName.toUpperCase()
  });

  reply.status(204).send();
};

const schema = {
  operationId: 'updateArea',
  tags: ['Area'],
  summary: 'Update an Area.',
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

const updateArea: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  UpdateAreaRoute
> = {
  method: 'PUT',
  url,
  handler,
  schema
};

export default updateArea;
