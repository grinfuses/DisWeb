<?php

$username = "";
$password = "";
session_start();
$link = mysqli_connect('127.0.0.1:3307', $username, $password);
$database = mysqli_select_db($link, 'test_bd');

$user = $_POST['username'];
$pass = $_POST['password'];

session_write_close();
?>