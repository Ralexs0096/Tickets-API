import { FastifyInstance, RouteOptions } from 'fastify';
import createServer from '../../server';
import createArea from './createArea';

const url = '/area';

describe('POST /areas', () => {
  let server: FastifyInstance;
  beforeAll(() => {
    server = createServer({ authRoute: [createArea] as RouteOptions[] });
  });

  it('returns a 400 status code', async () => {
    const response = await server.inject({
      method: 'POST',
      url,
      payload: [
        {
          name: 'Test'
        }
      ]
    });

    console.log({ response });

    expect(response.statusCode).toEqual(400);
  });
});
