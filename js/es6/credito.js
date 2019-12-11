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

class Credito{
	constructor(){
		this.cuotas = [];
		this.periodo = 0;
		this.monto = 0.0;
		this.sueldo = 0.0;
	}
	Crear(req){

	}
}
function IniciarCredito(estatus){
    StepperCredito = new Stepper(document.querySelector('#stepper-credito'));
	$('#mdlCredito').modal('show');
}





/**
 *  Prestamos 
 * 
 * 
 */
class Prestamo{
	constructor(){
		this.cuotas = [];
		this.periodo = 0;
		this.cuota = 0.0;
		this.monto = 0.0;
		this.sueldo = 0.0;
		this.totalinteres = 0.0;

	}
	Crear(){

	}

}

let prestamo = new Prestamo();


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
    StepperPrestamo = new Stepper(document.querySelector('#stepper-prestamo'));
    // $('#datepicker').datepicker({
    //     autoclose: true,
    //     format: "yyyy-mm-dd",
    //     language: 'es'
    // });
    // $('#datepickerfin').datepicker({
    //     autoclose: true,
    //     format: "yyyy-mm-dd",
    //     language: 'es'
	// });
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
	prestamo.cuota = parseFloat( cuota ).toFixed(2);

	$("#txtCuotaMensual").val(prestamo.cuota);
}


function TablaAmortizacion(){
	

	if ( $("#txtMontoPr").val() == "" ) { 
		$("#divPrAlert").html("Debe introducir un monto");
		$("#divPrAlert").show();
		return false;
	}
	StepperPrestamo.next();
	$("#_TblAmortizacion").html(HTMLTblAmortizacion());        
	var t = $('#tblPrestamo').DataTable(opcionesCredito);
	t.clear().draw();
	var monto = parseFloat( $("#txtMontoPr").val() ) * 1;
	var cuota = CalcularPrestamo();
	var periodo = parseInt( $("#cmbCuotasPr").val() ) * 1 * 12;
	var interes = parseFloat( $("#txtInteresPr").val() ) / (100 * 12);
	var totalInteres = 0;
	prestamo.cuota = parseFloat( cuota ).toFixed(2);
	prestamo.capital = parseFloat( monto ).toFixed(2);
	//$("#txtCuotaMensual").val(prestamo.cuota);
	var fecha = new Date();
	var ano = fecha.getFullYear();
	var mes = fecha.getMonth() + 1;
	
	for (var i = 0; i < periodo; i++) {
		var lstC = {};
		var mess = mes;
		if ( mes < 10) mess = '0' + mes;
		var ainteres = monto * interes;
		var capital = cuota - ainteres;
		var saldo = monto - capital;
		lstC = {
			balance : parseFloat( monto ).toFixed(2),
			cuota: parseFloat( cuota ).toFixed(2),
			interes: parseFloat( ainteres ).toFixed(2),
			capital: parseFloat( capital ).toFixed(2),
			saldo: parseFloat( saldo ).toFixed(2),
			fecha: '01-' + mess + '-' + ano + ''
		}
		prestamo.cuotas.push(lstC);
		totalInteres += ainteres;
		t.row.add([
			i + 1, //#
			parseFloat( monto ).toFixed(2), //Balance
			parseFloat( cuota ).toFixed(2), //Cuota
			parseFloat( ainteres ).toFixed(2), //Interes
			parseFloat( capital ).toFixed(2), //Capital
			parseFloat( saldo ).toFixed(2), //Saldo
			'01-' + mess + '-' + ano + ''
		]).draw(false);
		if ( mes == 12 ) {
			ano++;
			mes=1;
		}else{
			mes++;
		}

		monto =  saldo;
	}
	prestamo.totalinteres = parseFloat( totalInteres ).toFixed(2);
	
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

function HTMLTblAmortizacionPrint(){
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

function PrResumen(){


	$("#txtConceptoPrT").val( $("#cmbConceptoPr option:selected").text() );
	$("#txtCuotaPrT").val( prestamo.cuota );
	$("#txtInteresPrT").val( $("#txtInteresPr").val() );
	$("#txtTotalInteresPrT").val( prestamo.totalinteres );
	$("#txtCapitalPrT").val( prestamo.capital );
	$("#txtAportePrT").val( $("#txtAportePr").val() );
	$("#txtPlazoPr").val( prestamo.cuota );
	var suma = parseFloat( prestamo.totalinteres ) * 1 +  parseFloat( prestamo.capital ) * 1;
	$("#txtPagosPrT").val(  parseFloat( suma ).toFixed(2) );
	var administrativo =  ( parseFloat(prestamo.capital)  * 1) /100
	$("#txtPorcentajePrT").val(  parseFloat( administrativo ).toFixed(2) );
	var deposito = (parseFloat( prestamo.capital ) *1 ) - parseFloat( administrativo ) *1;
	$("#txtDepositoPrT").val(   parseFloat( deposito ).toFixed(2) );
	
	StepperPrestamo.next();
}

function PrImprimir(){
	var tabla = $("#_TblAmortizacion").html();
	$("#divCreditoTabla").html(tabla);

	var html = $("#_rptprestamos").html();
    var ventana = window.open("", "_blank");
    ventana.document.write(html);
    ventana.document.head.innerHTML = estiloCSSDocumentos;
    ventana.print();
    ventana.close();
}