import { FastifyRequest } from 'fastify';
import Credential from '../../../models/credential';
import { ErrorSchema } from '../../../types/ErrorSchema';
import User from '../../../models/user';

type AuthenticatedUser = User & { email: string };

type ValidateUserResult =
  | { success: true; userInfo: AuthenticatedUser }
  | { success: false; error: ErrorSchema };

export const validateUser = async (
  req: FastifyRequest,
  email: string,
  password: string
): Promise<ValidateUserResult> => {
  const credential = await Credential.query()
    .findOne({ email })
    .withGraphFetched('user');

  /** **************** User not found **************** */
  if (!credential) {
    return {
      success: false,
      error: {
        code: 'UsernameError',
        message: 'User not found.',
        error: 'User not found',
      },
    };
  }

  if (!credential.user) {
    throw new Error('Invariant violation: credential.user is missing');
  }

  /** **************** Validate password **************** */
  const isValid = await credential.verifyPassword(password);
  if (!isValid) {
    return {
      success: false,
      error: {
        code: 'PasswordError',
        message: 'Password is incorrect.',
        error: 'Incorrect password',
      },
    };
  }

  /** **************** Add info to the session **************** */
  req.session.userId = credential.user.id;
  req.session.username = credential.email;

  const userInfo = {
    ...credential.user,
    email: credential.email,
  } as AuthenticatedUser;

  return {
    success: true,
    userInfo,
  };
};
