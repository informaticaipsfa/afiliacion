/*
Desarrollado por  :  Victor Manuel Suarez
Correo            :  victormst@gmail.com
Fecha Creacion    :  26-06-2017  
Fecha Modificacion:  26-06-2017  
Descripcion       :  Generar menu via template
Dependencias      :  Utiliza funciones de php.js
*/




function generate_menu_V2()
{
	//Desplegar Menu
    var html      = "<li class='header'>Menú</li>";
    var function1 = ""; //Determina el nombre de la primera funcion
    var menuHijo  = menuHijos = "";
    var MenusName = new Array(); 
    var fin       = false ;
    var col       = 0;
    var parts     = new Array();



    var M  = MNU2;
    var Mi = new Array();
    //var M = new Array();
    for(i=0;i<count(M);i++)
    {
    	col = 0;
    	fin = false;
    	while( fin==false )
    	{
				//alert ( "Fil: "+i+" - Col: "+col+" = "+ M[i][col] + typeof(M[i][col]) )
				//alert ( "Fil: "+i+" - Col: "+col+" = "+ typeof(M[i][col]) )
				if( typeof(M[i][col])!="string" && typeof(M[i][col])!="object" )
						fin = true;
				else
				{
						if( typeof(M[i][col])=="string" ) //"Afiliacion:__PADRE__"   o   "Menu1:f1__1_1"
						{
							//PADRE NIVEL 1
							if( substr_count(M[i][col],"__PADRE__")>0 )
							{
								parts = explode(":",M[i][col]); //Afiliacion:__PADRE__
								html  = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+parts[0]+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";
							}
						}else
						if( typeof(M[i][col])=="object" ) //Array( "Menu1:f1__1_1" , "Menu2:f1__1_2"  )
						{
							//HIJO NIVEL 1
							Mi = M[i][col];
							html = html + "<ul class='treeview-menu'>";
							for( Hijo = 0; Hijo<count(Mi) ; Hijo++ )
							{
									if( typeof(Mi[Hijo])=="string" && substr_count(Mi[Hijo],"__PADRE__")==0 ) //"Menu1:f1__1_1" , "Menu2:f1__1_2"
									{
										parts = explode(":",Mi[Hijo]); //Menu1:f1__1_1
										html = html + "<li><a href='?"+parts[1]+"'><i class='fa fa-circle-o'></i> "+parts[0]+"</a></li>"; 

										if( function1=="" ) //Primera funcion en desplegar 
												function1 = parts[1];
									}else									
									if( typeof(Mi[Hijo])=="string" && substr_count(Mi[Hijo],"__PADRE__")>0 ) //"Menu Hijo:__PADRE__",
									{
										parts = explode(":",Mi[Hijo]); //Afiliacion:__PADRE__
										html  = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+parts[0]+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";
										
									}else
									if( typeof(Mi[Hijo])=="object" ) // MENU
									{
														Mi2 = Mi[Hijo]; //Hijo
														html  = html + "<ul class='treeview-menu'>";
														for( Hijo2 = 0; Hijo2<count(Mi2) ; Hijo2++ )
														{
																if( typeof(Mi2[Hijo2])=="string" && substr_count(Mi2[Hijo2],"__PADRE__")==0 ) //"Menu1:f1__1_1" , "Menu2:f1__1_2"
																{
																	parts = explode(":",Mi2[Hijo2]); //Menu1:f1__1_1
																	html = html + "<li><a href='?"+parts[1]+"'><i class='fa fa-circle-o'></i> "+parts[0]+"</a></li>";  
																}else									
																if( typeof(Mi2[Hijo2])=="string" && substr_count(Mi2[Hijo2],"__PADRE__")>0 ) //"Menu Hijo:__PADRE__",
																{
																	parts = explode(":",Mi2[Hijo2]); //Afiliacion:__PADRE__
																	html  = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+parts[0]+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";
																}
																else
																if( typeof(Mi2[Hijo2])=="object" ) // MENU NIETO
																{
																						Mi3 = Mi2[Hijo2]; //Hijo
																						html  = html + "<ul class='treeview-menu'>";
																						for( Hijo3 = 0; Hijo3<count(Mi3) ; Hijo3++ )
																						{
																								if( typeof(Mi3[Hijo3])=="string" && substr_count(Mi3[Hijo3],"__PADRE__")==0 ) //"Menu1:f1__1_1" , "Menu2:f1__1_2"
																								{
																									parts = explode(":",Mi3[Hijo3]); //Menu1:f1__1_1
																									html = html + "<li><a href='?"+parts[1]+"'><i class='fa fa-circle-o'></i> "+parts[0]+"</a></li>";  
																								}else									
																								if( typeof(Mi3[Hijo3])=="string" && substr_count(Mi3[Hijo3],"__PADRE__")>0 ) //"Menu Hijo:__PADRE__",
																								{
																									parts = explode(":",Mi3[Hijo3]); //Afiliacion:__PADRE__
																									html  = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+parts[0]+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";
																								}
																								else
																								if( typeof(Mi[Hijo])=="object" ) // MENU BISNIETO
																								{

																								}
																						}
																						html  = html + "</ul>";
																}
														}
														html  = html + "</ul>";
									}	
							}
							html = html + "</ul>";
						}
				}
				col++;
    	}
    } //fin for



    //if( VerificarMenuNombres(MenusName)==0 )
    	document.getElementById( "MNU_html" ).innerHTML = html;
    


    //Activar Funcion
    var url = document.URL;
    url_parts = explode("?",url);

    if( count(url_parts)==1 )
          eval( function1+"()" );
    else
        eval( url_parts[1]+"()" );
    
} //fin function




function generate_menu()
{
	//Desplegar Menu
    var html      = "<li class='header'>Menú</li>";
    var function1 = ""; //Determina el nombre de la primera funcion
    var menuHijo  = menuHijos = "";
    var MenusName = new Array(); 

    for(i=0;i<count(MNU);i++)
    {
        mnu_i = explode("|",MNU[i]) //Afiliación|Menu1:f1__1_1#Menu2:f1__1_2#SubPadreMenu4:[SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]

        title = mnu_i[0]; 

        html = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+title+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a>";

        mnu_i2 = explode("#",mnu_i[1]) //Menu1:f1__1_1#Menu2:f1__1_2#SubPadreMenu4:[SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]
        if( count(mnu_i2)>0 )
        {
            html = html + "<ul class='treeview-menu'>";
            for(j=0;j<count(mnu_i2);j++)
            {
                                                //SubPadreMenu4:[SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]
                mnu_i3 = explode(":",mnu_i2[j]) //Menu1:f1__1_1()

                //SubPadreMenu4:[SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]
                

                if( substr_count(mnu_i3[1], '[')==0 ) //NO tiene SubMenu Hijos  =>   Menu1:f1__1_1()
                {
                      //html = html + "<li><a href='javascript:"+mnu_i3[1]+"'><i class='fa fa-circle-o'></i> "+mnu_i3[0]+"</a></li>";
                      html = html + "<li><a href='?"+mnu_i3[1]+"'><i class='fa fa-circle-o'></i> "+mnu_i3[0]+"</a></li>";  
                      MenusName[count(MenusName)] = mnu_i3[1];
                }else //SI tiene SubMenu Hijos  =>   SubPadreMenu4:[SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]
                {
                      menuHijo  = str_replace ("[", "", mnu_i3[1] );  //SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo]
                      menuHijo  = str_replace ("]", "", menuHijo  );  //SubMenuHijo1:f1__1_1__hijo;SubMenuHijo2:f1__1_2__hijo
                      
                      // [0]=>SubMenuHijo1:f1__1_1__hijo 
                      // [1]=>SubMenuHijo2:f1__1_2__hijo

                      menuHijos = explode(";",menuHijo); 


                      html = html + "<li class='treeview'><a href='#'><i class='fa fa-dashboard'></i> <span>"+mnu_i3[0]+"</span><span class='pull-right-container'><i class='fa fa-angle-left pull-right'></i></span></a><ul class='treeview-menu'>";
                      for(z=0;z<count(menuHijos);z++)
                      {

                          menuHijo = explode("*",menuHijos[z]);  //SubMenuHijo1:f1__1_1__hijo 
                          html = html + "<li><a href='?"+menuHijo[1]+"'><i class='fa fa-circle-o'></i> "+menuHijo[0]+"</a></li>";
                          MenusName[count(MenusName)] = menuHijo[1];
                      }
                      html = html + "</ul></li>";
                }
                





                //Determina la funcion inicial del menu
                if( function1=="" )
                    function1 = mnu_i3[1];
            }  
            html = html + "</ul>";
        }
        html = html + "</li>";
    }

    //if( VerificarMenuNombres(MenusName)==0 )
    //	document.getElementById( "MNU_html" ).innerHTML = html;



    //Activar Funcion
    var url = document.URL;
    url_parts = explode("?",url);

    if( count(url_parts)==1 )
          eval( function1+"()" );
    else
        eval( url_parts[1]+"()" );
}




function VerificarMenuNombres(M)
{
	var str_i = "";
	var pos = 0;
	var bad = 0;
	for(i=0;i<count(M);i++)
	{
		str_i = M[i]; //Menu1
		pos   = i;
		for(j=0;j<count(M);j++)
		{
			if( str_i==M[j] && parseInt(pos)!=parseInt(j) )
			{
				alert( "Error - Funcions Iqual Name: "+M[j] )
				bad++;
			}
		}
	}

	return bad; 
}