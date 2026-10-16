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

const resultadoTitulo = document.querySelector(".resultado__titulo");
const resultadoPlacar = document.querySelector(".resultado__placar");
const resultadoDetalhe = document.querySelector(".resultado__detalhe");
const botaoNovamente = document.querySelector(".jogar__novamente");

const mostrarOverall = true; // false = esconde o overall dos jogadores sorteados (modo difícil)

let escalacao = [];
let nomeTime = "";

function ativarAba(aba) {
  [abaInicio, abaTime, abaPartida].forEach((a) => a.classList.remove("ativo"));
  aba.classList.add("ativo");
}

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

function mostrarEscalacao() {
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

function jogarPartida() {
  const ordemPosicoes = ["GOL", "ZAG", "LAT", "VOL", "MEI", "ATA"];
  escalacao.sort(
    (a, b) =>
      ordemPosicoes.indexOf(a.posicao) - ordemPosicoes.indexOf(b.posicao),
  );

  const mediaOver = Math.round(calcMedia(escalacao));
  const adversario = timeContra();
  const vitoria = calculoProbabilidade(mediaOver, adversario.media);

  containerTime.style.display = "none";
  containerPartida.style.display = "flex";
  ativarAba(abaPartida);

  resultadoTitulo.textContent = vitoria
    ? "Você ganhou! 🏆"
    : "Você perdeu... 😢";
  resultadoPlacar.textContent = `${nomeTime} (${mediaOver}) x ${adversario.nome} ${adversario.temporada ?? ""} (${adversario.media})`;
  resultadoDetalhe.textContent = vitoria
    ? `Seu time venceu o ${adversario.nome}, que tinha ${adversario.media} de overall.`
    : `Seu time perdeu para o ${adversario.nome}, que tinha ${adversario.media} de overall.`;
}

botaoComecar.addEventListener("click", () => {
  nomeTime = inputNome.value.trim() || "Meu Time";
  escalacao = [];

  containerInicio.style.display = "none";
  containerTime.style.display = "flex";
  ativarAba(abaTime);

  mostrarEscalacao();
  mostrarOpcoes();
});

botaoAvancar.addEventListener("click", jogarPartida);
botaoNovamente.addEventListener("click", () => location.reload());
