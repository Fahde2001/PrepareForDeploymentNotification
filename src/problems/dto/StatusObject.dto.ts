import {TaskStatus} from "@prisma/client";

export interface StatusObject {
    status: TaskStatus;
}