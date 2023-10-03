const URL = "https://teachablemachine.withgoogle.com/models/Vn-uJTd4S/";

var model, webcam, labelContainer, maxPredictions,
    letras = ['b', 'c', 'd', 'f', 'g', 'm', 'a', 'e', 'i', 'o', 'u'],
    letra = letras[Math.floor(Math.random() * letras.length)], score = 0, escolher = false, tempo,
    labelScore = document.getElementById("score"),
    labelLetra = document.getElementById("letra"),
    labelTempo = document.getElementById("time"),
    divTela = document.getElementById("tela_fim");

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    /* load the model and metadata 
    / carregar o modelo e os metadados */

    /* Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    / Consulte tmImage.loadFromFiles() na API para oferecer suporte a arquivos de um seletor de arquivos */

    /* or files from your local hard drive
    / ou arquivos do seu disco rígido local */

    /* Note: the pose library adds "tmImage" object to your window (window.tmImage)
    / Nota: a biblioteca de poses adiciona o objeto "tmImage" à sua janela (window.tmImage) */

    model = await tmImage.load(modelURL, metadataURL);

    /* Convenience function to setup a webcam
    / Função de conveniência para configurar uma webcam */

    const flip = true; /* whether to flip the webcam / se deve virar a webcam */
    webcam = new tmImage.Webcam(150, 150, flip); /* width, height, flip / largura, altura, virar */
    await webcam.setup(); /* request access to the webcam / solicitar acesso à webcam */
    await webcam.play();
    window.requestAnimationFrame(loop);

    /* append elements to the DOM / anexar elementos ao DOM */
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("tela_fim");
    labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>, em libra.`;
    /*
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
    */
}

async function loop() {
    webcam.update(); /* update the webcam frame / atualize o quadro da webcam */
    await predict();
    window.requestAnimationFrame(loop);
}

/* run the webcam image through the image model 
/ execute a imagem da webcam através do modelo de imagem */

async function predict() {

    /* predict can take in an image, video or canvas html element
    / prever pode incluir um elemento HTML de imagem, vídeo ou tela */

    const prediction = await model.predict(webcam.canvas);
    /*
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    */
    labelScore.innerHTML = `Score: <b>${score}</b>`;
    labelTempo.innerHTML = `Time: <b>${tempo.toFixed(1)}</b>`;
    tempo -= 0.01;
    if (escolher) {
        letra = letras[Math.floor(Math.random() * letras.length)]
        labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>, em libra.`;
    }

    if (tempo <= 0) {

        var preview = document.getElementById("preview");
        var time = document.getElementById("time");
        /*var score = document.getElementById("score");*/
        var letra = document.getElementById("letra");

        preview.style.display = 'none';
        time.style.display = 'none';
        /*score.style.display = 'none';*/
        letra.style.display = 'none';

        divTela.innerHTML = `O seu tempo acabou,<br><br>O seu score é de: <b>${score}</b> pontos!`;


    }

    prediction.map(el => {
        if (el.probability >= 0.9) {
            if (el.className !== "nada") {
                labelContainer.innerHTML = `Você fez a letra: <b>${el.className}</b>!`;
                escolher = false;
                if (el.className === letra) {
                    escolher = true;
                    score++;
                }
            } else {
                labelContainer.innerHTML = "";
                escolher = false;
            };
        }
    });
}

function btnFacil() {
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    tempo = 2000;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}
function btnMedio() {
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    tempo = 10;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}
function bntDificil() {
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    tempo = 5;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}