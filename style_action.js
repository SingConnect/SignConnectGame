var game = document.getElementById('game');
var choose_game = document.getElementById('choose_game');
var navbar = document.getElementById('navbar');
var btnHome = document.getElementById('btnHome');
var btnSeta = document.getElementById('btnSeta');
var game_play = document.getElementById('game_play');
var dropbtn = document.getElementById('dropbtn');
var dropbtnX = document.getElementById('dropbtnX');
var dropdown_content = document.getElementById('dropdown_content');
var userbtnD = document.getElementById("userbtnD");
var useDiv = document.getElementById("useDiv");
var rankingbtnD = document.getElementById("rankingbtnD");
var logoutbtnD = document.getElementById("logoutbtnD");
useDiv.style.display = 'none';

dropbtn.addEventListener('click', function () {
    dropbtn.style.display = 'none';
    dropbtnX.style.display = 'block';
    dropdown_content.style.display = 'block';
});

dropbtnX.addEventListener('click', function () {
    dropbtn.style.display = 'block';
    dropbtnX.style.display = 'none';
    dropdown_content.style.display = 'none';
});

userbtnD.addEventListener('click', function () {
    if (useDiv.style.display === 'none') {
        useDiv.style.display = 'block';
        rankingbtnD.style.display = 'none';
        logoutbtnD.style.display = 'none';
    } else if (useDiv.style.display === 'block') {
        useDiv.style.display = 'none';
        rankingbtnD.style.display = 'block';
        logoutbtnD.style.display = 'block';
    }
});

/* evento de clique ao botão seta / a div com os seguinte id home choose_game, esta recebendo
novos estilos */

btnSeta.addEventListener('click', function () {

    /*------------CHOOSE GAME------------*/
    choose_game.style.display = 'block';
    btnSeta.style.display = "none";
    game_play.style.display = 'none';

    /*os estilos display: flex; , align-items: center; , 
    flex-direction: column; estão sendo colocados no arquivo js, 
    pos ao serem colocados no arquivo css apresentaram erro e não são 
    executados como deveriam */

    /*-------parar jogo--------*/
    try {
        finalize();
    } catch (error) {
        console.log(error);
    }
});


/* evento de clique ao botão home / as divs com os seguintes ids home, game e choose_game estão recebendo
novos estilos */
btnHome.addEventListener('click', function () {
    /* os estilos display: flex; , align-items: center; , 
    flex-direction: column; estão sendo colocados no arquivo js, 
    pos ao serem colocados no arquivo css apresentaram erro e não são 
    executados como deveriam */

    /*-------parar jogo--------*/
    try {
        finalize();
    } catch (error) {
        console.log(error);
    }
    window.location.replace("index.html");
});