import {TaskStatus,Ticket as Model} from "@prisma/client";
export class Ticket implements Model {
    Ticket_id          :string
    User_id            :string
    Description        :string
    Reclamation_Status :TaskStatus
    date_creation      :Date
    date_Update_Status :Date
    date_Notification_Send :Date
    Notification       :boolean
    Project_Name       :string
}
