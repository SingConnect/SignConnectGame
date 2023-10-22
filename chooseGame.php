<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SignConnect Game</title>
</head>

<body onload="loadModel()">

    <?php
    include_once("conexao.php");

    if ($conexao->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conexao->connect_error);
    }

    $id = 0;
    $name = "";
    $lastname = "";
    $nickname = "";
    $scorefacil = 0;
    $scoremedio = 0;
    $scoredificil = 0;

    // pega dados da tabela usuarios
    if (isset($_GET["usernameOrEmail"])) {
        $nicknameOrEmail = $_GET["usernameOrEmail"];
        $sql = "SELECT id, name, lastname, nickname FROM usuarios WHERE (nickname='$nicknameOrEmail' OR email='$nicknameOrEmail')";
        $result = $conexao->query($sql);
    } else if (isset($_GET["nickname"])) {
        $nickname = $_GET["nickname"];
        $sql = "SELECT id, name, lastname, nickname FROM usuarios WHERE nickname='$nickname'";
        $result = $conexao->query($sql);
    }
    while ($row = $result->fetch_assoc()) {
        $id = $row["id"];
        $name = $row["name"];
        $lastname = $row["lastname"];
        $nickname = $row["nickname"];
    }

    // pega dados da tabela sores
    if (isset($_GET["nicknameOrEmail"])) {
        $nicknameOrEmail = $_GET["nicknameOrEmail"];
        $sql2 = "SELECT scoreFacil, scoreMedio, scoreDificil FROM scores WHERE (nickname='$nicknameOrEmail' OR email='$nicknameOrEmail')";
        $result = $conexao->query($sql2);
    } else if (isset($_GET["nickname"])) {
        $nickname = $_GET["nickname"];
        $sql2 = "SELECT scoreFacil, scoreMedio, scoreDificil FROM scores WHERE nickname='$nickname'";
        $result = $conexao->query($sql2);
    }
    while ($row = $result->fetch_assoc()) {
        $scorefacil = $row["scoreFacil"];
        $scoremedio = $row["scoreMedio"];
        $scoredificil = $row["scoreDificil"];
    }

    $conexao->close();
    ?>
    <script>
        var name = <? php echo '"'.$name. '"' ?>,
            lastname = <? php echo '"'.$lastname. '"' ?>,
                $nickname = <? php echo '"'.$nickname. '"' ?>,
                    $scorefacil = <? php echo $scorefacil ?>,
                        $scoremedio = <? php echo $scoremedio ?>,
                            $scoredificil = <? php echo $scoredificil ?>;
    </script>


    <div id="infoUser">
        <div class="buttonXInfo">
            <button id="btnXInfo"></button>
        </div>

        <img src="img/icon_user.png" alt="">

        <div id="useDiv">
            <p id="nicklabel">
                <?php echo $nickname ?>
            </p>
            <p id="namelabel">
                <?php echo $name . " " . $lastname ?>
            </p><br>
            <p id="facillabel">Score (facil):
                <?php echo $scorefacil ?>
            </p>
            <p id="mediolabel">Score (medio):
                <?php echo $scoremedio ?>
            </p>
            <p id="dificillabel">Score (dificil):
                <?php echo $scoredificil ?>
            </p>
        </div>

    </div>

    <div id="containerRankin">
        <div class="buttonXRank">
            <button id="btnXRank"></button>
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
                    <a href="logout.php"><button id="logoutbtnD"></button></a>
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

                <form id="tela" action="update.php" method="post">

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
                    <input type="text" name="dificuldade" id="dificuldade">
                    <input type="submit" id="bt_voltar" value="Voltar">
                </form>

            </div>



        </div>



    </div>








    <link rel="stylesheet" type="text/css" href="styleChooseGame.css">
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
    <script
        src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
    <script src="palavras.js"></script>
    <script src="game.js"></script>
    <script src="style_action.js"></script>
</body>

</html>