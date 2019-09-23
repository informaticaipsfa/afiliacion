function ImprimirNeto(){
    if ( $("#cmbNetoPago option:selected").val() == "X" ) {        
        return false;
    }
    //console.log(lstNeto);
    var nombre = $("#txtnombre").val() + " " + $("#txtapellido").val();
    var cedula = $("#txtcedula").val();
    var porcentaje = $("#txtporcentaje").val();
    var pension = 0.00;
    var nomina =  $("#cmbNetoPago option:selected").text().split('|');
    var fila = '';
    var asignacion = 0.00;
    var deduccion = 0.00;
    var total = 0;
    var pos = $("#cmbNetoPago option:selected").val();
    var objNeto = [];
    var totalAsignacion = 0;
    var obj = lstNeto[pos];
    
	for(var i=0; i< obj.length; i++){
		var monto = obj[i].mont;
        var tipo = obj[i].tipo;
        var des = obj[i].desc.replace("_", " ").toUpperCase();
        var lbl =  obj[i].desc;        
        var montostr = accounting.formatMoney(monto, "Bs. ", 2, ".", ",");
        objNeto[lbl] = numeral(parseFloat(monto,2)).format('0,0.00');
        var grado = $("#cmbgrado option:selected").text();
        var amcuenta = Util.AMCuentaBancaria(ObjMilitar.Persona.DatoFinanciero[0].cuenta);
		if(tipo == 97){      
           
            totalAsignacion += monto;
            fila += `
                <tr>
                    <td align="left">&nbsp;&nbsp;${des}</td>
                    <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                    <td align="right"></td>
                    <td align="right" style="width:200px"></td>
                </tr>`;
            
		}else{
            //console.log("0000 DE " + des);
            if( des == "SUELDO MENSUAL" ){
                var tasig = accounting.formatMoney(totalAsignacion, "Bs. ", 2, ".", ",");
                fila += `
                <tr>
                    <td align="left">&nbsp;&nbsp;SUBTOTAL</td>
                    <td align="right" style="width:200px"><b>${tasig}</b>&nbsp;&nbsp;</td>
                    <td align="right"></td>
                    <td align="right" style="width:200px"></td>
                </tr>
                <tr>
                    <td align="left">&nbsp;&nbsp;</td>
                    <td align="right" style="width:200px"></td>
                    <td align="right"></td>
                    <td align="right" style="width:200px"></td>
                </tr>`;
                
            }
            if(tipo == 1){ //Asignacion   
                var sueldomensual = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des); 
                if( des == "SUELDO MENSUAL" ){
                    sueldomensual = `SUELDO MENSUAL ( ${porcentaje} % )`;                    
                } 
                fila += `
                    <tr>
                        <td align="left">&nbsp;&nbsp;${sueldomensual}</td>
                        <td align="right"></td>
                        <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                        <td align="right" style="width:200px"></td>
                    </tr>`;
                asignacion += monto;
            }else if(tipo == 33){ //Asignacion
                var retroactivos = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des); 
                fila += `
                    <tr>
                        <td align="left">&nbsp;&nbsp;${retroactivos}</td>
                        <td align="right"></td>
                        <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                        <td align="right" style="width:200px"></td>
                    </tr>`;
                asignacion += monto;
            }else{ //Deduccion
                console.log("0000 DE " + des);
                var strconceptos = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des);
                fila += `
                    <tr>
                        <td align="left">&nbsp;&nbsp;${strconceptos}</td>
                        <td align="right"></td>
                        <td align="right"></td>
                        <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                    </tr>`;
                deduccion += monto;
			}
        }
        
    }
    fila += `<tr>
                <td align="right" colspan='2'>TOTAL&nbsp;&nbsp;</td>
                <td align="right" style="width:200px">${accounting.formatMoney(asignacion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</td>
                <td align="right" style="width:200px">${accounting.formatMoney(deduccion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</td>
            </tr>`;
    var neto = asignacion - deduccion;
    var ventana = window.open("", "_blank");
    ventana.document.write(`<center>
    <div style="background: url('../images/fondo.png') no-repeat center;">
    <table style="width:800px" class="membrete">
    <tr>
        <td width="200px" valign="top"><center><img  style="width: 100px;height: 100px; margin-left: 0px" 
        class="img-responsive file-path-wrapper-pre-view" src="images/logo_ipsfa.png" id="_imgescudo"/></center>
        </td>
        <td width="400px">
            <center>
            REPÚBLICA BOLIVARIANA DE VENEZUELA <BR>
            MINISTERIO DEL PODER POPULAR PARA LA DEFENSA<BR>
            VICEMINISTERIO DE SERVICIOS, PERSONAL Y LOGÍSTICA<BR>
            DIRECCIÓN GENERAL DE EMPRESAS Y SERVICIOS<BR>
            INSTITUTO DE PREVISIÓN SOCIAL DE LA FUERZA ARMADA<BR>
            RIF: G20003692-3
            </center>
        </td>
        <td width="200px" valign="top"></td>
        </tr>
    </table >
        <h3>MILITAR TITULAR<BR>
            RECIBO DE PAGO CORRESPONDIENTE A:<br>
            ${nomina[0]}
        </h3>
        <br>
    <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center"><b>GRADO</b><BR>${grado}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CEDULA</b><BR><label id="cedula">${cedula}</cedula></td>
        </tr>
        <tr>
            <td align="center"><b>CUENTA BANCARIA</b><BR>${amcuenta}</td>
            <td align="left" colspan="4"></td>
        </tr>
    </table>
    <BR><BR>
    <table style="width:800px" class="tablaneto">
        <thead>
            <tr>
                <th align="center" style="width:440px">CONCEPTO</th>
                <th align="center" style="width:120px">CALCULOS</th>
                <th align="center" style="width:120px">ASIGNACIONES</th>
                <th align="center" style="width:120px">DEDUCCIONES</th>
            </tr>
        </thead>
        <tbody id="ltsConceptos">
        ${fila}
        </tbody>
        <tfoot>
            <tr>
                <th align="center" colspan="4" 
                style="font-size:19px">
                <br>NETO A COBRAR <br><b> &nbsp;&nbsp; ${accounting.formatMoney(neto, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</b></th>
            </tr>
        </tfoot>
    </table>
    <br>
    <h3> IPSFA EN CONTACTO
    <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center" style="width:800px;height: 80px"></td>                        
        </tr>
    </table>
    <br><br>
    <table>
        <tr>
            <td align="justify" style="width:800px;height: 80px">
                Direccón: Avenida Los Próceres Edif. Sede del IPSFA. Gerencia de Afiliación Planta Baja. 
                Santa Mónica, municipio Libertador. Caracas, Distrito Capital. Teléfonos: (0212) - 609-23-10 / 609-23-11 /609-23-12 
            </td>                        
        </tr>
            
    </table></div>
    </center>`);

    ventana.document.head.innerHTML = ` <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SSSIFANB</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <style type="text/css">
        body{
            font-family: Arial, Calibre;
            font-size: 12px;
        }
        table{
            border-collapse: collapse;
            font-family: Arial, Calibre;
            font-size: 12px;
        }
        .tablaneto {
            border-collapse: collapse;
        } 
        .tablaneto tr{
            border: 1px solid #CCCCCC;
        } 
        .tablaneto td {
            border: 1px solid #CCCCCC;
        } 
        .tablaneto th {
            border: 1px solid #CCCCCC;
        } 
        @media print {
            div {
                background-position: 180px;
                background: url('../images/fondo.png') no-repeat center;
            }
        }
    </style>
     `;

}


let wLtsConceptos = [];
class WObtenerConceptos{
    constructor(){}
    Crear(req){
        wLtsConceptos = req;
    }
}

function ObtenerConceptosW(){ 
    var Obj = new WObtenerConceptos();
    var url = Conn.URL + "nomina/conceptos/listar/";    
    CargarAPI(url, "GET", Obj, Obj);
    
}


/**
 * Sobrevivientes
 */
       
function ImprimirNetoSobreviviente(){
    

    if ( $("#cmbNetoPago option:selected").val() == "X" ) {        
        return false;
    }
    var nombre = $("#txtnombre").val() + " " + $("#txtapellido").val();
    var cedula = $("#txtcedula").val();
    var porcentaje = $("#txtporcentaje").val();
    var grado = $("#cmbgrado option:selected").text();
    var pension = 0.00;
    var nomina =  $("#cmbNetoPagoSobre option:selected").text().split('|');
    var fila = '';
    var asignacion = 0.00;
    var deduccion = 0.00;
    var total = 0;
    var pos = $("#cmbNetoPagoSobre option:selected").val();
    var objNeto = [];
    var totalAsignacion = 0;
    var obj = lstFamiliarNetos[pos].primas;

    
	for(var i=0; i< obj.length; i++){
		var monto = obj[i].mont;
        var tipo = obj[i].tipo;
        var des = obj[i].desc.replace("_", " ").toUpperCase();
        var lbl =  obj[i].desc;        
        var montostr = accounting.formatMoney(monto, "Bs. ", 2, ".", ",");
        objNeto[lbl] = numeral(parseFloat(monto,2)).format('0,0.00');
		if(tipo == 97){           
            totalAsignacion += monto;
            fila += `
                <tr>
                    <td align="left">&nbsp;&nbsp;${des}</td>
                    <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                    <td align="right"></td>
                    <td align="right" style="width:200px"></td>
                </tr>`;            
		}else{
            if( des == "SUELDO MENSUAL" ){
          
            }
            if(tipo == 1){ //Asignacion   
           
			}else{ //Deduccion
          
			}
        }
        
    } // fin del repetir de las primas
    var sueldotitular = ( totalAsignacion * porcentaje) / 100;
    if (sueldotitular > 0 ){
        var sueldomensual = `SUELDO MENSUAL A DISTRIBUIR ( ${porcentaje} % )`; 
        var stracount = accounting.formatMoney(sueldotitular, "Bs. ", 2, ".", ",");
        fila += `
                <tr>
                    <td align="left">&nbsp;&nbsp;${sueldomensual}</td>
                    <td align="right" style="width:200px"><b>${stracount}</b>&nbsp;&nbsp;</td>
                    <td align="right"></td>
                    <td align="right" style="width:200px"></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>`;
    }

    obj = lstFamiliarNetos[pos].conceptos;
    
    var imprimir = false;
    var contador = 0;
    for(var i=0; i< obj.length; i++){
        
		var monto = obj[i].mont;
        var tipo = obj[i].tipo;
        var des = obj[i].desc.replace("_", " ").toUpperCase();
        var lbl =  obj[i].desc;        
        var montostr = accounting.formatMoney(monto, "Bs. ", 2, ".", ",");
        objNeto[lbl] = numeral(parseFloat(monto,2)).format('0,0.00');

        if(lstFamiliarNetos[pos].asignaciones == monto){
            imprimir = true;
        }
		if( contador < 2 &&  imprimir == true ) {            
           
            if(tipo == 1 || tipo == 97 ){ //Asignacion   
                var sueldomensual = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des); 
                if( des == "PENSION SOBREVIVIENTE" ){
                    sueldomensual = `PENSION SOBREVIVIENTE ( ${ lstFamiliarNetos[pos].porcentaje } % )`;                    
                } 
                contador++;
                fila += `
                    <tr>
                        <td align="left">&nbsp;&nbsp;${sueldomensual}</td>
                        <td align="right"></td>
                        <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                        <td align="right" style="width:200px"></td>
                    </tr>`;
                asignacion += monto;
            }else if(tipo == 2) { //Asignacion Retroactivos

               
                fila += `
                    <tr>
                        <td align="left">&nbsp;&nbsp;${obtenerDescripcionConceptos(des)}</td>
                        <td align="right"></td>
                        <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                        <td align="right" style="width:200px"></td>
                    </tr>`;
                asignacion += monto;
            }else{ //Deduccion
                console.log("Deducciones");
                var strconc = obtenerDescripcionConceptos(des)==""?des:obtenerDescripcionConceptos(des); 
                fila += `
                <tr>
                    <td align="left">&nbsp;&nbsp;${strconc}</td>
                    <td align="right"></td>
                    <td align="right"></td>
                    <td align="right" style="width:200px">${montostr}&nbsp;&nbsp;</td>
                </tr>`;
            deduccion += monto;
            }
        }
        
    }


    fila += `<tr>
                <td align="right" colspan='2'>TOTAL&nbsp;&nbsp;</td>
                <td align="right" style="width:200px">${accounting.formatMoney(asignacion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</td>
                <td align="right" style="width:200px">${accounting.formatMoney(deduccion, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;</td>
            </tr>`;
    
    var neto = asignacion - deduccion;
    var strneto = accounting.formatMoney(neto, "Bs. ", 2, ".", ",");

    var ventana = window.open("", "_blank");
    ventana.document.write(`<center>
    <div style="background: url('../images/fondo.png') no-repeat center;">
    <table style="width:800px" class="membrete">
    <tr>
        <td width="200px" valign="top"><center><img  style="width: 100px;height: 100px; margin-left: 0px" 
        class="img-responsive file-path-wrapper-pre-view" src="images/logo_ipsfa.png" id="_imgescudo"/></center>
        </td>
        <td width="400px">
            <center>
            REPÚBLICA BOLIVARIANA DE VENEZUELA <BR>
            MINISTERIO DEL PODER POPULAR PARA LA DEFENSA<BR>
            VICEMINISTERIO DE SERVICIOS, PERSONAL Y LOGÍSTICA<BR>
            DIRECCIÓN GENERAL DE EMPRESAS Y SERVICIOS<BR>
            INSTITUTO DE PREVISIÓN SOCIAL DE LA FUERZA ARMADA<BR>
            RIF: G20003692-3
            </center>
        </td>
        <td width="200px" valign="top"></td>
        </tr>
    </table >
        <h3>SOBREVIVIENTE<BR>
            RECIBO DE PAGO CORRESPONDIENTE A:<br>
            ${nomina[0]}
        </h3>
        <br>
    <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center"><b>PARENTESCO</b><BR>${seleccionFamiliar.parentesco}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${seleccionFamiliar.nombre}</label></td>
            <td align="center"><b>N° DE CEDULA</b><BR><label id="cedula">${seleccionFamiliar.cedula}</cedula></td>
        </tr>
        <tr>
            <td align="center" colspan="4" style="font-size:16px; padding:5px">CAUSANTE DE LA PENSION</td>
        </tr>
        <tr>
            <td align="center"><b>GRADO</b><BR>${grado}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CEDULA</b><BR><label id="cedula">${cedula}</cedula></td>
        </tr>
     
    </table>
    <BR><BR>
    <table style="width:800px" class="tablaneto">
        <thead>
            <tr>
                <th align="center" style="width:440px">CONCEPTO</th>
                <th align="center" style="width:120px">CALCULOS</th>
                <th align="left" style="width:120px">ASIGNACIONES</th>
                <th align="center" style="width:120px">DEDUCCIONES</th>
            </tr>
        </thead>
        <tbody id="ltsConceptos">
        ${fila}
        </tbody>
        <tfoot>
            <tr>
                <th align="center" colspan="4" style="font-size:18px;padding:5px">
                NETO A COBRAR <br><b>${strneto}<br></th>
            </tr>
        </tfoot>
    </table>
    <br>
    <h3> IPSFA EN CONTACTO
    <table style="width:800px" class="tablaneto">
        <tr>
            <td align="center" style="width:800px;height: 80px"></td>                        
        </tr>
    </table>
    <br><br>
    <table>
        <tr>
            <td align="justify" style="width:800px;height: 80px">
                Direccón: Avenida Los Próceres Edif. Sede del IPSFA. Gerencia de Afiliación Planta Baja. 
                Santa Mónica, municipio Libertador. Caracas, Distrito Capital. Teléfonos: (0212) - 609-23-10 / 609-23-11 /609-23-12 
            </td>                        
        </tr>
            
    </table></div>
    </center>`);

    ventana.document.head.innerHTML = ` <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SSSIFANB</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <style type="text/css">
        body{
            font-family: Arial, Calibre;
            font-size: 12px;
        }
        table{
            border-collapse: collapse;
            font-family: Arial, Calibre;
            font-size: 12px;
        }
        .tablaneto {
            border-collapse: collapse;
        } 
        .tablaneto tr{
            border: 1px solid #CCCCCC;
        } 
        .tablaneto td {
            border: 1px solid #CCCCCC;
        } 
        .tablaneto th {
            border: 1px solid #CCCCCC;
        } 
        @media print {
            div {
                background-position: 180px;
                background: url('../images/fondo.png') no-repeat center;
            }
        }
    </style>
     `;

    

}


function obtenerDescripcionConceptos(id){
    var concepto = "";
    
    for (let i = 0; i < wLtsConceptos.length; i++) {
        var e = wLtsConceptos[i];
        //console.log(e);

        if( e.codigo == id ){
            concepto = e.descripcion;
            return concepto;
        }
    }
    return concepto;
}
