/**
 * Interações de página que não pertencem a nenhum Web Component
 * específico. O comportamento do header compacto vive dentro de
 * site-header.js, encapsulado no próprio componente — não duplicar
 * aqui.
 */
(function () {
  "use strict";

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
    var galleryIndex = 0;

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

    // Setas da galeria: não podem propagar o clique para o trigger
    // (senão fechariam/abririam o item ao trocar de foto).
    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.stopPropagation();
        if (!image || gallery.length < 2) return;
        var direction =
          btn.getAttribute("data-gallery-nav") === "next" ? 1 : -1;

        // Fade-out, troca a src só depois de esmaecer, depois fade-in
        // (duração precisa bater com a transition de opacity no CSS).
        image.classList.add("is-fading");
        window.setTimeout(function () {
          galleryIndex =
            (galleryIndex + direction + gallery.length) % gallery.length;
          image.setAttribute("src", gallery[galleryIndex]);
          image.classList.remove("is-fading");
        }, 250);
      });
    });
  });
})();
