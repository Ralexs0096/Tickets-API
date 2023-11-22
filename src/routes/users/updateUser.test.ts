import { FastifyInstance, RouteOptions } from 'fastify';
import createServer from '../../server';
import updateUser from './updateUser';
import UserModel from '../../models/user';

describe('PUT /user', () => {
  let server: FastifyInstance;
  beforeAll(() => {
    server = createServer({ authRoute: [updateUser] as RouteOptions[] });
  });

  it('updates a user correctly and returns 200 status code', async () => {
    const userId = 1;
    await UserModel.query().insert({
      firstName: 'Joe',
      lastName: 'Bloggs',
      CreatedBy: 'ADMIN_TEST',
      ModifiedBy: 'ADMIN_TEST',
      CreatedDate: new Date(),
      ModifiedDate: new Date(),
    });

    const response = await server.inject({
      method: 'PUT',
      url: `/user/${userId}`,
      payload: {
        firstName: 'john',
        lastName: 'doe',
        areaId: 1,
      },
    });

    expect(response.statusCode).toEqual(200);
    const updatedUser = JSON.parse(response.payload);
    expect(updatedUser).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        areaId: 1,
      })
    );
  });

  it('returns a 404 status code when user does not exist', async () => {
    const invalidUserId = 99999;

    const response = await server.inject({
      method: 'PUT',
      url: `/user/${invalidUserId}`,
      payload: {
        firstName: 'John',
        lastName: 'Doe',
        areaId: 1,
      },
    });

    expect(response.statusCode).toEqual(404);
  });
});
