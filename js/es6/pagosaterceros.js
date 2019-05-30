function ImpimirCheque(){
    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html + '');
    ventana.document.head.innerHTML = `<style>
    @charset "utf-8";
    @page {
        margin: 0cm;
        size: 17.8cm 8cm;

    }
    section {
        page-break-before: always;
    }
    @media screen,print {
    body {
      margin: 0px;
      font-family: Calibri;
      font-weight: bold;
    }`;

}