/**
 * Comportamento do header (public/js/site-header.js)
 *
 * Antes vivia dentro de um Web Component (<site-header>, customElements.define),
 * porque o HTML precisava ser injetado via innerHTML pra funcionar em
 * file://. No Laravel o HTML já vem pronto do servidor (ver
 * resources/views/partials/header.blade.php), então essa mesma lógica
 * passou a rodar direto no DOMContentLoaded — a lógica em si (drawer,
 * busca off-canvas, header compacto, --header-h) não mudou nada.
 */
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".site-header");
  if (!wrapper) return;

  const menuBtn = wrapper.querySelector(".site-header__menu-btn");
  const drawer = wrapper.querySelector(".site-header__mobile-nav");
  const drawerOverlay = wrapper.querySelector(".site-header__drawer-overlay");
  const drawerCloseBtn = wrapper.querySelector(".site-header__drawer-close");
  const searchBtn = wrapper.querySelector(".site-header__search-btn");
  const searchOverlay = wrapper.querySelector(".site-header__search-overlay");
  const searchCloseBtn = wrapper.querySelector(".site-header__search-close");
  const searchInput = wrapper.querySelector(".site-header__search-input");

  // ---- Navigation Drawer (menu mobile) ----
  // Painel deslizando da lateral. Abre/fecha pelo botão hambúrguer,
  // pelo X dentro do drawer, clicando no overlay escurecido, ou
  // apertando Esc.
  const openDrawer = () => {
    if (wrapper.classList.contains("is-search-open")) closeSearch();
    wrapper.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
    if (drawerCloseBtn) drawerCloseBtn.focus();
  };

  const closeDrawer = () => {
    wrapper.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
    menuBtn.focus();
  };

  menuBtn.addEventListener("click", () => {
    if (wrapper.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && wrapper.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // Clicar num link do drawer também fecha (evita o painel ficar
  // aberto por cima da página de destino/âncora).
  if (drawer) {
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  // ---- Busca off-canvas ----
  // Painel deslizando do topo, funciona em qualquer tamanho de tela
  // (diferente do menu, que é mobile-only). Abre/fecha pelo botão da
  // lupa, pelo X, clicando fora, ou Esc. Sem backend de busca de
  // verdade ainda: o form só navega para /novidades com o termo em
  // ?q= (placeholder pra quando houver busca de verdade — ver TODO
  // no partial do header).
  const openSearch = () => {
    if (wrapper.classList.contains("is-open")) closeDrawer();
    wrapper.classList.add("is-search-open");
    if (searchBtn) searchBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    if (searchInput) searchInput.focus();
  };

  const closeSearch = () => {
    wrapper.classList.remove("is-search-open");
    if (searchBtn) searchBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (searchBtn) searchBtn.focus();
  };

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      if (wrapper.classList.contains("is-search-open")) {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener("click", closeSearch);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", closeSearch);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && wrapper.classList.contains("is-search-open")) {
      closeSearch();
    }
  });

  // ---- Header compacto logo após passar o título "novidades" ----
  // Observa a .hero__eyebrow-row (onde fica "novidades") em vez da
  // seção inteira. rootMargin negativo no topo, do tamanho do
  // próprio header, encolhe a área "visível" considerada pelo
  // observer — assim, "não está mais intersectando" significa "esse
  // elemento acabou de ficar encoberto pelo header sticky", não "saiu
  // da tela inteira". Dispara exatamente no momento em que
  // "novidades" passa por baixo do header. Só existe na home (a
  // .hero__eyebrow-row só existe lá) — nas demais páginas esse bloco
  // simplesmente não encontra o elemento e não faz nada.
  const eyebrowRow = document.querySelector(".hero__eyebrow-row");

  if (eyebrowRow && "IntersectionObserver" in window) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          wrapper.classList.toggle("is-compact", !entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: `-${wrapper.offsetHeight}px 0px 0px 0px` }
    );
    headerObserver.observe(eyebrowRow);
  }

  // ---- Reporta a própria altura numa CSS var ----
  // O header é sticky e fica visualmente sobre o topo de cada seção.
  // --header-h é usada como scroll-margin-top em .snap-section (ver
  // style.css) pra compensar isso. Atualiza em tempo real porque a
  // altura muda entre header cheio e compacto. Medida de forma
  // síncrona aqui (não só via ResizeObserver, que é assíncrono) pra
  // evitar uma corrida com o cálculo do scroll-snap logo no
  // carregamento.
  document.documentElement.style.setProperty(
    "--header-h",
    `${wrapper.offsetHeight}px`
  );

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        document.documentElement.style.setProperty(
          "--header-h",
          `${entry.contentRect.height}px`
        );
      }
    });
    resizeObserver.observe(wrapper);
  }
});
