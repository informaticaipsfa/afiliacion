class Directiva {
    constructor(){

    }
    Obtener(){

    }
    Crear(_DATA){
        _DATA.forEach(v => {
            $("#directiva").append(`<option value=${v.id}>${v.nombre}</option>`);
        });
    }
}

class ListaConceptos {
    constructor(){

    }
    Crear(DATA){        
        $("#_cargandol").show();
        
    }

}




function PrepararNominaView(){
    $("#_TblConceptos").html("");
    var Dir = new Directiva();
    var ruta = Conn.URL + "nomina/directiva";
    CargarAPI(ruta, "GET", "", Dir);
    myStepper = new Stepper(document.querySelector('#stepper-example'));
    $('#mdlPrepararNomina').modal('show');

    var Obj = new ListaConceptos();
    var url = Conn.URL + "nomina/concepto/listar";
    CargarAPI(url, "GET", "", Obj);
    ActivarFechaNomina();
  }

