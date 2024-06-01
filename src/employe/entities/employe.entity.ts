
import {Employee as EmployeeModel} from "@prisma/client";
import {Ticket} from "@prisma/client";
import {Problem} from "@prisma/client";

export class Employe implements EmployeeModel{
    Employee_id     : string
    Employee_Nom    : string
    Employee_Prenom : string
    date_creation   :Date
    Tickets         : Ticket[]
    Problems        : Problem[]
}
