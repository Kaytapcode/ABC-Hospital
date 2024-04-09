<?php
    if(!isset($_POST["submit"])) {
        header("Location: ../login.html");
    }

    $email = $_POST["inputEmail1"];
    $pass = $_POST["inputPassword1"];

    echo $email . "<br>" . $pass;
?>