class WMedidaJudicial{
    constructor(){
        this.id = '';
        this.numero = '';
        this.expediente = '';
        this.tipo = 0;
        this.observacion = '';

        this.tipopago = '';    
        this.formula = '';

        this.formapago = '';
        this.institucion = '';  

        this.tipocuenta = '';
        this.numerocuenta = '';
        this.autoridad  = '';
        this.cargo  = '';
        this.estado  = '';
        this.ciudad  = '';
        this.municipio  = '';
        this.descripcion  = '';
        this.cedbeneficiario  = '';
        this.beneficiario  = '';
        this.parentesco  = '';
        this.cedautorizado  = '';
        this.autorizado  = '';
        this.fecha  = '';
        this.fechafin  = '';
        this.usuario = '';
    }

    Obtener(){

    }

    Crear(resq){        
        waitingDialog.hide();
        $.notify(
            {
                title: '<strong>Guadar Medida Judicial!</strong>',
                message: 'finalizo con <strong>éxito</strong>'
            },
            {
                type: 'success'
            } 
        );
        
    }
}

function IncluirMedidaJudicial(){
    myStepper = new Stepper(document.querySelector('#stepper-example'));
    $('#datepicker').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#datepickerfin').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
    });
    $('#cmbbeneficiario').html('<option value="S" selected="selected">SELECCIONE UNA OPCION</option>');
    ObjMilitar.Familiar.forEach(x => { 
        var P = x.Persona.DatoBasico;
        var parentesco = obtenerParentesco(x.parentesco, P.sexo);
        var data = P.cedula + "|" +  P.apellidoprimero + " " + P.nombreprimero + "|" + parentesco; 
        var value = "(" + P.cedula + ") " +  P.apellidoprimero + " " + P.nombreprimero + " - " + parentesco;
        $('#cmbbeneficiario').append(`<option value="${data}">${value}</option>`);
    })

    $('#mdlMedidaJudicial').modal('show');
}

function GuardarMedida(){
    var MJ = new WMedidaJudicial();
    var fn = $("#txtfnxm").val();
    if(fn == ""){
        alertMJ();
        return false;
    }else if(fn.substr(-1) != ";"){
        fn += ";";
    }
    var data = $("#cmbbeneficiario").val().split("|");
    var fecha = new Date(Util.ConvertirFechaUnix($("#datepicker").val())).toISOString();
    var fechafin = new Date(Util.ConvertirFechaUnix($("#datepickerfin").val())).toISOString();

    MJ.id = $("#txtcedula").val();
    MJ.numero = $("#txtoficio").val();
    MJ.expediente = $("#txtexpediente").val();
    MJ.fecha = fecha;
    MJ.fechafin = fechafin;
    MJ.tipo = parseInt($("#cmbtipo").val());
    MJ.observacion = $("#txtobservacion").val();
    //-----------------------------------------
    MJ.tipopago = $("#cmbtipopago").val();
    MJ.formula = fn;
    MJ.formapago = $("#cmbformapago").val();
    MJ.cedautorizado = $("#bntNacionalidad").html() + $("#txtcedulaautorizado").val();
    MJ.autorizado = $("#txtautorizado").val();
    MJ.institucion = $("#txtinstitucion").val();
    MJ.tipocuenta = $("#cmbtipodecuenta").val()
    MJ.numerocuenta = $("#txtnumerocuenta").val()
    //-----------------------------------------    
    MJ.autoridad = $("#txtautoridad").val();
    MJ.cargo = $("#txtcargo").val();
    MJ.estado = $("#cmbestadom").val();
    MJ.ciudad = $("#cmbciudadm").val();
    MJ.municipio = $("#cmbmunicipiom").val();
    MJ.descripcion = $("#txtdesinst").val();
    //-----------------------------------------
    MJ.cedbeneficiario = data[0];
    MJ.beneficiario = data[1];
    MJ.parentesco = data[2]; 
    
    var url = Conn.URL + "medidajudicial";
    $('#mdlMedidaJudicial').modal('hide');
    waitingDialog.show('Guardando Medida Judicial por favor espere...');
    CargarAPI(url, "POST", MJ, MJ);
   
    //console.info(MJ);

}

function alertMJ(){
    $("#alertMedida").html(`Verifique el campo formula en forma de pago
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`);
    $("#alertMedida").show();
}

function obtenerParentesco(strParentesco, sexo){
    var parentesco= "";
		 switch(strParentesco) {
		    case "PD":
		     	parentesco =(sexo=="F")?"MADRE":"PADRE";
		        break;
		    case "HJ":
		    	parentesco = (sexo=="F")?"HIJA":"HIJO";
		        break;
		    case "EA":
				parentesco = (sexo=="F")?"ESPOSA":"ESPOSO";			
		        break;
			case "HO":
		    	parentesco = (sexo=="F")?"HERMANA":"HERMANO";
		        break;
		    default:
		        parentesco = "";
		        break;
		}
		return parentesco;
    return par;
}

function seleccionarNac(id){
    $("#bntNacionalidad").html(id);
}