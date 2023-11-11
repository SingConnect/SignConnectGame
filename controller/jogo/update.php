<?php
include_once("../../module/conexao.php");

$c = new Conexao();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dificuldade = $_POST["dificuldade"];
    $score = $_POST["ponto"];
    $id = $_POST["user"];
    $rating = $_POST["rating"];

    $c->updateScoresAndRatingByIdAndDificuldade($id, $score, $rating, $dificuldade);
}

// Fechando a conexão com o banco de dados
$conexao->close();