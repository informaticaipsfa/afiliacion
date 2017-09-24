let ObjMilitar = new Militar();
let OqMilitar = new Militar();

function Buscar(id) {
    if (id != undefined) {
        $("#_cedula").val(id);
    }
    if ($("#_cedula").val() == "") {
        $("#_contenido").html("Debe introducir una cédula");
        $("#_botonesmsj").html('<button type="button" class="btn btn-default" data-dismiss="modal" id="_aceptar" onClick="IrCedula()">Aceptar</button>');
        $("#modMsj").modal("show");
        return false;
    }
    $("#_cargando").show();
    $("#_lblConstanciaPension").hide();
    $("#_imgfamiliar").attr("src", "images/ndisponible.jpg");

    ObjMilitar = new Militar();
    var url = Conn.URL + "militar/crud/" + $("#_cedula").val();
    CargarAPI(url, "GET", "", ObjMilitar);



}

function BuscarInsert() {
    Buscar($("#txtcedula").val());
}

function activarSalvar() {
    $("#_contenido").html("¿Está seguro que desea editar?");
    var botones = '<button type="button" class="btn btn-success" data-dismiss="modal" id="_aceptar" onClick="activarActualizar()">Si</button>\
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function activarActualizar() {
    $("#_btnModificar").hide();
    $("#_btnConstancia").hide();
    $("#_btnTIM").hide();
    var estado = $("#cmbmestado").val();
    ActivarFormulario(false);
    Estados.ObtenerEstados();
    ActivarCalendarios();
    $("#cmbmestado").val(estado);
    $("#txtcedula").attr("disabled", true);
    $("#_btnActualizar").show();
    var grado = $("#cmbgrado").val();

    cambiarGrado();

}

function Salvar() {
  if (Util.ValidarFormulario("_bxDatoBasico") == false) {
      Util.ModalValidar("Favor completar todos los campos");
      Util.MensajeFormulario("_bxDatoBasico","msjVeriActualizar");
  } else {
      var militar = new Militar();
      militar.Salvar();
      $("#_btnModificar").show();
      $("#_btnActualizar").hide();
      ActivarFormulario(true);
  }
}

function Actualizar() {
    if (Util.ValidarFormulario("_bxDatoBasico") == false) {
        Util.ModalValidar("Favor completar todos los campos");
        Util.MensajeFormulario("_bxDatoBasico","msjVeriActualizar");
    } else {
        var militar = new Militar();
        militar.Actualizar();
        $("#_btnModificar").show();
        $("#_btnActualizar").hide();
        ActivarFormulario(true);
    }
}

function editarDB() {
    FrmDatosBasicos(false);
    $('#modMsj').modal('hide');
    $("#salvar").show();
}

function retornarFecha() {

}

function desactivarSalvar() {
    $('#modMsj').modal('hide');
    $("#salvar").hide();
    FrmDatosBasicos(true);
}

function SeleccionarPorSexo(sexo) {
    if (sexo == undefined) {
        gen = ($("#cmbsexo").val() == 'F') ? "A" : "O";
    } else {
        gen = (sexo == 'F') ? "A" : "O";
    }
    $("#cmbedocivil").html('<option value=""></option><option value="S">SOLTER' + gen + '</option>\
  <option value="C">CASAD' + gen + '</option> \
  <option value="D">DIVORCIAD' + gen + '</option>\
  <option value="V">VIUD' + gen + '</option>');
}

function SeleccionarPorSexoFamiliar(sexo) {
    if (sexo == undefined) {
        gen = ($("#cmbsexof").val() == 'F') ? "A" : "O";
    } else {
        gen = (sexo == 'F') ? "A" : "O";
    }
    $("#cmbedocivilf").html('<option value=""></option><option value="S">SOLTER' + gen + '</option>\
    <option value="C">CASAD' + gen + '</option> \
    <option value="D">DIVORCIAD' + gen + '</option>\
    <option value="V">VIUD' + gen + '</option>');

    if (gen == "A") {
        $("#cmbparentescof").html('<option value="HJ">HIJ' + gen + '</option>\
        <option value="PD">MADRE</option>\
        <option value="EA">ESPOSA</option>\
        <option value="HO">HERMANA</option>\
    ');
    } else {
        $("#cmbparentescof").html('<option value="HJ">HIJ' + gen + '</option>\
      <option value="PD">PADRE</option>\
      <option value="EA">ESPOSO</option>\
      <option value="HO">HERMANO</option>');
    }

}

function BancariosHTML() {
    var html = '<table class="ui celled table" cellspacing="0" width="100%" id="tblBanco" >\
    <thead>\
      <tr>\
        <th>Nro.</th>\
        <th>Institución Financiera</th>\
        <th>Tipo de Cuenta</th>\
        <th>Nro. de Cuenta</th>\
      </tr>\
    </thead>\
    <tbody>\
    </tbody>\
  </table>';
    return html;
}

function FamiliaresHTML() {
    var html = '<table class="ui celled table " cellspacing="0" width="100%" id="tblFamiliares" >\
    <thead class="familiares">\
      <tr>\
        <th>NRO.</th>\
        <th>CÉDULA</th>\
        <th>APELLIDOS Y NOMBRES</th>\
        <th>RELACIÓN</th>\
        <th>SITUACIÓN</th>\
        <th>FECHA</th>\
        <th>TIPO</th>\
        <th>MODIFICAR</th>\
        <th>NOMBRES</th>\
        <th>SEXO</th>\
        <th>APELLIDOS</th>\
        <th>CONDICION ESPECIAL</th>\
        <th>ESTUDIA</th>\
        <th>FECHA VCTO. CARNET</th>\
        <th>ACTUALIZAR</th>\
        <th>FOTO</th>\
      </tr>\
    </thead >\
    <tbody>\
    </tbody>\
  </table>';
    return html;

}

function ConstanciaFamiliaresHTML() {
    var html = '<table class="table-fondo " cellspacing="0" width="100%" id="tblConstFamiliares" >\
    <thead>\
      <tr class="titulo_tabla table-borderedtd" >\
        <th class="alinear_td">APELLIDOS Y NOMBRES</th>\
        <th class="alinear_tddatos">CÉDULA</th>\
        <th class="alinear_tddatos">PARENTESCO</th>\
        <th class="alinear_tddatos">FECHA NAC.</th>\
        <th class="alinear_tddatos">EDO CIVIL</th>\
        <th class="alinear_tddatos">SITUACIÓN</th>\
      </tr>\
    </thead >\
    <tbody id="_contenidoFamiliares">\
    </tbody>\
  </table>';

    return html;

}

function HistoricoMilitarHTML() {
    var html = '<table id="tblhistoricomilitar" class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example1_info">\
    <thead>\
      <tr>\
        <th>#</th>\
        <th>CATEGORIA</th>\
        <th>CLASIFICACIÓN</th>\
        <th>SITUACIÓN</th>\
        <th>GRADO</th>\
        <th>FECHA RESUELTO</th>\
      </tr>\
    </thead>\
    <tbody>\
    </tbody>\
  </table>';
    return html;
}

function IrCedula() {

    $("#_cedula").focus();
}


function ConvertirFechaActual() {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var f = new Date();

    return f.getDate() + " días " +" del mes de " + meses[f.getMonth()] + " de " + f.getFullYear();
}

function IncluirFamiliar() {
    $("#modFamiliar").modal('show');
    BlanquearFamiliar();
    ActivarCalendariosFamiliar();
}

function ValidarCorreo() {
    var email = $('#txtmcorreo').val();
    var emailf = $('#txtmcorreof').val();
    var caracter = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

    if (!caracter.test(email)) {
        $.notify($('#txtmcorreo'), "Formato de correo invalido", {position: "top"});
        return false;
    } else {
        return true;
    }
}


function FrmFamiliar(valor) {
    $("#txtcedulaf").attr('disabled', valor);
    $("#txtnombref").attr('disabled', valor);
    $("#txtapellidof").attr('disabled', valor);
    $("#txtnacimientof").attr('disabled', valor);
    $("#cmbsexof").attr('disabled', valor);
    $("#cmbedocivilf").attr('disabled', valor);
    $("#cmbparentescof").attr('disabled', valor);
    $("#cmbcondicionf").attr('disabled', valor);
    $("#cmbsituacionf").attr('disabled', valor);
    $("#txtdefuncionf").attr('disabled', valor);

    $("#cmbestudiaf").attr('disabled', valor);
    $("#cmbestadof").attr('disabled', valor);
    $("#cmbmunicipiof").attr('disabled', valor);
    $("#cmbparroquiaf").attr('disabled', valor);
    $("#cmbciudadf").attr('disabled', valor);
    $("#txtcallef").attr('disabled', valor);
    $("#txtcasaf").attr('disabled', valor);
    $("#txtaptof").attr('disabled', valor);
    $("#txttelefonof").attr('disabled', valor);
    $("#txtcelularf").attr('disabled', valor);
    $("#txtcorreof").attr('disabled', valor);
    $("#txtpregistrocivilf").attr('disabled', valor);
    $("#txtpanof").attr('disabled', valor);
    $("#txtpactaf").attr('disabled', valor);
    $("#txtpfoliof").attr('disabled', valor);
    $("#txtplibrof").attr('disabled', valor);
    $("#txtestaturaf").attr('disabled', valor);
    $("#txtpesof").attr('disabled', valor);
    $("#txttallaf").attr('disabled', valor);
    $("#txtgruposanguineof").attr('disabled', valor);
    $("#cmbpielf").attr('disabled', valor);
    $("#cmbojosf").attr('disabled', valor);
    $("#cmbcolorcabellof").attr('disabled', valor);
    $("#txtsenaparticularf").attr('disabled', valor);
    //
    $("#txtcarreraf").attr('disabled', valor);
    $("#cmbnivelf").attr('disabled', valor);
    $("#txtsemestref").attr('disabled', valor);
    $("#txtiniciof").attr('disabled', valor);
    $("#txtfinf").attr('disabled', valor);
    $("#txtuniversidadf").attr('disabled', valor);
    $("#txtuniversidadf").attr('disabled', valor);
    //
    $("#txtfechacondicionf").attr('disabled', valor);
    $("#cmbDiscapacidadf").attr('disabled', valor);
    $("#txtdiagnosticof").attr('disabled', valor);
    $("#cmbHospitalf").attr('disabled', valor);
    $("#btnnacionalidad").attr('disabled', valor);


    if (valor == false) {
        $("#imgIngFam").show();
        $("#_btnActeptarFamiliar").show();
    } else {
        $("#imgIngFam").hide();
        $("#_btnActeptarFamiliar").hide();
    }


}

function LimpiarFrmFamiliar() {
    $("#txtcedulaf").val("");
    $("#txtnombref").val("");
    $("#txtapellidof").val("");
    $("#txtnacimientof").val("");
    $("#cmbsexof").val("S");
    $("#cmbedocivilf").val("SS");
    $("#cmbparentescof").val("S");
    $("#cmbsituacionf").val("S");
    $("#cmbcondicionf").val("S");
    $("#cmbestudiaf").val("S");
    $("#cmbestadof").val("S");
    $("#cmbmunicipiof").val("S");
    $("#cmbparroquiaf").val("S");
    $("#cmbciudadf").val("S");
    $("#txtcallef").val("");
    ;
    $("#txtcasaf").val("");
    $("#txtaptof").val("");
    $("#txttelefonof").val("");
    $("#txtcelularf").val("");
    $("#txtcorreof").val("");
    $("#txtpregistrocivilf").val("");
    $("#txtpanof").val("");
    $("#txtpactaf").val("");
    $("#txtpfoliof").val("");
    $("#txtplibrof").val("");
    $("#txtestaturaf").val("");
    $("#txtpesof").val("");
    $("#txttallaf").val("");
    $("#txtgruposanguineof").val("");
    $("#cmbpielf").val("");
    $("#cmbojosf").val("");
    $("#cmbcolorcabellof").val("");
    $("#txtsenaparticularf").val("");

    //
    $("#txtcarreraf").val("");
    $("#cmbnivelf").val("");
    $("#txtsemestref").val("");
    $("#txtiniciof").val("");
    $("#txtfinf").val("");
    $("#txtuniversidadf").val("");
    $("#txtuniversidadf").val("");
    //
    $("#txtfechacondicionf").val("");
    $("#cmbDiscapacidadf").val("");
    $("#txtdiagnosticof").val("");
    $("#cmbHospitalf").val("");

    $("#txtedadf").val("");

    urlf = "imagenes/ndisponible.jpg";
    $("#_imgIngFam").attr("src", urlf);
    // $("#txttwitterf").val("");
    // $("#txtfacebookf").val("");
    // $("#txtinstagranf").val("");
    // $("#txtlinkedinf").val("");

}


function ActivarBuscar() {
    $(location).attr("href","starter.html");
    // $("#_ficha").hide();
    // $("#_consultarbox").show();
    // $("#_search").hide();
}

function VisualizarCarnet() {
    if (Util.ValidarFormulario("_frmDatoBasico") == false) {
        Util.ModalValidar("Favor actualizar afiliado");
    } else {
        //alert(ObjMilitar.estatuscarnet);
        if (ObjMilitar.estatuscarnet == undefined || ObjMilitar.estatuscarnet == 3 || ObjMilitar.estatuscarnet == 0) {
            $("#modCarnetValidar").modal("show");
        } else {
            var militar = OqMilitar;
            url = "images/grados/" + militar.Grado.abreviatura + ".png";

            url = url.toLowerCase();
            $("#imggradoCarnet").attr("src", url);

            url = "temp/" + $("#txtcedula").val() + "/foto.jpg";
            $("#imgfotoCarnet").attr("src", url);
            $("#lblgrado").html(militar.Grado.descripcion);
            $("#lblnombre").html(militar.Persona.DatoBasico.nombreprimero);
            $("#lblapellido").html(militar.Persona.DatoBasico.apellidoprimero);
            $("#lblcedula").html("C.I. " + militar.Persona.DatoBasico.cedula);
            url = "temp/" + $("#txtcedula").val() + "/huella.bmp";

            $("#imghuellaCarnet").attr("src", url);
            $("#divcategoria").html(militar.ObtenerCategoria());
            $("#divsiglas").html(militar.Componente.abreviatura);
            url = "images/firma.png";
            $("#imgfirmaCarnet").attr("src", url);
            if (militar.clase == "TPROF"){
              $("#notapie").html('AUTORIZADO PARA PORTAR ARMAS DE FUEGO EN COMISIÓN DE SERVICIO, EN ACTOS DEL SERVICIO O EN OCASIÓN DE ESTE');
            } else{
              $("#notapie").html('AUTORIZADO PARA PORTAR ARMAS DE FUEGO ASIGNADAS POR LA FANB');
            }
            $("#lblcodigo").html(militar.codigocomponente);
            $("#lblhistoria").html(militar.numerohistoria);
            $("#lblcabello").html(militar.Persona.DatoFisionomico.ObtenerCabello());
            $("#lblgrupo").html(militar.Persona.DatoFisionomico.gruposanguineo);
            $("#lblestatura").html(militar.Persona.DatoFisionomico.estatura);
            $("#lblojos").html(militar.Persona.DatoFisionomico.ObtenerOjo());
            $("#lblcolor").html(militar.Persona.DatoFisionomico.ObtenerPiel());
            $("#visorCarnet").modal("show");
        }
    }
}

function VisualizarCarnetFamiliar() {
    var cedula = $("#_bfcedula").attr("attced");
    var hasta = ObjMilitar.Familiar.length;
    var pos = "";
    for(var i=0;i<= hasta;i++){
        if(ObjMilitar.Familiar[i].Persona.DatoBasico.cedula == cedula ){
            pos = i;
            break;
        }
    }
    if(pos != ""){

    }

    url = Conn.URLIMG + cedula + ".jpg";

    $("#imgfotoCarnetf").attr("src", url);

    url = Conn.URLIMG + ObjMilitar.Familiar[pos].Persona.DatoBasico.cedula + ".jpg";

    $("#imgfirmaCarnetf").attr("src", url);
    $("#divfechavencimiento").html("**********");
    $("#lblnombref").html(ObjMilitar.Familiar[pos].Persona.DatoBasico.nombreprimero);
    $("#lblapellidof").html(ObjMilitar.Familiar[pos].Persona.DatoBasico.apellidoprimero);
    $("#lblcedulaf").html(cedula);
    $("#lblparentescof").html(Util.ConvertirParentesco(ObjMilitar.Familiar[pos].parentesco,ObjMilitar.Familiar[pos].Persona.DatoBasico.sexo));
    $("#lblafiliadof").html(OqMilitar.Persona.DatoBasico.apellidoprimero+" "+OqMilitar.Persona.DatoBasico.nombreprimero+" CI:"+OqMilitar.Persona.DatoBasico.cedula);
    url = "temp/" + cedula + "/huella.bmp";
    $("#imghuellaCarnetf").attr("src", url);

    $("#lblhistoriaf").html(ObjMilitar.Familiar[pos].numerohistoria);
    $("#lblgsanguineof").html(ObjMilitar.Familiar[pos].Persona.DatoFisionomico.gruposanguineo);
    $("#lbldonantef").html(ObjMilitar.Familiar[pos].donante);

    $("#visorCarnetFamiliar").modal("show");
    //ImprimirCarnetFamiliar("_objectPDF2");
}

function ContinuarTIM() {

    var recibo = new Recibo();
    if (recibo.Verificar() === true) {
        recibo.Salvar();
        $('#modCarnetValidar').modal('hide');
    } else {

    }
}

function ContinuarTIF() {

    var recibo = new Recibo();
    if (recibo.VerificarF() === true) {
        recibo.SalvarF();
        $('#modCarnetValidarf').modal('hide');
    } else {
    }
}

function enviarCarnetFamiliar() {
    $("#modCarnetValidarf").modal("show");
}

function ActivarCalendarios() {
    $('#txtnacimiento').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#txtfechagraduacion').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#txtdefuncion').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#txtmfecharesuelto').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#txtmfechaC').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $('#txtmfechaultimoascenso').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });


    ////ACTIVAR MASK
    $('[data-mask]').inputmask();
}

function ActivarCalendariosFamiliar() {
    $('#txtnacimientof').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });

    $('#txtfechacondicionf').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });

    $('#txtiniciof').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });

    $('#txtfinf').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });


    $('#txtnacimientom').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });

    $('#txtnacimientof').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    ////ACTIVAR MASK
    $('[data-mask]').inputmask();


}

function incluirAfiliado(ced) {

    ActivarCalendarios();
    if ( ObjMilitar.id != "" ){
       $('#txtcedula').val("");
    }
    //ObjMilitar = new Militar();
    $('#txtcedula').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });
    var cedula = $('#txtcedula').val();
    $("#_divfechanacimiento").hide();
    $("#_divfechadefuncion").hide();
    $("#_cedula").val("");
    $("#_ficha").show();
    $("#_consultarbox").hide();
    $("#_search").show();
    $("#_bxFamiliar").hide();
    $("#_bxFamiliarTarjeta").hide();
    $("#_btnConstancia").hide();
    $("#_btnTIM").hide();
    $("#_btnModificar").hide();
    $("#_btnSavlvar").show();
    Util.ValidarFormulario("_frmDatoBasico");
    ActivarFormulario(false);
    LimpiarFrmDatosBasicos();
    LimpiarFrmDatosMilitar();
    LimpiarFrmCuentaBancaria();
    LimpiarFrmDireccion();
    LimpiarFrmPartidaNacimiento();
    LimpiarFrmFisicoFisionomico();
    LimpiarFrmRedSocial();
    LimpiarFrmTim();
    LimpiarFrmTarjeta();

    Estados.ObtenerEstados();
    if ( cedula != "" ){
       $('#txtcedula').val(cedula);
    }

}

function ActivarFormulario(valor) {
    FrmDatosBasicos(valor);
    FrmDatosMilitar(valor);
    FrmCuentaBancaria(valor);
    FrmDireccion(valor);
    FrmPartidaNacimiento(valor);
    FrmFisicoFisionomico(valor);
    FrmRedSocial(valor);
    FrmTim(valor);
    ModDocumentoCivil(valor);
}

function FrmDatosBasicos(valor) {
    $("#txtcedula").attr('disabled', valor);
    $("#txtnombre").attr('disabled', valor);
    $("#txtapellido").attr('disabled', valor);
    $("#txtnacimiento").attr('disabled', valor);
    $("#cmbsexo").attr('disabled', valor);
    $("#cmbedocivil").attr('disabled', valor);
    $("#txtdefuncion").attr('disabled', valor);
    $("#txtareconocido").attr('disabled', valor);
    $("#txtmreconocido").attr('disabled', valor);
    $("#txtdreconocido").attr('disabled', valor);
    $("#cmbpbaja").attr('disabled', valor);
    $("#cmbtipopension").attr('disabled', valor);
    $("#txtporcentaje").attr('disabled', valor);

    //$("#btnnacimiento").attr('disabled', valor);
    if (valor == false) {
        $("#cargarcopiacedula").show();
        $("#cargarpartida").show();
        $("#cargarfoto").show();
        $("#cargarfirma").show();
        $("#cargarhuella").show();
        $("#_reconocidos").show();

    } else {
        $("#cargarcopiacedula").hide();
        $("#cargarpartida").hide();
        $("#cargarfoto").hide();
        $("#cargarfirma").hide();
        $("#cargarhuella").hide();
        $("#_reconocidos").hide();
    }
    //$("#btnnacimiento").attr('disabled', valor);
    //$("#btndefuncion").attr('disabled', valor);
}

function LimpiarFrmDatosBasicos() {
    $("#txtcedula").val("");
    $("#txtnombre").val("");
    $("#txtapellido").val("");
    $("#txtnacimiento").val("");
    $("#cmbsexo").val("");
    $("#cmbedocivil").val("");
    $("#txtdefuncion").val("");
    $("#btnnacimiento").val("");
    $("#btndefuncion").val("");
}

function FrmDatosMilitar(valor) {
    $("#txtfechagraduacion").attr('disabled', valor);
    $("#cmbcomponente").attr('disabled', valor);
    $("#cmbgrado").attr('disabled', valor);
    $("#cmbsituacion").attr('disabled', valor);
    $("#cmbclase").attr('disabled', valor);
    $("#cmbcategoria").attr('disabled', valor);

    $("#txtnresuelto").attr('disabled', valor);
    $("#txtmfecharesuelto").attr('disabled', valor);
    $("#txtposicion").attr('disabled', valor);
    $("#txtcodigocomponente").attr('disabled', valor);
    $("#txtnumhistoriaclinica").attr('disabled', valor);
    $("#txtmfechaultimoascenso").attr('disabled', valor);


}

function LimpiarFrmDatosMilitar(valor) {
    $("#txtfechagraduacion").val("");
    $("#cmbcomponente").val("");
    $("#cmbgrado").val("");
    $("#cmbsituacion").val("");
    $("#cmbclase").val("");
    $("#cmbcategoria").val("");
    $("#txtnresuelto").val("");
    $("#txtmfecharesuelto").val("");
    $("#txtposicion").val("");
    $("#txtcodigocomponente").val("");
    $("#txtnumhistoriaclinica").val("");
    $("#txtmfechaultimoascenso").val("");
}

function NacionalidadFamiliar(nac) {
    $("#btnnacionalidad").html(nac);
}

function NacionalidadFamiliar2(nac) {
    if(nac == "M"){
        var posiF = ObjMilitar.Familiar.length;
        $("#txtcedulam").val("10"+$("#txtcedula").val()+posiF);
        $("#txtcedulam").attr("disabled",true);
    }else{
        $("#txtcedulam").attr("disabled",false);
    }
    $("#btnnacionalidadm").html(nac);
    NacionalidadFamiliar(nac);
}

function FrmCuentaBancaria(valor) {
    $("#cmbminstfinanciera").attr('disabled', valor);
    $("#cmbmtipofinanciera").attr('disabled', valor);
    $("#txtmnrocuenta").attr('disabled', valor);
    if (valor == false) {
        $("#_cmbminstfinanciera").show();
        $("#_cmbmtipofinanciera").show();
        $("#_txtmnrocuenta").show();
    } else {
        $("#_cmbminstfinanciera").hide();
        $("#_cmbmtipofinanciera").hide();
        $("#_txtmnrocuenta").hide();
    }
}

function LimpiarFrmCuentaBancaria(valor) {
    $("#cmbminstfinanciera").val("S");
    $("#cmbmtipofinanciera").val("S");
    $("#txtmnrocuenta").val("");
    $("#_tblBancos").html(BancariosHTML());
    $("#_tblFamiliares").html(FamiliaresHTML());
}

function FrmDireccion(valor) {
    $("#cmbmestado").attr('disabled', valor);
    $("#cmbmmunicipio").attr('disabled', valor);
    $("#cmbmparroquia").attr('disabled', valor);
    $("#cmbmciudad").attr('disabled', valor);
    $("#txtmcalle").attr('disabled', valor);
    $("#txtmcasa").attr('disabled', valor);
    $("#txtmapto").attr('disabled', valor);
    $("#txtmtelefono").attr('disabled', valor);
    $("#txtmcelular").attr('disabled', valor);
    $("#txtmcorreo").attr('disabled', valor);
}

function LimpiarFrmDireccion(valor) {
    $("#cmbmestado").html('<option selected="selected" value="S"></option>');
    $("#cmbmmunicipio").html('<option selected="selected" value="S"></option>');
    $("#cmbmparroquia").html('<option selected="selected" value="S"></option>');
    $("#cmbmciudad").html('<option selected="selected" value="S"></option>');
    $("#txtmcalle").val("");
    $("#txtmcasa").val("");
    $("#txtmapto").val("");
    $("#txtmtelefono").val("");
    $("#txtmcelular").val("");
    $("#txtmcorreo").val("");
}

function FrmPartidaNacimiento(valor) {
    $("#txtpregistrocivil").attr('disabled', valor);
    $("#txtpano").attr('disabled', valor);
    $("#txtpacta").attr('disabled', valor);
    $("#txtpfolio").attr('disabled', valor);
    $("#txtplibro").attr('disabled', valor);
    //
    $("#txtRegistroCivilN").attr('disabled', valor);
    $("#txtAnoN").attr('disabled', valor);
    $("#txtNumeroActaN").attr('disabled', valor);
    $("#txtNumeroFolioN").attr('disabled', valor);
    $("#txtLibroN").attr('disabled', valor);
}

function LimpiarFrmPartidaNacimiento(valor) {
    $("#txtpregistrocivil").val("");
    $("#txtpano").val("");
    $("#txtpacta").val("");
    $("#txtpfolio").val("");
    $("#txtplibro").val("");
    //
    $("#txtpregistrocivilN").val("");
    $("#txtpanoN").val("");
    $("#txtpactaN").val("");
    $("#txtpfolioN").val("");
    $("#txtplibroN").val("");
}

function FrmFisicoFisionomico(valor) {
    $("#txtmestatura").attr('disabled', valor);
    $("#txtmpeso").attr('disabled', valor);
    $("#txtmtalla").attr('disabled', valor);
    $("#cmbmgruposanguineo").attr('disabled', valor);
    $("#cmbmpiel").attr('disabled', valor);
    $("#cmbmojos").attr('disabled', valor);
    $("#cmbmcolorcabello").attr('disabled', valor);
    $("#txtmsenaparticular").attr('disabled', valor);
}

function LimpiarFrmFisicoFisionomico(valor) {
    $("#txtmestatura").val("");
    $("#txtmpeso").val("");
    $("#txtmtalla").val("");
    $("#cmbmgruposanguineo").val("S");
    $("#cmbmpiel").val("S");
    $("#cmbmojos").val("S");
    $("#cmbmcolorcabello").val("S");
    $("#txtmsenaparticular").val("");
}

function FrmRedSocial(valor) {
    $("#txtmtwitter").attr('disabled', valor);
    $("#txtmfacebook").attr('disabled', valor);
    $("#txtminstagran").attr('disabled', valor);
    $("#txtmlinkedin").attr('disabled', valor);
}

function LimpiarFrmRedSocial(valor) {
    $("#txtmtwitter").val("");
    $("#txtmfacebook").val("");
    $("#txtminstagran").val("");
    $("#txtmlinkedin").val("");
}


function FrmTim(valor) {
    $("#_imghuella").attr('disabled', valor);
    $("#_imgfirma").attr('disabled', valor);
}

function LimpiarFrmTim(valor) {
    $("#_imghuella").val("");
    $("#_imgfirma").val("");
}

function LimpiarFrmTarjeta() {


    $("#_img").attr("src", "images/ndisponible.jpg");
    $("#_imggrado").attr("src", "images/grados/no.png");
    $("#_fingreso").html("");
    $("#_fascenso").html("");
    $("#_categoria").html("");
    $("#_situacion").html("");
    $("#_clasificacion").html("");
    $("#_tiemposervicio").html("");
}

function ModDocumentoCivil(valor) {
    doc = $("#cmbedocivil option:selected").val();
    switch (doc) {
        case "C":
            $("#txtRegistroCivilM").attr('disabled', valor);
            $("#txtAnoM").attr('disabled', valor);
            $("#txtNumeroActaM").attr('disabled', valor);
            $("#txtNumeroFolioM").attr('disabled', valor);
            $("#txtLibroM").attr('disabled', valor);
            break;
        case "D":
            $("#txttribunalD").attr('disabled', valor);
            $("#txtnumerosentenciaD").attr('disabled', valor);
            $("#txtfechasentenciaD").attr('disabled', valor);
            break;
        case "V":
            $("#txtRegistroCivilV").attr('disabled', valor);
            $("#txtFechaV").attr('disabled', valor);
            break;
        case "S":
            $("#txtRegistroCivilS").attr('disabled', valor);
            $("#txtFechaS").attr('disabled', valor);
            break;
        default:
    }

}

function FrmDireccionFamiliar(valor) {
    $("#txtmtwitter").attr('disabled', valor);
    $("#txtmfacebook").attr('disabled', valor);
    $("#txtminstagran").attr('disabled', valor);
    $("#txtmlinkedin").attr('disabled', valor);
}

function LimpiarFrmDireccionFamiliar(valor) {
    $("#txtmtwitter").val("");
    $("#txtmfacebook").val("");
    $("#txtminstagran").val("");
    $("#txtmlinkedin").val("");
}


function seleccionarActas() {
    edo = $("#cmbedocivil option:selected").val();
    switch (edo) {
        case "C":
            $('#modDocumentCasado').modal('show');
            break;
        case "D":
            $('#modDocumentDivorcio').modal('show');
            break;
        case "V":
            $('#modDocumentViudez').modal('show');
            break;
        case "S":
            break;
        default:
    }
}

function seleccionarPartida() {
    nac = $("#txtnacimiento").val();
    $('#modDocumentPartida').modal('show');
}

function seleccionarCopiaCedula() {
    $('#modDocumentCedula').modal('show');
}

function seleccionarDefuncion() {
    def = $("#txtdefuncion").val();
    $("#_titulopd").html("Registrar Acta de Defunción");
    CargarUrl("_contenidopd", "afi/actadefuncion");
    $('#modPartidaActa').modal('show');
}


function cambiarGrado() {
    var url = Conn.URL + "componente/" + $("#cmbcomponente option:selected").val();
    var comp = new Componente();
    CargarAPI(url, "GET", "", comp);
}

function ValidarCampos() {

}

function GenerarCodigoBarra() {

}

function ValidarGenerarCarnet() {
    cr = $("#cmbMotivoCarnet option:selected").val();
    $('#txtmfechaC').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $("#_reciboC").show();
    $("#txtnresueltoC").val($("#txtnresuelto").val());
    $("#txtmfecharesueltoC").val($("#txtmfecharesuelto").val());
    $("#txtposicionC").val($("#txtposicion").val());
    switch (cr) {
        case "V":
            $("#_cingreso").show();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").hide();
            break;
        case "I":
            $("#_cingreso").show();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").hide();
            break;
        case "C":
            $("#_cingreso").show();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").hide();
            break;
        case "D":
            $("#_cingreso").hide();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").show();
            break;
        case "E":
            $("#_cingreso").hide();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").show();
            break;
        case "CA":
            $("#_cingreso").hide();
            $("#_cvencimiento").hide();
            $("#_cdeterioro").show();
            break;
        default:
    }
}

function ValidarGenerarCarnetF() {
    cr = $("#cmbMotivoCarnetf option:selected").val();
    $('#txtmfechaCf').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    $("#_reciboCf").show();

    switch (cr) {
        case "V":
            $("#_cingresoF").show();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").hide();
            break;
        case "I":
            $("#_cingresoF").show();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").hide();
            break;
        case "C":
            $("#_cingresoF").show();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").hide();
            break;
        case "D":
            $("#_cingresoF").hide();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").show();
            break;
        case "E":
            $("#_cingresoF").hide();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").show();
            break;
        case "CA":
            $("#_cingresoF").hide();
            $("#_cvencimientoF").hide();
            $("#_cdeterioroF").show();
            break;
        default:
            break;
    }
}

function SeleccionarCuenta() {
    $("#txtmnrocuenta").val($("#cmbminstfinanciera option:selected").val());
}


function ModificarFamiliarPos(pos) {
    if (Util.ValidarFormulario("_frmDatoBasico") == false) {
        Util.ModalValidar("Favor actualizar afiliado");
    } else {
        FrmFamiliar(false);
        ActivarCalendariosFamiliar();
        var Familiar = ObjMilitar.Familiar[pos - 1];
        var Persona = Familiar.Persona;
        var DB = Persona.DatoBasico;

        $("#tipoModFam").val(1);
        $("#modFamiliar").modal('show');
        $('#txtcedulaf').val(DB.cedula);
        $("#txtnropersonaf").val(DB.nropersona);
        $('#txtidf').val(DB.cedula);
        SeleccionarPorSexoFamiliar(DB.sexo);
        $('#btnnacionalidad').val(NacionalidadFamiliar(DB.nacionalidad));

        $('#txtnacimientof').val(Util.ConvertirFechaHumana(DB.fechanacimiento));
        $('#txtedadf').val(Util.CalcularEdad($('#txtnacimientof').val()));
        $('#txtnombref').val(DB.nombreprimero);
        $('#txtapellidof').val(DB.apellidoprimero);
        $('#cmbsexof').val(DB.sexo);
        $('#cmbcondicionf').val(Familiar.condicion);
        $('#cmbestudiaf').val(Familiar.estudia);



        $("#txtpregistrocivilf").val(Persona.PartidaNacimiento.registro);
        $("#txtpanof").val(Persona.PartidaNacimiento.ano);
        $("#txtpactaf").val(Persona.PartidaNacimiento.acta);
        $("#txtpfoliof").val(Persona.PartidaNacimiento.folio);
        $("#txtplibrof").val(Persona.PartidaNacimiento.libro);
        $("#txtpesof").val(Persona.DatoFisico.peso);
        $("#txttallaf").val(Persona.DatoFisico.talla);
        $("#cmbpielf").val(Persona.DatoFisionomico.colorpiel);
        $("#cmbojosf").val(Persona.DatoFisionomico.colorojos);
        $("#cmbcolorcabellof").val(Persona.DatoFisionomico.colorcabello);
        $("#txtestaturaf").val(Persona.DatoFisionomico.estatura);
        $("#txtsenaparticularf").val(Persona.DatoFisionomico.senaParticular);
        $("#txtgruposanguineof").val(Persona.DatoFisionomico.gruposanguineo);
        $("#txttwitterf").val(Persona.RedSocial.twitter);
        $("#txtfacebookf").val(Persona.RedSocial.facebook);
        $("#txtinstagranf").val(Persona.RedSocial.instagram);

        $("#txtcorreof").val(Persona.Correo.principal);
        $("#txttelefonof").val(Persona.Telefono.domiciliario);
        $("#txtcelularf").val(Persona.Telefono.movil);
        $("#hclinicaf").val(Familiar.historiamedica);
        $("#donantef").val(Familiar.donante);
        $("#gsanguineof").val(Persona.DatoFisionomico.gruposanguineo);
        valor = 0;
        if (Familiar.beneficio == true) {
            valor = 1;
        }
        $('#cmbsituacionf').val(valor);
        $("#cmbedocivilf").val("S");
        $("#_condicionf").hide();
        $("#_estudiaf").hide();
        $("#_condicionfdoc").hide();
        $("#_estudiafdoc").hide();

        if (Familiar.Persona.Direccion != undefined) {

            var DIR = Familiar.Persona.Direccion[0];

            $("#cmbestadof").val(DIR.estado);
            CiudadMunicipio(1);
            $("#cmbmunicipiof").val(DIR.municipio);
            SeleccionarParroquia(1);
            $("#cmbparroquiaf").val(DIR.parroquia);
            $("#cmbciudadf").val(DIR.ciudad);
            $("#txtcallef").val(DIR.calleavenida);
            $("#txtcasaf").val(DIR.casa);
            $("#txtaptof").val(DIR.apartamento);

        }

        if (Familiar.parentesco == "EA") {
            $("#cmbedocivilf").val("C");
        } else if (Familiar.parentesco == "HJ") {
            $("#_condicionf").show();
            $("#_estudiaf").show();
            $("#_condicionfdoc").show();
            $("#_estudiafdoc").show();
        } else {

        }


        $("#cmbparentescof").val(Familiar.parentesco);
        urlf = Conn.URLIMG + DB.cedula + ".jpg";
        $("#_imgIngFam").attr("src", urlf);

        urlf = "temp/" + ObjMilitar.id + "/partida" + DB.cedula + ".jpg";
        $("#_imgpartidaF").attr("src", urlf);

        urlf = "temp/" + ObjMilitar.id + "/cestudio" + DB.cedula + ".jpg";
        $("#_imgEstudiaf").attr("src", urlf);
        $("#hclinicaf").val(Familiar.historiamedica);
        $("#gsanguineof").val(Familiar.Persona.DatoFisionomico.gruposanguineo);
        $("#donantef").val(Familiar.donante);
    }
}

function ModificarFamiliar() {
    if (Util.ValidarFormulario("_frmDatoBasico") == false) {
        Util.ModalValidar("Favor actualizar afiliado");
    } else {
        ActivarCalendariosFamiliar();
        $("#modMsjfamiliar").modal('show');

        LimpiarFrmFamiliar();
    }

}


function verCarnet(serial, cedula, vence, estatus,idf) {

    CargarUrl("_objectPDF", "rpt/carnet");
    var ObjMilitar = new Militar();
    var OqMilitar = new Militar();
    var xhttp = new XMLHttpRequest();
    var url = Conn.URL + "militar/crud/" + cedula;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipsfaToken'));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          OqMilitar.Cargar(JSON.parse(xhttp.responseText));
          var militar = OqMilitar;
          url = "images/grados/" + militar.Grado.abreviatura + ".png";
          url = url.toLowerCase();
          rutaimg = Conn.URLTEMP;
          $("#imggradoCarnet").attr("src", url);
          url = rutaimg + cedula + "/huella.bmp";
          $("#imghuellaCarnet").attr("src", url);
          url = rutaimg + cedula + "/foto.jpg";
          $("#imgfotoCarnet").attr("src", url);
          $("#lblgrado").html(militar.Grado.descripcion);
          $("#lblnombre").html(militar.Persona.DatoBasico.nombreprimero);
          $("#lblapellido").html(militar.Persona.DatoBasico.apellidoprimero);
          $("#lblcedula").html("C.I. " + militar.Persona.DatoBasico.cedula);
          $("#divserial").html(serial);
          var ISODate = new Date(vence).toISOString();
          var fe = ISODate.substr(0, 10);
          var fa = fe.split("-");
          $("#divvencimiento").html("VENCE 05/07/" + fa[0]);

          $("#divcategoria").html(militar.ObtenerCategoria());
          var comp = militar.Componente.abreviatura;
          if(militar.Componente.abreviatura == "AV"){
              comp = "AM"
          }
          $("#divsiglas").html(comp+"B");
          url = "images/firma.png";
          $("#imgfirmaCarnet").attr("src", url);

          if (militar.clase == "TPROF"){
            $("#notapie").html('AUTORIZADO PARA PORTAR ARMAS DE FUEGO EN COMISIÓN DE SERVICIO, EN ACTOS DEL SERVICIO O EN OCASIÓN DE ESTE');
          } else{
            $("#notapie").html('AUTORIZADO PARA PORTAR ARMAS DE FUEGO ASIGNADAS POR LA FANB');
          }

          $("#lblcodigo").html(militar.codigocomponente);
          $("#lblhistoria").html(militar.numerohistoria);
          $("#lblcabello").html(militar.Persona.DatoFisionomico.ObtenerCabello());
          $("#lblgrupo").html(militar.Persona.DatoFisionomico.gruposanguineo);
          $("#lblestatura").html(militar.Persona.DatoFisionomico.estatura);
          $("#lblojos").html(militar.Persona.DatoFisionomico.ObtenerOjo());
          $("#lblcolor").html(militar.Persona.DatoFisionomico.ObtenerPiel());
          $("#divserial").html(serial);
          //$("#divvencimiento").html("VENCE " + Util.ConvertirFechaHumana(vence));
          ImprimirCarnet("_objectPDF");
      }

    }
    xhttp.onerror = function () {
        if (this.readyState == 4 && this.status == 0) {
            $.notify("No se puede conectar al servidor");
            $("#_cargando").hide();
        }
    };

    xhttp.send();
}



function aprobarCarnet(serial, estatus) {
    CargarAPI(Conn.URL + "carnet/apro/" + estatus + "/" + serial, "GET");
    var tabla = "_tblPendiente";
    var buzon = "tblPendientesBuzon";
    if (Estatus != 0) {
        tabla = "_tblPendienteImp";
        buzon = "tblPendientesBuzonImp";
    }
    var table = $('#' + buzon).DataTable();
    $("#"+buzon+" tbody").on( 'click', 'button.desaparece', function () {
        table
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    } );
}




function verCarnetFamiliar(serial, cedula, vence, estatus,idf) {

    CargarUrl("_objectPDF2", "rpt/carnetfamiliar");
    var ObjMilitar = new Militar();
    var OqMilitar = new Militar();
    var xhttp = new XMLHttpRequest();
    var url = Conn.URL + "militar/crud/" + cedula;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipsfaToken'));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var militar = JSON.parse(xhttp.responseText);
            var hasta = militar.Familiar.length;
            var pos = "";
            for(var i=0;i< hasta;i++){
                if(militar.Familiar[i].Persona.DatoBasico.cedula == idf ){
                    pos = i;
                    break;
                }
            }
            var rutaimgfamiliar = Conn.URLTEMP;
            var url = rutaimgfamiliar + cedula + "/foto" + idf + ".jpg";
            $("#imgfotoCarnetf").attr("src", url);
            url = rutaimgfamiliar + cedula + "/firma" + idf+ ".jpg";

            $("#imgfirmaCarnetf").attr("src", url);
            $("#divfechavencimiento").html("VENCE "+Util.ConvertirFechaHumana(vence));
            var nombre = militar.Familiar[pos].Persona.DatoBasico.nombreprimero;
            $("#lblnombref").html(nombre.toUpperCase());
            var apellido = militar.Familiar[pos].Persona.DatoBasico.apellidoprimero;
            $("#lblapellidof").html(apellido.toUpperCase());
            $("#lblcedulaf").html(idf);
            if (militar.situacion != "FCP"){
              $("#lblparentescof").html(Util.ConvertirParentesco(militar.Familiar[pos].parentesco,militar.Familiar[pos].Persona.DatoBasico.sexo));
            }else{
              if(militar.Familiar[pos].parentesco == "EA"){
                $("#lblparentescof").html(Util.ConvertirParentesco("VI",militar.Familiar[pos].Persona.DatoBasico.sexo));
              }else{
                $("#lblparentescof").html(Util.ConvertirParentesco(militar.Familiar[pos].parentesco,militar.Familiar[pos].Persona.DatoBasico.sexo));
              }
            }
            var amilitar = militar.Persona.DatoBasico.apellidoprimero.split(" ");
            var nmilitar = militar.Persona.DatoBasico.nombreprimero.split(" ");
            $("#lblafiliadof").html(militar.Grado.abreviatura + " - " + amilitar[0] + " " + nmilitar[0] + " CI:"+cedula);

            url = rutaimgfamiliar + cedula + "/huella" + idf + ".bmp";
            $("#imghuellaCarnetf").attr("src", url);
            var historia = militar.Familiar[pos].historiamedica;
            if (militar.Familiar[pos].historiamedica == ""){
              historia = "0";
            }
            $("#lblhistoriaf").html(historia);
            $("#lblgsanguineof").html(militar.Familiar[pos].Persona.DatoFisionomico.gruposanguineo);
            $("#lbldonantef").html(militar.Familiar[pos].donante);
            $("#lblfechanacf").html(Util.ConvertirFechaHumana(militar.Familiar[pos].Persona.DatoBasico.fechanacimiento));
            $("#lblserialf").html( serial);
            ImprimirCarnetFamiliar("_objectPDF2");
        }

    }
    xhttp.onerror = function () {
        if (this.readyState == 4 && this.status == 0) {
            $.notify("No se puede conectar al servidor");
            $("#_cargando").hide();
        }
    };

    xhttp.send();
}






function CConstanciaAfiliacion() {
    var Util = new Utilidad();
    var urlMil = Conn.URLIMG + $("#txtcedula").val() + ".jpg";
    var urlGra = "images/grados/" + ObjMilitar.Grado.abreviatura + ".png";
    urlGra = urlGra.toLowerCase();
    var fechaActual = ConvertirFechaActual();
    console.log(ObjMilitar.fingreso);

    var tiempo = Util.CalcularTServicio(ObjMilitar.fingreso,ObjMilitar.fretiro, $("#cmbsituacion option:selected").text())



    var gradoPI = 'GENERAL DE DIVISIÓN';
    var clascat = $("#cmbcategoria option:selected").text() + ' / ' + $("#cmbclase option:selected").text();
    var nombrePI = 'JESÚS RAFAEL SALAZAR VELÁSQUEZ';
    $('#modRpt').modal('show');
    $("#lblgradoMil").text($("#cmbgrado option:selected").text());
    $("#lblGradoFoto").text($("#cmbgrado option:selected").text());
    $("#lblcedulaMil").text($("#txtcedula").val());
    $("#lblnombreMil").text($("#txtapellido").val() + ' ' + $("#txtnombre").val());
    $("#lbledoCivilM").text($("#cmbedocivil option:selected").text());
    $("#lblfchNacMil").text($("#txtnacimiento").val());
    $("#lbldireccionMil").text($("#txtmcalle").val() + ' ' + $("#txtmcasa").val() +
        ' ' + $("#txtmapto").val() + ' ' + $("#cmbmparroquia option:selected").text() +
        ' ' + $("#cmbmmunicipio option:selected").text() + ' ' + $("#cmbmciudad option:selected").text() +
        ' ' + $("#cmbmestado option:selected").text());
    $("#lblfchIngresoFANB").text($("#txtfechagraduacion").val());
    $("#lblfchUltAscenso").text($("#_fascenso").html());
    $("#lblaServicio").text(tiempo);
    $("#lblcomponente").text($("#cmbcomponente option:selected").text());
    $("#lblsituacionMil").text($("#cmbsituacion option:selected").text());
    $("#_fotoConstancia").attr("src", urlMil);
    $("#_Constgrado").attr("src", urlGra);
    $("#lblfchActual").text(fechaActual);
    $("#lblgradoPI").text(gradoPI);
    $("#lblnombrePI").text(nombrePI);
    $("#lblgradoPIF").text(gradoPI);
    $("#lblclascat").text(clascat);

}

function ConstanciaPensionSobr() {
    var fechaActual = ConvertirFechaActual();
    var ts = militar.tiemposervicio.split(" ");
    var tiempo = ts[0] + "ÑOS  " + ts[1] + "ESES " + ts[2] + "ÍAS"
    var gradoPI = 'GENERAL DE DIVISIÓN';
    var clascat = 'OFICIAL / ASIMILADO'
    var nombrePI = 'JESÚS RAFAEL SALAZAR VELÁSQUEZ';
    $('#modConsSobr').modal('show');
    $('#lblprueba').text("aquioooooioi")


}


function imprSelec(nombre) {

    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = '\
 <meta charset="utf-8">\
 <meta http-equiv="X-UA-Compatible" content="IE=edge">\
 <title>SSSIFANB</title>\
 <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">\
 <link rel="stylesheet" href="dist/css/skins.ipsfa/_all-skins_1.css">\
  <style type="text/css">\
  @media screen,print {\
  .membrete {\
    font-style: normal;\
    font-family:Arial, monospace, serif ;\
    font-size: 6pt;\
  }\
  .titulo{\
    font-size:8pt;\
    text-align: left;\
    font-family:Arial, monospace, serif ;\
  }\
  .titulo_fondo{\
    font-size:10pt;\
    font-family:Arial, monospace, serif ;\
    background-color: #D8D8D8;\
    border-radius: 7px;\
  }\
  .titulo_tabla{\
    font-size:7pt;\
    font-family:Arial, monospace, serif ;\
    background-color: #D8D8D8;\
  }\
  .alinear_td{\
    text-align: center;\
  }\
  .alinear_tddatos{\
    text-align: left;\
  }\
.marca-de-agua {\
    background-image: url("images/fondo.png");\
    background-repeat: no-repeat;\
    background-position: center;\
    width: 100%;\
    height: auto;\
    margin: auto;\
   }\
  .cuerpo_constancia{\
    font-style: normal;\
    font-family:Arial, monospace, serif ;\
    font-size: 14;\
    }\
  }\
   .row-centered {\
       text-align:center;\
   }\
   .col-centered {\
       display:inline-block;\
       float:none;\
       text-align:left;\
       margin-right:-4px;\
   }\
   td {\
      font-size: 10px;\
      font-weight: normal;\
   }\
  .table-borderedtd{\
  border: 1px solid black;\
  border-radius: 7px;\
   }\
   .table-fondo{\
    border: 1px solid black;\
    border-radius: 7px;\
    th:lastchild, td:lastchild {\
    border-right: 0;\
   }}\
   @charset "utf-8";\
   @page {\
    margin: 1cm;\
    size:8.5in 11in;\
      }\
}\
 </style>';
    ventana.print();
    ventana.close();

}

function CalcularEdadFamiliar(id, vl) {
    $('#' + id).val(Util.CalcularEdad($('#' + vl).val()));
}

function verificarCedulamenor(){
    var edad = $("#txtedadmm").val();
    var nac = $("#btnnacionalidadm").html();
    if(edad >=9 &&  nac == 'M' ){
        $("#modMsjfamiliar").modal('hide');
        NacionalidadFamiliar2("V");
        $("#txtcedulam").val("");
        Util.ModalValidarFamiliar("El menor ya debe poseer cedula. Por favor ingrese un numero de cedula valido.");
        return false;

    }
}

function ActivarModalFamiliar() {
    $("#modFamiliar").modal('show');
}

function ValidarMilitar(valor) {

    if ($("#txtcedula").val() == $("#txtcedulam").val()) {
        //
        $("#modMsjfamiliar").modal('hide');
        Util.ModalValidarFamiliar("Usted no puede registrar al mismo militar como afiliado");
        return false;
    }


    if ($("#cmbparentescom").val() == "HJ" && parseInt($("#txtedadmm").val()) > 26) {
        //
        $("#modMsjfamiliar").modal('hide');
        Util.ModalValidarFamiliar("El hijo que intenta ingresar es mayor a 26 años");
        return false;
    }
    var esCasado = false;
    var tMadre = false;
    var tPadre = false;
    $.each(ObjMilitar.Familiar, function (c, v) {
        if (v.parentesco == "EA" && v.beneficio == true) {
            esCasado = true;
        }
        if (v.parentesco == "PD" && v.Persona.DatoBasico.sexo == "M") {
            tPadre = true;
        }
        if (v.parentesco == "PD" && v.Persona.DatoBasico.sexo == "F") {
            tMadre = true;
        }
    });

    //
    if ($("#cmbparentescom").val() == "EA" && esCasado == true) {
        $("#modMsjfamiliar").modal('hide');
        Util.ModalValidarFamiliar("El afiliado ya posee una esposa");
        return false;
    }
    //
    // if ($("#cmbparentescom").val() == "PD" && tPadre == true) {
    //     $("#modMsjfamiliar").modal('hide');
    //     Util.ModalValidarFamiliar("El afiliado ya posee un padre");
    //     return false;
    // }
    //
    // if ($("#cmbparentescom").val() == "PD" && tMadre == true) {
    //     $("#modMsjfamiliar").modal('hide');
    //     Util.ModalValidarFamiliar("El afiliado ya posee una madre");
    //     return false;
    // }


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", Conn.URL + "militar/crud/" + $("#txtcedulam").val());
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipsfaToken'));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            ActivarCalendariosFamiliar();
            LimpiarFrmFamiliar();
            FrmFamiliar(false);
            $('#txtcedulaf').val($("#txtcedulam").val());
            $('#txtedadf').val($('#txtedadf').val());

            var militar = JSON.parse(xhttp.responseText);
            if (militar.tipo == undefined) {
                var DB = militar.Persona.DatoBasico;
                $('#txtcedulaf').val(DB.cedula);
                url = Conn.URLIMG + DB.cedula + ".jpg";
                $("#_imgIngFam").attr("src", url);
                SeleccionarPorSexoFamiliar(DB.sexo);
                $('#btnnacionalidad').val(NacionalidadFamiliar(DB.nacionalidad));
                $('#txtnacimientof').val(Util.ConvertirFechaHumana(DB.fechanacimiento));
                $('#txtedadf').val(Util.CalcularEdad($('#txtnacimientof').val()));
                $('#txtnombref').val(DB.nombreprimero);
                $('#txtapellidof').val(DB.apellidoprimero);
                $('#cmbsexof').val(DB.sexo);
                $('#cmbcondicionf').val(0);
                $('#cmbestudiaf').val(0);
                $('#cmbmilitarf').val(0);
                $('#cmbsituacionf').val(0);
                $("#cmbedocivilf").val("S");
                $("#_condicionf").hide();
                $("#_estudiaf").hide();
                $("#_condicionfdoc").hide();
                $("#_estudiafdoc").hide();
                var casado = false;
                var sexo = DB.sexo;
                var hijo = false;
                var sparentesco = 'ESPOSO';
                $.each(militar.Familiar, function (c, v) {
                    var familiar = v.Persona.DatoBasico;
                    if (v.parentesco == "EA") {
                        casado = true;
                    }
                }); //Fin de For each
                var activar = false;
                var spadre = 'PADRE';
                $("#cmbparentescof").val($("#cmbparentescom").val());
                $("#modFamiliar").modal('show');

            } else { //if no existe el miliater
                $("#tipoModFam").val(0);
                $("#txtnacimientof").val($("#txtnacimientom").val());
                $("#txtedadf").val($("#txtedadmm").val());
                $("#modFamiliar").modal('show');
            } //Fin del tipo

        } // fin Estatus
    }
    xhttp.onerror = function () {
        if (this.readyState == 4 && this.status == 0) {
            $.notify("No se puede conectar al servidor");
            $("#_cargando").hide();
        }

    };
    xhttp.send();
}

function SalvarFamiliar() {
    var familiar = new Familiar();
    if (Util.ValidarFormulario("_frmDatoFamiliar") == false) {
        Util.MensajeFormulario("_frmDatoFamiliar","msj_modal_familiar");
    }else{
        var tpo = $("#tipoModFam").val();
        if(tpo == 0){
            familiar.Salvar();
        }else{
            familiar.Actualizar();
        }
        $("#modFamiliar").modal("hide");
        enviarCarnetFamiliar();
    }
}

function pendienteCarnet(serial, estatus) {
    CargarAPI(Conn.URL + "carnet/apro/" + estatus + "/" + serial, "GET");
    var tabla = "_tblPendiente";
    var buzon = "tblPendientesBuzon";
    if (Estatus != 0) {
        tabla = "_tblPendienteImp";
        buzon = "tblPendientesBuzonImp";
    }
    //alert(tabla);
    //$("#"+tabla).html(PendienteHTML());
    var table = $('#' + buzon).DataTable();

    $("#"+buzon+" tbody").on( 'click', 'button.desaparece', function () {
        table
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    } );
}

function cerrarCarnet(serial) {
    CargarAPI(Conn.URL + "carnet/apro/3/" + serial, "GET");
    var tabla = "_tblPendiente";
    var buzon = "tblPendientesBuzon";
    if (Estatus != 0) {
        tabla = "_tblPendienteImp";
        buzon = "tblPendientesBuzonImp";
    }
    //alert(tabla);
    //$("#"+tabla).html(PendienteHTML());
    var table = $('#' + buzon).DataTable();

    $("#"+buzon+" tbody").on( 'click', 'button.desaparece', function () {
        table
            .row( $(this).parents('tr') )
            .remove()
            .draw();
    } );
}




function ImprimirCarnet2(nombre) {
    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    //ventana.document.head.innerHTML = ;
    ventana.print();
    ventana.close();
}

function GenerarCarnet() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", Conn.URL + "militar/crud/" + $("#txtcedulam").val());
    xhttp.onreadystatechange = function () {

    }
}

function VerCambiarClave(){
    $("#modCambiarClaveUsuario").modal("show");
}

function cambiarClave(){
    var clave = new Clave();
    if (Util.ValidarFormulario("formcusuario") == false) {
        Util.MensajeFormulario("formcusuario","msjcambio");
    }else{
        clave.Salvar();
    }
}




function ImprimirCarnet(nombre) {
    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html + '');
    ventana.document.head.innerHTML = `<style>
    @charset "utf-8";
    @page {
        margin: 0cm;
        size: 8.5cm 5.4cm;

    }
    section {
        page-break-before: always;
    }
    @media screen,print {
    body {
      margin: 0px;
      font-family: Calibri;
      font-weight: bold;
    }
    .marco-carnet{border:0px #003399 solid;width:8.5cm;height:5.4cm;position:relative;}
    /**PARTE DELANTERA */
    .css-foto{
        border: 0px #0033CC solid;
        width: 68px;
        height: 90px;
        position: absolute;
        left: 231px;
        top: 65px;
    }
    .css-insignia{
        border: 0px #0033CC solid;
        width: 70px;
        height: 60px;
        position: absolute;
        left: 95px;
        top: 65px;
    }
    .componente{border:0px #0033FF solid; width:280px; height:14px; position:absolute; left: 50px; top: 44px; font-size:10px;font-weight:bold;font-color:#EFEFEF; text-align:center;}
    .fecha-vencimiento{
        border: 0px #0033FF solid;
        width: 70px;
        height: 8px;
        position: absolute;
        left: 233px;
        top: 161px;
        font-size: 7px;
        text-align: center;
        font-weight: bold;
        -webkit-transform: rotate(-0deg);
        -moz-transform: rotate(-0deg);
    }
    .firma-titular{border:0px #0033FF solid; width:84px; height:auto; position:absolute; left: 234px; top: 157px;font-size:7px;font-weight:bold;}
    .firma-titular-ii{border-top:0px #003300 solid;padding-top:2px;text-align:center;}
    .labels-dat-person{border:0px #0033FF solid; width:67px; height:auto; position:absolute; left: 5px; top: 128px;font-size:8px;font-weight:bold;}
    .labels-dat-person-resl{
        border: 0px #0033FF solid;
        width: 150px;
        height: auto;
        position: absolute;
        left: 75px;
        top: 120px;
        font-size: 10px;
        font-weight: bold;
        font-color: #000;
        text-align: center
    }
    .letra-8{font-size:10px;}
    .nota-pie-i-anverso{border:0px #0033FF solid; width:190px; height:8px; position:absolute; left: 132px; top: 177px; font-size:8px;text-align:left;font-style:normal;}
    .nota-pie-ii-anverso{border:0px #0033FF solid; width:190px; height:8px; position:absolute; left: 132px; top: 187px; font-size:8px;text-align:left;font-style:normal;}

    /**PARTE TRASERA */
    .css-huella{border:0px #0033CC solid;width:70px; height:70px; position:absolute; left: 8px; top: 44px;}
    .firma-presidente{border:0px #0033FF solid; width:96px; height:auto; position:absolute; left: 110px; top: 120px}
    .firma-ministro{
        border: 0px #0033FF solid;
        width: 96px;
        height: auto;
        position: absolute;
        left: 127px;
        top: 130px
    }
    .telefono-contacto{border:0px #0033FF solid; width:76px; height:14px; position:absolute; left: 186px; top: 185px;font-size:10px;font-weight:bold;}
    .datos-medicos-i{border:0px #0033FF solid; width:150px; height:auto; position:absolute; left: 170px; top: 45px;font-size:10px;font-weight:bold;}
    .datos-medicos-ii{border:2px #0033FF solid; width:63px; height:auto; position:absolute; left: 500px; top: 94px;font-size:9px;font-weight:bold;font-color:#000;}
    .serial-numero{border:0px #0033FF solid; width:70px; height:14px; position:absolute; left: 11px; top: 15px;font-size:9px;text-align:center; font-weight:bold;}
    .serial{border:0px #0033FF solid; width:70px; height:14px; position:absolute; left: 11px; top: 25px;font-size:11px; text-align:center; font-weight: bold;}
    .categoria{
        border: 0px #0033FF solid;
        width: 76px;
        height: 14px;
        position: absolute;
        left: 128px;
        top: 15px;
        font-size: 16px;
        font-weight: bold;
    }
    .categoria1{
        border: 0px #0033FF solid;
        width: 115px;
        height: 14px;
        position: absolute;
        left: 128px;
        top: 15px;
        font-size: 16px;
        font-weight: bold;
    }
    .estatus {border:0px #0033FF solid; width:60px; height:60px; top:60px; left:95px; position:absolute;font-size:40px;font-weight:bold;}
    .siglas-componente{border:0px #0033FF solid; width:30px; height:14px; position:absolute; left: 258px; top: 17px; font-size:20px;font-weight:bold;}
    .labels-dat-medicos{
        border: 0px #0033FF solid;
        width: 200px;
        height: auto;
        position: absolute;
        left: 123px;
        top: 48px;
        font-size: 10px;
        font-weight: 600;
    }
    .labels-dat-medicos-resl{
        border: 0px #0033FF solid;
        width: 80px;
        height: auto;
        position: absolute;
        left: 235px;
        top: 48px;
        font-size: 10px;
        font-weight: 600;
    }
    .nota-pie-i-reverso{border:0px #0033FF solid; width:297px; height:12px;  left:14px; position:absolute; top: 173px;font-weight:bold; font-size:9px; text-align:center}
    .nota-pie-ii-reverso{border:0px #0033FF solid; width:300px; height:14px; left:12px; position:absolute; top: 182px; font-weight:bold; font-size:8px; text-align:center;}
    }
  </style>̣`;
}

function ImprimirCarnetFamiliar(nombre) {
    var html = $("#" + nombre).html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = `<style>
    @charset "utf-8";
    @page {
        margin: 0cm;
        size: 8.5cm 5.4cm;
    }
    section {
        page-break-before: always;
    }
      body {
        margin: 0px;
        font-family: Calibri;
        font-weight: bold;
      }
      .marco-carnetf{border:0px #003399
        solid;width:8.5cm;
        height:4.4cm;position:relative;}
      .css-fotof{
        border:0px #0033CC solid;width:68px;
        height:90px; position:absolute;
        left: 236px;
        top: 51px;}
      .fecha-vencimientof{
        border:0px #0033FF solid;
        width:79px; height:auto; position:absolute;
        left: 230px;
        top: 146px;
        font-size:7px;
        text-align:center;
        font-weight:bold;}
      .firma-titularf{
        border:0px #0033FF solid;
        width:84px; height:auto;
        position:absolute;
        left: 234px;
        top: 157px;
        font-size:7px;
        font-weight:bold;}
      .firma-titular-iif{
        border-top:0px #003300 solid;
      }
      .labels-dat-personf{
        border:0px #0033FF solid;
        width:67px; height:auto;
        position:absolute;
        left: 5px;
        top: 126px;
        font-size:9px;
        font-weight:bold;
        line-height: 1.4em;
      }
      .labels-dat-person-reslf{
        border:0px #0033FF solid;
        width:166px; height:auto;
        position:absolute;
        left: 70px;
        top: 126px;
        font-size:9px;
        font-weight:bold;
        line-height: 1.4em;
      }
      .letra-8{font-size:9px;}
      .lblhistoriaf{margin-left:60px;}
      .lblgsanguineof{margin-left:60px;}
      .lblobsf{margin-left:60px;}
      .lbldonantef{margin-left: 50px}
      .lblserialf{margin-left: 50px}
      /**PARTE TRASERA */
      .css-huellaf{border:0px #0033CC solid;width:50px; height:50px; position:absolute; left: 8px; top: 44px;}
      .firma-presidentef{border:0px #0033FF solid; width:96px; height:auto; position:absolute; left: 223px; top: 85px;font-size:5px;}
      .telefono-contactof{border:0px #0033FF solid; width:76px; height:14px; position:absolute; left: 186px; top: 185px;font-size:10px;font-weight:bold; margin-top: 55px;}
      .datos-medicos-if{border:0px #0033FF solid; width:63px; height:auto; position:absolute; left: 119px; top: 44px;font-size:8px;font-weight:bold; line-height: 1.4em;}
      .datos-medicos-iif{border:0px #0033FF solid; width:63px; height:auto; position:absolute; left: 119px; top: 90px;font-size:9px;font-weight:bold; }
    </style>`;
}


function Validar(){
  alert("Test");
}

function traeDireccion(){
    $("#cmbestadof").val($("#cmbmestado").val());
    CiudadMunicipio(1);
    $("#cmbciudad").attr("disabled",false)
    $("#cmbciudadf").val($("#cmbmciudad option:selected").val());
    $("#cmbmunicipiof").val($("#cmbmmunicipio").val());
    SeleccionarParroquia(1);
    $("#cmbparroquiaf").val($("#cmbmparroquia").val());
    $("#txtcallef").val($("#txtmcalle").val());
    $("#txtcasaf").val($("#txtmcasa").val());
    $("#txtaptof").val($("#txtmapto").val());
    $("#txttelefonof").val($("#txtmtelefono").val());
}

function ActivarPension(){
  $("#_divpension").hide();
  $("#lblFechaResolucion").html("Fecha de Resolución");
  if ($("#cmbsituacion").val() != "ACT"){
    $("#lblFechaResolucion").html("F. Resolución de Retiro");
    $("#_divpension").show();
  }
}

function ValidarPorcentaje(){
  $("#_contenido").html("¿Está seguro que el porcentaje es correcto?");
  var botones = '<button type="button" class="btn btn-success" data-dismiss="modal">Si</button>\
  <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
  $("#_botonesmsj").html(botones);
  $('#modMsj').modal('show');
}
