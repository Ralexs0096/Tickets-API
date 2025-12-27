import Ticket from '../../../models/ticket';
import { FetchAllTicketsReply } from '../../../types/FetchAllTicketsReply';

export const mapFetchAllTicketsResponse = (
  tickets: Ticket[]
): FetchAllTicketsReply['tickets'] => {
  return tickets.map((ticket) => ({
    id: ticket.id,
    cutNumber: ticket.cutNumber,
    brand: ticket.brand?.name ?? '',
    style: ticket.style?.code ?? '',
    areas: ticket.deliveries?.map((delivery) => ({
      id: delivery.id,
      name: delivery.area?.name ?? '',
    })),
  }));
};
