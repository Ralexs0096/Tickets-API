import { Knex } from 'knex';
import { Model } from 'objection';
import knex from '../config/knex';

beforeAll(async () => {
  Model.knex(knex);
});

afterAll(async () => {
  await knex.destroy();
  // TODO: SEEDS
});
