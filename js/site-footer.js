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
          <!-- Fonte de dados das 8 fotos — HTML puro, escondido, nunca
               aparece na tela. O JS lê isso e preenche os 5 slots
               visíveis logo abaixo, com loop (a 6ª foto some a 1ª
               reaparece, etc.). Editar/adicionar fotos aqui é só
               duplicar um .site-footer__gallery-slide. -->
          <div class="site-footer__gallery-slides" hidden>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/30498607/pexels-photo-30498607.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Interior de biblioteca"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/27391136/pexels-photo-27391136.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Estantes de livros"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/1046124/pexels-photo-1046124.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Biblioteca moderna"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/30827138/pexels-photo-30827138.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Sala de leitura"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/877971/pexels-photo-877971.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Corredor de biblioteca"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Arquitetura de biblioteca"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/35425456/pexels-photo-35425456.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Espaço de leitura"></div>
            <div class="site-footer__gallery-slide" data-src="https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=1600" data-thumb="https://images.pexels.com/photos/34219241/pexels-photo-34219241.jpeg?auto=compress&cs=tinysrgb&w=600" data-alt="Acervo de livros"></div>
          </div>

          <div class="site-footer__gallery-row" role="list" aria-label="Galeria de fotos">
            <button type="button" class="site-footer__gallery-item" role="listitem">
              <img src="" alt="" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" role="listitem">
              <img src="" alt="" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" role="listitem">
              <img src="" alt="" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" role="listitem">
              <img src="" alt="" loading="lazy" />
            </button>
            <button type="button" class="site-footer__gallery-item" role="listitem">
              <img src="" alt="" loading="lazy" />
            </button>
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

    // ---- Carrossel da galeria (1 linha, 5 fotos visíveis, loop) ----
    // As 8 fotos reais vivem escondidas em .site-footer__gallery-slides
    // (HTML puro). Os 5 botões visíveis são "janelas" fixas — a cada
    // clique nas setas, a janela desliza uma posição, com wraparound
    // (módulo): da última foto volta pra primeira e vice-versa.
    const gallerySlides = Array.prototype
      .slice.call(this.querySelectorAll(".site-footer__gallery-slide"))
      .map((node) => ({
        src: node.getAttribute("data-src"),
        thumb: node.getAttribute("data-thumb"),
        alt: node.getAttribute("data-alt") || "",
      }));

    const galleryItems = this.querySelectorAll(".site-footer__gallery-item");
    const galleryNavButtons = this.querySelectorAll(
      "[data-gallery-dir]"
    );
    let galleryStart = 0;

    const renderGallery = () => {
      if (!gallerySlides.length) return;
      galleryItems.forEach((item, offset) => {
        var slideIndex = (galleryStart + offset) % gallerySlides.length;
        var slide = gallerySlides[slideIndex];
        var img = item.querySelector("img");
        if (img) {
          img.setAttribute("src", slide.thumb);
          img.setAttribute("alt", slide.alt);
        }
        item.setAttribute("data-slide-index", String(slideIndex));
      });
    };

    galleryNavButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!gallerySlides.length) return;
        var direction = btn.getAttribute("data-gallery-dir") === "next" ? 1 : -1;
        galleryStart =
          (galleryStart + direction + gallerySlides.length) %
          gallerySlides.length;
        renderGallery();
      });
    });

    renderGallery();

    // ---- Lightbox da galeria de fotos ----
    // Mesmo padrão de UX já usado no drawer do menu e na busca
    // off-canvas (site-header.js): overlay escurecido, X, Esc, clique
    // fora, scroll-lock, foco indo pro botão de fechar ao abrir e
    // voltando pra miniatura clicada ao fechar.
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
        var slideIndex = parseInt(item.getAttribute("data-slide-index"), 10);
        var slide = gallerySlides[slideIndex];
        if (slide) openLightbox(slide.src, slide.alt, item);
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
