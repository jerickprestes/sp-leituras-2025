/**
 * Interações de página que não pertencem a nenhum Web Component
 * específico. O comportamento do header compacto vive dentro de
 * site-header.js, encapsulado no próprio componente — não duplicar
 * aqui.
 */
(function () {
  "use strict";

  // ---- Tela de carregamento ----
  // Fica visível por pelo menos 2s, mesmo que a página carregue mais
  // rápido que isso — e continua visível além disso se a página
  // demorar mais, só some quando as duas condições baterem: tempo
  // mínimo passado E "load" (página/imagens/fontes) já disparado.
  (function setupSiteLoader() {
    var loader = document.getElementById("siteLoader");
    if (!loader) return;

    var MIN_DURATION = 2000;
    var start = Date.now();
    document.documentElement.classList.add("has-loader");

    var hideLoader = function () {
      var elapsed = Date.now() - start;
      var remaining = Math.max(MIN_DURATION - elapsed, 0);
      window.setTimeout(function () {
        loader.classList.add("is-hidden");
        document.documentElement.classList.remove("has-loader");
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
    }
  })();

  // ---- Corrige desalinhamento de scroll no carregamento ----
  // As fontes web (Poppins/Inter/Space Mono) carregam de forma
  // assíncrona; até lá, o header renderiza com a fonte de fallback,
  // numa altura ligeiramente diferente. Se o scroll-snap calcular o
  // ponto de encaixe antes da troca de fonte, ele pode fixar a
  // rolagem uns pixels abaixo do topo real — escondendo o início da
  // hero section atrás do header sticky, mesmo sem o usuário rolar
  // nada. Corrige isso forçando a volta ao topo depois que a página
  // (fontes/imagens incluídas) termina de carregar de verdade — só
  // quando já estamos perto do topo, pra não atrapalhar quem chegou
  // via link direto para outra seção.
  window.addEventListener("load", function () {
    if (window.scrollY > 0 && window.scrollY < 80) {
      window.scrollTo(0, 0);
    }
  });

  // Setas com fade: esmaece a imagem, troca a src no meio da transição,
  // depois volta a aparecer. Duração do setTimeout precisa bater com a
  // transition de opacity definida no CSS (250ms).
  var setupFadeGallery = function (navButtons, image, gallery) {
    var index = 0;
    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        if (!image || gallery.length < 2) return;
        var direction =
          btn.getAttribute("data-gallery-nav") === "next" ? 1 : -1;

        image.classList.add("is-fading");
        window.setTimeout(function () {
          index = (index + direction + gallery.length) % gallery.length;
          image.setAttribute("src", gallery[index]);
          image.classList.remove("is-fading");
        }, 250);
      });
    });
  };

  /* ---- Carrossel do hero (banners com imagem + título + texto) ----
     Lê os banners de .hero-slides (HTML puro, escondido) e preenche
     o card visível (.hero__card). Troca sozinho a cada 5s; setas e
     cliques na prévia resetam o temporizador pra não sobrepor uma
     troca manual com uma automática logo em seguida. */
  (function setupHeroCarousel() {
    var heroCard = document.querySelector(".hero__card");
    var slidesContainer = document.querySelector(".hero-slides");
    if (!heroCard || !slidesContainer) return;

    var slides = Array.prototype
      .slice.call(slidesContainer.querySelectorAll(".hero-slide"))
      .map(function (node) {
        var img = node.querySelector("img");
        var title = node.querySelector("h2");
        var text = node.querySelector("p");
        return {
          image: img ? img.getAttribute("src") : "",
          alt: img ? img.getAttribute("alt") || "" : "",
          title: title ? title.textContent : "",
          text: text ? text.textContent : "",
          href: node.getAttribute("data-href") || "#",
        };
      });

    if (!slides.length) return;

    var heroImage = heroCard.querySelector("[data-hero-image]");
    var heroTitle = heroCard.querySelector("[data-hero-title]");
    var heroText = heroCard.querySelector("[data-hero-text]");
    var navButtons = document.querySelectorAll(
      ".hero__nav [data-gallery-nav]"
    );
    var previewItems = Array.prototype.slice.call(
      document.querySelectorAll(".hero-preview__item")
    );

    var currentIndex = 0;
    var AUTO_DELAY = 5000;
    var timer = null;

    var renderPreview = function () {
      previewItems.forEach(function (item, offset) {
        var slideIndex = (currentIndex + 1 + offset) % slides.length;
        var slide = slides[slideIndex];
        var img = item.querySelector("img");
        var titleEl = item.querySelector(".hero-preview__title");
        if (img) {
          img.setAttribute("src", slide.image);
          img.setAttribute("alt", slide.alt);
        }
        if (titleEl) titleEl.textContent = slide.title;
        item.setAttribute("data-preview-index", String(slideIndex));
      });
    };

    var renderSlide = function (index, animate) {
      var slide = slides[index];
      if (!slide) return;

      var apply = function () {
        if (heroImage) {
          heroImage.setAttribute("src", slide.image);
          heroImage.setAttribute("alt", slide.alt);
        }
        if (heroTitle) heroTitle.textContent = slide.title;
        if (heroText) heroText.textContent = slide.text;
        heroCard.setAttribute("href", slide.href);
      };

      if (animate && heroImage) {
        heroImage.classList.add("is-fading");
        window.setTimeout(function () {
          apply();
          heroImage.classList.remove("is-fading");
        }, 250);
      } else {
        apply();
      }

      renderPreview();
    };

    var goTo = function (index, animate) {
      currentIndex = (index + slides.length) % slides.length;
      renderSlide(currentIndex, animate !== false);
    };

    var resetTimer = function () {
      if (timer) window.clearInterval(timer);
      if (slides.length < 2) return;
      timer = window.setInterval(function () {
        goTo(currentIndex + 1);
      }, AUTO_DELAY);
    };

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var direction =
          btn.getAttribute("data-gallery-nav") === "next" ? 1 : -1;
        goTo(currentIndex + direction);
        resetTimer();
      });
    });

    previewItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var index = parseInt(item.getAttribute("data-preview-index"), 10);
        if (!isNaN(index)) {
          goTo(index);
          resetTimer();
        }
      });
    });

    renderSlide(currentIndex, false);
    resetTimer();
  })();

  /* ---- Paginação entre seções (seta + bolinha) ---- */
  var sectionNav = document.getElementById("sectionNav");
  var sectionNavPrev = document.getElementById("sectionNavPrev");
  var snapSections = Array.prototype.slice.call(
    document.querySelectorAll(".snap-section")
  );

  if (sectionNav && snapSections.length) {
    var lastSection = snapSections[snapSections.length - 1];

    var getCurrentIndex = function () {
      var scrollPos = window.scrollY + window.innerHeight / 2;
      var current = 0;
      snapSections.forEach(function (section, index) {
        if (section.offsetTop <= scrollPos) {
          current = index;
        }
      });
      return current;
    };

    sectionNav.addEventListener("click", function () {
      var nextIndex = (getCurrentIndex() + 1) % snapSections.length;
      snapSections[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    // Botão de subir uma seção (desktop only, ver CSS) — vai pra
    // seção anterior, com wraparound (da primeira volta pra última).
    if (sectionNavPrev) {
      sectionNavPrev.addEventListener("click", function () {
        var prevIndex =
          (getCurrentIndex() - 1 + snapSections.length) % snapSections.length;
        snapSections[prevIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    if ("IntersectionObserver" in window) {
      // Troca de cor por contraste: ativa quando a seção visível tem
      // data-nav-contrast="true" (fundo na mesma cor --color-ink do botão).
      // Sincroniza os dois botões (subir/descer) quando o de subir existe.
      var contrastSections = snapSections.filter(function (section) {
        return section.hasAttribute("data-nav-contrast");
      });

      if (contrastSections.length) {
        var contrastObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              sectionNav.classList.toggle("is-on-dark", entry.isIntersecting);
              if (sectionNavPrev) {
                sectionNavPrev.classList.toggle(
                  "is-on-dark",
                  entry.isIntersecting
                );
              }
            });
          },
          { threshold: 0.6 }
        );
        contrastSections.forEach(function (section) {
          contrastObserver.observe(section);
        });
      }

      // No rodapé (última seção), o botão de descer vira "voltar ao
      // topo": troca o ícone (seta pra cima, bolinha em cima) via
      // .is-footer. O botão de subir não participa disso — ele
      // sempre significa "seção anterior".
      var footerObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            sectionNav.classList.toggle("is-footer", entry.isIntersecting);
            if (entry.isIntersecting) {
              sectionNav.setAttribute("aria-label", "Voltar ao topo");
            } else {
              sectionNav.setAttribute(
                "aria-label",
                "Ir para a próxima seção"
              );
            }
          });
        },
        { threshold: 0.6 }
      );
      footerObserver.observe(lastSection);

      // Botão de subir: escondido na primeira seção (hero) — não faz
      // sentido "voltar" quando já se está no topo. Reaparece a
      // partir da 2ª seção em diante.
      if (sectionNavPrev) {
        var firstSection = snapSections[0];
        var firstSectionObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              sectionNavPrev.classList.toggle(
                "is-first-section",
                entry.isIntersecting
              );
            });
          },
          { threshold: 0.6 }
        );
        firstSectionObserver.observe(firstSection);
      }
    }
  }

  /* ---- Cards de prêmios: clicáveis, ativam fundo + conteúdo extra ---- */
  var premiosSection = document.querySelector(".premios-section");
  var premiosGrid = premiosSection && premiosSection.querySelector(".premios-grid");
  var premiosBg = premiosSection && premiosSection.querySelector(".premios-bg");
  var premiosBgImage =
    premiosBg && premiosBg.querySelector("[data-premios-bg-image]");
  var premioCards = premiosSection
    ? Array.prototype.slice.call(
        premiosSection.querySelectorAll(".premio-card")
      )
    : [];

  if (premiosGrid && premiosBg && premiosBgImage && premioCards.length) {
    var deactivateAllPremioCards = function () {
      premioCards.forEach(function (otherCard) {
        otherCard.classList.remove("is-active");
        otherCard.setAttribute("aria-pressed", "false");
      });
      premiosGrid.classList.remove("has-active");
      premiosSection.classList.remove("has-active");
      premiosBg.classList.remove("is-visible");
    };

    var activatePremioCard = function (card, bgImage) {
      deactivateAllPremioCards();
      card.classList.add("is-active");
      card.setAttribute("aria-pressed", "true");
      premiosGrid.classList.add("has-active");
      premiosSection.classList.add("has-active");
      premiosBgImage.setAttribute("src", bgImage);
      premiosBg.classList.add("is-visible");
    };

    premioCards.forEach(function (card) {
      var bgImage = card.getAttribute("data-bg-image");
      if (!bgImage) return;

      var toggleCard = function () {
        var wasActive = card.classList.contains("is-active");
        if (wasActive) {
          deactivateAllPremioCards();
        } else {
          activatePremioCard(card, bgImage);
        }
      };

      card.addEventListener("click", toggleCard);

      // Suporte a teclado, já que o card não é um <button> nativo
      // (evita colocar elementos de bloco como <h3>/<p> dentro de
      // <button>, o que o HTML não permite de verdade).
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCard();
        }
      });
    });
  }

  /* ---- Sanfona de equipamentos (#equipamentos) ---- */
  var equipItems = Array.prototype.slice.call(
    document.querySelectorAll(".equip-accordion-item")
  );

  var closeEquipItem = function (item) {
    var trigger = item.querySelector(".equip-accordion-item__trigger");
    item.classList.remove("is-open");
    if (trigger) {
      trigger.classList.remove("eyebrow");
      trigger.setAttribute("aria-expanded", "false");
    }
  };

  var openEquipItem = function (item) {
    var trigger = item.querySelector(".equip-accordion-item__trigger");
    item.classList.add("is-open");
    if (trigger) {
      trigger.classList.add("eyebrow");
      trigger.setAttribute("aria-expanded", "true");
    }
  };

  equipItems.forEach(function (item) {
    var trigger = item.querySelector(".equip-accordion-item__trigger");
    var body = item.querySelector(".equip-accordion-item__body");
    var image = item.querySelector("[data-gallery-image]");
    var navButtons = item.querySelectorAll("[data-gallery-nav]");

    var gallery = [];
    if (body) {
      try {
        gallery = JSON.parse(body.getAttribute("data-gallery") || "[]");
      } catch (e) {
        gallery = [];
      }
    }

    if (trigger) {
      trigger.addEventListener("click", function () {
        var isCurrentlyOpen = item.classList.contains("is-open");

        if (isCurrentlyOpen) {
          closeEquipItem(item);
          return;
        }

        equipItems.forEach(function (otherItem) {
          if (otherItem === item) {
            openEquipItem(otherItem);
          } else {
            closeEquipItem(otherItem);
          }
        });
      });
    }

    setupFadeGallery(navButtons, image, gallery);
  });

  /* ---- Fade-in sequencial dos elementos de cada seção ----
     Primeira versão (heurística, ajustável depois): pega os filhos
     diretos de cada .snap-section como "elementos"; se um desses
     filhos for um grid/lista conhecida (cards, colunas, etc.), usa os
     ITENS dela em vez do grid inteiro, pra ganhar granularidade (ex.:
     cada premio-card aparece um de cada vez, não o grid inteiro de
     uma vez). Dispara quando a seção entra em ~25% na tela. */
  (function setupSectionFadeIn() {
    if (!("IntersectionObserver" in window)) return;

    var sections = Array.prototype.slice.call(
      document.querySelectorAll(".snap-section")
    );
    if (!sections.length) return;

    var GRID_SELECTORS = [
      ".premios-grid",
      ".atuacao-grid",
      ".logos-block",
      ".equip-grid",
      ".cta-dark-grid",
      ".hero-preview",
    ];

    var matches = function (el, selector) {
      return (
        el.matches ||
        el.msMatchesSelector ||
        el.webkitMatchesSelector
      ).call(el, selector);
    };

    sections.forEach(function (section) {
      var items = [];

      Array.prototype.forEach.call(section.children, function (child) {
        if (child.hasAttribute("hidden")) return;
        if (child.classList.contains("premios-bg")) return;

        var isGridLike = GRID_SELECTORS.some(function (selector) {
          return matches(child, selector);
        });

        if (isGridLike && child.children.length) {
          Array.prototype.forEach.call(child.children, function (grandchild) {
            items.push(grandchild);
          });
        } else {
          items.push(child);
        }
      });

      if (!items.length) return;

      items.forEach(function (item, index) {
        item.classList.add("fade-item");
        item.style.transitionDelay = index * 90 + "ms";
      });

      var sectionObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              section.classList.add("is-visible");
              sectionObserver.unobserve(section);
            }
          });
        },
        { threshold: 0.25 }
      );
      sectionObserver.observe(section);
    });
  })();
})();
