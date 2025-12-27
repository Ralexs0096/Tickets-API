import Ticket from '../../../models/ticket';

export function buildTicketBaseQuery() {
  return Ticket.query()
    .joinRelated('[style, brand]')
    .withGraphFetched('deliveries')
    .select(
      'tickets.id',
      'tickets.cutNumber',
      'brand.name as brand',
      'style.code as style'
    );
}
