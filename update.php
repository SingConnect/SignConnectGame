<?php
include_once("conexao.php");

// Verifica se a conexão foi estabelecida com sucesso
if ($conexao->connect_error) {
    die("Falha na conexão com o banco de dados: ".$conexao->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dificuldade = $_POST["dificuldade"];
    $score = $_POST["ponto"];
    $nickname = $_POST["user"];
    $sql = "";

    if ($dificuldade === 'f') $sql = "UPDATE usuarios SET scorefacil=".$score." WHERE nickname ='$nickname'";
    if ($dificuldade === 'm') $sql = "UPDATE usuarios SET scoremedio=".$score." WHERE nickname ='$nickname'";
    if ($dificuldade === 'd') $sql = "UPDATE usuarios SET scoredificil=".$score." WHERE nickname ='$nickname'";

    if ($conexao->query($sql) === TRUE) {
        // Redireciona para a página "chooseGame.php" após o registro bem-sucedido
        header("Location: chooseGame.php?nicknameOrEmail=".$nickname);
        exit();
    } else {
        echo "Erro ao inserir no banco de dados. Tente novamente.";
    }
}

// Fechando a conexão com o banco de dados
$conexao->close();