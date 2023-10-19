const URL1 = "https://teachablemachine.withgoogle.com/models/fTH0i1MCA/"; // a, c, e, m, n, o ,s, x.
const URL2 = "https://teachablemachine.withgoogle.com/models/ClpaUFbvE/"; // d, g, i, l, j, q, p.
const URL3 = "https://teachablemachine.withgoogle.com/models/QSkGKqOeq/"; // b, f, r, t, u, v, w, y.

var model1, model2, model3, webcam, labelContainer, RAFloop,
    letras1 = ['a', 'c', 'e', 'm', 'n', 'o' ,'s', 'x'], letras2 = ['d', 'g', 'i', 'l', 'j', 'q', 'p'], letras3 = ['b', 'f', 'r', 't', 'u', 'v', 'w', 'y'],
    letras = ['a', 'c', 'e', 'm', 'n', 'o', 's' , 'x', 'd', 'g', 'i', 'l', 'j', 'q', 'p', 'b', 'f', 'r', 't', 'u', 'v', 'w', 'y'],
    letra = letras[Math.floor(Math.random() * letras.length)], score = 0, escolher = false, tempo,
    labelScore = document.getElementById("score"),
    labelLetra = document.getElementById("letra"),
    labelTempo = document.getElementById("time"),
    divTela = document.getElementById("tela_fim2"),
    facilBool = false, medioBool = false, dificilBool = false,
    facilTaxa = 0.25, medioTaxa = 0.5, dificilTaxa = 1;

async function loadModel() {
     /* load the model and metadata 
    / carregar o modelo e os metadados */

    /* Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    / Consulte tmImage.loadFromFiles() na API para oferecer suporte a arquivos de um seletor de arquivos */

    /* or files from your local hard drive
    / ou arquivos do seu disco rígido local */

    /* Note: the pose library adds "tmImage" object to your window (window.tmImage)
    / Nota: a biblioteca de poses adiciona o objeto "tmImage" à sua janela (window.tmImage) */
    model1 = await tmImage.load(URL1 + "model.json", URL1 + "metadata.json");
    model2 = await tmImage.load(URL2 + "model.json", URL2 + "metadata.json");
    model3 = await tmImage.load(URL3 + "model.json", URL3 + "metadata.json");
}

async function init() {
    /* Convenience function to setup a webcam
    / Função de conveniência para configurar uma webcam */

    const flip = true; /* whether to flip the webcam / se deve virar a webcam */
    webcam = new tmImage.Webcam(150, 150, flip); /* width, height, flip / largura, altura, virar */
    await webcam.setup(); /* request access to the webcam / solicitar acesso à webcam */
    await webcam.play();
    loop();

    /* append elements to the DOM / anexar elementos ao DOM */
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("tela_fim");
    labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>, em libra.`;
}

async function loop() {
    RAFloop = window.requestAnimationFrame(loop);
    webcam.update(); /* update the webcam frame / atualize o quadro da webcam */
    await predict();
}

/* run the webcam image through the image model 
/ execute a imagem da webcam através do modelo de imagem */

async function predict() {
    
    /* predict can take in an image, video or canvas html element
    / prever pode incluir um elemento HTML de imagem, vídeo ou tela */
    
    let prediction;
    if (letras1.includes(letra)) {
        prediction = await model1.predict(webcam.canvas);
    } else if (letras2.includes(letra)) {
        prediction = await model2.predict(webcam.canvas);
    } else if (letras3.includes(letra)) {
        prediction = await model3.predict(webcam.canvas);
    }

    labelScore.innerHTML = `Score: <b>${score}</b>`;
    labelTempo.innerHTML = `Time: <b>${tempo.toFixed(0)}</b>`;
    tempo -= 0.02;
    if (escolher) {
        letra = letras[Math.floor(Math.random() * letras.length)]
        labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>, em libra.`;
        }
        
    if (tempo <= 0) {
        var preview = document.getElementById("preview");
            
        preview.style.display = 'none';
        labelTempo.style.display = 'none';
        labelScore.style.display = 'none';
        labelLetra.style.display = 'none';
        labelContainer.style.display = 'none';
            
        divTela.innerHTML = `O seu tempo acabou,<br><br>O seu score é de: <b>${score}</b> pontos!`;

        finalize();
    }
        
    prediction.map(el => {
        if (el.probability >= 0.9) {
            if (el.className !== "nada") {
                labelContainer.innerHTML = `Você fez a letra: <b>${el.className}</b>!`;
                escolher = false;
                if (el.className === letra) {
                    escolher = true;
                    score++;
                    if (tempo <= 5) {
                        if (facilBool) {
                            tempo += facilTaxa;
                        } else if (medioBool) {
                            tempo += medioTaxa;
                        } else if (dificilBool) {
                            tempo += dificilTaxa;
                        }
                    }
                }
            } else {
                labelContainer.innerHTML = "";
                escolher = false;
            };
        }
    });
}

function finalize() {
    window.cancelAnimationFrame(RAFloop);
    webcam.stop();

    document.getElementById("webcam-container").innerHTML = "";
    labelTempo.innerHTML = "";
    labelScore.innerHTML = "";
    labelLetra.innerHTML = "";
    labelContainer.innerHTML = "";
}

function btnFacil() {
    facilBool = true;
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    /*var btnSeta = document.getElementById('btnSeta');*/
    tempo = 30;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    /*btnSeta.style.display = "block";*/

    init();
}
function btnMedio() {
    medioBool = true;
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    /* var btnSeta = document.getElementById('btnSeta');*/
    tempo = 20;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    /* btnSeta.style.display = "block";*/

    init();
}
function bntDificil() {
    dificilBool = true;
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    /* var btnSeta = document.getElementById('btnSeta');*/
    tempo = 10;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    /*btnSeta.style.display = "block";*/

    init();
}