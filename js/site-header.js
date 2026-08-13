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

        <nav class="site-header__mobile-nav" aria-label="Navegação principal (mobile)">
          ${navLinksHTML}
          <a href="${base}contato.html" class="site-header__donate">Doe agora</a>
        </nav>
      </div>
    `;

    const wrapper = this.querySelector(".site-header");
    const menuBtn = this.querySelector(".site-header__menu-btn");

    menuBtn.addEventListener("click", () => {
      const isOpen = wrapper.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

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
    } else {
      document.documentElement.style.setProperty(
        "--header-h",
        `${wrapper.offsetHeight}px`
      );
    }
  }
}

customElements.define("site-header", SiteHeader);
