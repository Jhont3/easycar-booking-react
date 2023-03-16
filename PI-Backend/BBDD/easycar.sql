CREATE DATABASE  IF NOT EXISTS `easycar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `easycar`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: easycar
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `start_time` time DEFAULT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `cars_id` bigint NOT NULL,
  `client_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookings_cars1_idx` (`cars_id`),
  KEY `FK3txcn0vmvwj9h1bup45u1n3xn` (`client_id`),
  CONSTRAINT `FK3txcn0vmvwj9h1bup45u1n3xn` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `fk_bookings_cars1` FOREIGN KEY (`cars_id`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,'13:00:00','2023-04-11','2023-04-12',12,3),(3,'13:00:00','2023-04-11','2023-04-12',14,3);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_feature`
--

DROP TABLE IF EXISTS `car_feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_feature` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cars_id` bigint NOT NULL,
  `features_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_car_feature_cars1_idx` (`cars_id`),
  KEY `fk_car_feature_features1_idx` (`features_id`),
  CONSTRAINT `fk_car_feature_cars1` FOREIGN KEY (`cars_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `fk_car_feature_features1` FOREIGN KEY (`features_id`) REFERENCES `features` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_feature`
--

LOCK TABLES `car_feature` WRITE;
/*!40000 ALTER TABLE `car_feature` DISABLE KEYS */;
INSERT INTO `car_feature` VALUES (1,1,3),(2,1,6),(3,1,26),(4,1,8),(5,1,10),(6,1,12),(7,1,15),(8,1,18),(9,1,20),(10,1,22),(11,1,24),(12,2,2),(13,2,5),(14,2,25),(15,2,9),(16,2,10),(17,2,14),(18,2,15),(19,2,17),(20,2,19),(21,2,21),(22,2,23),(23,3,3),(24,3,6),(25,3,26),(26,3,8),(27,3,10),(28,3,13),(29,3,15),(30,3,17),(31,3,19),(32,3,22),(33,3,23),(34,4,3),(35,4,6),(36,4,26),(37,4,9),(38,4,10),(39,4,13),(40,4,15),(41,4,17),(42,4,19),(43,4,21),(44,4,23),(45,5,2),(46,5,6),(47,5,25),(48,5,8),(49,5,10),(50,5,12),(51,5,15),(52,5,18),(53,5,20),(54,5,22),(55,5,24),(56,6,2),(57,6,5),(58,6,25),(59,6,9),(60,6,10),(61,6,12),(62,6,15),(63,6,17),(64,6,19),(65,6,21),(66,6,23),(67,7,3),(68,7,6),(69,7,26),(70,7,9),(71,7,11),(72,7,13),(73,7,15),(74,7,17),(75,7,19),(76,7,21),(77,7,23),(78,8,2),(79,8,5),(80,8,25),(81,8,9),(82,8,10),(83,8,12),(84,8,15),(85,8,17),(86,8,19),(87,8,21),(88,8,23),(89,9,4),(90,9,6),(91,9,26),(92,9,8),(93,9,10),(94,9,12),(95,9,15),(96,9,17),(97,9,19),(98,9,22),(99,9,24),(100,10,2),(101,10,5),(102,10,25),(103,10,9),(104,10,10),(105,10,12),(106,10,15),(107,10,17),(108,10,19),(109,10,21),(110,10,23),(111,11,4),(112,11,6),(113,11,27),(114,11,9),(115,11,10),(116,11,14),(117,11,15),(118,11,17),(119,11,19),(120,11,21),(121,11,23),(122,12,3),(123,12,6),(124,12,26),(125,12,9),(126,12,10),(127,12,13),(128,12,15),(129,12,17),(130,12,19),(131,12,21),(132,12,23),(133,13,3),(134,13,6),(135,13,26),(136,13,8),(137,13,10),(138,13,12),(139,13,15),(140,13,17),(141,13,20),(142,13,22),(143,13,24),(144,14,1),(145,14,5),(146,14,25),(147,14,9),(148,14,10),(149,14,12),(150,14,15),(151,14,17),(152,14,19),(153,14,21),(154,14,23),(155,15,4),(156,15,6),(157,15,27),(158,15,9),(159,15,10),(160,15,14),(161,15,15),(162,15,17),(163,15,19),(164,15,21),(165,15,23),(166,16,2),(167,16,5),(168,16,26),(169,16,9),(170,16,10),(171,16,12),(172,16,15),(173,16,17),(174,16,19),(175,16,21),(176,16,23),(177,17,3),(178,17,6),(179,17,26),(180,17,8),(181,17,10),(182,17,13),(183,17,15),(184,17,17),(185,17,19),(186,17,22),(187,17,23),(199,19,3),(200,19,6),(201,19,15),(202,23,7);
/*!40000 ALTER TABLE `car_feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `categories_id` bigint NOT NULL,
  `cities_id` bigint NOT NULL,
  `rent_policy` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cars_categories_idx` (`categories_id`),
  KEY `fk_cars_categories1_idx` (`categories_id`),
  KEY `fk_cars_cities1_idx` (`cities_id`),
  KEY `FK1sj3lnpyyqh06c1iwhq25m595` (`rent_policy`),
  CONSTRAINT `FK1sj3lnpyyqh06c1iwhq25m595` FOREIGN KEY (`rent_policy`) REFERENCES `rent_policies` (`id`),
  CONSTRAINT `fk_cars_categories` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_cars_cities1` FOREIGN KEY (`cities_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'Chevrolet Joy ','The Joy is an economical, familiar and versatile sedan perfect for moving around the city.*In a car with enough space to travel comfortably.',1,2,1),(2,'Ford Mustang','The Ford Mustang provides ample amounts of style and performance. It also makes the appropriate nods to the Mustang\'s heritage while staying current with the latest technology features.*Strong power from both the four-cylinder and V8 engines.*You\'ll be comfortable for hours in the Mustang, which is quite a feat considering how performance-focused this car is. The seats offer great support and the cabin is fairly quiet. The V8 sounds great, which is precisely what you\'ll want to hear.',2,1,2),(3,'Suzuki Vitara','The Suzuki Vitara is an economical and spacious SUV. This small truck is adequate when it comes to getting to and from work and running daily errands, but on longer trips.*It boasts a generous standard features list, one that includes amenities such as Bluetooth, automatic climate control and a navigation system.*Large cargo capacity and strong brakes.',3,3,2),(4,'Audi A6','The Audi A6 provides excellent performance and plenty of the latest technology features. Comfort suffers ever so slightly when you go with the big optional wheels and sport suspension.*the A6 can produce impressive grip and rapid acceleration with its turbocharged V6.*Strong overall performance.*Attractive and refined interior.*Lots of high-tech features.',4,4,3),(5,'Kia Picanto','The Picanto is a small and comfortable car perfect for moving around the city.*It is a car that provides great comfort and safety to its occupants.',1,4,1),(6,'Chevrolet Corvette','The Corvette offers a mind-bending package of quickness, handling and even comfort on the road.This sport car is one of the more comfortable cars in its class.*Impressive power and acceleration.*High handling limits don\'t take heroic skill to reach.*The Corvette is bonkers fast, it handles beautifully, and it still manages traffic and daily errands.',2,2,3),(7,'Toyota RAV4','The RAV4  is the plug-in hybrid version of Toyota\'s popular compact crossover SUV. It gets up to speed much better than its standard or hybrid siblings.*The driver\'s seat has enough adjustments to allow you to easily find a comfortable seating position.*This SUV is also quick to accelerate to highway speeds and gets strong scores in regard to comfort, interior quality and technology.',3,1,2),(8,'Aston Martin db11','The DB11 is a powerful and fast sports car that will give you an excellent driving experience. Offering luxury and great performance.*Supple ride befitting a grand-touring car.*Excellent long-distance comfort.',4,3,3),(9,'VolksWagen Polo','The Polo is a comfortable, economical and versatile hatchback perfect for moving around the city.*It is a car that provides great comfort and safety to its occupants.',1,3,1),(10,'Porsche 911','The Porsche 911 expertly fills the middle ground between touring and scintillating performance. The interior will likely divide opinion, but Porsche\'s push for modernity has been largely successful.*Powerful yet surprisingly economical engines.*Impeccable handling inspires driver confidence*Premium interior and wide range of customization potential.',2,1,3),(11,'Porsche Cayenne','The Porsche Cayenne is impressive on many levels. It\'s among the most fun-to-drive models in its class and backs it up with an impressive interior.*Porsche\'s secret sauce for combining athletic and confident handling with a firm and cushy luxury ride quality is on full display in the Cayenne. The ride quality is firm but comfortable — a Porsche hallmark.*Impressive handling for a crossover SUV.*Wide selection of powerful engines.*Exquisite interior and build quality.',3,4,2),(12,'BMW M3','The BMW M3 is the long-running and very popular performance variant of the 3 Series sedan.*Explosive acceleration.*Athletic handling, with lots of available driver-set adjustments.*Respectably sized back seat and trunk.',4,2,3),(13,'Renault Sandero','The Renault Sandero is a versatile family sedan perfect for getting around town.*In a car with enough space to travel comfortably.',1,7,1),(14,'BMW Z4','This Z4 is spacious and quiet, especially for a convertible. The Z4\'s interior is surprisingly roomy for a car this small, a boon for taller drivers looking for an occasional open-air experience.*Classic roadster experience with modern conveniences.*Larger-than-expected cargo space.',2,6,3),(15,'BMW X6','BMW X6 is a powerful and elegant SUV perfect for moving around the city.*Strong engine performance.*Smooth ride.*Impeccable interior.*Cutting-edge tech and displays.',3,2,2),(16,'Mercedes-Benz C-Class ','The Mercedes-Benz C-Class feels smooth and balanced on the road, with a seamless powertrain that goes about its business without much fuss. The C-Class nails the most important aspect of a luxury car: quiet refinement.*Exquisite cabin with excellent design and comfort features.*Driver assistance technology works great.',4,1,3),(17,'Mazda 3','The Mazda 3 is a versatile family sedan perfect for getting around town. It\'s a car known for its sporty handling and stylish exterior.The 3\'s interior is a generally pleasant place to occupy, with comfortable and supportive front seats that allow for all-day driving.*Mazda vehicles tend to have pleasing driving dynamics.*Sharp handling makes it fun to drive.',1,5,1),(19,'BMW','BMW M6',4,2,3),(23,'Ford','simple vehicle',1,2,1);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Standard','500 cars','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Categoy_images/standard.png'),(2,'Sport','100 cars','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Categoy_images/sport.png'),(3,'SUV','200 cars','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Categoy_images/suv.jpg'),(4,'Premium','150 cars','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Categoy_images/premium.png');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Bogota','Cundinamarca'),(2,'Medellin','Antioquia'),(3,'Cali','Valle del Cauca'),(4,'Cartagena','Bolivar'),(5,'Barranquilla','Atlantico'),(6,'Bucaramanga','Santander'),(7,'Pereira','Risaralda'),(8,'Cucuta','Norte de Santander');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK70dfjxvqnmgixqht3vea50voj` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1),(2),(3);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'Passengers:2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/passenger.png',NULL),(2,'Passengers:4','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/passenger.png',NULL),(3,'Passengers:5','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/passenger.png',NULL),(4,'Passengers:7','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/passenger.png',NULL),(5,'Doors:2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/puerta-del-auto.png',NULL),(6,'Doors:4','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/puerta-del-auto.png',NULL),(7,'Doors:5','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/puerta-del-auto.png',NULL),(8,'Transmission:Manual','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/transmision-manual.png',NULL),(9,'Transmission:Automatic','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/transmision-automatica.png',NULL),(10,'Fuel Type:Gas','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/gas.png',NULL),(11,'Fuel Type:Hybrid','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/gas.png',NULL),(12,'Air Bags:2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/air.png',NULL),(13,'Air Bags:4','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/air.png',NULL),(14,'Air Bags:8','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/air.png',NULL),(15,'A/C:Yes','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/air-conditioner.png',NULL),(16,'A/C:No','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/air-conditioner.png',NULL),(17,'Navegation System:Yes','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/map.png',NULL),(18,'Navegation System:No','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/map.png',NULL),(19,'Android/Apple Car:Yes','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/multimedia.png',NULL),(20,'Android/Apple Car:No','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/multimedia2.png',NULL),(21,'Leather seats:Yes','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/asientos.png',NULL),(22,'Leather seats:No','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/asientos.png',NULL),(23,'Camera Parking:Yes','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/alarma-de-carro.png',NULL),(24,'Camera Parking:No','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/alarma-de-carro.png',NULL),(25,'Bags:1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/travel-bag.png',NULL),(26,'Bags:2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/travel-bag.png',NULL),(27,'Bags:4','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Icons/travel-bag.png',NULL);
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `url` varchar(500) NOT NULL,
  `cars_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_cars1` (`cars_id`),
  CONSTRAINT `fk_images_cars1` FOREIGN KEY (`cars_id`) REFERENCES `cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_1.jpg',1),(2,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_2.jpg',1),(3,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_3.jpg',1),(4,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_4.jpg',1),(5,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_5.jpg',1),(6,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/ChevroletJoy_6.jpg',1),(7,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordMustang1.jpg',2),(8,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordmustang2.jpg',2),(9,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordmustang3.jpg',2),(10,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordmustang4.jpg',2),(11,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordmustang5.jpg',2),(12,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/fordmustang6.jpg',2),(13,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_1.jpg',3),(14,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_2.jpg',3),(15,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_3.jpg',3),(16,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_4.jpg',3),(17,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_5.jpg',3),(18,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/SuzukiVitara_6.jpg',3),(19,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_1.jpg',4),(20,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_2.jpg',4),(21,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_3.jpg',4),(22,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_4.jpg',4),(23,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_5.jpg',4),(24,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/audiA6_6.jpg',4),(25,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_1.jpg',5),(26,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_2.jpg',5),(27,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_3.jpg',5),(28,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_4.jpg',5),(29,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_5.jpg',5),(30,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/kiaPicanto_6.jpg',5),(31,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette1.jpg',6),(32,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette2.jpg',6),(33,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette3.jpg',6),(34,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette4.jpg',6),(35,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette5.jpg',6),(36,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/corvette6.jpg',6),(37,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_1.jpg',7),(38,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_2.jpg',7),(39,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_3.jpg',7),(40,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_4.jpg',7),(41,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_5.jpg',7),(42,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/toyotaRAV4_6.jpg',7),(43,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin1.jpg',8),(44,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin2.jpg',8),(45,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin3.jpg',8),(46,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin4.jpg',8),(47,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin5jpg.jpg',8),(48,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/astonMartin6.jpg',8),(49,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_1.jpg',9),(50,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_2.jpg',9),(51,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_3.jpg',9),(52,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_4.jpg',9),(53,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_5.jpg',9),(54,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Volkswagen_6.jpg',9),(55,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_1.jpg',10),(56,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_2.jpg',10),(57,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_3.jpg',10),(58,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_4.jpg',10),(59,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_5.jpg',10),(60,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/Porsche_6.jpg',10),(61,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene1.jpg',11),(62,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene2.jpg',11),(63,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene3.jpg',11),(64,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene4.jpg',11),(65,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene5.jpg',11),(66,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/porscheCayene6.jpg',11),(67,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_1.jpg',12),(68,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_2.jpg',12),(69,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_3.jpg',12),(70,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_4.jpg',12),(71,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_5.jpg',12),(72,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwM3_6.jpg',12),(73,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_1.jpg',13),(74,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_2.jpg',13),(75,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_3.jpg',13),(76,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_4.jpg',13),(77,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_5.jpg',13),(78,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/renaultSandero_6.jpg',13),(79,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_1.jpg',14),(80,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_2.jpg',14),(81,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_3.jpg',14),(82,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_4.jpg',14),(83,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_5.jpg',14),(84,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwz4_6.jpg',14),(85,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_1.jpg',15),(86,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_2.jpg',15),(87,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_3.jpg',15),(88,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_4.jpg',15),(89,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_5.jpg',15),(90,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/bmwX6_6.jpg',15),(91,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class1.jpg',16),(92,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class2.jpg',16),(93,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class3.jpg',16),(94,'side','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class4.jpg',16),(95,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class5.jpg',16),(96,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mercedes-BenzC-Class6.jpg',16),(97,'principal','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_1.jpg',17),(98,'front','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_2.jpg',17),(99,'back','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_3.jpg',17),(100,'sde','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_4.jpg',17),(101,'inside_1','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_5.jpg',17),(102,'inside_2','https://images-grupo4-easycar.s3.us-east-2.amazonaws.com/Cars_Images/mazda6_6.jpg',17),(110,'Front','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEsMykS76LIlYNQ7V9aLuVn9enR1Sacswiw&usqp=CAU',23);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rent_policies`
--

DROP TABLE IF EXISTS `rent_policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rent_policies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cancellation_politics` varchar(255) DEFAULT NULL,
  `car_insurance` varchar(255) DEFAULT NULL,
  `contract_agreement` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rent_policies`
--

LOCK TABLES `rent_policies` WRITE;
/*!40000 ALTER TABLE `rent_policies` DISABLE KEYS */;
INSERT INTO `rent_policies` VALUES (1,'Free cancellation up to 48 hours before pick-up','Theft Protection with $500 excess*Collision Damage Waiver with $500 deductible*No Smoking','Unlimited mileage*Fuel info: full to full*Pay at pick-up*Parking and traffic violations are the responsibility of the operator.'),(2,'Free cancellation up to 48 hours before pick-up','Theft Protection with $1000 excess*Collision Damage Waiver with $1000 deductible*No Smoking','Unlimited mileage*Fuel info: full to full*Pay at pick-up*Parking and traffic violations are the responsibility of the operator.'),(3,'Free cancellation up to 48 hours before pick-up','Theft Protection with $2000 excess*Collision Damage Waiver with $2000 deductible*No Smoking','Unlimited mileage*Fuel info: full to full*Pay at pick-up*Parking and traffic violations are the responsibility of the operator.');
/*!40000 ALTER TABLE `rent_policies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL DEFAULT '2',
  `name` varchar(20) DEFAULT 'Client',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Client');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `roles_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jhonatan','Escobar','test77@gmail.com','$2a$12$SViE3JS.n0x3trqKWflcXuJyP8tb2Nv5VXS6346d2HUYSXYZrCogi','',1),(2,'Johan','Sepulveda','jsepulv28@hotmail.com','$2a$12$tC9ajaFlTFckmkGtJ0ZjJuz2B5y4TjKxEBpwl8FzfvsNS/uJq8ZAa','',1),(3,'Johan','Sepulveda','prueba@gmail.com','$2a$12$XR1hbUnPsQYldKjt3oqEBOBrYAdODoeHrYoQEdJyAHngSIVq9vPSy','Medellín',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-09 23:06:23
