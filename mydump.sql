-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: terse_db
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'Exciting'),(2,'Mysterious'),(3,'Adventurous'),(4,'Intriguing'),(5,'Captivating'),(6,'Fascinating'),(7,'Enigmatic'),(8,'Dynamic'),(9,'Energetic'),(10,'Curious'),(11,'Title'),(12,'Are'),(13,'Wow');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatuser`
--

DROP TABLE IF EXISTS `chatuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chatuser_chat_id_user_id_unique` (`user_id`,`chat_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `chatuser_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatuser_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatuser`
--

LOCK TABLES `chatuser` WRITE;
/*!40000 ALTER TABLE `chatuser` DISABLE KEYS */;
INSERT INTO `chatuser` VALUES (7,1,2),(26,1,10),(29,1,11),(30,1,12),(31,1,13),(3,2,1),(16,2,6),(6,3,2),(10,3,3),(13,3,5),(25,3,9),(8,4,3),(14,4,5),(18,5,7),(20,5,8),(2,6,1),(24,6,9),(5,7,2),(23,8,9),(28,8,10),(4,9,2),(15,9,5),(22,10,9),(1,11,1),(11,11,4),(27,11,10),(9,12,3),(12,13,4),(17,14,6),(21,14,8),(19,15,7);
/*!40000 ALTER TABLE `chatuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `friend1_id` int DEFAULT NULL,
  `friend2_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `friendship_friend2_id_friend1_id_unique` (`friend1_id`,`friend2_id`),
  KEY `friend2_id` (`friend2_id`),
  CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`friend1_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`friend2_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (24,1,5),(25,1,8),(3,2,11),(26,2,15),(9,3,1),(11,4,3),(14,4,9),(10,4,12),(17,5,14),(2,6,2),(23,6,3),(8,7,1),(7,7,3),(22,8,3),(21,8,6),(6,9,1),(5,9,3),(4,9,7),(20,10,3),(19,10,6),(18,10,8),(1,11,6),(13,11,13),(12,12,3),(15,14,2),(27,14,15),(16,15,5);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `author_id` int DEFAULT NULL,
  `chat_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'Hello, how are you?',11,1,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(2,'I\'m doing well too. What\'s new?',11,1,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(3,'I\'m good, thanks! How about you?',6,1,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(4,'What\'s up?',9,2,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(5,'Not much, just chilling.',7,2,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(6,'Same here, lazy Sunday.',3,2,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(7,'Hey, how\'s it going?',4,3,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(8,'Good, thanks! How about you?',12,3,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(9,'I\'m great, just got back from a vacation.',3,3,'2023-09-30 00:47:33','2023-09-30 00:47:33'),(10,'happy',1,2,'2023-09-30 00:48:22','2023-09-30 00:48:22'),(11,'cool',1,2,'2023-09-30 00:49:02','2023-09-30 00:49:02'),(12,'right',1,2,'2023-09-30 00:55:28','2023-09-30 00:55:28'),(13,'cool',1,2,'2023-09-30 00:58:45','2023-09-30 00:58:45'),(14,'cool',1,2,'2023-09-30 00:59:34','2023-09-30 00:59:34'),(15,'Finally',1,2,'2023-09-30 01:00:53','2023-09-30 01:00:53'),(16,'Try',1,2,'2023-09-30 01:47:46','2023-09-30 01:47:46'),(17,'Do',1,2,'2023-09-30 01:48:13','2023-09-30 01:48:13'),(18,'Succeed',1,2,'2023-09-30 01:48:24','2023-09-30 01:48:24');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `recipient_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `invite_chat_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `recipient_id` (`recipient_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,1,2,'friend',0),(2,1,14,'friend',0),(3,1,5,'chat',2),(4,15,2,'chat',7),(5,14,15,'chat',8);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jamie@example.com','jamie','$2b$10$qGx9ql9TaH/QpigXx.zVb.8S2N9Bf9T.R1aWtPMBz2jrxPgT/jsEa'),(2,'juan@example.com','juan','$2b$10$wMbw2/QRkQEJH3q3Vg97aeOY6.4iHeBnes8MVGYydC6jaRLrFvqJi'),(3,'alice@example.com','alice','$2b$10$52Dto9ICcMS3cmaWx8RcD.FKXmLHPSPNgyhH2zM3NRESANxXdpva.'),(4,'bob@example.com','bob','$2b$10$vmAXGJK3FKcElBXAc9.xiueBCL4XSp2Enm1GXq2PI6S9l2oezSMAO'),(5,'charlie@example.com','charlie','$2b$10$uAg4RtZ4ohS53pM/2gdsP.qi1ZqwQN7bceI4y/JvlEWH3ROgeKxfW'),(6,'emma@example.com','emma','$2b$10$NMSJ1QpB6pvrSO3BaC7IDuU0L06sbwKE5WoTp8erqicqvnU2pFC0m'),(7,'david@example.com','david','$2b$10$8XUaptx1lynTHh5Te9VMwODK1JvSRfUvIyhzVbwjnZzenaKwTzHVK'),(8,'frank@example.com','frank','$2b$10$EzGcWFrIfJejGnt6d24eM.3ZrxtYbH61rFcCzHmWeD3QSUqzd0qRG'),(9,'grace@example.com','grace','$2b$10$nm.vGV/DHUGoNsueUM6H1.QCZw4/.S86uvgZQfpHrVorSzjafgLey'),(10,'harry@example.com','harry','$2b$10$B0nSySb91KRQnhGBOM6dPemDoj9usy/7FJIiJ6JRUd11Gt1II0Wze'),(11,'isabel@example.com','isabel','$2b$10$mk74KtZFAYjkUhcYsIGKnOKjtLr35no1wN32Pjq4t1/TjGEfLpm1u'),(12,'jack@example.com','jack','$2b$10$qSMeaMpan9m1b8hU2RebQuSBXMJK/0xzLIcjCHPeiC9K81/LPdavq'),(13,'kate@example.com','kate','$2b$10$bSN5abccZF6MZ3nfUskdv.NZFgmaC5bYEKB3E3ARlKecohJ1TBK2i'),(14,'lucas@example.com','lucas','$2b$10$I08xg2IVbTTpw9RlEFWJP.IeeGa6XXQemCk8E/SjYmC9fD6EULVwu'),(15,'molly@example.com','molly','$2b$10$dROtaq5mgwpTPK9BdijfHORqtBpx2ZaN9MXBdlP33lYzO1GZp6xwS');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-01 12:44:05
