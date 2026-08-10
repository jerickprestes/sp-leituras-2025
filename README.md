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
