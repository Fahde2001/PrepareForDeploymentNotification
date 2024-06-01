import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Display_TicketsDto } from './dto/Display_Tickets.dto';
import {CreateProblemDto} from "../problems/dto/create-problem.dto";
import {Problem, TaskStatus, Ticket} from "@prisma/client";
import {Display_problemsDto} from "../problems/dto/display_problems.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('ticket')
@ApiTags('Ticket')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('/add/:user_id')
  async create(@Param('user_id') user_id:string,@Body() createProblemDto: CreateProblemDto):Promise<Ticket>  {
    return await this.ticketsService.Crete_Ticket(user_id,createProblemDto);
  }
  @Get("/test")
  public test(){
    return "HELLO FAHDE";
  }

  @Get()
  async findAll():Promise<Display_TicketsDto[]> {
    return await this.ticketsService.Display_All_Tickets();
  }
  @Get('/list/notificationFalse')
  async find_Notification_False():Promise<Display_TicketsDto[]> {
    return await this.ticketsService.Display_Tickets_Notification_False();
  }

  @Patch('/status/:Ticket_Id')
  async updateStatus(@Param('Ticket_Id') Ticket_Id: string, @Body() statusObject: { status: TaskStatus }): Promise<boolean> {
    const { status } = statusObject;
    console.log("Data object is : "+statusObject);
    console.log("Data object is : "+status);
    const statusString = TaskStatus[status];
    console.log("\n\n\n" + statusString + "\n");
    if (statusString !== undefined) {
      return await this.ticketsService.Update_Status_Ticket(Ticket_Id, statusString);
    } else {
      console.error('Invalid TaskStatus:', status);
      return false; // or handle the error appropriately
    }

  }
  @Patch('/status/notification/:Ticket_Id')
  async updateNotification(@Param('Ticket_Id') Ticket_Id: string): Promise<boolean> {
    return await this.ticketsService.Update_Status_Notification_Ticket(Ticket_Id);
  }
}
