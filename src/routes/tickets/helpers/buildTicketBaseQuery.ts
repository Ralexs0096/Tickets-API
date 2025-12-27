import { QueryBuilder } from 'objection';
import Ticket from '../../../models/ticket';

export function buildTicketBaseQuery() {
  return Ticket.query()
    .withGraphFetched('[brand, style, deliveries.area]')
    .modifyGraph('brand', (qb) => qb.select('id', 'name'))
    .modifyGraph('style', (qb) => qb.select('id', 'code'))
    .select('tickets.id', 'tickets.cutNumber') as unknown as QueryBuilder<
    Ticket,
    Ticket[]
  >;
}
