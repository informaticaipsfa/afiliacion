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



function IniciarCredito(estatus){
    StepperCredito = new Stepper(document.querySelector('#stepper-credito'));
	$('#mdlCredito').modal('show');
}





let wPrestamo = new CPersonal();


function PrCalcularPorcentaje(){
	var monto = parseFloat( $("#txtSueldoPr").val() ) * 1; //  sueldo para realizar calculos del 30%
	var cantidad = ( monto * 70 ) / 100;

	$("#txtCuotaMaxima").val( parseFloat( cantidad ).toFixed(2) );

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
    StepperPrestamo = new Stepper(document.querySelector('#stepper-prestamo'));

	$('#mdlPrestamo').modal('show');
}


function CargarPrestamo( str ){
	
	$("#cmbConceptoPr").val(str);
	StepperPrestamo.next();
}

function CalcularPrestamo(){
	var monto = parseFloat( $("#txtMontoPr").val() ) * 1; //  solicitamos la cantidad prestada, el plazo y el tipo de interes
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);//  multiplicamos por 100, para disolver el %, y por 12, para tener valor mensual
	var periodo = parseFloat( $("#cmbCuotasPr").val() ) * 1 * 12;// multiplicamos por 12 para devolver valor mensual
	
	var potencia = 1 + interes;
	var xxx = Math.pow(potencia, -periodo);//  funcion matematica donde la base es la potencia y el exponente el tiempo
	
	var xxx1 = monto * interes;
	var equivalencia = xxx1 / (1 - xxx);

	equivalencia = parseFloat(equivalencia); //  limitamos el número de decimales a cero
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

	$("#txtCuotaMensual").val(wPrestamo.cuota);
}


function TablaAmortizacion(){
	

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
	var monto = parseFloat( $("#txtMontoPr").val() ) * 1;
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
	var mes = fecha.getMonth() + 1;
	var fila = 0;
	for (var i = 0; i < periodo; i++) {
		var lstC = {};
		var mess = mes;
		if ( mes < 10) mess = '0' + mes;
		var ainteres = monto * interes;
		var capital = cuota - ainteres;
		var saldo = monto - capital;
		var lstC = new Cuota();
		lstC.balance  =  parseFloat(parseFloat( monto ).toFixed(2));
		lstC.cuota =  parseFloat(parseFloat( cuota ).toFixed(2));
		lstC.interes =  parseFloat(parseFloat( ainteres ).toFixed(2));
		lstC.capital =  parseFloat(parseFloat( capital ).toFixed(2));
		lstC.saldo =  parseFloat(parseFloat( saldo ).toFixed(2));
		lstC.fecha = '01-' + mess + '-' + ano;
		lstC.estatus = 0;
		
		wPrestamo.cuotas.push(lstC);
		totalInteres += ainteres;
		fila = i + 1
		t.row.add([
			fila, //#
			parseFloat( monto ).toFixed(2), //Balance
			parseFloat( cuota ).toFixed(2), //Cuota
			parseFloat( ainteres ).toFixed(2), //Interes
			parseFloat( capital ).toFixed(2), //Capital
			parseFloat( saldo ).toFixed(2), //Saldo
			'01-' + mess + '-' + ano 
		]).draw(false);
		
		$("#tblPrestamoAuxBody").append(`<tr>
			<td>${ fila }</td>
			<td>${ numeral( parseFloat(monto,2)).format('0,0.00') }</td>
			<td>${ numeral( parseFloat(cuota,2)).format('0,0.00') }</td>
			<td>${ numeral( parseFloat(ainteres,2)).format('0,0.00')  }</td>
			<td>${ numeral( parseFloat(capital,2)).format('0,0.00')  }</td>
			<td>${ numeral( parseFloat(saldo,2)).format('0,0.00') }</td>
			<td>${ '01-' + mess + '-' + ano }</td>
		</tr>`);

		if ( mes == 12 ) {
			ano++;
			mes=1;
		}else{
			mes++;
		}

		monto =  saldo;
	}
	wPrestamo.totalinteres =  parseFloat(  parseFloat( totalInteres ).toFixed(2) );
	wPrestamo.Banco.tipo = ObjMilitar.Persona.DatoFinanciero[0].tipo;
	wPrestamo.Banco.institucion = ObjMilitar.Persona.DatoFinanciero[0].institucion;
	wPrestamo.Banco.cuenta = ObjMilitar.Persona.DatoFinanciero[0].cuenta;
	wPrestamo.concepto =  $("#cmbConceptoPr option:selected").text();
	wPrestamo.cedula = ObjMilitar.id;
	wPrestamo.sueldo = $("#txtSueldoPr").val();
	wPrestamo.fechaaprobado = new Date(Util.ConvertirFechaUnix($("#txtFechaAprobacion").val())).toISOString();
	wPrestamo.fechacreacion = new Date().toISOString();
}



function HTMLTblCabecera(){
	var totalPrestamo = parseFloat( wPrestamo.totalinteres ) * 1 +  parseFloat( wPrestamo.capital ) * 1;
	var depositado = parseFloat( (parseFloat( wPrestamo.capital ) *1 ) - ( ( parseFloat(wPrestamo.capital)  * 1) /100 )  ).toFixed(2);
	
	return `		
		<table class="ui celled table table-bordered table-striped dataTable" width="100%">
	
				<TR>
					<TD><B>CEDULA</B></TD>
					<TD><B>APELLIDOS Y NOMBRES</B></TD>
					<TD><B>FECHA ING. FANB</B></TD>
				</TR>
				<TR>
					<TD>${ObjMilitar.id}</TD>
					<TD>${ObjMilitar.Persona.DatoBasico.apellidoprimero  + " " + ObjMilitar.Persona.DatoBasico.nombreprimero }</TD>
					<TD>${Util.ConvertirFechaHumana(ObjMilitar.fingreso)}</TD>
				</TR>
				<TR>
					<TD><B>COMPONENTE</B></TD>
					<TD><B>GRADO</B></TD>
					<TD><B>TIEMPO DE SERVICIO</B></TD>
				</TR>

				<TR>
					<TD>${ObjMilitar.Componente.descripcion}</TD>
					<TD>${ObjMilitar.Grado.descripcion}</TD>
					<TD>${ObjMilitar.tiemposervicio}</TD>
				</TR>
		</table>
		<br>
		<table class="ui celled table table-bordered table-striped dataTable" width="100%">
	
				<TR>
					<td ><B>CONCEPTO</B></td><TD colspan=3>${$("#cmbConceptoPr option:selected").text()}</TD>
					<td><B>CUOTA</B></td><TD>${ numeral( parseFloat(wPrestamo.cuota ,2)).format('0,0.00') }</TD>
					<td><B>INTERESES</B></td><TD>${ $("#txtInteresPr").val() + "%"}</TD>
					
				</TR>
				<TR>
					<td><B>TOTAL. INT.</B></td><TD>${ numeral( parseFloat(wPrestamo.totalinteres ,2)).format('0,0.00')  + "%"}</TD>
					<td><B>CAPITAL</B> </td><TD>${  numeral( parseFloat(wPrestamo.capital ,2)).format('0,0.00') + " Bs."}</TD>
					<td><B>APORTE</B></td><TD>${ $("#txtAportePr").val() }</TD>
					<td><B>TOTAL PREST.</B></td><TD>${ numeral( parseFloat(totalPrestamo ,2)).format('0,0.00') + " Bs." }</TD>
				</TR>
				<TR>
					<td ><B>1% AUTO SEGURO.</B></td><TD>${ ( parseFloat(wPrestamo.capital)  * 1) /100 + " Bs."}</TD>
					<td><B>DEPOSITADO</B></td><TD>${ numeral( parseFloat(depositado ,2)).format('0,0.00') + " Bs."  }</TD>
					<td colspan=4></td>
					
				</TR>
		</table>

	`
	

}

function HTMLTblAmortizacion(){
	return `
	<table id="tblPrestamo" class="ui celled table table-bordered table-striped dataTable" width="100%">
		<thead>
			<tr>
				<th style="width:30px">ACCION</th>
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


function HTMLTblAmortizacionCP(){
	return `
	<table id="tblPrestamoCP" class="ui celled table table-bordered table-striped dataTable" width="100%">
		<thead>
			<tr>
				<th style="width:30px">ACCION</th>
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
	<table id="tblPrestamoAux" class="ui celled table table-bordered table-striped dataTable" width="100%">
		<thead>
			<tr>
				<th>#</th>
				<th>BALANCE</th>
				<th>CUOTA</th>
				<th>INTERES</th>                                            
				<th>CAPITAL</th>                   
				<th>SALDO</th>
				<th>FECHA</th>
			</tr>
		</thead>
		<tbody id="tblPrestamoAuxBody">

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
	$("#txtPlazoPr").val( wPrestamo.cuota );
	var suma = parseFloat( wPrestamo.totalinteres ) * 1 +  parseFloat( wPrestamo.capital ) * 1;
	$("#txtPagosPrT").val(  parseFloat( suma ).toFixed(2) );

	var administrativo =  ( parseFloat(wPrestamo.capital)  * 1) /100
	$("#txtPorcentajePrT").val(  parseFloat( administrativo ).toFixed(2) );
	wPrestamo.porcentajeseguro =  parseFloat( parseFloat( $("#txtPorcentajePrT").val()).toFixed(2) );

	var deposito = (parseFloat( wPrestamo.capital ) *1 ) - parseFloat( administrativo ) *1;
	$("#txtDepositoPrT").val(   parseFloat( deposito ).toFixed(2) );
	wPrestamo.totaldepositar =   parseFloat( parseFloat( deposito ).toFixed(2) );

	StepperPrestamo.next();
}

function PrImprimir(){
	
	$("#divPrCabecera").html(HTMLTblCabecera());
	var tabla = $("#_TblAmortizacionCrAux").html();	
	$("#divCreditoTabla").html(tabla);

	var html = $("#_rptprestamos").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}



/**
 * Guardar Prestamo 
 */


class PrestamoPersonal{
	constructor(){}
	Crear(req){
		console.log(req);
		$('#mdlCredito').modal('hide');
		//$("#mdlCreditoPrestamo").modal('hide');
		$("#txtConceptoPrT").val( '' );
		$("#txtCuotaPrT").val('');
		$("#txtInteresPrT").val('');
		
		$("#txtTotalInteresPrT").val('');
		$("#txtCapitalPrT").val('');
		$("#txtAportePrT").val('');
		$("#txtPlazoPr").val('');
		$("#txtPagosPrT").val('');
		$("#txtPorcentajePrT").val('');
		$("#txtDepositoPrT").val('');
		alertNotifyCredito('Proceso exitoso', 'success');

	}
}


function PrGuardar(){
	var wPrestamosPersona = new PrestamoPersonal();
	
	CargarAPI(Conn.URL + "credito/crud" , "POST", wPrestamo, wPrestamosPersona);
}



function ListaCreditoHTML(){
	var html = `<table class="ui celled table " cellspacing="0" width="100%" id="tblCredito" >
        <thead class="familiares">
        <tr>
			<th>NRO.</th>
			<th>TIPO</th>        
			<th>CUENTA</th>
			<th>FECHA</th>
			<th>COUTA</th>
			<th>MONTO CREDITO</th>
			<th>ESTATUS</th>
			<th>#</th>
        </tr>
        </thead >
        <tbody>
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
				accounting.formatMoney(v.cuota, "Bs. ", 2, ".", ","),
				accounting.formatMoney(v.montoaprobado, "Bs. ", 2, ".", ","),
				estatus,
				i
			]).draw(false);
			i++;
		});
    });
    tCre.column(7).visible(false);
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
