/* ============================================================
   1. ÍCONES (Lucide)
   A biblioteca precisa ser "ligada" pra desenhar os ícones <i data-lucide="...">
   ============================================================ */
if (window.lucide) {
  lucide.createIcons();
}

/* ============================================================
   2. MENU MOBILE
   Alterna a classe "is-open" no <nav> quando clica no botão hambúrguer
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu automaticamente ao clicar em um link (mobile)
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   3. TEMA CLARO/ESCURO
   Guarda a preferência no localStorage para lembrar na próxima visita.
   Se não houver preferência salva, respeita o tema do sistema operacional.
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ============================================================
   4. NAVEGAÇÃO ATIVA AO ROLAR A PÁGINA
   Usa IntersectionObserver para saber qual seção está visível
   e marcar o link correspondente no menu.
   ============================================================ */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' }); // dispara quando a seção cruza o meio da tela

sections.forEach(section => navObserver.observe(section));

/* ============================================================
   5. ANIMAÇÃO DE ENTRADA AO ROLAR (scroll reveal)
   Adiciona a classe "reveal" em elementos e observa quando entram na tela.
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.section-title, .project-card, .skill-group, .about-text, .about-facts, .contact-form, .contact-info'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ============================================================
   6. FILTRO DE PROJETOS POR CATEGORIA
   Cada .project-card tem data-category (pode ter mais de uma, separada
   por espaço). Os botões .filter-btn têm data-filter. Ao clicar, mostra
   só os cartões cuja categoria bate — ou todos quando o filtro é "all".
   ============================================================ */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Marca o botão ativo
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // Mostra/esconde os cartões
    projectCards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      const match = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !match);
    });
  });
});

/* ============================================================
   7. CONTADORES ANIMADOS (faixa de métricas)
   Anima de 0 até data-count quando a faixa entra na tela (uma vez).
   Respeita prefers-reduced-motion: se ativo, mostra o número final direto.
   ============================================================ */
const statNumbers = document.querySelectorAll('.stat-num');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = Number(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || '';

  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

if (statNumbers.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.6 });

  statNumbers.forEach(el => statsObserver.observe(el));
}

/* ============================================================
   8. ANO DINÂMICO NO RODAPÉ
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   9. FORMULÁRIO DE CONTATO
   Feedback visual ao enviar. O envio real depende de você configurar
   um endpoint no Formspree (https://formspree.io) e colar a URL no
   atributo "action" do <form>, no index.html.
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const actionUrl = contactForm.getAttribute('action');
    if (actionUrl.includes('SEU_ID_AQUI')) {
      formFeedback.textContent = 'Configure seu endpoint do Formspree no index.html para ativar o envio.';
      return;
    }

    formFeedback.textContent = 'Enviando...';

    try {
      const response = await fetch(actionUrl, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        formFeedback.textContent = 'Mensagem enviada! Obrigado pelo contato.';
        contactForm.reset();
      } else {
        formFeedback.textContent = 'Algo deu errado. Tente novamente em alguns instantes.';
      }
    } catch (error) {
      formFeedback.textContent = 'Não foi possível enviar agora. Verifique sua conexão.';
    }
  });
}
