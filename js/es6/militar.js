'use strict';
/**
 Desarrollado por  :  Maria Elena Nuñez
 Correo            :  marielen936@gmail.com
 Modifcado    por  :
 Correo persona mod:
 Fecha Creacion    :  11-07-2017
 Fecha Modificacion:  11-07-2017
 Descripcion       :  Clases, metodos y funciones de Militares
*/
class DatoBasico{
	constructor(){
		this.cedula = "";
		this.nropersona = 0;
		this.nacionalidad = "";
		this.nombreprimero = "";
		this.nombresegundo = "";
		this.apellidoprimero = "";
		this.apellidosegundo = "";
		this.fechanacimiento = "";
		this.fechadefuncion = "";
		this.nropasaporte = "";
		this.sexo = "";
		this.estadocivil = "";

	}

	NombreCompleto(){
		return this.nombreprimero + " " + this.nombresegundo;
	}

	ApellidoCompleto(){
		return this.apellidoprimero + " " + this.apellidosegundo;
	}

	NombreApellido(){
		return this.NombreCompleto() + " " + this.ApellidoCompleto();
	}

	Sexo(){
		return (this.sexo == "F")?"FEMENINO":"MASCULINO";
	}

	Nacionalidad(){
		let nacionalidad = "VENEZOLANA";
		if (this.nacionalidad == "E"){
			nacionalidad = "EXTRANJERA"
		}
		return nacionalidad;
	}

	GenerarEstadoCivil(){
		let estadocivil= "";
		 switch(this.estadocivil) {
		    case "C":
		     	estadocivil =(this.Persona.DatoBasico.sexo=="F")?"CASADA":"CASADO";
		        break;
		    case "D":
		    	estadocivil = (this.Persona.DatoBasico.sexo=="F")?"DIVORCIADA":"DIVORCIADO";
		        break;
		    case "S":
		    	estadocivil = (this.Persona.DatoBasico.sexo=="F")?"SOLTERA":"SOLTERO";
		        break;
		    case "V":
		    	estadocivil = (this.Persona.DatoBasico.sexo=="F")?"VIUDA":"VIUDO";
		        break;
		    default:
		        estadocivil = "";
		        break;
		}
		return estadocivil;
	}

}

class DocumentoCivil{
	constructor(){
		this.archivo = "";
	}

	ActaMatrimonio(){
		this.registrocivil = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
		this.archivo = "";
		return this;
	}

	ActaDivorcio(){
		this.tribunal = "";
		this.numerosentencia = "";
		this.fechasentencia = "";
		this.archivo = "";
		return this;
	}

	CartaSolteria(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

	ConstanciaViudez(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

	ActaDefuncion(){
		this.registrocivil = "";
		this.fecha = "";
		this.archivo = "";
		return this;
	}

}

class  DatoFisico{
	constructor(){
		this.peso = 0.0;
		this.talla = 0.0;
	}
}

class DatoFisionomico{
	constructor(){
		this.colorpiel = "";
		this.colorojos = "";
		this.colorcabello = "";
		this.estatura = "";
		this.senaParticular = "";
		this.gruposanguineo = "";
	}

    ObtenerCabello(){
        var cad = "";
        switch (this.colorcabello){
		case "NE":cad = "NEGRO";break;
            	case "BA":cad = "BLANCO";break;
            	case "CA":cad = "CASTAÑO";break;
		case "MA":cad = "MARRON";break;
		case "AM":cad = "AMARILLO";break;
		case "AZ":cad = "AZUL";break;
		case "VI":cad = "VIOLETA";break;
		case "CV":cad = "CALVO";break;
		case "GR":cad = "GRIS";break;
		default: cad = "********";break;
        }
        return cad;
    }

    ObtenerPiel(){
        var cad = "";
        switch (this.colorpiel){
			case "NE":cad = "NEGRA";break;
            case "BL":cad = "BLANCA";break;
            case "CA":cad = "CANELA";break;
            case "MO":cad = "MORENA";break;
						case "TR":cad = "TRIGUEÑA";break;
						case "MO":cad = "MORENA";break;
						case "RO":cad = "ROSADA";break;
            default: cad = "********";break;
        }
        return cad;
    }

    ObtenerOjo(){
        var cad = "";
        switch (this.colorojos){
            case "AM":cad = "ÁMBAR";break;
            case "AV":cad = "AVELLANA";break;
            case "CA":cad = "CASTAÑO";break;
            case "VE":cad = "VERDE";break;

            case "AZ":cad = "AZUL";break;
            case "GR":cad = "GRIS";break;
            case "NE":cad = "NEGRO";break;
            case "MA":cad = "MARRON";break;
						case "PA":cad = "PARDO";break;

            default: cad = "********";break;
        }
        return cad;
    }
}

class Correo{
	constructor(){
		this.principal = "";
		this.alternativo = "";
		this.institucional = "";
	}
}


class RedSocial{
	constructor(){
		this.twitter = "";
		this.facebook = "";
		this.instagram = "";
		this.linkedin = "";
	}
}

class Telefono{
	constructor(){
		this.movil = "";
		this.domiciliario = "";
		this.emergencia = "";
	}
}


class Direccion{
	constructor(){
		this.tipo = 0;
		this.estado = "";
		this.ciudad = "";
		this.municipio = "";
		this.parroquia = "";
		this.calleavenida = "";
		this.casa = "";
		this.apartamento = "";
		this.numero = 0;


	}
}

class Carnet{
	constructor(){
		this.idcarnet = "";
		this.tipo = "";
		this.condicion = "";
		this.serial = "";
		this.codigocomponente = "";
		this.fechacreacion = "";
		this.fechavencimiento = "";
		this.responsable = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
	}
}


class Familiar{
	constructor(){
		this.id = "";
		this.Persona = new Persona();
		this.parentesco = "";
		this.esmilitar = "";
		this.condicion = 0;
		this.estudia = 0;
		this.beneficio = true;
		this.documento = 0;
		this.documentopadre = "";
		this.historiamedica = "";
		this.donante = "";
		this.serial = "";
		this.pprestaciones = 0.00;
	}
	GenerarParentesco(edo){
		var parentesco= "";
		 switch(this.parentesco) {
		    case "PD":
		     	parentesco =(this.Persona.DatoBasico.sexo=="F")?"MADRE":"PADRE";
		        break;
		    case "HJ":
		    	parentesco = (this.Persona.DatoBasico.sexo=="F")?"HIJA":"HIJO";
		        break;
		    case "EA":
				parentesco = (this.Persona.DatoBasico.sexo=="F")?"ESPOSA":"ESPOSO";
				if (edo != undefined){
					if (edo == "M"){
						parentesco = (this.Persona.DatoBasico.sexo=="F")?"VIUDA":"VIUDO";
					}
				}
		        break;
			case "HO":
		    	parentesco = (this.Persona.DatoBasico.sexo=="F")?"HERMANA":"HERMANO";
		        break;
		    default:
		        parentesco = "";
		        break;
		}
		return parentesco;
	}
	Obtener(){
		var fdefuncion = "0001-01-01T00:00:00.000Z";
		if($("#txtdefuncionf").val() != ""){
			fdefuncion = new Date(Util.ConvertirFechaUnix($("#txtdefuncionf").val())).toISOString();
		}
		this.Persona.DatoBasico.fechadefuncion = fdefuncion;

		this.id = $("#txtidf").val();
		this.documentopadre = $("#txtcedula").val();
		this.Persona.DatoBasico.nropersona =  parseInt($("#txtnropersonaf").val());
		this.Persona.DatoBasico.nacionalidad = $("#btnnacionalidad").html();
		this.Persona.DatoBasico.cedula = $("#txtcedulaf").val();
		this.Persona.DatoBasico.fechanacimiento =  new Date(Util.ConvertirFechaUnix($("#txtnacimientof").val())).toISOString();
		this.Persona.DatoBasico.sexo = $("#cmbsexof").val();
		this.Persona.DatoBasico.nombreprimero = $("#txtnombref").val();
		this.Persona.DatoBasico.apellidoprimero = $("#txtapellidof").val();
		this.Persona.DatoBasico.estadocivil = $("#cmbedocivilf  option:selected").val();
		this.parentesco = $("#cmbparentescof").val();
		this.condicion = parseInt($("#cmbcondicionf").val());
		this.beneficio = $("#cmbsituacionf").val()==0?false:true;
		this.estudia = parseInt($("#cmbestudiaf").val());
		this.historiamedica = $("#hclinicaf").val();
		this.donante = $("#donantef").val();
		this.esmilitar = $("#cmbmilitarf option:selected").val()==0?false:true;

		this.Persona.PartidaNacimiento.registro = $("#txtpregistrocivilf").val();
		this.Persona.PartidaNacimiento.ano = $("#txtpanof").val();
		this.Persona.PartidaNacimiento.acta = $("#txtpactaf").val();
		this.Persona.PartidaNacimiento.folio = $("#txtpfoliof").val();
		this.Persona.PartidaNacimiento.libro = $("#txtplibrof").val();
		this.Persona.DatoFisico.peso = $("#txtpesof").val();
		this.Persona.DatoFisico.talla = $("#txttallaf").val();
		this.Persona.DatoFisionomico.colorpiel = $("#cmbpielf").val();
		this.Persona.DatoFisionomico.colorojos = $("#cmbojosf").val();
		this.Persona.DatoFisionomico.colorcabello = $("#cmbcolorcabellof").val();
		this.Persona.DatoFisionomico.estatura = parseFloat($("#txtestaturaf").val());
		this.Persona.DatoFisionomico.senaParticular = $("#txtsenaparticularf").val();

		this.Persona.DatoFisionomico.gruposanguineo = $("#gsanguineof").val();
		this.Persona.RedSocial.twitter = $("#txttwitterf").val();
		this.Persona.RedSocial.facebook = $("#txtfacebookf").val();
		this.Persona.RedSocial.instagram = $("#txtinstagranf").val();
		this.Persona.Correo.principal = $("#txtcorreof").val().toUpperCase();
		this.Persona.Telefono.domiciliario = $("#txttelefonof").val();
		this.Persona.Telefono.movil = $("#txtcelularf").val();

		var dir = new Direccion();
		dir.tipo = 0;
		dir.estado = $("#cmbestadof option:selected").val();
		dir.municipio = $("#cmbmunicipiof option:selected").val();
		dir.parroquia = $("#cmbparroquiaf option:selected").val();
		dir.ciudad = $("#cmbciudadf").val();
		dir.calleavenida = $("#txtcallef").val().toUpperCase();
		dir.casa = $("#txtcasaf").val().toUpperCase();
		dir.apartamento = $("#txtaptof").val().toUpperCase();
		this.Persona.Direccion[0] = dir;
		if($("#txtfechacondicionf").val() == ''){
			this.Persona.CondicionEspecial.fecha == '';
		}else{
			this.Persona.CondicionEspecial.fecha = new Date(Util.ConvertirFechaUnix($("#txtfechacondicionf").val())).toISOString();
		}

		this.Persona.CondicionEspecial.tipodiscapacidad = $("#cmbDiscapacidadf").val();
		this.Persona.CondicionEspecial.diagnostico = $("#txtdiagnosticof").val();
		this.Persona.CondicionEspecial.nombrehospitalmilitar = $("#cmbHospitalf").text();
		var bnc = new DatoFinanciero();
		bnc.tipo = $("#cmbmtipofinancieraf option:selected").val();
		bnc.institucion = $("#cmbminstfinancieraf option:selected").val();
		bnc.cuenta = $("#txtmnrocuentaf").val();
		bnc.autorizado = $("#txtautorizadof").val();
		bnc.titular = $("#txttitularf").val();		
		bnc.prioridad = "PRINCIPAL";
		this.Persona.DatoFinanciero[0] = bnc;
		this.pprestaciones = obtenerFamiliarPorcentaje(this.Persona.DatoBasico.cedula);
		console.log(this.pprestaciones);


		return this;
	}
	Salvar(){
		var milfamiliar = new WMilitar();
		
		CargarAPI(Conn.URL + "familiar/crud" , "POST", this.Obtener(), milfamiliar);
	}
	Actualizar(){
		var milfamiliar = new WMilitar();
		CargarAPI(Conn.URL + "familiar/crud" , "PUT", this.Obtener(), milfamiliar);
	}
}

class WMilitar{
	constructor(){}
	Crear(req){
		Buscar($("#txtcedula").val());
	}
}

class Tim{
	constructor(){
		this.fechacreacion = "";
		this.fechavencimiento = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
		this.firma = "";
		this.huella = "";
	}
}

class Componente{
	constructor(){
		this.nombre = "";
		this.descripcion = "";
		this.abreviatura = "";
	}
	Crear(componente){
		var grado = $("#cmbgrado").val();
		$("#cmbgrado").html('<option selected="selected" value="S"></option>');
		componente.Grado.forEach( v => {
			$("#cmbgrado").append('<option value="' + v.codigo + '">' + v.descripcion + '</option>')
		});

		$("#cmbgrado").val('S');
		if (grado != "" || grado != "S"){
			$("#cmbgrado").val(grado);
		}
	}
 GenerarComponente(){
		let abreviatura= "";
		 switch(this.abreviatura) {
		    case "EJ":
		     	descripcion ="EJÉRCITO BOLIVARIANO";
		     	nombre ="EJÉRCITO";
		        break;
		    case "AV":
		    	descripcion ="AVIACION MILITAR BOLIVARIANA";
		    	nombre ="AVIACION";
		        break;
		    case "GN":
		    	descripcion ="GUARDIA NACIONAL BOLIVARIANA";
		    	nombre ="GUARDIA NACIONAL";
		        break;
		    case "AR":
		    	descripcion ="ARMADA BOLIVARIANA";
		    	nombre ="ARMADA";
		        break;
		    default:
		        descripcion = "";
		        break;
		}
		return abreviatura;
	}



}

class Grado{
	constructor(){

		this.nombre = "";
		this.descripcion = "";
		this.abreviatura = "";
	}
	Obtener(){
		return this;
	}
}

class DatoFinanciero{
	constructor(){
		this.tipo = "";
		this.institucion = "";
		this.cuenta = "";
		this.autorizado = "";
		this.prioridad = "";
		this.titular = "";
	}
}

class Persona{
	constructor(){
		this.DatoBasico = new DatoBasico();
		this.CuentaBancaria = new CuentaBancaria();
		this.DatoFisico = new DatoFisico();
		this.Correo = new Correo();
		this.DatoFisionomico = new DatoFisionomico();
		this.Direccion = [];
		this.DatoFinanciero = [];
		this.Telefono = new Telefono();
		this.PartidaNacimiento = new PartidaNacimiento();
		this.Defuncion = new Defuncion();
		this.DocumentoCivil = new DocumentoCivil();
		this.RedSocial = new RedSocial();
		this.foto = "";
		this.huella = "";
		this.firma = "";

		this.CondicionEspecial = new CondicionEspecial();
	}
}

class PartidaNacimiento{
	constructor(){
		this.registro = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
	}
}

class Defuncion{
	constructor(){
		this.registrocivil = "";
		this.ano = "";
		this.acta = "";
		this.folio = "";
		this.libro = "";
	}
}

class Recibo{
    constructor(){
        this.id = "";
        this.idf = "";
        this.motivo = "";
        this.numero = 0;
        this.canal = "";
        this.fecha = "";
        this.monto = 0.0;
    }


	Verificar(){
        if($("#cmbMotivoCarnet").val() == 'S'){
            $("#cmbMotivoCarnet").notify("Indique El motivo");
            return false;
        }
        if($("#txtcedula").val() == ''){
            $("#txtcedula").notify("Ingrese Cedula");
            return false;
        }
        if($("#txtnumeroC").val() == ''){
            $("#txtnumeroC").notify("Ingrese Numero de Cuenta");
            return false;
        }
        if($("#cmbminstfinancieraC").val() == 'S'){
            $("#cmbminstfinancieraC").notify("Indique Institucion");
            return false;
        }
        if($("#txtmfechaC").val() == ''){
            $("#txtmfechaC").notify("Indique fecha");
            return false;
        }
        if($("#txtmontoC").val() == ''){
            $("#txtmontoC").notify("Indique monto");
            return false;
        }
        return true;
	}

    VerificarF(){
        if($("#cmbMotivoCarnetf").val() == 'S'){
            $("#cmbMotivoCarnetf").notify("Indique El motivo");
            return false;
        }
        if($("#txtcedulaf").val() == ''){
            $("#txtcedulaf").notify("Ingrese Cedula");
            return false;
        }
        if($("#txtnumeroCf").val() == ''){
            $("#txtnumeroCf").notify("Ingrese Numero de Cuenta");
            return false;
        }
        if($("#cmbminstfinancieraCf").val() == 'S'){
            $("#cmbminstfinancieraCf").notify("Indique Institucion");
            return false;
        }
        if($("#txtmfechaCf ").val() == ''){
            $("#txtmfechaCf").notify("Indique fecha");
            return false;
        }
        if($("#txtmontoCf").val() == ''){
            $("#txtmontoCf").notify("Indique monto");
            return false;
        }
        return true;
    }


    Obtener(){
    	this.id = $("#txtcedula").val();
      	this.idf = $("#txtcedula").val();
    	this.motivo = $("#cmbMotivoCarnet").val();
    	this.numero = $("#txtnumeroC").val();
    	this.canal = $("#cmbminstfinancieraC").val();
    	this.fecha = new Date(Util.ConvertirFechaUnix($("#txtmfechaC").val())).toISOString();
    	this.monto = parseFloat($("#txtmontoC").val());
    	return this;
	}

    ObtenerF(){
        this.id = $("#txtcedula").val();
        this.idf = $("#txtcedulaf").val();
        this.motivo = $("#cmbMotivoCarnetf").val();
        this.numero = $("#txtnumeroCf").val();
        this.canal = $("#cmbminstfinancieraCf").val();
        this.fecha = new Date(Util.ConvertirFechaUnix($("#txtmfechaCf").val())).toISOString();
        this.monto = parseFloat($("#txtmontoCf").val());
        return this;
    }

	Salvar(){
    	CargarAPI(Conn.URL + "recibo/crud" , "POST", this.Obtener());
	}

  SalvarF(){
    CargarAPI(Conn.URL + "recibo/crud" , "POST", this.ObtenerF());
  }
}

class Pension{
	constructor(){
		this.tipopension = "";
		this.pprestaciones = 0.00;
		this.causal = "";
		this.tipo = "";
	}
}

class Militar{
	constructor(){
		this.id = "";
		this.tipodato = 0;
		this.Persona = new Persona();
		this.categoria = "";
		this.situacion = "";
		this.clase = "";
		this.fingreso = "";
		this.fascenso = "";
		this.situacionpago = "";
		this.areconocido = 0.00;
		this.mreconocido = 0.00;
		this.dreconocido = 0.00;
		this.pxnoascenso = 0.00;
		this.pprof = 0;
		this.pespecial = 0.00;

		this.posicion = 0;
		this.condicion = 0;
		this.fresuelto = "";
		this.nresuelto = 0;
		this.descripcionhistorica = "";
		this.Componente = new Componente();
		this.Grado = new Grado();
		this.Pension = new Pension();
		this.urlsimbolo = "";
		this.urlfirmaministro = "";
		this.urlpresidenteipsfa = "";
		this.urlfoto = "";
		this.urlhuella = "";
		this.urlfirma = "";
		this.urlcedula = "";
		this.codigocomponente = "";
		this.numerohistoria = "";
		this.pasearetiro = false;
		this.pprestaciones = 0.00;
	}

	//P123 .-
	Crear(militar){

		var url = "";
		var i = 0;
		var j = 0;


		if (militar.tipo != undefined) {
			$("#_cedula").val("");
			$("#_contenido").html("La cédula no existe en el sistema. ¿Desea Realizar un nuevo ingreso?");
			var botones = '<button type="button" class="btn btn-success prvsalvar hide" data-dismiss="modal" id="_aceptar" onClick="incluirAfiliado()">Si</button>\
											<button type="button" class="btn btn-primary" data-dismiss="modal">No</button>';
			$("#_botonesmsj").html(botones);
			verificarPrivilegioUsuario();
			$("#modMsj").modal("show");
			$("#_aceptar").focus();
			$("#_cargando").hide();
		} else {
			ObtenerConceptosW();
			OqMilitar.Cargar(militar);
			ObjMilitar = militar;
			ActivarFormulario(true);
			$("#_btnModificar").show();
			$("#_btnConstancia").show();
			$("#_btnTIM").show();
			$("#_btnActualizar").hide();
			$("#_btnSavlvar").hide();

			$("#_tblConstFamiliares").html(ConstanciaFamiliaresHTML());

			$("#_bxFamiliar").show();
			$("#_tblFamiliares").html(FamiliaresHTML());
			var t = $('#tblFamiliares').DataTable(tablaBasica);
			t.clear().draw();
			var DB = militar.Persona.DatoBasico;

			$("#_divfechanacimiento").show();
			$("#_divfechadefuncion").show();
			$("#txtnropersona").val(DB.nropersona);
			$("#txtcedula").val(DB.cedula);
			url = "images/grados/" + militar.Grado.abreviatura + ".png";
			url = url.toLowerCase();
			$("#_imggrado").attr("src", url);
    		$("#_Constgrado").attr("src", url); //Grado de la constancia de afiliacion
			
			var rutaimg = Conn.URLIMG;
			url = rutaimg + $("#txtcedula").val() + ".jpg";
			if (militar.Persona.foto  != undefined){
				rutaimg = Conn.URLTEMP;
				url = rutaimg + $("#txtcedula").val() + "/foto.jpg";
			}
			$("#minifoto").attr("href", url);
			$("#_img").attr("src", url);
			$("#_fotoConstancia").attr("src", url); //Foto para la constancia de afiliacion
			$("#txtdefuncion").val("");
			if(militar.situacion == "FCP"){
				$("#txtdefuncion").val(Util.ConvertirFechaHumana(DB.fechadefuncion));
			}

			url = rutaimg + $("#txtcedula").val() + "/huella.bmp";
			$("#minihuella").attr("href", url);
			$("#_imghuellam").attr("src", url);
			url = rutaimg + $("#txtcedula").val() + "/firma.jpg";
			$("#minifirma").attr("href", url);
			$("#_imgfirmam").attr("src", url);
			url = rutaimg + $("#txtcedula").val() + "/carnet.jpg";
			$("#_imgcarnet").attr("src", url);
			//$("#_imgcarnetmilitar").attr("src", url);

			url = rutaimg + $("#txtcedula").val() + "/cedula.jpg";
			$("#miniced").attr("href", url);
			$("#_imgcopiacedula").attr("src", url);
			url = rutaimg + $("#txtcedula").val() + "/partidanac.jpg";
			$("#mininac").attr("href", url);
			$("#_imgpartida").attr("src", url);

			$("#txtnombre").val(DB.nombreprimero + ' ' + DB.nombresegundo);
			$("#txtapellido").val(DB.apellidoprimero + ' ' + DB.apellidosegundo);
			$("#txtnacimiento").val(Util.ConvertirFechaHumana(DB.fechanacimiento));
			$("#cmbsexo").val(DB.sexo);
			SeleccionarPorSexo(DB.sexo);
			$("#cmbedocivil").val(DB.estadocivil);


			$("#cmbcomponente").val(militar.Componente.abreviatura);
			$("#cmbgrado").html('<option value="' + militar.Grado.abreviatura + '">' + militar.Grado.descripcion + '</option>');
			$("#txtnresuelto").val(militar.nresuelto);
			$("#txtpnoascenso").val(militar.pxnoascenso);
			$("#cmbprofecionalizacion").val(militar.pprof);
			$("#cmbprimapermacnel").val(militar.pespecial);

			$("#txtmfechaultimoascenso").val(Util.ConvertirFechaHumana(militar.fascenso));
			$("#txtmfecharesuelto").val(Util.ConvertirFechaHumana(militar.fresuelto));
			$("#pensionsobreviviente").hide();
			if( militar.pprestaciones != undefined ) {
				$("#pensionsobreviviente").show();
			}
			$("#txtposicion").val(militar.posicion);
			$("#txtfechagraduacion").val(Util.ConvertirFechaHumana(militar.fingreso));
			$("#_fingreso").html(Util.ConvertirFechaHumana(militar.fingreso));
			$("#_fascenso").html(Util.ConvertirFechaHumana(militar.fascenso));
				

			$("#cmbcategoria").val("S");
			$("#cmbsituacion").val(militar.situacion);
			$("#cmbclase").val("S");
			$("#_categoria").html($("#cmbcategoria option:selected").text());
			$("#_situacion").html($("#cmbsituacion option:selected").text());
			$("#cmbSituacionPago").val(militar.situacionpago);
			if($("#cmbsituacion option:selected").text().length > 20){
				$("#_situacion").attr("style","font-size:12px");
			}

			if (militar.CIS.Investigacion.FeDeVida != undefined){
				var ffevida = "";
				militar.CIS.Investigacion.FeDeVida.forEach(v => { ffevida = v.fechacreacion; });
				if(ffevida != ""){
					$("#lblfevida").html(Util.ConvertirFechaHumana(ffevida));
				}
			}
			$("#_clasificacion").html('<font style="size:8px">' + $("#cmbclase option:selected").text() + "</font>");
			$("#_tiemposervicio").html(militar.tiemposervicio);
			if ($("#txtmfecharesuelto").val() != "") {
					$("#cmbcategoria").val(militar.categoria);
					$("#cmbclase").val(militar.clase);
					$("#_categoria").html($("#cmbcategoria option:selected").text());
					$("#_clasificacion").html('<font style="size:8px">' + $("#cmbclase option:selected").text() + "</font>");
					
			}
			var Fideicomiso = militar.Fideicomiso;
			if (militar.Fideicomiso.areconocido != undefined) {
					$("#_reconocidos").show();
					$("#txtareconocido").val(Fideicomiso.areconocido);
					$("#txtmreconocido").val(Fideicomiso.mreconocido);
					$("#txtdreconocido").val(Fideicomiso.dreconocido);
			} else {
					$("#_reconocidos").hide();
					$("#txtareconocido").val("");
					$("#txtmreconocido").val("");
					$("#txtdreconocido").val("");
			}

			$("#_tblBancos").html(BancariosHTML());
			var thbanco = $('#tblBanco').DataTable(tablaBasica);
			if (militar.Persona.DatoFinanciero != undefined) {

					var DF = militar.Persona.DatoFinanciero[0];
					if(DF != undefined ){
						$("#txtmnrocuenta").val(DF.cuenta);
						$("#cmbminstfinanciera").val(DF.institucion);
						$("#cmbmtipofinanciera").val(DF.tipo);
					} 

					thbanco.clear().draw();
					i = 0;
					militar.Persona.DatoFinanciero.forEach ( v => {
							thbanco.row.add([
									i++,
									v.institucion,
									v.tipo,
									v.cuenta
							]).draw(false);
						}
					);


			}
			if (militar.Persona.Direccion != undefined) {

					var DIR = militar.Persona.Direccion[0];
					Estados.ObtenerEstados();
					$("#cmbmestado").val(DIR.estado);
					$("#cmbmmunicipio").html('<option selected="selected" value="' + DIR.municipio + '">' + DIR.municipio + '</option>');
					$("#cmbmparroquia").html('<option selected="selected" value="' + DIR.parroquia + '">' + DIR.parroquia + '</option>');
					$("#cmbmciudad").html('<option selected="selected" value="' + DIR.ciudad + '">' + DIR.ciudad + '</option>');
					$("#txtmcalle").val(DIR.calleavenida);
					$("#txtmcasa").val(DIR.casa);
					$("#txtmapto").val(DIR.apartamento);

			}
			if (militar.Persona.Correo != undefined) {
					$("#txtmtelefono").val(militar.Persona.Telefono.domiciliario);
					$("#txtmcelular").val(militar.Persona.Telefono.movil);
					$("#txtmcorreo").val(militar.Persona.Correo.principal);
			}

			if (militar.Persona.PartidaNacimiento != undefined) {
					$("#txtpregistrocivil").val(militar.Persona.PartidaNacimiento.registro);
					$("#txtpano").val(militar.Persona.PartidaNacimiento.ano);
					$("#txtpacta").val(militar.Persona.PartidaNacimiento.acta);
					$("#txtpfolio").val(militar.Persona.PartidaNacimiento.folio);
					$("#txtplibro").val(militar.Persona.PartidaNacimiento.libro);

			}

			if (militar.Persona.DatoFisionomico != undefined) {
				var df = militar.Persona.DatoFisico;
				var dfi = militar.Persona.DatoFisionomico;
				$("#txtmpeso").val(df.peso);
				$("#txtmtalla").val(df.talla);
				$("#cmbmpiel").val(dfi.colorpiel);
				$("#cmbmojos").val(dfi.colorojos);
				$("#cmbmcolorcabello").val(dfi.colorcabello);
				$("#txtmestatura").val(dfi.estatura);
				$("#txtmsenaparticular").val(dfi.senaParticular);
				$("#cmbmgruposanguineo").val(dfi.gruposanguineo);
			}

			$("#txtcodigocomponente").val(militar.codigocomponente);
			$("#_codigocomponente").html(militar.codigocomponente);

			$("#_lblfechacarnet").html(Util.ConvertirFechaHumana(militar.Tim.fechavencimiento));

			$("#txtnumhistoriaclinica").val(militar.numerohistoria);
			$("#_divpension").hide();
			$("#lblFechaResolucion").html("Fecha de Resolución");

			if(militar.Pension.grado != undefined && militar.Pension.grado != "" && militar.situacion != "ACT"){
				$("#lblFechaResolucion").html("Fecha de Retiro");
				$("#_divpension").show();
				$("#txtmfecharesuelto").val(Util.ConvertirFechaHumana(militar.fretiro));
				$("#txtporcentaje").val(militar.Pension.pprestaciones);
				$("#cmbtipopension").val(militar.Pension.causal);
			}


			
			CargarFamiliaresModal(militar, t);

			verificarPrivilegioUsuario();
			$("#_tblHistorialMilitar").html(HistoricoMilitarHTML());
			var th = $('#tblhistoricomilitar').DataTable(tablaBasica);
				th.clear().draw();
				i = 0;
				$.each(militar.HistorialMilitar, function (c, v) {
					th.row.add([
						i++,
						v.categoria,
						v.clase,
						v.situacion,
						v.grado,
						v.fresuelto
					]).draw(false);
				});
				var valpase = 0;
				if(militar.pasearetiro){
					valpase = 1;
				}
				$("#cmbpbaja").val(valpase);

				if(valpase == 1){
					$("#mdlPaseretiro").modal('show')
				}
				
				$("#cmbCondicion").val("0");
				if(militar.condicion != undefined){
					$("#cmbCondicion").val(militar.condicion);
					if (militar.condicion != 0){
						$("#bCondicion").html( $("#cmbCondicion option:selected").text() );
						$("#mdlCondicion").modal('show');				
					}
					
				}
				$("#_cedula").val("");
				$("#_ficha").show();
				$("#_consultarbox").hide();
				$("#_search").show();
				$("#_cargando").hide();

				ActivarPension();
				if(militar.Pension.pprestaciones != undefined){ 
					$("#txtporcentaje").val(militar.Pension.pprestaciones);
					$("#cmbtipopension").val(militar.Pension.causal);
				}
				$("#_tblDescuentos").html(DescuentosHTML());
				$("#_tblMedidaJudicial").html(MedidaJudicialHTML());
				var tMJ = $('#tblMedidaJudicial').DataTable(tablaBasica);
				
				tMJ.clear().draw();
				MostrarMedidaJudicial(militar.Pension.MedidaJudicial, tMJ);
				
				var DPen = $('#tblDescuentos').DataTable(tablaBasica);
				DPen.clear().draw();
				MostrarDescuentos(militar.Pension.Descuentos, DPen);
			}
			
	}

	//P321 .-
  	Cargar(militar){
        this.id = militar.id;
        this.tipodato = militar.tipodato;
		this.Persona.DatoBasico.nropersona =  militar.Persona.DatoBasico.nropersona;
        this.Persona.DatoBasico = militar.Persona.DatoBasico;
        var DFis = militar.Persona.DatoFisionomico;

        this.Persona.DatoFisionomico.colorojos = DFis.colorojos;
        this.Persona.DatoFisionomico.colorpiel = DFis.colorpiel;
        this.Persona.DatoFisionomico.colorcabello = DFis.colorcabello;
        this.Persona.DatoFisionomico.estatura = DFis.estatura;
        this.Persona.DatoFisionomico.gruposanguineo = DFis.gruposanguineo;

        this.categoria = militar.categoria;
        this.situacion = militar.situacion;
        this.clase = militar.clase;
        this.fingreso = militar.fingreso ;
        this.fascenso = militar.fascenso;
        this.areconocido = militar.areconocido;
        this.mreconocido = militar.mreconocido;
		this.dreconocido = militar.dreconocido;
		this.situacionpago = militar.situacionpago;

        this.posicion = militar.posicion ;
        this.fresuelto = militar.fresuelto;
        this.nresuelto = militar.nresuelto;
        this.descripcionhistorica = militar.descripcionhistorica;
        this.Componente.abreviatura = militar.Componente.abreviatura;
        this.Componente.descripcion = militar.Componente.descripcion;
        this.Grado.abreviatura = militar.Grado.abreviatura;
        this.Grado.descripcion = militar.Grado.descripcion;
        this.urlsimbolo = "";
        this.urlfirmaministro = "";
        this.urlpresidenteipsfa = "";
        this.urlfoto = "";
        this.urlhuella = "";
        this.urlfirma = "";
        this.urlcedula = "";
        this.codigocomponente = militar.codigocomponente;
        this.numerohistoria = militar.numerohistoria;
		this.pasearetiro = militar.pasearetiro;
		this.pprestaciones = militar.pprestaciones;
    }
	
	Obtener(){
		var fingreso = new Date(Util.ConvertirFechaUnix($("#txtfechagraduacion").val())).toISOString();
		var fnacimiento = new Date(Util.ConvertirFechaUnix($("#txtnacimiento").val())).toISOString();
		var fresuelto = new Date(Util.ConvertirFechaUnix($("#txtmfecharesuelto").val())).toISOString();
		var fascenso = new Date(Util.ConvertirFechaUnix($("#txtmfechaultimoascenso").val())).toISOString();
		var fdefuncion = "0001-01-01T00:00:00.000Z";
		if($("#txtmfechaultimoascenso").val() != ""){
			fdefuncion = new Date(Util.ConvertirFechaUnix($("#txtdefuncion").val())).toISOString();
		}

		this.id = $("#txtcedula").val();
		this.Persona.DatoBasico.nacionalidad = "V";

		this.Persona.DatoBasico.cedula = $("#txtcedula").val();
		this.Persona.DatoBasico.nropersona =  parseInt($("#txtnropersona").val());
		this.Persona.DatoBasico.nombreprimero = $("#txtnombre").val().toUpperCase().trim();
		this.Persona.DatoBasico.apellidoprimero = $("#txtapellido").val().toUpperCase().trim();
		this.Persona.DatoBasico.fechanacimiento = fnacimiento;
		this.Persona.DatoBasico.fechadefuncion = fdefuncion;
		this.Persona.DatoBasico.sexo = $("#cmbsexo option:selected").val();
		this.Persona.DatoBasico.estadocivil = $("#cmbedocivil").val();
		this.condicion = parseInt($("#cmbCondicion").val());
		this.fingreso = fingreso;
		this.fascenso = fascenso;
		this.fresuelto = fresuelto;
		this.situacionpago = $("#cmbSituacionPago").val();
		
		this.pxnoascenso = parseInt($("#txtpnoascenso").val());
		this.pprof = parseInt($("#cmbprofecionalizacion option:selected").val());
		this.pespecial = parseInt($("#cmbprimapermacnel option:selected").val());

		this.nresuelto = $("#txtnresuelto").val().toUpperCase()	;
		this.posicion = parseInt($("#txtposicion").val());
		this.situacion = $("#cmbsituacion option:selected").val();
		this.categoria = $("#cmbcategoria option:selected").val();
		this.clase = $("#cmbclase option:selected").val();
		this.Componente.descripcion = $("#cmbcomponente option:selected").text();
		this.Componente.abreviatura = $("#cmbcomponente option:selected").val();
		this.Grado.descripcion = $("#cmbgrado option:selected").text();
		this.Grado.abreviatura = $("#cmbgrado option:selected").val();
		this.Persona.CuentaBancaria.banco = $("#cmbinstfinanciera option:selected").val();
		this.Persona.CuentaBancaria.tipocuenta = $("#cmbtipofinanciera option:selected").val();
		this.Persona.CuentaBancaria.numerocuenta = $("#txtnrocuenta").val();

		var dir = new Direccion();
		dir.tipo = 0;
		dir.estado = $("#cmbmestado option:selected").val();
		dir.municipio = $("#cmbmmunicipio option:selected").val();
		dir.parroquia = $("#cmbmparroquia option:selected").val();
		dir.ciudad = $("#cmbmciudad").val();
		dir.calleavenida = $("#txtmcalle").val().toUpperCase();
		dir.casa = $("#txtmcasa").val().toUpperCase();
		dir.apartamento = $("#txtmapto").val().toUpperCase();
		this.Persona.Direccion[0] = dir;

		var banco = new DatoFinanciero();
		banco.tipo = $("#cmbmtipofinanciera option:selected").val();
		banco.cuenta = $("#txtmnrocuenta").val();
		banco.institucion = $("#cmbminstfinanciera option:selected").val();
		this.Persona.DatoFinanciero[0] = banco;

		this.Persona.Correo.principal = $("#txtmcorreo").val().toUpperCase();
		this.Persona.Telefono.domiciliario = $("#txtmtelefono").val();
		this.Persona.Telefono.movil = $("#txtmcelular").val();
		this.Persona.PartidaNacimiento.registro= $("#txtpregistrocivil").val();
		this.Persona.PartidaNacimiento.ano = $("#txtpano").val();
		this.Persona.PartidaNacimiento.acta = $("#txtpacta").val();
		this.Persona.PartidaNacimiento.folio = $("#txtpfolio").val();
		this.Persona.PartidaNacimiento.libro = $("#txtplibro").val();
		this.Persona.DatoFisico.peso = $("#txtmpeso").val();
		this.Persona.DatoFisico.talla = $("#txtmtalla").val();
		this.Persona.DatoFisionomico.colorpiel = $("#cmbmpiel option:selected").val();
		this.Persona.DatoFisionomico.colorojos = $("#cmbmojos option:selected").val();
		this.Persona.DatoFisionomico.colorcabello = $("#cmbmcolorcabello option:selected").val();
		this.Persona.DatoFisionomico.estatura = parseFloat($("#txtmestatura").val());
		this.Persona.DatoFisionomico.senaParticular = $("#txtmsenaparticular").val();
		this.Persona.DatoFisionomico.gruposanguineo = $("#cmbmgruposanguineo").val();
		this.Persona.RedSocial.twitter = $("#txtmtwitter").val().toUpperCase();
		this.Persona.RedSocial.facebook = $("#txtmfacebook").val().toUpperCase();
		this.Persona.RedSocial.instagram = $("#txtminstagran").val().toUpperCase();

		this.codigocomponente = $("#txtcodigocomponente").val();
		this.numerohistoria =   $("#txtnumhistoriaclinica").val();
		this.Pension.pprestaciones =  parseFloat($("#txtporcentaje").val());
		this.Pension.causal = $("#cmbtipopension").val();
		

		var valpase = false;
		if($("#cmbpbaja option:selected").val() == 1){
			valpase = true;
		}
		this.pasearetiro =valpase;

		return this;

	}

	//P0 -- 
  	ObtenerCategoria(){
        var cad = "";
        switch (this.categoria){
            case "EFE":cad = "EFECTIVO";break;
            case "ASI":cad = "ASIMILADO";break;
            default: cad = "********";break;
        }

        if(this.situacion != "ACT"){
        	cad = "RESERVA ACTIVA";
				}
				if(this.situacion == "I"){
					cad = "PENSION DE INVALIDEZ";
				}

        return cad;
    }

	//P0 -- 
	Salvar(){
		$("#_bxFamiliar").show();
		$("#_bxFamiliarTarjeta").show();
		$("#_btnConstancia").show();
		$("#_btnTIM").show();
		$("#_btnModificar").show();
		$("#_btnSavlvar").hide();
		CargarAPI(Conn.URL + "militar/crud" , "POST", this.Obtener(), this);
	}

	//P0 -- 
	Actualizar(){
		$("#_bxFamiliar").show();
		$("#_bxFamiliarTarjeta").show();
		$("#_btnConstancia").show();
		$("#_btnTIM").show();
		$("#_btnModificar").show();
		$("#_btnSavlvar").hide();
		CargarAPI(Conn.URL + "militar/crud" , "PUT", this.Obtener());
	}
}

//P0 -- 
class CuentaBancaria{
	constructor(){
		this.banco = "";
		this.tipocuenta = "";
		this.numerocuenta = "";
	}
}

class CondicionEspecial{
    constructor(){
        this.fecha = "";
        this.tipodiscapacidad = 0;
        this.diagnostico = "";
        this.nombrehospitalmilitar="";
    }
}
class Clave {
	constructor(){
			this.login = "";
			this.clave = "";
			this.nueva = "";
			this.repetir = "";
	}

    Obtener(){
        this.login = Usuario.usuario;
        this.clave = $("#claveA").val();
        this.nueva = $("#claveN").val();
        this.repetir = $("#claveN2").val();
        return this;
    }

    Salvar(){
        CargarAPI(Conn.URL + "wusuario" , "PUT", this.Obtener());
    }

}
$(function (){
  if (sessionStorage.getItem('ipsfaToken') == undefined ){
		$(location).attr("href","../index.html");
	}else{
		$("#_body").show();
	}
});

function CerrarSession(){
	sessionStorage.removeItem('ipsfaToken');
	$(location).attr("href","../index.html");
}


class LstCarnet {
    constructor() {
			// console.log("Cargando la clase de Aprobacion...");
    }
    Crear(Json) {
        if (Json == null) {
            return false
        }

        var tabla = "_tblPendiente";
        var buzon = "tblPendientesBuzon";
        if (Estatus != 0) {
            tabla = "_tblPendienteImp";
            buzon = "tblPendientesBuzonImp";
        }
        var t = $('#' + buzon).DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': false,

        });
        t.clear().draw();
        var j = 0;

        Json.forEach(v => {
						var paseR = "";
						if(v.condicion){
							paseR = "<p style='color:red'>(En proceso de retiro)</p>"
						}

            var tipocarnet = "verCarnet";
            var idf = "";
            if(v.idf != ""){
                if(v.idf != v.id){
                    tipocarnet = "verCarnetFamiliar";
                    idf= v.idf;
                }
            }
		        if (Estatus == 0) {
		            var boton = `<div class="btn-group">
				        <button type="button" class="btn btn-sm btn-info" onclick="${tipocarnet}('${v.serial}','${v.id}','${v.fechavencimiento}',1,'${v.idf}')">
				        <i class="fa fa-search"></i></button>
				        <button type="button"  class="btn btn-sm btn-success desaparece" onclick="aprobarCarnet('${v.serial}',1)">
				        Aprobado</button>
				        <button type="button" class="btn btn-sm btn-danger desaparece" onclick="pendienteCarnet('${v.serial}',2)">
				        Eliminar</button>
				        </div>`;
		        } else {
		            var boton = `<div class="btn-group">
				        <button type="button" class="btn btn-sm btn-primary" onclick="${tipocarnet}('${v.serial}','${v.id}','${v.fechavencimiento}',0,'${v.idf}')">
				        <i class="fa fa-print"></i></button>
				        <button type="button" class="btn btn-sm btn-success desaparece" onclick="cerrarCarnet('${v.serial}')">
				        <i class="fa fa-check"></i></button>
				        </div>`;
		        }
				var nombre = v.nombre + " " + v.apellido;

        t.row.add([
            j++, //0
            v.id, //1
            v.Grado.descripcion+paseR, //2
            nombre.toUpperCase(), //3
            this.ObtenerMotivo(v.motivo), //v.motivo, //
            boton //5
        ]).draw(false);
    	});
    }

    ObtenerMotivo(motivo) {
        var cadena = "";
        switch (motivo) {
            case "I" :
                cadena = "INGRESO";
                break;
            case "C" :
                cadena = "ASCENSO";
                break;
            case "CS" :
                cadena = "CAMBIO SITUACION";
                break;
            case "V" :
                cadena = "VENCIMIENTO";
                break;
            case "D" :
                cadena = "DETERIORO";
                break;
            case "E" :
                cadena = "EXTRAVIO";
                break;
            default:
                cadena = "********";
                break;
        }
        return cadena;
    }
}


class PACE {
    constructor() {
			// console.log("Cargando la clase de Aprobacion...");
    }
    Crear(Json) {
		
		$("#sueldo_base").val(Json.sueldo_base_aux);
		$("#sueldo_global").val(Json.sueldo_global_aux);
		$("#sueldo_integral").val(Json.sueldo_integral_aux);
		$("#fano").val(Json.aguinaldos_aux);
      	$("#vacaciones").val(Json.vacaciones_aux);
		$("#P_TRANSPORTE").val(Json.prima_transporte_aux);
		$("#P_DESCENDECIA").val(Json.prima_descendencia_aux);
		$("#P_ESPECIAL").val(Json.prima_especial_aux);
		$("#P_TIEMPOSERVICIO").val(Json.prima_tiemposervicio_aux);
		$("#P_NOASCENSO").val(Json.prima_noascenso_aux);
		$("#P_PROFESIONALIZACION").val(Json.prima_profesionalizacion_aux);
		$("#P_COMPENSACION_ESPECIAL").val(Json.prima_compensacion_especial_aux);
	}
}


let lstNeto = [];

class WPensiones{
	constructor(){

	}
	
	Crear(req){
		var i = 0;
		$("#cmbNetoPago").html('<option value="X">SELECCIONAR UN PAGO</option>');
		$("#_netosConceptos").html(ConceptosNetosHTML());
		var tblC = $('#tblNetosConceptos').DataTable(tablaBasica);
		console.log(req);

		req.forEach(pago => {
			$("#mdlNetos").modal("show");			
			var obj = JSON.parse(pago.calculos).conceptos;
			lstNeto.push(obj);
			var neto = Intl.NumberFormat("de-DE").format(Number(parseFloat(pago.neto).toFixed(2)))
			$("#cmbNetoPago").append(`<option value="${i}">${pago.nomina} - ${pago.mes} DEL ${pago.hasta.substr(0,4) } | ( ${pago.hasta} | ${neto} )</option> `)
			i++;
		});		

	}
}
function PensionesAsignadas(){
	var wpensiones = new WPensiones();
	var ruta =  Conn.URL + "pensionado/consultarneto/" + $("#txtcedula").val() ;
    CargarAPI(ruta, "GET", wpensiones, wpensiones);
}

function consultarNetoPago(){
	var pos = $("#cmbNetoPago option:selected").val();
	$("#_netosConceptos").html(ConceptosNetosHTML());
	var tblC = $('#tblNetosConceptos').DataTable(tablaBasica);
	$("#_netosPrimas").html('');
	
	var obj = lstNeto[pos];
	for(var i=0; i< obj.length; i++){
		var monto = obj[i].mont;
		var tipo = obj[i].tipo;
		var des = obj[i].desc.replace("_", " ").toUpperCase();
		if(tipo == 97){
			$("#_netosPrimas").append(`<div class="col-md-4">${des}<br>${monto}</div>`);	
		}else{
			if(tipo == 1){ //Asignacion
				tblC.row.add([des, monto,'']).draw(false);
			}else{ //Deduccion
				tblC.row.add([des,'', monto]).draw(false);
			}
		}
	}
}



class WCalculos{
	constructor(){}
	Crear(req){
		
		var botones = `<button type="button" class="btn btn-primary" data-dismiss="modal">ACEPTAR</button>`;
		$("#_botonesmsjcal").html(botones);
		
		var html = `<ul class="list-group list-group-unbordered">`;
		
		var asig = 0;
		var dedu = 0;
		$.each(req, function(c, v){ 
			if ( v.TIPO < 90 && v.mt > 0 ){
				var mt = parseFloat(v.mt);
				if(v.TIPO == 0){
					html += `<li class="list-group-item">
					<b>${v.ABV}</b> <a class="pull-right">- ${mt.toFixed(2)}</a>
					</li>`;
					dedu += mt;
				}else{

					html += `<li class="list-group-item">
						<b>${v.ABV}</b><a class="pull-right">${mt.toFixed(2)}</a>
					</li>`;
					asig += mt;
				}
				
				
			}
			
		});
		var monto = asig - dedu; 
	
		html += `<li class="list-group-item">
			<b>NETO TOTAL A COBRAR</b><a class="pull-right">${parseFloat(monto).toFixed(2)}</a>
		</li></ul>`
		$("#_contenidocal").html(html);
		$('#modMsjCal').modal('show');
	}
}

function mostarCalculosConceptos(){
	
	
	var wCalculos = new WCalculos();
	var ruta =  Conn.URL + "pensionado/calculo/" + $("#txtcedula").val();
	CargarAPI(ruta, "GET", "", wCalculos);
}