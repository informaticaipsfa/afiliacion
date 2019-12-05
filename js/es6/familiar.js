function CargarFamiliaresModal(militar, t){
    let j = 1, x = 1;
    var total_porcentaje = 0;
    $.each(militar.Familiar, function (c, v) {
        var familiar = new Familiar();
        var DBF = v.Persona.DatoBasico;
        var cedula = DBF.cedula;
        var nombre = DBF.apellidoprimero + ' ' + DBF.apellidosegundo + ' ' + DBF.nombreprimero + ' ' + DBF.nombresegundo;
        var parentesco = v.parentesco;
        familiar.Persona.DatoBasico.sexo = v.Persona.DatoBasico.sexo;
        familiar.parentesco = parentesco;
        var nombres = DBF.nombreprimero + ' ' + DBF.nombresegundo;
        var apellidos = DBF.apellidoprimero + ' ' + DBF.apellidosegundo;
        var nombreCompleto = apellidos + ' ' + nombres;
        var estadocivil = familiar.Persona.DatoBasico.estadocivil;
        var fnac = Util.ConvertirFechaHumana(DBF.fechanacimiento);
        var fvence = '';
        var porcentaje = v.pprestaciones!=undefined?v.pprestaciones:0;
        if (v.Tif.fechavencimiento != undefined) {
            fvence = Util.ConvertirFechaHumana(v.Tif.fechavencimiento);
        }

        var modificar = `<div class="btn-group">
            <button type="button" id="btnModFamiliar${j}" 
                class="btn btn-sm btn-info prvmodificar hide" onclick="ModificarFamiliarPos(${j})">
                <i class="fa fa-pencil"></i>
            </button>`;
        var mil = nombre.toUpperCase();
        if (v.esmilitar == true) {
            mil = nombre.toUpperCase() + '<font color="#0E6626"><i class="fa fa-fw fa-male"></i></font>&nbsp;';
        }
        
        if(v.situacionpago != "201" && v.situacionpago != "" ){
            mil += '<font color="#FF0000"><i class="fa fa-hand-stop-o"></i></font>&nbsp;'
        }else{
            if ( militar.situacion == "FCP" && porcentaje > 0 ){
                
                modificar += `<button type="button" id="btnModCal${j}"
                class="btn btn-sm bg-maroon prvmodificar hide" onclick="ModificarCalPos('${j}')">
                <i class="fa fa-calculator"></i></button>                
                <button type="button" 
                    id="btnModPension${j}" class="btn btn-sm btn-success dropdown-toggle prvreporte hide" data-toggle="dropdown" aria-expanded="false">
                  <span class="caret"></span>
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#" onclick="PensionAsignadaSobre('${j}')">Consultar Netos</a></li>
                  <li><a href="#" onclick="CConstanciaSolvenciaFCP('${j}')">Constancia de Pensión</a></li>
                </ul>
                `;

            //     `
            //     <button type="button" 
            //     class="btn btn-sm bg-olive" >
            //     <i class="fa fa-print"></i></button>

            //     <div class="btn-group open">
            //     <button type="button" class="btn btn-success">Action</button>
            //     <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
            //       <span class="caret"></span>
            //       <span class="sr-only">Toggle Dropdown</span>
            //     </button>
                
            //   </div>`
                
            }
        }
        modificar += "</div>";

        var fechavencimiento = "";

        var mod = '<font color="#red"><i class="fa fa-fw fa-pencil"></i></font>';
        var edocivil = "";
        if (DBF.estadocivil != undefined) {
                edocivil = DBF.estadocivil;
        }
        var rutaimgfamiliar = Conn.URLIMG;
        if (v.Persona.foto  != undefined){
            rutaimgfamiliar = Conn.URLTEMP;
        }
        var situacion = "ACTIVO";
        if (v.beneficio != true ) {
            situacion = "INACTIVO"
        }
        var anof = parseInt(v.Persona.DatoBasico.fechadefuncion.substring(0,4));

        if (anof > 1){
            situacion = "FALLECIDO"
        }
        if (v.beneficio == false && v.parentesco == "EA"){
            //Evaluar a esposa inactiva
        }else{
            var strEdo = "F";
            if(militar.situacion == "FCP"){
                strEdo = "M";
            }
            $("#_contenidoFamiliares").append(`<tr><td>${nombreCompleto}</td>
                <td class="alinear_tddatos">${cedula}</td>
                <td class="alinear_tddatos">${familiar.GenerarParentesco(strEdo)}</td>
                <td class="alinear_tddatos">${fnac}</td>                
                <td class="alinear_tddatos">${situacion}</td>
            </tr>`);
            //<td class="alinear_tddatos">${edocivil}</td>
            

        }
        
        //var txtporc = `${porcentaje} %<input id="prc-${cedula}" type="hidden" value="${porcentaje}"></input>`;
        total_porcentaje += parseFloat(porcentaje);
        t.row.add([
            j++, //0
            cedula, //1
            mil, //2
            familiar.GenerarParentesco(), //3
            situacion, //4
            DBF.fechanacimiento, //5
            v.esmilitar, //6
            mod, //7
            nombres.toUpperCase(), //8
            DBF.sexo, //9
            apellidos.toUpperCase(), //10
            v.condicion, //11
            v.estudia, //12
            fechavencimiento, //13
            //v.beneficio,
            modificar,
            fvence,
            parseFloat(porcentaje)
        ]).draw(false);

    });

    t.column(5).visible(false);
    t.column(6).visible(false);
    t.column(7).visible(false);
    t.column(8).visible(false);
    t.column(9).visible(false);
    t.column(10).visible(false);
    t.column(11).visible(false);
    t.column(12).visible(false);
    t.column(13).visible(false);
    t.column(15).visible(false);
    t.column(16).visible(false);
    $("#tarjetaPensionSobreviviente").hide();
    $("#btnPensionSobreviviente").attr('disabled', true);
    $("#txtPensionSobreviviente").attr('disabled', true);
    $("#divPensionSobreviviente").html('');
    var strSituacion = militar.situacion;
    $("#liEstatusPension").hide();
    $("#_btnPensionesAsignadas").hide();
    if(strSituacion== "FCP"){
        t.column(16).visible(true);
        $("#tarjetaPensionSobreviviente").show();
        $("#btnPensionSobreviviente").attr('disabled', false);
        $("#txtPensionSobreviviente").attr('disabled', false);
        if( total_porcentaje == 100){
            $("#divPensionSobreviviente").html(`<div class="callout callout-success" style="padding:8.3px; margin:0px;">
            <p style="text-align: left"><b>Pensión del grupo familiar 100%</b></p>
            </div>`);
        }else{
            $("#divPensionSobreviviente").html(`<div class="callout callout-danger" style="padding:8.3px; margin:0px;">
            <p style="text-align: left"><b>Pensión del grupo familiar ${total_porcentaje}%</b></p>
            </div>`);
        }
        $("#liEstatusPension").show();
        $("#_btnPensionesAsignadas").show();
        $("#liEstatusPensionf").show();
        $("#cmbSituacionPagof").attr('disabled', false);
        $("#btnSituacionPagof").attr('disabled', false);
    } else if( strSituacion == "RCP" || strSituacion == "I"){
        $("#liEstatusPension").show();
        $("#_btnPensionesAsignadas").show();
    }


    $('#tblFamiliares tbody').on('click', 'tr', function (clave, valor) {

        var data = t.row(this).data();
        
        var familiar = ObjMilitar.Familiar[data[0]-1];
        $("#lblFilaF").html(data[0]-1);
        $("#_bfcedula").attr("attced",data[1]);
        $("#_lblConstanciaPension").hide();

        var rutaimg = Conn.URLIMG;
        var urlf = Conn.URLIMG + data[1] + ".jpg";
        if (ObjMilitar.Persona.foto  != undefined){
            rutaimg = Conn.URLTEMP + "/" + ObjMilitar.id;
            urlf = rutaimg + "/foto" +  data[1] + ".jpg";
        }
        $("#_imgfamiliar").attr("src", urlf);
        $("#_ffnacimiento").html(Util.ConvertirFechaHumana(data[5]));
        $("#_fcedula").html('C.I: V- ' + data[1]);
        $("#_idFVCarnet").html(data[15]);
        $("#txtPensionSobreviviente").val(data[16]);
        if (data[6] == true) {
            $("#_fcedula").html('<a href="#" onClick="Buscar(\'' + data[1] + '\')">C.I: V- ' + data[1] + '</a>');
            $("#_ffnacimiento").html(Util.ConvertirFechaHumana(data[5]));
        }
        if (data[14] == true) {
            $("#_lblConstanciaPension").show();
        }
        $("#cmbSituacionPagof").val( familiar.situacionpago );
        if (familiar.situacionpago == ""){
            $("#cmbSituacionPagof").val( "200" );
        }

    });

    $('#tblFamiliares tbody').on('dblclick', 'tr', function () {
        var data = t.row(this).data();
        if (data[6] == true) {
            Util.ModalValidarFamiliar("Este es un afiliado titular");
            return false;
        } else {
            ModificarFamiliarPos(data[0]);
            FrmFamiliar(true);
        }
    });
}

function AsignarPensionSobreviviente(){
    var t = $('#tblFamiliares').DataTable();
    var fila = $("#lblFilaF").html();
    var monto = parseFloat($("#txtPensionSobreviviente").val());
    t.cell(fila,16).data(monto.toFixed(2)).draw();
}


class WActSituacion{
	constructor(){
		this.cedula = "";
		this.familiar = "";
		this.porcentaje = 0.00;
	}
	Crear(req){		
		console.log(req);
		alertNotifyAfiliacion("Se ha actualizado la situación correctamente", "success");

	}
}
function ActualizarSituacionPagof(){
    var wactSituacion = new WDerechaACrecer();
    var fila = $("#lblFilaF").html();
    if(fila == ""){
        alertNotifyAfiliacion("Debe seleccionar correctamente un familiar", "warning");
        return false;
    }
    var ruta =  Conn.URL + "pensionado/situacionpago";
    var Situacion = {
        cedula : $("#txtcedula").val(),
        familiar: ObjMilitar.Familiar[fila].Persona.DatoBasico.cedula,
        situacion : $('#cmbSituacionPagof').val()
    };
    
    CargarAPI(ruta, "POST", Situacion, wactSituacion);
}

class WDerechaACrecer{
	constructor(){
		this.pos = "";
		this.cedula = "";
		this.porcentaje = 0.00;
	}
	Crear(req){		
		$("#_cargandofam").hide();
		alertNotifyAfiliacion("Se ha aplicado con exito el derecho acrecer", "success");

	}
}
function RecalcularDerechoACrecer(){
	var t = $('#tblFamiliares').DataTable();
	var i = 0;
	ObjMilitar.Familiar.forEach(v => {
		t.cell(i,16).data(0).draw();
		i++;
	});
	Util.ValidarDerechoACrecer(ObjMilitar.Familiar);
}

function AplicarDerechoACrecer(){
	$("#_contenido").html("¿Está seguro que desea actualizar el derecho acrecer?");
	var botones = `<button type="button" class="btn btn-success" data-dismiss="modal" 
	id="_aceptar" onClick="AplicarDerecho()">Si</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>`;
    $("#_botonesmsj").html(botones);
    $('#modMsj').modal('show');
}

function AplicarDerecho(){
	var wderecho = new WDerechaACrecer();
	var lst = [];
	var ruta =  Conn.URL + "pensionado/derechoacrecer";
	$("#_cargandofam").show();
	var tblF = $('#tblFamiliares').DataTable();
	var cant = parseInt(tblF.rows()[0].length);
    if($("#cmbsituacion option:selected").val() == "FCP"){
        for(var i = 0; i < cant; i++){
			var der = new WDerechaACrecer();
			var pos = tblF.rows(i).data()[0][0];
			var cedula = tblF.rows(i).data()[0][1];
			var porcentaje = tblF.rows(i).data()[0][16];
			der.pos = parseInt(pos);
			der.cedula = cedula;
			der.porcentaje = parseFloat( porcentaje );
			lst.push(der);
		}

		var Derecho = {
			cedula : $("#txtcedula").val(),
			acrecer: lst
		};
		//console.log(Derecho);
		CargarAPI(ruta, "POST", Derecho, wderecho);
	}


	
}

let lstFamiliarNetos = [];
let seleccionFamiliar = {};

class WPensionadoSobrevive{
    constructor(){}
    Crear(req){
        var i = 0;
		$("#cmbNetoPagoSobre").html('<option value="X">SELECCIONAR UN PAGO</option>');
		$("#_netosConceptosSobre").html(ConceptosNetosHTML());
		var tblC = $('#tblNetosConceptos').DataTable(tablaBasica);
        //
        lstFamiliarNetos = [];
        
        
		req.forEach(pago => {
            $("#mdlNetosSobre").modal("show");		
            console.log(JSON.parse(pago.calculos));
            var obj = JSON.parse(pago.calculos);
            obj.porcentaje = pago.porcentaje;
            lstFamiliarNetos.push(obj);
            
			var neto = Intl.NumberFormat("de-DE").format(Number(parseFloat(pago.neto).toFixed(2)))
			$("#cmbNetoPagoSobre").append(`<option value="${i}">${pago.nomina} - ${pago.mes} DEL ${pago.hasta.substr(0,4) } | ( ${pago.hasta} | ${neto} )</option> `)
			i++;
		});		
    }
}

function PensionAsignadaSobre(pos){
    var wpensiones = new WPensionadoSobrevive();
    var familiar = new Familiar();
    var fcedula = ObjMilitar.Familiar[pos -1].Persona.DatoBasico.cedula;
    var nombre = ObjMilitar.Familiar[pos -1].Persona.DatoBasico.apellidoprimero  + ' ' + ObjMilitar.Familiar[pos -1].Persona.DatoBasico.nombreprimero;
    var id = $("#txtcedula").val();
    
    
    familiar.parentesco = ObjMilitar.Familiar[pos -1].parentesco;
    seleccionFamiliar = {
        parentesco : familiar.GenerarParentesco(),
        nombre: nombre,
        cedula: fcedula
    };
    
    var ruta =  Conn.URL + "pensionado/consultarsobreviviente/" + id + "/" + fcedula;
    CargarAPI(ruta, "GET", wpensiones, wpensiones);
}


function FamiliaresHTML() {
    var html = `<table class="ui celled table " cellspacing="0" width="100%" id="tblFamiliares" >
    <thead class="familiares">
      <tr>
        <th>#.</th>
        <th>CÉDULA</th>
        <th>APELLIDOS Y NOMBRES</th>
        <th>RELACIÓN</th>
        <th>SITUACIÓN</th>
        <th>FECHA</th>
        <th>TIPO</th>
        <th>MODIFICAR</th>
        <th>NOMBRES</th>
        <th>SEXO</th>
        <th>APELLIDOS</th>
        <th>CONDICION ESPECIAL</th>
        <th>ESTUDIA</th>
        <th>FECHA VCTO. CARNET</th>
        <th style='width:100px'>ACTUALIZAR</th>
        <th>FOTO</th>
        <th>% PEN.</th>
      </tr>
    </thead >
    <tbody>
    </tbody>
  </table>`;
    return html;
}

function obtenerFamiliarPorcentaje(id){
   var cantidad = ObjMilitar.Familiar.length;
   for (let i = 0; i < cantidad; i++) {
       const cedula = ObjMilitar.Familiar[i].Persona.DatoBasico.cedula;
       if( cedula == id ){
        return ObjMilitar.Familiar[i].pprestaciones;
       }
       
   }
   return 0;
}