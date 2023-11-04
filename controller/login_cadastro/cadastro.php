<?php

include_once("../../module/conexao.php");

// Processamento do formulário de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $nickname = $_POST["nickname"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $passwordC = $_POST["passwordC"];

    // Verificar se o nickname já existe no banco de dados
    $checkNicknameQuery = "SELECT id FROM usuarios WHERE nickname = '$nickname'";
    $result = $conexao->query($checkNicknameQuery);

    if ($result->num_rows > 0) {
        echo "Este Nome de Usuário já existe.";
    } else {
        // Validação e inserção no banco de dados
        if ($password !== $passwordC) {
            echo "As senhas não coincidem. Tente novamente.";
        } else {
            $sql = "INSERT INTO usuarios (name, lastname, nickname, email, password, passwordC) VALUES ('$name', '$lastname', '$nickname', '$email', '$password', '$passwordC')";
            if ($conexao->query($sql) === TRUE) {
                $sql2 = "SELECT id FROM usuarios WHERE nickname='$nickname'";
                $result = $conexao->query($sql2);
                while ($row = $result->fetch_assoc()) {
                    $id = $row["id"];
                }
                $sql3 = "INSERT INTO scores (usuario_id, scoreFacil, scoreMedio, scoreDificil, rating) VALUES ($id, 0, 0, 0, 0)";
                if ($conexao->query($sql3) === TRUE) {
                    // Redireciona para a página "chooseGame.html" após o registro bem-sucedido
                    header("Location: ../../vewer/chooseGame.php?usuario_id=".$id);
                    exit();
                }else {
                    echo "Erro ao inserir no banco de dados. Tente novamente.";
                }
            } else {
                echo "Erro ao inserir no banco de dados. Tente novamente.";
            }
        }
    }
}

$conexao->close();
