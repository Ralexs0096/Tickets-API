import { FastifyInstance, RouteOptions } from 'fastify';
import createServer from '../../server';
import updateArea from './updateArea';
import AreaModel from '../../models/area';


describe('PUT /area', () => {
  let server: FastifyInstance;
  beforeAll(() => {
    server = createServer({ authRoute: [updateArea] as RouteOptions[] });
  });

  it('returns a 204 status code when updates an area correctly', async () => {
    const areaId = 2;
    await AreaModel.query().insert({
      name: 'UPDATE',
      CreatedBy: 'ADMIN_TEST',
      ModifiedBy: 'ADMIN_TEST',
      CreatedDate: new Date(),
      ModifiedDate: new Date(),
    });


    const response = await server.inject({
      method: 'PUT',
      url: `/area/${areaId}`,
      payload: {
        name: 'updateTest',
      },
    });

    expect(response.statusCode).toEqual(204);
    
  });

  it('returns a 404 status code when area does not exist', async () => {
    const invalidAreaId = 99999;

    const response = await server.inject({
      method: 'PUT',
      url: `/area/${invalidAreaId}`,
      payload: {
        name:"TEST"
      },
    });

    expect(response.statusCode).toEqual(404);
  });
});
