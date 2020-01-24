<?php
define('DB_SERVER', '');
define('DB_USERNAME', '');
define('DB_PASSWORD', '');
define('DB_NAME', 'unir');
 
/* Attempt to connect to MySQL database */
$link = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
// Initialize the session
session_start();
 
$username = $_POST['username'];
$pass = $_POST['password'];

$query = "SELECT * FROM users WHERE username = '$username' AND password = MD5('$pass')";
$result = mysqli_query($link, $query);
if (mysqli_num_rows($result) == 1) {
            header('Location: dashboard.php');
            exit();

} else {
    echo "Fail"; 
}
session_destroy();
?>