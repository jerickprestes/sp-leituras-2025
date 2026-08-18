{{--
  partials/header.blade.php

  Convertido de js/site-header.js (Web Component <site-header>). A
  estrutura visual é idêntica ao HTML que o customElements gerava via
  innerHTML — só passou a ser renderizada no servidor (Blade) em vez
  de no cliente (JS), truque que só era necessário pra funcionar via
  file:// sem servidor.

  A parte COMPORTAMENTAL (abrir/fechar o drawer, a busca off-canvas,
  o header compacto) continua em JS puro — ver public/js/site-header.js.
  Esse script não muda quase nada da lógica original, só deixou de
  rodar dentro de um customElements.define(...) pra rodar direto no
  DOMContentLoaded, já que o HTML agora chega pronto do servidor.

  Uso: @include('partials.header', ['active' => 'novidades'])
  $active aceita: institucional | transparencia | atuacao | novidades | contato
  (mesmos valores que o atributo `active` do Web Component aceitava)
--}}
@php
  $active = $active ?? '';

  // route() em vez de caminhos fixos — usa as rotas nomeadas de
  // routes/web.php (home, transparencia, novidades, contato). O ícone
  // e o form de busca também trocaram de href/action fixo por route().
  $navItems = [
    ['key' => 'institucional', 'label' => 'Institucional', 'href' => route('home')],
    ['key' => 'transparencia', 'label' => 'Transparência', 'href' => route('transparencia')],
    ['key' => 'atuacao', 'label' => 'Nossa atuação', 'href' => route('home') . '#nossa-atuacao'],
    ['key' => 'novidades', 'label' => 'Novidades', 'href' => route('novidades')],
    ['key' => 'contato', 'label' => 'Contato', 'href' => route('contato')],
  ];
@endphp

<div class="site-header">
  <div class="container site-header__top">
    <nav class="site-header__nav" aria-label="Navegação principal">
      @foreach ($navItems as $item)
        <a href="{{ $item['href'] }}"@if($item['key'] === $active) aria-current="page"@endif>{{ $item['label'] }}</a>
      @endforeach
      <a href="{{ route('contato') }}" class="site-header__donate">Doe agora</a>
    </nav>
    <div class="site-header__actions">
      <button type="button" class="site-header__icon-btn site-header__search-btn" aria-label="Buscar no site" aria-expanded="false">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="site-header__menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="site-header__brand">
    <a href="{{ route('home') }}" class="site-header__logo">
      <span class="site-header__logo-text">spleituras</span>
      <span class="site-header__logo-tag">organização social de cultura</span>
    </a>
  </div>

  <hr class="site-header__rule" />

  <div class="site-header__search-overlay"></div>

  <div class="site-header__search-panel" role="dialog" aria-modal="true" aria-label="Buscar no site">
    {{-- TODO: trocar o action por uma rota de busca de verdade quando existir --}}
    <form class="site-header__search-form" action="{{ route('novidades') }}" method="get">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="site-header__search-icon">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input type="search" name="q" class="site-header__search-input" placeholder="Buscar notícias, páginas..." aria-label="Termo de busca" />
      <button type="submit" class="site-header__search-submit">Buscar</button>
    </form>
    <button type="button" class="site-header__search-close" aria-label="Fechar busca">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <div class="site-header__drawer-overlay"></div>

  <nav class="site-header__mobile-nav" aria-label="Navegação principal (mobile)" role="dialog" aria-modal="true">
    <button class="site-header__drawer-close" type="button" aria-label="Fechar menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    @foreach ($navItems as $item)
      <a href="{{ $item['href'] }}"@if($item['key'] === $active) aria-current="page"@endif>{{ $item['label'] }}</a>
    @endforeach
    <a href="{{ route('contato') }}" class="site-header__donate">Doe agora</a>
  </nav>
</div>
