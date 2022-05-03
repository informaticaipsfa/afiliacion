


class WListarPendientesSISA {
    constructor() { }
    Crear(req) {
        $("#_tblNomina").html(ResumenHTML());
        var tM = $('#tblNomina').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': false,
            'autoWidth': false
        });
        tM.clear().draw();
        /**<button type="button" onclick = "verPartida('${e.oid}');" class="btn btn-primary btn-flat"
                    data-toggle="tooltip" data-placement="top" title="Resumén Presupuestario"><i class="fa fa-book"></i></button> */

        req.forEach(e => {
            if (e.obse == 'NOMINA MENSUAL' && e.tipo == 'RCP') {
                var firma = ` <div class="btn-group">
                    <button type="button" onclick = "downloadP('${e.url}tmp/${e.nomb}.csv');" class="btn btn-success btn-flat
                    data-toggle="tooltip" data-placement="top" title="Descargar CSV "><i class="fa fa-download"></i></button>
                </div>`;

                tM.row.add([
                    firma,
                    e.obse,
                    e.desd.substr(0, 10),
                    e.hast.substr(0, 10),
                    e.tipo,
                    e.cant,
                    numeral(parseFloat(e.asig, 2)).format('0,0.00'),
                    numeral(parseFloat(e.dedu)).format('0,0.00'),
                    numeral(parseFloat(e.mont)).format('0,0.00'),
                    e.oid
                ]).draw(false);

            }



        });
        tM.column(9).visible(false);
    }

}




function ListarNominasGeneralSISA() {
    var lst = new WListarPendientesSISA();
    var ano = $("#cmbLectivo").val();
    var ruta = Conn.URL + "nomina/listarpendientes/" + $("#cmbSolicitud").val() + "/4/" + ano;
    CargarAPI(ruta, "GET", lst, lst);
}


function ViewInputFileSISA() {
    $("#input-folder-2").fileinput({
        browseLabel: 'Seleccionar Archivos',
        previewFileIcon: '<i class="fa fa-file"></i>',
        language: 'es',
        theme: "fa",
        hideThumbnailContent: true,
        allowedPreviewTypes: null, // set to empty, null or false to disable preview for all types
        previewFileIconSettings: {
            'doc': '<i class="fas fa-file-word text-primary"></i>',
            'xls': '<i class="fas fa-file-excel text-success"></i>',
            'ppt': '<i class="fas fa-file-powerpoint text-danger"></i>',
            'jpg': '<i class="fas fa-file-image text-warning"></i>',
            'pdf': '<i class="fas fa-file-pdf text-danger"></i>',
            'zip': '<i class="fas fa-file-archive text-muted"></i>',
            'htm': '<i class="fas fa-file-code text-info"></i>',
            'txt': '<i class="fa fa-search text-info"></i>',
            'mov': '<i class="fas fa-file-video text-warning"></i>',
            'mp3': '<i class="fas fa-file-audio text-warning"></i>',
        },
        previewFileExtSettings: {
            'doc': function (ext) {
                return ext.match(/(doc|docx)$/i);
            },
            'xls': function (ext) {
                return ext.match(/(xls|xlsx)$/i);
            },
            'ppt': function (ext) {
                return ext.match(/(ppt|pptx)$/i);
            },
            'jpg': function (ext) {
                return ext.match(/(jp?g|png|gif|bmp)$/i);
            },
            'zip': function (ext) {
                return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
            },
            'htm': function (ext) {
                return ext.match(/(php|js|css|htm|html)$/i);
            },
            'txt': function (ext) {
                return ext.match(/(txt|ini|md)$/i);
            },
            'mov': function (ext) {
                return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
            },
            'mp3': function (ext) {
                return ext.match(/(mp3|wav)$/i);
            },
        }
    });

    $("#forma").submit(function (event) {

        EnviarArchivosSISA();
        event.preventDefault();
    });
}

/**
* Enviando Archivos
*/
function EnviarArchivosSISA() {
    if ($("#input-folder-2").val() == "") {
        $.notify("Debe seleccionar un archivo", { position: "top" });
        return false;
    }


    
    var f = $("#cmbLectivo").val() +  $("#cmbSolicitud").val();
    $("#txtFileID").val(f + "|1100|" + $("#cmbSolicitud option:selected").text());

    console.log( $("#txtFileID").val() );

    var formData = new FormData(document.forms.namedItem("forma"));


    var strUrl = "https://" + Conn.IP + Conn.PuertoSSL + "/ipsfa/api/militar/jwtsubirtxtsisa";
    $("#divDtArchivosS").show();
    $("#divDtArchivosM").hide();
    $("#divFormas").hide();
    $.ajax({
        url: strUrl,
        type: "post",
        dataType: "html",
        data: formData,
        timeout: 2000000,
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('ipsfaToken'));
        }
    })
        .done(function (res) {
            $("#divDtArchivosS").hide();
            $("#divDtArchivosM").show();

        }).fail(function (jqXHR, textStatus) {
            $("#divDtArchivosS").hide();
            $("#divDtArchivosM").hide();
            $("#divFormas").show();
            $('#forma').trigger("reset");
            if (textStatus === 'timeout') {
                $.notify("Los archivos exceden el limite en tiempo de conexion intente con menos...");
            }

        });

}

function mostrarFormaSISA(){
    $("#divDtArchivosS").hide();
    $("#divDtArchivosM").hide();
    $("#divFormas").show();
    $('#forma').trigger("reset");
}