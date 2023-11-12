const URL1 = "https://teachablemachine.withgoogle.com/models/3jdNcyrIH/"; //[a, e, o, s]
const URL2 = "https://teachablemachine.withgoogle.com/models/Io54LvZLm/"; //[c, m, n, x]
const URL3 = "https://teachablemachine.withgoogle.com/models/xCDV6H0vz/"; //[d, g, i, l]
const URL4 = "https://teachablemachine.withgoogle.com/models/5LYFvq4vE/"; //[j, q, p, k, h]
const URL5 = "https://teachablemachine.withgoogle.com/models/Xg2xVisa1/"; //[f, t, w, y]
const URL6 = "https://teachablemachine.withgoogle.com/models/M2kqemKW5/"; //[b, r, v, u]

var model1, model2, model3, model4, model5, model6, webcam, labelContainer, RAFloop, RAFVM, ct,
    letras1 = ['a', 'e', 'o', 's'], letras2 = ['c', 'm', 'n', 'x'], letras3 = ['d', 'g', 'i', 'l'], letras4 = ['j', 'q', 'p', 'k', 'h'], letras5 = ['f', 't', 'w', 'y'], letras6 = ['b', 'r', 'v', 'u'],
    letras = ['a', 'c', 'e', 'm', 'n', 'o', 's', 'x', 'd', 'g', 'i', 'l', 'j', 'q', 'p', 'b', 'f', 'r', 't', 'u', 'v', 'w', 'y', 'k', 'h'],
    letra = letras[Math.floor(Math.random() * letras.length)], score = 0, tempo,
    palavra = score <= 20 ? pMenor[Math.floor(Math.random() * pMenor.length)] : pMair[Math.floor(Math.random() * pMair.length)], resPalavra = "", indexPalavra = 0,
    labelScore = document.getElementById("score"),
    labelLetra = document.getElementById("letra"),
    labelTempo = document.getElementById("time"),
    divTela = document.getElementById("tela_fim2"),
    facilBool = false, medioBool = false, dificilBool = false, taxa = 1;

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
    model4 = await tmImage.load(URL4 + "model.json", URL4 + "metadata.json");
    model5 = await tmImage.load(URL5 + "model.json", URL5 + "metadata.json");
    model6 = await tmImage.load(URL6 + "model.json", URL6 + "metadata.json");

    RAFVM = window.requestAnimationFrame(verificaModel);

    document.getElementById("bt_voltar").style.display = 'none';
}

function verificaModel() {
    if (model1 != undefined && model2 != undefined && model3 != undefined && model4 != undefined && model5 != undefined && model6 != undefined) {
        document.getElementById("preLoader").style.display = "none";
        document.getElementById("choose_game").style.display = "block";
        window.cancelAnimationFrame(RAFVM);
    }
}
async function init() {
    ct = true;
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
    labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>`;
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
    if (score <= 5) {
        if (letras1.includes(letra)) {
            prediction = await model1.predict(webcam.canvas);
        } else if (letras2.includes(letra)) {
            prediction = await model2.predict(webcam.canvas);
        } else if (letras3.includes(letra)) {
            prediction = await model3.predict(webcam.canvas);
        } else if (letras4.includes(letra)) {
            prediction = await model4.predict(webcam.canvas);
        } else if (letras5.includes(letra)) {
            prediction = await model5.predict(webcam.canvas);
        } else if (letras6.includes(letra)) {
            prediction = await model6.predict(webcam.canvas);
        }
    } else {
        if (letras1.includes(palavra[indexPalavra])) {
            prediction = await model1.predict(webcam.canvas);
        } else if (letras2.includes(palavra[indexPalavra])) {
            prediction = await model2.predict(webcam.canvas);
        } else if (letras3.includes(palavra[indexPalavra])) {
            prediction = await model3.predict(webcam.canvas);
        } else if (letras4.includes(palavra[indexPalavra])) {
            prediction = await model4.predict(webcam.canvas);
        } else if (letras5.includes(palavra[indexPalavra])) {
            prediction = await model5.predict(webcam.canvas);
        } else if (letras6.includes(palavra[indexPalavra])) {
            prediction = await model6.predict(webcam.canvas);
        }
    }

    labelScore.innerHTML = `Score: <b>${score}</b>`;
    labelTempo.innerHTML = `Time: <b>${tempo.toFixed(0)}</b>`;
    tempo -= 0.02;

    if (tempo <= 0 && ct) {
        var preview = document.getElementById("preview");

        preview.style.display = 'none';
        labelTempo.style.display = 'none';
        labelScore.style.display = 'none';
        labelLetra.style.display = 'none';
        labelContainer.style.display = 'none';
        document.getElementById("bt_voltar").style.display = 'block';
        document.getElementById("ponto").value = score;
        document.getElementById("btnHome").style.display = 'none';
        document.getElementById("btnSeta").style.display = 'none';
        document.getElementById("btnPular").style.display = 'none';

        rating += calculaTaxa();
        document.getElementById("rating").value = rating;

        divTela.innerHTML = `<p class="p1">O SEU TEMPO ACABOU.</p><br><br><p class="p2">Score: <b>${score}</b> pontos!</p><br><br><p>Rating: <b>${rating} ${calculaTaxa() >= 0 ? '+'+calculaTaxa() : '-'+calculaTaxa()}</b></p>`;

        try {
            finalize();
        } catch (error) {
            console.log(error);
        }
        ct = false;
    }

    if (score <= 9) {
        labelLetra.innerHTML = `Faça a letra: <b>${letra}</b>`;
        prediction.map(el => {
            if (el.probability >= 0.9) {
                if (el.className !== "nada") {
                    labelContainer.innerHTML = `Tentativa: <b>${el.className}</b>`;
                    if (el.className === letra) {
                        letra = letras[Math.floor(Math.random() * letras.length)];
                        score++;
                        if (tempo <= 5) {
                            if (facilBool) {
                                tempo += taxa;
                            } else if (medioBool) {
                                tempo += taxa;
                            } else if (dificilBool) {
                                tempo += taxa;
                            }
                        }
                    }
                } else {
                    labelContainer.innerHTML = "";
                };
            }
        });
    } else {
        labelLetra.innerHTML = `Assoletre a palavra: <b>${palavra}</b>`;
        prediction.map(el => {
            if (el.probability >= 0.9) {
                if (el.className !== "nada") {
                    labelContainer.innerHTML = `Tentativa: <b>${resPalavra + el.className}</b>`;
                    if (palavra[indexPalavra] === el.className) {
                        resPalavra += el.className;
                        indexPalavra++;
                        if (tempo <= 5) {
                            if (facilBool) {
                                tempo += taxa;
                            } else if (medioBool) {
                                tempo += taxa;
                            } else if (dificilBool) {
                                tempo += taxa;
                            }
                        }
                    }
                    if (resPalavra === palavra) {
                        score++;
                        labelContainer.innerHTML = `Tentativa: <b>${resPalavra + el.className}</b>`;
                        resPalavra = "";
                        indexPalavra = 0;
                        palavra = score <= 20 ? pMenor[Math.floor(Math.random() * pMenor.length)] : pMair[Math.floor(Math.random() * pMair.length)];
                    }
                } else {
                    if (resPalavra !== "") {
                        labelContainer.innerHTML = `Tentativa: <b>${resPalavra}</b>`;
                    } else {
                        labelContainer.innerHTML = "";
                    }
                }
            }
        });
    }
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

function calculaTaxa() {
    if (facilBool) {
        if (score >= scorefacil) {
            return Math.floor(score * 2 / 10);
        } else {
            return -1 * Math.floor(score * 2 / 10);
        }
    }
    if (medioBool) {
        if (score >= scoremedio) {
            return Math.floor(score * 3 / 10);
        } else {
            return -1 * Math.floor(score * 3 / 10);
        }
    }
    if (dificilBool) {
        if (score >= scoredificil) {
            return Math.floor(score * 5 / 10);
        } else {
            return -1 * Math.floor(score * 5 / 10);
        }
    }
}

function btnPular() {
        letra = letras[Math.floor(Math.random() * letras.length)];
        palavra = score <= 20 ? pMenor[Math.floor(Math.random() * pMenor.length)] : pMair[Math.floor(Math.random() * pMair.length)];
        score -= 3;
}

function btnFacil() {
    score = 0;
    facilBool = true;
    document.getElementById("dificuldade").value = "f";
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    document.getElementById("btnPular").style.display = 'block';
    tempo = 30;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}
function btnMedio() {
    score = 0;
    medioBool = true;
    document.getElementById("dificuldade").value = "m";
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    document.getElementById("btnPular").style.display = 'block';
    tempo = 20;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}
function bntDificil() {
    score = 0;
    dificilBool = true;
    document.getElementById("dificuldade").value = "d";
    var choose_game = document.getElementById("choose_game");
    var game_play = document.getElementById('game_play');
    var btnSeta = document.getElementById('btnSeta');
    document.getElementById("btnPular").style.display = 'block';
    tempo = 10;
    choose_game.style.display = "none";
    game_play.style.display = "block";
    btnSeta.style.display = "block";

    init();
}