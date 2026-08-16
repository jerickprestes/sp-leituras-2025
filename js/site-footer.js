/**
 * <site-footer base="">
 * Web Component do rodapé do site SP Leituras.
 * HTML embutido como template string (sem fetch/innerHTML externo),
 * então funciona perfeitamente abrindo o arquivo direto via file://.
 */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute("base") || "";
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__gallery">
          <div class="site-footer__gallery-grid">
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Interior de biblioteca">
              <img src="https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Interior de biblioteca" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Estantes de livros">
              <img src="https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Estantes de livros" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Biblioteca moderna">
              <img src="https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Biblioteca moderna" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Sala de leitura">
              <img src="https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sala de leitura" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Corredor de biblioteca">
              <img src="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Corredor de biblioteca" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Arquitetura de biblioteca">
              <img src="https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Arquitetura de biblioteca" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Espaço de leitura">
              <img src="https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Espaço de leitura" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" data-lightbox-src="https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=1600" data-lightbox-alt="Acervo de livros">
              <img src="https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Acervo de livros" loading="lazy" />
            </button>
          </div>
        </div>

        <div class="site-footer__info">
          <div class="container">
            <nav class="site-footer__links" aria-label="Links institucionais">
              <a href="${base}index.html#nossa-atuacao">Sobre</a>
              <a href="${base}transparencia-documento.html">Estatuto Social</a>
              <a href="${base}transparencia.html">Regimento Interno</a>
              <a href="${base}transparencia.html">Conselho de Administração e Fiscal</a>
              <a href="${base}index.html#nossa-atuacao">Equipe</a>
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
              <a href="${base}index.html#equipamentos">Biblioteca de São Paulo (BSP)</a> |
              <a href="${base}index.html#equipamentos">Biblioteca Parque Villa-Lobos (BVL)</a> |
              <a href="${base}equipamento.html">BibliON</a> |
              <a href="${base}index.html#equipamentos">Sistema Estadual de Bibliotecas Públicas de São Paulo (SisEB)</a>
            </p>
          </div>

          <div class="site-footer__bottom">
            <p class="container">
              SP Leituras – Associação Paulista de Bibliotecas e Leitura · CNPJ: 12.480.948/0001-70 · © ${year}
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
    `;

    // ---- Lightbox da galeria de fotos ----
    // Mesmo padrão de UX já usado no drawer do menu e na busca
    // off-canvas (site-header.js): overlay escurecido, X, Esc, clique
    // fora, scroll-lock, foco indo pro botão de fechar ao abrir e
    // voltando pra miniatura clicada ao fechar.
    const galleryItems = this.querySelectorAll(".site-footer__gallery-item");
    const lightbox = this.querySelector(".site-footer__lightbox");
    const lightboxImg = this.querySelector(".site-footer__lightbox-img");
    const lightboxClose = this.querySelector(".site-footer__lightbox-close");
    const lightboxOverlay = this.querySelector(".site-footer__lightbox-overlay");
    let lastFocusedThumb = null;

    const openLightbox = (src, alt, triggerEl) => {
      if (!lightbox || !lightboxImg) return;
      lastFocusedThumb = triggerEl;
      lightboxImg.setAttribute("src", src);
      lightboxImg.setAttribute("alt", alt || "");
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      if (lightboxClose) lightboxClose.focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lightboxImg) lightboxImg.setAttribute("src", "");
      if (lastFocusedThumb) lastFocusedThumb.focus();
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        openLightbox(
          item.getAttribute("data-lightbox-src"),
          item.getAttribute("data-lightbox-alt"),
          item
        );
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxOverlay) {
      lightboxOverlay.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }
}

customElements.define("site-footer", SiteFooter);
