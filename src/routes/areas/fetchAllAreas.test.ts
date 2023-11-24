import { FastifyInstance, RouteOptions } from "fastify";
import fetchAllAreas from "./fetchAllAreas";
import createServer from '../../server';
describe('GET /area', () => {
  let server:FastifyInstance;
  beforeAll(() => {
    server = createServer({authRoute: [fetchAllAreas]as RouteOptions[]})
  });

  it('returns a 201 status code when get all areas',async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/area'

    });
    expect(response.statusCode).toEqual(201)
  })

});
