<?php

include_once("../../module/conexao.php");

$c = new Conexao();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $usernameOrEmail = $_POST["nicknameOrEmail"];
    $password = $_POST["password"];

    // Consulta o banco de dados para verificar o login
    $result = $c->getAllDataByNicknameOrEmailAndPassword($usernameOrEmail, $password);

    if ($result->num_rows == 1) {
        // O login foi bem-sucedido
        // Redirecionar o usuário para chooseGame.html
        $id = $c->getIdByNicknameOrEmailAndPassword($usernameOrEmail, $password);
        header("Location: ../../vewer/chooseGame.php?usuario_id=".$id);
        exit; // Certifique-se de sair do script após o redirecionamento.
    } else {
        // Login falhou
        echo "Nome de usuário ou senha incorretos.";
    }
}

// Fechando a conexão com o banco de dados
$conexao->close();
