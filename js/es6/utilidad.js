let MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

let MapACrecer = [
    {"nombre": "TodosVivos", "regla" : ['EA', 'PD' , 'HJ']},
    {"nombre":"SinEsposa", "regla" : ['PD', 'HJ']},
    {"nombre":"SinPadres", "regla" : ['EA', 'HJ']},
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

    ConvertirFechaActualConstancia() {
        var meses = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
        var f = new Date();

        return " mes de " + meses[f.getMonth()] + " de " + f.getFullYear();
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
                   
                    respuesta = true;
                    return respuesta;
                }
            }
        });

        return respuesta;
    }

    //
    AMCuentaBancaria(cadena){
        var max = cadena.length;
        var derecha = cadena.substring(0, 4);
        var izquierda = cadena.substring(19);
        return derecha + '****************' + izquierda;
    }

    //
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

    /**
     * 
     * @param {date} fechainicio  AAAA/MM/DD
     * @param {date} fechafin AAAA/MM/DD
     */
    CompararFechasMayorQue(fechainicio, fechafin){
        var f = fechainicio.split("/");
        var f1 = new Date(f[2], f[1], f[0]); //31 de diciembre de 2015
        f = fechafin.split("/");
        var f2 = new Date(f[2], f[1], f[0]); //30 de noviembre de 2014
        
        if ( f1 > f2 ){
            console.log("Err Clasic");
            $("#txtmfecharesuelto").val("");
        }
    
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
            language: 'es'
            //,
            //endDate: "+0d"
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
                    t.cell(fila,16).data(60.00).draw();
                }
            }       
            //HIJOS 20%
            var porcentaje = 20 / ContarParentesco(MAP, "HJ");
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "HJ" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(porcentaje.toFixed(2)).draw();
                }
            }         
            //PADRE 20%
            var porc = 20 / ContarParentesco(MAP, "PD");
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "PD" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(porc.toFixed(2)).draw();
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
                     t.cell(fila,16).data(porcentaje.toFixed(2)).draw();
                 }
             }         
             //PADRE 25%
             var porc = 25 / ContarParentesco(MAP, "PD");
             
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "PD" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc.toFixed(2)).draw();
                 }
             }         
            break;
        case "SinHijos":
            //ESPOSA Y PADRES
            //ESPOSA 50%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(50.00).draw();
                }
            }       
             //PADRE 50%
             var porc = 50 / ContarParentesco(MAP, "PD");
             console.log(porc);
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "PD" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc.toFixed(2)).draw();
                 }
             }         
            break;
        case "SinPadres":
             //ESPOSA Y PADRES
            //ESPOSA 60%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(60.00).draw();
                }
            }
            //HIJOS 40%
            var porcentaje = 40 / ContarParentesco(MAP, "HJ");
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "HJ" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(porcentaje.toFixed(2)).draw();
                }
            }
             
        case "SinPadre":
             //ESPOSA E HIJO
            //ESPOSA 60%            
            for(var i=0; i < MAP.length; i++){
                if ( MAP[i][0] == "EA" ){
                    var fila = MAP[i][1];
                    t.cell(fila,16).data(60.00).draw();
                }
            }       
             //HIJOS 20%
             var porc = 20 / ContarParentesco(MAP, "HJ");
             for(var i=0; i < MAP.length; i++){
                 if ( MAP[i][0] == "HJ" ){
                     var fila = MAP[i][1];
                     t.cell(fila,16).data(porc.toFixed(2)).draw();
                 }
             }
             $("#divPensionSobreviviente").html(`<div class="callout callout-danger" style="padding:8.3px; margin:0px;">
                    <p style="text-align: left"><b>Pensión del grupo familiar 80%</b></p>
                </div>`); 
            break;
        case "SinPadreEHjos":
            //SOLO ESPOSA
            t.cell( MAP[0][1],16).data(100.00).draw();
            break;
        case "SinEsposaEHijos":
            //SOLO PADRES
            var porcentaje = 100 / MAP.length;            
            for(var i=0; i < MAP.length; i++){
                var fila = MAP[i][1];
                t.cell(fila,16).data(porcentaje.toFixed(2)).draw();
            }            
            break;
        case "SinPadreYEsposa":
            //SOLO HIJOS
            var porcentaje = 100 / MAP.length;            
            for(var i=0; i < MAP.length; i++){
                var fila = MAP[i][1];
                t.cell(fila,16).data(porcentaje.toFixed(2)).draw();
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
        case 26:
            v = 99;
            break; 
        case 27:
            v = 99;
            break; 
        case 28:
            v = 99;
            break; 
        case 29:
            v = 99;
            break;        
        default:
            if (t >= 30) v = 100;
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



