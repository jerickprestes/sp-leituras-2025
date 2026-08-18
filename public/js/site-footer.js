/**
 * Comportamento do footer (public/js/site-footer.js)
 *
 * Mesma conversão do site-header.js: saiu de dentro de um Web
 * Component (<site-footer>) e passou a rodar sobre o HTML já
 * renderizado pelo Blade (ver resources/views/partials/footer.blade.php).
 * A lógica do carrossel da galeria e do lightbox não mudou nada.
 */
document.addEventListener("DOMContentLoaded", () => {
  const galleryWrapper = document.querySelector(".site-footer__gallery");
  if (!galleryWrapper) return;

  // ---- Carrossel da galeria (1 linha, 5 fotos visíveis, loop) ----
  // As 8 fotos reais vivem escondidas em .site-footer__gallery-slides
  // (renderizadas pelo Blade a partir do array $gallerySlides no
  // partial). Os 5 botões visíveis são "janelas" fixas — a cada
  // clique nas setas, a janela desliza uma posição, com wraparound
  // (módulo): da última foto volta pra primeira e vice-versa.
  const gallerySlides = Array.prototype
    .slice.call(document.querySelectorAll(".site-footer__gallery-slide"))
    .map((node) => ({
      src: node.getAttribute("data-src"),
      thumb: node.getAttribute("data-thumb"),
      alt: node.getAttribute("data-alt") || "",
    }));

  const galleryItems = document.querySelectorAll(".site-footer__gallery-item");
  const galleryNavButtons = document.querySelectorAll("[data-gallery-dir]");
  let galleryStart = 0;

  const renderGallery = () => {
    if (!gallerySlides.length) return;
    galleryItems.forEach((item, offset) => {
      const slideIndex = (galleryStart + offset) % gallerySlides.length;
      const slide = gallerySlides[slideIndex];
      const img = item.querySelector("img");
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
      const direction = btn.getAttribute("data-gallery-dir") === "next" ? 1 : -1;
      galleryStart =
        (galleryStart + direction + gallerySlides.length) %
        gallerySlides.length;
      renderGallery();
    });
  });

  renderGallery();

  // ---- Lightbox da galeria de fotos ----
  // Overlay escurecido, X, Esc, clique fora, scroll-lock, foco
  // indo pro botão de fechar ao abrir e voltando pra miniatura
  // clicada ao fechar.
  const lightbox = document.querySelector(".site-footer__lightbox");
  const lightboxImg = document.querySelector(".site-footer__lightbox-img");
  const lightboxClose = document.querySelector(".site-footer__lightbox-close");
  const lightboxOverlay = document.querySelector(".site-footer__lightbox-overlay");
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
      const slideIndex = parseInt(item.getAttribute("data-slide-index"), 10);
      const slide = gallerySlides[slideIndex];
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
});
