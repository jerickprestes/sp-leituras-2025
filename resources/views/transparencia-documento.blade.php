{{--
  resources/views/transparencia-documento.blade.php

  Convertido de transparencia-documento.html — mesma técnica usada em home.blade.php:
  header/footer viraram @include, assets locais viraram raiz-absolutos,
  links .html viraram rotas limpas, URLs externas (Pexels etc., se
  houver) não foram tocadas. Conteúdo ainda hardcoded (1ª passada).
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estatuto Social — Transparência | SP Leituras</title>
  <meta
    name="description"
    content="Consulte e baixe o Estatuto Social da SP Leituras."
  />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  @include('partials.header', ['active' => 'transparencia'])

  <main id="conteudo">
    <div class="page-head">
      <span class="eyebrow-mark" aria-hidden="true"></span>
      <h1>Estatuto Social</h1>
      <p>Estamos sempre abertos a parcerias, diálogos e sugestões, entre em contato:</p>
    </div>

    <section class="section container" style="padding-top:0;">
      <p style="margin-bottom:22px; text-align:center;">
        <a href="/transparencia" class="mono-label" style="color:var(--color-ink-70);">← voltar para transparência</a>
      </p>

      <figure class="doc-preview">
        <img
          src="/assets/images/doc-estatuto-social-preview.jpg"
          alt="Primeira página do documento Estatuto Social da SP Leituras"
          loading="lazy"
        />
      </figure>

      <div class="doc-preview-actions">
        <a href="/assets/images/doc-estatuto-social-preview.jpg" download class="btn btn--pink">
          baixar PDF
          <svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </section>
  </main>

  @include('partials.footer')

  <script src="/js/site-header.js" defer></script>
  <script src="/js/site-footer.js" defer></script>
</body>
</html>
