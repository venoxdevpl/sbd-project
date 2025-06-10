-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 23.88.65.9:3306
-- Generation Time: Cze 10, 2025 at 04:01 PM
-- Wersja serwera: 11.4.5-MariaDB-deb12
-- Wersja PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `db_111063`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `allergens`
--

DROP TABLE IF EXISTS `allergens`;
CREATE TABLE `allergens` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `allergens`
--
DROP TRIGGER IF EXISTS `ALLERGENS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `ALLERGENS_insert_ts` BEFORE INSERT ON `allergens` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `ALLERGENS_update_ts`;
DELIMITER $$
CREATE TRIGGER `ALLERGENS_update_ts` BEFORE UPDATE ON `allergens` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `categories`
--
DROP TRIGGER IF EXISTS `CATEGORIES_insert_ts`;
DELIMITER $$
CREATE TRIGGER `CATEGORIES_insert_ts` BEFORE INSERT ON `categories` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
	SET NEW.created_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `CATEGORIES_update_ts`;
DELIMITER $$
CREATE TRIGGER `CATEGORIES_update_ts` BEFORE UPDATE ON `categories` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `address` varchar(256) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `companies`
--
DROP TRIGGER IF EXISTS `COMPANIES_insert_ts`;
DELIMITER $$
CREATE TRIGGER `COMPANIES_insert_ts` BEFORE INSERT ON `companies` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
	SET NEW.created_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `COMPANIES_update_ts`;
DELIMITER $$
CREATE TRIGGER `COMPANIES_update_ts` BEFORE UPDATE ON `companies` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `companies_users`
--

DROP TABLE IF EXISTS `companies_users`;
CREATE TABLE `companies_users` (
  `usersId` int(11) NOT NULL,
  `companiesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `meals`
--

DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `meals`
--
DROP TRIGGER IF EXISTS `MEALS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `MEALS_insert_ts` BEFORE INSERT ON `meals` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `MEALS_update_ts`;
DELIMITER $$
CREATE TRIGGER `MEALS_update_ts` BEFORE UPDATE ON `meals` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `meals_allergens`
--

DROP TABLE IF EXISTS `meals_allergens`;
CREATE TABLE `meals_allergens` (
  `mealsId` int(11) NOT NULL,
  `allergensId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `companyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `orders`
--
DROP TRIGGER IF EXISTS `ORDERS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `ORDERS_insert_ts` BEFORE INSERT ON `orders` FOR EACH ROW BEGIN
    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `ORDERS_update_ts`;
DELIMITER $$
CREATE TRIGGER `ORDERS_update_ts` BEFORE UPDATE ON `orders` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders_contents`
--

DROP TABLE IF EXISTS `orders_contents`;
CREATE TABLE `orders_contents` (
  `id` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `mealId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `key` varchar(32) NOT NULL,
  `description` varchar(256) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `permissions`
--
DROP TRIGGER IF EXISTS `PERMISSIONS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `PERMISSIONS_insert_ts` BEFORE INSERT ON `permissions` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `PERMISSIONS_update_ts`;
DELIMITER $$
CREATE TRIGGER `PERMISSIONS_update_ts` BEFORE INSERT ON `permissions` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `roles`
--
DROP TRIGGER IF EXISTS `ROLES_insert_ts`;
DELIMITER $$
CREATE TRIGGER `ROLES_insert_ts` BEFORE INSERT ON `roles` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `ROLES_update_ts`;
DELIMITER $$
CREATE TRIGGER `ROLES_update_ts` BEFORE UPDATE ON `roles` FOR EACH ROW BEGIN
	SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `roles_permissions`
--

DROP TABLE IF EXISTS `roles_permissions`;
CREATE TABLE `roles_permissions` (
  `rolesId` int(11) NOT NULL,
  `permissionsId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(36) NOT NULL,
  `lastActivity` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `access_token` varchar(512) NOT NULL,
  `refresh_token` varchar(512) NOT NULL,
  `invalided` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `sessions`
--
DROP TRIGGER IF EXISTS `SESSIONS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `SESSIONS_insert_ts` BEFORE INSERT ON `sessions` FOR EACH ROW BEGIN
    SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `SESSIONS_update_ts`;
DELIMITER $$
CREATE TRIGGER `SESSIONS_update_ts` BEFORE UPDATE ON `sessions` FOR EACH ROW BEGIN
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Wyzwalacze `users`
--
DROP TRIGGER IF EXISTS `USERS_insert_ts`;
DELIMITER $$
CREATE TRIGGER `USERS_insert_ts` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
	SET NEW.created_at = NOW();
    SET NEW.updated_at = NOW();
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `USERS_update_ts`;
DELIMITER $$
CREATE TRIGGER `USERS_update_ts` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
	SET NEW.updated_at = NOW();
END
$$
DELIMITER ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `allergens`
--
ALTER TABLE `allergens`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `companies_users`
--
ALTER TABLE `companies_users`
  ADD PRIMARY KEY (`usersId`,`companiesId`),
  ADD KEY `IDX_27f57cf3e8c869fadd4dd25e98` (`usersId`),
  ADD KEY `IDX_0dccb27846f465f953da45116d` (`companiesId`);

--
-- Indeksy dla tabeli `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_54cdfce448e02c20ee5dcfca61b` (`categoryId`);

--
-- Indeksy dla tabeli `meals_allergens`
--
ALTER TABLE `meals_allergens`
  ADD PRIMARY KEY (`mealsId`,`allergensId`),
  ADD KEY `IDX_57e8f349906725095d7e59d422` (`mealsId`),
  ADD KEY `IDX_35cc59512b7820a36ce91245d4` (`allergensId`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_151b79a83ba240b0cb31b2302d1` (`userId`),
  ADD KEY `FK_b6fe899d5ca4a3f5925463990d1` (`companyId`);

--
-- Indeksy dla tabeli `orders_contents`
--
ALTER TABLE `orders_contents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_385b67c889d3b40da084a479b81` (`orderId`),
  ADD KEY `FK_89cf51f45d831bd047e320fe342` (`mealId`);

--
-- Indeksy dla tabeli `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`rolesId`,`permissionsId`),
  ADD KEY `IDX_bf98d8fd47610db71dfc5a4a5f` (`rolesId`),
  ADD KEY `IDX_f25fd350775094ceb3a02c1468` (`permissionsId`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_57de40bc620f456c7311aa3a1e6` (`userId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_a2cecd1a3531c0b041e29ba46e` (`role_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `allergens`
--
ALTER TABLE `allergens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `orders_contents`
--
ALTER TABLE `orders_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `companies_users`
--
ALTER TABLE `companies_users`
  ADD CONSTRAINT `FK_0dccb27846f465f953da45116d9` FOREIGN KEY (`companiesId`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_27f57cf3e8c869fadd4dd25e984` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `meals`
--
ALTER TABLE `meals`
  ADD CONSTRAINT `FK_54cdfce448e02c20ee5dcfca61b` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `meals_allergens`
--
ALTER TABLE `meals_allergens`
  ADD CONSTRAINT `FK_35cc59512b7820a36ce91245d42` FOREIGN KEY (`allergensId`) REFERENCES `allergens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_57e8f349906725095d7e59d422a` FOREIGN KEY (`mealsId`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_151b79a83ba240b0cb31b2302d1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b6fe899d5ca4a3f5925463990d1` FOREIGN KEY (`companyId`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `orders_contents`
--
ALTER TABLE `orders_contents`
  ADD CONSTRAINT `FK_385b67c889d3b40da084a479b81` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_89cf51f45d831bd047e320fe342` FOREIGN KEY (`mealId`) REFERENCES `meals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD CONSTRAINT `FK_bf98d8fd47610db71dfc5a4a5ff` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_f25fd350775094ceb3a02c14681` FOREIGN KEY (`permissionsId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FK_57de40bc620f456c7311aa3a1e6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
