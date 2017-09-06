/*
Desarrollado por  :  Victor Manuel Suarez
Correo            :  victormst@gmail.com
Fecha Creacion    :  24-06-2017  
Fecha Modificacion:  24-06-2017  
Descripcion       :  Generar vistas html
Dependencias      :  Utiliza funciones de php.js
*/


function html_colum2(porcentCol1,porcentCol2,str1,str2)
{
	var html = "";

	porcentCol2 = parseInt(porcentCol2)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 


	html = html +"<div style='"+css1+"' >"+str1+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str2+"</div>";
	html = html +"<div style='"+css3+"' ></div>";
	
	return html;
}



function html_colum4(porcentCol1,porcentCol2,porcentCol3,porcentCol4,str1,str2,str3,str4)
{
	var html = "";

	porcentCol2 = parseInt(porcentCol2)-1;
	porcentCol2 = parseInt(porcentCol4)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 


	html = html +"<div style='"+css1+"' >"+str1+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str2+"</div>";

	html = html +"<div style='"+css1+"' >"+str3+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str4+"</div>";	



	html = html +"<div style='"+css3+"' ></div>";
	
	return html;
}




function html_colum1(str1)
{
	var html = "";

    var css1 = "width:100%;clear:both;text-align:center;border:0px solid;height:40px;"; 

	html = html +"<div style='"+css1+"' ><center>"+str1+"</center></div>";
	
	return html;
}

function html_colum3(porcentCol1,porcentCol2,porcentCol3,str1,str2,str3)
{
	var html = "";

	porcentCol2 = parseInt(porcentCol2)-1;
	porcentCol2 = parseInt(porcentCol3)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 


	html = html +"<div style='"+css1+"' >"+str1+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str2+"</div>";

	html = html +"<div style='"+css1+"' >"+str3+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";


	html = html +"<div style='"+css3+"' ></div>";
	
	return html;
}

function html_colum5(porcentCol1,porcentCol2,porcentCol3,porcentCol4,porcentCol5,str1,str2,str3,str4,str5)
{
	var html = "";

	porcentCol2 = parseInt(porcentCol3)-1;
	porcentCol2 = parseInt(porcentCol5)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "width:"+porcentCol3+"%;float:left;text-align:left;border:0px solid;height:40px;"; 
    var css4 = "width:"+porcentCol4+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css5 = "width:"+porcentCol5+"%;float:left;border:0px solid;height:40px;"; 
    var cssC = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 

	html = html +"<div style='"+css1+"' >"+str1+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str2+"</div>";

	html = html +"<div style='"+css3+"' >"+str3+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css4+"' >"+str4+"</div>";	

	html = html +"<div style='"+css5+"' >"+str5+"</div>";

	html = html +"<div style='"+cssC+"' ></div>";
	
	return html;
}


function html_colum6(porcentCol1,porcentCol2,porcentCol3,porcentCol4,porcentCol5,porcentCol6,str1,str2,str3,str4,str5,str6)
{
	var html = "";

	porcentCol2 = parseInt(porcentCol2)-1;
	porcentCol2 = parseInt(porcentCol6)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "width:"+porcentCol3+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css4 = "width:"+porcentCol4+"%;float:left;border:0px solid;height:40px;"; 
    var css5 = "width:"+porcentCol5+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css6 = "width:"+porcentCol6+"%;float:left;border:0px solid;height:40px;"; 
    var cssC = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 


	html = html +"<div style='"+css1+"' >"+str1+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css2+"' >"+str2+"</div>";

	html = html +"<div style='"+css3+"' >"+str3+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css4+"' >"+str4+"</div>";	

	html = html +"<div style='"+css5+"' >"+str5+"</div>";
	html = html +"<div style='"+cssE+"' > </div>";
	html = html +"<div style='"+css6+"' >"+str6+"</div>";	



	html = html +"<div style='"+cssC+"' ></div>";
	
	return html;
}


function html_colum8(porcentCol1,porcentCol2,porcentCol3,porcentCol4,porcentCol5,porcentCol6,porcentCol7,porcentCol8,str1,str2,str3,str4,str5,str6,str7,str8)
{
    var html = "";

    porcentCol2 = parseInt(porcentCol3)-1;
    porcentCol2 = parseInt(porcentCol6)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "width:"+porcentCol3+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css4 = "width:"+porcentCol4+"%;float:left;border:0px solid;height:40px;"; 
    var css5 = "width:"+porcentCol5+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css6 = "width:"+porcentCol6+"%;float:left;border:0px solid;height:40px;"; 
    var css7 = "width:"+porcentCol7+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css8 = "width:"+porcentCol8+"%;float:left;border:0px solid;height:40px;"; 
    
    var cssC = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 

    html = html +"<div style='"+css1+"' >"+str1+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css2+"' >"+str2+"</div>";

    html = html +"<div style='"+css3+"' >"+str3+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css4+"' >"+str4+"</div>";   

    html = html +"<div style='"+css5+"' >"+str5+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css6+"' >"+str6+"</div>";   

    html = html +"<div style='"+css7+"' >"+str7+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css8+"' >"+str8+"</div>";

    html = html +"<div style='"+cssC+"' ></div>";
    
    return html;
}


function html_colum10(porcentCol1,porcentCol2,porcentCol3,porcentCol4,porcentCol5,porcentCol6,porcentCol7,porcentCol8,porcentCol9,porcentCol10,str1,str2,str3,str4,str5,str6,str7,str8,str9,str10)
{
    var html = "";

    porcentCol2 = parseInt(porcentCol3)-1;
    porcentCol2 = parseInt(porcentCol6)-1;

    var css1 = "width:"+porcentCol1+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css2 = "width:"+porcentCol2+"%;float:left;border:0px solid;height:40px;"; 
    var css3 = "width:"+porcentCol3+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css4 = "width:"+porcentCol4+"%;float:left;border:0px solid;height:40px;"; 
    var css5 = "width:"+porcentCol5+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css6 = "width:"+porcentCol6+"%;float:left;border:0px solid;height:40px;"; 
    var css7 = "width:"+porcentCol7+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css8 = "width:"+porcentCol8+"%;float:left;border:0px solid;height:40px;"; 
    var css9 = "width:"+porcentCol9+"%;float:left;text-align:right;border:0px solid;height:40px;"; 
    var css10 ="width:"+porcentCol10+"%;float:left;border:0px solid;height:40px;"; 
    
    var cssC = "clear:both;"; 
    var cssE = "width:1%;float:left;border:0px solid;height:40px;"; 

    html = html +"<div style='"+css1+"' >"+str1+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css2+"' >"+str2+"</div>";

    html = html +"<div style='"+css3+"' >"+str3+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css4+"' >"+str4+"</div>";   

    html = html +"<div style='"+css5+"' >"+str5+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css6+"' >"+str6+"</div>";   

    html = html +"<div style='"+css7+"' >"+str7+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css8+"' >"+str8+"</div>";

    html = html +"<div style='"+css9+"' >"+str9+"</div>";
    html = html +"<div style='"+cssE+"' > </div>";
    html = html +"<div style='"+css10+"' >"+str10+"</div>";

    html = html +"<div style='"+cssC+"' ></div>";
    
    return html;
}