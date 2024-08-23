<?php
session_start();

//Database credentials
define("DB_HOST", "localhost");
define("DB_NAME", "vania");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "root");
try {
    $db = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USERNAME, DB_PASSWORD);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
} catch (PDOException $e) {
    die("Impossible de se connecter à la base de donnée " .$e->getMessage());
}