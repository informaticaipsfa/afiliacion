let mdModify = 99;
function MostrarMedidaJudicial(MedidaJudicial,tMJ){
    var i = 0;
    $.each( MedidaJudicial, function (c, v) {
        var num = v.numerocuenta!=undefined?v.numerocuenta:''; 
        var ced = v.cedautorizado!=undefined?v.cedautorizado:'';
        var tip = v.tipocuenta!='S'?v.tipocuenta:'';
        var cod = v.numero!=undefined?v.numero:'';
        var aut = v.autorizado!=undefined?v.autorizado.toUpperCase():'';
        tMJ.row.add([
            cod,
            TipoMedidaJudicial(v.tipo),
            ced,
            aut,
            num, 
            tip,
            Util.ConvertirFechaHumana(v.fecha),
            i,
            ''
        ]).draw(false);
        i++;
    });
    tMJ.column(7).visible(false);
    tMJ.column(8).visible(false);
    $('#tblMedidaJudicial tbody').on('dblclick', 'tr', function () {
        
        var data = tMJ.row(this).data();
        mdModify = data[7];
        var md = ObjMilitar.Pension.MedidaJudicial[mdModify];
        $("#txtfnxm").val(md.formula);        
        $("#txtoficio").val(md.numero);
        $("#txtexpediente").val(md.expediente);
        $("#cmbtipo").val(md.tipo);
        $("#txtobservacion").val(md.observacion);
        $("#datepicker").val(Util.ConvertirFechaHumana(md.fecha));
        $("#datepickerfin").val(Util.ConvertirFechaHumana(md.fechafin));
        //-----------------------------------------
        $("#cmbtipopago").val(md.tipopago);
        
        $("#cmbformapago").val(md.formapago);    
        var data = md.cedautorizado.split("-");
        $("#bntNacionalidad").html(data[0] + "-")
        $("#txtcedulaautorizado").val(data[1]);
        $("#txtautorizado").val(md.autorizado);
        $("#txtinstitucion").val(md.institucion);
        $("#cmbtipodecuenta").val(md.tipocuenta);
        $("#txtnumerocuenta").val(md.numerocuenta);
        //-----------------------------------------    
        $("#txtautoridad").val(md.autoridad);
        $("#txtcargo").val(md.cargo);
        $("#cmbestadom").val(md.estado);
        CiudadMunicipio(2);
        $("#cmbciudadm").val(md.ciudad);
        $("#cmbmunicipiom").val(md.municipio);
        $("#txtdesinst").val(md.descripcion);

        var benef = md.cedbeneficiario + "|" + md.beneficiario + "|" + md.parentesco;
        $("#cmbbeneficiario").val(benef);
        IncluirMedidaJudicial(true);

    });
}

function limipiarMedidaJudicial(){
    $("#txtfnxm").val(''); 
    $("#txtoficio").val('');
    $("#txtexpediente").val('');
    $("#cmbtipo").val('');
    $("#txtobservacion").val('');
    $("#datepicker").val('');
    $("#datepickerfin").val('');
    //-----------------------------------------
    $("#cmbtipopago").val('');

    $("#cmbformapago").val('');

    $("#txtcedulaautorizado").val('');
    $("#txtautorizado").val('');
    $("#txtinstitucion").val('');
    $("#cmbtipodecuenta").val('');
    $("#txtnumerocuenta").val('');
    //-----------------------------------------    
    $("#txtautoridad").val('');
    $("#txtcargo").val('');
    $("#cmbestadom").val('');
    $("#cmbciudadm").val('');
    $("#cmbmunicipiom").val('');
    $("#txtdesinst").val('');
}




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
                title: '<strong>Medida Judicial!</strong>',
                message: 'finalizo con <strong>éxito</strong>'
            },
            {
                type: 'success'
            } 
        );
        
    }
}

function IncluirMedidaJudicial(estatus){
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
    
    $("#txtexpediente").attr('disabled', true);
    FrmMedidaJudicial(true);
    $('#btnInsMedida').hide();
    $('#btnModMedida').hide();
    if(estatus != true){
        $('#cmbbeneficiario').html('<option value="S" selected="selected">SELECCIONE UNA OPCION</option>');
        $('#btnInsMedida').show();
        $('#btnModMedida').hide();
        limipiarMedidaJudicial();
        $("#txtexpediente").attr('disabled', false);
        FrmMedidaJudicial(false);
    }else{
        var visible = $( "#btnMedidaJudicial" ).is(":visible");
        if(visible == true){
            $('#btnInsMedida').hide();
            $('#btnModMedida').show();
            FrmMedidaJudicial(false);
            $("#txtexpediente").attr('disabled', true);
        }
    }
    ObjMilitar.Familiar.forEach(x => { 
        var P = x.Persona.DatoBasico;
        var parentesco = obtenerParentesco(x.parentesco, P.sexo);
        var data = P.cedula + "|" +  P.apellidoprimero + " " + P.nombreprimero + "|" + parentesco; 
        var value = "(" + P.cedula + ") " +  P.apellidoprimero + " " + P.nombreprimero + " - " + parentesco;
        $('#cmbbeneficiario').append(`<option value="${data}">${value}</option>`);
    })
    
    $('#mdlMedidaJudicial').modal('show');
   
}

function GuardarMedida(valor){
    var MJ = new WMedidaJudicial();
    var fn = $("#txtfnxm").val();
    if(fn == ""){
        alertMJ();
        return false;
    }else if(fn.substr(-1) != ";"){
        fn += ";";
    }

    if($('#cmbbeneficiario').val() == "S"){
        alertMJ();
        return false;
    }

    var data = $("#cmbbeneficiario").val().split("|");
    var fecha = new Date(Util.ConvertirFechaUnix($("#datepicker").val())).toISOString();
    var fechafin = new Date(Util.ConvertirFechaUnix($("#datepickerfin").val())).toISOString();

    MJ.id = $("#txtcedula").val().toUpperCase().trim();
    MJ.numero = $("#txtoficio").val().toUpperCase().trim();
    MJ.expediente = $("#txtexpediente").val().toUpperCase().trim();
    MJ.fecha = fecha;
    MJ.fechafin = fechafin;
    MJ.tipo = parseInt($("#cmbtipo").val());
    MJ.observacion = $("#txtobservacion").val().toUpperCase().trim();
    //-----------------------------------------
    MJ.tipopago = $("#cmbtipopago").val().toUpperCase().trim();
    MJ.formula = fn;
    MJ.formapago = $("#cmbformapago").val();
    MJ.cedautorizado = $("#bntNacionalidad").html().toUpperCase().trim() + $("#txtcedulaautorizado").val().toUpperCase().trim();
    MJ.autorizado = $("#txtautorizado").val().toUpperCase().trim();
    MJ.institucion = $("#txtinstitucion").val().toUpperCase().trim();
    MJ.tipocuenta = $("#cmbtipodecuenta").val().toUpperCase().trim();
    MJ.numerocuenta = $("#txtnumerocuenta").val().toUpperCase().trim();
    //-----------------------------------------    
    MJ.autoridad = $("#txtautoridad").val().toUpperCase().trim();
    MJ.cargo = $("#txtcargo").val().toUpperCase().trim();
    MJ.estado = $("#cmbestadom").val().toUpperCase().trim();
    MJ.ciudad = $("#cmbciudadm").val().toUpperCase().trim();
    MJ.municipio = $("#cmbmunicipiom").val().toUpperCase().trim();
    MJ.descripcion = $("#txtdesinst").val().toUpperCase().trim();
    //-----------------------------------------
    MJ.cedbeneficiario = data[0];
    MJ.beneficiario = data[1];
    MJ.parentesco = data[2]; 
    
    var url = Conn.URL + "medidajudicial";
    if(valor == "PUT") url += "/" + mdModify;
    $('#mdlMedidaJudicial').modal('hide');
    waitingDialog.show('Guardando Medida Judicial por favor espere...'); 
    console.log(url);
    CargarAPI(url, valor, MJ, MJ);
   
}

function alertMJ(){
    $("#alertMedida").html(`Verifique el campo formula en forma de pago
    <button type="button" class="close bg-info disabled" data-dismiss="alert" aria-label="Close">
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