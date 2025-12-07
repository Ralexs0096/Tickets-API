import Ticket from '../../../models/ticket';

export function buildTicketBaseQuery() {
  return Ticket.query()
    .joinRelated('[style, brand]')
    .select(
      'tickets.id',
      'tickets.cutNumber',
      'brand.name as brand',
      'style.code as style'
    );
}
