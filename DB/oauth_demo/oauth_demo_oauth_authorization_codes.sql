-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 45.77.243.102    Database: oauth_demo
-- ------------------------------------------------------
-- Server version	5.7.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `oauth_authorization_codes`
--

DROP TABLE IF EXISTS `oauth_authorization_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_authorization_codes` (
  `id` int(14) NOT NULL AUTO_INCREMENT,
  `authorization_code` varchar(256) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `redirect_uri` varchar(2000) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `client_id` int(14) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `oauth_authorization_codes_id_unique` (`id`),
  KEY `oauth_client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `oauth_authorization_codes_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `oauth_authorization_codes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_authorization_codes`
--

LOCK TABLES `oauth_authorization_codes` WRITE;
/*!40000 ALTER TABLE `oauth_authorization_codes` DISABLE KEYS */;
INSERT INTO `oauth_authorization_codes` VALUES (1,NULL,'2016-05-14 18:45:02',NULL,NULL,NULL,1),(2,NULL,'2016-05-14 18:45:10',NULL,NULL,NULL,1),(3,NULL,'2016-05-14 18:45:15',NULL,NULL,NULL,1),(4,NULL,'2016-05-14 18:45:41',NULL,NULL,NULL,1),(5,NULL,'2016-05-14 18:46:59',NULL,NULL,NULL,1),(6,NULL,'2016-05-14 18:47:22',NULL,NULL,NULL,1),(7,NULL,'2016-05-14 18:51:16',NULL,NULL,NULL,1),(8,NULL,'2016-05-14 18:52:10',NULL,NULL,NULL,1),(9,NULL,'2016-05-14 18:52:33',NULL,NULL,NULL,1),(10,NULL,'2016-05-14 18:54:20',NULL,NULL,NULL,1),(11,NULL,'2016-05-14 18:56:08',NULL,NULL,NULL,1),(12,NULL,'2016-05-14 18:57:44',NULL,NULL,NULL,1),(13,'513418e2d3a7f6ab72a63100a298d9ddb8ad0b8e','2016-05-14 18:59:49',NULL,NULL,NULL,1),(14,'993fa8fe3be5691baa73801e31420f406b1516f8','2016-05-14 19:04:08',NULL,NULL,NULL,1),(15,'e78351c1b13dc09a3c51d24123b2dfb2bf178306','2016-05-14 19:04:25',NULL,NULL,NULL,1),(16,'e1cc992a5d1de1a3c42a0cfba9dbc56706abd323','2020-08-14 16:44:54',NULL,'profile',1,1),(17,'34c069c523c88da36a907928e2dfc5635329e904','2020-08-17 17:56:30',NULL,'profile',1,1);
/*!40000 ALTER TABLE `oauth_authorization_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-24  8:31:34
