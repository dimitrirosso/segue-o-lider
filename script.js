import promptSync from "prompt-sync";
let prompt = promptSync();

const bancoDeTimes = {
  cruzeiro: {
    nome: "Cruzeiro",
    temporada: 2003,
    overTime: [{ def: 81, mei: 82, ata: 84 }],

    jogadores: [
      { id: "cru01", nome: "Gomes", posicao: "GOL", overall: 84 },
      { id: "cru02", nome: "Maurinho", posicao: "LAT", overall: 79 },
      { id: "cru03", nome: "Cris", posicao: "ZAG", overall: 85 },
      { id: "cru04", nome: "Edu Dracena", posicao: "ZAG", overall: 83 },
      { id: "cru05", nome: "Leandro", posicao: "LAT", overall: 78 },
      { id: "cru06", nome: "Maldonado", posicao: "VOL", overall: 82 },
      { id: "cru07", nome: "Augusto Recife", posicao: "VOL", overall: 79 },
      { id: "cru08", nome: "Wendell", posicao: "MEI", overall: 80 },
      { id: "cru09", nome: "Alex", posicao: "MEI", overall: 90 },
      { id: "cru10", nome: "Aristizábal", posicao: "ATA", overall: 87 },
      { id: "cru11", nome: "Mota", posicao: "ATA", overall: 81 },
    ],
  },

  corinthians: {
    nome: "Corinthians",
    temporada: 2005,
    overTime: [{ def: 79, mei: 79, ata: 88 }],
    jogadores: [
      { id: "cor01", nome: "Fábio Costa", posicao: "GOL", overall: 80 },
      { id: "cor02", nome: "Marinho", posicao: "LAT", overall: 78 },
      { id: "cor03", nome: "Wendel", posicao: "ZAG", overall: 79 },
      { id: "cor04", nome: "Coelho", posicao: "ZAG", overall: 80 },
      { id: "cor05", nome: "Gustavo Nery", posicao: "LAT", overall: 81 },
      { id: "cor06", nome: "Marcelo Mattos", posicao: "VOL", overall: 80 },
      { id: "cor07", nome: "Bruno Octávio", posicao: "MEI", overall: 78 },
      { id: "cor08", nome: "Rosinei", posicao: "MEI", overall: 77 },
      { id: "cor09", nome: "Carlos Alberto", posicao: "MEI", overall: 82 },
      { id: "cor10", nome: "Carlos Tévez", posicao: "ATA", overall: 93 },
      { id: "cor11", nome: "Nilmar", posicao: "ATA", overall: 84 },
    ],
  },

  saopaulo: {
    nome: "São Paulo",
    temporada: 2008,
    overTime: [{ def: 81, mei: 80, ata: 81 }],
    jogadores: [
      { id: "spf01", nome: "Rogério Ceni", posicao: "GOL", overall: 89 },
      { id: "spf02", nome: "Rodrigo", posicao: "LAT", overall: 78 },
      { id: "spf03", nome: "André Dias", posicao: "ZAG", overall: 81 },
      { id: "spf04", nome: "Miranda", posicao: "ZAG", overall: 85 },
      { id: "spf05", nome: "Jorge Wagner", posicao: "LAT", overall: 80 },
      { id: "spf06", nome: "Joilson", posicao: "VOL", overall: 77 },
      { id: "spf07", nome: "Richarlyson", posicao: "MEI", overall: 79 },
      { id: "spf08", nome: "Hernanes", posicao: "MEI", overall: 87 },
      { id: "spf09", nome: "Hugo", posicao: "MEI", overall: 78 },
      { id: "spf10", nome: "Dagoberto", posicao: "ATA", overall: 82 },
      { id: "spf11", nome: "Borges", posicao: "ATA", overall: 80 },
    ],
  },

  flamengo: {
    nome: "Flamengo",
    temporada: 2009,
    overTime: [{ def: 79, mei: 81, ata: 82 }],
    jogadores: [
      { id: "fla01", nome: "Bruno", posicao: "GOL", overall: 83 },
      { id: "fla02", nome: "Léo Moura", posicao: "LAT", overall: 84 },
      { id: "fla03", nome: "Ronaldo Angelim", posicao: "ZAG", overall: 79 },
      { id: "fla04", nome: "David Braz", posicao: "ZAG", overall: 80 },
      { id: "fla05", nome: "Fabrício", posicao: "LAT", overall: 76 },
      { id: "fla06", nome: "Willians", posicao: "VOL", overall: 78 },
      { id: "fla07", nome: "Petkovic", posicao: "MEI", overall: 85 },
      { id: "fla08", nome: "Zé Roberto", posicao: "MEI", overall: 84 },
      { id: "fla09", nome: "Juan", posicao: "MEI", overall: 77 },
      { id: "fla10", nome: "Adriano", posicao: "ATA", overall: 89 },
      { id: "fla11", nome: "Denis Marques", posicao: "ATA", overall: 76 },
    ],
  },

  palmeiras: {
    nome: "Palmeiras",
    temporada: 2018,
    overTime: [{ def: 79, mei: 83, ata: 79 }],
    jogadores: [
      { id: "pal01", nome: "Weverton", posicao: "GOL", overall: 85 },
      { id: "pal02", nome: "Mayke", posicao: "LAT", overall: 79 },
      { id: "pal03", nome: "Gustavo Gómez", posicao: "ZAG", overall: 84 },
      { id: "pal04", nome: "Luan", posicao: "ZAG", overall: 79 },
      { id: "pal05", nome: "Diogo Barbosa", posicao: "LAT", overall: 77 },
      { id: "pal06", nome: "Felipe Melo", posicao: "VOL", overall: 85 },
      { id: "pal07", nome: "Bruno Henrique", posicao: "MEI", overall: 80 },
      { id: "pal08", nome: "Lucas Lima", posicao: "MEI", overall: 81 },
      { id: "pal09", nome: "Dudu", posicao: "MEI", overall: 89 },
      { id: "pal10", nome: "Willian", posicao: "ATA", overall: 78 },
      { id: "pal11", nome: "Borja", posicao: "ATA", overall: 80 },
    ],
  },

  gremio: {
    nome: "Grêmio",
    temporada: 2017,
    overTime: [{ def: 82, mei: 81, ata: 80 }],
    jogadores: [
      { id: "gre01", nome: "Marcelo Grohe", posicao: "GOL", overall: 83 },
      { id: "gre02", nome: "Edilson", posicao: "LAT", overall: 79 },
      { id: "gre03", nome: "Pedro Geromel", posicao: "ZAG", overall: 85 },
      { id: "gre04", nome: "Walter Kannemann", posicao: "ZAG", overall: 84 },
      { id: "gre05", nome: "Bressan", posicao: "LAT", overall: 78 },
      { id: "gre06", nome: "Michel", posicao: "VOL", overall: 82 },
      { id: "gre07", nome: "Jailson", posicao: "VOL", overall: 79 },
      { id: "gre08", nome: "Arthur", posicao: "MEI", overall: 84 },
      { id: "gre09", nome: "Maicon", posicao: "MEI", overall: 78 },
      { id: "gre10", nome: "Luan", posicao: "MEI", overall: 87 },
      { id: "gre11", nome: "Everton", posicao: "ATA", overall: 83 },
    ],
  },

  internacional: {
    nome: "Internacional",
    temporada: 2006,
    overTime: [{ def: 80, mei: 82, ata: 81 }],
    jogadores: [
      { id: "int01", nome: "Clemer", posicao: "GOL", overall: 82 },
      { id: "int02", nome: "Ceará", posicao: "LAT", overall: 78 },
      { id: "int03", nome: "Índio", posicao: "ZAG", overall: 80 },
      { id: "int04", nome: "Fabiano Eller", posicao: "ZAG", overall: 79 },
      { id: "int05", nome: "César", posicao: "LAT", overall: 77 },
      { id: "int06", nome: "Wágner", posicao: "VOL", overall: 79 },
      { id: "int07", nome: "Fernandão", posicao: "VOL", overall: 80 },
      { id: "int08", nome: "Iarley", posicao: "MEI", overall: 82 },
      { id: "int09", nome: "Alex Bastos", posicao: "MEI", overall: 76 },
      { id: "int10", nome: "Tinga", posicao: "MEI", overall: 80 },
      { id: "int11", nome: "Rafael Sóbis", posicao: "ATA", overall: 84 },
    ],
  },

  santos: {
    nome: "Santos",
    temporada: 2011,
    overTime: [{ def: 78, mei: 84, ata: 88 }],
    jogadores: [
      { id: "san01", nome: "Rafael", posicao: "GOL", overall: 79 },
      { id: "san02", nome: "Léo", posicao: "LAT", overall: 77 },
      { id: "san03", nome: "Durval", posicao: "ZAG", overall: 79 },
      { id: "san04", nome: "Edu Dracena", posicao: "ZAG", overall: 82 },
      { id: "san05", nome: "Danilo", posicao: "LAT", overall: 80 },
      { id: "san06", nome: "Arouca", posicao: "VOL", overall: 83 },
      { id: "san07", nome: "Adriano", posicao: "VOL", overall: 79 },
      { id: "san08", nome: "Elano", posicao: "MEI", overall: 84 },
      { id: "san09", nome: "Ganso", posicao: "MEI", overall: 88 },
      { id: "san10", nome: "Neymar", posicao: "ATA", overall: 92 },
      { id: "san11", nome: "Borges", posicao: "ATA", overall: 82 },
    ],
  },

  botafogo: {
    nome: "Botafogo",
    temporada: 2024,
    overTime: [{ def: 82, mei: 83, ata: 85 }],
    jogadores: [
      { id: "bot01", nome: "John", posicao: "GOL", overall: 82 },
      { id: "bot02", nome: "Mateo Ponte", posicao: "LAT", overall: 79 },
      { id: "bot03", nome: "Bastos", posicao: "ZAG", overall: 83 },
      { id: "bot04", nome: "Adryelson", posicao: "ZAG", overall: 80 },
      { id: "bot05", nome: "Alex Telles", posicao: "LAT", overall: 82 },
      { id: "bot06", nome: "Marlon Freitas", posicao: "VOL", overall: 83 },
      { id: "bot07", nome: "Danilo Barbosa", posicao: "VOL", overall: 80 },
      { id: "bot08", nome: "Eduardo", posicao: "MEI", overall: 79 },
      { id: "bot09", nome: "Savarino", posicao: "MEI", overall: 85 },
      { id: "bot10", nome: "Luiz Henrique", posicao: "ATA", overall: 84 },
      { id: "bot11", nome: "Tiquinho Soares", posicao: "ATA", overall: 83 },
    ],
  },

  vasco: {
    nome: "Vasco da Gama",
    temporada: 2000,
    overTime: [{ def: 80, mei: 83, ata: 85 }],
    jogadores: [
      { id: "vas01", nome: "Helton", posicao: "GOL", overall: 82 },
      { id: "vas02", nome: "Cáceres", posicao: "LAT", overall: 79 },
      { id: "vas03", nome: "Odvan", posicao: "ZAG", overall: 81 },
      { id: "vas04", nome: "Gonçalves", posicao: "ZAG", overall: 80 },
      { id: "vas05", nome: "Ramon", posicao: "LAT", overall: 78 },
      {
        id: "vas06",
        nome: "Juninho Pernambucano",
        posicao: "VOL",
        overall: 87,
      },
      { id: "vas07", nome: "Index", posicao: "VOL", overall: 78 },
      { id: "vas08", nome: "Pedrinho", posicao: "MEI", overall: 82 },
      { id: "vas09", nome: "Viola", posicao: "MEI", overall: 79 },
      { id: "vas10", nome: "Edmundo", posicao: "ATA", overall: 89 },
      { id: "vas11", nome: "Romário", posicao: "ATA", overall: 92 },
    ],
  },
};

let times = [
  bancoDeTimes.cruzeiro,
  bancoDeTimes.corinthians,
  bancoDeTimes.saopaulo,
  bancoDeTimes.flamengo,
  bancoDeTimes.palmeiras,
  bancoDeTimes.gremio,
  bancoDeTimes.internacional,
  bancoDeTimes.santos,
  bancoDeTimes.botafogo,
  bancoDeTimes.vasco,
];

function sorteiaTime() {
  let sorteio = Math.floor(Math.random() * times.length);

  return times[sorteio];
}

function escolhaJogador() {
  let escalacao = [];

  while (escalacao.length < 11) {
    let time = sorteiaTime();
    console.log(time);
    console.log(escalacao);
    let escolha = prompt("digite o ID do jogador: ");

    let jogadoreEscolhido = time.jogadores.find(
      (jogador) => jogador.id == escolha,
    );

    while (!jogadoreEscolhido) {
      escolha = prompt("ID nao existe, digite denovo: ");

      jogadoreEscolhido = time.jogadores.find(
        (jogador) => jogador.id == escolha,
      );
    }

    let goleiroExiste = escalacao.some((jogador) => jogador.posicao == "GOL");

    while (goleiroExiste && jogadoreEscolhido.posicao == "GOL") {
      escolha = prompt("Ja existe um goleiro no time: ");

      jogadoreEscolhido = time.jogadores.find(
        (jogador) => jogador.id == escolha,
      );
    }

    escalacao.push(jogadoreEscolhido);
  }
  const ordemPosicoes = ["GOL", "ZAG", "LAT", "VOL", "MEI", "ATA"];

  escalacao.sort((a, b) => {
    return ordemPosicoes.indexOf(a.posicao) - ordemPosicoes.indexOf(b.posicao);
  });

  return escalacao;
}

function calcMedia(escalacao) {
  let overtime = escalacao.reduce((acumulador, jogador) => {
    return acumulador + jogador.overall;
  }, 0);

  return overtime / escalacao.length;
}

function formatarEscalacao(escalacao) {
  return escalacao.map(
    (jogador) =>
      `${jogador.nome} - ${jogador.posicao} - Overall: ${jogador.overall}`,
  );
}

function timeContra() {
  let adversario = sorteiaTime();
  let [{ def, mei, ata }] = adversario.overTime;

  let mediaContra = Math.round((def + mei + ata) / 3);

  return { nome: adversario.nome, media: mediaContra };
}

function probabilidadeVitoria(overallTimeA, overallTimeB) {
  let diferenca = overallTimeA - overallTimeB;

  const k = 0.11;

  const probabilidadeA = 1 / (1 + Math.exp(-k * diferenca));

  return probabilidadeA;
}

function calculoProbabilidade(mediaTime, mediaAdversario) {
  const probA = probabilidadeVitoria(mediaTime, mediaAdversario);

  const sorteio = Math.random();

  return sorteio < probA;
}

function mostrarConsole() {
  let escalacao = escolhaJogador();
  let mediaOver = Math.round(calcMedia(escalacao));
  let textoFInal = formatarEscalacao(escalacao);
  let adversario = timeContra();
  let vitoria = calculoProbabilidade(mediaOver, adversario.media);

  console.log(
    `Overall do seu time: ${mediaOver} 
    // Escalação do seu time -------- 
    ${textoFInal.join("\n")}`,
  );

  if (vitoria) {
    console.log(
      "voce ganhou do " +
        adversario.nome +
        ", que tinha " +
        adversario.media +
        " de overall",
    );
  } else {
    console.log(
      "voce perdeu pro " +
        adversario.nome +
        ", que tinha " +
        adversario.media +
        " de overall",
    );
  }
  // if (adversario.media > mediaOver) {
  //   console.log(
  //     "voce perdeu pro " +
  //       adversario.nome +
  //       ", que tinha " +
  //       adversario.media +
  //       " de overall",
  //   );
  // } else if (adversario.media == mediaOver) {
  //   console.log(
  //     "empatou com " +
  //       adversario.nome +
  //       ", que tinha " +
  //       adversario.media +
  //       " de overall",
  //   );
  // } else {
  //   console.log(
  //     "voce ganhou do " +
  //       adversario.nome +
  //       ", que tinha " +
  //       adversario.media +
  //       " de overall",
  //   );
  // }
}

mostrarConsole();
