// ==========================================
// CONFIGURAÇÕES DO JOGO
// ==========================================

let dificuldade = "facil";
let quantidadePecas = 6;

let somLigado = true;
let musicaLigada = true;

let setaAtual = 0;

let intervaloSeta = null;
let contadorTimer = null;
let fimTimer = null;
let pausaInicialTimer = null;

// ==========================================
// VELOCIDADE DE CADA DIFICULDADE
// ==========================================

const velocidades = {
    facil: 1500,
    medio: 1000,
    dificil: 600
};

// Espaço entre as setas
const pausaEntreSetas = 300;


// ==========================================
// SONS
// ==========================================

const somPop = new Audio("pop.mp3");
const somBonus = new Audio("bonus.mp3");
const somApito = new Audio("apito.mp3");

const musica = new Audio("musica.mp3");
musica.loop = true;


// ==========================================
// PREPARAR ÁUDIOS
// ==========================================

function prepararAudios() {

    const audios = [
        somPop,
        somBonus,
        somApito,
        musica
    ];

    audios.forEach(function(audio) {
        audio.load();
    });
}

// Carrega os áudios assim que o jogo abre
prepararAudios();


// ==========================================
// FUNÇÕES DE SOM
// ==========================================

function tocarSom(som) {

    if (!somLigado) return;

    som.currentTime = 0;

    const promessa = som.play();

    if (promessa !== undefined) {

        promessa.catch(function(erro) {
            console.log("Erro ao tocar som:", erro);
        });
    }
}


function iniciarMusica() {

    if (!musicaLigada) return;

    musica.currentTime = 0;

    const promessa = musica.play();

    if (promessa !== undefined) {

        promessa.catch(function(erro) {
            console.log("Erro ao tocar música:", erro);
        });
    }
}


function pararMusica() {

    musica.pause();
    musica.currentTime = 0;
}


// ==========================================
// TELAS
// ==========================================

const menu =
    document.getElementById("menu");

const telaDificuldade =
    document.getElementById("telaDificuldade");

const telaAjustes =
    document.getElementById("telaAjustes");

const telaContato =
    document.getElementById("telaContato");

const telaProntos =
    document.getElementById("telaProntos");

const telaContagem =
    document.getElementById("telaContagem");

const telaJogo =
    document.getElementById("telaJogo");

const telaAcabou =
    document.getElementById("telaAcabou");

const telaContar =
    document.getElementById("telaContar");

const numeroContagem =
    document.getElementById("numeroContagem");

const setaAtualElemento =
    document.getElementById("setaAtual");


// ==========================================
// TROCAR DE TELA
// ==========================================

function mostrarTela(tela) {

    const telas = [
        menu,
        telaDificuldade,
        telaAjustes,
        telaContato,
        telaProntos,
        telaContagem,
        telaJogo,
        telaAcabou,
        telaContar
    ];

    telas.forEach(function(item) {
        item.classList.add("escondida");
    });

    tela.classList.remove("escondida");
}


// ==========================================
// SOM NOS BOTÕES
// ==========================================

document
    .querySelectorAll("button")
    .forEach(function(botao) {

        botao.addEventListener("click", function() {
            tocarSom(somPop);
        });

    });


// ==========================================
// MENU
// ==========================================

document
    .getElementById("btnJogar")
    .addEventListener("click", function() {

        mostrarTela(telaProntos);

    });


document
    .getElementById("btnDificuldade")
    .addEventListener("click", function() {

        mostrarTela(telaDificuldade);

    });


document
    .getElementById("btnAjustes")
    .addEventListener("click", function() {

        mostrarTela(telaAjustes);

    });


// ==========================================
// CONTATO
// ==========================================

document
    .getElementById("btnContato")
    .addEventListener("click", function() {

        mostrarTela(telaContato);

    });


document
    .getElementById("voltarContato")
    .addEventListener("click", function() {
        mostrarTela(telaAjustes);
    });


// ==========================================
// VOLTAR
// ==========================================

document
    .getElementById("voltarDificuldade")
    .addEventListener("click", function() {

        mostrarTela(menu);

    });


document
    .getElementById("voltarAjustes")
    .addEventListener("click", function() {

        mostrarTela(menu);

    });


document
    .getElementById("sairJogo")
    .addEventListener("click", function() {

        pararJogo();
        mostrarTela(menu);

    });


document
    .getElementById("sairDuranteJogo")
    .addEventListener("click", function() {

        pararJogo();
        mostrarTela(menu);

    });


// ==========================================
// DIFICULDADE
// ==========================================

const botoesDificuldade =
    document.querySelectorAll(".btn-dificuldade");


botoesDificuldade.forEach(function(botao) {

    botao.addEventListener("click", function() {

        dificuldade =
            botao.dataset.dificuldade;

        botoesDificuldade.forEach(function(item) {

            item.classList.remove("selecionado");

        });

        botao.classList.add("selecionado");

    });

});


// Fácil selecionado inicialmente

document
    .querySelector('[data-dificuldade="facil"]')
    .classList.add("selecionado");


// ==========================================
// QUANTIDADE DE PEÇAS
// ==========================================

const quantidadeElemento =
    document.getElementById("quantidadePecas");


document
    .getElementById("menosPecas")
    .addEventListener("click", function() {

        if (quantidadePecas > 1) {

            quantidadePecas--;

            quantidadeElemento.textContent =
                quantidadePecas;

        }

    });


document
    .getElementById("maisPecas")
    .addEventListener("click", function() {

        if (quantidadePecas < 30) {

            quantidadePecas++;

            quantidadeElemento.textContent =
                quantidadePecas;

        }

    });


// ==========================================
// SOM
// ==========================================

document
    .getElementById("toggleSom")
    .addEventListener("click", function() {

        somLigado = !somLigado;

        this.dataset.ligado = somLigado;

        this.textContent =
            somLigado ? "ON" : "OFF";

    });


// ==========================================
// MÚSICA
// ==========================================

document
    .getElementById("toggleMusica")
    .addEventListener("click", function() {

        musicaLigada = !musicaLigada;

        this.dataset.ligado = musicaLigada;

        this.textContent =
            musicaLigada ? "ON" : "OFF";


        if (musicaLigada) {

            // Só inicia se já estiver no jogo

            if (!telaJogo.classList.contains("escondida")) {

                iniciarMusica();

            }

        } else {

            pararMusica();

        }

    });


// ==========================================
// COMEÇAR
// ==========================================

document
    .getElementById("btnSim")
    .addEventListener("click", function() {

        // Tenta liberar os áudios no primeiro toque
        // do jogador, evitando bloqueio do navegador.

        const audios = [
            somPop,
            somBonus,
            somApito,
            musica
        ];


        audios.forEach(function(audio) {

            audio.muted = true;

            const tentativa = audio.play();


            if (tentativa !== undefined) {

                tentativa.then(function() {

                    audio.pause();
                    audio.currentTime = 0;
                    audio.muted = false;

                }).catch(function() {

                    audio.muted = false;

                });

            } else {

                audio.muted = false;

            }

        });


        iniciarContagem();

    });


// ==========================================
// CONTAGEM 3... 2... 1...
// ==========================================

function iniciarContagem() {

    mostrarTela(telaContagem);

    let numero = 3;

    numeroContagem.textContent = "3...";

    // Som do 3
    tocarSom(somPop);


    contadorTimer =
        setInterval(function() {

            numero--;


            if (numero > 0) {

                numeroContagem.textContent =
                    numero + "...";

                // Som do 2 e do 1
                tocarSom(somPop);

            } else {

                clearInterval(contadorTimer);

                contadorTimer = null;


                // Pequena pausa depois do 1...

                pausaInicialTimer =
                    setTimeout(function() {

                        iniciarJogo();

                    }, 500);

            }

        }, 1000);

}


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

    mostrarTela(telaJogo);

    setaAtual = 0;

    // Música começa somente aqui
    iniciarMusica();

    mostrarProximaSeta();

}


// ==========================================
// MOSTRAR PRÓXIMA SETA
// ==========================================

function mostrarProximaSeta() {

    // Verifica se terminou

    if (setaAtual >= quantidadePecas) {

        finalizarJogo();

        return;

    }


    setaAtual++;


    // Sorteia esquerda ou direita

    const direita =
        Math.random() < 0.5;


    const imagem =
        document.createElement("img");


    if (direita) {

        imagem.src = "setad.png";
        imagem.alt = "Direita";

    } else {

        imagem.src = "seta.png";
        imagem.alt = "Esquerda";

    }


    // Limpa a seta anterior

    setaAtualElemento.innerHTML = "";


    // Coloca a nova seta

    setaAtualElemento.appendChild(imagem);


    // Som da seta

    tocarSom(somPop);


    // Mantém a seta na tela

    intervaloSeta =
        setTimeout(function() {

            // Remove a seta

            setaAtualElemento.innerHTML = "";


            // Espaço vazio antes da próxima

            intervaloSeta =
                setTimeout(function() {

                    mostrarProximaSeta();

                }, pausaEntreSetas);

        }, velocidades[dificuldade]);

}


// ==========================================
// FINALIZAR
// ==========================================

function finalizarJogo() {

    pararJogo();

    // Música para imediatamente
    pararMusica();


    // Mostra "Acabou!"

    mostrarTela(telaAcabou);


    // Apito

    tocarSom(somApito);


    // Depois de 2,5 segundos

    fimTimer =
        setTimeout(function() {

            mostrarTela(telaContar);


            // Som de bônus

            tocarSom(somBonus);


            fimTimer = null;

        }, 2500);

}


// ==========================================
// PARAR JOGO
// ==========================================

function pararJogo() {

    if (intervaloSeta !== null) {

        clearTimeout(intervaloSeta);

        intervaloSeta = null;

    }


    if (contadorTimer !== null) {

        clearInterval(contadorTimer);

        contadorTimer = null;

    }


    if (pausaInicialTimer !== null) {

        clearTimeout(pausaInicialTimer);

        pausaInicialTimer = null;

    }


    if (fimTimer !== null) {

        clearTimeout(fimTimer);

        fimTimer = null;

    }


    pararMusica();

}


// ==========================================
// BOTÃO 👍
// ==========================================

document
    .getElementById("btnContinuar")
    .addEventListener("click", function() {

        mostrarTela(telaProntos);

    });


// ==========================================
// INSTALAÇÃO DO PWA
// ==========================================

let eventoInstalacao = null;

const btnBaixar =
    document.getElementById("btnBaixar");


// Guarda o evento de instalação

window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        eventoInstalacao = event;

        btnBaixar.classList.remove("escondido");

    }
);


// Botão Baixar

btnBaixar.addEventListener(
    "click",
    async () => {

        if (!eventoInstalacao) {
            return;
        }

        eventoInstalacao.prompt();

        const resultado =
            await eventoInstalacao.userChoice;

        eventoInstalacao = null;

        btnBaixar.classList.add("escondido");

    }
);


// Se o aplicativo for instalado

window.addEventListener(
    "appinstalled",
    () => {

        btnBaixar.classList.add("escondido");

        eventoInstalacao = null;

    }
);


// Se já estiver rodando como aplicativo

if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
) {

    btnBaixar.classList.add("escondido");

}