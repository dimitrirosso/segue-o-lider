const botaoComecar = document.querySelector(".comecar");
const inputNome = document.querySelector(".container input");
const containerInicio = document.querySelector(".container");
const containerTime = document.querySelector(".container__time");
const containerPartida = document.querySelector(".container__partida");

const abaInicio = document.querySelector(".inicio");
const abaTime = document.querySelector(".time");
const abaPartida = document.querySelector(".partida");

const mensagem = document.querySelector(".mensagem");
const tituloSorteado = document.querySelector(".time__sorteado h1");
const listaJogadores = document.querySelector(".jogadores");
const rodapeTime = document.querySelector(".rodape__time");
const overallTime = document.querySelector(".overall__time h1");
const botaoAvancar = document.querySelector(".avancar");

// elementos da partida
const tempoPartida = document.querySelector(".tempo");
const nomeCasa = document.querySelector(".nome__casa");
const nomeFora = document.querySelector(".nome__fora");
const placarCasa = document.querySelector(".placar__casa");
const placarFora = document.querySelector(".placar__fora");
const resultadoPlacar = document.querySelector(".resultado");
const listaGols = document.querySelector(".gols");
const botaoIniciar = document.querySelector(".jogar__partida");

const mostrarOverall = true; // false = esconde o overall dos jogadores sorteados (modo difícil)

const apitoFinal = new Audio("audio-apito.mp3");
const musica = new Audio("audio-gremio.mp3");
musica.volume = 0.2; // 0 a 1

// ajustes da simulação
const MS_POR_MINUTO = 150; // 90 min ≈ 14 segundos. Aumente para ficar mais lento
const MS_INTERVALO = 2000; // pausa do intervalo
const GOLS_BASE = 1.4; // média de gols de um time equilibrado
const FORCA = 0.03; // quanto a diferença de overall pesa
const ordemPosicoes = ["GOL", "ZAG", "LAT", "VOL", "MEI", "ATA"];

const pesoPosicao = {
  GOL: 0.02,
  ZAG: 0.6,
  DEF: 0.7,
  LAT: 0.8,
  VOL: 1,
  MEI: 2.5,
  ATA: 5,
};

let escalacao = [];
let nomeTime = "";

let mediaOver = 0;
let adversario = null;
let golsCasa = 0;
let golsFora = 0;
let partidaRolando = false;
let partidaTerminou = false;

function ativarAba(aba) {
  [abaInicio, abaTime, abaPartida].forEach((a) => a.classList.remove("ativo"));
  aba.classList.add("ativo");
}

/* ---------- ESCOLHA DO TIME ---------- */

function mostrarOpcoes() {
  const time = sorteiaTime();
  tituloSorteado.textContent = `${time.nome} ${time.temporada ?? ""}`;
  listaJogadores.innerHTML = "";

  time.jogadores.forEach((jogador) => {
    const card = document.createElement("div");
    card.classList.add("jogador");
    card.innerHTML = `
      <p>${jogador.nome}</p>
      <p>${jogador.posicao}</p>
      ${mostrarOverall ? `<p>${jogador.overall}</p>` : ""}
    `;
    card.addEventListener("click", () => escolherJogador(jogador));
    listaJogadores.appendChild(card);
  });
}

function ordenarEscalacao() {
  escalacao.sort(
    (a, b) =>
      ordemPosicoes.indexOf(a.posicao) - ordemPosicoes.indexOf(b.posicao),
  );
}

function mostrarEscalacao() {
  ordenarEscalacao();
  rodapeTime.innerHTML = "";

  escalacao.forEach((jogador) => {
    const card = document.createElement("div");
    card.classList.add("jogador__escolhido");
    card.innerHTML = `
      <span>${jogador.nome}</span>
      <span>${jogador.posicao}</span>
      <strong>${jogador.overall}</strong>
    `;
    rodapeTime.appendChild(card);
  });

  overallTime.textContent = escalacao.length
    ? Math.round(calcMedia(escalacao))
    : 0;
  mensagem.textContent = `Escolha 11 jogadores para continuar! (${escalacao.length}/11)`;
}

function escolherJogador(jogador) {
  if (escalacao.length >= 11) return;

  if (escalacao.includes(jogador)) {
    mensagem.textContent = "Esse jogador já está no seu time!";
    return;
  }

  const goleiroExiste = escalacao.some((j) => j.posicao == "GOL");
  if (goleiroExiste && jogador.posicao == "GOL") {
    mensagem.textContent = "Já existe um goleiro no time!";
    return;
  }

  escalacao.push(jogador);
  mostrarEscalacao();

  if (escalacao.length < 11) {
    mostrarOpcoes();
  } else {
    listaJogadores.innerHTML = "";
    tituloSorteado.textContent = "Time completo!";
    botaoAvancar.disabled = false;
  }
}

/* ---------- PARTIDA ---------- */

// monta a tela da partida (antes de o jogo começar)
function prepararPartida() {
  mediaOver = Math.round(calcMedia(escalacao));
  adversario = timeContra();

  golsCasa = 0;
  golsFora = 0;
  partidaRolando = false;
  partidaTerminou = false;

  containerTime.style.display = "none";
  containerPartida.style.display = "flex";
  ativarAba(abaPartida);

  nomeCasa.textContent = `${nomeTime}`;
  nomeFora.textContent = `${adversario.nome} ${adversario.temporada ?? ""}`;
  placarCasa.textContent = 0;
  placarFora.textContent = 0;
  tempoPartida.textContent = "Pré-jogo";
  listaGols.innerHTML = "";

  botaoIniciar.disabled = false;
  botaoIniciar.textContent = "Iniciar Partida";
}

// chance de gol por minuto de cada time, baseada na diferença de overall
function chancesDeGol() {
  const diferenca = Math.max(-25, Math.min(25, mediaOver - adversario.media));

  const golsEsperadosCasa = GOLS_BASE * Math.exp(FORCA * diferenca);
  const golsEsperadosFora = GOLS_BASE * Math.exp(-FORCA * diferenca);

  return { casa: golsEsperadosCasa / 90, fora: golsEsperadosFora / 90 };
}

// sorteia quem fez o gol: atacante tem mais chance, e overall maior também
function sortearArtilheiro(jogadores) {
  if (!jogadores || jogadores.length === 0) return null;

  const pesos = jogadores.map(
    (j) => (pesoPosicao[j.posicao] ?? 1) * Math.pow(j.overall / 80, 3),
  );
  const total = pesos.reduce((soma, p) => soma + p, 0);

  let sorte = Math.random() * total;
  for (let i = 0; i < jogadores.length; i++) {
    sorte -= pesos[i];
    if (sorte <= 0) return jogadores[i];
  }
  return jogadores[jogadores.length - 1];
}

function registrarGol(minuto, doMeuTime) {
  const autor = sortearArtilheiro(doMeuTime ? escalacao : adversario.jogadores);
  const clube = doMeuTime ? nomeTime : adversario.nome;
  const nomeAutor = autor ? autor.nome : clube;

  if (doMeuTime) {
    golsCasa++;
    placarCasa.textContent = golsCasa;
  } else {
    golsFora++;
    placarFora.textContent = golsFora;
  }

  const linha = document.createElement("p");
  linha.classList.add(doMeuTime ? "gol__nosso" : "gol__adversario");
  linha.textContent = `${minuto}' ⚽ Gol!! ${nomeAutor} (${clube})`;
  listaGols.appendChild(linha);

  // animação rápida no placar
  resultadoPlacar.classList.add("pulsar");
  setTimeout(() => resultadoPlacar.classList.remove("pulsar"), 600);
}

function fimDeJogo() {
  musica.pause();
  musica.currentTime = 0;
  apitoFinal.play();
  let texto = "Empate!";
  if (golsCasa > golsFora) texto = "Você ganhou!";
  if (golsCasa < golsFora) texto = "Você perdeu!";

  tempoPartida.textContent = `Fim de jogo - ${texto}`;

  partidaRolando = false;
  partidaTerminou = true;
  botaoIniciar.disabled = false;
  botaoIniciar.textContent = "Jogar de novo";
}

function iniciarPartida() {
  if (partidaTerminou) {
    location.reload();
    return;
  }
  if (partidaRolando) return;

  partidaRolando = true;
  musica.play();
  botaoIniciar.disabled = true;
  botaoIniciar.textContent = "Bola rolando...";

  const chances = chancesDeGol();
  let minuto = 0;

  function passarMinuto() {
    minuto++;
    tempoPartida.textContent = `${minuto}' - bola rolando`;

    if (Math.random() < chances.casa) registrarGol(minuto, true);
    if (Math.random() < chances.fora) registrarGol(minuto, false);

    if (minuto === 45) {
      tempoPartida.textContent = "Intervalo";
      setTimeout(passarMinuto, MS_INTERVALO);
      return;
    }

    if (minuto >= 90) {
      fimDeJogo();
      return;
    }

    setTimeout(passarMinuto, MS_POR_MINUTO);
  }

  passarMinuto();
}

/* ---------- EVENTOS ---------- */

botaoComecar.addEventListener("click", () => {
  nomeTime = inputNome.value.trim() || "Meu Time";
  escalacao = [];

  containerInicio.style.display = "none";
  containerTime.style.display = "flex";
  ativarAba(abaTime);

  mostrarEscalacao();
  mostrarOpcoes();
});

botaoAvancar.addEventListener("click", prepararPartida);
botaoIniciar.addEventListener("click", iniciarPartida);
