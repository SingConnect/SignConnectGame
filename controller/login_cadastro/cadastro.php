<?php

include_once("../../module/conexao.php");

$c = new Conexao();

// Processamento do formulário de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $nickname = $_POST["nickname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $passwordC = $_POST["passwordC"];

    // Verificar se o nickname já existe no banco de dados
    $result = $c->nicknameVerify($nickname);

    if ($result->num_rows > 0) {
        echo "Este Nome de Usuário já existe.";
    } else {
        // Validação e inserção no banco de dados
        if ($password !== $passwordC) {
            echo "As senhas não coincidem. Tente novamente.";
        } else {
            $c->setAllData($name, $lastname, $nickname, $email, $password, $passwordC);
        }
    }
}

$conexao->close();
