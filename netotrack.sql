-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: netotrack
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

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
-- Table structure for table `concurrentsroutes`
--

DROP TABLE IF EXISTS `concurrentsroutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concurrentsroutes` (
  `idRoute` int NOT NULL AUTO_INCREMENT,
  `routeName` varchar(100) NOT NULL,
  `Startlatitud` varchar(50) NOT NULL,
  `Startlongitud` varchar(50) NOT NULL,
  `Endlatitud` varchar(50) NOT NULL,
  `Endlongitud` varchar(50) NOT NULL,
  PRIMARY KEY (`idRoute`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concurrentsroutes`
--

LOCK TABLES `concurrentsroutes` WRITE;
/*!40000 ALTER TABLE `concurrentsroutes` DISABLE KEYS */;

/*!40000 ALTER TABLE `concurrentsroutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deviceinroutes`
--

DROP TABLE IF EXISTS `deviceinroutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deviceinroutes` (
  `idRute` int NOT NULL AUTO_INCREMENT,
  `rute_Name` varchar(100) NOT NULL,
  `device_Name` varchar(50) DEFAULT NULL,
  `Startlatitud` varchar(50) NOT NULL,
  `Startlongitud` varchar(50) NOT NULL,
  `Endlatitud` varchar(50) NOT NULL,
  `Endlongitud` varchar(50) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRute`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceinroutes`
--

LOCK TABLES `deviceinroutes` WRITE;
/*!40000 ALTER TABLE `deviceinroutes` DISABLE KEYS */;

/*!40000 ALTER TABLE `deviceinroutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `NameUser` varchar(50) NOT NULL,
  `passwordUser` varchar(255) DEFAULT NULL,
  `emailUser` varchar(50) NOT NULL,
  `creationdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `lastConnection` date DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;

/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-15 17:46:55
