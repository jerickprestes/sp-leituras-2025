{{--
  partials/footer.blade.php

  Convertido de js/site-footer.js (Web Component <site-footer>). Mesma
  lógica da conversão do header: HTML agora vem do Blade, o
  comportamento (carrossel da galeria + lightbox) continua em JS puro
  — ver public/js/site-footer.js.

  As 8 fotos da galeria continuam representadas como "slides"
  escondidos no HTML (mesmo padrão do site estático) — o JS do
  carrossel não precisou mudar, só passou a ler elementos que agora
  vêm prontos do servidor em vez de montados via innerHTML no
  cliente. Pra trocar uma foto, edita o array $gallerySlides abaixo.

  Uso: @include('partials.footer')
--}}
@php
  $year = date('Y');

  // route() em vez de caminhos fixos, usando as rotas nomeadas de
  // routes/web.php. Calculadas uma vez aqui em cima pra não repetir
  // route('home') a cada link com âncora (#nossa-atuacao,
  // #equipamentos são seções dentro da própria home).
  $homeUrl = route('home');
  $equipamentoUrl = route('equipamento');
  $transparenciaUrl = route('transparencia');
  $transparenciaDocumentoUrl = route('transparencia-documento');

  // TODO: mover pra uma tabela (ex.: galeria_fotos) quando fizer
  // sentido editar isso sem mexer em código — ver README, seção
  // "conteúdo pendente".
  $gallerySlides = [
    ['src' => 'https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Interior de biblioteca'],
    ['src' => 'https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Estantes de livros'],
    ['src' => 'https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Biblioteca moderna'],
    ['src' => 'https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Sala de leitura'],
    ['src' => 'https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Corredor de biblioteca'],
    ['src' => 'https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Arquitetura de biblioteca'],
    ['src' => 'https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Espaço de leitura'],
    ['src' => 'https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=1600', 'thumb' => 'https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=600', 'alt' => 'Acervo de livros'],
  ];
@endphp

<footer class="site-footer">
  <div class="container site-footer__gallery">
    <div class="site-footer__gallery-slides" hidden>
      @foreach ($gallerySlides as $slide)
        <div class="site-footer__gallery-slide" data-src="{{ $slide['src'] }}" data-thumb="{{ $slide['thumb'] }}" data-alt="{{ $slide['alt'] }}"></div>
      @endforeach
    </div>

    <div class="site-footer__gallery-row" role="list" aria-label="Galeria de fotos">
      @for ($i = 0; $i < 5; $i++)
        <button type="button" class="site-footer__gallery-item" role="listitem">
          <img src="" alt="" loading="lazy" />
        </button>
      @endfor
    </div>

    <button type="button" class="site-footer__gallery-nav-btn site-footer__gallery-nav-btn--prev" data-gallery-dir="prev" aria-label="Fotos anteriores">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button type="button" class="site-footer__gallery-nav-btn site-footer__gallery-nav-btn--next" data-gallery-dir="next" aria-label="Próximas fotos">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>

  <div class="site-footer__info">
    <div class="container">
      <nav class="site-footer__links" aria-label="Links institucionais">
        <a href="{{ $homeUrl }}#nossa-atuacao">Sobre</a>
        <a href="{{ $transparenciaDocumentoUrl }}">Estatuto Social</a>
        <a href="{{ $transparenciaUrl }}">Regimento Interno</a>
        <a href="{{ $transparenciaUrl }}">Conselho de Administração e Fiscal</a>
        <a href="{{ $homeUrl }}#nossa-atuacao">Equipe</a>
      </nav>
    </div>

    <div class="container site-footer__main">
      <div class="site-footer__cta">
        <h2>_quer saber mais?</h2>
        <p>Entre em contato conosco e descubra como sua marca pode fazer parte dessa transformação:</p>
        <div class="site-footer__social">
          <a href="#" aria-label="SP Leituras no Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 8.5h2V5.2c-.35-.05-1.53-.15-2.9-.15-2.87 0-4.83 1.8-4.83 5.12V13H6.5v3.7h3.27V23h3.8v-6.3h3.14L17.2 13h-3.63v-2.4c0-1.07.29-1.8 1.83-1.8Z" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="SP Leituras no Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>
          </a>
          <a href="#" aria-label="SP Leituras no LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" stroke-width="1.8"/><line x1="7.7" y1="10.5" x2="7.7" y2="16.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="7.7" cy="7.6" r="1.1" fill="currentColor"/><path d="M11.3 16.3v-3.6c0-1.2.9-2.1 2.1-2.1s1.9.9 1.9 2.1v3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </a>
          <a href="mailto:contato@spleituras.org" aria-label="Enviar e-mail para a SP Leituras">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 6.5 12 12.5l7.5-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#" aria-label="SP Leituras no YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6.5" width="18" height="11" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor"/></svg>
          </a>
        </div>
      </div>

      <div class="site-footer__org">
        <div class="site-footer__org-mark">
          <svg viewBox="0 0 215 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="73" cy="15" r="7" fill="#b32b2b"/>
            <path d="M53 23c4 8 12 12 20 12s16-4 20-12v15H53V23Z" fill="#b32b2b"/>
            <circle cx="101" cy="21" r="3" fill="#b32b2b"/>
            <text x="2" y="42" font-family="Poppins, sans-serif" font-weight="700" font-size="26" fill="#211d1d">SP</text>
            <text x="97" y="42" font-family="Poppins, sans-serif" font-weight="500" font-size="26" fill="#211d1d">Leituras</text>
          </svg>
        </div>
        <p class="site-footer__org-name">SP Leituras - Organização Social de Cultura</p>
        <address>
          Rua Faustolo, 576, Água Branca, 05041-000<br />
          São Paulo - SP, (11) 3155-5444<br />
          contato@spleituras.org
        </address>
      </div>
    </div>

    <div class="container site-footer__also">
      <p>
        ACESSE TAMBÉM:
        <a href="{{ $homeUrl }}#equipamentos">Biblioteca de São Paulo (BSP)</a> |
        <a href="{{ $homeUrl }}#equipamentos">Biblioteca Parque Villa-Lobos (BVL)</a> |
        <a href="{{ $equipamentoUrl }}">BibliON</a> |
        <a href="{{ $homeUrl }}#equipamentos">Sistema Estadual de Bibliotecas Públicas de São Paulo (SisEB)</a>
      </p>
    </div>

    <div class="site-footer__bottom">
      <p class="container">
        SP Leituras – Associação Paulista de Bibliotecas e Leitura · CNPJ: 12.480.948/0001-70 · © {{ $year }}
      </p>
    </div>
  </div>
</footer>

<div class="site-footer__lightbox" hidden>
  <div class="site-footer__lightbox-overlay"></div>
  <div class="site-footer__lightbox-dialog" role="dialog" aria-modal="true" aria-label="Visualização de imagem">
    <button type="button" class="site-footer__lightbox-close" aria-label="Fechar visualização">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
    <img class="site-footer__lightbox-img" src="" alt="" />
  </div>
</div>
