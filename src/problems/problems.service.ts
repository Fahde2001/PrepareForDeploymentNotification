import {ForbiddenException, HttpCode, HttpStatus, Injectable} from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemStatusDto } from './dto/update-problem-status.dto';
import {PrismaService} from "../prisma/prisma.service";
import {Problem, TaskStatus} from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import {PrismaClientValidationError} from "@prisma/client/runtime/library";
import {Display_problemsDto} from "./dto/display_problems.dto";
import {Display_TicketsDto} from "../tickets/dto/Display_Tickets.dto";

@Injectable()
export class ProblemsService {
  constructor(private service:PrismaService) {}
  async Crete_Problem(user_Id:string ,dto:CreateProblemDto):Promise<Problem>{
    try {
      const employe = await this.service.employee.findUnique({
        where: {
          Employee_id: user_Id
        },
      });
      if (!employe) {
        throw new ForbiddenException({error:'this Employee is not found',
                                                  statusCode:HttpStatus.FORBIDDEN});
      }
      console.log("\n\n\n"+employe.Employee_id+"\n\n\n");

      const problemCrete = await this.service.problem.create({
        data: {
          Problem_id: uuidv4(),
          User_id: employe.Employee_id,
          Description: dto.Description,
          Reclamation_Status: TaskStatus.NOT_RESOLVED,
          date_Update_Status:null,
          date_Notification_Send: null,
          Project_Name: dto.Project_Name
        }
      });

      return problemCrete;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        console.error('Forbidden Exception:', error);
        throw new ForbiddenException('This Employee is not found');
      } else if (error instanceof PrismaClientValidationError) {
        console.error('Prisma Client Validation Error:', error);
        throw new Error('Failed to create this problem due to validation error.');
      } else {
        console.error('Failed to create this problem:', error);
        throw new Error('Failed to create this problem. See the server logs for more details.');
      }}
  }
  async Display_All_Problem(): Promise<Display_problemsDto[]> {
    try {
      const problems = await this.service.problem.findMany();

      const ProblemsList: Display_problemsDto[] = await Promise.all(problems.map(async (problem) => {
        const employee = await this.service.employee.findUnique({ where: { Employee_id: problem.User_id } });
        return {
          Problem_id: problem.Problem_id,
          Employe_Name: `${employee.Employee_Prenom} ${employee.Employee_Nom}`,
          Description: problem.Description,
          Reclamation_Status: problem.Reclamation_Status,
          date_creation: problem.date_creation,
          date_Update_Status: problem.date_Update_Status,
          date_Notification_Send: problem.date_Notification_Send,
          Project_Name: problem.Project_Name
        };
      }));

      return ProblemsList;
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw new Error('Failed to find problems');
    }
  }
  async Display_Problems_Notification_False(): Promise<Display_problemsDto[]> {
    try {
      const problems = await this.service.problem.findMany();

      const ProblemsList: Display_problemsDto[] = await Promise.all(problems.map(async (problem) => {
        const employee = await this.service.employee.findUnique({ where: { Employee_id: problem.User_id } });
        if(problem.Notification==false){
          return {
            Problem_id: problem.Problem_id,
            Employe_Name: `${employee.Employee_Prenom} ${employee.Employee_Nom}`,
            Description: problem.Description,
            Reclamation_Status: problem.Reclamation_Status,
            date_creation: problem.date_creation,
            date_Update_Status: problem.date_Update_Status,
            date_Notification_Send: problem.date_Notification_Send,
            Project_Name: problem.Project_Name
          };
        }
        return null;
      }));

      return ProblemsList.filter((problem) => problem !== null);
    } catch (error) {
      console.error('Error fetching problems:', error);
      throw new Error('Failed to find problems');
    }
  }
  async Update_Status_Problem(Problem_Id:string,Status:TaskStatus):Promise<boolean>{
    try {
      const problem=await this.service.problem.update({
        where:{Problem_id:Problem_Id},
        data:{
          Reclamation_Status:Status,
          date_Update_Status:new Date()
        }
      });
      if(!problem) throw new ForbiddenException({
        error:"Field to get problem of this id",
        statusCode:HttpStatus.FORBIDDEN,
      })
      return true;
    }catch (error){
      throw new Error("Field to updae status")
    }
  }
  async Update_Status_Notification_Problem(Problem_Id:string):Promise<boolean>{
    try {
      const problem=await this.service.problem.update({
        where:{Problem_id:Problem_Id},
        data:{
          Notification:true,
          date_Notification_Send:new Date()
        }
      });
      if(!problem) throw new ForbiddenException({
        error:"Field to get problem by this id",
        statusCode:HttpStatus.FORBIDDEN,
      })
      return true;
    }catch (error){
      throw new Error("Field to updae status Notification")
    }
  }
}
