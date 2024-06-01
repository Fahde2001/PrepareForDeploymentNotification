-- CreateTable
CREATE TABLE `Employee` (
    `Employee_id` VARCHAR(191) NOT NULL,
    `Employee_Nom` VARCHAR(191) NOT NULL,
    `Employee_Prenom` VARCHAR(191) NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `Ticket_id` VARCHAR(191) NOT NULL,
    `User_id` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Reclamation_Status` ENUM('NOT_RESOLVED', 'IN_PROGRESS', 'RESOLVED') NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_Update_Status` DATETIME(3) NULL,
    `Notification` BOOLEAN NOT NULL DEFAULT false,
    `date_Notification_Send` DATETIME(3) NULL,
    `Project_Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Problem` (
    `Problem_id` VARCHAR(191) NOT NULL,
    `User_id` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Reclamation_Status` ENUM('NOT_RESOLVED', 'IN_PROGRESS', 'RESOLVED') NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_Update_Status` DATETIME(3) NULL,
    `Notification` BOOLEAN NOT NULL DEFAULT false,
    `date_Notification_Send` DATETIME(3) NULL,
    `Project_Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Problem_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `Employee`(`Employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Problem` ADD CONSTRAINT `Problem_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `Employee`(`Employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
