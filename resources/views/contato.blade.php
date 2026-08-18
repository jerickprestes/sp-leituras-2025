{{--
  resources/views/contato.blade.php

  Convertido de contato.html — mesma técnica usada em home.blade.php:
  header/footer viraram @include, assets locais viraram raiz-absolutos,
  links .html viraram rotas limpas, URLs externas (Pexels etc., se
  houver) não foram tocadas. Conteúdo ainda hardcoded (1ª passada).
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contato — SP Leituras</title>
  <meta
    name="description"
    content="Estamos sempre abertos a parcerias, diálogos e sugestões. Entre em contato com a SP Leituras."
  />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  @include('partials.header', ['active' => 'contato'])

  <main id="conteudo">
    <div class="page-head">
      <span class="eyebrow-mark" aria-hidden="true"></span>
      <h1>_contato</h1>
      <p>Estamos sempre abertos a parcerias, diálogos e sugestões, entre em contato:</p>
    </div>

    <section class="section container" style="padding-top:0;">
      <form class="contact-form" action="#" method="post">
        <label class="field">
          <span class="visually-hidden">Nome</span>
          <input type="text" name="nome" placeholder="Nome" autocomplete="name" required />
        </label>
        <label class="field">
          <span class="visually-hidden">E-mail</span>
          <input type="email" name="email" placeholder="Email" autocomplete="email" required />
        </label>
        <label class="field">
          <span class="visually-hidden">Mensagem</span>
          <textarea name="mensagem" placeholder="Mensagem" required></textarea>
        </label>
        <div class="contact-form__submit">
          <button type="submit" class="btn btn--pink">
            _enviar mensagem
            <svg class="btn__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </form>

      <div class="contact-info">
        <div class="contact-info__item">
          <span class="contact-info__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>
          </span>
          <div>
            <h3>_Endereço</h3>
            <p>Rua Faustolo, 576 - Água Branca, 05041-000<br />São Paulo - SP</p>
          </div>
        </div>
        <div class="contact-info__item">
          <span class="contact-info__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M4.5 6.5 12 12.5l7.5-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <div>
            <h3>_E-mail</h3>
            <p><a href="mailto:contato@spleituras.org">contato@spleituras.org</a></p>
          </div>
        </div>
        <div class="contact-info__item">
          <span class="contact-info__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <div>
            <h3>_Horário de funcionamento</h3>
            <p>De segunda a sexta-feira, das 9h às 18h</p>
          </div>
        </div>
        <div class="contact-info__item">
          <span class="contact-info__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.6 19 5 13.4 5 6a2 2 0 0 1 1-3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
          </span>
          <div>
            <h3>_Telefone</h3>
            <p><a href="tel:+551131555444">(11) 3155-5444</a></p>
          </div>
        </div>
      </div>
    </section>
  </main>

  @include('partials.footer')

  <script src="/js/site-header.js" defer></script>
  <script src="/js/site-footer.js" defer></script>
</body>
</html>
