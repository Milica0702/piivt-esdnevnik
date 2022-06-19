-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for piivt-esdnevnik
DROP DATABASE IF EXISTS `piivt-esdnevnik`;
CREATE DATABASE IF NOT EXISTS `piivt-esdnevnik` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `piivt-esdnevnik`;

-- Dumping structure for table piivt-esdnevnik.professor
DROP TABLE IF EXISTS `professor`;
CREATE TABLE IF NOT EXISTS `professor` (
  `professor_id` int(10) unsigned NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `subject_id` int(10) unsigned NOT NULL,
  `surname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `hash_password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`professor_id`),
  UNIQUE KEY `uq_professor_username` (`username`),
  KEY `fk_professor_subject_subject_id` (`subject_id`),
  CONSTRAINT `fk_professor_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt-esdnevnik.professor_student
DROP TABLE IF EXISTS `professor_student`;
CREATE TABLE IF NOT EXISTS `professor_student` (
  `professor_student_id` int(10) unsigned NOT NULL,
  `professor_id` int(10) unsigned NOT NULL,
  `student_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`professor_student_id`),
  KEY `fk_professor_student_student_id` (`student_id`),
  KEY `fk_professor_student_professor_id` (`professor_id`),
  CONSTRAINT `fk_professor_student_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_professor_student_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt-esdnevnik.professor_student_subject
DROP TABLE IF EXISTS `professor_student_subject`;
CREATE TABLE IF NOT EXISTS `professor_student_subject` (
  `professor_student_subject_id` int(10) unsigned NOT NULL,
  `final_grade` int(10) unsigned NOT NULL,
  `note` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `student_subject_id` int(10) unsigned NOT NULL,
  `professor_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`professor_student_subject_id`),
  KEY `fk_professor_student_subject_student_subject_student_subject_id` (`student_subject_id`),
  KEY `fk_professor_student_subject_professor_professor_id` (`professor_id`),
  CONSTRAINT `fk_professor_student_subject_professor_professor_id` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_professor_student_subject_student_subject_student_subject_id` FOREIGN KEY (`student_subject_id`) REFERENCES `student_subject` (`student_subject_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt-esdnevnik.student
DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `student_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `hash_password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`student_id`) USING BTREE,
  UNIQUE KEY `uq_student_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt-esdnevnik.student_subject
DROP TABLE IF EXISTS `student_subject`;
CREATE TABLE IF NOT EXISTS `student_subject` (
  `student_subject_id` int(10) unsigned NOT NULL,
  `grade` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject_id` int(10) unsigned NOT NULL,
  `student_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`student_subject_id`),
  KEY `fk_student_subject_subject_subject_id` (`subject_id`),
  KEY `fk_student_suvject_student_student_id` (`student_id`),
  CONSTRAINT `fk_student_subject_subject_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_student_suvject_student_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table piivt-esdnevnik.subject
DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`subject_id`) USING BTREE,
  UNIQUE KEY `uq_subject_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
