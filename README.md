<<<<<<< HEAD
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
=======
# SP Leituras — site institucional (estático, sem servidor)

Site multi-página gerado a partir dos mockups em PDF fornecidos, usando **HTML5 + CSS3 +
JavaScript vanilla**, sem frameworks, sem build tools e sem dependências externas (nenhum
CDN). O header e o footer são **Web Components** (Custom Elements) com o HTML embutido
diretamente no `.js`, então tudo funciona 100% offline, inclusive abrindo os arquivos
direto do disco (`file://`) — não é necessário nenhum servidor local.

## Como abrir

Dê duplo clique em `index.html` (ou abra pelo navegador com `Ctrl/Cmd+O`). Todos os links,
estilos, fontes, imagens e scripts são referenciados com caminhos relativos, então o site
funciona tanto local quanto publicado em qualquer hospedagem estática.

## Estrutura de pastas

```
site/
├── index.html                     → Home
├── contato.html                   → Contato (formulário + dados)
├── equipamento.html                → Equipamento BibliON (app, BiblionCast, FAQ)
├── novidades.html                  → Listagem de notícias
├── novidade-detalhe.html           → Página de uma notícia (artigo do SisEB/iF Design Award)
├── transparencia.html              → Transparência (acordeão de documentos)
├── transparencia-documento.html    → Visualização do Estatuto Social
├── css/
│   └── style.css                  → Todos os estilos (tokens, componentes, responsivo)
├── js/
│   ├── site-header.js             → Web Component <site-header>
│   └── site-footer.js             → Web Component <site-footer>
├── assets/
│   ├── images/                    → Logos (.webp, transparentes) e fotos (.jpg, opacas)
│   └── fonts/                     → Poppins, Inter e Space Mono (self-hosted, .woff2)
└── README.md
```

## Arquitetura do header/footer

`<site-header active="novidades"></site-header>` e `<site-footer></site-footer>` são
Custom Elements registrados em `js/site-header.js` e `js/site-footer.js`. No
`connectedCallback()`, cada componente injeta seu HTML via template string (nunca por
`fetch`, `innerHTML` de arquivo externo, `<iframe>` ou `<object>`), o que evita qualquer
erro de CORS ao abrir via `file://`. O atributo `active` no header destaca o item de menu
correspondente à página atual (`aria-current="page"`).

O menu mobile (abaixo de 960px) é um toggle simples controlado por uma classe
(`is-open`) — sem dependências.

## Tipografia

As fontes usadas no design original não puderam ser identificadas com precisão (os PDFs
exportam texto como paths/Type3, sem metadata de fonte). Foram escolhidas as fontes do
Google Fonts mais próximas visualmente e hospedadas localmente em `assets/fonts/`
(sem CDN, para manter o site 100% offline):

- **Poppins** (600/700/800) — títulos e wordmark
- **Inter** (400/500/600/700) — texto corrido
- **Space Mono** (400/700) — labels, navegação, rótulos em caixa alta (`_estilo` com
  underscore, como no design original)

## Imagens

Todas as imagens foram extraídas dos PDFs fornecidos e reexportadas seguindo a regra:

- **Transparentes** (logos, ilustrações, ícones) → `.webp`
- **Opacas** (fotos) → `.jpg`

O preview do Estatuto Social (`transparencia-documento.html`) usa uma imagem estática
(`doc-estatuto-social-preview.jpg`) recortada do mockup como espaço reservado — o botão
"baixar PDF" deve ser apontado para o PDF real do Estatuto Social assim que o
arquivo definitivo estiver disponível.

## Links sem página própria

Os PDFs fornecidos cobriam 6 telas. Alguns itens de menu/rodapé (Institucional, Nossa
atuação, Regimento Interno, Conselho de Administração e Fiscal, Equipe) não tinham
mockup dedicado — foram apontados para a seção mais próxima já existente (ex.: `Nossa
atuação` → `index.html#nossa-atuacao`, `Regimento Interno` → `transparencia.html`).
Basta trocar o `href` correspondente em `js/site-header.js` / `js/site-footer.js`
quando as páginas reais existirem.

## Acessibilidade

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- `alt` em todas as imagens.
- Foco de teclado visível em links, botões e campos de formulário.
- `prefers-reduced-motion` respeitado (desativa transições/scroll suave).
- Contraste de cores verificado sobre o fundo creme (`#f8f3ea`) e nas seções escuras.
>>>>>>> origin/main
