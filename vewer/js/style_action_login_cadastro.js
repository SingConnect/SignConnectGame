var bttnCadastro = document.getElementById("bttnCadastro");
var login = document.getElementById("login");
var cadastro = document.getElementById("cadastro");
var bttnLogin = document.getElementById("bttnLogin");

bttnCadastro.addEventListener('click', function () {
    login.style.display = 'none';
    cadastro.style.display = 'block';
});

bttnLogin.addEventListener('click', function () {
    cadastro.style.display = 'none';
    login.style.display = 'block';
});