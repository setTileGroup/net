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


//访问权限
var checkedid=false;
//checkidentity();
function checkidentity()
{
	//检查访问者是否有正确的cookies
	/*  //add cookies
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+1000);
		document.cookie="identity"+ "=" +escape("gia'omcseentgtyiilheugircohuepnmgeymubaenr")+(";expires="+exdate.toGMTString());
	*/
	var idcheck=getCookie("identity");
	var substr=["gaocengyihuichengyuan","i'msettilegroupmember"];
	var trueidstr="";
	var a1=document.getElementsByTagName("body");
	for(var i=0;i<substr[0].length;i++)
	{
		trueidstr+=substr[0][i]+substr[1][i];
	}
	if(a1.length!=0)
	{
		if(idcheck!=trueidstr)
		{	
			a1[0].innerHTML="<p>Welcome to setTileGroup high-rise website. You do not have permission to view this site. Ask setTileGroup administrators for more imformation. </p>"+
			"<p>欢迎您访问setTile工作室高层内部网站。你没有权限访问本站内容。请向setTile工作室的管理员咨询。</p>";
			console.log("You were blocked because you do not have the correct identity. ");
			checkedid=true;
		}
		else
		{
			checkedid=true;
		}
	}
	if(!checkedid)
	{
		var timer1=setTimeout("checkidentity()",100);
	}

}






