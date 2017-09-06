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
        f = f.split("/");
        return f[2] + "-" + f[1] + "-" + f[0];
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
                    $(this).notify("*");
                    $("#"+ele).notify("Recuerde de ingresar todos los campos requeridos");
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

}
