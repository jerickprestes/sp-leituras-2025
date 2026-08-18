{{--
  resources/views/equipamento.blade.php

  Convertido de equipamento.html — mesma técnica usada em home.blade.php:
  header/footer viraram @include, assets locais viraram raiz-absolutos,
  links .html viraram rotas limpas, URLs externas (Pexels etc., se
  houver) não foram tocadas. Conteúdo ainda hardcoded (1ª passada).
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BibliON — a biblioteca digital gratuita de São Paulo | SP Leituras</title>
  <meta
    name="description"
    content="BibliON é a biblioteca digital gratuita de São Paulo, com milhares de livros digitais, clubes de leitura e o podcast BiblionCast."
  />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  @include('partials.header')

  <main id="conteudo">
    <section class="container section--tight">
      <div class="biblion-hero">
        <div>
          <span class="eyebrow">biblion</span>
          <h1>BIBLI<span style="color:var(--color-yellow)">Ø</span>N</h1>
          <p>a biblioteca digital gratuita de são paulo</p>
        </div>
        <div class="biblion-hero__art" aria-hidden="true">
          <img src="/assets/images/illustration-biblion-app-1.webp" alt="" width="339" height="247" />
          <img src="/assets/images/illustration-biblion-app-3.webp" alt="" width="349" height="250" style="margin-left:-40px; align-self:flex-end;" />
        </div>
      </div>
    </section>

    <!-- ===================== APP ===================== -->
    <section class="section container">
      <div class="biblion-promo">
        <div>
          <h2>_Leve a BibliON no seu bolso!</h2>
          <p>
            Baixe o app e tenha acesso offline aos seus livros favoritos. Disponível para Android
            e iOS, com atualizações constantes e novos recursos.
          </p>
          <p class="mono-label" style="display:block;margin-bottom:12px;color:var(--color-ink-70);">
            disponível gratuitamente
          </p>
          <div class="store-badges">
            <a href="#" class="store-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 3.5v17l14-8.5-14-8.5Z" fill="currentColor"/></svg>
              <span class="store-badge__text"><small>Disponível no</small><strong>Google Play</strong></span>
            </a>
            <a href="#" class="store-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16.5 2c.15 1.1-.3 2.2-1 3-.7.8-1.9 1.4-3 1.3-.15-1.05.35-2.15 1-2.9.75-.85 2-1.4 3-1.4ZM19.8 17.3c-.5 1.1-.8 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9-1.9 0-2.4.9-3.7.9-1.6 0-2.8-1.6-3.7-3-2.6-3.9-2.9-8.5-1.3-11 1.1-1.8 2.9-2.9 4.6-2.9 1.7 0 2.8 1 4.2 1 1.4 0 2.2-1 4.2-1 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3.4 9Z" fill="currentColor"/></svg>
              <span class="store-badge__text"><small>Baixar na</small><strong>App Store</strong></span>
            </a>
          </div>
        </div>
        <div>
          <img
            src="/assets/images/biblion-app-devices-mockup.webp"
            alt="Aplicativo BibliON aberto em um tablet e em um celular, mostrando a estante digital de livros"
            width="900"
            height="935"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- ===================== BIBLIONCAST ===================== -->
    <section class="section container">
      <div class="biblion-cast">
        <div aria-hidden="true" style="display:flex; justify-content:center; gap:8px;">
          <img src="/assets/images/illustration-biblion-app-2.webp" alt="" width="200" height="192" />
        </div>
        <div>
          <h2>_BiblionCast</h2>
          <p>
            Tenha acesso a entrevistas exclusivas com os maiores autores do Brasil, disponível nas
            principais plataformas:
          </p>
          <div class="podcast-platforms">
            <span style="color:#1DB954;">● Spotify</span>
            <span style="color:#A238FF;">Deezer</span>
            <span style="color:#1DB4E8;">amazon music</span>
            <img src="/assets/images/icon-apple-podcasts.webp" alt="Apple Podcasts" width="120" height="82" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== FAQ ===================== -->
    <section class="container section">
      <div class="faq">
        <div class="faq-head">
          <h2>_Perguntas Frequentes</h2>
          <a href="/contato" class="btn btn--ghost-light">+ dúvidas</a>
        </div>

        <div class="accordion">
          <details class="accordion-item" open>
            <summary>
              _O que é a BibliON?
              <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <div class="accordion-item__body">
              <p>
                É a biblioteca digital gratuita de São Paulo. São milhares de livros digitais para
                ler onde e como quiser, além de uma vasta grade de programação cultural, como
                clubes de leitura, atividades de formação e muito mais. A BibliON é uma iniciativa
                do Governo do Estado de São Paulo, por meio da Secretaria da Cultura, Economia e
                Indústria Criativas do Estado de São Paulo, sob a gestão da SP Leituras.
              </p>
            </div>
          </details>
          <details class="accordion-item">
            <summary>
              _Preciso pagar para usar a BibliON?
              <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <div class="accordion-item__body">
              <p>Não. A BibliON é 100% gratuita, é uma iniciativa pública mantida pelo Governo do Estado de São Paulo.</p>
            </div>
          </details>
          <details class="accordion-item">
            <summary>
              _Quem pode usar a BibliON?
              <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <div class="accordion-item__body">
              <p>Qualquer pessoa com CPF pode se cadastrar gratuitamente e ter acesso ao acervo digital.</p>
            </div>
          </details>
          <details class="accordion-item">
            <summary>
              _Quanto tempo posso ficar com o livro?
              <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <div class="accordion-item__body">
              <p>Cada empréstimo digital fica disponível por 14 dias, podendo ser renovado caso não haja fila de espera.</p>
            </div>
          </details>
          <details class="accordion-item">
            <summary>
              _Quantas obras posso emprestar?
              <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </summary>
            <div class="accordion-item__body">
              <p>É possível ter até 3 empréstimos ativos simultaneamente por usuário.</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  </main>

  @include('partials.footer')

  <script src="/js/site-header.js" defer></script>
  <script src="/js/site-footer.js" defer></script>
</body>
</html>
