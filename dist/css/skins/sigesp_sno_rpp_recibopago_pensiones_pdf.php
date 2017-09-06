<?php
    session_start();   
	header("Pragma: public");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
	header("Cache-Control: private",false);
	if(!array_key_exists("la_logusr",$_SESSION))
	{
		print "<script language=JavaScript>";
		print "close();";
		print "opener.document.form1.submit();";		
		print "</script>";		
	}
	ini_set('memory_limit','2048M');
	ini_set('max_execution_time','0');

	//-----------------------------------------------------------------------------------------------------------------------------------
	function uf_insert_seguridad($as_titulo,$as_desnom,$as_periodo,$ai_tipo)
	{
		global $io_fun_nomina;
		
		$ls_codnom=$_SESSION["la_nomina"]["codnom"];
		$ls_descripcion="Generó el Reporte ".$as_titulo.". Para ".$as_desnom.". ".$as_periodo;
		if($ai_tipo==1)
		{
			$lb_valido=$io_fun_nomina->uf_load_seguridad_reporte_nomina("SNO","sigesp_sno_r_pagonomina.php",$ls_descripcion,$ls_codnom);
		}
		else
		{
			$lb_valido=$io_fun_nomina->uf_load_seguridad_reporte_nomina("SNO","sigesp_sno_r_hpagonomina.php",$ls_descripcion,$ls_codnom);
		}
		return $lb_valido;
	}
	//-----------------------------------------------------------------------------------------------------------------------------------

	//-----------------------------------------------------------------------------------------------------------------------------------
		function calcular_anos_servicioas($fecha_ingreso,$fecha_egreso)
		{  
			  $c = (integer)date("Y",$fecha_ingreso);	   
			  $b = (integer)date("m",$fecha_ingreso);	  
			  $a = (integer)date("d",$fecha_ingreso); 	
			  $ce = (integer)date("Y",$fecha_egreso);
			  $be = (integer)date("m",$fecha_egreso);	  
			  $ae = (integer)date("d",$fecha_egreso); 	
								  
			   $anos = $ce-$c; 		  
			   if(($be-$b) > 0){
			  
				  }elseif(($be-$b) <= 0){
			 
						  if($ae-$a < 0)
						  {		  
							 $anos = $anos-1;	  
						  }
			  
				  }
				  else{		  
						 $anos;		  
				  } 
				  
			  return $anos;	 
		  } //FIN DE calcular_anos_servicioas
	//-----------------------------------------------------------------------------------------------------------------------------------

	//-----------------------------------------------------  Instancia de las clases  ------------------------------------------------
	
	$ls_tiporeporte="0";
	if($_SESSION["la_nomina"]["tiponomina"]=="NORMAL")
	{
		require_once("sigesp_sno_class_report.php");
		$io_report=new sigesp_sno_class_report();
		$li_tipo=1;
	}
	if($_SESSION["la_nomina"]["tiponomina"]=="HISTORICA")
	{
		require_once("sigesp_sno_class_report_historico.php");
		$io_report=new sigesp_sno_class_report_historico();
		$li_tipo=2;
	}	
	$ls_bolivares ="Bs.";
	$ruta = '../../';
	require_once("../../shared/class_folder/class_funciones.php");
	$io_funciones=new class_funciones();				
	require_once("../class_folder/class_funciones_nomina.php");
	$io_fun_nomina=new class_funciones_nomina();
	require_once("../class_folder/clase_pensionados.php");
	$io_pensionados=new pensionados();
	//----------------------------------------------------  Parámetros del encabezado  -----------------------------------------------
	$ls_desnom=$_SESSION["la_nomina"]["desnom"];
	$ls_peractnom=$_SESSION["la_nomina"]["peractnom"];
	$ld_fecdesper=$io_funciones->uf_convertirfecmostrar($_SESSION["la_nomina"]["fecdesper"]);
	$ld_fechasper=$io_funciones->uf_convertirfecmostrar($_SESSION["la_nomina"]["fechasper"]);
	$ls_titulo="<b>Planilla de Liquidación de haberes</b>";
	$ls_periodo="<b>Período Nro ".$ls_peractnom.", ".$ld_fecdesper." - ".$ld_fechasper."</b>";
	//--------------------------------------------------  Parámetros para Filtar el Reporte  -----------------------------------------
	
	//$_GET['codperdes'] = '0003006000';
	//$_GET['codperhas'] = '0003007000';
	//$_GET['codperdes'] = '0000000151';
	//$_GET['codperhas'] = '0000000151';
	//$_GET['codperdes'] = '0000000151';
	//$_GET['codperhas'] = '0097703103';
	//$_GET['tituloconcepto'] = '1';
	//$_GET['conceptocero'] = '1';	
	//$_GET['orden'] = '2';
	
	
	
	
	
	$ls_codperdes=$io_fun_nomina->uf_obtenervalor_get("codperdes","");
	$ls_codperhas=$io_fun_nomina->uf_obtenervalor_get("codperhas","");
	$ls_orden=$io_fun_nomina->uf_obtenervalor_get("orden","1");
	$ls_conceptocero=$io_fun_nomina->uf_obtenervalor_get("conceptocero","");
	$ls_tituloconcepto=$io_fun_nomina->uf_obtenervalor_get("tituloconcepto","");
	$ls_conceptoreporte=$io_fun_nomina->uf_obtenervalor_get("conceptoreporte","");
	$ls_conceptop2=$io_fun_nomina->uf_obtenervalor_get("conceptop2","");
	$ls_codubifis=$io_fun_nomina->uf_obtenervalor_get("codubifis","");
	$ls_codpai=$io_fun_nomina->uf_obtenervalor_get("codpai","");
	$ls_codest=$io_fun_nomina->uf_obtenervalor_get("codest","");
	$ls_codmun=$io_fun_nomina->uf_obtenervalor_get("codmun","");
	$ls_codpar=$io_fun_nomina->uf_obtenervalor_get("codpar","");
	$ls_subnomdes=$io_fun_nomina->uf_obtenervalor_get("subnomdes","");
	$ls_subnomhas=$io_fun_nomina->uf_obtenervalor_get("subnomhas","");
	//--------------------------------------------------------------------------------------------------------------------------------
	
	
	$lb_valido=uf_insert_seguridad($ls_titulo,$ls_desnom,$ls_periodo,$li_tipo); // Seguridad de Reporte
	
	
	
	if($lb_valido){
			$param['codper']=$ls_codperdes;			
			$resultado = $io_pensionados->busca_neto($param);
	}
	
		require_once('../../shared/tcpdf/config/lang/ita.php');
		require_once('../../shared/tcpdf/tcpdf.php');  
		//error_reporting(E_ALL);
		//set_time_limit(18000);
		
		$pdf = new TCPDF('PORTRAIT', PDF_UNIT, 'LETTER', true, 'UTF-8', true); 
		$pdf->setFooterFont(array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));
		$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		$pdf->SetMargins(PDF_MARGIN_LEFT, 10, PDF_MARGIN_RIGHT);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		$pdf->setPrintHeader(false);
		$pdf->setTextoFooter(utf8_encode(''));
		
		$pdf->AddPage();
		
		$titulo = '  PAGO NÓMINA PENSIONES';
		$periodo = '  PERÍODO: '.$ls_peractnom.", ".$ld_fecdesper." - ".$ld_fechasper;
		$personal = '  PERSONAL: '.$ls_codperdes.'-'.$ls_codperhas;
		
		$margenes = $pdf->getMargins();
		$pdf->Image('../../shared/imagebank/'.$_SESSION["ls_logo"],$margenes['left'],$margenes['top'], 15, 15);
		$pdf->SetFont('helvetica', '', 8);
		$tit_rep = '<p  style="text-align:center;"><b> '.$ls_titulo.'</b></p>';
		$pdf->writeHTML(utf8_encode($tit_rep), true, false, false, false, '');
		
		$periodo = '<p  style="text-align:center;"><b> '.$ls_periodo.'</b></p>';
		$pdf->writeHTML(utf8_encode($periodo), true, false, false, false, '');
		$pdf->Ln();
		
		$nomina = '<p  style="text-align:center;"><b> RECIBO DE PAGO </b></p>';
		$pdf->writeHTML(utf8_encode($nomina), true, false, false, false, '');
		$pdf->Ln();
		
		$pdf->SetFont('helvetica', '', 6);
	
		
		$pdf->SetLineStyle(array('width' => 0.1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(200, 200, 200))); 
		
		function encabezado1($opciones=array()){		
														
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							//Cell( $w, $h, $txt, $border,$ln,$align, $fill,$link,$stretch,$ignore_min_height)
							$pdf->Cell(12, 3,utf8_encode('CÉDULA') , 1,0,'C',1);
							$pdf->Cell(50, 3,utf8_encode('NOMBRE'), 1,0,'C',1);
							$pdf->Cell(8, 3,utf8_encode('EDAD'), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode('AÑOS SERV.'), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode('SITUACIÓN'), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode('FEC. SIT.'), 1,0,'C',1);
							$pdf->Cell(20, 3,utf8_encode('CAUSAL'), 1,0,'C',1);
							$pdf->Cell(20, 3,utf8_encode('COMPONENTE'), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode('RANGO') , 1,0,'C',1);
							 $pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		function fila1($datos=array()){		
														
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);	
							$pdf->Cell(12, 3,utf8_encode($datos['cedula']) , 1,0,'R',1); 
							$pdf->Cell(50, 3,utf8_encode($datos['nombre']), 1,0,'L',1);
							$pdf->Cell(8, 3,utf8_encode($datos['edad']), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode($datos['ano']), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode($datos['situacion']), 1,0,'C',1);
							$pdf->Cell(15, 3,utf8_encode($datos['fecha']), 1,0,'C',1);
							$pdf->Cell(20, 3,utf8_encode($datos['causal']), 1,0,'C',1);
							$pdf->Cell(20, 3,utf8_encode($datos['componente']), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode($datos['rango']) , 1,0,'C',1);
							$pdf->Ln();
							
							
		}
		function encabezado2($opciones=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							$pdf->Cell(30, 3,utf8_encode('PRIMA T. SERV.'), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode('PRIMA POR NO ASC.'), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode('PRIMA PROF.'), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode('BONO TRANSP.'), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode('PRIMA DESC.'), 1,0,'C',1);						
							$pdf->Cell(35, 3,utf8_encode('PRIMA ESP.'), 1,0,'C',1);
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		function fila2($datos=array()){
																
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);	
							$pdf->Cell(30, 3,utf8_encode(number_format($datos["prianoserper"],2,",",".")) , 1,0,'C',1); 
							$pdf->Cell(30, 3,utf8_encode(number_format($datos["prinoascper"],2,",",".")), 1,0,'C',1);							
							$pdf->Cell(30, 3,utf8_encode(number_format($datos["priproper"],2,",",".")), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode(number_format($datos["pritraper"],2,",",".")), 1,0,'C',1);
							$pdf->Cell(30, 3,utf8_encode(number_format($datos["pridesper"],2,",",".")), 1,0,'C',1);
							$pdf->Cell(35, 3,utf8_encode(number_format($datos["priespper"],2,",",".")), 1,0,'C',1);						
							$pdf->Ln();					
							
		}
		
		function encabezado3($opciones=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							$pdf->Cell(60, 3,utf8_encode('BANCO.'), 1,0,'C',1);
							$pdf->Cell(60, 3,utf8_encode('FORMA DE PAGO'), 1,0,'C',1);
							$pdf->Cell(65, 3,utf8_encode('NRO. CUENTA'), 1,0,'C',1);							
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		
		function fila3($datos=array()){
																
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							
							switch($datos['tipcuebanper']){
							
									case 'C':
										$formap = 'C-Cuenta Corriente';
									break;
									
									case 'A':
										$formap = 'A-Cuenta de Ahorro';
									break;						
							
							}
							
							if($datos['pagefeper']==1 and $datos['pagbanper']==0){$formap = 'Pago por Cheque';}
								
							$pdf->Cell(60, 3,utf8_encode($datos['codban'].'-'.$datos['nomban']) , 1,0,'C',1); 
							$pdf->Cell(60, 3,utf8_encode($formap), 1,0,'C',1);							
							$pdf->Cell(65, 3,utf8_encode($datos['codcueban']), 1,0,'C',1);											
							$pdf->Ln();					
							
		}
		
		
		function encabezado4($opciones=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							$pdf->Cell(45, 3,utf8_encode('SUELDO BAS.'), 1,0,'C',1);
							$pdf->Cell(45, 3,utf8_encode('PENSIÓN'), 1,0,'C',1);
							$pdf->Cell(45, 3,utf8_encode('% PENSIÓN'), 1,0,'C',1);
							$pdf->Cell(50, 3,utf8_encode('TOTAL PENSIÓN.'), 1,0,'C',1);							
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		function fila4($datos=array()){
																
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);	
							$pdf->Cell(45, 3,utf8_encode(number_format($datos["suebasper"],2,",",".")) , 1,0,'C',1); 
							$pdf->Cell(45, 3,utf8_encode(number_format($datos["subtotper"],2,",",".")), 1,0,'C',1);							
							$pdf->Cell(45, 3,utf8_encode(number_format($datos["porpenper"],2,",",".")), 1,0,'C',1);
							$pdf->Cell(50, 3,utf8_encode(number_format($datos["monpenper"],2,",",".")), 1,0,'C',1);											
							$pdf->Ln();					
							
		}
		
		
		
		function encabezado_benef($opciones=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							$pdf->Cell(60, 3,utf8_encode('PENSIÓN'), 1,0,'C',1);
							$pdf->Cell(60, 3,utf8_encode('PORCENTAJE'), 1,0,'C',1);
							$pdf->Cell(65, 3,utf8_encode('TOTAL PENSIÓN'), 1,0,'C',1);							
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		
		function fila_benef($datos=array()){
																
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							
							$pdf->Cell(60, 3,utf8_encode(number_format($datos["monpenper"],2,",",".")) , 1,0,'C',1); 
							$pdf->Cell(60, 3,utf8_encode(number_format($datos["porpension"],2,",",".")), 1,0,'C',1);							
							$pdf->Cell(65, 3,utf8_encode(number_format(($datos["monpenper"]*$datos["porpension"]/100),2,",",".")), 1,0,'C',1);											
							$pdf->Ln();					
							
		}
		
		
		
		function encabezado_conceptos($opciones=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,255);
							$pdf->SetFillColor(0, 0, 150);
							$pdf->Cell(15, 3,utf8_encode('CONCEPTO'), 1,0,'C',1);
							$pdf->Cell(82, 3,utf8_encode('DESCRIP.'), 1,0,'C',1);
							$pdf->Cell(22, 3,utf8_encode('CUOTA'), 1,0,'C',1);
							$pdf->Cell(22, 3,utf8_encode('ASIGNACIÓN'), 1,0,'C',1);
							$pdf->Cell(22, 3,utf8_encode('DEDUCCIÓN'), 1,0,'C',1);						
							$pdf->Cell(22, 3,utf8_encode('NETO'), 1,0,'C',1);
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		function fila_conceptos($datos=array()){
																
							global $pdf,$color_concepto;
							if(!$color_concepto){$color_concepto=255;}
							switch($color_concepto){
								case 200:
									$color_concepto=255;
								break;
								
								case 255:
									$color_concepto=200;
								break;
							
							}
							
												
							$pdf->SetFont('helvetica', 'b', 6);
							$pdf->SetFillColor(255, 255, $color_concepto);
							$pdf->SetTextColor(0);
							
							if($datos['final']=='1'){$borde1 = 'LB';$borde2 = 'B';$borde3 = 'LRB';}else{$borde1 = 'L';$borde2 = '';$borde3 = 'LR';}
							$pdf->Cell(15, 3,utf8_encode($datos['codconc']) , $borde1,0,'R',1); 
							$pdf->Cell(82, 3,utf8_encode($datos['desc']), $borde2,0,'L',1);							
							$pdf->Cell(22, 3,utf8_encode($datos['cuota']), $borde3,0,'C',1);
							$pdf->Cell(22, 3,utf8_encode($datos['asig']), $borde3,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['deduc']), $borde3,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['neto']), $borde3,0,'R',1);						
							$pdf->Ln();
											
							
		}
		
		function totales_conceptos($datos=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(0,0,150);
							$pdf->SetFillColor(240, 240, 200);					
							$pdf->Cell(119, 3,utf8_encode('TOTALES:'), 1,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['total_asig']), 1,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['total_deduc']), 1,0,'R',1);						
							$pdf->Cell(22, 3,utf8_encode($datos['neto']), 1,0,'R',1);
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		function total_nomina($datos=array()){		
							
																		
							global $pdf;
							$pdf->SetFont('helvetica', 'B', 6);
							$pdf->SetTextColor(255,255,200);
							$pdf->SetFillColor(150, 0, 0);					
							$pdf->Cell(119, 3,utf8_encode('TOTAL GENERAL:'), 1,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['total_asig']), 1,0,'R',1);
							$pdf->Cell(22, 3,utf8_encode($datos['total_deduc']), 1,0,'R',1);						
							$pdf->Cell(22, 3,utf8_encode($datos['total_general']), 1,0,'R',1);
							$pdf->Ln();
							$pdf->SetFillColor(255, 255, 255);
							$pdf->SetTextColor(0);
							$pdf->SetFont('helvetica', '', 6);
		}
		
		
		$color_concepto=255;
		$li_totrow=$io_pensionados->rs_data_pensionados->RecordCount();
		$li_totasi=0;
		$li_totded=0;
		$li_totapo=0;
		$li_totgeneral=0;
		$li_i=0;							
	
			
	while((!$io_pensionados->rs_data_pensionados->EOF)){
						
						
						$pdf->startTransaction();
						$pagina = $pdf->getPage();
						$codper = $io_pensionados->rs_data_pensionados->fields["codper"];
						$lb_valido=$io_report->uf_pagonomina_personal_pensionado($codper,$codper,$ls_conceptocero,$ls_conceptoreporte,$ls_conceptop2,
																	  $ls_codubifis,$ls_codpai,$ls_codest,$ls_codmun,$ls_codpar,$ls_subnomdes,$ls_subnomhas,$ls_orden); // Cargar el DS con los datos de la cabecera del reporte
						
							$benef = 0;
							if($io_report->rs_data->fields["parentesco"] and $io_report->rs_data->fields["beneficiario"]){												
										$benef = 1;
							}
								
								
								$li_i++;	
								$li_totalasignacion=0;
								$li_totaldeduccion=0;
								$li_totalaporte=0;
								$li_total_neto=0;
								$ls_codper=$io_report->rs_data->fields["codper"];
								$ls_cedper=$io_report->rs_data->fields["cedper"];
								$ls_apenomper=$io_report->rs_data->fields["apeper"].", ". $io_report->rs_data->fields["nomper"];
								$ls_descar=$io_report->rs_data->fields["descar"];
								$ls_desuniadm=$io_report->rs_data->fields["desuniadm"];
								$ld_fecingper=$io_funciones->uf_convertirfecmostrar($io_report->rs_data->fields["fecingper"]);
								$ls_codcueban=$io_report->rs_data->fields["codcueban"];
								$ls_descom=$io_report->rs_data->fields["dencom"];
								$ls_desran=$io_report->rs_data->fields["denran"];
								$ls_situacion=$io_report->rs_data->fields["situacion"];			
								$ls_causales=$io_report->rs_data->fields["dencausa"];
								$ls_fecha_I=$io_report->rs_data->fields["fecingper"];
								$ls_fechasitu=$io_funciones->uf_convertirfecmostrar($io_report->rs_data->fields["fecleypen"]);
								$ls_fecha_E=$io_report->rs_data->fields["fecingper"];
								$ls_fecingnom=$io_report->rs_data->fields["fecingnom"];	
								//echo $ls_fecha_I.'<br>';
		  						//echo $ls_fecingnom.'<br>';		
								$ls_ano=calcular_anos_servicioas(strtotime($ls_fecha_I),strtotime($ls_fecingnom));
								$fecha_actual=date("Y/m/d"); 
								$ls_fecnacper=$io_report->rs_data->fields["fecnacper"];
										
								if ($ls_fecnacper!="")
								{
									$ls_edadper=calcular_anos_servicioas(strtotime($ls_fecnacper),strtotime($fecha_actual));
								}
								else
								{
									$ls_edadper=0;
								}
								if ($ls_ano<0)
								{
									$ls_ano=0;
								}
								
								switch($ls_situacion)
								{
									  case "1":
										$ls_situacion="Ninguno";
									  break;
									  case "2":
										$ls_situacion="Fallecido";
									  break;
									  case "3":
										$ls_situacion="Pensionado";
									  break;
									  case "4":
										$ls_situacion="Jubilado";
									  break;
									  case "5":
										$ls_situacion="Retirado";
									  break;				  		  
								}
								
								
													
							
								encabezado1();							
								$ls_apenomper = substr($ls_apenomper,0,36);
								$ls_descom = substr($ls_descom,0,12);
								$ls_desran = substr($ls_desran,0,12);												
							
								$datos=array();
								$datos['cedula']=$ls_cedper;
								$datos['nombre']=$ls_apenomper;							
								$datos['edad']=$ls_edadper;
								$datos['ano']=$ls_ano;
								$datos['situacion']=$ls_situacion;
								$datos['fecha']=$ls_fechasitu;
								$datos['causal']=$ls_causales;
								$datos['componente']=$ls_descom;
								$datos['rango']=$ls_desran;
								fila1($datos);
								
								encabezado3();
								fila3($io_report->rs_data->fields);
								
								if($benef){										
									$codper = str_pad($io_report->rs_data->fields["cedmil"],10,'0',STR_PAD_LEFT);									
								}
								else{$codper = $ls_codper;}
								
								
								
								$lb_valido1=$io_report->uf_recibo_nomina_oficiales($codper);
								$li_pension=$io_report->rs_data_detalle->RecordCount();
								
								if($benef){	
								        $pdf->SetFont('helvetica', '', 6);						
										$pdf->Ln();									
										$texto = '<p  style="text-align:left;"><b> CAUSANTE DE LA PENSIÓN: </b> '.$io_report->rs_data_detalle->fields['nomper'].' '.$io_report->rs_data_detalle->fields['apeper'].'</p>';
										$pdf->writeHTML(utf8_encode($texto), true, false, false, false, '');
										$texto = '<p  style="text-align:left;"><b>  CÉDULA DEL AFILIADO: </b> '.$io_report->rs_data->fields["cedmil"].'</p>';
										$pdf->writeHTML(utf8_encode($texto), true, false, false, false, '');
										$pdf->SetFont('helvetica', 'B', 6);							
								}
								
								
								if (($li_pension>0)&&($lb_valido1))
								{								  
									  encabezado2();									
									  fila2($io_report->rs_data_detalle->fields);
									  encabezado4();									
									  fila4($io_report->rs_data_detalle->fields); 
								}
								
								if($benef){
								
								
										switch($io_report->rs_data->fields["parentesco"]){
										
											case 'PD':
													$parentesco = 'PADRE';
											break;
											
											case 'EA':
												$parentesco = 'ESPOSA(O)';
											break;
											
											case 'HJ':
												$parentesco = 'HIJO(A)';
											break;
											
										    case 'VI':
												$parentesco = 'VIUDA(O)';
											break;
										
										
										}
								
										$pdf->SetFont('helvetica', '', 6);
										$codper = str_pad($io_report->rs_data->fields["cedmil"],10,'0',STR_PAD_LEFT);
										$pdf->Ln();
										$texto = '<p  style="text-align:left;"><b> BENEFICIARIO DE LA PENSIÓN: </b>'.$ls_apenomper.'</p>';
										$pdf->writeHTML(utf8_encode($texto), true, false, false, false, '');
										$texto = '<p  style="text-align:left;"><b> PARENTESCO:</b>'.$parentesco.'</p>';
										$pdf->writeHTML(utf8_encode($texto), true, false, false, false, '');
										$datos['porpension'] = $io_report->rs_data->fields['porpension'];
										$datos['monpenper'] = $io_report->rs_data_detalle->fields['monpenper'];
										encabezado_benef();									
									    fila_benef($datos);
										$pdf->Ln();	
										$pdf->SetFont('helvetica', 'B', 6);
								}
								
								
								$li_pension=0;	
								
								$li_bene=0;
								$lb_valido=$io_report->uf_pagonomina_conceptopersonal($ls_codper,$ls_conceptocero,$ls_tituloconcepto,$ls_conceptoreporte,$ls_conceptop2); // Obtenemos el detalle del reporte
								$color_concepto=255;
								if($lb_valido)
								{
									$li_totrow_res=$io_report->rs_data_detalle->RecordCount();
									$li_s=1;
									
													  
									 encabezado_conceptos();
									
									while(!$io_report->rs_data_detalle->EOF)
									{
										$ls_codconc=$io_report->rs_data_detalle->fields["codconc"];
										$ls_nomcon=$io_report->rs_data_detalle->fields["nomcon"];
										$ls_tipsal=rtrim($io_report->rs_data_detalle->fields["tipsal"]);
										$li_valsal=abs($io_report->rs_data_detalle->fields["valsal"]);
										
										$ls_repconsunicon=$io_report->rs_data_detalle->fields["repconsunicon"];
										$ls_consunicon=$io_report->rs_data_detalle->fields["consunicon"];
										$ls_cuota=$io_report->rs_data_detalle->fields["numcuota"];
										$ls_plazo=$io_report->rs_data_detalle->fields["totalcuotas"];
										$inf_cuotas = '';
										if($ls_cuota){$inf_cuotas = $ls_cuota.'/'.$ls_plazo;}
										if (($ls_repconsunicon=='1')&&($ls_consunicon!="")&&($ls_cuota==''))
										{
											$io_report->uf_buscar_cuotas($ls_consunicon,$ls_codper,$ls_cuota);
											$inf_cuotas = $ls_cuota;
										}
										
										switch($ls_tipsal)
										{
											case "A":
												$li_totalasignacion=$li_totalasignacion + $li_valsal;
												$li_asignacion=number_format($li_valsal,2,",",".");
												$li_deduccion=""; 
												$li_aporte=""; 
												break;
												
											case "V1":
												$li_totalasignacion=$li_totalasignacion + $li_valsal;
												$li_asignacion=number_format($li_valsal,2,",",".");
												$li_deduccion=""; 
												$li_aporte=""; 
												break;
												
											case "W1":
												$li_totalasignacion=$li_totalasignacion + $li_valsal;
												$li_asignacion=number_format($li_valsal,2,",",".");
												$li_deduccion=""; 
												$li_aporte=""; 
												break;
												
											case "D":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
												
											case "V2":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
												
											case "W2":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
					
											case "P1":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
					
											case "V3":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
					
											case "W3":
												$li_totaldeduccion=$li_totaldeduccion + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=number_format($li_valsal,2,",",".");
												$li_aporte=""; 
												break;
					
											case "P2":
												$li_totalaporte=$li_totalaporte + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=""; 
												$li_aporte=number_format($li_valsal,2,",",".");
												break;
					
											case "V4":
												$li_totalaporte=$li_totalaporte + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=""; 
												$li_aporte=number_format($li_valsal,2,",",".");
												break;
					
											case "W4":
												$li_totalaporte=$li_totalaporte + $li_valsal;
												$li_asignacion=""; 
												$li_deduccion=""; 
												$li_aporte=number_format($li_valsal,2,",",".");
												break;
					
											case "R":
												$li_asignacion=number_format($li_valsal,2,",",".");
												$li_deduccion=""; 
												$li_aporte="";
												break;
										}
															
										
										switch($ls_codconc){
										
											case '0000000411':											
												$medidas=$io_report->rs_data->fields["codper_medidas"];
												$medidas_saman=$io_pensionados->busca_medidas_persona($medidas);
												$ls_nomcon = $ls_nomcon.' ('.$medidas_saman.')';
											break;
											
												
										
										}
										
										$li_s++;					  
										$io_report->rs_data_detalle->MoveNext();
										
										
										$ls_nomcon = substr($ls_nomcon,0,70); 																													  
										$datos=array();
										if($io_report->rs_data_detalle->EOF){$datos['final']='1';}else{$datos['final']='0';}
										$datos['codconc']=$ls_codconc;
										$datos['desc']=$ls_nomcon;							
										$datos['cuota']=$inf_cuotas;
										$datos['asig']=$li_asignacion;
										$datos['deduc']=$li_deduccion;
										$datos['neto']='';										
										fila_conceptos($datos);
										
															  
									}
									
									$li_total_neto=$li_totalasignacion-$li_totaldeduccion;									
									$li_totalasignacionx=number_format($li_totalasignacion,2,",",".");
									$li_totaldeduccionx=number_format($li_totaldeduccion,2,",",".");
									$li_totalaportex=number_format($li_totalaporte,2,",",".");
									$li_total_netox=number_format($li_total_neto,2,",",".");
								 
									  
									  $datos=array();
									  $datos['total_asig']=$li_totalasignacionx;
									  $datos['total_deduc']=$li_totaldeduccionx;
									  $datos['neto']=$li_total_netox;							
									  totales_conceptos($datos);
									  
										
								}
								unset($la_data);
								
						
						  	
							 
						  		
							  $pagina2 = $pdf->getPage();
							  if($pagina!=$pagina2){
							        
									$pdf = $pdf->rollbackTransaction();									
									$pdf->AddPage();
																		
							  }	
							  else{							  
									$li_totasi=$li_totasi+$li_totalasignacion;
									$li_totded=$li_totded+$li_totaldeduccion;
									$li_totapo=$li_totapo+$li_totalaporte;
									$li_totgeneral=$li_totgeneral+$li_total_neto;
									
									$pdf->commitTransaction();
									$io_pensionados->rs_data_pensionados->MoveNext(); 
									$pdf->Ln();
							        $pdf->Ln();	 
									
							  } 
							 
							 
						  
						
					}			
							
		$li_totasi=number_format($li_totasi,2,",",".");
		$li_totded=number_format($li_totded,2,",",".");
		$li_totapo=number_format($li_totapo,2,",",".");
		$li_totgeneral=number_format($li_totgeneral,2,",",".");
	
		$datos=array();
		$datos['total_asig']=$li_totasi;
		$datos['total_deduc']=$li_totded;
		$datos['total_general']=$li_totgeneral;
		$pdf->Ln();
		$pdf->Ln();
		$pdf->SetFont('helvetica', '', 8);
		$texto = '<p  style="text-align:right;"> Neto a Cobrar:   <b>'.$li_total_netox.'</b> Bs.</p>';
		$pdf->writeHTML(utf8_encode($texto), true, false, false, false, '');
		
		//total_nomina($datos);
			
			
	//para visualizar telefonos en el neto
		$pdf->setTextoFooter('Tlfs de contacto: (0212)6092005 / (0212)6092457');
	
		unset($io_report);
		unset($io_funciones);
		unset($io_fun_nomina);
		
		
		
		$pdf->Output('listado_conceptos.pdf', 'I');
	
?> 
