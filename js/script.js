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

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

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
   6. ANO DINÂMICO NO RODAPÉ
   ============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   7. FORMULÁRIO DE CONTATO
   Feedback visual ao enviar. O envio real depende de você configurar
   um endpoint no Formspree (https://formspree.io) e colar a URL no
   atributo "action" do <form>, no index.html.
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

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
