-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: pc_store_database
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('computer','laptop','mobile') NOT NULL,
  `title` varchar(100) NOT NULL,
  `cpu` varchar(45) DEFAULT NULL,
  `video_card` varchar(45) DEFAULT NULL,
  `ram` varchar(45) DEFAULT NULL,
  `internal_memory` varchar(45) DEFAULT NULL,
  `camera` varchar(45) DEFAULT NULL,
  `battery_life` varchar(45) DEFAULT NULL,
  `display` varchar(45) DEFAULT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'computer','Desktop Intel Core 5 7400, 4.2GHz, 8GB, SSD 512GB','i5-7400','gtx 1060 6GB','8GB DDR4','SSD 512GB',NULL,NULL,NULL,3099.89),(2,'laptop','Laptop Asus, I7 8350, RTX 2070 8GB, 16GB, SSD 1TB','i7-8350','rtx 2070 8GB','16GB DDR4','SSD 1TB','8MPx','22 hours','24 inches',7299.99),(5,'computer','Desktop, i3 , gtx770, 8GB, 1TB memorie','i3-5400','gtx 770','8GB DDR3','HDD 1TB','','','',1599.99),(6,'computer','Desktop, i3 , gtx770, 8GB, 1TB memorie','i3-5400','gtx 770','8GB DDR3','HDD 1TB',NULL,NULL,NULL,1599.99),(7,'computer','Desktop, i3 , gtx770, 8GB, 1TB memorie','i3-5400','gtx 770','8GB DDR3','HDD 1TB',NULL,NULL,NULL,1599.99),(8,'laptop','Laptop Asus, I7 8350, RTX 2070 8GB, 16GB, SSD 1TB','i7-8350','rtx 2070 8GB','16GB DDR4','SSD 1TB','8MPx','22 hours','24 inches',7299.99),(9,'laptop','Laptop Asus, I7 8350, RTX 2070 8GB, 16GB, SSD 1TB','i7-8350','rtx 2070 8GB','16GB DDR4','SSD 1TB','8MPx','22 hours','24 inches',7299.99),(10,'mobile','Huawei Nova 5T','Kirin 980',NULL,'6GB','128 GB','48MPx','1 day 18 hours','6.2 inches',1259.99);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_id` int NOT NULL,
  `date_time` timestamp NOT NULL,
  `amount` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_id_UNIQUE` (`device_id`),
  KEY `fk_payment_user_idx` (`user_id`),
  CONSTRAINT `fk_payment_device` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`),
  CONSTRAINT `fk_payment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,2,2,'2021-10-10 09:10:10',7299.99),(6,2,6,'2021-10-10 09:10:10',1599.99);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart_link`
--

DROP TABLE IF EXISTS `shopping_cart_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart_link` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `device_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shopping_cart_user_idx` (`user_id`),
  KEY `fk_shopping_cart_device_idx` (`device_id`),
  CONSTRAINT `fk_shopping_cart_device` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`),
  CONSTRAINT `fk_shopping_cart_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart_link`
--

LOCK TABLES `shopping_cart_link` WRITE;
/*!40000 ALTER TABLE `shopping_cart_link` DISABLE KEYS */;
INSERT INTO `shopping_cart_link` VALUES (1,1,5),(3,1,8);
/*!40000 ALTER TABLE `shopping_cart_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` int(10) unsigned zerofill NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user','user@yahoo.com','user test','2020-10-10',0757234234,'parola'),(2,'bogdan98','silviu.bogdan98@gmail.com','Silviu Bogdan','1998-11-09',0742188595,'parola'),(5,'usertest1','usertest1@gmail.com','user test','2000-10-10',0757123111,'parola'),(6,'usertest2','usertest2@gmail.com','user test','2000-10-10',0777888998,'parola');
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

-- Dump completed on 2021-09-03 18:40:14
