class WCobranzaGtxt {
    constructor(){}
    
    Crear(req){
        console.log(req);
        
    }
    
    Obtener(){

    }
}


function CobranzaGTxt(){
    $("#mdlPrepararMetodo").modal("show");
    $("#divResult").html(`<div class="alert bg-info disabled" role="alert " id="alert" >
        Los archivos a componentes se generan mediante las diferentes firmas y son seguros.<br><br>
        ¿Desea Generar los archivos?
    </div>`);
    $("#divResultFooter").html(`<button type="button" id="btnPreparar" class="btn btn-md btn-success pull-rigth" onclick="CobGtxt()">
        Si</button>
    <button type="button" class="btn btn-md btn-danger" data-dismiss="modal" aria-label="Close">
        No
    </button>`);
}

function CobGtxt(){
    var wc = new WCobranzaGtxt();

    $("#mdlPrepararMetodo").modal("hide");
    waitingDialog.show('Generando archivos bancarios, por favor espere...');
    
    var ruta =  Conn.URL + "credito/creartxt/" + $("#cmbAno").val() + "/" + $("#cmbMes").val();
    CargarAPI(ruta, "GET", wc, wc);
}



