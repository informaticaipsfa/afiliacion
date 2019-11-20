let opcionesCredito = {
    ordering: false,
    paging: false,            
    scrollY:        200,
    deferRender:    true,
	scroller:       true,   
    searching: 		false,
};

class Credito{
	constructor(){
		this.cuota = 0;
		this.periodo = 0;
		this.monto = 0.0;
		this.sueldo = 0.0;
	}
	Crear(req){

	}
}


function IniciarCredito(estatus){
    StepperCredito = new Stepper(document.querySelector('#stepper-credito'));
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
	$('#mdlCreditos').modal('show');
}


function CargarCredito( str ){
	StepperCredito.next();
}

function CalcularCredito(){
	var monto = parseFloat( $("#txtMontoCr").val() ) * 1; //  solicitamos la cantidad prestada, el plazo y el tipo de interes
	var interes = parseFloat( $("#txtInteresCr").val() ) / (100 * 12);//  multiplicamos por 100, para disolver el %, y por 12, para tener valor mensual
	var periodo = parseFloat( $("#cmbCuotasCr").val() ) * 1 * 12;// multiplicamos por 12 para devolver valor mensual
	
	var potencia = 1 + interes;
	var xxx = Math.pow(potencia, -periodo);//  funcion matematica donde la base es la potencia y el exponente el tiempo
	
	var xxx1 = monto * interes;
	var equivalencia = xxx1 / (1 - xxx);

	equivalencia = parseFloat(equivalencia); //  limitamos el número de decimales a cero
	return equivalencia;
}

function TablaAmortizacion(){
	$("#_TblAmortizacion").html(HTMLTblAmortizacion());        
	var t = $('#tblCredito').DataTable(opcionesCredito);
	t.clear().draw();
	var monto = parseFloat( $("#txtMontoCr").val() ) * 1;
	var cuota = CalcularCredito();
	var periodo = parseInt( $("#cmbCuotasCr").val() ) * 1 * 12;
	var interes = parseFloat( $("#txtInteresCr").val() ) / (100 * 12);
	for (var i = 0; i < periodo; i++) {
		
		var ainteres = monto * interes;
		var capital = cuota - ainteres;
		var saldo = monto - capital;
		t.row.add([
			i + 1, //#
			parseFloat( monto ).toFixed(2), //Balance
			parseFloat( cuota ).toFixed(2), //Cuota
			parseFloat( ainteres ).toFixed(2), //Interes
			parseFloat( capital ).toFixed(2), //Capital
			parseFloat( saldo ).toFixed(2), //Saldo
			'' 
		]).draw(false);

		monto =  saldo;
	}
	StepperCredito.next();
}


function HTMLTblAmortizacion(){
	return `
	<table id="tblCredito" class="ui celled table table-bordered table-striped dataTable" >
		<thead>
			<tr role="row">
				<th>#</th>
				<th>BALANCE</th>
				<th>CUOTA</th>
				<th>INTERES</th>                                            
				<th>CAPITAL</th>                   
				<th>SALDO</th>
				<th>FECHA</th>
			</tr>
		</thead>
	</table>`;
}