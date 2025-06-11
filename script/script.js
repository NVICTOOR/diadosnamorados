// 🎉 Confetes (corações animados)
function criarConfete() {
  const confete = document.createElement('div');
  confete.classList.add('coracao');

  const cores = ['#f39c12', '#e74c3c', '#9b59b6', '#2ecc71', '#3498db'];
  confete.style.color = cores[Math.floor(Math.random() * cores.length)];
  confete.style.left = Math.random() * window.innerWidth + 'px';
  confete.style.fontSize = (Math.random() * 10 + 10) + 'px';
  confete.style.position = 'absolute';
  confete.style.top = '0';
  confete.style.animation = `cair ${Math.random() * 3 + 2}s linear forwards`;

  confete.textContent = '❤️';
  document.getElementById('confetes-container')?.appendChild(confete);

  setTimeout(() => confete.remove(), 5000);
}
setInterval(criarConfete, 200);

// 📸 Carrossel principal
let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));
  if (slides[index]) {
    slides[index].style.display = "block";
    dots[index]?.classList.add("active");
  }
}

function carrossel() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
  setTimeout(carrossel, 3000);
}

function moveToSlide(index) {
  slideIndex = index;
  showSlide(slideIndex);
}

if (slides.length > 0) {
  showSlide(slideIndex);
  setTimeout(carrossel, 3000);
}

// 📱 Swipe no carrossel (mobile)
let startX = 0;
let endX = 0;
const carrosselEl = document.querySelector(".carrossel");

if (carrosselEl) {
  carrosselEl.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  carrosselEl.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
}

function handleSwipe() {
  if (startX - endX > 50) {
    slideIndex = (slideIndex + 1) % slides.length;
  } else if (endX - startX > 50) {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  }
  showSlide(slideIndex);
}

// ❤️ Curtidas globais
const likeIcon = document.getElementById("likeIcon");
const quantLike = document.getElementById("quant_like");
let curtidasAtuais = parseInt(quantLike?.innerText.replace('.', '') || '0');

function aumentarCurtidas() {
  curtidasAtuais++;
  if (quantLike) {
    quantLike.innerText = curtidasAtuais.toLocaleString('pt-BR');
  }
}
setInterval(aumentarCurtidas, 50);

if (likeIcon) {
  likeIcon.addEventListener("click", () => {
    likeIcon.style.animation = "pulse 0.3s";
    setTimeout(() => likeIcon.style.animation = "", 300);
  });
}

// 👍 Curtir comentários individuais
const botoesCurtir = document.querySelectorAll('.curtir-btn');
botoesCurtir.forEach(botao => {
  botao.addEventListener('click', () => {
    const contador = botao.querySelector('.contador');
    if (contador) {
      contador.textContent = parseInt(contador.textContent || '0') + 1;
    }
  });
});

// 💕 Carrossel Luiza (imagens juntas)
const carrosselLuiza = document.querySelector(".carrosselLuiza");
const totalImagensLuiza = carrosselLuiza?.querySelectorAll("img").length || 0;
let posicaoLuiza = 0;

function avancarLuiza() {
  if (!carrosselLuiza || totalImagensLuiza === 0) return;
  posicaoLuiza = (posicaoLuiza + 1) % totalImagensLuiza;
  atualizarCarrosselLuiza();
}

function voltarLuiza() {
  if (!carrosselLuiza || totalImagensLuiza === 0) return;
  posicaoLuiza = (posicaoLuiza - 1 + totalImagensLuiza) % totalImagensLuiza;
  atualizarCarrosselLuiza();
}

function atualizarCarrosselLuiza() {
  carrosselLuiza.style.transform = `translateX(-${posicaoLuiza * 100}%)`;
}

if (totalImagensLuiza > 0) {
  setInterval(avancarLuiza, 5000);
}

// 🔊 Áudio com IntersectionObserver
const audios = document.querySelectorAll('.audio');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

audios.forEach(audio => observer.observe(audio));

// ⏳ Contagem regressiva
function atualizarContagem() {
  const agora = new Date();
  const dataAlvo = new Date(2025, 5, 17, 0, 0, 0); // 17 de Junho de 2025
  const tempoRestante = dataAlvo - agora;

  const diasEl = document.getElementById('dias');
  const horasEl = document.getElementById('horas');
  const minutosEl = document.getElementById('minutos');
  const segundosEl = document.getElementById('segundos');

  if (!diasEl || !horasEl || !minutosEl || !segundosEl) return;

  if (tempoRestante <= 0) {
    diasEl.innerHTML = "0<span>Dias</span>";
    horasEl.innerHTML = "0<span>Horas</span>";
    minutosEl.innerHTML = "0<span>Minutos</span>";
    segundosEl.innerHTML = "0<span>Segundos</span>";
    return;
  }

  const segundos = Math.floor((tempoRestante / 1000) % 60);
  const minutos = Math.floor((tempoRestante / 1000 / 60) % 60);
  const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

  diasEl.innerHTML = `${dias}<span>Dias</span>`;
  horasEl.innerHTML = `${horas}<span>Horas</span>`;
  minutosEl.innerHTML = `${minutos}<span>Minutos</span>`;
  segundosEl.innerHTML = `${segundos}<span>Segundos</span>`;
}

setInterval(atualizarContagem, 1000);
atualizarContagem();
