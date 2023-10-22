<?php

include_once("conexao.php");

// Verifica se a conexão foi estabelecida com sucesso
if ($conexao->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conexao->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $usernameOrEmail = $_POST["nicknameOrEmail"];
    $password = $_POST["password"];

    // Consulta o banco de dados para verificar o login
    $sql = "SELECT * FROM usuarios WHERE (nickname = ? OR email = ?) AND password = ?";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("sss", $usernameOrEmail, $usernameOrEmail, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // O login foi bem-sucedido
        // Redirecionar o usuário para chooseGame.html
        header("Location: chooseGame.php?usernameOrEmail=".$usernameOrEmail);
        exit; // Certifique-se de sair do script após o redirecionamento.
    } else {
        // Login falhou
        echo "Nome de usuário ou senha incorretos.";
    }
}

// Fechando a conexão com o banco de dados
$conexao->close();