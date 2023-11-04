<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SignConnect Game</title>
</head>

<body onload="loadModel()">

    <?php
    include_once("../module/conexao.php");

    $id = 0;
    $name = "";
    $lastname = "";
    $nickname = "";
    $scorefacil = 0;
    $scoremedio = 0;
    $scoredificil = 0;
    $rating = 0;

    // pega dados da tabela usuarios
    if (isset($_GET["usuario_id"])) {
        $id = $_GET["usuario_id"];
        $sql = "SELECT name, lastname, nickname FROM usuarios WHERE id=$id";
        $result = $conexao->query($sql);
    }
    while ($row = $result->fetch_assoc()) {
        $name = $row["name"];
        $lastname = $row["lastname"];
        $nickname = $row["nickname"];
    }

    // pega dados da tabela sores
    if (isset($_GET["usuario_id"])) {
        $id = $_GET["usuario_id"];
        $sql2 = "SELECT * FROM scores WHERE usuario_id=$id";
        $result = $conexao->query($sql2);
    }
    while ($row = $result->fetch_assoc()) {
        $scorefacil = $row["scoreFacil"];
        $scoremedio = $row["scoreMedio"];
        $scoredificil = $row["scoreDificil"];
        $rating = $row["rating"];
    }

    // pegar dados de todos os usuarios e adicionar en um array
    $sql = "SELECT * FROM usuarios";
    $result = $conexao->query($sql);

    $rank = [];

    while ($row = $result->fetch_assoc()) {
        $rank[$row['id']] = ['nickname' => $row['nickname']];
    }

    foreach (array_keys($rank) as $i) {
        $sql = "SELECT * FROM scores WHERE usuario_id=$i";
        $result = $conexao->query($sql);
        while ($row = $result->fetch_assoc()) {
            $rank[$i]['scoreFacil'] = $row['scoreFacil'];
            $rank[$i]['scoreMedio'] = $row['scoreMedio'];
            $rank[$i]['scoreDificil'] = $row['scoreDificil'];
            $rank[$i]['rating'] = $row['rating'];
        }
    }

    $conexao->close();

    // criando uma lista ordenada dos ratings
    $ratingSort = [];
    foreach (array_keys($rank) as $iii) {
        array_push($ratingSort, $rank[$iii]['rating']);
    }
    rsort($ratingSort);

    $rankSort = [];
    foreach ($ratingSort as $r) {
        foreach (array_keys($rank) as $iv) {
            if ($rank[$iv]['rating'] === $r) {
                $rankSort[$rank[$iv]['nickname'] . "#" . $iv] = $r;
            }
        }
    }
    ?>
    <script>
        var name = <?php echo '"' . $name . '"' ?>,
            lastname = <?php echo '"' . $lastname . '"' ?>,
            nickname = <?php echo '"' . $nickname . '"' ?>,
            scorefacil = <?php echo $scorefacil ?>,
            scoremedio = <?php echo $scoremedio ?>,
            scoredificil = <?php echo $scoredificil ?>,
            rating = <?php echo $rating ?>;
    </script>


    <div id="infoUser">
        <div class="buttonXInfo">
            <button id="btnXInfo"></button>
        </div>

        <img src="img/icon_user.png">

        <div id="useDiv">
            <table id="userTabela">
                <tr>
                    <td>
                        <p id="nicklabel">
                            <?php echo $nickname ?>
                        </p>
                        <p id="namelabel">
                            <?php echo $name . " " . $lastname ?>
                        </p>
                    </td>
                    <td>
                        <p id="pRating">Rating:
                            <?php echo $rating ?>
                        </p>
                    </td>
                </tr>
            </table><br>

            <dl>
                <dt>
                    <p id="tituloScore">Ultimo Score</p>
                </dt>
                <dd>
                    <p id="facillabel">Facil:
                        <?php echo $scorefacil ?>
                    </p>
                </dd>
                <dd>
                    <p id="mediolabel">Medio:
                        <?php echo $scoremedio ?>
                    </p>
                </dd>
                <dd>
                    <p id="dificillabel">Dificil:
                        <?php echo $scoredificil ?>
                    </p>
                </dd>
            </dl>
        </div>

    </div>

    <div id="containerRankin">
        <div class="buttonXRank">
            <button id="btnXRank"></button>
        </div>

        <div id="ranckDiv">
            <img src="img/ranking_l.png" alt="">
            <h1>Ranking</h1>
            <div class="table-container">
                <table id="rankTabela" border="1">
                    <tr>
                        <th>RATING</th>
                        <th>NICK NAME</th>
                    </tr>
                    <?php

                    foreach (array_keys($rankSort) as $index => $ii) {
                        echo "<tr>
                                <td id='tdscore'>" . $rankSort[$ii] . "</td>
                                <td id='tdnickname'>";

                        if ($index < 3) {
                            // Adicione imagens diferentes para as três primeiras linhas
                            if ($index === 0) {
                                echo "<img id='lugar_1' src='img/lugar_1.png' alt='Imagem 1'>";
                            } elseif ($index === 1) {
                                echo "<img id='lugar_2' src='img/lugar_2.png' alt='Imagem 2'>";
                            } else {
                                echo "<img id='lugar_3' src='img/lugar_3.png' alt='Imagem 3'>";
                            }
                        } else {
                            // Adicione a mesma imagem para as outras linhas
                            echo "<img id='lugar_0' src='img/lugar_0.png' alt='Imagem Padrão'>";
                        }

                        echo $ii . "</td></tr>";
                    }
                    ?>
                </table>
            </div>
        </div>
    </div>



    <div class="container">

        <nav id="navbar">
            <div class="buttonHome">
                <button id="btnHome"></button>
            </div>

            <div class="buttonSeta">
                <button id="btnSeta"></button>
            </div>

            <div class="buttonDropdown">
                <button id="dropbtn"></button>
                <button id="dropbtnX"></button>
                <div id="dropdown_content">
                    <button id="userbtnD"></button>
                    <button id="rankingbtnD"></button>
                    <a href="../controller/login_cadastro/logout.php"><button id="logoutbtnD"></button></a>
                </div>

            </div>

        </nav>



        <div id="game">

            <div id="preLoader"><img src="img/preLoader.gif"></div>

            <div id="choose_game">

                <label for="bntFacil"><img src="img/time_facil.png"></label>
                <input type="submit" id="bntFacil" onclick="btnFacil()">

                <label for="btnMedio"><img src="img/time_medio.png"></label>
                <input type="submit" id="btnMedio" onclick="btnMedio()">

                <label for="bntDificil"><img src="img/time_dificil.png"></label>
                <input type="submit" id="bntDificil" onclick="bntDificil()">

            </div>

            <div id="game_play">

                <div class="info">
                    <div id="label-container"></div>
                </div>

                <div class="preview" id="preview">
                    <div id="webcam-container"></div>

                </div>

                <form id="tela" action="../controller/jogo/update.php" method="post">

                    <table>
                        <tr>
                            <td><label id="time"></label></td>
                            <td><label id="score"></label></td>
                        </tr>
                        <tr>
                            <td colspan="2"><label id="letra"></label></td>
                        </tr>
                        <tr>
                            <td colspan="2"><label id="tela_fim"></label></td>
                        </tr>
                    </table>
                    <label id="tela_fim2"></label>
                    <input type="text" name="user" id="user" value=<?php echo '"' . $id . '"' ?>>
                    <input type="text" name="ponto" id="ponto">
                    <input type="text" name="rating" id="rating">
                    <input type="text" name="dificuldade" id="dificuldade">
                    <input type="submit" id="bt_voltar" value="Voltar">
                </form>

            </div>



        </div>
        <br><br>



    </div>








    <link rel="stylesheet" type="text/css" href="css/styleChooseGame.css">
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
    <script src="../controller/jogo/palavras.js"></script>
    <script src="../controller/jogo/game.js"></script>
    <script src="js/style_action.js"></script>
</body>

</html>