function initMap() {
  const location = { lat: -23.55052, lng: -46.633308 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Navalha Sampa Barbearia",
  });
}

function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".fade-in, .slide-up, .fade-in-down"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  elements.forEach((el) => observer.observe(el));
}

function animarBotao() {
  const botoes = document.querySelectorAll(".botao");
  botoes.forEach((botao) => {
    botao.addEventListener("mouseover", () => {
      botao.style.transform = "scale(1.1)";
    });
    botao.addEventListener("mouseout", () => {
      botao.style.transform = "scale(1)";
    });
  });
}

function mostrarTexto(tipo) {
  const textoSobre = document.getElementById("texto-sobre");

  if (tipo === "cliente") {
    textoSobre.innerHTML = `Na <span class="destaque">Navalha Sampa</span>, você encontra mais do que um simples corte de cabelo — aqui você vive uma experiência completa, pensada nos mínimos detalhes para o seu conforto e estilo.

Nosso compromisso é oferecer qualidade, estilo e preço justo, em um ambiente acolhedor e profissional. Cada atendimento é feito por barbeiros que são da casa, parte essencial da nossa marca e cultura. Aqui, você não encontra apenas um profissional — você encontra alguém que veste a camisa da <span class="destaque">Navalha Sampa</span>, entende seu estilo e te atende com atenção de verdade.

Seja para um corte clássico, um visual moderno ou um cuidado especial com a barba, usamos os melhores produtos e oferecemos um atendimento personalizado, que respeita o seu tempo e valoriza sua identidade.

Confiança, compromisso e resultado de verdade.
Vem conhecer a barbearia que está revolucionando o centro de São Paulo.
Agende seu horário e descubra por que cada vez mais clientes escolhem a <span class="destaque">Navalha Sampa</span> como seu lugar de confiança.
`;
  } else if (tipo === "barbeiro") {
    textoSobre.innerHTML = `Nossa história começa com Jair Badia, um verdadeiro exemplo de superação. Jair não veio de família rica, muito pelo contrário. Ainda jovem, tornou-se pai e precisou aprender a empreender para sobreviver. Começou como faxineiro no ramo alimentício, enfrentando jornadas difíceis e desafios diários. Mas com garra, visão e atitude, transformou obstáculos em aprendizado e construiu sua própria trajetória de sucesso, faturando milhões no ramo alimenticio.

Hoje, toda essa vivência é aplicada na transformação do universo da barbearia.

No da <span class="destaque">Navalha Sampa</span> , buscamos muito mais do que barbeiros — buscamos parceiros de visão. Aqui, você não é apenas mais um: é parte de um time que acredita no talento, na liberdade de crescer e no respeito pelo seu trabalho.

Você terá estrutura, visibilidade e oportunidades reais para evoluir como profissional e como pessoa. A gente caminha junto, respeita seu estilo e te apoia para alcançar seus sonhos com liberdade, autonomia e valorização.

Se você pensa grande, quer crescer de verdade e fazer parte de algo que vai além do comum, o <span class="destaque">Navalha Sampa</span> é o seu lugar.

Venha transformar o seu futuro com a gente.
Aqui, o sucesso é compartilhado.`;
  }
}

function adicionarEventoMostrarTexto() {
  const btnCliente = document.getElementById('btnCliente');
  const btnBarbeiro = document.getElementById('btnBarbeiro');

  if (btnCliente) {
    btnCliente.addEventListener('click', () => mostrarTexto('cliente'));
  }

  if (btnBarbeiro) {
    btnBarbeiro.addEventListener('click', () => mostrarTexto('barbeiro'));
  }
}

const imagens = [
  'img/imagem navaha sampa.jpg',
  'img/foto da equipe.jpg',
  'img/Foto vine navalha .jpg',
  'img/Otavio imagem navalha .jpg',
  'img/cliente foto barba.jpg'
];

let indiceAtual = 0;

const livroImagens = document.getElementById('livroImagens');
const btnEsquerda = document.querySelector('.livro-btn.left');
const btnDireita = document.querySelector('.livro-btn.right');

function atualizarImagem() {
  livroImagens.innerHTML = `<img src="${imagens[indiceAtual]}" alt="Imagem ${indiceAtual}" />`;

  // Atualiza visibilidade dos botões
  btnEsquerda.style.display = indiceAtual === 0 ? 'none' : 'block';
  btnDireita.style.display = indiceAtual === imagens.length - 1 ? 'none' : 'block';
}

function avancarPagina() {
  if (indiceAtual < imagens.length - 1) {
    indiceAtual++;
    atualizarImagem();
  }
}

function voltarPagina() {
  if (indiceAtual > 0) {
    indiceAtual--;
    atualizarImagem();
  }
}

// Inicializa a primeira imagem corretamente
atualizarImagem();

let startX = 0;
let moveX = 0;

function touchStart(e) {
  startX = e.touches[0].clientX;
}

function touchMove(e) {
  moveX = e.touches[0].clientX;
}

function touchEnd() {
  const diff = startX - moveX;

  if (Math.abs(diff) > 50) { // só considera swipe se for maior que 50px
    if (diff > 0) {
      // Swipou pra esquerda (avança)
      avancarPagina();
    } else {
      // Swipou pra direita (volta)
      voltarPagina();
    }
  }

  // reseta os valores
  startX = 0;
  moveX = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  animateOnScroll();
  animarBotao();
  adicionarEventoMostrarTexto();

  // Adiciona eventos para botões do carrossel, se existirem
  if (btnEsquerda) btnEsquerda.addEventListener('click', voltarPagina);
  if (btnDireita) btnDireita.addEventListener('click', avancarPagina);

  // Eventos de touch para o carrossel, se existir o container
  if (livroImagens) {
    livroImagens.addEventListener('touchstart', touchStart);
    livroImagens.addEventListener('touchmove', touchMove);
    livroImagens.addEventListener('touchend', touchEnd);
  }
});

  document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("video");
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.log("Autoplay falhou:", err);
      });
    }
  });
