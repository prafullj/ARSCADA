var krpanoplugin=function(){function v(b){a.handcursor=!0}function w(b){a.handcursor=!1}function x(a){window.open("http://localhost:3000/ar","_self")}var r=null,a=null,h=null,y,z,t=[],b,d,e,A;this.registerplugin=function(f,k,u){r=f;a=u;a.registerattribute("ver","1");a.registerattribute("cellvar","HOME");a.registerattribute("align","lefttop");a.registerattribute("homelink","http://localhost:3000/ar");a.registerattribute("fcolour","0x0000ff");a.registerattribute("fnt","5");a.registerattribute("fsiz",
"4");a.registerattribute("fbold","0");a.registerattribute("fitalic","0");a.registerattribute("fjust","1");a.registerattribute("cellalpha","0.5");a.registerattribute("borderthickness","1");a.registerattribute("bordercolour","0x0000FF");a.registerattribute("cellbackgroundcolour","0xffff00");a.handcursor=!1;a.registercontentsize(100,100);h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.style.width="100%";h.style.height="100%";a.sprite.appendChild(h);1==Number(a.ver)&&r.trace(1,"hello from plugin["+
a.name+"] version = 1.0");a.cellvar=a.cellvar.replace("\n","");a.cellvar=a.cellvar.replace("\r","");a.cellvar=a.cellvar.replace("\t","");var c,l,m,B,g,n,p,q,C,D;t=a.cellvar;k=f=0;5>f&&(f=5);5>k&&(k=5);a.cellbackgroundcolour=a.cellbackgroundcolour.replace(/0x/gi,"#");a.fcolour=a.fcolour.replace(/0x/gi,"#");a.bordercolour=a.bordercolour.replace(/0x/gi,"#");B=a.fcolour;g=parseInt(a.fnt);c=parseInt(a.fsiz);n=parseInt(a.fjust);p=parseInt(a.fbold);C=parseInt(a.fitalic);D=parseFloat(a.cellalpha);A=a.cellbackgroundcolour;
u=a.bordercolour;m=parseInt(a.borderthickness);g=1==g?"Times New Roman":2==g?"Arial":3==g?"Calibri":4==g?"Sans-Serif":5==g?"Verdana":6==g?"Century":"Arial";q=1==c?10:2==c?11:3==c?12:4==c?14:5==c?16:6==c?18:10;c=t.length+1;1>c&&(c=1);c=Math.round(c*q*.6)+f;l=1.2*q+k;p=1==p?"bold":"normal";e=document.createElementNS("http://www.w3.org/2000/svg","rect");e.setAttribute("x",0+m);e.setAttribute("y",0+m);e.setAttribute("width",c-2*m);e.setAttribute("height",l-2*m);e.setAttribute("fill-opacity",D);e.setAttribute("fill",
A);e.setAttribute("stroke",u);e.setAttribute("stroke-width",m);d=document.createElementNS("http://www.w3.org/2000/svg","rect");d.setAttribute("x",0);d.setAttribute("y",0);d.setAttribute("width",c);d.setAttribute("height",l);d.setAttribute("fill-opacity",0);d.setAttribute("fill",0);b=document.createElementNS("http://www.w3.org/2000/svg","text");0==n?(b.setAttribute("text-anchor","start"),b.setAttribute("x",0+f),b.setAttribute("y",0+l/2+k)):1==n?(b.setAttribute("text-anchor","middle"),b.setAttribute("x",
0+c/2),b.setAttribute("y",0+l/2+k)):2==n&&(b.setAttribute("text-anchor","end"),b.setAttribute("x",0+c-f),b.setAttribute("y",0+l/2+k));1==C&&b.setAttribute("font-style","italic");b.setAttribute("font-size",q);b.setAttribute("font-family",g);b.setAttribute("fill",B);b.setAttribute("font-weight",p);f=document.createTextNode(t);b.appendChild(f);b.setAttribute("visibility","visible");d.setAttribute("visibility","visible");y=c;z=l;a.registercontentsize(y,z);h.appendChild(e);h.appendChild(b);h.appendChild(d);
d.addEventListener("click",x);d.addEventListener("mouseover",v);d.addEventListener("mouseout",w)};this.unloadplugin=function(){d.removeEventListener("click",x);d.removeEventListener("mouseover",v);d.removeEventListener("mouseout",w);r=a=null};this.onresize=function(a,b){return!1}};