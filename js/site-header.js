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

        <div class="container site-header__brand">
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
  }
}

customElements.define("site-header", SiteHeader);
