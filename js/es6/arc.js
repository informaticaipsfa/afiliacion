




let wArc = {};
let ArcFamiliar = "";
let ArcPorcentaje = 0;
let ArcAguinaldo = 0;
let Meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];




class WARC {
    constructor(){
        this.cedula = '';
        this.anio = '';
    }
    Crear (req){
        var lista = req.rs;
        var fila = '';
        var tneto = 0.00;
        var obj = [];
        for(var i = 0; i <= 11; i++){
            var mesAux = i+1;

            if( lista[i] != undefined ) {
                var mes = parseInt(lista[i].mes);
                
                tneto += parseFloat( lista[i].mont );
                obj[Meses[mes - 1]] = {
                    "mes": mes,
                    "des": Meses[mes - 1],
                    "mon": lista[i].mont
                }           
            }
                
            

        }
        
        for(var i= 0; i <= 11; i++){
            fila += seleccionarMesArc(Meses[i], i+1, obj);
        }
        

        
        HTMLArc(fila, tneto, ArcFamiliar);
    }
}

function seleccionarMesArc(mes, pos, obj){

    var sel = {};
    if( obj[mes] == undefined){
       
       obj[mes] = {
            "mes": pos,
            "des": mes,
            "mon": 0
        }     
        sel =  obj[mes];
    }else{
        sel = obj[mes];
    }

    return lineaMes(sel.des, sel.mes, sel.mon);
}

function CConstanciaARC(pos, parentesco){
    if(pos != undefined) {
        var v = ObjMilitar.Familiar[pos-1];
        var DBF = v.Persona.DatoBasico;
        ArcPorcentaje = v.pprestaciones!=undefined?v.pprestaciones:0;
        var nombre = DBF.apellidoprimero + ' ' + DBF.apellidosegundo + ' ' + DBF.nombreprimero + ' ' + DBF.nombresegundo;
        ArcFamiliar = `<table style="width:800px" >
        <tr>
            <td align="center"><b>PARENTESCO</b><BR>${parentesco}</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CÉDULA</b><BR><label id="cedula">${DBF.cedula}</cedula></td>
            <td align="center"><b>PORCENTAJE PENSION</b><BR><label>${ArcPorcentaje} %</cedula></td>
        </tr>
        
    </table>`;
    }
    var Calc = new WARC();
    Calc.cedula = ObjMilitar.id;
    Calc.anio = "2020";

  
    
    var ruta = Conn.URL + "pensionado/impimirarc";
    CargarAPI(ruta, "POST", Calc, Calc);
}



function lineaMes( mes, pos, monto) {
   

    var n = parseFloat( monto );
    var s = numeral(n).format('0.0,');
    var r1 = s.replace('.', '#');
    var r2 = r1.replace(/,/g, '.');
    var r3 = r2.replace('#', ',');

    return `<tr>
        <td >${pos}</td>
        <td >${mes}</td>
        <td align="right">${ r3 }</td>
        <td align="right">${ r3 }</td>
        </tr>`
}

function HTMLArc(fila, neto, familiar){
    var grado = $("#cmbgrado option:selected").text();
    var nombre = $("#txtnombre").val() + " " + $("#txtapellido").val() ;
    var cedula = $("#txtcedula").val();
    var porpocentaje = "";
    if(ArcPorcentaje > 0){
        porpocentaje = `<br>PENSION DEL MILITAR : <b> &nbsp;&nbsp; ${ accounting.formatMoney(neto, "Bs. ", 2, ".", ",")}&nbsp;&nbsp;<br>
        </b> DEVENGADO POR EL SOBREVIVIENTE :<b> &nbsp;&nbsp; ${ accounting.formatMoney((neto * ArcPorcentaje)/100, "Bs. ", 2, ".", ",")}`;
    } else{
        porpocentaje = `<br>TOTAL DEVENGADO :<b> &nbsp;&nbsp; ${ accounting.formatMoney(neto, "Bs. ", 2, ".", ",") }&nbsp;&nbsp;<br>`;
    }

    var ventana = window.open("", "_blank");
    var localtime = new Date().toLocaleString();
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
            INSTITUTO DE PREVISIÓN SOCIAL DE LA <BR>FUERZA ARMADA NACIONAL BOLIVARIANA<BR>
            RIF: G20003692-3
            </center>
        </td>
        <td width="200px" valign="top"></td>
        </tr>
    </table >
        <h3>CONSTANCIA AR-C DE PENSIÓN<br>
            AÑO <b>2019</b>
        </h3>
        <br>
    <table style="width:800px" >
        <tr>
            <td align="center"><b>GRADO</b><BR>${ grado }</td>
            <td colspan="2" align="center"><b>APELLIDOS Y NOMBRES</b><BR><label id="nombre">${nombre}</label></td>
            <td align="center"><b>N° DE CÉDULA</b><BR><label id="cedula">${ cedula }</cedula></td>
        </tr>
       
    </table>
    ${familiar}
    <BR><BR>
    <div class="cuerpo">
    <table style="width:800px">
        <thead>
            <tr>
                <th style="width: 20px">#</th>
                <th align="left"> DESCRIPCION DEL MES</th>
                <th style="width: 150px" align="right">ASIGNACIONES</th>
                <th style="width: 150px" align="right">TOTAL</th>
            </tr>
        </thead>
        <tbody >
        ${fila}
        </tbody>
        <tfoot>
            <tr>
                <th align="center" colspan="4" 
                    style="font-size:16px">
                    ${porpocentaje}
                </th>
            </tr>
        </tfoot>
    </table>
    <br>
    <table border="0">
        <tr>
            <td width="15%" valign="top">
                <img src="images/selloafiliacion.png" valing="left" width="240px" style="margin-left: -50px;margin-right: -100px">
            </td>
            <td width="70%" valign="top">
                <center><h3>
                <img style="width: 250px;height: 120px;"  
                src="images/firmatesorero.png" onerror="this.src='images/ndisponible.jpg'" id="lblimgFirmaPIT"/><br>
                <label id="lblnombrePI"> TERRY MITCHELL </label><BR>
                <label id="lblgradoPIF"> MAYOR </label><br>
                TESORERO I.P.S.F.A.
                </h3><i>               
            </td>
            <td width="15%" valign="top"></td>
          </tr>
    </table>
    <br><br>
    </div>
   </div>
   <div class="footer">
            <hr>
        Av. Los Proceres, Edf. Sede del IPSFA, P.B., Gerencia de Bienestar y Seguridad Social. Santa Monica, Municipio
        Libertador del Distrito Capital, Caracas. Correo Electrónico: bienestaripsfaccs@gmail.com. telefonos +58 414-3270828, +58 412-6392184
    </div>
    </center>
    
    
    
    `);

    ventana.document.head.innerHTML = ` <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SSSIFANB</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <style type="text/css">
            body {
                margin: 0px;
                font-family: Calibri;
                
            }
            .baner {
                text-align: center;
                line-height: 22px; 
                font-size: 15px; 
            }
            p {
                text-align: justify;
                line-height: 22px; 
                font-size: 14px;
            }
            .wrapper {
                min-height: 100%;
                height: auto !important;
                height: 100%;
                margin: 0 auto -5em;
            }
            .footer, .push {
                height: 5em;
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
            
            .footer, .push {
                height: 5em;
                font-size: 12px;
            }
        }
    </style>
     `;
}

