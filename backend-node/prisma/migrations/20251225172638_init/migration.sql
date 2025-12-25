-- CreateTable
CREATE TABLE `academic_documents` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `class_name` VARCHAR(255) NULL,
    `created_at` DATETIME(6) NULL,
    `file_url` VARCHAR(255) NOT NULL,
    `publish_date` DATE NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('RESULT', 'ROUTINE', 'SYLLABUS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `committee_members` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL,
    `email` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `is_visible` BIT(1) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `role` VARCHAR(255) NOT NULL,
    `sort_order` INTEGER NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_media` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `media_type` ENUM('IMAGE', 'VIDEO') NOT NULL,
    `media_url` VARCHAR(255) NOT NULL,
    `event_id` BIGINT NOT NULL,

    INDEX `FKh1op3uneorrw24lyv4eya6mg3`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL,
    `description` TEXT NULL,
    `event_date` DATE NOT NULL,
    `thumbnail_url` VARCHAR(255) NULL,
    `title` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(6) NULL,
    `video_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notices` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category` ENUM('ADMISSION', 'EVENT', 'EXAM', 'GENERAL', 'HOLIDAY', 'MEETING') NOT NULL,
    `created_at` DATETIME(6) NULL,
    `description` TEXT NULL,
    `is_urgent` BIT(1) NULL,
    `publish_date` DATE NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(6) NULL,
    `created_by` BIGINT NULL,
    `attachment_url` VARCHAR(255) NULL,
    `show_in_ticker` BIT(1) NOT NULL,

    INDEX `FKdcx7eafm2avpoafgx6otyvd79`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `page_contents` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL,
    `is_visible` BIT(1) NOT NULL,
    `page_key` VARCHAR(255) NOT NULL,
    `pdf_url` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `updated_at` DATETIME(6) NULL,

    UNIQUE INDEX `UKpuyufwxojd2d92or4x86oswsm`(`page_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slider_settings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `auto_play` BIT(1) NOT NULL,
    `auto_play_interval` INTEGER NOT NULL,
    `transition_duration` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sliders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NOT NULL,
    `display_order` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_active` BIT(1) NOT NULL,
    `show_text` BIT(1) NOT NULL,
    `subtitle` VARCHAR(255) NULL,
    `title` VARCHAR(255) NULL,
    `updated_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `admission_date` DATE NOT NULL,
    `birth_registration_number` VARCHAR(255) NOT NULL,
    `blood_group` VARCHAR(255) NULL,
    `class_name` VARCHAR(255) NOT NULL,
    `created_at` DATE NULL,
    `date_of_birth` DATE NOT NULL,
    `father_name` VARCHAR(255) NOT NULL,
    `father_nid` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NOT NULL,
    `guardian_mobile` VARCHAR(255) NOT NULL,
    `mother_name` VARCHAR(255) NOT NULL,
    `mother_nid` VARCHAR(255) NULL,
    `name_bangla` VARCHAR(255) NOT NULL,
    `name_english` VARCHAR(255) NOT NULL,
    `permanent_address` TEXT NULL,
    `photo_url` VARCHAR(255) NULL,
    `present_address` TEXT NULL,
    `religion` VARCHAR(255) NOT NULL,
    `roll_number` VARCHAR(255) NULL,
    `section` VARCHAR(255) NULL,
    `session` VARCHAR(255) NOT NULL,
    `status` ENUM('APPROVED', 'PENDING', 'REJECTED') NULL,
    `updated_at` DATETIME(6) NULL,
    `admission_year` INTEGER NULL,
    `mobile_number` VARCHAR(255) NULL,
    `name_bn` VARCHAR(255) NULL,
    `name_en` VARCHAR(255) NULL,
    `previous_school` VARCHAR(255) NULL,
    `student_class` VARCHAR(255) NULL,
    `contact_number` VARCHAR(255) NULL,
    `guardian_name` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `roll_no` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `UKc2gbkkvs7001lnq5ryu188l7y`(`birth_registration_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL,
    `designation` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `is_visible` BIT(1) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `sort_order` INTEGER NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticker_settings` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `enabled` BIT(1) NOT NULL,
    `max_items` INTEGER NOT NULL,
    `scroll_speed` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(6) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'OFFICER', 'TEACHER') NOT NULL,
    `username` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `UKr43af9ap4edm43mmtq01oddj6`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_media` ADD CONSTRAINT `FKh1op3uneorrw24lyv4eya6mg3` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notices` ADD CONSTRAINT `FKdcx7eafm2avpoafgx6otyvd79` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
