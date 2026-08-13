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
})();
