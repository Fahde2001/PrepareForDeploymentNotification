import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Problem, TaskStatus } from '@prisma/client';
import { Display_problemsDto } from './dto/display_problems.dto';

@Controller('problem')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('/add/:user_id')
  async create(
    @Param('user_id') user_id: string,
    @Body() createProblemDto: CreateProblemDto,
  ): Promise<Problem> {
    return await this.problemsService.Crete_Problem(user_id, createProblemDto);
  }

  @Get()
  async findAll(): Promise<Display_problemsDto[]> {
    return await this.problemsService.Display_All_Problem();
  }
  @Get('/list/notificationFalse')
  async find_Notification_False(): Promise<Display_problemsDto[]> {
    return await this.problemsService.Display_Problems_Notification_False();
  }
  @Patch('/status/:Problem_Id')
  async updateStatus(
    @Param('Problem_Id') Problem_Id: string,
    @Body() statusObject: { Status: TaskStatus },
  ): Promise<boolean> {
    const { Status } = statusObject;
    console.log('Data object is : ', statusObject);
    console.log('Data object is : ', Status);
    const statusString = TaskStatus[Status];
    console.log('\n' + statusString + '\n');
    if (statusString !== undefined) {
      return await this.problemsService.Update_Status_Problem(
        Problem_Id,
        statusString,
      );
    } else {
      console.error('Invalid TaskStatus:', Status);
      return false; // or handle the error appropriately
    }
  }
  @Patch('/status/notification/:Problem_Id')
  async updateNotification(
    @Param('Problem_Id') Problem_Id: string,
  ): Promise<boolean> {
    return await this.problemsService.Update_Status_Notification_Problem(
      Problem_Id,
    );
  }
}
