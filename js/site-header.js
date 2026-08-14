/**
 * <site-header active="home|transparencia|novidades|contato">
 * Web Component do cabeçalho do site SP Leituras.
 * HTML embutido como template string (sem fetch/innerHTML externo),
 * então funciona perfeitamente abrindo o arquivo direto via file://.
 */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";
    const base = this.getAttribute("base") || "";

    const navItems = [
      { key: "institucional", label: "Institucional", href: `${base}index.html` },
      { key: "transparencia", label: "Transparência", href: `${base}transparencia.html` },
      { key: "atuacao", label: "Nossa atuação", href: `${base}index.html#nossa-atuacao` },
      { key: "novidades", label: "Novidades", href: `${base}novidades.html` },
      { key: "contato", label: "Contato", href: `${base}contato.html` },
    ];

    const current = (key) => (key === active ? ' aria-current="page"' : "");

    const navLinksHTML = navItems
      .map(
        (item) =>
          `<a href="${item.href}"${current(item.key)}>${item.label}</a>`
      )
      .join("\n        ");

    this.innerHTML = `
      <div class="site-header ${this.hasAttribute("open") ? "is-open" : ""}">
        <div class="container site-header__top">
          <nav class="site-header__nav" aria-label="Navegação principal">
            ${navLinksHTML}
            <a href="${base}contato.html" class="site-header__donate">Doe agora</a>
          </nav>
          <div class="site-header__actions">
            <a class="site-header__icon-btn" href="${base}novidades.html" aria-label="Buscar no site">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </a>
            <button class="site-header__menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <div class="site-header__brand">
          <a href="${base}index.html" class="site-header__logo">
            <span class="site-header__logo-text">spleituras</span>
            <span class="site-header__logo-tag">organização social de cultura</span>
          </a>
        </div>

        <hr class="site-header__rule" />

        <div class="site-header__drawer-overlay"></div>

        <nav class="site-header__mobile-nav" aria-label="Navegação principal (mobile)" role="dialog" aria-modal="true">
          <button class="site-header__drawer-close" type="button" aria-label="Fechar menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          ${navLinksHTML}
          <a href="${base}contato.html" class="site-header__donate">Doe agora</a>
        </nav>
      </div>
    `;

    const wrapper = this.querySelector(".site-header");
    const menuBtn = this.querySelector(".site-header__menu-btn");
    const drawer = this.querySelector(".site-header__mobile-nav");
    const drawerOverlay = this.querySelector(".site-header__drawer-overlay");
    const drawerCloseBtn = this.querySelector(".site-header__drawer-close");

    // ---- Navigation Drawer (menu mobile) ----
    // Painel deslizando da lateral (não mais dropdown empurrando o
    // conteúdo). Abre/fecha pelo botão hambúrguer, pelo X dentro do
    // drawer, clicando no overlay escurecido, ou apertando Esc.
    const openDrawer = () => {
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

    // ---- Header compacto a partir da 2ª seção (.snap-section) ----
    // Fica encapsulado aqui dentro (em vez de um script externo) porque
    // precisa do "wrapper" real (a div .site-header), não da tag
    // <site-header> em si — são elementos diferentes.
    const firstSection = document.querySelector(".snap-section");

    if (firstSection && "IntersectionObserver" in window) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            wrapper.classList.toggle("is-compact", !entry.isIntersecting);
          });
        },
        { threshold: 0.5 }
      );
      headerObserver.observe(firstSection);
    }

    // ---- Reporta a própria altura numa CSS var ----
    // O header é sticky e fica visualmente sobre o topo de cada seção.
    // Sem descontar essa altura, o scroll-snap encaixa a seção alinhada
    // ao topo real da página (y=0), deixando a altura do header "comer"
    // uma fatia da seção — que reaparece como um vazamento do fundo da
    // seção seguinte. --header-h é usada como scroll-margin-top em
    // .snap-section (ver style.css) para compensar isso. Atualiza em
    // tempo real porque a altura muda entre header cheio e compacto.
    //
    // IMPORTANTE: define o valor de forma SÍNCRONA aqui embaixo, na
    // hora. O callback inicial do ResizeObserver roda de forma
    // assíncrona (depois do layout, antes do próximo paint) — existe
    // uma janela pequena logo no carregamento em que --header-h ainda
    // vale 0px (o padrão em :root). Se o navegador calcular algum
    // ponto de encaixe do scroll-snap nessa janela, ele trava numa
    // posição sem descontar a altura do header, e o header (sticky)
    // fica por cima do topo da primeira seção. Medir aqui, de forma
    // síncrona, elimina essa corrida; o ResizeObserver abaixo só
    // cuida das mudanças SEGUINTES (header cheio → compacto, resize).
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
  }
}

customElements.define("site-header", SiteHeader);
