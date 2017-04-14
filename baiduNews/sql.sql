-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: 2017-03-22 17:32:11
-- 服务器版本： 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `baiduNews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `news_title` char(100) NOT NULL,
  `news_type` char(100) NOT NULL,
  `news_img` varchar(300) NOT NULL,
  `news_time` date NOT NULL,
  `news_src` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `news_title`, `news_type`, `news_img`, `news_time`, `news_src`) VALUES
(11, '杨洋', '推荐', './images/entertainment/1.jpeg', '2017-03-02', '微微一笑很倾城'),
(12, '白浅', '推荐', './images/internet/3.jpeg', '2017-03-04', '狐狸洞'),
(13, '墨渊', '推荐', './images/internet/2.jpeg', '2017-03-04', '昆仑虚'),
(15, '您好', '娱乐', './images/entertainment/2.jpeg', '2017-03-11', '您好'),
(16, '白真', '推荐', './images/internet/1.jpeg', '2017-03-11', '大家好'),
(32, '折颜上神', '娱乐', './images/recommend/4.jpeg', '2017-02-25', '十里桃源'),
(33, '墨渊上神', '推荐', './images/recommend/3.jpeg', '2017-03-20', '师傅'),
(40, '123', '推荐', './images/recommend/1.jpeg', '2017-03-10', '1234567'),
(43, 'hello world', '娱乐', './images/recommend/1.jpeg', '2017-03-03', 'hello world'),
(44, 'beauty life', '图片', './images/recommend/1.jpeg', '2017-03-02', 'life');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;