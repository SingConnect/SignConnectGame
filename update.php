<?php
include_once("conexao.php");

// Verifica se a conexão foi estabelecida com sucesso
if ($conexao->connect_error) {
    die("Falha na conexão com o banco de dados: ".$conexao->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dificuldade = $_POST["dificuldade"];
    $score = $_POST["ponto"];
    $id = $_POST["user"];
    $rating = $_POST["rating"];
    $sql = "";

    if ($dificuldade === 'f') $sql = "UPDATE scores SET scoreFacil=".$score.", rating=".$rating." WHERE usuario_id=$id;";
    if ($dificuldade === 'm') $sql = "UPDATE scores SET scoreMedio=".$score.", rating=".$rating." WHERE usuario_id=$id";
    if ($dificuldade === 'd') $sql = "UPDATE scores SET scoreDificil=".$score.", rating=".$rating." WHERE usuario_id=$id";

    if ($conexao->query($sql) === TRUE) {
        // Redireciona para a página "chooseGame.php" após o registro bem-sucedido
        header("Location: chooseGame.php?usuario_id=$id");
        exit();
    } else {
        echo "Erro ao inserir no banco de dados. Tente novamente.";
    }
}

// Fechando a conexão com o banco de dados
$conexao->close();