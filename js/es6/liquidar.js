
class WListarLQ{
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
		
		$("#_tblLstLiquidarAux").html(ListaLiquidarHTMLZAux());
		$("#_tblLstLiquidar").html(ListaLiquidarHTMLZ());
		var t = $('#tblCreditoZ').DataTable();
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


        $('#_tblLstLiquidar tbody').on('dblclick', 'tr', function () {
            var data = t.row(this).data();
            console.log(data);
            $("#txtcedulaCredito").val(data[5]);
            $("#txtObservacion").val(`PARA: ${data[6]} \nCREDITO: ${data[8]}  \nMONTO: ${data[12]}  Bs. \nCONCEPTO: ${data[7]} `);
            $("#txtoidCredito").val(data[13]);
            
            $("#mdlLiquidarC").modal("show");
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



function ListarNominasLiquidar(){
	var wListarLQ = new WListarLQ();
	wListarLQ.fecha = $("#date_range").val();
	var fech = wListarLQ.fecha.split("AL");
	wListarLQ.desde = fech[0].trim();
	wListarLQ.hasta = fech[1].trim();
	wListarLQ.estatus =  parseInt($("#cmbEstatus").val());
	//console.log( wListarLQ.Obtener() );


	CargarAPI(Conn.URL + "credito/listar" , "POST", wListarLQ.Obtener(), wListarLQ);

}




function ListaLiquidarHTMLZ(){
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

function ListaLiquidarHTMLZAux(){
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




class ALiquidarCredito{
	constructor(){
        this.observacion = '';
        this.cedula = '';
        this.credito = '';
        this.fecha = '';
        this.numero = '';
        this.banco = '';
    }
	Crear(req){


        alertNotifyCredito(' Registrado #: ' + req.msj, 'success');
        
        $("#txtcedulaCredito").val('');
        $("#txtoidCredito").val('');
        $("#txtObservacion").val('');
        $("#txtfechadep").val('');
        $("#txtnumerodep").val(''); 
        $("#cmbminstfinanciera").val('S');
        $("#mdlLiquidarC").modal("hide");
        ListarNominasLiquidar();
	}
}


function AgregarLiquidarCredito(){
    var alc = new ALiquidarCredito();
    alc.cedula = $("#txtcedulaCredito").val();
    alc.credito = $("#txtoidCredito").val();
    alc.observacion = $("#txtObservacion").val();
    alc.fecha = $("#txtfechadep").val();
    alc.numero = $("#txtnumerodep").val(); 
    alc.banco = $("#cmbminstfinanciera option:selected").val();

	CargarAPI(Conn.URL + "credito/liquidar" , "POST", alc, alc);
}
