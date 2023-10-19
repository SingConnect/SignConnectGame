

var home = document.getElementById('home');
var btnStart = document.getElementById('btnStart');
var game = document.getElementById('game');
var choose_game = document.getElementById('choose_game');
var navbar = document.getElementById('navbar');
var btnHome = document.getElementById('btnHome');
var btnSeta = document.getElementById('btnSeta');
var game_play = document.getElementById('game_play');






var dropbtn = document.getElementById('dropbtn');
var dropbtnX = document.getElementById('dropbtnX');
var dropdown_content = document.getElementById('dropdown_content');

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


/* evento de clique ao botão seta / a div com os seguinte id home choose_game, esta recebendo
novos estilos */

//btnSeta.addEventListener('click', function () {

/*------------CHOOSE GAME------------*/
//choose_game.style.display = 'block';
//choose_game.style.display = 'flex';
//choose_game.style.alignItems = 'center';
//choose_game.style.flexDirection = 'column';

//btnSeta.style.display = "none";

//game_play.style.display = 'none';

/*os estilos display: flex; , align-items: center; , 
flex-direction: column; estão sendo colocados no arquivo js, 
pos ao serem colocados no arquivo css apresentaram erro e não são 
executados como deveriam */


//});


/* evento de clique ao botão home / as divs com os seguintes ids home, game e choose_game estão recebendo
novos estilos */
btnHome.addEventListener('click', function () {

    /* ------------GAME------------*/
    game.style.display = 'none';

    /* ------------NAVBAR------------*/
    navbar.style.display = 'none';

    /* ------------home------------*/
    home.style.display = 'block';
    home.style.display = 'flex';
    home.style.alignItems = 'center';
    home.style.flexDirection = 'column';

    /* os estilos display: flex; , align-items: center; , 
    flex-direction: column; estão sendo colocados no arquivo js, 
    pos ao serem colocados no arquivo css apresentaram erro e não são 
    executados como deveriam */

    /*-------Recarrega página--------*/
    location.reload();
});



/* evento de clique ao botão start / as divs com os seguintes ids home, game e choose_game estão recebendo
novos estilos */
btnStart.addEventListener('click', function () {

    /* ------------Home------------*/
    home.style.display = 'none';


    /* ------------GAME------------*/
    game.style.display = 'block';


    /* ------------CHOOSE GAME------------*/
    choose_game.style.display = 'block';
    choose_game.style.display = 'flex';
    choose_game.style.alignItems = 'center';
    choose_game.style.flexDirection = 'column';

    /* os estilos display: flex; , align-items: center; , 
    flex-direction: column; estão sendo colocados no arquivo js, 
    pos ao serem colocados no arquivo css apresentaram erro e não são 
    executados como deveriam */

    /* ------------NAVBAR------------*/
    navbar.style.display = 'block';
    navbar.style.display = 'flex';
    navbar.style.flexDirection = 'row';
});




