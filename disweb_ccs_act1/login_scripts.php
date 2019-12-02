<?php

$username = "";
$password = "";
session_start();
$link = mysqli_connect('127.0.0.1:3307', $username, $password);
$database = mysqli_select_db($link, 'test_bd');

$user = $_POST['user'];
$pass = $_POST['password'];


$query = "SELECT * FROM users WHERE username = '" . $user . "' AND password = '" . $password . "'";
$result = mysqli_query($link, $query);
if (mysqli_num_rows($result) == 1) {
    echo "pass"; //Pass, go to dashboard
} else {
    echo "fail"; //Fail
}


session_write_close();
?>