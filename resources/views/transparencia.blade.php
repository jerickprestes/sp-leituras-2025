{{--
  resources/views/transparencia.blade.php

  Convertido de transparencia.html — mesma técnica usada em home.blade.php:
  header/footer viraram @include, assets locais viraram raiz-absolutos,
  links .html viraram rotas limpas, URLs externas (Pexels etc., se
  houver) não foram tocadas. Conteúdo ainda hardcoded (1ª passada).
--}}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transparência — SP Leituras</title>
  <meta
    name="description"
    content="Estatuto social, regimento interno, contratos de gestão, compras e gestão de pessoas da SP Leituras."
  />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

  @include('partials.header', ['active' => 'transparencia'])

  <main id="conteudo">
    <div class="page-head">
      <span class="eyebrow-mark" aria-hidden="true"></span>
      <h1>_transparência</h1>
      <p>Estamos sempre abertos a parcerias, diálogos e sugestões, entre em contato:</p>
    </div>

    <section class="section container" style="padding-top:0;">
      <div class="accordion">
        <div class="accordion-item">
          <a href="/transparencia-documento" style="display:flex;align-items:center;justify-content:space-between;padding:20px 4px;font-weight:700;">
            Estatuto Social
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="accordion-item">
          <a href="/transparencia-documento" style="display:flex;align-items:center;justify-content:space-between;padding:20px 4px;font-weight:700;">
            Regimento Interno
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <details class="accordion-item" open>
          <summary>
            Contrato de Gestão SECEC/GOV
            <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="accordion-item__body">
            <div class="accordion-sublist">
              <a href="/transparencia-documento">Certificado</a>
              <a href="/transparencia-documento">Contratos</a>
              <a href="/transparencia-documento">Relatórios de atividades</a>
              <a href="/transparencia-documento">Relatórios de Avaliação de Qualidade</a>
              <a href="/transparencia-documento">Demonstrativos Financeiros</a>
            </div>
          </div>
        </details>

        <details class="accordion-item">
          <summary>
            Compras e contratações
            <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="accordion-item__body">
            <div class="accordion-sublist">
              <a href="/transparencia-documento">Editais vigentes</a>
              <a href="/transparencia-documento">Contratos com fornecedores</a>
              <a href="/transparencia-documento">Cotações e atas</a>
            </div>
          </div>
        </details>

        <details class="accordion-item">
          <summary>
            Gestão de pessoas
            <svg class="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="accordion-item__body">
            <div class="accordion-sublist">
              <a href="/transparencia-documento">Quadro de colaboradores</a>
              <a href="/transparencia-documento">Política salarial</a>
              <a href="/transparencia-documento">Processos seletivos abertos</a>
            </div>
          </div>
        </details>
      </div>
    </section>
  </main>

  @include('partials.footer')

  <script src="/js/site-header.js" defer></script>
  <script src="/js/site-footer.js" defer></script>
</body>
</html>
