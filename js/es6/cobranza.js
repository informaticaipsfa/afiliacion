class WCobranzaGtxt {
    constructor(){
        console.info("Creando control");
    }
    
    Crear(req){
        waitingDialog.hide();
        $("#_tblLstCobranza").html(ListaCobranzaHTMLZ());
        var t = $('#tblCobranzaZ').DataTable(opcionesCredito);
	    t.clear().draw();
	    
        console.error(req);
        var i = 0;

        req.forEach(e => {
            console.log(e);
            i++;
            t.row.add([
                i, 
                "<a target=top href='tmp/cobranza/" + e.componente + ".txt'>" + e.componente + "</a>", 
                e.cantidad,
                Util.FormatoMoneda(e.monto)
            ]).draw(false);
        });
        
    }
    
    Obtener(){
        return this;
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
    //var ruta =  Conn.URL + "credito/creartxt/2020/12";
    //console.error("Aquí 12");
    CargarAPI(ruta, "GET", wc.Obtener(), wc);
}



function ListaCobranzaHTMLZ(){
	var html = `<table class="ui celled table table-bordered table-striped dataTable " cellspacing="0" width="100%" id="tblCobranzaZ" >
        <thead class="familiares">
		<tr>
			<th>NRO.</th>
			<th>COMPONENTE</th>
            <th>CANTIDAD</th>
            <th>MONTO</th>
        </tr>
        </thead >
        <tbody>
        </tbody>
    </table>`;
    return html;
}