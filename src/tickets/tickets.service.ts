import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Display_TicketsDto } from './dto/Display_Tickets.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProblemDto } from '../problems/dto/create-problem.dto';
import { Problem, TaskStatus, Ticket } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Display_problemsDto } from '../problems/dto/display_problems.dto';

@Injectable()
export class TicketsService {
  constructor(private service: PrismaService) {}
  async Crete_Ticket(user_Id: string, dto: CreateTicketDto): Promise<Ticket> {
    try {
      const employe = await this.service.employee.findUnique({
        where: {
          Employee_id: user_Id,
        },
      });
      if (!employe) {
        throw new ForbiddenException({
          error: 'this Employee is not found',
          statusCode: HttpStatus.FORBIDDEN,
        });
      }
      console.log('\n\n\n' + employe.Employee_id + '\n\n\n');

      const TicketCreation = await this.service.ticket.create({
        data: {
          Ticket_id: uuidv4(),
          User_id: employe.Employee_id,
          Description: dto.Description,
          Reclamation_Status: TaskStatus.NOT_RESOLVED,
          date_Update_Status: null,
          date_Notification_Send: null,
          Project_Name: dto.Project_Name,
        },
      });

      return TicketCreation;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        console.error('Forbidden Exception:', error);
        throw new ForbiddenException('This Employee is not found');
      } else if (error instanceof PrismaClientValidationError) {
        console.error('Prisma Client Validation Error:', error);
        throw new Error(
          'Failed to create this problem due to validation error.',
        );
      } else {
        console.error('Failed to create this problem:', error);
        throw new Error(
          'Failed to create this problem. See the server logs for more details.',
        );
      }
    }
  }
  async Display_All_Tickets(): Promise<Display_TicketsDto[]> {
    try {
      const Tickets = await this.service.ticket.findMany();

      const TicketList: Display_TicketsDto[] = await Promise.all(
        Tickets.map(async (ticket) => {
          const employee = await this.service.employee.findUnique({
            where: { Employee_id: ticket.User_id },
          });
          return {
            Ticket_Id: ticket.Ticket_id,
            Employe_Name: `${employee.Employee_Prenom} ${employee.Employee_Nom}`,
            Description: ticket.Description,
            Reclamation_Status: ticket.Reclamation_Status,
            date_creation: ticket.date_creation,
            date_Update_Status: ticket.date_Update_Status,
            date_Notification_Send: ticket.date_Notification_Send,
            Project_Name: ticket.Project_Name,
          };
        }),
      );

      return TicketList;
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw new Error('Failed to find problems');
    }
  }
  async Display_Tickets_Notification_False(): Promise<Display_TicketsDto[]> {
    try {
      const Tickets = await this.service.ticket.findMany();
      const TicketList: (Display_TicketsDto | null)[] = await Promise.all(
        Tickets.map(async (ticket) => {
          const employee = await this.service.employee.findUnique({
            where: { Employee_id: ticket.User_id },
          });
          if (ticket.Notification == false) {
            return {
              Ticket_Id: ticket.Ticket_id,
              Employe_Name: `${employee.Employee_Prenom} ${employee.Employee_Nom}`,
              Description: ticket.Description,
              Reclamation_Status: ticket.Reclamation_Status,
              date_creation: ticket.date_creation,
              date_Update_Status: ticket.date_Update_Status,
              date_Notification_Send: ticket.date_Notification_Send,
              Project_Name: ticket.Project_Name,
            };
          }
          return null;
        }),
      );
      const filteredTicketList = TicketList.filter(
        (ticket) => ticket !== null,
      ) as Display_TicketsDto[];

      return filteredTicketList;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to find tickets');
    }
  }

  async Update_Status_Ticket(
    Ticket_Id: string,
    Status: TaskStatus,
  ): Promise<boolean> {
    try {
      const ticket = await this.service.ticket.update({
        where: { Ticket_id: Ticket_Id },
        data: {
          Reclamation_Status: Status,
          date_Update_Status: new Date(),
        },
      });
      if (!ticket)
        throw new ForbiddenException({
          error: 'Field to get ticket of this id',
          statusCode: HttpStatus.FORBIDDEN,
        });
      return true;
    } catch (error) {
      throw new Error('Field to updae status');
    }
  }
  async Update_Status_Notification_Ticket(Ticket_Id: string): Promise<boolean> {
    try {
      const ticket = await this.service.ticket.update({
        where: { Ticket_id: Ticket_Id },
        data: {
          Notification: true,
          date_Notification_Send: new Date(),
        },
      });
      if (!ticket)
        throw new ForbiddenException({
          error: 'Field to get problem by this id',
          statusCode: HttpStatus.FORBIDDEN,
        });
      return true;
    } catch (error) {
      throw new Error('Field to updae status Notification');
    }
  }
}
