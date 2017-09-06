{
	"_id" : ObjectId("59627ed9639f7506c88e35db"),
	"nombre" : "Root",
	"login" : "root",
	"correo" : "",
	"clave" : "4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2",
	"sucursal" : "Principal",
	"sistema" : "",
	"rol" : {
		"id" : "0xRO",
		"descipcion" : "Super Usuario"
	},
	"token" : "",
	"perfil" : {
		"id" : "0xRO",
		"descripcion" : "Super Usuario",
		"privilegios" : [
			{
				"metodo" : "afiliacion.salvar",
				"descripcion" : "Crear Usuario",
				"accion" : "Insert()"
			},
			{
				"metodo" : "afiliacion.modificar",
				"descripcion" : "Modificar Usuario",
				"accion" : "Update()"
			}
		],
    "menu": [
			{
				"url" : "inc/datos",
				"icono" : "fa fa-search",
				"nombre" : "Datos"
			},{
        "url" : "inc/usuario",
				"icono" : "fa fa-users",
				"nombre" : "Gestion de Usuarios"
			}
    ]


	},
	"firmadigital" : {
		"direccionmac" : "",
		"direccionip" : "192.168.6.45",
		"tiempo" : ISODate("2017-07-09T19:07:05.851Z")
	}
}
