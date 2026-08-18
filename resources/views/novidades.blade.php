{{--
  resources/views/novidades.blade.php

  Convertido de novidades.html — mesma técnica usada em home.blade.php:
  header/footer viraram @include, assets locais viraram raiz-absolutos,
  links .html viraram rotas limpas, URLs externas (Pexels etc., se
  houver) não foram tocadas. Conteúdo ainda hardcoded (1ª passada).
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Novidades — SP Leituras</title>
  <meta
    name="description"
    content="Fique por dentro de tudo o que acontece nos projetos e equipamentos da SP Leituras."
  />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  @include('partials.header', ['active' => 'novidades'])

  <main id="conteudo">
    <div class="page-head">
      <span class="eyebrow-mark" aria-hidden="true"></span>
      <h1>_novidades</h1>
      <p>Fique por dentro de tudo o acontece em nossos projetos e aparelhos.</p>
    </div>

    <section class="container section" style="padding-top:0;">
      <form class="news-toolbar" action="#" role="search">
        <label class="news-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          <input type="search" placeholder="Pesquisar por notícia específica" />
        </label>
        <button type="button" class="news-filter">
          Selecione o equipamento
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </form>

      <div class="news-featured">
        <a class="news-featured__item" href="/novidade-detalhe">
          <img src="/assets/images/news-shelf-reading-featured.jpg" alt="Pessoa lendo um livro em frente a uma estante de biblioteca" loading="lazy" />
          <div class="news-featured__item-body">
            <span class="tag tag--spleituras">_spleituras</span>
            <h3>Encontros regionais debatem políticas públicas para o livro e a leitura em SP</h3>
          </div>
        </a>
        <a class="news-featured__item" href="/novidade-detalhe">
          <img src="/assets/images/news-villa-lobos-leitura.jpg" alt="Jovem lendo em um celular, deitada em um espaço iluminado de amarelo" loading="lazy" />
          <div class="news-featured__item-body">
            <span class="tag tag--bvl">_bvl</span>
            <h3>Biblioteca parque Villa-Lobos torna-se exemplo de revitalização do espaço urbano</h3>
          </div>
        </a>
        <a class="news-featured__item" href="/novidade-detalhe">
          <img src="/assets/images/news-guadalajara-book-fair.jpg" alt="Grupo de autores brasileiros em estande de feira literária" loading="lazy" />
          <div class="news-featured__item-body">
            <span class="tag tag--siseb">_siseb</span>
            <h3>Autores brasileiros avaliam estreia em edição histórica da FIL Guadalajara</h3>
          </div>
        </a>
        <a class="news-featured__item" href="/novidade-detalhe">
          <img src="/assets/images/news-bsp-aerial.jpg" alt="Vista aérea do salão interno da Biblioteca de São Paulo" loading="lazy" />
          <div class="news-featured__item-body">
            <span class="tag tag--bsp">_bsp</span>
            <h3>BSP atinge marca de mais de 22 mil visitantes mensais</h3>
          </div>
        </a>
      </div>

      <ul class="news-list">
        <li class="news-item">
          <a class="news-item__thumb" href="/novidade-detalhe">
            <img src="/assets/images/news-shelf-reading-list.jpg" alt="" loading="lazy" />
          </a>
          <div class="news-item__body">
            <div class="news-item__meta">
              <span class="tag tag--spleituras">_spleituras</span>
            </div>
            <h3><a href="/novidade-detalhe">Encontros regionais debatem políticas públicas para o livro e a leitura em SP</a></h3>
            <span class="news-item__date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              10/02/2025
            </span>
          </div>
          <a class="btn btn--outline news-item__cta" href="/novidade-detalhe">
            saiba mais
            <svg class="btn__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </li>

        <li class="news-item">
          <a class="news-item__thumb" href="/novidade-detalhe">
            <img src="/assets/images/news-biblion-trophies.jpg" alt="" loading="lazy" />
          </a>
          <div class="news-item__body">
            <div class="news-item__meta">
              <span class="tag tag--biblion">_bibliON</span>
            </div>
            <h3><a href="/novidade-detalhe">BibliON recebe prêmio internacional por inovação em leitura</a></h3>
            <span class="news-item__date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              10/02/2025
            </span>
          </div>
          <a class="btn btn--outline news-item__cta" href="/novidade-detalhe">
            saiba mais
            <svg class="btn__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </li>

        <li class="news-item">
          <a class="news-item__thumb" href="/novidade-detalhe">
            <img src="/assets/images/news-cultsp-gestores.jpg" alt="" loading="lazy" />
          </a>
          <div class="news-item__body">
            <div class="news-item__meta">
              <span class="tag tag--spleituras">_spleituras</span>
            </div>
            <h3><a href="/novidade-detalhe">SP Leituras participa do Encontro de Gestores CultSP 2025 e apresenta iniciativas como Viagem Literária e BibliON</a></h3>
            <span class="news-item__date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              10/02/2025
            </span>
          </div>
          <a class="btn btn--outline news-item__cta" href="/novidade-detalhe">
            saiba mais
            <svg class="btn__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </li>

        <li class="news-item">
          <a class="news-item__thumb" href="/novidade-detalhe">
            <img src="/assets/images/news-siseb-posters.jpg" alt="" loading="lazy" />
          </a>
          <div class="news-item__body">
            <div class="news-item__meta">
              <span class="tag tag--siseb">_siseb</span>
            </div>
            <h3><a href="/novidade-detalhe">SisEB é reconhecido como a melhor marca pública do mundo no iF DESIGN AWARD 2025</a></h3>
            <span class="news-item__date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" stroke="currentColor" stroke-width="1.6"/><line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              10/02/2025
            </span>
          </div>
          <a class="btn btn--outline news-item__cta" href="/novidade-detalhe">
            saiba mais
            <svg class="btn__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </li>
      </ul>

      <nav class="pagination" aria-label="Paginação de notícias">
        <a href="#" aria-label="Página anterior">‹</a>
        <a href="#">1</a>
        <span class="is-current" aria-current="page">2</span>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5…</a>
        <a href="#">20</a>
        <a href="#" aria-label="Próxima página">›</a>
      </nav>
    </section>
  </main>

  @include('partials.footer')

  <script src="/js/site-header.js" defer></script>
  <script src="/js/site-footer.js" defer></script>
</body>
</html>
