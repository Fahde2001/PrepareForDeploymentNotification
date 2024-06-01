import {TaskStatus} from "@prisma/client";

export class Display_problemsDto{
    Problem_id              :string
    Employe_Name            :string
    Description             :string
    Reclamation_Status      :TaskStatus
    date_creation           :Date
    date_Update_Status      :Date
    date_Notification_Send  :Date
    Project_Name            :string
}