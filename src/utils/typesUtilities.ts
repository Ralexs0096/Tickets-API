import { ErrorSchema as Error } from '../types/ErrorSchema';

export type WithError<T> = T | Error;
