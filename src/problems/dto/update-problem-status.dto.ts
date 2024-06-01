import {OmitType, PartialType} from '@nestjs/mapped-types';
import { CreateProblemDto } from './create-problem.dto';
import {Problem} from "../entities/problem.entity";

export class UpdateProblemStatusDto extends OmitType(Problem, ['Problem_id','User_id','Description','date_creation','date_Update_Status','date_Notification_Send','Notification']) {}
