/**
 * Interações de página que não pertencem a nenhum Web Component
 * específico. O comportamento do header compacto vive dentro de
 * site-header.js, encapsulado no próprio componente — não duplicar
 * aqui.
 */
(function () {
  "use strict";

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

  /* ---- Slider do hero (imagem de destaque) ---- */
  var heroCard = document.querySelector(".hero__card");
  var heroImage = heroCard && heroCard.querySelector("[data-gallery-image]");
  var heroNavButtons = document.querySelectorAll(
    ".hero__nav [data-gallery-nav]"
  );

  if (heroCard && heroImage && heroNavButtons.length) {
    var heroGallery = [];
    try {
      heroGallery = JSON.parse(heroCard.getAttribute("data-gallery") || "[]");
    } catch (e) {
      heroGallery = [];
    }
    setupFadeGallery(heroNavButtons, heroImage, heroGallery);
  }

  /* ---- Paginação entre seções (seta + bolinha) ---- */
  var sectionNav = document.getElementById("sectionNav");
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

    if ("IntersectionObserver" in window) {
      // Troca de cor por contraste: ativa quando a seção visível tem
      // data-nav-contrast="true" (fundo na mesma cor --color-ink do botão).
      var contrastSections = snapSections.filter(function (section) {
        return section.hasAttribute("data-nav-contrast");
      });

      if (contrastSections.length) {
        var contrastObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              sectionNav.classList.toggle("is-on-dark", entry.isIntersecting);
            });
          },
          { threshold: 0.6 }
        );
        contrastSections.forEach(function (section) {
          contrastObserver.observe(section);
        });
      }

      // No rodapé (última seção), o botão vira "voltar ao topo":
      // troca o ícone (seta pra cima, bolinha em cima) via .is-footer.
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
      premiosBg.classList.remove("is-visible");
    };

    var activatePremioCard = function (card, bgImage) {
      deactivateAllPremioCards();
      card.classList.add("is-active");
      card.setAttribute("aria-pressed", "true");
      premiosGrid.classList.add("has-active");
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
})();
