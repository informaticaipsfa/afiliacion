let estiloCSSCredito = `
	<style>
		@charset "utf-8";
		@page {
			margin: 1.5cm;
			margin-bottom: 0.8cm;
			margin-top: 0.8cm;
			size: letter;
		}
		section {
			page-break-before: always;
		}
		body {
			margin: 0px;
			font-family: Calibri;
			
		}
		.baner {
			text-align: center;
			line-height: 22px; 
			font-size: 13px; 
		}
		p {
			text-align: justify;
			line-height: 22px; 
			font-size: 12px;
		}
		.wrapper {
			min-height: 100%;
			height: auto !important;
			height: 100%;
			margin: 0 auto -5em;
		}
		.footer, .push {
			height: 5em;
			font-size: 10px;
		}
		ul, img, table {
			/** page-break-inside: avoid; **/
			font-size: 10px;
			
		}
		tr    { 
			/** page-break-inside:auto;  **/
		}
		
		.documentoCss {
			font-size: 10px;
		}
		
		table.documentoCss th, table.documentoCss td{
			border: 1px solid #CCCCCC;
			border-spacing: 0.5rem;
			border-collapse: collapse;
		}
	</style>
	
`

let estiloCSSCreditoLst = `
	<style>
		@charset "utf-8";
		@page {
			margin: 1.5cm;
			margin-bottom: 0.8cm;
			margin-top: 0.8cm;
			size: letter landscape;
			
		}
		section {
			page-break-before: always;
		}
		body {
			margin: 0px;
			font-family: Calibri;
			
		}
		.baner {
			text-align: center;
			line-height: 22px; 
			font-size: 13px; 
		}
		p {
			text-align: justify;
			line-height: 22px; 
			font-size: 12px;
		}
		.wrapper {
			min-height: 100%;
			height: auto !important;
			height: 100%;
			margin: 0 auto -5em;
		}
		.footer, .push {
			height: 5em;
			font-size: 10px;
		}
		ul, img, table {
			font-size: 10px;
			
		}
		.documentoCss {
			font-size: 10px;
		}
		
		table.documentoCss th, table.documentoCss td{
			border: 1px solid #CCCCCC;
			border-spacing: 0.5rem;
			border-collapse: collapse;
		}
	</style>
	
`

let estiloCSSCreditoLstRelacion = `
	<style>
		@charset "utf-8";
		@page {
			margin: 1.5cm;
			margin-bottom: 1.5cm;
			margin-top: 1.0cm;
			size: letter landscape;
			
		}
		section {
			page-break-before: always;
		}
		body {
			margin: 0px;
			font-family: Calibri;
			
		}
		.baner {
			text-align: center;
			line-height: 13px; 
			font-size: 11px; 
		}
		p {
			text-align: justify;
			line-height: 22px; 
			font-size: 12px;
		}
		.wrapper {
			min-height: 100%;
			height: auto !important;
			height: 100%;
			margin: 0 auto -5em;
		}
		.footer, .push {
			height: 5em;
			font-size: 8px;
		}
		ul, img, table {
			font-size: 8px;
			
		}
		.documentoCss {
			font-size: 8px;
		}
		
		table.documentoCss th, table.documentoCss td{
			border: 1px solid #CCCCCC;
			border-spacing: 0.5rem;
			border-collapse: collapse;
		}
	</style>
	
`

let opcionesCredito = {
	ordering: 		false,
    paging: 		false, 
    scrollY:        250,
    deferRender:    true,
	scroller:       true,
	searching: 		false,
    ordering: 		false,
    info: 			false,
};

let opcionesCreditoPrestamo = {
	ordering: 		false,
    paging: 		true, 
    deferRender:    true,
	searching: 		false,
    ordering: 		false,
    info: 			false,
};


let opcionesCreditoListar = {
    ordering: false,
    paging: false,          
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
    } ],
    select: {
        style: 'multi'
    },
    scrollY:        400,
    deferRender:    true,
    scroller:       true,
    language: {
        "lengthMenu": "Mostar _MENU_ filas por pagina",
        "zeroRecords": "Nada que mostrar",
        "info": "Mostrando _PAGE_ de _PAGES_",
        "infoEmpty": "No se encontro nada",
        "infoFiltered": "(filtered from _MAX_ total records)",
        "search": "Buscar"
    }
};


let _GIROS = [];

var cantVehi = 20;
var cantHipo = 20;
function IniciarCredito(estatus){
    StepperCredito = new Stepper(document.querySelector('#stepper-credito'));
	$('#mdlCredito').modal('show');
}





let wPrestamo = new CPersonal();


function PrCalcularPorcentaje(){
	var monto = parseFloat( $("#txtSueldoPr").val() ) * 1; //  sueldo para realizar calculos del 30%
	var cantidad = ( monto * 70 ) / 100;

	$("#txtCuotaMaxima").val( Util.FormatoMoneda(parseFloat( cantidad ).toFixed(2)) );

}

function CrHideAlert(){
	$("#divPrAlert").hide();
}

function CrResumen(){
	
}

function IniciarPrestamo(estatus){
	$('#txtFechaAprobacion').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
	});
	$('#txtFechaEspecial').datepicker({
        autoclose: true,
        format: "dd/mm/yyyy",
        language: 'es'
    });
    StepperPrestamo = new Stepper(document.querySelector('#stepper-prestamo'));

	$('#mdlPrestamo').modal('show');
}


function CargarPrestamo( str ){
	
	$("#cmbConceptoPr").val( str );
	$("#txtAportePr").attr("disabled", true);
	if( str == "6" ) {
		$("#txtAportePr").attr("disabled", false);
	}
	StepperPrestamo.next();
}

function asignarMontoSol(){
	var monto = (parseFloat( $("#txtMontoSol").val() ) * 1) - (parseFloat($("#txtAportePr").val()) * 1)
	$("#txtMontoPr").val( monto );
	//$("#txtMontoPrT").val( (parseFloat( $("#txtMontoSol").val() ) * 1) );
	
}

function CalcularPrestamo(){
	var monto = parseFloat( $("#txtMontoPr").val())  * 1; //  solicitamos la cantidad prestada, el plazo y el tipo de interes
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);//  multiplicamos por 100, para disolver el %, y por 12, para tener valor mensual
	var periodo = parseFloat( $("#cmbCuotasPr").val() ) * 1 * 12;// multiplicamos por 12 para devolver valor mensual
	
	var potencia = 1 + interes;
	var xxx = Math.pow(potencia, -periodo);//  funcion matematica donde la base es la potencia y el exponente el tiempo
	
	var xxx1 = monto * interes;
	var equivalencia = xxx1 / (1 - xxx);

	equivalencia = parseFloat(equivalencia); //  limitamos el número de decimales a cero
	// console.log("Mn: " + monto);
	// console.log("In: " + interes);
	// console.log("Pr: " + periodo);
	// console.log("Pot: " + potencia);
	// console.log("xxx: " + xxx);
	// console.log("xxx1: " + xxx1);
	// console.log("equ: " + equivalencia);

	return equivalencia;
}


function CalcularCuotasPr(){
	if ( $("#txtMontoPr").val() == "" ) { 
		$("#divPrAlert").html("Debe introducir un monto");
		$("#divPrAlert").show();
		return false;
	}

	var monto = parseFloat( $("#txtMontoPr").val() ) * 1;
	var cuota = CalcularPrestamo();
	var periodo = parseInt( $("#cmbCuotasPr").val() ) * 1 * 12;
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);
	wPrestamo.cuota = parseFloat( cuota ).toFixed(2);
	wPrestamo.periodo = "MENSUAL"

	$("#txtCuotaMensual").val(Util.FormatoMoneda(wPrestamo.cuota));
}
function CalcularInteresCuotaGiro(){
	var monto = parseFloat( $("#txtMontoGiro").val())  * 1; //  solicitamos la cantidad prestada, el plazo y el tipo de interes
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);//  multiplicamos por 100, para disolver el %, y por 12, para tener valor mensual
	var periodo = parseFloat( $("#cmbCuotasPr").val() ) * 1 * 12;// multiplicamos por 12 para devolver valor mensual
	
	var potencia = 1 + interes;
	var xxx = Math.pow(potencia, -periodo);//  funcion matematica donde la base es la potencia y el exponente el tiempo
	
	var xxx1 = monto * interes;
	var equivalencia = xxx1 / (1 - xxx);

	equivalencia = parseFloat(equivalencia); //  limitamos el número de decimales a cero

	return equivalencia;
}

function converAAMMDD(fch){
	var fecha = fch.split("/");
	return fecha[2] + "/" + fecha[1] + "/" + fecha[0] ;
}
/**
 * @param {date} fchA '2020/08/01'
 * @param {date} fechB 
 */
function restarFechasCredito(fchA, fechB){

	let fecha1 = new Date(converAAMMDD(fchA));
	let fecha2 = new Date(converAAMMDD(fechB));

	let resta = fecha2.getTime() - fecha1.getTime();
	//console.log(Math.round(resta/ (1000*60*60*24)));
	return Math.round(resta/ (1000*60*60*24));
}

function CalcularMontoPr(){
	if ($("#txtFechaAprobacion").val() == "" || $("#txtFechaEspecial").val() == ""){
		alertNotifyCredito('Debe agregar datos de la fecha correctamente Aprobación', 'warning');
		return false;
	}
	var cant = parseInt($("#cmbCuotasPr").val());
	if (cant > 1 ) {
		for (let i = 0; i < cant; i++) {		
			CalcMontPr(i);		
		}
	}else{
		CalcMontPr();
	}
	
	$("#txtMontoGiro").val('');
	$("#txtFechaEspecial").val('');
	$("#cmbespecial").val(0);
}

function CalcMontPr(AA){
	
	var giro = parseFloat( $("#txtMontoGiro").val() ) * 1;
	var monto = $("#txtMontoPr").val( );
	var interes =  parseFloat( $("#txtInteresPr").val()) / 100;
	

	
	$("#txtMontoPr").val( monto - giro  );
	var x =  parseFloat( $("#txtMontoPrT").val() ) * 1;
	$("#txtMontoPrT").val(x + giro);
	CalcularCuotasPr();

	//Calcular el interes en funcion a los días 
	var fechaEspecialAux = $("#txtFechaEspecial").val();
	var fp = fechaEspecialAux.split("/");
	var ann = parseInt(fp[2]) + AA;
	var fechaEspecial = ann + "-" + fp[1] + "-" + fp[0] ;
	var fechaEspecialAux = fp[0] + "/" + fp[1]  + "/" +  ann ;

	var dias = restarFechasCredito( $("#txtFechaAprobacion").val(), fechaEspecialAux);
	var calInteres = ( giro * interes / 360 ) *  dias;

	var lstC = new Cuota();
	lstC.balance  =  giro;
	lstC.cuota =   giro + calInteres;
	lstC.interes =  calInteres;
	lstC.capital =  giro;
	lstC.saldo =  giro + calInteres;
	lstC.fecha = fechaEspecial;
	lstC.estatus = 0;
	lstC.dias = dias;
	lstC.numero = _GIROS.length + 1;
	lstC.tipo =  parseInt( $("#cmbespecial").val());
	_GIROS.push(lstC);
	var cant = _GIROS.length;
	$("#tblDetalleEspecial").append(`
		<tr>		
			<td style="text-align:center">${cant}</td>
			<td style="text-align:right; display:none">${ Util.FormatoMoneda(lstC.balance) } </td>
			<td style="text-align:right">${ Util.FormatoMoneda(lstC.cuota) } </td>
			<td style="text-align:right">${ Util.FormatoMoneda(lstC.interes) } </td>		
			<td style="text-align:right">${ Util.FormatoMoneda(lstC.capital) } </td>
			<td style="text-align:center">${lstC.dias}</td>
			<td style="text-align:center">${  fp[0] + "-" + fp[1] + "-" + ann  }</td>
			<td style="text-align:center">
				${$("#cmbespecial option:selected").text()}							
			</td>
		</tr>
	`);
	$("#botonesTablaEspecial").html(`
		<button type="button" id="btn" class="btn btn-sm btn-danger btn-flat pull-right" onclick="borrarGirosEspeciales(1)">
			<i class="fa fa-trash"></i>&nbsp;&nbsp;VACACIONES
		</button>
		<button type="button" id="btn" class="btn btn-sm btn-warning btn-flat pull-right" onclick="borrarGirosEspeciales(2)">
			<i class="fa fa-trash"></i>&nbsp;&nbsp;AGUINALDOS
		</button>
	
	`)
	

}

function totalGirosintereses(){
	var intereses = 0;
	for (let i = 0; i < _GIROS.length; i++) {
		const element = _GIROS[i];
		intereses += element.interes;		
	}
	return intereses;
}


function borrarGirosEspeciales(tipo){
	//console.log(_GIROS);
	var giros = [];
	var suma = 0;
	var resta = 0;
	for (let i = 0; i < _GIROS.length; i++) {
		const element = _GIROS[i];
		if (element.tipo == tipo){
			resta += parseFloat(element.capital);
		}else{
			suma += parseFloat(element.capital);
			giros.push( element );
		}
		
	}
	var monto = parseFloat( $("#txtMontoPr").val() ) * 1;
	$("#txtMontoPr").val( monto + resta );

	var x =  parseFloat( $("#txtMontoPrT").val() ) * 1;
	$("#txtMontoPrT").val(x - resta);
	CalcularCuotasPr();
	_GIROS = giros;
	//console.log(_GIROS);
	reconstruirGiros();
	return giros;
}
function reconstruirGiros(){
	
	$("#tblDetalleEspecial").html('');

	for (let i = 0; i < _GIROS.length; i++) {
		const lstC = _GIROS[i];
		var pos = i + 1;
		$("#tblDetalleEspecial").append(`
			<tr>		
				<td style="text-align:center">${ pos }</td>
				<td style="text-align:right; display:none">${Util.FormatoMoneda(lstC.balance) } </td>
				<td style="text-align:right;">${Util.FormatoMoneda(lstC.cuota) } </td>
				<td style="text-align:right;">${Util.FormatoMoneda(lstC.interes) } </td>		
				<td style="text-align:right;">${Util.FormatoMoneda(lstC.capital) } </td>
				<td style="text-align:center">${lstC.dias}</td>
				<td style="text-align:center">${lstC.fecha}</td>
				<td style="text-align:center">
					${comboEspecial(lstC.tipo)}							
				</td>
			</tr>
		`);
	};
	
}
function comboEspecial(tipo){
	var text = "";
	switch (tipo) {
		case 1:
			text = "VACACIONES";
			break;
		case 2:
			text = "AGUINALDOS";
			break;
		default:
			text = "--------"
			break;
	}
	return text;
}

function TablaAmortizacion(){
	$("#divPrAlert").hide();
	var cmm = Util.FormatoNumero( $("#txtCuotaMaxima").val() ); //CApacidad
	var cm =  Util.FormatoNumero( $("#txtCuotaMensual").val() ); //Cuota
	
	if( cmm < cm ){
		$("#divPrAlert").html("La capacidad máxima mensual no puede ser menor a la cuota mensual ");
		$("#divPrAlert").show();
		
		return false;
	}
	if ( $("#txtMontoPr").val() == "" ) { 
		$("#divPrAlert").html("Debe introducir un monto");
		$("#divPrAlert").show();
		return false;
	}
	StepperPrestamo.next();
	$("#_TblAmortizacionCrAux").html(HTMLTblAmortizacionPrint());
	$("#_TblAmortizacion").html(HTMLTblAmortizacion());
	var t = $('#tblPrestamo').DataTable(opcionesCredito);
	t.clear().draw();
	var monto = ( parseFloat( $("#txtMontoPr").val() ) * 1)  ;
	var cuota = CalcularPrestamo();
	var periodo = parseInt( $("#cmbCuotasPr").val() ) * 1 * 12;
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);
	var totalInteres = 0;
	wPrestamo.cuota = parseFloat(parseFloat( cuota ).toFixed(2));
	wPrestamo.capital =  parseFloat(parseFloat( monto ).toFixed(2));
	wPrestamo.montoaprobado =  parseFloat(parseFloat( monto ).toFixed(2));
	wPrestamo.cantidad = periodo
	//$("#txtCuotaMensual").val(prestamo.cuota);
	var fecha = new Date();
	var ano = fecha.getFullYear();
	var mes = fecha.getMonth() + 3;
	
	if(fecha.getDate() > 14 )mes += 1;
	if(mes > 12){
		mes = 1;
		ano += 1;
	}

	var fila = 0;
	for (var i = 0; i < periodo; i++) {
		var lstC = {};
		var mess = mes;
		if ( mes < 10) mess = '0' + mes;
		var ainteres = monto * interes;
		var capital = cuota - ainteres;
		var saldo = monto - capital;
		var lstC = new Cuota();
		fila = i + 1
		
		lstC.balance  =  parseFloat(parseFloat( monto ).toFixed(2));
		lstC.cuota =  parseFloat(parseFloat( cuota ).toFixed(2));
		lstC.interes =  parseFloat(parseFloat( ainteres ).toFixed(2));
		lstC.capital =  parseFloat(parseFloat( capital ).toFixed(2));
		lstC.saldo =  parseFloat(parseFloat( saldo ).toFixed(2));
		lstC.dias = 0;
		lstC.fecha = ano + '-' + mess + '-' + '01' ;
		lstC.tipo = 0;
		lstC.estatus = 0;
		lstC.numero = fila;
		
		wPrestamo.cuotas.push(lstC);
		totalInteres += ainteres;
		
		t.row.add([
			fila, //#
			Util.FormatoMoneda( monto), //Balance
			Util.FormatoMoneda( cuota), //Cuota
			Util.FormatoMoneda( ainteres), //Interes
			Util.FormatoMoneda( capital), //Capital
			Util.FormatoMoneda( saldo), //Saldo
			'01-' + mess + '-' + ano 
		]).draw(false);
		
		$("#tblPrestamoAuxBody").append(`<tr>
			<td style="text-align:center">${ fila }</td>
			<td style="text-align:right">${ Util.FormatoMoneda(monto) }</td>
			<td style="text-align:right">${ Util.FormatoMoneda(cuota) }</td>
			<td style="text-align:right">${ Util.FormatoMoneda(ainteres)  }</td>
			<td style="text-align:right">${ Util.FormatoMoneda(capital)  }</td>
			<td style="text-align:right">${ Util.FormatoMoneda(saldo) }</td>
			<td style="text-align:right">${ '01-' + mess + '-' + ano }</td>
		</tr>`);

		if ( mes == 12 ) {
			ano++;
			mes=1;
		}else{
			mes++;
		}

		monto =  saldo;
	}

	for (let i = 0; i < _GIROS.length; i++) {
		const lstC = _GIROS[i];
		wPrestamo.cuotas.push(lstC);
	}
	var totInteresGiros = totalGirosintereses() +   totalInteres;
	wPrestamo.totalinteres =   parseFloat(parseFloat(totInteresGiros).toFixed(2));
	wPrestamo.Banco.tipo = ObjMilitar.Persona.DatoFinanciero[0].tipo;
	wPrestamo.Banco.institucion = ObjMilitar.Persona.DatoFinanciero[0].institucion;
	wPrestamo.Banco.cuenta = ObjMilitar.Persona.DatoFinanciero[0].cuenta;
	wPrestamo.concepto =  $("#cmbConceptoPr option:selected").text();
	wPrestamo.cedula = ObjMilitar.id;
	var nombre = ObjMilitar.Persona.DatoBasico.nombreprimero + ' ' + ObjMilitar.Persona.DatoBasico.nombresegundo;
	var apelli = ObjMilitar.Persona.DatoBasico.apellidoprimero + ' ' + ObjMilitar.Persona.DatoBasico.apellidosegundo;
	wPrestamo.nombre = nombre + ' ' + apelli;
	wPrestamo.sueldo = $("#txtSueldoPr").val();
	wPrestamo.fechaaprobado = new Date(Util.ConvertirFechaUnix($("#txtFechaAprobacion").val())).toISOString();
	wPrestamo.fechacreacion = new Date().toISOString();
	wPrestamo.capital = ( parseFloat( $("#txtMontoPr").val() ) * 1) + ( parseFloat( $("#txtMontoPrT").val() ) *1 ) ;
	wPrestamo.componente = ObjMilitar.Componente.abreviatura;
	wPrestamo.grado = ObjMilitar.Grado.abreviatura;
	wPrestamo.situacion = ObjMilitar.situacion;
}

function NuevoCredito(){
	$("#divPrAlert").hide();
	$("#_TblAmortizacionCrAux").html(HTMLTblAmortizacionPrint());
	$("#_TblAmortizacion").html(HTMLTblAmortizacion());
	var t = $('#tblPrestamo').DataTable(opcionesCredito);
	t.clear().draw();
	$("#_tblLstCredito").html(ListaCreditoHTMLZ());
	var t = $('#tblCreditoZ').DataTable();
	t.clear().draw();
	_GIROS = [];
	$("#tblDetalleEspecial").html('');

	wPrestamo = new CPersonal();

	$("#txtSueldoPr").val( '' );
	$("#txtMontoSol").val( '' );
	$("#txtAportePr").val( '0' );
	$("#txtMontoPr").val( '0' );
	$("#cmbCuotasPr").val( '1' );
	$("#txtInteresPr").val( '' );
	$("#txtFechaAprobacion").val( '' );
	$("#txtCuotaMaxima").val( '0' );
	$("#txtCuotaMensual").val( '0' );
	$("#txtMontoPrT").val( '0' );


	//$("#mdlCreditoPrestamo").modal('hide');
	$("#txtConceptoPrT").val( '' );
	$("#txtCuotaPrT").val('');
	$("#txtInteresPrT").val('');
	
	$("#txtTotalInteresPrT").val('');
	$("#txtCapitalPrT").val('');
	$("#txtAportePrT").val('');
	$("#txtPlazoPr").val('');
	$("#txtPagosPrT").val('');
	$("#txtPorcentajePrT").val('0');
	$("#txtDepositoPrT").val('');


}


function HTMLTblCabecera(){
	var totalPrestamo = parseFloat( wPrestamo.totalinteres ) * 1 +  parseFloat( wPrestamo.capital ) * 1;
	var depositado = parseFloat( (parseFloat( wPrestamo.capital ) *1 ) ).toFixed(2);
	
	return `		
		<table class="ui celled table table-bordered table-striped dataTable" width="100%">
	
				<TR>
					<TD><B>CEDULA</B></TD>
					<TD colspan=2><B>APELLIDOS Y NOMBRES</B></TD>
					<TD><B>FECHA ING. FANB</B></TD>
				</TR>
				<TR>
					<TD>${ObjMilitar.id}</TD>
					<TD colspan=2>${ObjMilitar.Persona.DatoBasico.apellidoprimero  + " " + ObjMilitar.Persona.DatoBasico.nombreprimero }</TD>
					<TD>${Util.ConvertirFechaHumana(ObjMilitar.fingreso)}</TD>
				</TR>
				<TR>
					<TD><B>COMPONENTE</B></TD>
					<TD><B>GRADO</B></TD>
					<TD><B>TIEMPO DE SERVICIO</B></TD>
					<TD><B>SITUACION</B></TD>
				</TR>

				<TR>
					<TD>${ObjMilitar.Componente.descripcion}</TD>
					<TD>${ObjMilitar.Grado.descripcion}</TD>
					<TD>${ObjMilitar.tiemposervicio}</TD>
					<TD>${ObjMilitar.situacion}</TD>
				</TR>
		</table>
		<br>
		<table class="ui celled table table-bordered table-striped dataTable" width="100%">
	
				<TR>
					<td ><B>CONCEPTO</B></td>
					<TD colspan=3>${$("#cmbConceptoPr option:selected").text()}</TD>
					<td><B>MONTO CREDITO</B> </td>
					<TD>${  Util.FormatoMoneda(wPrestamo.capital) + " Bs."}</TD>
					<td><B>PLAZO AÑOS</B> </td>
					<TD>${ wPrestamo.cantidad /12  }</TD>
					
				
					
				</TR>
				<TR>
					<td><B>INTERESES</B></td>
					<TD>${ $("#txtInteresPr").val() + "%"}</TD>
					<td><B>APORTE</B></td>
					<TD>${ $("#txtAportePr").val() }</TD>
					<td><B>TOTAL PREST.</B></td>
					<TD>${ Util.FormatoMoneda(totalPrestamo) + " Bs." }</TD>
					<td><B>TOTAL. INT.</B></td>
					<TD>${ Util.FormatoMoneda(wPrestamo.totalinteres)  + " Bs."}</TD>
					
					
					
				</TR>
				<TR>
					<td ><B>TOTAL DE CUOTAS.</B></td>
					<TD>${ ( parseFloat( $("#txtMontoPr").val() )  * 1) + " Bs."}</TD>
					<td ><B>TOTAL DE GIROS.</B></td>
					<TD>${ ( parseFloat( $("#txtMontoPrT").val() )  * 1) + " Bs."}</TD>
					<td><B>CUOTA</B></td>
					<TD>${ Util.FormatoMoneda(wPrestamo.cuota) }</TD>
					<td><B>DEPOSITADO</B></td>
					<TD>${ Util.FormatoMoneda(depositado) + " Bs."  }</TD>
					
				</TR>
		</table><br>

	`
	

}

function HTMLTblAmortizacion(){
	return `
	<table id="tblPrestamo" class="ui celled table table-bordered table-striped dataTable" width="100%">
		<thead>
			<tr>
				<th style="width:30px">#</th>
				<th>BALANCE</th>
				<th>CUOTA</th>
				<th>INTERES</th>                                            
				<th>CAPITAL</th>                   
				<th>SALDO</th>
				<th>F. DE PAGO</th>
			</tr>
		</thead>
		<tbody>
		</<tbody>
	</table>`;
}


function HTMLTblAmortizacionCP(){
	return `
	<table id="tblPrestamoCP" class="ui celled table table-bordered table-striped dataTable" width="100%">
		<thead>
			<tr>
				<th style="width:30px">#</th>
				<th>BALANCE</th>
				<th>CUOTA</th>
				<th>INTERES</th>                                            
				<th>CAPITAL</th>                   
				<th>SALDO</th>
				<th>FECHA</th>
			</tr>
		</thead>
		<tbody>
		</<tbody>
	</table>`;
}


function HTMLTblAmortizacionPrint(){
	return `
	<table id="tblPrestamoAux" cellspacing=0 celladding=0 width="100%" class="documentoCss" >
		<thead >
			<tr >
				<th>#</th>
				<th >BALANCE</th>
				<th>CUOTA</th>
				<th>INTERES</th>                                            
				<th>CAPITAL</th>                   
				<th>SALDO</th>
				<th>F. DE PAGO</th>
			</tr>
		</thead>
		<tbody id="tblPrestamoAuxBody" >

		</<tbody>
	</table>`;
}

function PrResumen(){
	wPrestamo.intereses =   parseFloat( parseFloat( $("#txtInteresPr").val()).toFixed(2)  );
	
	

	$("#txtConceptoPrT").val( $("#cmbConceptoPr option:selected").text() );
	$("#txtCuotaPrT").val( wPrestamo.cuota );
	$("#txtInteresPrT").val( $("#txtInteresPr").val() );
	
	$("#txtTotalInteresPrT").val( wPrestamo.totalinteres );
	$("#txtCapitalPrT").val( wPrestamo.capital );
	$("#txtAportePrT").val( $("#txtAportePr").val() );
	$("#txtPlazoPr").val( wPrestamo.cuotas.length );
	$("#txtGirosPr").val( _GIROS.length );
	$("#txtGirosPrT").val( parseFloat( $("#txtMontoPrT").val() ) *1 );
	var suma = parseFloat( wPrestamo.totalinteres ) * 1 +  parseFloat( wPrestamo.capital ) * 1;
	$("#txtPagosPrT").val(  parseFloat( suma ).toFixed(2) );

	var administrativo =  0; //( parseFloat(wPrestamo.capital)  * 1) /100
	//$("#txtPorcentajePrT").val(  parseFloat( administrativo ).toFixed(2) );
	wPrestamo.porcentajeseguro =  0; //parseFloat( parseFloat( $("#txtPorcentajePrT").val()).toFixed(2) );

	var deposito = ( parseFloat( wPrestamo.capital ) *1 ) ; //- parseFloat( administrativo ) *1;
	$("#txtDepositoPrT").val(   parseFloat( deposito ).toFixed(2) );
	wPrestamo.totaldepositar =   parseFloat( parseFloat( deposito ).toFixed(2) );

	StepperPrestamo.next();
}


function FirmaCredito(){
	var fecha = new Date();

	return `<table width="100%">
		<tr>
			<td style="width:50%; text-align:center" valign="center">
			<b>Firma
			<br><br><br><br>
			_________________________________<br>
			${Usuario.nombre}<br>
			V.- ${Usuario.cedula}
			</b>
			</td>
			<td style="width:50%; text-align:center" valign="center">
			<b>Firma
			<br><br><br><br>
			_________________________________<br>
			${ObjMilitar.Persona.DatoBasico.apellidoprimero  + " " + ObjMilitar.Persona.DatoBasico.nombreprimero }<br>
			V.- ${ObjMilitar.id}
			</b>
			</td>
		</tr>
	</table><br><br>
	Elaborado en fecha de: ${Util.ConvertirFechaHumana( fecha.toISOString() )}
	`
}

function PrImprimir(){
	
	$("#divPrCabecera").html(HTMLTblCabecera());
	var tabla = $("#_TblAmortizacionCrAux").html();	
	var tblD = $("#tblGiros").html();

	$("#divCreditoTabla").html(tabla);
	$("#divGiros").html(tblD)
	$("#divFirmaCredito").html( FirmaCredito() )

	var html = $("#_rptprestamos").html();
    var ventana = window.open("", "_blank");
	ventana.document.write(html);
	
    ventana.document.head.innerHTML = estiloCSSCredito;
    ventana.print();
    ventana.close();
}



/**
 * Guardar Prestamo 
 */


class PrestamoPersonal{
	constructor(){}
	Crear(req){

		$('#mdlCredito').modal('hide');
		$('#mdlPrestamo').modal('hide');
		NuevoCredito();

		alertNotifyCredito(' Registrado #: ' + req.msj, 'success');

	}
}


function PrGuardar(){
	var wPrestamosPersona = new PrestamoPersonal();
	//console.error(wPrestamo);
	
	CargarAPI(Conn.URL + "credito/crud" , "POST", wPrestamo, wPrestamosPersona);
}



function ListaCreditoHTML(){
	var html = `<table class="ui celled table " cellspacing="0" width="100%" id="tblCredito" >
        <thead class="familiares">
        <tr>
			<th>NRO.</th>
			<th>CONCEPTO</th>
			<th>CUENTA</th>
			<th>FECHA</th>
			<!-- <th>CUOTA</th> -->
			<th>MONTO CREDITO</th>
			<th>ESTATUS</th> 
			<th style="display:none">ID</th>
        </tr>
        </thead >
        <tbody>
        </tbody>
    </table>`;
    return html;
}

function ListaCreditoHTMLZ(){
	var html = `<table class="ui celled table table-bordered table-striped dataTable " cellspacing="0" width="100%" id="tblCreditoZ" >
        <thead class="familiares">
		<tr>
			<th style="text-align:center;">
				<button style="border: none; background: transparent; font-size: 14px;" id="MytblConcepto">
					<i class="fa fa-check-square"></i>  
				</button>
			</th>
			<th>NRO.</th>
			<th>COMP</th>
			<th>GRAD.</th>
			<th>SITU</th>
			<th>CEDULA</th>
			<th>NOMBRES Y APELLIDOS</th>
			<th>CONCEPTO</th>
			<th>N. CREDITO</th> 
			<th>BANCO</th>
			<th>TIPO</th>     
			<th>CUENTA</th>
			<th>MONTO CREDITO</th>
			<th>OID</th>
        </tr>
        </thead >
        <tbody>
        </tbody>
    </table>`;
    return html;
}

function ListaCreditoHTMLZAux(){
	var html = `<table class="documentoCss ui celled table" cellspacing="0" width="100%" id="tblCreditoZ1" >
        <thead >
		<tr>			
			<th>NRO.</th>
			<th>COMP</th>
			<th>GRAD.</th>
			<th>SITU</th>
			<th>CEDULA</th>
			<th>NOMBRES Y APELLIDOS</th>
			<th>CONCEPTO</th>
			<th>N. CREDITO</th> 
			<th>BANCO</th>
			<th>TIPO</th>     
			<th>CUENTA</th>
			<th>MONTO CREDITO</th>
        </tr>
        </thead >
        <tbody id="tblCreditoLstAux">
        </tbody>
    </table>`;
    return html;
}

function MostrarCredito(Credito, tCre){
	var i = 0;
	
    $.each( Credito.Prestamo, function (cl, val) {
		$.each(val, function(c, v){
			var oid = v.oid!=undefined?v.oid:'';
			var conc = v.concepto!=undefined?v.concepto.toUpperCase():'';
			var banc = v.Banco.cuenta!=undefined?v.Banco.cuenta:'';        
			var estatus = v.estatus!=undefined?v.estatus:'PENDIENTE';
			var capital = v.capital!=undefined?v.capital:'0,00';
			
			if(estatus == 1){
				estatus = "PROCESADO"
			}else if (estatus == 2){
				estatus = "CANCELADO"
			}
			tCre.row.add([
				oid,
				conc,
				banc,
				Util.ConvertirFechaHumana(v.fechacreacion),
				//Util.FormatoMoneda(v.cuota),
				Util.FormatoMoneda(v.capital),
				estatus,
				i
			]).draw(false);
			i++;
		});
	});
	
    tCre.column(6).visible(false);
    //tCre.column(8).visible(false);
    $('#tblCredito tbody').on('dblclick', 'tr', function () {        
		var data = tCre.row(this).data();
		$("#mdlCreditoPrestamo").modal('show');
		$("#_TblAmortizacionCreditoPrestamo").html(HTMLTblAmortizacionCP());
		var t = $('#tblPrestamoCP').DataTable(opcionesCreditoPrestamo);
		var cuotas = ObjMilitar.Credito.Prestamo.Personal[data[7]].cuotas;
		t.clear().draw();
		var i = 1;

		$.each(cuotas, function(c, v){
			var saldo = v.saldo!=undefined?v.saldo:'';
			var cuota = v.cuota!=undefined?v.cuota:'';
			var capital = v.capital!=undefined?v.capital:'';
			var interes = v.interes!=undefined?v.interes:'';
			t.row.add([
				i,
				v.balance,
				cuota,
				interes,
				capital,
				saldo,
				v.fecha
			]).draw(false);
			i++;
		});

	});
}



function alertNotifyCredito (msj, color){
    $.notify(
        {
            title: '<strong>Proceso de Crédito!</strong>',
            message: msj
        },
        {
            type: color
        } 
    );
}


/**
 * Guardar Prestamo 
 */


class WListarPP{
	constructor(){
		this.fecha = '';
		this.desde = '';
		this.hasta = '';
		this.estatus = 0;
	}


	Crear(req){
		$("#btnImprimirRelacion").hide();
		$("#btnSalvarRelacion").hide();
		$("#btnEnviarRelacion").hide();
		
		$("#_tblLstCreditoAux").html(ListaCreditoHTMLZAux());
		$("#_tblLstCredito").html(ListaCreditoHTMLZ());
		var t = $('#tblCreditoZ').DataTable(opcionesCreditoListar);
		t.clear().draw();
		var fila = 0;
		var sum = 0;
		$("#tblCreditoLstAux").html('');
		if (req === null) return false;
		req.forEach(e => {
			fila++;
			t.row.add([
				'',
				fila, //#
				e.componente, //Componente
				e.grado, //Grado
				e.situacion, //Situacion
				e.cedula, //Balance
				e.nombre, //Cuota
				e.concepto, //Interes
				e.codigo, //Codigo
				e.instituto, //Capital
				e.tipo, //Capital
				e.cuenta,
				Util.FormatoMoneda( e.monto ), 
				e.oid //	Util.ConvertirFechaHumana(e.fecha)
			]).draw(false);
			

			sum += e.monto;
			$("#tblCreditoLstAux").append(`<tr>
				<td style="text-align:center">${ fila }</td>
				<td style="text-align:center">${ e.componente }</td>
				<td style="text-align:center">${ e.grado }</td>
				<td style="text-align:center">${ e.situacion  }</td>
				<td >${ e.cedula  }</td>
				<td >${ e.nombre  }</td>
				<td >${ e.concepto  }</td>
				<td style="text-align:center">${ e.codigo  }</td>							
				<td style="text-align:center">${ e.instituto  }</td>
				<td style="text-align:center">${ e.tipo  }</td>
				<td style="text-align:center">${ e.cuenta  }</td>
				<td style="text-align:right">${ Util.FormatoMoneda( e.monto ) }&nbsp;&nbsp;</td>
			</tr>`);
			
		});

		t.column(13).visible(false);
		

		$("#tblCreditoLstAux").append(`<tr>
				<td colspan=10 style="text-align:center"></td>
				<td style="text-align:center">TOTAL Bs.</td>
				<td style="text-align:right">${ Util.FormatoMoneda( sum )  }&nbsp;&nbsp;</td>
		</tr>`);


		$('#MytblConcepto').click(function() {
            if (t.rows({
                    selected: true
                }).count() > 0) {
                t.rows().deselect();
                return;
            }
    
            t.rows().select();
        });
    
        t.on('select deselect', function(e, dt, type, indexes) {
            if (type === 'row') {
                // We may use dt instead of tblP to have the freshest data.
                if (dt.rows().count() === dt.rows({
                        selected: true
                    }).count()) {
                    // Deselect all items button.
                    $('#MytblConcepto i').attr('class', 'fa fa-check-square');
                    return;
                }
    
                if (dt.rows({
                        selected: true
                    }).count() === 0) {
                    // Select all items button.
                    $('#MytblConcepto i').attr('class', 'fa fa-square');
                    return;
                }
    
                // Deselect some items button.
                $('#MytblConcepto i').attr('class', 'fa fa-minus-square');
            }
        });
		
		

		if(parseInt($("#cmbEstatus").val()) == 0)$("#btnSalvarRelacion").show();		
		if(parseInt($("#cmbEstatus").val()) == 1){
			$("#btnImprimirRelacion").show();
			$("#btnEnviarRelacion").show();
			
		}
		if ( parseInt($("#cmbEstatus").val()) > 0 )t.column(0).visible(false);
		alertNotifyCredito('Proceso exitoso', 'success');

	}

	Obtener(){
		return this;
	}

}



function ListarNominasCredito(){
	var wListarPP = new WListarPP();
	wListarPP.fecha = $("#date_range").val();
	var fech = wListarPP.fecha.split("AL");
	wListarPP.desde = fech[0].trim();
	wListarPP.hasta = fech[1].trim();
	wListarPP.estatus =  parseInt($("#cmbEstatus").val());
	//console.log( wListarPP.Obtener() );


	CargarAPI(Conn.URL + "credito/listar" , "POST", wListarPP.Obtener(), wListarPP);

}


function PrImprimirListado(){
	
	var tabla = $("#_tblLstCreditoAux").html();	

	$("#divCabeceralst").html(tabla);
	
	//$("#divFirmaCredito").html( FirmaCredito() )

	var html = $("#_rptcreditolst").html();
    var ventana = window.open("", "_blank");
	ventana.document.write(html);
	
    ventana.document.head.innerHTML = estiloCSSCreditoLst;
    ventana.print();
    ventana.close();
}


function AprobarCreditos(){
	var lst = [];
	var Tbls = $('#tblCreditoZ').DataTable();
	var t = Tbls.rows('.selected').data();
	$.each(t, function(c, v){        
        lst.push( v[13] );
	});
	
	console.log(lst.length);

	if(lst.length > 0) {
		$('#mdlCreditoLista').modal("show");

	}else{
		alertNotifyCredito('Debe seleccionar por lo menos un crédito', 'warning');	
	}


	
}



class WCredActualizar{
	constructor(){
		this.estatus = 0;
		this.serie = [];
		this.cantidad = 0;
		this.total = 0;
		this.llave = '';
		this.observacion = '';
	}


	Crear(req){
		
		ListarNominasCredito();
		alertNotifyCredito('Proceso exitoso', 'success');	
	}
	Obtener(){
		return this;
	}
}
function AceptarCreditos(){
	var wca = new WCredActualizar();

	$('#mdlCreditoLista').modal("hide");
	var lst = [];
	var Tbls = $('#tblCreditoZ').DataTable();
	var t = Tbls.rows('.selected').data();
	var sum = 0;
	var cant = 0;
	$.each(t, function(c, v){ 
		cant++;
		sum += parseFloat( Util.FormatoNumero( v[12] ) );
        lst.push( v[13] );
	});
	wca.estatus = 1;
	wca.serie = lst;
	wca.cantidad = cant;
	wca.total = sum;
	var fecha = new Date().toISOString();
	var codigo = Usuario.nombre + sum + cant +  fecha;
    MD5codigo = MD5(codigo);
	wca.llave = MD5codigo;

	//console.log(wca);
	CargarAPI(Conn.URL + "credito/actualizar" , "POST", wca.Obtener(), wca);
	
	
}

function EnviarATesoreria(){
	var wca = new WCredActualizar();

	$('#mdlCreditoLista').modal("hide");
	var lst = [];
	var Tbls = $('#tblCreditoZ').DataTable();
	var t = Tbls.rows().data();
	var sum = 0;
	var cant = 0;
	$.each(t, function(c, v){ 
		cant++;
		sum += parseFloat( Util.FormatoNumero( v[12] ) );
        lst.push( v[13] );
	});
	wca.estatus = 1;
	wca.serie = lst;
	wca.cantidad = cant;
	wca.total = sum;
	var fecha = new Date().toISOString();
	var codigo = Usuario.nombre + sum + cant +  fecha;
    MD5codigo = MD5(codigo);
	wca.llave = MD5codigo;

	console.log(wca);
	CargarAPI(Conn.URL + "credito/enviar" , "POST", wca.Obtener(), wca);
	
	
}

function RelacionCreditosActivosHTML(){
	var html = `<table class="documentoCss ui celled table" cellspacing="0" width="100%" id="tblRelacion" >
        <thead >
		<tr>			
			<th>NRO.</th>
			<th>COMP</th>
			<th>GRAD.</th>
			<th>SITU</th>
			<th>CEDULA</th>
			<th>NOMBRES Y APELLIDOS</th>
			<th>CONCEPTO</th>
			<th>N. CREDITO</th> 
			<th>F. OTORG.</th>
			<th>CAPITAL</th>
			<th>INTERESES</th>
			<th>TOTAL</th>
        </tr>
        </thead >
        <tbody id="tblRelacionCuerpoAux">
        </tbody>
    </table>`;
	return html;
}
function RelacionCreditosActivosHTMLAUX(){
	var html = `<table class="documentoCss ui celled table" cellspacing="0" width="100%" id="tblRelacionAUX" >
        <thead >
		<tr>			
			<th>NRO.</th>
			<th>COMP</th>
			<th>GRAD.</th>
			<th>SITU</th>
			<th>CÉDULA</th>
			<th>NOMBRES Y APELLIDOS</th>
			<th>CONCEPTO</th>
			<th>N. CRÉDITO</th> 
			<th>F. OTORG.</th>
			<th>CAPITAL</th>
			<th>INTERESES</th>
			<th>TOTAL</th>
        </tr>
        </thead >
        <tbody id="tblRelacionCuerpo">
        </tbody>
    </table>`;
	return html;
}



/**
 * Guardar Prestamo 
 */


class WRelacion{
	constructor(){
		this.fecha = '';
		this.desde = '';
		this.hasta = '';
		this.estatus = 0;
	}


	Crear(req){
		console.log(req);
		$("#btnImprimirRelacion").hide();
		//$("#btnSalvarRelacion").hide();
		//$("#btnEnviarRelacion").hide();
		
		$("#_tblLstRelacionAux").html(RelacionCreditosActivosHTMLAUX());
		$("#_tblLstRelacion").html(RelacionCreditosActivosHTML());
		var t = $('#tblRelacion').DataTable(opcionesCreditoPrestamo);
		t.clear().draw();
		var fila = 0;
		var sum = 0;
		var interes = 0;
		var totales = 0;
		$("#tblRelacionCuerpo").html('');
		if (req === null) return false;
		req.forEach(e => {
			fila++;
			t.row.add([
				fila, //#
				e.componente, //Componente
				e.grado, //Grado
				e.situacion, //Situacion
				e.cedula, //Balance
				e.nombre, //Cuota
				e.concepto, //Interes
				e.codigo, //Codigo
				Util.ConvertirFechaHumana( e.fecha),
				Util.FormatoMoneda( e.monto ), 
				Util.FormatoMoneda(e.totalinteres), //Capital
				Util.FormatoMoneda(e.monto + e.totalinteres) //,
				//Util.FormatoMoneda(e.abonado) //Capital
			]).draw(false);
			

			sum += e.monto;
			interes += e.totalinteres;
			totales += e.monto + e.totalinteres;
			$("#tblRelacionCuerpo").append(`<tr>
				<td style="text-align:center">${ fila }</td>
				<td style="text-align:center">${ e.componente }</td>
				<td style="text-align:center">${ e.grado }</td>
				<td style="text-align:center">${ e.situacion  }</td>
				<td >${ e.cedula  }</td>
				<td >${ e.nombre  }</td>
				<td >${ e.concepto  }</td>
				<td style="text-align:center">${ e.codigo  }</td>
				<td style="text-align:center">${ Util.ConvertirFechaHumana( e.fecha)  }</td>							
				<td style="text-align:right">${ Util.FormatoMoneda( e.monto ) }&nbsp;&nbsp;</td>
				<td style="text-align:center">${ Util.FormatoMoneda(e.totalinteres)  }</td>
				<td style="text-align:center">${ Util.FormatoMoneda(e.monto + e.totalinteres)  }</td>
			</tr>`);
			$("#btnImprimirRelacion").show();
			
		});

		$("#tblRelacionCuerpo").append(`<tr>
				<td colspan=8 style="text-align:center"></td>
				<td style="text-align:center">TOTAL Bs.</td>
				<td style="text-align:right">${ Util.FormatoMoneda( sum )  }&nbsp;&nbsp;</td>
				<td style="text-align:right">${ Util.FormatoMoneda( interes )  }&nbsp;&nbsp;</td>
				<td style="text-align:right">${ Util.FormatoMoneda( totales )  }&nbsp;&nbsp;</td>
		</tr>`);

		console.log($("#_tblLstRelacionAux").html());

	}

	Obtener(){
		return this;
	}

}

function RelacionActivos(){
	CargarUrl("_rptcreditolst", "cre/relacion");
	var wRelacion = new WRelacion();
	wRelacion.fecha = $("#date_range").val();
	var fech = wRelacion.fecha.split("AL");
	wRelacion.desde = fech[0].trim();
	wRelacion.hasta = fech[1].trim();
	wRelacion.estatus =  parseInt($("#cmbEstatus").val());
	//console.log( wRelacion.Obtener() );


	CargarAPI(Conn.URL + "credito/relacionactiva" , "POST", wRelacion.Obtener(), wRelacion);

}

function RelacionPagados(){
	CargarUrl("_rptcreditolst", "cre/relacion");
	var wRelacion = new WRelacion();
	wRelacion.fecha = $("#date_range").val();
	var fech = wRelacion.fecha.split("AL");
	wRelacion.desde = fech[0].trim();
	wRelacion.hasta = fech[1].trim();
	wRelacion.estatus =  parseInt($("#cmbEstatus").val());
	//console.log( wRelacion.Obtener() );


	CargarAPI(Conn.URL + "credito/relacionactiva" , "POST", wRelacion.Obtener(), wRelacion);

}


function ImprimirRelacion(){
	
	var tabla = $("#_tblLstRelacionAux").html();	

	$("#divCabeceralst").html(tabla);
	console.log($("#divCabeceralst").html());
	
	//$("#divFirmaCredito").html( FirmaCredito() )

	var html = $("#_rptcreditolst").html();
    var ventana = window.open("", "_blank");
	ventana.document.write(html);
	
    ventana.document.head.innerHTML = estiloCSSCreditoLstRelacion;
    ventana.print();
    ventana.close();
}