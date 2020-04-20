class WCarnet{
    constructor(){
        this.cedula = '';

        this.estatuscarnet = 0;
        this.Tim = new Carnet();
    }
    Crear(militar){
        var DB = militar.Persona.DatoBasico;
        $("#txtnombre").val(DB.nombreprimero + ' ' + DB.nombresegundo);
        $("#txtapellido").val(DB.apellidoprimero + ' ' + DB.apellidosegundo);
        this.Tim = militar.Tim;

        console.log(this.Tim);
        $("#_lserial").html(this.Tim.serial);
        $("#_lcreadocarnet").html(Util.ConvertirFechaHumana(this.Tim.fechacreacion));
        $("#_lblfechacarnet").html(Util.ConvertirFechaHumana(this.Tim.fechavencimiento));

        $("#_lgrado").html(this.Tim.Grado.descripcion);
        $("#_lcomponente").html(this.Tim.Componente.descripcion);
        $("#_lsituacion").html('IMPRESO');
        $("#_lsucursal").html(this.Tim.usuario);

    }
    Cargar(){

    }
    Obtener(){

    }

   
    
}



function BuscarPorCarnet(){
    ObjMilitar = new WCarnet();
    var url = Conn.URL + "militar/crud/" + $("#txtlcedula").val();
    CargarAPI(url, "GET", "", ObjMilitar);
}


class GCarnet{
    constructor(){
        this.cedula = '';
        this.motivo = '';
        this.descripcion = '';
        this.serial = '';
    }
    Obtener(){        
        this.cedula = $("#txtlcedula").val();
        this.motivo = $("#cmbOpcion").val();
        this.descripcion = $("#txtDescripcion").val();
        this.serial = $("#_lserial").html();
        return this;
    }

    Salvar(){
       
        var url = Conn.URL + "carnet/liberar";
        
        CargarAPI(url, "POST", this.Obtener(), this );
    }

    Crear( resp ){
        if ( resp.msj != undefined ) {
            $("#_contenido").html(resp.mensaje);
        }else{
            $("#_contenido").html('Ocurrio un error inesperado, por favor consulte al administrador'); 
        }
        $("#_botonesmsj").html('<button type="button" class="btn btn-default" data-dismiss="modal"onClick="limpiarInterfazCarnet()">Aceptar</button>');
        $("#modMsj").modal("show");
        return false;
    }

}

function wLiberarCarnet(){
    if ($("#txtlcedula").val() == "" || $("#cmbOpcion").val() == "S" || $("#txtDescripcion").val() == "" ) {
        $("#_contenido").html("Debe introducir los campos obligatorios");
        $("#_botonesmsj").html('<button type="button" class="btn btn-default" data-dismiss="modal"onClick="okLiberar()">Aceptar</button>');
        $("#modMsj").modal("show");
        return false;
    }
    var wCa = new GCarnet();
    wCa.Salvar();
}

function okLiberar(){
    $("#modMsj").modal("hide");
}

function limpiarInterfazCarnet(){
    $("#txtlcedula").val('');
    $("#cmbOpcion").val('S');
    $("#txtnombre").val('');
    $("#txtapellido").val('');
    $("#txtDescripcion").val('');


    $("#_lserial").html('');
    $("#_lcreadocarnet").html('');
    $("#_lblfechacarnet").html('');

    $("#_lgrado").html('');
    $("#_lcomponente").html('');
    $("#_lsituacion").html('');
    $("#_lsucursal").html('');
}