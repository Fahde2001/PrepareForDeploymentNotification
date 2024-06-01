import { Injectable } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import {PrismaService} from "../prisma/prisma.service";
import {Employe} from "./entities/employe.entity";
import { v4 as uuidv4 } from 'uuid';
import {Employee} from "@prisma/client";

@Injectable()
export class EmployeService {
  constructor(private service:PrismaService) {}
  async addEmployee(data:CreateEmployeDto):Promise<Employee>{
    try
      {
        const employe=await this.service.employee.create({
          data:{
            Employee_id: uuidv4(),
            Employee_Nom:data.Employee_Nom,
            Employee_Prenom:data.Employee_Prenom
          }
        })
        return employe;
      }catch (error){
      throw new Error('Failed to create employee: ${error.message}');
    }
  }

  async getAllEmployee():Promise<Employee[]>{
    try{
      const employe=await this.service.employee.findMany();
      return employe;
    }catch (error){
      throw new Error('Failde to get employee');
    }
  }
}
