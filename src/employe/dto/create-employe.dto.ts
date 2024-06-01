import {OmitType} from "@nestjs/mapped-types";
import {Employe} from "../entities/employe.entity";

export class CreateEmployeDto extends OmitType(Employe,['Employee_id','date_creation']){}
