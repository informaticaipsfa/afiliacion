let MapACrecer = [
    {"nombre": "TodosVivos", "regla" : ['EA', 'PD' , 'HJ']},
    {"nombre":"SinEsposa", "regla" : ['PD', 'HJ']},
    {"nombre":"SinHijos", "regla" : ['EA', 'PD']},
    {"nombre":"SinPadre", "regla" : ["HJ", "EA"]},
    {"nombre":"SinPadreEHjos", "regla" : ["EA"]},
    {"nombre":"SinEsposaEHijos", "regla" : ["PD"]},
    {"nombre":"SinPadreYEsposa", "regla" : ["HJ"]}
];

class Utilidad {
    constructor() {

    }

    Especiales(e,elemento) {
        var key = e.keyCode || e.which;
        var tecla = String.fromCharCode(key).toLowerCase();
        var letras = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789*";
        var especiales = [8, 37, 39, 46, 9, 17];

        var tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
            $.notify("("+tecla+") Caracter no permitido", "warning");
            return false;
        }
        // var cond1 = 0;var cond2=0;
        // if($("#claveN").val().length < 8){
        //     $("#lblalert1").show();
        // }else{
        //     $("#lblalert1").hide();
        //     cond1 = 1;
        // }
        //
        // if($("#claveN").val() != $("#claveN2").val()){
        //     $("#lblalert2").show();
        // }else{
        //     if($("#claveN").val() != ""){
        //         $("#lblalert2").hide();
        //         cond2 = 1;
        //     }
        //
        // }
        //
        // if(cond1 == 1 && cond2 == 1){
        //     $("#btnmodclave").attr("disabled",false);
        // }else{
        //     $("#btnmodclave").attr("disabled",true);
        // }
    }

    cmbField(obj,foco){
        var id = obj.id;
        if(foco){
            $("#"+id).attr("type","text");
            $("#"+id).val("");
        }else{
            $("#"+id).attr("type","password");
        }

    }

    SoloNumero(event,elemento) {
        var contenidocaja = $("#"+elemento.id).val();


        var key = event.keyCode || event.which;
        var tecla = String.fromCharCode(key).toLowerCase();
        var numeros = "0123456789";
        var especiales = [8, 37, 39, 46, 13, 9];

        if(key == 46){
            if(contenidocaja.indexOf(".") != -1 || contenidocaja == ""){
                return false;
            }
        }

        var tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (numeros.indexOf(tecla) == -1 && !tecla_especial) {
            return false;
        }
    }

    //Recibe  Fecha Formato: AAAA-MM-DD 00:00:00
    //Retorna Fecha Formato: DD/MM/AAAA
    ConvertirFechaHumana(f) {
        var ISODate = new Date(f).toISOString();
        var fe = ISODate.substr(0, 10);
        var fa = fe.split("-");
        if (fa[0] != "0001") {
            return fa[2] + "/" + fa[1] + "/" + fa[0];
        } else {
            return "";
        }
        //return fa[2] + "/" + fa[1] + "/" + fa[0];
    }

    ConvertirFechaActual() {
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var f = new Date();

        return f.getDate() + " del mes de " + meses[f.getMonth()] + " de " + f.getFullYear();
    }


    //Recibe  Fecha Formato: DD/MM/AAAA
    //Retorna Fecha Formato: AAAA-MM-DD
    ConvertirFechaUnix(f) {
        if (f == ""){
          return "0001-01-01T00:00:00Z";
        }else{
          f = f.split("/");
          return f[2] + "-" + f[1] + "-" + f[0];
        }
    }


    ValidarFormulario(_frm) {

        let respuesta = true;
        $("#" + _frm + " :input").each(function (i) {
            var valor = $(this).val();
            var dis = $(this).attr('required');
            var id = $(this).attr('id');
            
            if (dis == "required") {
                if (valor == "") {
                   
                    respuesta = false;
                    return respuesta;
                }
            }
        });

        return respuesta;
    }

    MensajeFormulario(_frm,ele) {

        $("#" + _frm + " :input").each(function (i) {
            var valor = $(this).val();
            var dis = $(this).attr('required');
            var id = $(this).attr('id');

            if (dis == "required") {
                if (valor == "") {
                    //$(this).notify();
                    $.notify("Recuerde de ingresar todos los campos requeridos");
                }
            }
        });

    }

    ModalValidar(msj) {
        $("#_contenido").html(msj);
        var botones = '<button type="button" class="btn btn-success btn-md" data-dismiss="modal">Aceptar</button>';
        $("#_botonesmsj").html(botones);
        $("#modMsj").modal("show");
    }

    ModalValidarFamiliar(msj) {
        $("#_contenido").html(msj);
        var botones = '<button type="button" class="btn btn-success btn-md" data-dismiss="modal" onclik="ActivarModalFamiliar()">Aceptar</button>';
        $("#_botonesmsj").html(botones);
        $("#modMsj").modal("show");
    }

    ModalValidarFamiliarLimitado(msj) {

        $("#_contenido").html('');
        var botones = '<button type="button" class="btn btn-success btn-md" data-dismiss="modal" onclik="ContinuarFamiliarValidar()">Aceptar</button>';
        $("#_botonesmsj").html(botones);
        $("#modMsj").modal("show");
    }

    //
    CalcularEdad(fecha) {
        var FechaActual = new Date(Date.now());
        var AnnoA = parseInt(FechaActual.getFullYear());
        var MesA = parseInt(FechaActual.getMonth()) + 1;
        var DiaA = parseInt(FechaActual.getDate());

        var f = fecha.split("/");

        var AnoN = parseInt(f[2]);
        var MesN = parseInt(f[1]);
        var DiaM = parseInt(f[0]);

        var Ano = AnnoA - AnoN;

        var Mes = MesA - MesN;
        var Dia = DiaA - DiaM;
        if (Dia < 0) {
            Dia = 0;
            Mes++;
        }
        if (Mes <= 0) {
            Ano--;
        } else {
            Ano;
        }

        return Ano;
    }

    CalcularTServicio(fecha,fecharet, sit) {
        var FechaActual = new Date(Date.now());

        var ISODate = new Date(fecha).toISOString();
        var fe = ISODate.substr(0, 10);

        var AnnoA = parseInt(FechaActual.getFullYear());
        var MesA = parseInt(FechaActual.getMonth()) + 1;
        var DiaA = parseInt(FechaActual.getDate());

        if(sit!= "ACTIVO"){
             ISODate = new Date(fecharet).toISOString();
             var fr = ISODate.substr(0, 10);
             var fret = fr.split("-");
             AnnoA = parseInt(fret[0]);
             MesA = parseInt(fret[1]) ;
             DiaA = parseInt(fret[2]);
        }

        var f = fe.split("-");

        var AnoN = parseInt(f[0]);
        var MesN = parseInt(f[1]);
        var DiaM = parseInt(f[2]);

        var Ano = AnnoA - AnoN;

        var Mes = MesA - MesN;
        var Dia = DiaA - DiaM;
        if (Dia < 0) {
            Dia = 30 + Dia;
            Mes--;
        }
        if (Mes <= 0) {
            Mes = 12 + Mes;
            Ano--;
        } else {
            Ano;
        }

        return Ano + " Años " + Mes + " Meses " + Dia + " Dias";
    }


    ConvertirParentesco(cad,sexo){
        var parent = "";
        switch(cad) {
            case "PD":
                parent =(sexo=="F")?"MADRE":"PADRE";
                break;
            case "HJ":
                parent = (sexo=="F")?"HIJA":"HIJO";
                break;
            case "EA":
                parent = (sexo=="F")?"ESPOSA":"ESPOSO";
                break;
            case "VI":
              parent = (sexo=="F")?"VIUDA":"VIUDO";
              break;
            case "HO":
              parent = (sexo=="F")?"HERMANA":"HERMANO";
              break;
            default:
                parent = "";
                break;
        }
        return parent;
    }


    //Obtener la direccion mac
    ObtenerMAC(MAC) {
        //en construccion
    }

    //Obtener la direccion ip
    ObtenerIP(IP) {
        //en construccion
    }

    //Cargar imagenes desde archivos
    CargarIMG(DIV, URL) {

    }
    
    ValidarFecha(ID){
        $('#' + ID).datepicker({
            autoclose: true,
            format: "dd/mm/yyyy",
            language: 'es',
            endDate: "+0d"
        });
    }

    AsignarPorcentajePension(ingreso, tiempo){
        if(ingreso < 2010){
            return CasoMenor2010(tiempo);
        }else{
            return ReglaPorcentajeMayor2010(tiempo);
        }
    }

    VerificarDerechoACrecer(familiar){
        var t = $('#tblFamiliares').DataTable();
        t.column(16).visible(true);
        var valor = false;
        var fila = 0;
        familiar.forEach(v => {
            if ( v.pprestaciones > 0) {
                valor =  true;
                t.cell(fila,16).data(v.pprestaciones).draw();
            }
            fila++;
        });
        return valor;
    }

    ValidarDerechoACrecer(familiar){              
        var MAP = [];
        var REGLA = [];
        var FILA = 0;
        familiar.forEach(v => {            
            if ( v.beneficio == true ) {
                var fam = [ v.parentesco, FILA ];            
                var existe = REGLA.find(function(element) {
                    return element === v.parentesco;
                });
                if (existe == undefined) REGLA.push(v.parentesco);
                MAP.push(fam);
           }
           FILA++;
        });
        
        MapACrecer.forEach( x => {
            var valor = false;
            var repetir = 0;
            for (var i = 0; i < x.regla.length; i++) {                
                for(var j = 0; j < REGLA.length; j++){       
                    if ( x.regla[i] == REGLA[j] ) {
                        repetir++;
                        valor = true;
                     }else{
                        valor = false;
                     } 
                }                
            }

            if (repetir == REGLA.length && repetir == x.regla.length){
                AplicarReglaAcrecer( MAP, x.nombre);               
            }            
        });
        return MAP;   
    }
}


function AplicarReglaAcrecer(MAP, regla){
    var t = $('#tblFamiliares').DataTable();
    t.column(16).visible(true);
    $("#divPensionSobreviviente").html(`<div class="callout callout-success" style="padding:8.3px; margin:0px;">
        <p style="text-align: left"><b>Pensión del grupo familiar 100%</b></p>
    </div>`);
    switch (regla) {
        case "TodosVivos":
            //ESPOSA 60%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(60).draw();
                }
            }       
            //HIJOS 20%
            var porcentaje = 20 / ContarParentesco(MAP, "HJ");
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "HJ" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(porcentaje).draw();
                }
            }         
            //PADRE 20%
            var porc = 20 / ContarParentesco(MAP, "PD");
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "PD" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(porc).draw();
                }
            }         
            break;
        case "SinEsposa":
            //PADRES E HIJOS
             //HIJOS 75%
             var porcentaje = 75 / ContarParentesco(MAP, "HJ");
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "HJ" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porcentaje).draw();
                 }
             }         
             //PADRE 25%
             var porc = 25 / ContarParentesco(MAP, "PD");
             console.log(porc);
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "PD" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc).draw();
                 }
             }         
            break;
        case "SinHijos":
            //ESPOSA Y PADRES
            //ESPOSA 50%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(50).draw();
                }
            }       
             //PADRE 50%
             var porc = 50 / ContarParentesco(MAP, "PD");
             console.log(porc);
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "PD" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc).draw();
                 }
             }         
            break;
        case "SinPadre":
             //ESPOSA E HIJO
            //ESPOSA 60%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(60).draw();
                }
            }       
             //HIJOS 20%
             var porc = 20 / ContarParentesco(MAP, "HJ");
             console.log(porc);
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "HJ" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc).draw();
                 }
             }
             $("#divPensionSobreviviente").html(`<div class="callout callout-danger" style="padding:8.3px; margin:0px;">
                    <p style="text-align: left"><b>Pensión del grupo familiar 80%</b></p>
                </div>`); 
            break;
        case "SinPadreEHjos":
            //SOLO ESPOSA
            t.cell( MAP[0][1],16).data(100).draw();
            break;
        case "SinEsposaEHijos":
            //SOLO PADRES
            var porcentaje = 100 / MAP.length;            
            for(var i=0; i < MAP.length; i++){
                var fila = MAP[i][1];
                t.cell(fila,16).data(porcentaje).draw();
            }            
            break;
        case "SinPadreYEsposa":
            //SOLO HIJOS
            var porcentaje = 100 / MAP.length;            
            for(var i=0; i < MAP.length; i++){
                var fila = MAP[i][1];
                t.cell(fila,16).data(porcentaje).draw();
            }  
            break;
        default:
            break;
    }
    
}

function ContarParentesco(MAP, parentesco){
    var contar = 0;
    for(var i=0; i< MAP.length; i++){
        if ( MAP[i][0] == parentesco ) {
            contar++;
        }
    }
    return contar;
}


function CasoMenor2010(t){
    var v = 0;
    switch (t) {
        case 15:
            v = 60;
            break;
        case 16:
            v = 63;
            break;
        case 17:
            v = 66;
            break;
        case 18:
            v = 69;
            break;
        case 19:
            v = 72;
            break;
        case 20:
            v = 75;
            break;
        case 21:
            v = 80;
            break;
        case 22:
            v = 84;
            break;
        case 23:
            v = 88;
            break;
        case 24:
            v = 92;
            break;
        case 25:
            v = 99;
            break;        
        default:
            if (t > 25) v = 100;
            break;
    }

    return v;
}

function ReglaPorcentajeMayor2010(tiempo){
    var v = 0;
    
    switch (tiempo) {
        case 15:
            v = 50;
            break;
        case 16:
            v = 52;
            break;
        case 17:
            v = 54;
            break;
        case 18:
            v = 56;
            break;
        case 19:
            v = 59;
            break;
        case 20:
            v = 62;
            break;
        case 21:
            v = 65;
            break;
        case 22:
            v = 68;
            break;
        case 23:
            v = 72;
            break;
        case 24:
            v = 76;
            break;
        case 25:
            v = 80;
            break;
        case 26:
            v = 84;
            break;
        case 27:
            v = 89;
            break;
        case 28:
            v = 94;
            break;
        case 29:
            v = 99;
            break;
        case 30:
            v = 100;
            break;
        default:
            if (tiempo >30) v = 100;
            
            break;
    }
    return v;

}