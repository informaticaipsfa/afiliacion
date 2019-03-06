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
    CargarEstadoMJ();
    $('#datepicker').datepicker({
        autoclose: true,
        format: "yyyy-mm-dd",
        language: 'es'
        });
    $('#mdlMedidaJudicial').modal('show');
}
  

function CargarEstadoMJ(){
    let estado = JSON.parse(sessionStorage.getItem('ipsfaEstado'));
    $("#cmbmestadom").html('<option value="S" selected="selected"></option>');
    estado.forEach(v => {
      $("#cmbmestadom").append(`<option value="${v.codigo}">${v.nombre}</option>`);
    });
}

function CiudadMunicipioMJ(estado, nombre){
    var sciudad = 'cmbmciudadm';
    var smunicipio = 'cmbmmunicipiom';
    if ( nombre != undefined){
        sciudad = 'cmbciudadm';
        smunicipio = 'cmbmunicipiom';
    }
    var cm = JSON.parse(sessionStorage.getItem('ipsfaEstado')); //CiudadMunicipio
    $.each(cm, function(c, v){
        if (v.codigo == estado){

        let ciudad = v.ciudad;
        let municipio = v.municipio;
        $("#" + sciudad).html('<option value="S" selected="selected"></option>');
        $("#" + smunicipio).html('<option value="S" selected="selected"></option>');
        $.each(ciudad, function (c,v){
            $("#" + sciudad).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
        $.each(municipio, function (c,v){
            $("#" + smunicipio).append('<option value="' + v.nombre + '">' + v.nombre + '</option>');
        });
        }
    });
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
    var fecha = new Date(Util.ConvertirFechaUnix($("#datepicker").val())).toISOString();
    MJ.id = $("#txtcedula").val();
    MJ.numero = $("#txtoficio").val();
    MJ.expediente = $("#txtexpediente").val();
    MJ.fecha = fecha;
    MJ.tipo = parseInt($("#cmbtipo").val());
    MJ.observacion = $("#txtobservacion").val();
    //-----------------------------------------
    MJ.tipopago = $("#cmbtipopago").val();
    MJ.formula = fn;
    MJ.formapago = $("#cmbformapago").val();
    MJ.cedautorizado = $("#txtcedulaautorizado").val()
    MJ.autorizado = $("#txtautorizado").val()
    MJ.institucion = $("#txtinstitucion").val();
    MJ.tipocuenta = $("#cmbtipodecuenta").val()
    MJ.numerocuenta = $("#txtnumerocuenta").val()
    //-----------------------------------------    
    MJ.autoridad = $("#txtautoridad").val();
    MJ.cargo = $("#txtcargo").val();
    MJ.estado = $("#cmbestado").val()
    MJ.ciudad = $("#cmbciudad").val()
    MJ.municipio = $("#cmbmunicipio").val();
    MJ.descripcion = $("#txtdesinst").val();
    //-----------------------------------------
    MJ.cedbeneficiario = $("#txtcedulabeneficiario").val()
    MJ.beneficiario = $("#txtbeneficiario").val();
    MJ.parentesco = $("#cmbparentesco").val(); 
    
    var url = Conn.URL + "medidajudicial";
    $('#mdlMedidaJudicial').modal('hide');
    waitingDialog.show('Guardando Medida Judicial por favor espere...');
    CargarAPI(url, "POST", MJ, MJ);
   
    console.info(MJ);

}

function alertMJ(){
    $("#alertMedida").html(`Verifique el campo formula en forma de pago
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>`);
    $("#alertMedida").show();
}