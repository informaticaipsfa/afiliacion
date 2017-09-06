/*
Desarrollado por  :  Victor Manuel Suarez
Correo            :  victormst@gmail.com
Fecha Creacion    :  26-06-2017  
Fecha Modificacion:  26-06-2017  
Descripcion       :  Configuracion de Menu
Dependencias      :  Utiliza funciones de php.js

var MNU2 = new Array();

MNU2[count(MNU2)] = new Array
						(
										"Afiliacion:__PADRE__",
										new Array 
											(
												"Menu1:f1__1_1" ,
												"Menu2:f1__1_2" ,
												
												"Menu Hijo 1:__PADRE__",
													new Array 
													( 
														"SMenu1:f1__S1_1",
														"SMenu2:f1__S1_2", 

														"Menu Nieto 1:__PADRE__",
															new Array 
															( 
																"SMenu1:f1__S1_1",
																"SMenu2:f1__S1_2" 
															)
													)
											)
						);
//var MENU = Array("Afiliacion"=>)*/

var MNU = new Array();
var MNU2 = new Array();

MNU2[count(MNU2)] = new Array
						(
										"Afiliacion:__PADRE__",
										new Array 
											(
												"Datos:f_afiliacion" ,
												"Usuario:f1__1_2" ,
												"Auditoria:f1__1_2" ,
												"Estadisticas:f1__1_2" ,
												
												
											)
						);


MNU2[count(MNU2)] =  new Array
						( 
							"BIENESTAR SOCIAL:__PADRE__",
							new Array 
								( 
									
									//"Menu2:f1__1_2" ,
									
									



											"Pensiones:__PADRE__",
										new Array 
										( 
										//	"SMenu1:f1__S1_1",
										//	"SMenu2:f1__S1_2", 
											"Cambio de Situación:f_cambioSituacion",
											"Calculo Pensión Retiro:__PADRE__",
												new Array 
												( 
													
													"Calculo Pensión Retiro:f_calculoPensionRetiro",
													"Calcula Pensión:f_calculoPension",
													"Calculo de <br/> Retroactivos:f_calculoRetroactivo", 
													"Cuentas Bancarias:f_cuentasBancarias", 
													"Calcula Pensión <br/>Especial:f_calculoPensionEspecial"
													
												),

												"Definición y Ajustes <br/>de Beneficios:__PADRE__",
												new Array 
												( 
													"Lista Beneficiario:f_listaBeneficiario",
													"Monto de Beneficio:f_montoBeneficiario",
													"Datos de Afiliacón:f_datosAfiliacion"
													
													
												),	

												"Medidas Judiciales:__PADRE__",
												new Array 
												( 
													"No Funciona:f1__S1_1",
													
												),	



												"Otras Operaciones  <br/>Pension:__PADRE__",
												new Array 
												( 
													"Re Calculo de  <br/>Pension en Lote:f_recalculoPensionLote",
													"Recalculo de  <br/>Pension a Beneficiario <br/>en Lote:f_recalculoPensionBeneficiarioLote",
													"Cambio de Status  <br/>de Beneficiario:f_cambioStatusBeneficiario"
													
												),	
													"Nómina:__PADRE__",
												new Array 
												( 
													"Cambio de Status <br/>de Beneficiario:f_cambioStatusBeneficiario"
													
												),	


										),


													



										"Cuidados Integral:__PADRE__",
										new Array 
										( 
										//	"SMenu1:f1__S1_1",
										//	"SMenu2:f1__S1_2", 
										//	"SMenu3:f1__S1_3", 
											"Médico:__PADRE__",
												new Array 
												( 
													"Incluir:f_incluirMedico",
													"Datos Medicos:f_datosMedicos",
													"Especialidades <br/>Medicas:f_especialidadesMedicas", 
													"Unidades Medicas <br/> por Medico:f_unidadesMedicaporMedico", 
													"Idiomas:f_idioma",
													"Direccion:f_direccion"              ,
													"Telefono:f_telefono"         ,
													"Anotacion:f_anotacion"              ,
													"Datos Variables:f_datosVariables"          ,
													
												),	

												"Unidad Médica:__PADRE__",
												new Array 
												( 
													"Incluir:f_incluirUnidad",
													"Datos Unidad <br/>Medica:f_datosUnidad",
													"Especialidades <br/>Medicas:f_especialidadesMedicas", 
													"Unidades Medicas <br/>por Medico:f_unidadesMedicaporMedico", 
													"Idiomas:f_idioma",
													"Direccion:f_direccion"              ,
													"Telefono:f_telefono"         ,
													"Anotacion:f_anotacion"              ,
													"Datos Variables:f_datosVariables"          ,
													
												),	


												"Casos Médicos:__PADRE__",
												new Array 
												( 
													"Incluir:f_incluirCasosMedicos",
													"Actos Medicos:f_actosMedicos",
													"Diagnostico -  <br/>Tratamiento:f_diagnosticoTratamiento", 
													"Ciclo Tratamiento:f_cicloTratamiento", 
													"Detalle del Kit:f_kit"
													
													
												),	

												"Reembolso:__PADRE__",
												new Array 
												( 
													"Opiniones:f_opiniones",
													"Envio de Reembolso <br/> a Pagos:f_ReembolsoDetalle",
																							
													
												),	

												"Otras Operaciones C.I.:__PADRE__",
												new Array 
												( 
													
													"Envio de Reembolso <br/>a Pagos:f_ReembolsoDetalle",
																							
													
												),	

										),

                                                                                                                    "Cambio de clave <br/>de usuario:__PADRE__",
                                                                                                                                new Array 
                                                                                                                                ( 
                                                                                                                                    "Cambio de Usuario:f1__S1_1",
                                                                                                                                    
                                                                                                                                ),
							)
						);	


    
MNU2[count(MNU2)] = new Array
                        (
                                        "CRÈDITO:__PADRE__",
                                        new Array 
                                            (
                                                                        

                                                                           "Crédito:__PADRE__",
                                                                            new Array 
                                                                            ( 
                                                                            //  "SMenu1:f1__S1_1",
                                                                            //  "SMenu2:f1__S1_2", 
                                                                            //  "SMenu3:f1__S1_3", 
                                                                                "Crédito:__PADRE__",
                                                                                    new Array 
                                                                                    ( 
                                                                                        "Incluir:f_incluirCredito",
                                                                                        "Datos Basicos:f_datosBasicos",
                                                                                        "Datos Particulares:f_datosParticulares",
                                                                                        "Credito Partes <br/>(Solicitud y <br/>Recomendaciones):f_creditoPartes",
                                                                                        "Credito Partes <br/>(Aprobación):f_CreditoPartesAprobacion",
                                                                                        "Credito Partes<br/>Liquidación):f_CreditoPartesLiquidacion",
                                                                                        "Fiadores:f_Fiadores",
                                                                                        "Anotaciones:f_Anotaciones",
                                                                                        "Generar Cuotas:f_GenerarCuotas",
                                                                                        "Proceso de <br/> Liquidación:f_ProcesoLiquidacion",
                                                                                        "Proceso de <br/>Liquidación (Otorgamiento):f_ProcesoOtorgamiento",
                                                                                        "Compromisos y <br/>Otorgamiento de <br/>Crédito:f_CompromisosOtorgamiento",
                                                                                        "Declinar Crédito:f_DeclinarCredito",
                                                                                        "Reabrir Crédito:f_ReabrirCredito",
                                                                                        "Cierre de Crédito  <br/>(Cancelar):f_CierreCredito"
                                                                                        
                                                                                    ),

                                                                                "Otras Operaciones  <br/>de Crédito:__PADRE__",
                                                                                    new Array 
                                                                                    ( 
                                                                                        "Liquidar Crédito:f_liquidarCred",
                                                                                        "Liquidación  <br/>Masiva:f_liquidacionMasiva",
                                                                                        "Parcelas de <br/>Cementerios:f_parcelasCementerios",
                                                                                        "Cierre de <br/>Créditos Masivas:f_",
                                                                                        "Proceso Generar  <br/>Archivo Crédito BANAVIH:f_Banavih",
                                                                                        "Asignación de <br/>Permisos:f_Asignaciondepermisos",
                                                                                        "Cambio de <br/>Nro. de cuenta CXP:f_Cambiodecuentacxp",
                                                                                        
                                                                                        
                                                                                    ),      


                                                                            ),

                                                                                "Cambio de clave <br/>de usuario:__PADRE__",
                                                                                                                                new Array 
                                                                                                                                ( 
                                                                                                                                    "Cambio de Usuario:f1__S1_1",
                                                                                                                                    
                                                                                                                                ),

                                        )
                        );




MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "VIVIENDA:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );


MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "ODONTOLOGIA:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );


MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "FARMACIA:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );

MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "AÑOS DORADOS:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );

MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "RRHH:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );


MNU2[count(MNU2)] = new Array
						(
										"FINANZAS:__PADRE__",
										new Array 
											(
												//"Menu1:f1__1_1" ,
												//"Menu2:f1__1_2" ,


												
												"Facturación:__PADRE__",
													new Array 
													( 
														//"SMenu1:f1__S1_1",
														//"SMenu2:f1__S1_2", 

														"Facturación:__PADRE__",
															new Array 
															( 
																"Renglones:f1__S1_1",
																"Datos de Liquidación:f1__S1_2" 
															),


														"Otras Operaciones <br/> de Facturación:__PADRE__",
															new Array 
															( 
																"Contabilizar Factura:f_contabilizarFactura",
																"Generar Boletos:f_generarBoletos",
																"Contabilizar Factura:f1__S1_1",
																"Descontabilizar <br/> Factura:f1__S1_2",

															),		


													),

												"Caja y Cobranza:__PADRE__",
													new Array 
													( 
														//"SMenu1:f1__S1_1",
														//"SMenu2:f1__S1_2", 

														"Sesión de Caja:__PADRE__",
															new Array 
															( 
																"Abrir Sesión de Caja:f_abrirsesionCaja",
																"Cerrar Sesión de Caja:f_cerrarsesionCaja",
																"Arqueo de Caja:f1__S1_1",
																"Reabrir Sesión de Caja:f_reabrirsesionCaja" 

															),


														"Caja:__PADRE__",
															new Array 
															( 
																"Instr. Pago:f_intrpago",
																"Busq. CtasXCobrar:f_ctasxCobrar",
																"Amortización a <br/> Capital:f_amortizacionCapital",
																"Amortización a <br/> Capital (Giros):f_amortizacionCapitalgiros",
																"Generación de  <br/> Cuentas por Cobrar :f_generacionCuentacobrar",
																
															),	


														"Otras Operaciones <br/> Cobranza:__PADRE__",
															new Array 
															( 
																"Reintegro:f1__S1_1",
																"Contabilizar Pagos :f1__S1_2",
																"Cambio de Fecha <br/>de Vencimiento de CXC:f1__S1_1",
																"Cambio de Canal  <br/>de cobro de CXC",
																"Contabilizar Pagos <br/> Especiales  <br/>(sin Cuadrar Asiento)",
																"Descontabilizar Pagos:f1__S1_1",
																"Contabilizar Pagos <br/>en Banco :f1__S1_2",
																"Eliminación de Pagos:f1__S1_1",
																"Definición de <br/>Traspasos Deudas:f1__S1_1",
																
																
															),		


													),

                                                                                                                                                                "Deducciones:__PADRE__",
                                                                                                                                                    new Array 
                                                                                                                                                    ( 
                                                                                                                                                    //  "SMenu1:f1__S1_1",
                                                                                                                                                    //  "SMenu2:f1__S1_2", 
                                                                                                                                                    //  "SMenu3:f1__S1_3", 
                                                                                                                                                        "Deducciones:__PADRE__",
                                                                                                                                                            new Array 
                                                                                                                                                            ( 
                                                                                                                                                                "Deducciones <br/>Retenciones:f_deducciones_retenciones",
                                                                                                                                                                "Cargar Deducciones <br/>en Lote:f_deducciones_en_lotes"
                                                                                                                                                                
                                                                                                                                                                
                                                                                                                                                            ),

                                                                                                                                                    ),
                                                                                                                     "Cambio de clave <br/>de usuario:__PADRE__",
                                                                                                                                new Array 
                                                                                                                                ( 
                                                                                                                                    "Cambio de Usuario:f1__S1_1",
                                                                                                                                    
                                                                                                                                ),





											)
						);



MNU2[count(MNU2)] = new Array
                                                                            (
                                                                                            "PLANIFICACIÒN Y <br/> PRESUPUESTO:__PADRE__",
                                                                                            new Array 
                                                                                                (
                                                                                                    //"Menu1:f1__1_1" ,
                                                                                                    //"Menu2:f1__1_2" ,

                                                                                                ),
                                                                            );




						



