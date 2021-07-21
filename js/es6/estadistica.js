class EstadisticaComponente {
    Crear(Obj){   
      $("#tblEstadistica").html(`<table id="lstR" class="table table-striped table-bordered" cellspacing="0" width="100%">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Componente</th>
                  <th>ACT</th>
                  <th>RCP</th>
                  <th>RSP</th>
                  <th>FCP</th>
                  <th>FSP</th>
                  <th>INV</th>
                  <th>TOTAL</th>
              </tr>
          </thead></table>`);
      var t = $('#lstR').DataTable(opciones);
      t.clear().draw();
      t.row.add([1, "EJERCITO BOLIVARIANO","","","","","","",0]).draw(false);
      t.row.add([2, "ARMADA BOLIVARIANA","","","","","","",0]).draw(false);
      t.row.add([3, "AVIACION MILITAR BOLIVARIANA","","","","","","",0]).draw(false);
      t.row.add([4, "GUARDIA NACIONAL BOLIVARIANA","","","","","","",0]).draw(false);
      t.row.add(["","TOTAL ",0,0,0,0,0,0,0]).draw(false);
      var matrix = [];
      for (var i=0;i<4;i++) {
         matrix[i] = [];
      }
  
      Obj.forEach( v => {
        var fil = CodigoComponente(v._id.componente) - 1;
        var col = PosicionColumna(v._id.situacion) - 1;    
        if(fil < 4 && col < 7) matrix[fil][col] = parseInt(v.cantidad);
      });
  
      for (var i=0;i<4;i++) {
        for (var j=0;j<6;j++) {
           var acumularcol = parseInt(t.cell(i, 8).data()) + parseInt(matrix[i][j]);
           t.cell(i, j + 2).data(matrix[i][j]).draw();
           var acumular = parseInt(t.cell(4, j + 2).data()) + parseInt(matrix[i][j]);
           t.cell(i, 8).data(acumularcol).draw(false);
           t.cell(4, j + 2).data(acumular).draw(false);
        }
      }
      var total = parseInt(t.cell(0, 8).data()) + parseInt(t.cell(1, 8).data()) + parseInt(t.cell(2, 8).data()) + parseInt(t.cell(3, 8).data());
      t.cell(4, 8).data(total).draw(false);
      $("#_cargando").hide();
    }
  
  }
  
  function EstadisticasPorComponente(){
    var ObjEsta = new EstadisticaComponente();
    var url = Conn.URL + "militar/reportecomponente";
    $("#_cargando").show();
    CargarAPI(url, "POST", "", ObjEsta);
  
  }
  
  function CodigoComponente(codigo){
    switch (codigo) {
      case "EJ":
        return 1
        break;
      case "AR":
        return 2
        break;
      case "AV":
        return 3
        break;
      case "GN":
        return 4
        break;
      default:
        return 5
        break;
  
    }
  }
  
  function CodigoComponenteTexto(codigo){
    switch (codigo) {
      case "EJ":
        return "EJERCITO BOLIVARIANO"
        break;
      case "AR":
        return "ARMADA BOLIVARIANA"
        break;
      case "AV":
        return "AVIACION MILITAR BOLIVARIANA"
        break;
      case "GN":
        return "GUARDIA NACIONAL BOLIVARIANA"
        break;
      default:
        return "SIN DESCRIPCION"
        break;
  
    }
  }
  function PosicionColumna(valor){
    switch (valor) {
      case "ACT":
        return 1
        break;
      case "RCP":
        return 2
        break;
      case "RSP":
        return 3
        break;
      case "FCP":
        return 4
        break;
      case "FSP":
        return 5
        break;
      case "I":
        return 6
        break;
      case "D":
        return 7
        break;
      default:
        return 8
        break;
    }
  }
  
  
  class EstadisticaGrado {
    Crear(Obj){
  
      var t = $('#lstR').DataTable(opciones);
      t.clear().draw();
      var grado = "";
      var fil = 1;
      var col = 1;
      var fila = 0;
      var acumular = 0;
      Obj.forEach( v => {
        if (v._id.grado != ""){
          if (grado != v._id.grado){
            grado = v._id.grado;
            t.row.add([fil, v._id.codigo, grado,0,0,0,0,0,0,0]).draw(false);
  
            fil++;
          }
          fila = fil - 2;
          col = PosicionColumna(v._id.situacion) + 2;
          t.cell(fila, col).data(v.cantidad).draw();
          t.cell(fila, 9).data(parseInt(t.cell(fila, 9).data()) + parseInt(v.cantidad)).draw();
  
        }
      });
  
      $("#_cargando").hide();
    }
  }
  
  
  function EstadisticasPorGrado(codigo){
    $("#tblEstadistica").html(`
      <center>
      <button type="button" class="btn btn-primary"  onclick="EstadisticasPorGradoEX('EJ')">EJERCITO</button>
      <button type="button" class="btn btn-success"  onclick="EstadisticasPorGradoEX('AR')">ARMADA</button>
      <button type="button" class="btn btn-info"  onclick="EstadisticasPorGradoEX('AV')">AVIACIÓN</button>
      <button type="button" class="btn btn-warning"  onclick="EstadisticasPorGradoEX('GN')">GUARDIA NACIONAL	</button>
      </center>
      <br><br><h2 id="lblTituloGrado"></h2><br>
      <table id="lstR" class="table table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>CODIGO</th>
                <th>GRADO</th>
                <th>ACT</th>
                <th>RCP</th>
                <th>RSP</th>
                <th>FCP</th>
                <th>FSP</th>
                <th>INV</th>
                <th>TOTAL</th>
            </tr>
        </thead>
  
        </table>`);
    var t = $('#lstR').DataTable(opciones);
  }
  function EstadisticasPorGradoEX(codigo){
    EstadisticasPorGrado('');
    $("#_cargando").show();
    var ObjEsta = new EstadisticaGrado();
    var url = Conn.URL + "militar/reportegrado";
    $('#mdlGrados').modal("show");
    $('#lblTituloGrado').html(CodigoComponenteTexto(codigo));
    CargarAPI(url, "POST", {"grado": codigo }, ObjEsta);
  
  }
  
  
  
  
  class EstadisticaFamiliar {
      Crear(Obj){
        $("#tblEstadistica").html(`<div class="row">
          <div class="col-md-4 col-sm-12">
            <label>Componente:</label>
            <select class="js-states form-control" style="width: 100%"  aria-hidden="true" id="cmbcomponente" required >
              <option value="EJ">EJERCITO BOLIVARIANO</option>
              <option value="AR">ARMADA BOLIVARIANA</option>
              <option value="AV">AVIACION MILITAR BOLIVARIANA</option>
              <option value="GN">GUARDIA NACIONAL BOLIVARIANA</option>
            </select>
          </div>
          <div class="col-md-4 col-sm-12">
            <label>Situación:</label>
            <select class="js-states form-control" style="width: 100%"
            aria-hidden="true" required id="cmbsituacion">
              <option value="ACT">ACTIVO</option>
              <option value="RCP">RESERVA ACTIVA CON GOCE PENSION</option>
              <option value="RSP">RESERVA ACTIVA SIN GOCE PENSION</option>
              <option value="FCP">FALLECIDO CON PENSION</option>
              <option value="FSP">FALLECIDO SIN PENSION</option>
              <option value="PG">PENSION DE GRACIA</option>
              <option value="I">INVALIDEZ</option>
            </select>
          </div>
          <div class="col-md-4 col-sm-12">
            <label>&nbsp;</label><br>
            <button type="button" class="btn btn-md btn-primary" data-dismiss="modal"
              onclick="GArchivoFamiliar()" id="_btnArchivo">
              <i class="fa fa-print "></i>&nbsp;&nbsp;Generar Archivo</button>
          </div>
          </div><br><br>
          <div class="row"><div class="col-md-12 col-sm-12">
          <table id="lstF" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Componente</th>
                    <th>ACT</th>
                    <th>RCP</th>
                    <th>RSP</th>
                    <th>FCP</th>
                    <th>FSP</th>
                    <th>INV</th>
                    <th>TOTAL</th>
                </tr>
            </thead></table></div></div>`);
        var t = $('#lstF').DataTable(opciones);
        t.clear().draw();
        t.row.add([1, "EJERCITO BOLIVARIANO","","","","","","",0]).draw(false);
        t.row.add([2, "ARMADA BOLIVARIANA","","","","","","",0]).draw(false);
        t.row.add([3, "AVIACION MILITAR BOLIVARIANA","","","","","","",0]).draw(false);
        t.row.add([4, "GUARDIA NACIONAL BOLIVARIANA","","","","","","",0]).draw(false);
        t.row.add(["","TOTAL ",0,0,0,0,0,0,0]).draw(false);
        var matrix = [];
        for (var i=0;i<4;i++) {
           matrix[i] = [];
        }
  
        Obj.forEach( v => {
  
          var fil = CodigoComponente(v._id.codigo) - 1;
          var col = PosicionColumna(v._id.situacion) - 1;
          matrix[fil][col] = parseInt(v.cantidad);
        });
  
        for (var i=0;i<4;i++) {
          for (var j=0;j<6;j++) {
             var acumularcol = parseInt(t.cell(i, 8).data()) + parseInt(matrix[i][j]);
             t.cell(i, j + 2).data(matrix[i][j]).draw();
             var acumular = parseInt(t.cell(4, j + 2).data()) + parseInt(matrix[i][j]);
             t.cell(i, 8).data(acumularcol).draw(false);
             t.cell(4, j + 2).data(acumular).draw(false);
          }
        }
        var total = parseInt(t.cell(0, 8).data()) + parseInt(t.cell(1, 8).data()) + parseInt(t.cell(2, 8).data()) + parseInt(t.cell(3, 8).data());
        t.cell(4, 8).data(total).draw(false);
        $("#_cargando").hide();
    }
  }
  
  function EstadisticasFamiliares(){
    var ObjEsta = new EstadisticaFamiliar();
    var url = Conn.URL + "militar/reportefamiliar";
    $("#_cargando").show();
    CargarAPI(url, "POST", "", ObjEsta);
  
  }