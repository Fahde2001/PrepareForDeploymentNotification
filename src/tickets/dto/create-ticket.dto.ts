import { OmitType } from '@nestjs/mapped-types';
import { Ticket } from '../entities/ticket.entity';

export class CreateTicketDto extends OmitType(Ticket, [
  'Ticket_id',
  'User_id',
  'Reclamation_Status',
  'date_creation',
  'date_Update_Status',
  'date_Notification_Send',
  'Notification',
]) {}
