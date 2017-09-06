/*
Desarrollado por  :  Victor Manuel Suarez
Correo            :  victormst@gmail.com
Fecha Creacion    :  24-06-2017  
Fecha Modificacion:  25-06-2017  
Descripcion       :  Generar objetos de formularios: input text, select , textarea
Dependencias      :  Utiliza funciones de php.js
*/


function form_label(framework, name)
{
	
var str  = "";
 	if( framework=="" || framework=="-" )
	{
		str = "<label> "+name+" </label>";
		
	}
	
	if( framework=="bootstrap" )
	{
		str = "<div class='form-group'>";
	     str +="<label> "+name+" </label>";
	    str +="</div>";
	}
	
	return str;
}





function form_input_text(framework,name,id,value,placeholder)
{
	var str  = "";
	var type = "text";

 	if( framework=="" || framework=="-" )
	{
		str = "<input type='"+type+"' id='"+name+"' value='"+value+"' >";
	}
	
	if( framework=="bootstrap" )
	{
		str = "<div class='input-group'>";
	            str +="<span class='input-group-btn'>";
	                       str +="<i class='fa fa-file-text'></i></button>";
	                        str +="</span> ";
	                        s = "height:25px;font-size:0.8em;";
	                        str +="<input class='form-control' placeholder='"+placeholder+"'  type='"+type+"' id='"+name+"' value='"+value+"'  style='"+s+"' >";
	    str +="</div>";
	}
	
	return str;
}



function form_input_select(framework,str_select,name,id,dataArray,valueSelected)
{
	var str = selected = "";

	
	str=str+"<!-- Select Bootstrap -->";
    str=str+"<link rel='stylesheet' href='bootstrap/css/bootstrap-select.css'>";
    str=str+"<script src='js/jquery.min.1.11.3.js'></script>";
    str=str+"<script src='bootstrap/js/bootstrap-select.js'></script>";
  


	if( framework=="" || framework=="-" )
	{
			str = str +"<select id='"+id+"' name='"+name+"' class='form-control' >";
			for(i=0;i<count(dataArray);i++)
			{
				selected = "";
				if( valueSelected==dataArray[i] )
					selected = "selected";
				str = str + "<option "+selected+" >"+dataArray[i]+"</option>";				
			}
			str = str + "</select>";
	}


	if( framework=="bootstrap" )
	{
			s = "width:200px;height:25px;font-size:0.8em;"; //width:300px;
			str = str +"<select id='"+id+"' name='"+name+"' class='form-control select' data-live-search='true' title='"+str_select+"' style='"+s+"'>";
			for(i=0;i<count(dataArray);i++)
			{
				selected = "";
				if( valueSelected==dataArray[i] )
					selected = "selected";
				str = str + "<option "+selected+" >"+dataArray[i]+"</option>";				
			}
			str = str + "</select>";
	}
	//alert(str)

	return str;
}




function form_date(framework,name,id,value,placeholder)
{
	var str  = "";
	var type = "text";
	s = "height:25px;font-size:0.9em;";


	str=str+"<!-- Select Bootstrap -->";
    //str=str+"<link rel='stylesheet' href='plugins/datepickerdaterangepicker.css'>";
    str=str+"<link rel='stylesheet' href='plugins/datepicker/datepicker3.css'>";
    str=str+"<script src='js/jquery.min.1.11.3.js'></script>";
    str=str+"<script src='plugins/datepicker/bootstrap-datepicker.js'></script>";

 	if( framework=="" || framework=="-" )
	{
		str = "<input type='"+type+"' id='"+name+"' value='"+value+"' >";
	}
	
	if( framework=="bootstrap" )
	{
		 str = "<div class='form-group'>";
                str +="<div class='input-group'>";
                  str +="<div class='input-group-addon'  >";
                    str +="<i class='fa fa-calendar'></i>";
                  str +="</div>";
                  str +="<input class='form-control' placeholder='"+placeholder+"'  type='"+type+"' id='"+name+"' value='"+value+"'  style ='"+s+"' >";
                str +="</div>";
                 str +="<!-- /.input group -->";
   str +="</div>";
	}
	
	return str;
}


function form_input_textarea(framework,name,id,value,placeholder)
{
	var str  = "";
	//var type = "text";

 	if( framework=="" || framework=="-" )
	{
		str = "<textarea id='"+name+"' value='"+value+"' ></textarea>";
	}
	
	if( framework=="bootstrap" )
	{
		str = "<div class='input-group'>";
	            str +="<span class='input-group-btn'>";
	                       str +="<i class='fa fa-file-text'></i></button>";
	                        str +="</span> ";
	                        str +="<textarea class='form-control' placeholder='"+placeholder+"' id='"+name+"' value='"+value+"' > </textarea>";
	    str +="</div>";
	}
	
	return str;
}




function form_input_checkbox(framework,name,id,value,placeholder)
{
	var str  = "";
	var type = "checkbox";

 	if( framework=="" || framework=="-" )
	{
		str = "<input type='"+type+"' id='"+name+"' value='"+value+"' >";
	}
	
	if( framework=="bootstrap" )
	{
		
	                     str +="<input class='minimal' placeholder='"+placeholder+"'  type='"+type+"' id='"+name+"' value='"+value+"'   >";
	   
	}
	
	return str;
}






function form_boton_guadar(str_title,function_js)
{
		if( function_js!="" )
				function_js = "javascript:"+function_js + "()";

		return "<a href='"+function_js+"' class='btn btn-primary pull-center'  ><i class='fa save'></i>&nbsp;&nbsp;"+str_title+"</a>";
}


function form_boton_buscar(str_title,function_js)
{
		if( function_js!="" )
				function_js = "javascript:"+function_js + "()";

		return "<a href='"+function_js+"' class='btn btn-primary pull-center'  ><i class='fa-search'></i>&nbsp;&nbsp;"+str_title+"</a>";
}


function f_pestana(framework, tab, tab1, tab2, tab3, tab4, tab5, tab6, form_tab)

{
	
var str  = "";


 s = "height:25px;font-size:0.9em;";
if( framework=="bootstrap" )
	   {

 str =" 	<div class='row'  >	";
 //str +=" 	        <div class='col-md-6' >	";
 str +=" 	          <!-- Custom Tabs -->	";
 str +=" 	          <div class='nav-tabs-custom'  >	";
 str +=" 	            <ul class='nav nav-tabs' >	";
 str +=" 	              <li class='active'><a href='#tab_1' data-toggle='tab'>"+tab+" </a></li>	";
 str +=" 	              <li><a href='#tab_2' data-toggle='tab'>"+tab1+"</a></li>	";
 str +=" 	              <li><a href='#tab_3' data-toggle='tab'>"+tab2+"</a></li>	";
  str +=" 	              <li><a href='#tab_4' data-toggle='tab'>"+tab3+"</a></li>	";
  str +=" 	              <li><a href='#tab_5' data-toggle='tab'>"+tab4+"</a></li>	";
    str +=" 	              <li><a href='#tab_6' data-toggle='tab'>"+tab5+"</a></li>	";
  str +=" 	              <li><a href='#tab_7' data-toggle='tab'>"+tab6+"</a></li>	";
             
//str +=" 	              <li class='pull-right'><a href='#' class='text-muted'><i class='fa fa-gear' height= 'auto'></i></a></li>	";
 str +=" 	            </ul>	";
 str +=" 	            <div class='tab-content' height= 'auto'>	";
 str +=" 	              <div class='tab-pane active' id='tab_1' height= 'auto'>	"+form_tab+"</div>	";


 str +=" 	              <!-- /.tab-pane -->	";
 str +=" 	              <div class='tab-pane' id='tab_2' height= 'auto'>	";
 str +=" 	                The European languages are members of the same family. Their separate existence is a myth.	";

 str +=" 	              </div>	";
 str +=" 	              <!-- /.tab-pane -->	";
 str +=" 	              <div class='tab-pane' id='tab_3' height= 'auto'>	";
 str +=" 	                Lorem Ipsum is simply dummy text of the printing and typesetting industry.	";
 
 str +=" 	              </div>	";
 str +=" 	              <!-- /.tab-pane -->	";
 str +=" 	            </div>	";
 str +=" 	            <!-- /.tab-content -->	";
 //str +=" 	          </div>	";
 str +=" 	          <!-- nav-tabs-custom -->	";
 str +=" 	        </div>	";
 str +=" 	        <!-- /.col -->	";

    	   }
	
	return str;
}



function form_input_search(framework,name,id,value,placeholder)
{
	var str  = "";
	var type = "text"; 
	//s = "height:25px;font-size:10em;";


	 str=str+"<link rel='stylesheet' href='css/ionicons.min.css'> ";
	 //str=str+"<link rel='stylesheet' href='bootstrap/css/bootstrap.min.css'>";

 	if( framework=="" || framework=="-" )
	{
		str = "<input type='"+type+"' id='"+name+"' value='"+value+"' >";
	}
	
	if( framework=="bootstrap" )
	{
		str = "<div class='input-group margin'>";
					 str +="<input class='form-control' placeholder='"+placeholder+"'  type='"+type+"' id='"+name+"' value='"+value+"' >";
	           str +=" <span class='input-group-btn'>";
	          			  str +="<span class='btn btn-info btn-flat'>";
	                       str +="<i class='fa fa-search'></i>";
	              str +="</span> ";
	           
	                      
	                       
	    str +="</div>";
	}


	
	return str;
}


 
 function form_main(framework)
{
  var str  = "";
 

  str=str+"<link rel='stylesheet' href='css/ionicons.min.css'> ";
   
  
str=str+"<div >";
 str=str+" <section class='content-header'>";
         
      str += form_boton_guadar("Incluir","f_afiliacion_resultado");
      /*str=str+"<ol class='breadcrumb'>";
       str=str+"<li><a href='afiliacion_1_1 ()'><i class='fa fa-dashboard'></i>Incluir</a></li>";
        str=str+"<li><a href='#'><i class='fa fa-dashboard'></i>Modificar</a></li>";
        str=str+"<li><a href='#'><i class='fa fa-dashboard'></i>Actividades</a></li>";
        str=str+"<li><a href='#'><i class='fa fa-dashboard'></i>Alertas</a></li>";

       str=str+" <li class='active'></li>";
     str=str+" </ol>";*/
   
 str=str+" </section>";


  str=str+"</div>";

  return str;

}



 