# Portfólio — Projeto de Aprendizado

Portfólio estático feito com **HTML, CSS e JavaScript puros** — sem frameworks, sem build tools.
A ideia é que você entenda cada linha e consiga modificar o projeto com confiança.

## Estrutura

```
portfolio/
├── index.html        → estrutura e conteúdo
├── css/style.css      → estilos, tema claro/escuro, responsivo
├── js/script.js        → menu mobile, tema, animações, formulário
└── assets/             → coloque aqui suas imagens (foto, favicon etc.)
```

## Como rodar localmente

1. Abra a pasta no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito no `index.html` → "Open with Live Server".
4. O navegador abre com atualização automática a cada alteração salva.

(Alternativa sem extensão: simplesmente abra o `index.html` direto no navegador.)

## O que customizar primeiro

- [ ] Troque "Seu Nome" e as iniciais "SN" no `index.html`
- [ ] Escreva seu texto real na seção `#sobre`
- [ ] Substitua os 3 projetos de exemplo pelos seus (título, descrição, links)
- [ ] Atualize e-mail, GitHub e LinkedIn na seção `#contato`
- [ ] Crie uma conta gratuita em [formspree.io](https://formspree.io) e troque `SEU_ID_AQUI` no `action` do formulário
- [ ] Ajuste as cores em `:root` no topo do `style.css` se quiser uma paleta diferente

## Como publicar gratuitamente

**Opção 1 — GitHub Pages**
1. Crie um repositório no GitHub e suba os arquivos.
2. Vá em Settings → Pages → selecione a branch `main` → Save.
3. Seu site fica em `https://seu-usuario.github.io/nome-do-repo`.

**Opção 2 — Netlify (mais simples)**
1. Crie conta em [netlify.com](https://netlify.com).
2. Arraste a pasta do projeto pra área de deploy do painel.
3. Pronto — você recebe uma URL pública na hora.

## Exercícios para evoluir o projeto

Depois que estiver com seu conteúdo real, tente:

1. **Filtro de projetos** — botões "Todos / HTML / JS / CSS" que escondem cards via JS.
2. **Favicon** — gere um em [favicon.io](https://favicon.io) e adicione no `<head>`.
3. **Lighthouse** — abra o DevTools do Chrome → aba Lighthouse → rode uma auditoria e corrija o que aparecer.
4. **Acessibilidade** — navegue pelo site só com Tab no teclado; veja se todo elemento clicável é alcançável.
5. **Git** — inicialize um repositório (`git init`) e faça commits pequenos a cada funcionalidade adicionada, em vez de um commit gigante no final.

## Tecnologias usadas (todas gratuitas)

- HTML5 semântico
- CSS3 (Custom Properties, Flexbox, Grid, `prefers-color-scheme`)
- JavaScript (IntersectionObserver, localStorage, Fetch API)
- [Google Fonts](https://fonts.google.com) — Space Grotesk, Inter, JetBrains Mono
- [Lucide Icons](https://lucide.dev) — via CDN
- [Formspree](https://formspree.io) — envio do formulário sem backend próprio
