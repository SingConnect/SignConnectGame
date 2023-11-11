<?php
class Conexao {
    private $conexao;
    function __construct() {
        $this->conexao = new mysqli("localhost", "root", "", "sign_connect_game");
        if ($this->conexao->connect_error) {
            die("Erro na conexão com o banco de dados: " . $this->conexao->connect_error);
        }
    }
    // usado em login.php
    public function getAllDataByNicknameOrEmailAndPassword($usernameOrEmail, $password) {
        $sql = "SELECT * FROM usuarios WHERE (nickname = ? OR email = ?) AND password = ?";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bind_param("sss", $usernameOrEmail, $usernameOrEmail, $password);
        $stmt->execute();
        return $stmt->get_result();
    }
    public function getIdByNicknameOrEmailAndPassword($usernameOrEmail, $password) {
        $sql2 = "SELECT id FROM usuarios WHERE (nickname = '$usernameOrEmail' OR email = '$usernameOrEmail') AND password = '$password'";
        $result = $this->conexao->query($sql2);
        while ($row = $result->fetch_assoc()) {
            $id = $row["id"];
        }
        return $id;
    }
    // usado em cadastro.php
    public function setAllData($name, $lastname, $nickname, $email, $password, $passwordC) {
        $sql = "INSERT INTO usuarios (name, lastname, nickname, email, password, passwordC) VALUES ('$name', '$lastname', '$nickname', '$email', '$password', '$passwordC')";
        if ($this->conexao->query($sql) === TRUE) {
            $sql2 = "SELECT id FROM usuarios WHERE nickname='$nickname' AND password='$password' AND name='$name' AND lastname='$lastname' AND email='$email'";
            $result = $this->conexao->query($sql2);
            while ($row = $result->fetch_assoc()) {
                $id = $row["id"];
            }
            $sql3 = "INSERT INTO scores (usuario_id, scoreFacil, scoreMedio, scoreDificil, rating) VALUES ($id, 0, 0, 0, 0)";
            if ($this->conexao->query($sql3) === TRUE) {
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
    public function nicknameVerify($nickname) {
        $checkNicknameQuery = "SELECT id FROM usuarios WHERE nickname = '$nickname'";
        return $this->conexao->query($checkNicknameQuery);
    }
    // usado em update.php
    public function updateScoresAndRatingByIdAndDificuldade($id, $score, $rating, $dificuldade) {
        if ($dificuldade === 'f') $sql = "UPDATE scores SET scoreFacil=".$score.", rating=".$rating." WHERE usuario_id=$id;";
        if ($dificuldade === 'm') $sql = "UPDATE scores SET scoreMedio=".$score.", rating=".$rating." WHERE usuario_id=$id";
        if ($dificuldade === 'd') $sql = "UPDATE scores SET scoreDificil=".$score.", rating=".$rating." WHERE usuario_id=$id";

        if ($this->conexao->query($sql) === TRUE) {
            // Redireciona para a página "chooseGame.php" após o registro bem-sucedido
            header("Location: ../../vewer/chooseGame.php?usuario_id=$id");
            exit();
        } else {
            echo "Erro ao inserir no banco de dados. Tente novamente.";
        }
    }
    // usado em chooseGame.php
    public function getDataInTableUsersById($id) {
        $sql = "SELECT name, lastname, nickname FROM usuarios WHERE id=$id";
        $result = $this->conexao->query($sql);
        $res = [];
        while ($row = $result->fetch_assoc()) {
            array_push($res, $row["name"]);
            array_push($res, $row["lastname"]);
            array_push($res, $row["nickname"]);
        }
        return $res;
    }
    public function getDataInTableScoresById($id) {
        $sql = "SELECT * FROM scores WHERE usuario_id=$id";
        $result = $this->conexao->query($sql);
        $res = [];
        while ($row = $result->fetch_assoc()) {
            array_push($res, $row["scoreFacil"]);
            array_push($res, $row["scoreMedio"]);
            array_push($res, $row["scoreDificil"]);
            array_push($res, $row["rating"]);
        }
        return $res;
    }
    public function getAllUsesAsList() {
        $sql = "SELECT * FROM usuarios";
        $result = $this->conexao->query($sql);

        $rank = [];
        while ($row = $result->fetch_assoc()) {
            $rank[$row['id']] = ['nickname' => $row['nickname']];
        }

        foreach (array_keys($rank) as $i) {
            $sql = "SELECT * FROM scores WHERE usuario_id=$i";
            $result = $this->conexao->query($sql);
            while ($row = $result->fetch_assoc()) {
                $rank[$i]['scoreFacil'] = $row['scoreFacil'];
                $rank[$i]['scoreMedio'] = $row['scoreMedio'];
                $rank[$i]['scoreDificil'] = $row['scoreDificil'];
                $rank[$i]['rating'] = $row['rating'];
            }
        }
        return $rank;
    }
}