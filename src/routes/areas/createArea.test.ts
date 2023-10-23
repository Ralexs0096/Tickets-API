import { FastifyInstance, RouteOptions } from 'fastify';
import createServer from '../../server';
import createArea from './createArea';
import AreaModel from '../../models/area';

const url = '/area';

describe('POST /areas', () => {
  let server: FastifyInstance;
  beforeAll(() => {
    server = createServer({ authRoute: [createArea] as RouteOptions[] });
  });

  it('returns a 500 status code when try to create an area that already exist', async () => {
    await AreaModel.query().insert({
      name: 'TEST',
      CreatedBy: 'ADMIN_TEST',
      ModifiedBy: 'ADMIN_TEST',
      CreatedDate: new Date(),
      ModifiedDate: new Date()
    });

    const response = await server.inject({
      method: 'POST',
      url,
      payload: {
        areas: [
          {
            name: 'Test'
          }
        ]
      }
    });

    expect(response.statusCode).toEqual(500);
  });
});
