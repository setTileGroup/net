console.log('This would be the main JS file.');


function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}


var idcheck=getCookie("identity");
var substr=["gaocengyihuichengyuan","i'msettilegroupmember"];
var trueidstr="";
for(var i=0;i<substr[0].length;i++)
{
	trueidstr+=substr[0][i]+substr[1][i];
}
if(idcheck!=trueidstr)
{
	var a1=document.getElementsByTagName("body");
	a1[0].innerHTML="<p>Welcome to setTileGroup high-rise website. You do not have permission to view this site. Ask setTileGroup administrators for more imformation. </p>"+
	 "<p>欢迎您访问setTile工作室高层内部网站。你没有权限访问本站。请向setTile工作室的管理员咨询。</p>";
}




