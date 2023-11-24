import { FastifyInstance, RouteOptions } from 'fastify';
import createServer from '../../server';
import deleteArea from './deleteArea';
import AreaModel from '../../models/area';

describe('DELETE /area', () => {
  let server: FastifyInstance;
  beforeAll(() => {
    server = createServer({ authRoute: [deleteArea] as RouteOptions[] });
  });

  it('returns a 204 status code when deletes an area correctly ', async () => {
    const areaId = 2;

    await AreaModel.query().insert({
      name: 'DELETE',
      CreatedBy: 'ADMIN_TEST',
      ModifiedBy: 'ADMIN_TEST',
      CreatedDate: new Date(),
      ModifiedDate: new Date(),
    });

    const response = await server.inject({
      method: 'DELETE',
      url: `/area/${areaId}`,
      payload: {
        name: 'deleteTest',
      },
    });

    expect(response.statusCode).toEqual(204);
  });

  it('returns a 404 status code when area does not exist', async () => {
    const invalidAreaId = 99999;

    const response = await server.inject({
      method: 'DELETE',
      url: `/area/${invalidAreaId}`,
      payload: {
        name: 'TEST',
      },
    });

    expect(response.statusCode).toEqual(404);
  });
});
