import { Knex } from 'knex';
import { Model } from 'objection';
import knexConfig from '../config/knex';

export let knex: Knex;

beforeAll(async () => {
  Model.knex(knexConfig);
});

afterAll(() => {
  // TODO: SEEDS
});
