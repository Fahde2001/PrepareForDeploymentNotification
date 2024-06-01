import {OmitType} from "@nestjs/mapped-types";
import {Problem} from "../entities/problem.entity"

export class CreateProblemDto extends OmitType(Problem, ['Problem_id','User_id','Reclamation_Status','date_creation','date_Update_Status','date_Notification_Send','Notification']){}
