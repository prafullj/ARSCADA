var krpanoplugin = function()
{
	"use strict";
    var local = this;  // save the 'this' pointer from the current plugin object
    var krpano = null;  // the krpano and plugin interface objects
    var plugin = null;
    var NS = "http://www.w3.org/2000/svg";
    var plugincanvas = null;        // optionally - a canvas object for graphic content
    //var plugincanvascontext = null;
    var pluginboxwidth; //overall width of plugin.
    var pluginboxheight; // overall height of the plugin.
    var version = "1.0"; //version number of the component.
    var nrows;          // number of rows specified by user in the table
    var columns;        // number of coulmns specified by the user in the table.
    var hidden=1;       // is the table collapsed?
    var curpage = 0;       // the current page number of table displayed.
    var npages = 1;        // total number of pages in table as calculated
    var leftarrow;         // character string "<" 
    var rightarrow;        // character string ">"
    var xarrow,xtext,xarrowwidth;         // character "x" to show/hide table
    var lefttext;          // the string showing "< page number"
    var righttext;         // the string showing "page number>"
    var pluginbox;         // svg object storing the plugin box.
    var tpluginbox;         // svg object storing the plugin box.
    var tableTitle;        // the string for title of the whole table at bottom.
    var title;             // svg object string title string. 
    var cellbackgroundcolour;

    var words = [];
    var myTextBox = [];
    var cellbox = [];
    //var targetcell = [];
    var headerText = [];
    var headerBox = [];
    var headerCell = [];
    var xcol =  [];
    var yrow =  [];
    var links = [];
    var trect; // target rectangle to minimize the table.
    var fiveSecTimer;
    var halfSecTimer;
    var ifound;//:int = 0;
    var ifndx = [];//int array	
    var mult = [];//float array of multiplication factors
    var deci = [];//# deciml points//:Array = new Array();
	var typ=[];
    var cells;// :int;	
    var statecolours = [] ;
    var stateblink = [];
    var statelabel=[];
    var state = [];
    var blinkcount = 0,inalarm=0;
    var ack = [];
	
    var pipe = "|";
    var nlc = "\n";
    var rtn = "\r";
    var tab = "\t";
    var at = "@";
	var varattr=[],alarm,inalarm=0;
    var opacity,halfopacity;;
    //var space = " ";
    // registerplugin - startup point for the plugin (required)
    // - krpanointerface = krpano interface object
    // - pluginpath = string with the krpano path of the plugin (e.g. "plugin[pluginname]")
    // - pluginobject = the plugin object itself (the same as: pluginobject = krpano.get(pluginpath) )
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
    {
        krpano = krpanointerface;
        plugin = pluginobject;
        plugin.registerattribute("ver","0");
        plugin.registerattribute("tabletags","[default]Tag 0;[default]Tag 102;[default]Tag 2;[default]Tag 3;[default]Tag 0;[default]Tag 102;[default]Tag 2;[default]Tag 3");
        plugin.registerattribute("rows","4");
        plugin.registerattribute("columns","5");
        plugin.registerattribute("colword","1,1,0,0x000000:0:2,1,1,0x000000:0:0");
        plugin.registerattribute("xstart","10");
        plugin.registerattribute("ystart","10");
        plugin.registerattribute("bordercolour","0x000000");
        plugin.registerattribute("borderthickness","2");
        plugin.registerattribute("headercolour","0x0000FF");
        plugin.registerattribute("cellbackgroundcolour","0xFFFF00");
        plugin.registerattribute("fcolour","0xFF0000");
        plugin.registerattribute("xarrowcolour","0xFFFF00");
        plugin.registerattribute("fnt","5");
        plugin.registerattribute("fsiz","2");
        plugin.registerattribute("opacity","1.0");
        plugin.registerattribute("pluginbordercolour","0x000000");
        plugin.registerattribute("pluginfillcolour","0x0000FF");
        plugin.registerattribute("state0colour","0xFFFF00");
        plugin.registerattribute("state1colour","0xFFA500");
        plugin.registerattribute("state2colour","0xFF0000");
        plugin.registerattribute("state3colour","0x8A2BE2");
        plugin.registerattribute("state4colour","0x0000FF");
        plugin.registerattribute("state5colour","0xFFFF00");
        plugin.registerattribute("state6colour","0xFFA500");
        plugin.registerattribute("state7colour","0xFF0000");
        plugin.registerattribute("state8colour","0x8A2BE2");
        plugin.registerattribute("state9colour","0x0000FF");
        plugin.registerattribute("state0blink", "0");
        plugin.registerattribute("state1blink", "1");
        plugin.registerattribute("state2blink", "2");
        plugin.registerattribute("state3blink", "1");
        plugin.registerattribute("state4blink", "2");
        plugin.registerattribute("state5blink", "0");
        plugin.registerattribute("state6blink", "1");
        plugin.registerattribute("state7blink", "2");
        plugin.registerattribute("state8blink", "1");
        plugin.registerattribute("state9blink", "2");
        plugin.registerattribute("state0", "state0");
        plugin.registerattribute("state1", "state1");
        plugin.registerattribute("state2", "state2");
        plugin.registerattribute("state3", "state3");
        plugin.registerattribute("state4", "state4");
        plugin.registerattribute("state5", "state5");
        plugin.registerattribute("state6", "state6");
        plugin.registerattribute("state7", "state7");
        plugin.registerattribute("state8", "state8");
        plugin.registerattribute("state9", "state9");
        // say hello
        //krpano.trace(1,"hello from plugin[" + plugin.name + "] " + plugin.ttitle);
        //krpano.trace(1,"hello from plugin[" + plugin.name + "] " + pluginpath);
        // add plugin graphic content (optionally)
        var havegraphiccontent = true;
        // no handcursor over the radar
        plugin.handcursor = false;
        if (havegraphiccontent) // this code here is only an example for how-to add addtional graphical content!
        {
            plugin.registercontentsize(512,512);
            plugincanvas = document.createElementNS(NS, "svg");//plugincanvas = document.createElement("canvas");
            plugincanvas.style.width  = "100%";  // automatic scale with parent
            plugincanvas.style.height = "100%";
            plugin.sprite.appendChild(plugincanvas);
            var v = Number(plugin.ver);
            if(v == 1) krpano.trace(1,"hello from plugin[" + plugin.name + "] version = " + version);               

            words.length = 0;
            //plugin.tfin = plugin.tfin.replace(pipe, "");
            //plugin.colvars = plugin.colvars.replace(nlc, "");
            //plugin.colvars = plugin.colvars.replace(rtn, "");
            //plugin.colvars = plugin.colvars.replace(tab, "");
            //coltemparray = coltempstr.split(":");
            //columns = parseInt(plugin.columns);
			columns=5;
            //krpano.trace(1," columns " + columns );
            if(columns<1) columns = 1;
            //krpano.trace(1,"columns="+columns);
			var tablevars=plugin.tabletags;
			var tablevars1=[];
			tablevars1=tablevars.split(";");
			//if(tablevars1.length>20) tablevars1.length=20;
			var colvars="SrNo;Tag;Drscription;Units;Status";
			var rows=tablevars1.length;
			for (var i=0;i<rows;i++){
				varattr=getattr(tablevars1[i]).split(",");//type+def+unit+width+deci;
				//console.log(tablevars1[i],varattr[1],varattr[2]);
				colvars+=";"+(i+1)+";"+tablevars1[i]+";"+varattr[1]+";"+varattr[2]+";@"+tablevars1[i];
				typ[i]=varattr[0];
			}
			//console.log("colvars="+colvars);
            words = colvars.split(";");
            var len = words.length;
            if (words[len-1] == "") words.length = len - 1;
            var tempstr = [];

            // get first entries as column header names
            for (var i = 0; i < columns; i++)
            {
                // split the heading if there is any : symbol for krpano command.
                tempstr = words[i].split(":");
                headerText[i] = tempstr[0];
            }
            for (i=0;i<columns;i++) words.shift();
            tempstr.length = 0;
            //krpano.trace(1," words after shift " + words);
            // draw the table now.
            drawTable(); 
        }
    };

    local.unloadplugin = function()
    {
        //var i;
        //for (i = 0; i < cells ; i++) {
        //        if (links[i] != "")
        //        {
                    //targetcell[i].removeEventListener('click', upClick);
                    //targetcell[i].removeEventListener('mouseover', overHandler);
                    //targetcell[i].removeEventListener('mouseout', outHandler); 
        //        }        
        //}
        
       tpluginbox.removeEventListener('click', hideClick);
       tpluginbox.removeEventListener('mouseover', overHandler);
       tpluginbox.removeEventListener('mouseout', outHandler); 
        
                
        /*xarrow.removeEventListener('click', hideClick);
        xarrow.removeEventListener('mouseover', overHandler);
        xarrow.removeEventListener('mouseout', outHandler); */
        
        if(npages>1)
        {
            leftarrow.removeEventListener('click', LAupClick);
            leftarrow.removeEventListener('mouseover', overHandler);
            leftarrow.removeEventListener('mouseout', outHandler); 

            rightarrow.removeEventListener('click', RAupClick);
            rightarrow.removeEventListener('mouseover', overHandler);
            rightarrow.removeEventListener('mouseout', outHandler);
        }
       /* 
        trect.removeEventListener('click', hideClick);
        trect.removeEventListener('mouseover', overHandler);
        trect.removeEventListener('mouseout', outHandler); 
*/
        if(ifound ==1) {
            clearInterval(fiveSecTimer);
            clearInterval(halfSecTimer);
        }
        
        plugin = null;
        krpano = null;
 //       if(ifound ==1) fiveSecTimer.removeEventListener(TimerEvent.TIMER, onTick);
    };
    function overHandler(evt)
    {
        plugin.handcursor = true;
            //Mouse.cursor="button";
    }
    function outHandler(evt)
    {
        plugin.handcursor = false;
          //Mouse.cursor="arrow";
    }
    function upClick(evt)
    {
        var x;
        var y;
        var indx = -1;
        var i=0;
        var j=0;
       // x = krpano.mouse.x;// evt.clientX - plugin.x;
       // y = krpano.mouse.y;//evt.clientY - plugin.Y;
       //plugin.visible = false;
       return;
        /* var ob = plugin.getmouse();
        x=ob.x;
        y=ob.y;
        i = 0;	
        while(i < nrows && indx < 0)
        {
            j = 0;
            while( j< columns && indx < 0)
            {		
                //krpano.trace(1, " cell bounds " + xcol[j] + "," + xcol[j + 1] + "|" + yrow[i] + "," + yrow[i + 1]);
                if (x > xcol[j] && x <  xcol[j + 1] && y > yrow[i] && y < yrow[i + 1])
                {	
                        indx = curpage * nrows * columns + i * columns + j;	
                };
                j++;
            };
            i++;
        };
        //krpano.trace(1, "x,y,curpage, Indx links =" + x + "," + y + " " +  curpage + " "+ indx + " " + links[indx]);
        gotofunction(links[indx],indx); */
    }
        function hideClick()
    {
        if(hidden != 0)
        {
            disppage();
            hidden = 0;	
        }
        else
        {
            hidepage();
            hidden = 1; 	                  
        }
    }
    function LAupClick(evt)
    {			
            curpage--;
            if (curpage == 0) 
            {
				leftarrow.setAttribute("visibility","hidden");
            }
            else
            {
                lefttext = String("<" + curpage);
                leftarrow.firstChild.nodeValue = lefttext;
            }
            rightarrow.setAttribute("visibility","visible");
            righttext =  String ((curpage + 2) + ">");
            rightarrow.firstChild.nodeValue = righttext;
            disppage();
    }

    function RAupClick(evt)
    {
            curpage++;
            if (curpage == npages - 1) 
            {
                rightarrow.setAttribute("visibility","hidden");
            }
            else
            {
                    righttext = String ((curpage + 2) + ">");
                    rightarrow.firstChild.nodeValue = righttext;
            }
            leftarrow.setAttribute("visibility","visible");
            lefttext = "<" + curpage;           
            leftarrow.firstChild.nodeValue = lefttext;//krpano.view.hlookat + "";
            disppage();
    }
        
    function disppage()
    {        
      //  plugin.registercontentsize(pluginboxwidth,pluginboxheight);
        for (var k = 0; k < npages; k++)
        {
            var kk = k * nrows * columns;
            for (var i = 0; i < nrows; i++)
            {
                var ii = i * columns;
                for (var j = 0; j < columns; j++) 
                {
                    var indx = kk + ii + j;
                    if (k != curpage)
                    {
                       // krpano.trace(1,"making invisible " + indx + "on page" + curpage);
                        myTextBox[indx].setAttribute("visibility","hidden");
                        cellbox[indx].setAttribute("visibility","hidden");
                        //targetcell[indx].setAttribute("visibility","hidden");
                    }
                    else 
                    {
                      //  krpano.trace(1,"making visible " + indx + "on page" + curpage);
                      //  krpano.trace(1," coord " + myTextBox[indx].x + " " + myTextBox[indx].y + " " + myTextBox[indx].width + " " + myTextBox[indx].height);
                        //targetcell[indx].setAttribute("visibility","visible");
                        cellbox[indx].setAttribute("visibility","visible");
                        myTextBox[indx].setAttribute("visibility","visible");                                                                          
                    }                                   
                }
            }
        }       
        if(curpage>0) leftarrow.setAttribute("visibility","visible");
        if(curpage<npages-1) rightarrow.setAttribute("visibility","visible");
        pluginbox.setAttribute("visibility","visible");     
        if(title!=null ) title.setAttribute("visibility","visible");
        for(i=0;i<columns;i++) 
        {
            headerCell[i].setAttribute("visibility","visible");     
            headerBox[i].setAttribute("visibility","visible");
        }
		xarrow.setAttribute("fill-opacity",opacity);
        xarrow.firstChild.nodeValue = "";	
        plugin.registercontentsize(pluginboxwidth,pluginboxheight);
    }    
    function hidepage()
    {        
       // plugin.registercontentsize(10,10);
        for (var k = 0; k < npages; k++)
        {
            var kk = k * nrows * columns;
            for (var i = 0; i < nrows; i++)
            {
                var ii = i * columns;
                for (var j = 0; j < columns; j++) 
                {
                    var indx = kk + ii + j;
                    //targetcell[indx].setAttribute("visibility","hidden");
                    cellbox[indx].setAttribute("visibility","hidden");
                    myTextBox[indx].setAttribute("visibility","hidden");
                }
            }
        }
        if(npages>1)
        {
            leftarrow.setAttribute("visibility","hidden");
            rightarrow.setAttribute("visibility","hidden");
        }
        pluginbox.setAttribute("visibility","hidden");			
        if(title!=null) title.setAttribute("visibility","hidden");
        for(i=0;i<columns;i++) 
        {
            headerCell[i].setAttribute("visibility","hidden");     
            headerBox[i].setAttribute("visibility","hidden");
        }
        //tpluginbox.setAttribute("visibility","hidden");
		xarrow.setAttribute("fill-opacity",opacity);
        xarrow.firstChild.nodeValue = plugin.name;//"[mtable]";	
        plugin.registercontentsize(xarrowwidth,15);
    }
    function gotofunction(str, ind)
    {
    // call krpano actions
        //krpano.trace(1, "indx ="+ind);
        /*if (str.charAt(0)== "$")
        { 
            str = str.replace(/\$/g, "");
            ExternalInterface.call("putval", str);
            //krpano.trace(1, "putval called=" + str);
        }
        else*/
        //{
            if(str!=""){
            str = str.replace(pipe, ";");
            //str = str + ";";
            krpano.call(str);
            }
            ack[ind] = !ack[ind];
        //}
    }
    /* not needed
    local.hittest = function(x,y)
    {
        return true;
    }
    */
    
    local.onresize = function(width,height)
    {
        return false;
    };
    
	function drawTable()
	{
        var colwidth =  [];
        var colheight;
        var colword =  [];
        var collen = [];
        var titleword =  [];
        var tempstr = [];
        var tempstr1 = [];
        var len;
        var i;
        var j;
        //var itemp;
        var indx;
        var xstart;
        var ystart;
        var xpad;
        var ypad;
        var bordercolour;
        var borderthickness;
        var headercolour;
        var fcolour;
        var fnt;
        var fsiz;
        var pluginboxfillcolour;
        var pluginboxbordercolour;
        var tablewidth;
        var bold;
        var underline;
        var italic;
        var formatcolour;
        var formatbold;
        var formatitalic;
        var formatunderline;
        var formatfont;
        var formatsize;
        // parse for 0x and replace with #
        plugin.colword=plugin.colword.replace(/0x/gi,"#");
        plugin.headercolour=plugin.headercolour.replace(/0x/gi,"#");
        plugin.cellbackgroundcolour=plugin.cellbackgroundcolour.replace(/0x/gi,"#");
        plugin.fcolour=plugin.fcolour.replace(/0x/gi,"#");
        plugin.xarrowcolour=plugin.xarrowcolour.replace(/0x/gi,"#");
        plugin.bordercolour=plugin.bordercolour.replace(/0x/gi,"#");
        plugin.pluginbordercolour=plugin.pluginbordercolour.replace(/0x/gi,"#");
        plugin.pluginfillcolour=plugin.pluginfillcolour.replace(/0x/gi,"#");
        plugin.state0colour=plugin.state0colour.replace(/0x/gi,"#");
        plugin.state1colour=plugin.state1colour.replace(/0x/gi,"#");
        plugin.state2colour=plugin.state2colour.replace(/0x/gi,"#");
        plugin.state3colour=plugin.state3colour.replace(/0x/gi,"#");
        plugin.state4colour=plugin.state4colour.replace(/0x/gi,"#");
        plugin.state5colour=plugin.state5colour.replace(/0x/gi,"#");
        plugin.state6colour=plugin.state6colour.replace(/0x/gi,"#");
        plugin.state7colour=plugin.state7colour.replace(/0x/gi,"#");
        plugin.state8colour=plugin.state8colour.replace(/0x/gi,"#");
        plugin.state9colour=plugin.state9colour.replace(/0x/gi,"#");
        
        statecolours[0]=plugin.state0colour;
        statecolours[1]=plugin.state1colour;
        statecolours[2]=plugin.state2colour;
        statecolours[3]=plugin.state3colour;
        statecolours[4]=plugin.state4colour;
        statecolours[5]=plugin.state5colour;
        statecolours[6]=plugin.state6colour;
        statecolours[7]=plugin.state7colour;
        statecolours[8]=plugin.state8colour;
        statecolours[9]=plugin.state9colour;
        
        stateblink[0]=parseInt(plugin.state0blink);
        stateblink[1]=parseInt(plugin.state1blink);
        stateblink[2]=parseInt(plugin.state2blink);
        stateblink[3]=parseInt(plugin.state3blink);
        stateblink[4]=parseInt(plugin.state4blink);
        stateblink[5]=parseInt(plugin.state5blink);
        stateblink[6]=parseInt(plugin.state6blink);
        stateblink[7]=parseInt(plugin.state7blink);
        stateblink[8]=parseInt(plugin.state8blink);
        stateblink[9]=parseInt(plugin.state9blink);
        
        opacity=parseFloat(plugin.opacity);
		halfopacity=0.5*opacity;
              
        statelabel[0]=plugin.state0;
        statelabel[1]=plugin.state1;
        statelabel[2]=plugin.state2;
        statelabel[3]=plugin.state3;
        statelabel[4]=plugin.state4;
        statelabel[5]=plugin.state5;
        statelabel[6]=plugin.state6;
        statelabel[7]=plugin.state7;
        statelabel[8]=plugin.state8;
        statelabel[9]=plugin.state9;
        
        //words.length = 0;
        //colword.length = 0;
        colheight = 0;
        nrows = parseInt(plugin.rows);
        //krpano.trace(1, "nrows = " + nrows);
        if (nrows < 1) nrows = 1;
        colheight = 0.0;
        colword = plugin.colword.split(":");
        //columns = parseInt(colword[0]);
        //krpano.trace(1, " columns " + columns);
        //if (columns < 1) columns = 1;
        xstart = parseInt(plugin.xstart);
        ystart = parseInt(plugin.ystart);
        //if (ystart <10) ystart =10;
        xpad=0;//xpad = parseInt(plugin.xpad);
        ypad=0;//ypad = parseInt(plugin.ypad);
        if(xpad<5.0) xpad=5.0;
        if(ypad<5.0) ypad=5.0;
        bordercolour = plugin.bordercolour;// borderword [0];//colour attribute; no parseInt required
        borderthickness = parseInt(plugin.borderthickness);
        if (borderthickness < 1) borderthickness = 1;
        if (borderthickness > 5) borderthickness = 5;
        headercolour = plugin.headercolour; //colour attribute no parseInt
        cellbackgroundcolour = plugin.cellbackgroundcolour;//colour attribute no parseInt
        //krpano.trace(1,cellbackgroundcolour);
        fcolour = plugin.fcolour; //colour
        fnt = parseInt(plugin.fnt);
        fsiz = parseInt(plugin.fsiz);
        pluginboxbordercolour=plugin.pluginbordercolour;
        pluginboxfillcolour=plugin.pluginfillcolour;
        tableTitle = plugin.ttitle;
        //for(i=0;i<columns;i++) words[i].shift();
        len = words.length;
        npages = Math.ceil(len  / columns / nrows );
		cells = npages * nrows * columns;
        //krpano.trace(1, "npages,len = " + npages + len);
        for (i = 0; i < len  ; i++)
        {
            links[i] = "";
            ack[i] = false;
            state[i] = 0;
        }
        for (i = 0; i < len  ; i++)
        {
            tempstr = words[i].split(":");
            if (tempstr.length > 1)
            {
                links[i] = tempstr[1];
                links[i] = links[i].trim();
            }
            words[i] = tempstr[0];
            if (words[i].length > 0) 
            {
                ifndx[i] = 0;
                for (ii = 0; ii < words[i].length; ii++)  if (words[i].charAt(ii) != " ") { ifndx[i] = 1; break; }
                if (ifndx[i] == 1 && words[i].charAt(ii) == "@") 
                { 
                    ifndx[i] = 1; ifound = 1;
                    if(links[i] == "") links[i] = " ";
                    tempstr1 = words[i].split("|"); 
                    words[i] = tempstr1[0]; 
                    mult[i] = 1.0;
                    deci[i] = parseInt(varattr[4]);
                    if (tempstr1.length > 1) { deci[i] = parseInt(tempstr1[1]); if(deci[i] < 0) deci[i]=-2}
                    if (tempstr1.length > 2) { mult[i] =  parseFloat(tempstr1[2]); if (mult[i] == 0.0) mult[i] = 1.0 }
                }
                else { ifndx[i] = 0; mult[i] = 1.0; deci[i] = 0}
                //krpano.trace(1, ifndx[i]);
            }
        }
        //krpano.trace(1,words);
        if (len < npages*nrows*columns  )
        {
            for (i = len; i < npages*nrows*columns ; i++) {
                words[i] = " ";
                links[i] = "";
                ifndx[i] = 0;
                mult[i] = 1.0; 
                deci[i] = 0;
                state[i] = 0;
                ack[i] = false;
            }
        }
        //krpano.trace(1, "word length = " + words.length);
        var colformat = [];
        var coljust = [];
        var colbold = [];
        var colitalic = [];
        var colcolour = [];
        //coljust.length = columns;
        //colbold.length = columns;
        //colitalic.length = columns;
        //colcolour.length = columns;
        //colformat.length = columns;
        //colwidth.length = columns;

        for (i = 0; i < columns; i++) { coljust[i] = 0; colbold[i] = 0;  colitalic[i] = 0; colcolour[i] = 0; ; colwidth[i] = 0; };//vscale[i] = 0.0; }
        //krpano.trace(1, "colword length " + colword.length);
        if (colword.length > 0) 
        {
            for (i = 0; i < colword.length; i++)
            {
                //colformat.length = 0;
                colformat = colword[i].split(",");
                //krpano.trace(1, "colformat " + colformat);
                if (colformat.length > 0)
                {
                    //krpano.trace(1, colword.length);
                    coljust[i] = parseInt(colformat[0]);
                    //krpano.trace(1, colword.length);
                    if (colformat.length > 1) colbold[i] = parseInt(colformat[1]);
                    //krpano.trace(1, colword.length);
                    if (colformat.length > 2) colitalic[i] = parseInt(colformat[2]);
                    //krpano.trace(1, colword.length);
                    if (colformat.length > 3) colcolour[i] = colformat[3];
                    //
                    //if (colformat.length > 4 ) 
                    //{ 
                        //ignore remaining fields if any.
                    //}
                }
            }
        }
        len = nrows * columns * npages;
        //krpano.trace(1," len=" + len)
        if (fnt == 1) formatfont = "Times New Roman";
        else if (fnt == 2) formatfont = "Arial";
        else if (fnt == 3) formatfont = "Calibri";
        else if (fnt == 4) formatfont = "Sans-Serif";
        else if (fnt == 5) formatfont = "Verdana";
        else if (fnt == 6) formatfont = "Century";
        else formatfont = "Arial";
        if (fsiz == 1) formatsize = 10;
        else if (fsiz == 2) formatsize = 11;
        else if (fsiz == 3) formatsize = 12;
        else if (fsiz == 4) formatsize = 14;
        else if (fsiz == 5) formatsize = 16;
        else if (fsiz == 6) formatsize = 18;
        else formatsize = 10;
        formatcolour = fcolour;
        formatbold = "normal";
        //krpano.trace(1,"fnt,fsiz,formatcolour,formatbold" + fnt + fsiz + formatcolour + formatbold );
        //if (ystart < 10)  ystart = 10;
        xcol[0] = xstart;
        yrow[0] = ystart;
        tablewidth = 0;
        //krpano.trace(1,"xcol, yrow =" + xstart + ystart);
        for (j = 0; j < columns; j++)
        {
            //krpano.trace(1,"j =" + j);
            collen[j] = headerText[j].length;
            //itemp = -1;
            for (i = 0; i < nrows*npages; i++) 
            {
                var words1=words[i*columns+j];
                for (var k1 = 0; k1 < words1.length; k1++) if (words1.charAt(k1) != " ") break;
                if (k1 < words1.length && words1.charAt(k1) == "@") {
                    /*var pos = words1.lastIndexOf("/"); 
                    if(pos>0) words1=words[i*columns+j].substring(pos+1);
                    else {                        
                        var pos = words1.lastIndexOf("]"); 
                        if(pos>0) words1=words[i*columns+j].substring(pos+1)+"    ";
                    }*/
                }
                //krpano.trace(1,"pos, str="+pos+","+words1);
                //krpano.trace(1,"i =" + i);
               if (words1.length > collen[j])
               {
                    collen[j] = words1.length+2;
                    //krpano.trace(1,"collen " + collen[j]);
                    //itemp = i;
               }
            }
            //krpano.trace(1,"itemp = "+itemp);
           // temptext = words[itemp*columns+j];
            //var temptext; //store and measure maximum column width in pixels.
            //if (itemp < 0) temptext = headerText[j];
            //else temptext = words[itemp * columns + j];
           //if(colwidth[j] == 0)
            //{
            colwidth[j] = Math.round(collen[j]*formatsize*0.65) + xpad;
            //    krpano.trace(1," width[j] =" + colwidth[j]);
           // }
            //colheight = formatsize*1.1 + ypad;
            xcol[j + 1] = xcol[j] + colwidth[j];
        }
        if (colheight == 0) colheight = formatsize*1.2 + ypad;
        xarrowwidth = Math.round(plugin.name.length*formatsize*0.65)
        for (j=0;j<columns;j++) 
        {
                formatcolour = colcolour[j];
                headerCell[j]= document.createElementNS(NS, "rect");
                headerCell[j].setAttribute( "x", xcol[j]);
                headerCell[j].setAttribute( "y", yrow[0]);
                headerCell[j].setAttribute( "width",  colwidth[j]);
                headerCell[j].setAttribute( "height",  colheight);
                headerCell[j].setAttribute( "stroke-width", borderthickness );
                headerCell[j].setAttribute( "stroke", bordercolour );
                headerCell[j].setAttribute( "fill",  headercolour );
				headerCell[j].setAttribute( "stroke-opacity",  opacity );
				headerCell[j].setAttribute( "fill-opacity",  opacity );
				if(hidden==0) headerCell[j].setAttribute("visibility","visible");
				else  headerCell[j].setAttribute("visibility","hidden");
               
                headerBox[j] = document.createElementNS(NS, "text");
               if (coljust[j] == 0)
               {
                    headerBox[j].setAttribute( "text-anchor",  "start");
                    headerBox[j].setAttribute( "x", xcol[j]+xpad);
                    headerBox[j].setAttribute( "y", yrow[0]+colheight/2.0+ypad);//colheight-ypad);
               }
               else if (coljust[j] == 1)
               {
                    headerBox[j].setAttribute( "text-anchor",  "middle");
                    headerBox[j].setAttribute( "x", xcol[j] + colwidth[j]/2);
                    headerBox[j].setAttribute( "y", yrow[0]+colheight/2.0+ypad);//colheight-ypad);
               } 
               else if (coljust[j] == 2)
               {
                    headerBox[j].setAttribute( "text-anchor",  "end");
                    headerBox[j].setAttribute( "x", xcol[j]+colwidth[j]-xpad);
                    headerBox[j].setAttribute( "y", yrow[0]+colheight/2.0+ypad);//
               }
                if(colitalic[j]==1)  headerBox[j].setAttribute( "font-style",  "italic" );
                headerBox[j].setAttribute( "font-size",  formatsize);
                headerBox[j].setAttribute( "font-family",  formatfont);
                headerBox[j].setAttribute( "fill",  0);
                headerBox[j].setAttribute( "font-weight",  "bold");
                headerBox[j].setAttribute( "width",  colwidth[j]);
                headerBox[j].setAttribute( "height",  colheight);
				if(hidden==0) headerBox[j].setAttribute("visibility","visible");
				else  headerBox[j].setAttribute("visibility","hidden");
                //headerBox[j].setAttribute( "stroke-width", borderthickness );
                //headerBox[j].setAttribute( "stroke", bordercolour );
              // if(i==0) myTextBox[indx].setAttribute( "fill",  headercolour );
              // else myTextBox[indx].setAttribute( "fill",  cellbackgroundcolour );
               var headerTextNode;// =  new  Array();
               headerTextNode = document.createTextNode(headerText[j]);
               headerBox[j].appendChild(headerTextNode); 
               plugincanvas.appendChild(headerCell[j]);
               plugincanvas.appendChild(headerBox[j]);
        }
        //krpano.trace(1,"colh, colw " + colheight + " " + colwidth);
        var k;
        yrow[0]+=colheight;
        for (k = 0; k < npages; k++)
        {
            for (i = 0; i < nrows; i++)
            {
                //if(i==0&&k==0) yrow[k*nrows + i + 1] = yrow[i] + temptext.textHeight + ypad;
                yrow[k*nrows + i + 1] = yrow[i] + colheight;
            }
        }
        for (k=0; k<npages; k++)
        {
            var kk;
            kk = k*nrows*columns;
            for (i = 0; i < nrows; i++)
            {
                var ii;
                ii = i * columns;
                    for (j = 0; j < columns; j++) 
                    {
                        indx = kk + ii + j;
                        //krpano.trace(1,"kk,ii,i,indx =" + kk + " " + ii + " " + j +" " + indx);
                        if (colbold[j] == 1) formatbold = "bold";
                        else formatbold = "normal";
                        formatcolour = colcolour[j];
                        cellbox[indx]= document.createElementNS(NS, "rect");
                        cellbox[indx].setAttribute( "x", xcol[j]);
                        cellbox[indx].setAttribute( "y", yrow[i]);
                        cellbox[indx].setAttribute( "width",  colwidth[j]);
                        cellbox[indx].setAttribute( "height",  colheight);
                        cellbox[indx].setAttribute( "stroke-width", borderthickness );
                        cellbox[indx].setAttribute( "stroke", bordercolour );
                        cellbox[indx].setAttribute( "fill",  cellbackgroundcolour );
						cellbox[indx].setAttribute( "stroke-opacity",  opacity );
						cellbox[indx].setAttribute( "fill-opacity",  opacity );
						if(hidden==0) cellbox[indx].setAttribute( "visibility",  "visible" );
						else cellbox[indx].setAttribute( "visibility",  "visible" );
                        //targetcell[indx]= document.createElementNS(NS, "rect");
                        //targetcell[indx].setAttribute( "x", xcol[j]);
                        //targetcell[indx].setAttribute( "y", yrow[i]);
                        //targetcell[indx].setAttribute( "width",  colwidth[j]);
                        //targetcell[indx].setAttribute( "height",  colheight);
                        //targetcell[indx].setAttribute( "fill-opacity",  0.0);
                       // targetcell[indx].setAttribute( "fill",  0);
                        //
                        myTextBox[indx] = document.createElementNS(NS, "text");
                        if (coljust[j] == 0)
                        {
                            myTextBox[indx].setAttribute( "text-anchor",  "start");
                            myTextBox[indx].setAttribute( "x", xcol[j]+xpad);
                            myTextBox[indx].setAttribute( "y", yrow[i]+colheight/2.0+ypad);//colheight-ypad);
                        }
                        else if (coljust[j] == 1)
                        {
                            myTextBox[indx].setAttribute( "text-anchor",  "middle");
                            myTextBox[indx].setAttribute( "x", xcol[j] + colwidth[j]/2);
                            myTextBox[indx].setAttribute( "y", yrow[i]+colheight/2.0+ypad);//colheight-ypad);
                        }
                        else if (coljust[j] == 2) 
                        {
                            myTextBox[indx].setAttribute( "text-anchor",  "end");
                            myTextBox[indx].setAttribute( "x", xcol[j]+colwidth[j]-xpad);
                            myTextBox[indx].setAttribute( "y", yrow[i]+colheight/2.0+ypad);//
                        }
                        if(colitalic[j]==1) myTextBox[indx].setAttribute( "font-style",  "italic" );
                        myTextBox[indx].setAttribute( "font-size",  formatsize);
                        myTextBox[indx].setAttribute( "font-family",  formatfont);
                        myTextBox[indx].setAttribute( "fill",  formatcolour);
                        myTextBox[indx].setAttribute( "font-weight",  formatbold);
                        if(hidden==0) myTextBox[indx].setAttribute( "visibility",  "visible");
						else myTextBox[indx].setAttribute( "visibility",  "hidden");
                        //myTextBox[indx].setAttribute( "width",  colwidth[j]);
                        //myTextBox[indx].setAttribute( "height",  colheight);
                        var textNode;// =  new  Array();
                        //textNode = document.createTextNode(" ");
						if(ifndx[indx]==1) textNode = document.createTextNode(" ");
                        else textNode = document.createTextNode(words[indx]);
                        //if(collen[indx]>=words[indx].length) textNode = document.createTextNode(words[indx]);
                        //else textNode = document.createTextNode(words[indx].substring(0,collen[j]));
                        if (ifndx[indx] != 0) {// this cell has data from server
                            words[indx] = words[indx].replace(at, "");
                            words[indx] = words[indx].trim();
                            //krpano.trace(1, words[indx]);
                        }
                        myTextBox[indx].appendChild(textNode);
                        if(k !=0||hidden==1) myTextBox[indx].setAttribute("visibility","hidden");
                        else myTextBox[indx].setAttribute("visibility","visible");
                        if(k !=0||hidden==1) cellbox[indx].setAttribute("visibility","hidden");
                        else cellbox[indx].setAttribute("visibility","visible");
                        //if(k !=0) targetcell[indx].setAttribute("visibility","hidden");
                        //else targetcell[indx].setAttribute("visibility","visible");
                    }
              }
        }       
        for (i = 0; i < columns; i++) tablewidth += colwidth[i];
        //krpano.trace(1, " table width = " + tablewidth);
        pluginboxwidth = tablewidth + xstart + xstart;
        pluginboxheight = nrows*colheight + yrow[0];
        //krpano.trace(1,"pluginbox height " + formatsize);
        if (tableTitle.length > 0 || npages > 1) pluginboxheight = pluginboxheight + colheight ;//yrow[0]";
        //krpano.trace(1, "plugin w,h,tblw " + pluginboxwidth + pluginboxheight + tablewidth);
        pluginbox = document.createElementNS(NS, "rect");
        pluginbox.setAttribute( "x", 0);//xcol[0]-xstart);
        pluginbox.setAttribute( "y", 0);//yrow[0]-ystart);
        pluginbox.setAttribute( "width",  pluginboxwidth);
        pluginbox.setAttribute( "height",  pluginboxheight);
        pluginbox.setAttribute( "stroke", pluginboxbordercolour);
        pluginbox.setAttribute( "fill",  pluginboxfillcolour);
        pluginbox.setAttribute( "fill-opacity",  0.25);
        pluginbox.setAttribute( "stroke-width", 1);
        if(hidden==0) pluginbox.setAttribute( "visibility", "visible");
        else pluginbox.setAttribute( "visibility", "hidden");
        plugincanvas.appendChild(pluginbox);
        for (i = 0; i < npages * nrows * columns; i++)
        {
                plugincanvas.appendChild(cellbox[i]);
                plugincanvas.appendChild(myTextBox[i]);
        }
        //pluginbox.addEventListener('click', local.hittest);
        if (tableTitle.length > 0 || npages > 1) 
        {
            if (tableTitle.length == 0) tableTitle = " ";
            titleword.length = 0;
            titleword = tableTitle.split(":");
            bold = 0;
            underline = 0;
            italic = 0;
            if (titleword.length > 1) 
            {
                    if (titleword.length == 2) bold = parseInt (titleword[1]);
                    else if (titleword.length == 3) 
                    {
                            bold = parseInt (titleword[1]);
                            underline = parseInt(titleword[2]);
                    }
                    else if (titleword.length == 4) 
                    {
                            bold = parseInt (titleword[1]);
                            underline = parseInt(titleword[2]);
                            italic = parseInt(titleword[3]);
                    }
            }
            //formatalign = "center";
            formatbold = "normal";
            formatunderline = "none";
            formatitalic = "normal";
            if (bold != 0) formatbold = "bold";
            if (underline != 0) formatunderline =  "underline";
            if (italic != 0) formatitalic = "italic";
            title = document.createElementNS(NS, "text");
            title.setAttribute( "x", xcol[0]+tablewidth/2.0);
            title.setAttribute( "y", yrow[nrows]+colheight*0.7);//
            title.setAttribute( "font-size",  formatsize);
            title.setAttribute( "font-family",  formatfont );
            title.setAttribute( "text-decoration",  formatunderline );
            title.setAttribute( "font-style",  formatitalic );
            title.setAttribute( "fill",  fcolour );
            title.setAttribute( "font-weight",  formatbold );
            title.setAttribute( "text-anchor",  "middle");
            if(hidden==0) title.setAttribute( "visibility",  "visible");
            else title.setAttribute( "visibility",  "hidden");
            var textNode1 = document.createTextNode(titleword[0]);
            title.appendChild(textNode1);
            plugincanvas.appendChild(title);

            if(npages > 1)
            {
                lefttext ="<0";
                leftarrow = document.createElementNS(NS, "text");
                leftarrow.setAttribute( "x", xcol[0]+5);
                leftarrow.setAttribute( "y", yrow[nrows]+colheight*0.8);
                //krpano.trace(1," xl,yl ="+xcol[0] + " " + (yrow[nrows]+colheight));
                leftarrow.setAttribute( "font-size",  formatsize);
                leftarrow.setAttribute( "font-family",  formatfont );
                //leftarrow.setAttribute( "text-decoration",  formatunderline );
                leftarrow.setAttribute( "font-style",  "normal" );
                leftarrow.setAttribute( "fill",  fcolour );
                //leftarrow.setAttribute( "font-weight",  formatbold );
                leftarrow.setAttribute( "text-anchor",  "left");
                leftarrow.setAttribute(  "visibility",  "hidden");
                leftarrow.addEventListener('click', LAupClick);
                leftarrow.addEventListener('mouseover', overHandler);
                leftarrow.addEventListener('mouseout', outHandler); 
                //krpano.trace(1," left arrow  parameters set");
                var textNode2 = document.createTextNode(lefttext);
                leftarrow.appendChild(textNode2);
                plugincanvas.appendChild(leftarrow);
                righttext="2>";
                rightarrow = document.createElementNS(NS, "text");
                rightarrow.setAttribute( "x", xcol[columns-1]+colwidth[columns-1]-5);
                rightarrow.setAttribute( "y", yrow[nrows]+colheight*0.8);
                //krpano.trace(1," xr,yr ="+(xcol[columns-1]+colwidth[columns-1]) + " " + (yrow[nrows]+colheight));
                rightarrow.setAttribute( "font-size",  formatsize);
                rightarrow.setAttribute( "font-family",  formatfont );
                //rightarrow.setAttribute( "text-decoration",  formatunderline );
                rightarrow.setAttribute( "font-style",  "normal" );
                rightarrow.setAttribute( "fill",  fcolour );
                //rightarrow.setAttribute( "font-weight",  formatbold );
                rightarrow.setAttribute( "text-anchor",  "end");
                if(hidden==0) rightarrow.setAttribute( "visibility",  "visible");
                else rightarrow.setAttribute( "visibility",  "hidden");
                rightarrow.addEventListener('click', RAupClick);
                rightarrow.addEventListener('mouseover', overHandler);
                rightarrow.addEventListener('mouseout', outHandler);
                //krpano.trace(1," right arrow  parameters set");
                var textNode3 = document.createTextNode(righttext);
                //krpano.trace(1," left/right arrow child 1");
                rightarrow.appendChild(textNode3);
                //krpano.trace(1," left/right arrow child 2");
                plugincanvas.appendChild(rightarrow);
               //krpano.trace(1," left/right arrow child added");
            }
        }
        
		if(hidden==0) xtext ="";
		else xtext =plugin.name;//"[mtable]";
		xarrow = document.createElementNS(NS, "text");
		xarrow.setAttribute( "x", 0);
		xarrow.setAttribute( "y", 8);
		//krpano.trace(1," xl,yl ="+xcol[0] + " " + (yrow[nrows]+colheight));
		xarrow.setAttribute( "font-size",  12);
		xarrow.setAttribute( "font-family",  "Arial" );
		//leftarrow.setAttribute( "text-decoration",  formatunderline );
		xarrow.setAttribute( "font-style",  "normal" );
		xarrow.setAttribute( "fill",  plugin.xarrowcolour );
		xarrow.setAttribute( "font-weight",  "bold" );
		xarrow.setAttribute( "text-anchor",  "left");
		xarrow.setAttribute(  "visibility",  "visible");
		xarrow.setAttribute(  "fill-opacity",  "opacity");
		var textNode4 = document.createTextNode(xtext);
		xarrow.appendChild(textNode4);
		plugincanvas.appendChild(xarrow);
		
		/*xarrow.addEventListener('click', hideClick);
		xarrow.addEventListener('mouseover', overHandler);
		xarrow.addEventListener('mouseout', outHandler); */

        tpluginbox = document.createElementNS(NS, "rect");
        tpluginbox.setAttribute( "x", 0);//xcol[0]-xstart);
        tpluginbox.setAttribute( "y", 0);//yrow[0]-ystart);
        tpluginbox.setAttribute( "width",  pluginboxwidth);
        tpluginbox.setAttribute( "height",  pluginboxheight-colheight-10);
        tpluginbox.setAttribute( "stroke", pluginboxbordercolour);
        tpluginbox.setAttribute( "fill",  pluginboxfillcolour);
        tpluginbox.setAttribute( "fill-opacity",  0.0);
        tpluginbox.setAttribute( "stroke-opacity",  0.0);
        tpluginbox.setAttribute( "stroke-width", 1);
        plugincanvas.appendChild(tpluginbox);
        tpluginbox.addEventListener('click', hideClick);
        tpluginbox.addEventListener('mouseover', overHandler);
        tpluginbox.addEventListener('mouseout', outHandler); 
		
        if(hidden==0) plugin.registercontentsize(pluginboxwidth,pluginboxheight);
        else plugin.registercontentsize(xarrowwidth,15);
      /*  var mrect;
        var line1,line2,line3;

        mrect = document.createElementNS(NS, "rect");
        mrect.setAttribute( "x", 0);//pluginboxwidth-10);
        mrect.setAttribute( "y", 0);
        mrect.setAttribute( "width",  10);
        mrect.setAttribute( "height",  10);
        mrect.setAttribute( "stroke-width", 1 );
        mrect.setAttribute( "stroke", 0 );
        mrect.setAttribute( "fill-opacity",  1.0);
        mrect.setAttribute( "fill",  0);

        line1 = document.createElementNS(NS, "line");
        line1.setAttribute("x1",2);//pluginboxwidth-8);
        line1.setAttribute("y1", 2 );
        line1.setAttribute("x2",8);//pluginboxwidth-2);
        line1.setAttribute("y2", 2 );
        line1.setAttribute( "stroke", "white" );
        line1.setAttribute( "fill-opacity",  1.0);
        line1.setAttribute( "fill",  "white");
        line2 = document.createElementNS(NS, "line");
        line2.setAttribute("x1",8);//pluginboxwidth-2);
        line2.setAttribute("y1", 2 );
        line2.setAttribute("x2",5);//pluginboxwidth-5);
        line2.setAttribute("y2", 8 );
        line2.setAttribute( "stroke", "white" );
        line2.setAttribute( "fill-opacity",  1.0);
        line2.setAttribute( "fill",  "white");
        line3 = document.createElementNS(NS, "line");
        line3.setAttribute("x1",5);//pluginboxwidth-5);
        line3.setAttribute("y1", 8 );
        line3.setAttribute("x2",2);//pluginboxwidth-8);
        line3.setAttribute("y2", 2 );
        line3.setAttribute( "stroke", "white" );
        line3.setAttribute( "fill-opacity",  1.0);
        line3.setAttribute( "fill",  "white");

        trect = document.createElementNS(NS, "rect");
        trect.setAttribute( "x", 0);//pluginboxwidth-10);
        trect.setAttribute( "y", 0);
        trect.setAttribute( "width",  10);
        trect.setAttribute( "height",  10);
        trect.setAttribute( "stroke-width", 1 );
        trect.setAttribute( "stroke", 0 );
        trect.setAttribute( "fill-opacity",  0.0);
        trect.setAttribute( "fill",  0);

        trect.addEventListener('click', hideClick);
        trect.addEventListener('mouseover', overHandler);
        trect.addEventListener('mouseout', outHandler); 
        
        plugincanvas.appendChild(mrect);
        plugincanvas.appendChild(line1);
        plugincanvas.appendChild(line2);
        plugincanvas.appendChild(line3);
        plugincanvas.appendChild(trect);*/
 
           //for (indx = 0; indx < npages * nrows * columns; indx++)
           // {
                //plugincanvas.appendChild(targetcell[indx]);
           //     if (links[indx]!=="")
           //     {
                    //krpano.trace(1,"adding link " + indx);

                    //krpano.trace(1,"adding listner")
                    //targetcell[indx].addEventListener('click', upClick);
                    //targetcell[indx].addEventListener('mouseover', overHandler);
                    //targetcell[indx].addEventListener('mouseout', outHandler);                                   
           //     }
           // }            
            if (ifound == 1) 
            {
                //updateTable();
                var cycle_time;
                cycle_time = getcycletime();		
                cycle_time = cycle_time.trim();
				var ctime;
				ctime=parseInt(cycle_time);
				if(isNaN(ctime)) ctime = 5;
				else if(ctime<=0) ctime = 5;
				//krpano.trace(1,"textLabelTableMulti, ctime="+ctime);
                setTimeout(updateTable, 1000);
                //krpano.trace(1, "cycle_time=" + cycle_time);
                fiveSecTimer=setInterval(function(){updateTable();},ctime*1000);
                halfSecTimer=setInterval(function(){onBlink()},500);
              //  fiveSecTimer.addEventListener(TimerEvent.TIMER, onTick);
              //  fiveSecTimer.start();
            }
        }
        function updateTable()
        {
            var currentValue;//:String
            var i;//:int;
            var ival;//:int;
            var fval;//:Number;	
            var tempstr=[];
            var str;
            //krpano.trace(1, cells);
			inalarm=0;
            for (i = 0; i < cells; i++)
            {
                //krpano.trace(1,i, ifndx [i], words[i]);
                if(ifndx[i]==1){
                   //krpano.trace(1,"words[i]="+words[i]);
                   str = somefunction(words[i]);//ExternalInterface.call("somefunction", words[i]); 
                   //krpano.trace(1,"str="+str);
                   tempstr = str.split(",");  
					alarm="";
                   currentValue=tempstr[0];
                   //krpano.trace(1,"CurrentValue="+currentValue);
                   if(tempstr.length > 1) state[i] = parseInt(tempstr[1]);
                   else state[i] = 0;
				   if(state[i]>0) inalarm=1;
                   if(state[i]>9){krpano.trace(1,"state > 9:"+state[i]);state[i]=9}
                   if(state[i]<0){krpano.trace(1,"state < 0:"+state[i]);state[i]=0}
                   //krpano.trace(1,"str="+str);
                   //krpano.trace(1,"current value, state="+currentValue,state[i]);
					if(tempstr.length>2) alarm=tempstr[2];
					j=Math.floor(i/columns);
                    if (typ[j] == "i"||typ[j] == "I")
                    {
                        ival = parseInt(currentValue);
                        if(isNaN(ival)) ival = 0;
                        if (mult[i] != 1.0) ival = ival * mult[i];
                        myTextBox[i].firstChild.nodeValue = ival+alarm  ;
                    }	
					else if(typ[j] == "f"||typ[j] == "F"){// 
                        fval = parseFloat(currentValue);
                        if(isNaN(fval)) fval = 0.0;
                        if (mult[i] != 1.0) fval = fval * mult[i];	
                        myTextBox[i].firstChild.nodeValue = fval.toFixed(deci[i])+alarm;					
                    }
                    else myTextBox[i].firstChild.nodeValue = currentValue +" "+ alarm;
                    //krpano.trace(1, "tick " + words[i] , currentValue );
                }
				else myTextBox[i].firstChild.nodeValue = words[i];
            }
        }
            
        function onBlink()
        {
            var i;
            var j;
			if(hidden==1&&inalarm>0){
				if(inalarm>0&&(blinkcount == 0 || blinkcount == 2)) xarrow.setAttribute("fill-opacity",halfopacity);
				else xarrow.setAttribute("fill-opacity",opacity);
			}			
            /*if(hidden==1){
            	for (i=0;i<cells;i++) cellbox[i].setAttribute("visibility","hidden");
				return;
            };*/
            j = mack_status();
            for (i = 0; i < cells;i++){
            if (ack[i] || j ) { cellbox[i].setAttribute( "fill",  statecolours[state[i]] ); continue; }
            //krpano.trace(1, "state, stateblink=" + state[i],stateblink[state[i]]);
            if (stateblink[state[i]] == 1)
              if (blinkcount == 2 || blinkcount == 3) cellbox[i].setAttribute( "fill",  cellbackgroundcolour);
              else cellbox[i].setAttribute( "fill",  statecolours[state[i]] );
            else if (stateblink[state[i]] == 2)
              if (blinkcount == 1 || blinkcount == 3) cellbox[i].setAttribute( "fill",  cellbackgroundcolour);
              else cellbox[i].setAttribute( "fill",  statecolours[state[i]] );
            else cellbox[i].setAttribute( "fill",  statecolours[state[i]] );
            //krpano.trace(1, "blink count, state, colour", + blinkcount, state, statecolours[state]);
            //krpano.trace(1,"onblink="+blinkcount);
            }
            blinkcount++;
            if (blinkcount > 3) blinkcount = 0;
        }
    };