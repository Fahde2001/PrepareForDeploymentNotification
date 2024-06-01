import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { Employee } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('employe')
@ApiTags('Employee')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post('/add')
  async create(@Body() createEmployeDto: CreateEmployeDto): Promise<Employee> {
    return await this.employeService.addEmployee(createEmployeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeService.getAllEmployee();
  }
}
