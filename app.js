// ==========================================================================
// INICIALIZAÇÃO & SCRIPTS SIMPLES
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupSlider();
  setupFAQ();
  setupCountdown();
  setupSocialProof();
});

// ==========================================================================
// CARROSSEL DE FOTOS DAS MÚSICAS NO DRIVE
// ==========================================================================
function setupSlider() {
  const slides = document.querySelectorAll(".slide-item");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  
  if (!slides || slides.length === 0) return;
  
  let currentSlide = 0;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showSlide(currentSlide - 1);
    });
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showSlide(currentSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(dot.dataset.index);
      showSlide(index);
    });
  });

  // Troca automática de foto a cada 4.5 segundos
  setInterval(() => {
    showSlide(currentSlide + 1);
  }, 4500);
}

// ==========================================================================
// PERGUNTAS FREQUENTES (FAQ ACCORDION)
// ==========================================================================
function setupFAQ() {
  const faqButtons = document.querySelectorAll(".faq-btn");
  
  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      const isActive = card.classList.contains("active");
      
      // Fecha todos os outros
      document.querySelectorAll(".faq-card").forEach(c => c.classList.remove("active"));
      
      // Abre o clicado
      if (!isActive) {
        card.classList.add("active");
      }
    });
  });
}

// ==========================================================================
// CONTADOR REGRESSIVO DE URGÊNCIA (15 MINUTOS)
// ==========================================================================
function setupCountdown() {
  const timerDisplay = document.getElementById("countdown-timer");
  if (!timerDisplay) return;

  let totalSeconds = 14 * 60 + 59;

  setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (totalSeconds <= 0) {
      totalSeconds = 15 * 60;
    } else {
      totalSeconds--;
    }
  }, 1000);
}

// ==========================================================================
// NOTIFICAÇÕES DE COMPRA RECENTE (PROVA SOCIAL)
// ==========================================================================
const buyers = [
  "Fernando S. (Belo Horizonte - MG)",
  "Thiago M. (São Paulo - SP)",
  "Carlos R. (Curitiba - PR)",
  "Rodrigo P. (Goiânia - GO)",
  "Marcos A. (Campinas - SP)",
  "Lucas B. (Rio de Janeiro - RJ)",
  "Gabriel D. (Brasília - DF)",
  "Bruno F. (Porto Alegre - RS)",
  "Felipe N. (Salvador - BA)",
  "Gustavo L. (Fortaleza - CE)"
];

function setupSocialProof() {
  const toast = document.getElementById("social-toast");
  const nameEl = document.getElementById("toast-user-name");
  if (!toast || !nameEl) return;

  function showToast() {
    const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
    nameEl.textContent = randomBuyer;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  // Primeiro aviso após 5 segundos
  setTimeout(showToast, 5000);

  // Repete a cada 18 segundos
  setInterval(showToast, 18000);
}
