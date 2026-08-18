# SP Leituras — site institucional

> 📌 **Marco do projeto:** esta é a **última versão do site em HTML/CSS/JS vanilla**.
> A partir de **18/08/2026**, o projeto está pronto para iniciar a migração para
> **Laravel**. Esta branch documenta o estado final da versão estática — a versão
> Laravel deve partir daqui.

Site multi-página em **HTML5 + CSS3 + JavaScript vanilla**, sem frameworks nem build
tools. O header e o footer são **Web Components** (Custom Elements) com o HTML embutido
diretamente no `.js`, então abrem sem erro de CORS mesmo direto do disco (`file://`).

⚠️ **Não é mais 100% offline.** Ao longo das últimas atualizações, várias imagens
(carrossel do hero, fundo de "reconhecimento e prêmios", galerias da sanfona de
equipamentos e a galeria do rodapé) passaram a usar fotos hospedadas no CDN do Pexels
(`images.pexels.com`) em vez de arquivos locais. Isso funciona perfeitamente no site
publicado, mas exige internet — abrir via `file://` sem conexão vai mostrar esses espaços
em branco. Ver a seção **Imagens** mais abaixo para o que é local e o que é externo.

## Como abrir

Duplo clique em `index.html` (ou `Ctrl/Cmd+O` no navegador). Links, estilos, fontes e
scripts continuam todos com caminhos relativos — funciona tanto local (com a ressalva
acima) quanto publicado em qualquer hospedagem estática. O projeto está publicado via
GitHub Pages.

## Estrutura de pastas

```
site/
├── index.html                     → Home (carrossel, seções em tela cheia, sanfona, etc.)
├── contato.html                   → Contato (formulário + dados)
├── equipamento.html               → Equipamento BibliON (app, BiblionCast, FAQ)
├── novidades.html                 → Listagem de notícias
├── novidade-detalhe.html          → Página de uma notícia
├── transparencia.html             → Transparência (acordeão de documentos)
├── transparencia-documento.html   → Visualização do Estatuto Social
├── css/
│   └── style.css                  → Todos os estilos (tokens, componentes, responsivo)
├── js/
│   ├── site-header.js             → Web Component <site-header> (nav, drawer, busca)
│   ├── site-footer.js             → Web Component <site-footer> (galeria, lightbox)
│   └── site-interactions.js       → Interações de página (loader, carrosséis, sanfonas,
│                                     scroll-snap, paginação por seção, fade-in)
├── assets/
│   ├── images/                    → Logos (.webp) e fotos originais (.jpg) — locais
│   └── fonts/                     → Poppins, Inter e Space Mono (self-hosted, .woff2)
└── README.md
```

**Novo:** `js/site-interactions.js` cresceu bastante e hoje concentra toda a lógica que
não é exclusiva de um componente — vale ler antes de mexer em qualquer seção da home.

## `index.html` só — o resto das páginas não recebeu as novas funcionalidades

Praticamente todas as novidades desta leva (carrossel do hero, seções em tela cheia,
sanfona interativa, tela de carregamento, etc.) foram implementadas **só na home**. As
demais páginas (`contato.html`, `novidades.html` etc.) continuam na versão anterior —
usam `<site-header>`/`<site-footer>` normalmente, mas não têm `.snap-section`, loader,
nem os carrosséis. Se quiser esse comportamento nelas também, é replicar as classes/
scripts relevantes.

## Header (`site-header.js`)

- **Nav de desktop** (≥960px): igual antes, links horizontais + `aria-current="page"`
  no item ativo via atributo `active`.
- **Mobile (<960px):** virou um grid de 2 colunas (marca à esquerda, ações à direita),
  com a régua na linha de baixo — não é mais `flex-direction: row` simples (essa
  abordagem quebrava o layout, foi substituída).
- **Menu mobile agora é um Navigation Drawer**, não um dropdown: painel deslizando da
  direita, com overlay escurecido, botão de fechar, `Esc`, clique fora, clique em link
  fecha, `scroll-lock` no body enquanto aberto, e foco gerenciado (abre → vai pro botão
  X; fecha → volta pro hambúrguer).
- **Busca off-canvas** (novo): o ícone da lupa abre um painel deslizando do **topo**,
  funciona em **qualquer largura de tela** (diferente do menu, que é mobile-only).
  Mesmos cuidados de UX do drawer. Sem busca de verdade implementada ainda — o form só
  navega pra `novidades.html?q=...` como placeholder.
- **Header compacto:** encolhe (logo menor, menos padding) assim que o usuário rola
  além do label "novidades" da home — não mais "depois que a primeira seção some".
  Usa `IntersectionObserver` com `rootMargin` calculado a partir da própria altura do
  header.
- **`--header-h`:** o header mede a própria altura (síncrono, no `connectedCallback`,
  mais um `ResizeObserver` pras mudanças seguintes) e publica numa CSS var. Ela é usada
  como `scroll-margin-top` em toda `.snap-section`, pra o header sticky não cobrir o
  topo de cada seção ao rolar.

## Seções em tela cheia (scroll-snap)

Novo na home: as seções principais (`.snap-section`) ocupam `min-height: 100vh` cada,
com `scroll-snap-align`.

- **Desktop:** `scroll-snap-type: y proximity` (não `mandatory` — esse valor forçava a
  página a pular sozinha assim que carregava, porque a hero foi excluída do encaixe
  pra caber inteira na tela e `mandatory` exige repouso sempre num ponto válido).
  A hero é a única seção sem encaixe.
- **Mobile (<719px):** o encaixe inteiro é desligado (`scroll-snap-type: none`) — estava
  atrapalhando a rolagem lá.
- **Botão de paginação:** duas setas fixas no canto inferior direito — uma desce pra
  próxima seção (sempre visível no desktop; no mobile só aparece na última seção, onde
  vira "voltar ao topo"), outra sobe pra anterior (desktop only, escondida enquanto a
  hero está em vista).

## Carrossel do hero

A antiga imagem estática virou um carrossel de banners de verdade — troca imagem,
título, texto **e** link de destino juntos, não só a foto.

- **Fonte de dados em HTML puro**, escondida (`.hero-slides`, `hidden`) — cada banner é
  um bloco simples (`<img>` + `<h2>` + `<p>` + `data-href`). Editar é duplicar um bloco,
  sem precisar mexer em JSON.
- Autoplay a cada 5s; setas e cliques na prévia resetam o temporizador.
- **Prévia dos próximos banners** abaixo do card principal: 3 posições no desktop, 2 no
  mobile, com wraparound — clicável, pula direto pro banner.
- Setas de navegação ficam **sobre a foto**, canto inferior direito (não dá pra colocar
  `<button>` dentro do `<a>` que envolve o card — há um wrapper `.hero__stage` só pra
  isso).
- No desktop, a altura do card é calculada pra caber a tela toda junto com o header
  (`calc(100vh - var(--header-h))`), com a imagem "elástica" preenchendo o que sobra.

## Sanfona de equipamentos (`#equipamentos`)

Os 5 itens (SISEB, Biblioteca de São Paulo, Biblioteca Villa-Lobos, BibliON, Centro
Cultural) começam todos **fechados**. O SISEB abre sozinho quando a seção fica ~60%
visível na tela (efeito de revelação). Cada item tem sua própria mini-galeria de fotos
com fade, e um botão "ver página completa" (só o BibliON aponta pra uma página real).

## Reconhecimento e prêmios

Os 4 cards viraram **clicáveis** (não hover — funciona igual em qualquer dispositivo).
Clicar um card mostra uma foto de fundo cobrindo a seção inteira, esconde os outros
cards, e revela um bloco extra (3 fotos + texto) dentro do card ativo. Em telas com
mouse de verdade, passar o mouse (sem clicar) mostra uma dica "clique para saber mais".

## Galeria do rodapé + lightbox

Novidade adicionada ao `site-footer.js`: uma linha de **5 fotos visíveis por vez**, com
setas de navegação e **loop infinito** sobre 8 fotos no total (fonte de dados também em
HTML puro, mesmo padrão do hero). Clicar numa foto abre ela grande, centralizada, num
**lightbox** (modal de visualização) — overlay escurecido, X, `Esc`, clique fora,
`scroll-lock`, foco gerenciado. O rodapé como um todo está travado em `100vh`, dividido
em dois blocos fixos de `50vh`: a galeria em cima, as informações institucionais embaixo.

## Tela de carregamento

Novo: `#siteLoader` (só em `index.html`) — logo piscando, fica visível por pelo menos 2
segundos mesmo em conexões rápidas, trava o scroll enquanto isso.

## Animação de entrada (fade-in)

Os elementos de cada seção aparecem um de cada vez (não todos juntos) conforme a seção
entra em vista — heurística automática via JS, sem precisar marcar cada elemento à mão
no HTML. Primeira versão, pode precisar de ajuste fino seção por seção.

## Tipografia

Sem mudanças: Poppins (títulos), Inter (texto corrido), Space Mono (labels/navegação),
todas self-hosted em `assets/fonts/`.

## Imagens

**Locais** (self-hosted, `assets/images/`) — como sempre foram: logos de patrocinadores/
parceiros (seção dedicada), fotos originais extraídas dos PDFs (`hero-biblioteca-
villa-lobos.jpg`, `equipamentos-biblioteca-interior.jpg`), ilustrações do BibliON, o
preview do Estatuto Social.

**Externas** (Pexels, `images.pexels.com`, precisam de internet) — adicionadas nesta
leva de mudanças como fotos de teste/placeholder, em posições que antes usavam logos
de patrocinadores indevidamente como se fossem fotos (causava distorção visual):
banners 2–4 do carrossel do hero, fundo e blocos extras de "reconhecimento e prêmios",
a 3ª foto de cada galeria da sanfona de equipamentos, e as 8 fotos da galeria do
rodapé. **Se quiser voltar a ser 100% offline**, essas imagens precisam ser baixadas e
salvas em `assets/images/`, trocando as URLs nos respectivos arquivos.

O preview do Estatuto Social continua sendo um espaço reservado — o botão "baixar PDF"
em `transparencia-documento.html` precisa apontar pro PDF real assim que existir.

## Conteúdo pendente (placeholders)

Vários textos e imagens ainda são de teste, marcados com `<!-- TODO -->` no HTML —
precisam ser trocados por conteúdo real:

- Banners 2, 3 e 4 do carrossel do hero (título/texto/link).
- Texto de Biblioteca de São Paulo, Villa-Lobos e Centro Cultural na sanfona (só o
  SISEB tem texto real).
- Texto complementar dos 4 cards de "reconhecimento e prêmios".
- As 8 fotos da galeria do rodapé.

## Links sem página própria

Sem mudanças: alguns itens de menu/rodapé (Institucional, Regimento Interno, Conselho
de Administração e Fiscal, Equipe) ainda apontam pra seções existentes em vez de
páginas próprias — trocar o `href` em `site-header.js`/`site-footer.js` quando as
páginas reais existirem.

## Acessibilidade

Mantido e ampliado: HTML5 semântico, `alt` em imagens, foco de teclado visível,
`prefers-reduced-motion` respeitado. Os novos componentes interativos (drawer, busca,
lightbox, sanfona, cards de prêmios) usam `aria-expanded`/`aria-pressed`/`role`
conforme o padrão, e gerenciam foco ao abrir/fechar.
