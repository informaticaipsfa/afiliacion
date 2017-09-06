/*
Desarrollado por  :  Victor Manuel Suarez
Correo            :  victormst@gmail.com
Fecha Creacion    :  24-06-2017  
Fecha Modificacion:  25-06-2017  
Descripcion       :  Generar objetos de formularios: input text, select , textarea
Dependencias      :  Utiliza funciones de php.js
*/

function form_input_text(framework,name,id,value,placeholder,width,icon)
{
	var str  = style =  "";
	var type = "text";

    style = "style='width:200px'";
    if( width!="" )
    		style = "style='width:"+width+"px'";


 	if( framework=="" || framework=="-" )
	{
		str = "<input type='"+type+"' id='"+name+"' value='"+value+"' "+style+" >";
	}
	
	if( framework=="bootstrap" )
	{
		if( icon==true )
		{
				str = "<div class='input-group'>";
			            str = str+"<span class='input-group-btn'>";
			                       str = str+"<button type='button' class='btn btn-success' ><i class='fa fa-file-text'></i></button>";
			                        str = str+"</span> ";	
		}
		
	                        str = str+"<input class='form-control' placeholder='"+placeholder+"'  type='"+type+"' id='"+name+"' value='"+value+"' "+style+"  >";

	    if( icon==true )
	    	str = str+"</div>";
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
			str = str +"<select id='"+id+"' name='"+name+"' >";
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
			str = str +"<select id='"+id+"' name='"+name+"' class='selectpicker' data-live-search='true' title='"+str_select+"' style='width:300px;'>";
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



function form_boton_guadar(str_title,function_js)
{
		if( function_js!="" )
				function_js = "javascript:"+function_js + "()";

		return "<a href='"+function_js+"' class='btn btn-primary pull-center'  ><i class='fa save'></i>&nbsp;&nbsp;"+str_title+"</a>";
}
