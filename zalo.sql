-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 15, 2022 lúc 11:21 AM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `zalo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`account`, `password`) VALUES
('a', '123'),
('b', '123'),
('c', '123'),
('d', '123'),
('e', '123'),
('h', '123'),
('huyihuy140@gmail.com', 'sada');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `boxchat`
--

CREATE TABLE `boxchat` (
  `idBox` int(11) NOT NULL,
  `type` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `boxchat`
--

INSERT INTO `boxchat` (`idBox`, `type`) VALUES
(3, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `havelistboxchat`
--

CREATE TABLE `havelistboxchat` (
  `idUser` int(30) NOT NULL,
  `idBox` int(11) NOT NULL,
  `Ngay` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `havelistboxchat`
--

INSERT INTO `havelistboxchat` (`idUser`, `idBox`, `Ngay`, `status`) VALUES
(1, 3, '2022-11-02 10:33:47', 0),
(2, 3, '2022-10-19 20:31:15', 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `havelistfriends`
--

CREATE TABLE `havelistfriends` (
  `idUser` int(11) NOT NULL,
  `idFriends` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `havelistfriends`
--

INSERT INTO `havelistfriends` (`idUser`, `idFriends`) VALUES
(2, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `listaddfriends`
--

CREATE TABLE `listaddfriends` (
  `idUser` int(30) NOT NULL,
  `idAddFriends` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messenge`
--

CREATE TABLE `messenge` (
  `idMess` int(11) NOT NULL,
  `idBox` int(11) NOT NULL,
  `content` varchar(100) COLLATE utf8_vietnamese_ci NOT NULL,
  `type` int(2) NOT NULL,
  `idUser` int(30) NOT NULL,
  `ngay` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `temporaryuser`
--

CREATE TABLE `temporaryuser` (
  `user` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `nameUser` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL,
  `birthday` date NOT NULL,
  `sex` int(1) NOT NULL,
  `validateCode` varchar(30) COLLATE utf8_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(30) NOT NULL,
  `account` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `nameUser` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `avatar` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `sex` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `account`, `nameUser`, `avatar`, `birthday`, `sex`) VALUES
(1, 'h', 'qwe', 'anh', '2001-01-12', 0),
(2, 'd', 'asd', 'anh', '2001-01-12', 0),
(3, 'a', 'tena', 'anh', '2001-01-12', 0),
(4, 'b', 'tenb', 'anh', '2001-01-12', 0),
(5, 'c', 'tenc', 'anh', '2001-01-12', 0),
(6, 'e', 'tene', 'anh', '2001-01-12', 0),
(7, 'huyihuy140@gmail.com', 'tét', 'anh', '2001-01-01', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `validateuser`
--

CREATE TABLE `validateuser` (
  `id` int(11) NOT NULL,
  `cookie` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `socket` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `status` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `validateuser`
--

INSERT INTO `validateuser` (`id`, `cookie`, `socket`, `status`) VALUES
(2, 'rp0QkGQzxgwu0Qc7xFRId3qy0QPNLk7J_g', '', 0),
(2, '0o_cScDXyqsNa-HOgzNy-cHosnFxoiO95g', '', 0),
(1, 'MhnBBOli1j2mnRZydy2oQy2Q5G2M7n3XlQ', '', 1),
(1, '53QcotolV797XWSR-NRHg2_9T5NogmYLsg', '', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account`);

--
-- Chỉ mục cho bảng `boxchat`
--
ALTER TABLE `boxchat`
  ADD PRIMARY KEY (`idBox`);

--
-- Chỉ mục cho bảng `havelistboxchat`
--
ALTER TABLE `havelistboxchat`
  ADD KEY `idBox` (`idBox`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `havelistfriends`
--
ALTER TABLE `havelistfriends`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idFriends` (`idFriends`);

--
-- Chỉ mục cho bảng `listaddfriends`
--
ALTER TABLE `listaddfriends`
  ADD KEY `idAddFriends` (`idAddFriends`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `messenge`
--
ALTER TABLE `messenge`
  ADD PRIMARY KEY (`idMess`),
  ADD KEY `idBox` (`idBox`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account` (`account`);

--
-- Chỉ mục cho bảng `validateuser`
--
ALTER TABLE `validateuser`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `boxchat`
--
ALTER TABLE `boxchat`
  MODIFY `idBox` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `messenge`
--
ALTER TABLE `messenge`
  MODIFY `idMess` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `havelistboxchat`
--
ALTER TABLE `havelistboxchat`
  ADD CONSTRAINT `havelistboxchat_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `boxchat` (`idBox`),
  ADD CONSTRAINT `havelistboxchat_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `havelistfriends`
--
ALTER TABLE `havelistfriends`
  ADD CONSTRAINT `havelistfriends_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `havelistfriends_ibfk_2` FOREIGN KEY (`idFriends`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `listaddfriends`
--
ALTER TABLE `listaddfriends`
  ADD CONSTRAINT `listaddfriends_ibfk_1` FOREIGN KEY (`idAddFriends`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `listaddfriends_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `messenge`
--
ALTER TABLE `messenge`
  ADD CONSTRAINT `messenge_ibfk_1` FOREIGN KEY (`idBox`) REFERENCES `boxchat` (`idBox`),
  ADD CONSTRAINT `messenge_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`account`) REFERENCES `account` (`account`);

--
-- Các ràng buộc cho bảng `validateuser`
--
ALTER TABLE `validateuser`
  ADD CONSTRAINT `validateuser_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
