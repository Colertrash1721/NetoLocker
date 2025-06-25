-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: netotrack
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idAdmin` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isOnline` tinyint NOT NULL DEFAULT '0',
  `lastConection` datetime DEFAULT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `IDX_de87485f6489f5d0995f584195` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Steven','stevenrobinsoncruzandujar3@gmail.com','$2b$10$5gEL.VKXxaOkB9ekmMYOUuqWtbXmkstw0UedwpueTIG7nqUYZufra',0,NULL,'2025-06-04 15:15:24'),(2,'Admin','robinsoncruzandujar3@gmail.com','$2b$10$KyZOoXdaBxYhQ1JSeCq2A.KVvGiQ6D..8g26PnpabmLbmD8zlhVPm',1,'2025-06-13 12:12:44','2025-06-04 15:40:33');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `idCompany` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `isOnline` tinyint NOT NULL DEFAULT '0',
  `lastConection` datetime DEFAULT NULL,
  `companyName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(255) NOT NULL,
  `contactPerson` varchar(255) NOT NULL,
  `rnc` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `taxes` varchar(255) DEFAULT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`idCompany`),
  UNIQUE KEY `IDX_b0fc567cf51b1cf717a9e8046a` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `concurrentsroutes` VALUES (11,'SansSouci-AmericasZF','18.470756037947982','-69.87667322158813','18.46235033603078','-69.70705032348633'),(12,'Caucedo-RomanaZF','18.430677699660407','-69.63993072509766','18.44342073490976','-68.97851943969727'),(13,'Haina- ZFLasAmericas','18.42279934434775','-70.01310110092163','18.460437116324773','-69.70674991607666');
/*!40000 ALTER TABLE `concurrentsroutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `container`
--

DROP TABLE IF EXISTS `container`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `container` (
  `idContainer` int NOT NULL AUTO_INCREMENT,
  `idCompany` int NOT NULL,
  `port` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `BL` varchar(100) DEFAULT NULL,
  `NContainer` varchar(100) DEFAULT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idEstado` int DEFAULT '1',
  `deviceName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idContainer`),
  KEY `FK_917fb13e73a79ce2aed7ddef85c` (`idCompany`),
  KEY `FK_a3e49b5a07094d88f70f467c7e7` (`idEstado`),
  CONSTRAINT `FK_917fb13e73a79ce2aed7ddef85c` FOREIGN KEY (`idCompany`) REFERENCES `company` (`idCompany`),
  CONSTRAINT `FK_a3e49b5a07094d88f70f467c7e7` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `container`
--

LOCK TABLES `container` WRITE;
/*!40000 ALTER TABLE `container` DISABLE KEYS */;

/*!40000 ALTER TABLE `container` ENABLE KEYS */;
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
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRute`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceinroutes`
--

LOCK TABLES `deviceinroutes` WRITE;
/*!40000 ALTER TABLE `deviceinroutes` DISABLE KEYS */;
/*!40000 ALTER TABLE `deviceinroutes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_deviceinroutesToEvents` AFTER DELETE ON `deviceinroutes` FOR EACH ROW BEGIN      UPDATE events e      SET e.idRute = OLD.idRute      WHERE e.idRute IS NULL      AND e.deviceName = OLD.device_Name; END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idEstado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`idEstado`),
  UNIQUE KEY `IDX_49323df835de7e6edc328473ca` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (2,'aceptado'),(3,'finalizado'),(1,'pendiente');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `idEvent` int NOT NULL,
  `idRute` int DEFAULT NULL,
  `deviceName` varchar(255) DEFAULT NULL,
  `eventType` varchar(255) DEFAULT NULL,
  `eventDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idEvent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freeload`
--

DROP TABLE IF EXISTS `freeload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freeload` (
  `idFreeload` int NOT NULL AUTO_INCREMENT,
  `idCompany` int NOT NULL,
  `port` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `BL` varchar(100) DEFAULT NULL,
  `creationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idEstado` int DEFAULT '1',
  `deviceName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idFreeload`),
  KEY `FK_b81a44f7cfa8e428738e8476349` (`idCompany`),
  KEY `FK_05f64fb6799cfe5710a2017a05c` (`idEstado`),
  CONSTRAINT `FK_05f64fb6799cfe5710a2017a05c` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`idEstado`),
  CONSTRAINT `FK_b81a44f7cfa8e428738e8476349` FOREIGN KEY (`idCompany`) REFERENCES `company` (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freeload`
--

LOCK TABLES `freeload` WRITE;
/*!40000 ALTER TABLE `freeload` DISABLE KEYS */;
/*!40000 ALTER TABLE `freeload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `NameUser` varchar(255) NOT NULL,
  `passwordUser` varchar(255) NOT NULL,
  `emailUser` varchar(255) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `authenticatorSecret` varchar(255) DEFAULT NULL,
  `firstSecret` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;

/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `isRevoked` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d9959ee7e17e2293893444ea37` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

DELIMITER //
CREATE PROCEDURE `DeleteExpiredTokens`()
BEGIN
    DELETE FROM token 
    WHERE createdAt < DATE_SUB(NOW(), INTERVAL 24 HOUR);
END //
DELIMITER ;

DELIMITER //

CREATE EVENT `DeleteOldTokensEvent`
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    CALL DeleteExpiredTokens();
END //

DELIMITER ;


LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;

/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13 15:00:25