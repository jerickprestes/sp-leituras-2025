# SP Leituras — site institucional (Laravel)

Site institucional multi-página da SP Leituras. Originalmente construído como HTML5 + CSS3 +
JavaScript vanilla (sem frameworks, sem build tools), foi migrado para **Laravel + Blade**,
mantendo o conteúdo e o visual idênticos ao original nesta primeira fase (hardcoded, sem
banco de dados ainda).

## Como rodar localmente

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan serve   # http://127.0.0.1:8000
```

## Estrutura

```
resources/views/
├── partials/
│   ├── header.blade.php     → Antigo Web Component <site-header>
│   └── footer.blade.php     → Antigo Web Component <site-footer>
├── home.blade.php
├── contato.blade.php
├── equipamento.blade.php
├── novidades.blade.php
├── novidade-detalhe.blade.php
├── transparencia.blade.php
└── transparencia-documento.blade.php

routes/web.php               → Uma rota nomeada por página (Route::view())

public/
├── css/                     → Estilos (migrado de css/style.css)
├── js/                      → Comportamento (separado do HTML dos antigos Web Components)
└── assets/
    ├── images/               → Logos (.webp) e fotos (.jpg)
    └── fonts/                → Poppins, Inter e Space Mono (self-hosted, .woff2)
```

## Arquitetura do header/footer

O header e o footer eram Web Components (Custom Elements) que injetavam HTML via template
string. Na migração, essa responsabilidade foi separada em duas partes:

- **HTML** → virou os partials Blade `partials/header.blade.php` e `partials/footer.blade.php`,
  incluídos com `@include('partials.header', ['active' => 'novidades'])`. O parâmetro `active`
  substitui o antigo atributo `active="novidades"` do componente, destacando o item de menu
  correspondente à página atual (`aria-current="page"`).
- **Comportamento** (toggle do menu mobile, etc.) → virou JS puro, escutando
  `DOMContentLoaded` em vez de `connectedCallback()`.

## Tipografia

As fontes usadas no design original não puderam ser identificadas com precisão (os PDFs de
mockup exportam texto como paths/Type3, sem metadata de fonte). Foram escolhidas as fontes do
Google Fonts mais próximas visualmente e hospedadas localmente (sem CDN):

- **Poppins** (600/700/800) — títulos e wordmark
- **Inter** (400/500/600/700) — texto corrido
- **Space Mono** (400/700) — labels, navegação, rótulos em caixa alta

## Imagens

Extraídas dos PDFs de mockup e reexportadas seguindo a regra:

- **Transparentes** (logos, ilustrações, ícones) → `.webp`
- **Opacas** (fotos) → `.jpg`

O preview do Estatuto Social (`transparencia-documento`) usa uma imagem estática recortada do
mockup como espaço reservado — o botão "baixar PDF" deve ser apontado para o PDF real do
Estatuto Social assim que o arquivo definitivo estiver disponível.

## Links sem página própria

Os PDFs fornecidos cobriam 6 telas. Alguns itens de menu/rodapé (Institucional, Nossa atuação,
Regimento Interno, Conselho de Administração e Fiscal, Equipe) não tinham mockup dedicado —
foram apontados para a seção mais próxima já existente (ex.: `Nossa atuação` → âncora na home,
`Regimento Interno` → página de transparência). Ajustar o `href` correspondente em
`partials/header.blade.php` / `partials/footer.blade.php` quando as páginas reais existirem.

## Acessibilidade

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- `alt` em todas as imagens.
- Foco de teclado visível em links, botões e campos de formulário.
- `prefers-reduced-motion` respeitado (desativa transições/scroll suave).
- Contraste de cores verificado sobre o fundo creme (`#f8f3ea`) e nas seções escuras.

## Status da migração

- [x] Conteúdo migrado, hardcoded, replicado pixel a pixel do site original.
- [x] Rotas nomeadas, navegação cruzada funcionando.
- [ ] Conteúdo dinâmico (banco de dados, formulários com backend) — próxima fase, fora do
      escopo desta versão.
