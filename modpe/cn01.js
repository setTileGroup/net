/*
 *			大炮js(Cannon)
 *
 *		setTile工作室-内部使用
 *
 */




var ctx=null;
var aWindow=null;
var first=0;  //首次启动
var enab=0;   //开启功能
var cnmode=0;  //炮弹模式
var cd=0,maxcd=0;
var shot=new Array(),tmpshot;   //炮弹实体
var shot4pos=new Array();  //TNT坐标
var dirx=0,diry=0,dirz=0;
var cx=0,cy=0,cz=0;
var logoimg="R0lGODlhCgGkAMQAAOEOJwIBCwUFEAkKFw4QHhUZKRshMiAoOyUuQyo0SjA8VDVCXDpJZElcfT9PbEJUclNpjUZYd1duk05ihF11nGV/qG2KtvBnPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQ0RCNkMxNEIxMjQxMUU0QTVBODhBMEVDODYzRTVBMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQ0RCNkMxNUIxMjQxMUU0QTVBODhBMEVDODYzRTVBMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNDREI2QzEyQjEyNDExRTRBNUE4OEEwRUM4NjNFNUExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDREI2QzEzQjEyNDExRTRBNUE4OEEwRUM4NjNFNUExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAAoBpAAABf9gII5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJVALMA87PzALKcc0EBAUFBtoG2NbOzNNqAs7XBggJCgoLC+kJCAfcBAPS4WXVBgcJCw4NExASEiBMaOBgQYIDBeTRqxeG2bUDChg0kFABgMWLFitAiLAAQcKFDL04NCeRAsaTKBf/HCAAslO0l4ZGJnAAAaVNjAw8DvhU7Zo3cIMEEDAw0+TNow508hyQ7cA7bvOCMkXgwChKCxUoaKVQ8WLHAjtdMiW6gIFBqC37DCBwgIEEmxUkEGRA10GEBg0iAEhggKUnoQUSMLhAmEGCj4HGGVDQ4CoFju7gHciXoDICtH+HKiDMWUHftHuEtrV6kYKDgwmtWcPGWuHCaM+gATUBO7btb7NH1L4dO9qK3bJBBwDOe15uFEIXcybs2S8gpgkan6TwgK9C3eN608t+Ldu2bt9KjOvOmvU2bgnDixhfvvx58FHFj+/+Pn183Wvbm/9uX/j6oTNxdtpnwzUTXB3JLfAW/0YWNGCdf8ORwF4+6azTDjyurZcfZe2gU+GFfRk3YWUdpqMOiBkWmJ85HlqowEEhAjWihyR++CKGxiF3jWB3PfDVPORgow14x7khFFVdXSQBAytBKN5aZD3gD0ACRWAYQvEBhsACD/QzkJcQhDmBlagZd82WXU7wpZphVnklWNI4VEA++/TzT0BjMqAAQizFeSaXXuLFpphkYimcllw+4MCeYG3o4YuXwTmHAIFJd1GDh93HQnIzTXATBQ2oJCmlByxwkgUW2ASqqM7MaSqDqaK0qqFQbhkBBElO10BOn43j6qmx6soqaJzaRRCj5ejDz0APGIZZHEwp4ClGFSTlnP8Lor16FAATqCRPANA9sC1K3a60o7jjYlRuakQxUFO6EAzIUrjpquttWOK5uhyv2ShA03KFeXTtGwMs9m5pTBIQw1QM1OugAUAuNm29Fj3c78QUN+AZNlQtWK8ESYGlGcYO86WpCOEuV91kCTwA8HIPylGwgidJsADECxeAQMPpUpCwYgscTLHPCJUqdL0+v7Pz0fAmPFTQFCPcpAkFS7vcBAqc4+7LnMUMrQE0Y2QzzjCQ+moFqKaNUgSHAe0xgxWgHexFbOMT9qlxo4qSxvpYCnfeNmnMDdhvX5r33BaxXUBaM0OwHASGKeAyZ6jG1cAFlw3sxsyFE60wDExBdCv/V2nrra4CjRJ+lVwRTID2SVhPdvelrLuOOOT7kAYAVhMoKuXrGBFtd+G71w78RViDRTXhyy2ZzuWUYxWvqJq3UfXR1SJQfQq+bjnR4WpjBIFnzqjOIMiVLTDB7XtuWbgF6Ouzfs0ROEAyABVorDRjuSbOV6nvi5/62Ec2EnCueXpSQASWU7npCcxJZ4gWyTClvBb4SnQUSdfYyjc7/NVNZ1WpWUfcd5IKfJAqugPVRE6FtXhcDHGxA2AJTxhCsd0MXyM4IGeWVBkHvMwCFJiAs7a3BkolQC8ngcDNiFgCKClQd0fZIOem4zTzKWmEHfTc0zqnJt1V4AEeiYbOHtC///E5JYtV7ODY+vSSLSLQHYzh2gWEqBMI2oMtDPCi4k4mHwChi2JStKJFAqlGLBaOkFycgBcdMDXROKCMhhQhxKZoQz75RB5u3GFOnMIARXKthUxEg2KkhZIlCew+BgpSW4iHFblJkoOHvCElr4gAEtpwkoIEQBAVWUIwLo4ZYyxj+wqJSzXyCh9PwQYAEXgZiNiPAhZ4WcjsWIap1PBSkONLalSjH6Ig8Xz+ON4gZZlLRIqwlsSEpa5WyKAWJuSFsNuTDG+pTrGdJn1mgZH7mHlGflAEVcvZoxySQ8pTSQAyT2FZZSKzpQmCyi7QpKK5yknOQqIzlsXsXASkhJL8Zf/NKfxb2//SOUuLmGYdk7tAdWrpljee4wINgAA0AcoZB1UQWngkHv4gMJe63CUvAEiHu0710AZElFrVScg8r5jRc9qSqfUsTbMeoDve+c52Eh3eK0uqy2b5cDkGEYwE3ogOzsgtmpzxJTXtYU0oWgQrW+EKTsoyQY2E8yrd4sZSx9lUG150q+Vc1AL8ZjjSBW5jFO1raayU0sJUpqWaTJ8cCQO5qU0KQA7Q6bgKsoBvFtatQEyKOaAmvooeTYnoPK1pk2gYwTBtXJW1BthUW8yjScCrAAsrZAnDQwRsZrJJ5aORivXabbV2qFG7yDBJ1sLyFRR58nyuRZpbNebuyRz/mY0ayHQysnjiUrrc0hOX0uqOnY1Vk0qTyMvi1RwcDjQ5O+NlvR4gz5lodneIs0jWfPtHiwSXXhipjjZadpL/Bqa/ABBwNlxbr2x+BsAXMTCBMRKB/eojn/Awb/NUMuA6qYkgZ7mOHeTkTPmqCgL0RciCO4kSgfgDivrUlkVEBcxSnURUv8IIjc12Y0uO9lb9y8hGOtKr0MkYADvOsVcihUx4cCyPj1viQx51o/SsVRzjMUdEWncnPIFYm5gc7bIG4gCzqIMBaTqWk8WsqK/06U8OaLPA4CznjyAqzgV5IGDotKw2kdkgfALHnev8Zp3tQ8594SY3UXg18gXJO/C5/zIb2IOPFrnIHfEwzorOYaLIaINDVeamUyJj5Qmd4x32ecip+aRpVZPaNZTm9IkglWkZbWjVpb71q0UEm2Aux6Y7AY5v/sAdIdXnJ9thD6S3uZply+PRrclSfsrjmmlHezvWJhJ21kKfIaUmRxLKtpU1RB5tN7FSyzGN9iTNB+Lghlip5LWwX5LKYa+n3jLCN0h2Y28JxVtE3NO3v7MD8OVZjTNKJFBIrCexX2dq4ZtbzAIJI0TLQlwc0NlXpth9cS1ACR3ssI57O34GX+FjMuMmOZa5/W2OqzwLten3y2dO85rb/OY4z7nOd87znvv850APutCHTvSiG/3oSE+60kyXzvSmO/3pUI+61KdO9apb/epYz7rWt871rnv962APu9jHTvaym/3saE+72tfO9ra7/e1wj7vc5073utv97njPu973zve++/3vtAgBADs=";




function dip2px(ctx,dips)
{
	return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density)
}

function lookdir(pitch, yaw)    //玩家面对方向
{
	diry = -(Math.sin(pitch / 90));
	dirx = -(Math.sin(yaw / 180 * Math.PI));
	dirz = (Math.cos(yaw / 180 * Math.PI));
	if (diry > 0)
	{
		dirx -= (dirx / (0.9999999999999466 / diry));
		dirz -= (dirz / (0.9999999999999466 / diry));
	}
	else
	{
		dirx -= (dirx / (0.9999999999999466 / (-diry)));
		dirz -= (dirz / (0.9999999999999466 / (-diry)));
	}
}




function newLevel()
{
  	ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable(    //菜单
	{
		run: function()
		{
			try
			{
				enab=1;
				if(!first)
				{
					first=1;

					var tlayout=new android.widget.LinearLayout(ctx);
					var image0=new android.widget.ImageView(ctx);
		image0.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logoimg,0),0,android.util.Base64.decode(logoimg,0).length));

		tlayout.addView(image0);
					var toast=new android.widget.Toast(ctx);
					toast.setDuration(android.widget.Toast.LENGTH_LONG);
					toast.setView(tlayout);
					toast.show(); 



					aWindow = new android.widget.PopupWindow();
					var scroll = new android.widget.HorizontalScrollView(ctx); 
					var layout = new android.widget.RadioGroup(ctx);    //layout其实是一个radiogroup
					layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
					scroll.addView(layout);


					/*var stitlen1=new android.widget.TextView(ctx);
					stitlen1.setText("选项：");
					stitlen1.setTextSize(16);
					layout.addView(stitlen1);*/
					var radion1 = new android.widget.RadioButton(ctx);    
					radion1.setText("None");
					radion1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
					{
						onCheckedChanged:function(v,c)    
						{
							if(c)
							{
								cnmode=0;
							}
						}
					});
					layout.addView(radion1);    
					var radion2 = new android.widget.RadioButton(ctx);   
					radion2.setText("SnowCannon");
					radion2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
					{
						onCheckedChanged:function(v,c)
						{
							if(c)
							{
								cnmode=1;
							}
						}
					});
					layout.addView(radion2);  
					var radion3 = new android.widget.RadioButton(ctx);   
					radion3.setText("LavaCannon");
					radion3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
					{
						onCheckedChanged:function(v,c)
						{
							if(c)
							{
								cnmode=2;
							}
						}
					});
					layout.addView(radion3);  
					var radion4 = new android.widget.RadioButton(ctx);   
					radion4.setText("BombCannon");
					radion4.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
					{
						onCheckedChanged:function(v,c)
						{
							if(c)
							{
								cnmode=3;
							}
						}
					});
					layout.addView(radion4);  
					if(cnmode==0)    
						radion1.setChecked(true);
					else if(cnmode==1)
						radion2.setChecked(true);
					else if(cnmode==2)
						radion3.setChecked(true);
					else if(cnmode==3)
						radion4.setChecked(true);


					var button =new android.widget.Button(ctx);
					button.setText("Help");
					button.setOnClickListener(new android.view.View.OnClickListener(
					{
						onClick: function(viewarg)
						{
							clientMessage("Help yourself. :D");
						}
					}));
					layout.addView(button);

					var button1 =new android.widget.Button(ctx);
					button1.setText("Close");
					button1.setOnClickListener(new android.view.View.OnClickListener(
					{
						onClick: function(viewarg)
						{
							var allent=Entity.getAll(),corrid=0;
							for(var i in allent)
							{
								corrid=Entity.getEntityTypeId(allent[i]);
								if(corrid==81||corrid==65)
								{
									Entity.remove(allent[i]);
								}
							}
							cnmode=0;
							first=0;
							aWindow.dismiss();
						}
					}));
					layout.addView(button1);



					aWindow.setContentView(layout);
					aWindow = new android.widget.PopupWindow(scroll, ctx.getWindowManager().getDefaultDisplay().getWidth(), dip2px(ctx,55));
					aWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
					aWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
				}
				
			}
			catch(err)
			{
				clientMessage("Unable to create window.");
			}
		}
	}));
	


}


function leaveGame()
{
	enab=0;
}


function entityRemovedHook(ent)
{
	if(cnmode==1&&Entity.getEntityTypeId(ent)==81)
	{
		cx=parseInt(Entity.getX(ent));
		cy=parseInt(Entity.getY(ent));
		cz=parseInt(Entity.getZ(ent));
		for(var i=-1;i<=0;i++)
		{
			for(var j=-1;j<=1;j++)
			{
				for(var k=-1;k<=1;k++)
				{
					if(getTile(cx+j,cy+i,cz+k)==8||getTile(cx+j,cy+i,cz+k)==9)  //冰
					{
						setTile(cx+j,cy+i,cz+k,79);
					}
					else if(getTile(cx+j,cy+i,cz+k)!=0&&getTile(cx+j,cy+i,cz+k)!=79)  //雪块
					{
						setTile(cx+j,cy+i,cz+k,80);
					}
				}
			}
		}
		
	}
	if(cnmode==2&&Entity.getEntityTypeId(ent)==81)
	{
		cx=parseInt(Entity.getX(ent));
		cy=parseInt(Entity.getY(ent));
		cz=parseInt(Entity.getZ(ent));
		for(var i=-1;i<=1;i++)
		{
			if(getTile(cx,cy+i,cz)!=0)  //岩浆
			{
				setTile(cx,cy+i,cz,11);
			}
		}
	}


}


function modTick()
{
	if(enab)
	{
		if(cnmode==1)
		{
			maxcd=2;
		}
		else if(cnmode==2)
		{
			maxcd=2;
		}
		else if(cnmode==3)
		{
			maxcd=5;
		}

		lookdir(getPitch(),getYaw());
		if(cnmode==1&&cd==0)  //SnowCannon
		{
			tmpshot=Level.spawnMob(getPlayerX()+(dirx*2),getPlayerY()+(diry*2),getPlayerZ()+(dirz*2),81);
			setVelX(tmpshot,(dirx*3)+(Math.random()-0.5)/6);
			setVelY(tmpshot,(diry*3)+(Math.random()-0.5)/6);
			setVelZ(tmpshot,(dirz*3)+(Math.random()-0.5)/6);
		}
		else if(cnmode==2&&cd==0)  //LavaCannon
		{
			tmpshot=Level.spawnMob(getPlayerX()+(dirx*2),getPlayerY()+(diry*2),getPlayerZ()+(dirz*2),81);
			setVelX(tmpshot,(dirx*3)+(Math.random()-0.5)/6);
			setVelY(tmpshot,(diry*3)+(Math.random()-0.5)/6);
			setVelZ(tmpshot,(dirz*3)+(Math.random()-0.5)/6);
		}
		else if(cnmode==3&&cd==0)  //BombCannon
		{
			shot.push(Level.spawnMob(getPlayerX()+(dirx*2),getPlayerY()+(diry*2),getPlayerZ()+(dirz*2),65));
			setVelX(shot[shot.length-1],(dirx*3)+(Math.random()-0.5)/3);
			setVelY(shot[shot.length-1],(diry*3)+(Math.random()-0.5)/3);
			setVelZ(shot[shot.length-1],(dirz*3)+(Math.random()-0.5)/3);
			shot4pos[shot.length-1]=[Entity.getX(shot[shot.length-1]),Entity.getY(shot[shot.length-1]),Entity.getZ(shot[shot.length-1])];
		}


		if(cd==maxcd||cd>20)
		{
			cd=0;
		}
		else
		{
			cd++;
		}


		if(cd==0)  //检测TNT是否停止
		{
			for(var i=0;i<shot.length;i++)
			{
				if(Math.abs(Entity.getX(shot[i])-shot4pos[i][0])<0.08&&Math.abs(Entity.getY(shot[i])-shot4pos[i][1])<0.08&&Math.abs(Entity.getZ(shot[i])-shot4pos[i][2])<0.08)
				{
					explode(Entity.getX(shot[i]),Entity.getY(shot[i]),Entity.getZ(shot[i]),3);
					Entity.remove(shot[i]);
					shot.splice(i,1);
					shot4pos.splice(i,1);
				}
				else
				{
					shot4pos[i][0]=Entity.getX(shot[i]);
					shot4pos[i][1]=Entity.getY(shot[i]);
					shot4pos[i][2]=Entity.getZ(shot[i]);
				}
			}
		}


	}
	




}


















