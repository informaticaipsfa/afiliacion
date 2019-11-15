


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