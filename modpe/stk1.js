var ctx;
var spsppp = 0;
var tpopx=0,tpopy=0;
var mX,mY;
var down=false;
var showingguibtn = 0;
var sneaking = false;
var isSneaking = false;
var isRunning = false;
var Xpos=0;
var Zpos=0;
var s=1;
var Xdiff=0;
var Zdiff=0;
var textsize = 15;
var playername
var jssj=80
var js=true
var space = "        ";
var spacee = " ";
var spawnentbtn = null;

function newLevel()
{
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

	textsize = 15;
	menubtnopen()
	js=true
	guishowing = ModPE.readData("guishowing");
	if(read("v1 init")!=1)
	{
		ModPE.saveData("v1 init","1")
		ModPE.saveData("v1 timeout","20")
		for(var i=0; i<4; i++)
		{
			MOBS[i].color=7
			ModPE.saveData("v1 color"+i,"7")
		}
		for(; i<9; i++)
		{
			MOBS[i].color=14
			ModPE.saveData("v1 color"+i,"13")
		}
	}
	else
	{
		if(read("v1 eng")==1)
		{
			var names=[" 鸡 ","牛","猪","羊","僵尸"," 苦力怕 "," 骷 "," 蜘蛛 "," 猪人 "]
			for(var i in names)
			{
				MOBS[i].name=names[i]
			}
			deathWord="died"
		}
		if(read("v1 doubleLine")==1) divider="\n"
			timeout=read("v1 timeout")
		for(var i in MOBS)
			MOBS[i].color=read("v1 color"+i)
	}
}

//////////*Super Tool Kit Message and Command*////////

function stkMessage(msg)
{

	clientMessage(ChatColor.YELLOW + "[工具箱]: " + ChatColor.WHITE + msg);

}

function stkclientMessage(msg)
{

	clientMessage(ChatColor.YELLOW + "[工具箱]: " + ChatColor.WHITE + msg);

}

////////////*Use Item*/////////


function useItem(x, y, z, itemId, blockid, side)
{
	y = parseInt(Player.getY())
	if (y == 127 && side == 1)
	{
		ModPE.showTipMessage(ChatColor.RED + "[工具箱警报]:" + ChatColor.WHITE +"缺少建造参数!(127格的方块)");
	}
}

////////////*Menu*////////////

function menu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{
				var menu = new android.widget.LinearLayout(ctx);
				var scroll = new android.widget.ScrollView(ctx);

				menu.setOrientation(android.widget.LinearLayout.VERTICAL);

				scroll.addView(menu);

				var dialog = new android.app.Dialog(ctx);
				dialog.setContentView(scroll);

				dialog.setTitle("超级工具箱");

				var tbpmicnlogo = new android.widget.ImageView(ctx);
				tbpmicnlogo.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logopic, 0), 0, android.util.Base64.decode(logopic, 0).length))

				tbpmicnlogo.setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("超级工具箱!");
					}
				}));
				menu.addView(tbpmicnlogo);



				var  SuperTooKitData= new android.widget.Button(ctx);
				SuperTooKitData .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						showbtnstkdatabtn()
						dialog.dismiss()

					}
				})
				SuperTooKitData.setText("超级工具箱数据库")
				SuperTooKitData.setTextSize(textsize)
				menu.addView(SuperTooKitData);


				var RunningandSneaking = new android.widget.Button(ctx);
				RunningandSneaking .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						racopenmenu()
						dialog.dismiss()

					}
				})
				RunningandSneaking .setText("疾跑与潜行设置")
				RunningandSneaking .setTextSize(textsize)
				menu.addView( RunningandSneaking );


				var SetTimeandGamemode = new android.widget.Button(ctx);
				SetTimeandGamemode .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						tgmopen()
						dialog.dismiss()

					}
				})
				SetTimeandGamemode .setText("游戏时间与模式设置")
				SetTimeandGamemode .setTextSize(textsize)
				menu.addView( SetTimeandGamemode );


				var tmibtnopegihs = new android.widget.Button(ctx);
				tmibtnopegihs .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						tmiopen()
						dialog.dismiss()

					}
				})
				tmibtnopegihs .setText("内置修改器（TMI）")
				tmibtnopegihs .setTextSize(textsize)
				menu.addView( tmibtnopegihs );


				var entiymanagerbtn = new android.widget.Button(ctx);
				entiymanagerbtn .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						sesmenuopen()
						dialog.dismiss()

					}
				})
				entiymanagerbtn .setText("超级生物生成器")
				entiymanagerbtn .setTextSize(textsize)
				menu.addView( entiymanagerbtn );

				/* cmdoopen() */

				var Figurecm = new android.widget.Button(ctx);
				Figurecm .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						cmdoopen()
						dialog.dismiss()
					}
				})
				Figurecm .setText("各种指令")
				Figurecm .setTextSize(textsize)
				menu.addView( Figurecm );


				var Figure = new android.widget.Button(ctx);
				Figure .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						showdialogpix()
						dialog.dismiss()
					}
				})
				Figure .setText("像素生成")
				Figure .setTextSize(textsize)
				menu.addView( Figure );



				/* Pixels Figure Generated showdialogpix() */
				var msicbttnhaat = new android.widget.Button(ctx);
				msicbttnhaat .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						msicmenu()
						dialog.dismiss()

					}
				})
				msicbttnhaat .setText("五花八门的选项（杂项选项）")
				msicbttnhaat .setTextSize(textsize)
				menu.addView(msicbttnhaat);


				var hicter = new android.widget.Button(ctx);
				hicter .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						showDialogxheqlth()
						dialog.dismiss()
					}
				})
				hicter .setText("体力显示（第X版）设置")
				hicter .setTextSize(textsize)
				menu.addView(hicter);



				var stkprefopengui = new android.widget.Button(ctx);
				stkprefopengui .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						settingmenu()
						dialog.dismiss()
					}
				})
				stkprefopengui .setText("工具箱设置")
				stkprefopengui .setTextSize(textsize)
				menu.addView(stkprefopengui);


				var stkinfopensdk = new android.widget.Button(ctx);
				stkinfopensdk .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						infoopenver()
						dialog.dismiss()

					}
				})
				stkinfopensdk.setText("工具箱版本")
				stkinfopensdk.setTextSize(textsize)
				menu.addView(stkinfopensdk);


				var stkinfopensdkd = new android.widget.Button(ctx);
				stkinfopensdkd .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						infoopen()
						dialog.dismiss()
					}
				})
				stkinfopensdkd.setText("工具箱の开发者")
				stkinfopensdkd.setTextSize(textsize)
				menu.addView(stkinfopensdkd);

				dialog.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

//////////////*Pixel Maker:Qsef*////////////////
var r=new Array(209,232,188,89,182,55,213,63,148,37,122,36,81,52,155,23,127,121,188,220,255),g=new Array(209,121,62,128,169,179,118,63,157,109,47,48,48,72,42,19,127,85,152,211,241),b=new Array(209,46,199,208,24,44,144,63,157,140,188,145,26,23,38,19,127,58,98,162,68);
var iscs=rgb=false;
var btnWindow = null;
function dip2px(ctx,dips)
{
	return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}

function showdialogpix()
{
	var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({run:function()
		{
			try
			{
				var sv=new android.widget.ScrollView(ctx);
				var layout=new android.widget.LinearLayout(ctx);
				layout.setOrientation(1);
				var t=new android.widget.TextView(ctx);
				t.setText("欢迎您！所有内置组件加载完成，点击<开始>按钮生成像素小地图。因为羊毛颜色太多，所以颜色显示差距较大，不能够优化了，所以只能够在改进硬件后继续再生成了！（小地图的算法来自啦啦君）");
				var e1=new android.widget.EditText(ctx);
				e1.setHint("请输入图片位置，比如: /sdcard/1.png");
				var ex=new android.widget.EditText(ctx);
				ex.setHint("请输入生成的地图的x轴起始坐标");
				var ey=new android.widget.EditText(ctx);
				ey.setHint(" 请输入生成的地图的y轴起始坐标 ");
				var ez=new android.widget.EditText(ctx);
				ez.setHint(" 请输入生成的地图的z轴起始坐标 ");
				var c=new android.widget.CheckBox(ctx);
				c.setText("您是否选择了竖直方向生成？（选择竖直方向生成，不要选择水平方向生成）");
				c.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:
					function(p1,p2)
					{
						if(p2)ms=1;
						else ms=0;
					}
				});
				var cr=new android.widget.CheckBox(ctx);
				cr.setText("您是否是利用RGB生成的？（选择RGB生成，不要选择HSV！ps:RGB是更科学的，HSV 更加流畅，但是颜色差异很大！");
				cr.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:
					function(p1,p2)
					{
						if(p2)rgb=true;
						else rgb=false;
					}
				});
				var cc=new android.widget.CheckBox(ctx);
				cc.setText("是否传送到生成点？（生存模式要小心掉血！） ");
				cc.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:
					function(p1,p2)
					{
						if(p2)iscs=true;
						else iscs=false;
					}
				});
				var es=new android.widget.EditText(ctx);
				es.setHint(" 请输入生成速度（每0.0.5秒生成1个方块（理论上））");
				var svp=new android.view.ViewGroup.LayoutParams(-2,-2);
				layout.addView(t,svp);
				layout.addView(e1,svp);
				layout.addView(ex,svp);
				layout.addView(ey,svp);
				layout.addView(ez,svp);
				layout.addView(c,svp);
				layout.addView(cc,svp);
				layout.addView(cr,svp);
				layout.addView(es,svp);
				sv.addView(layout);
				var dialog=new android.app.AlertDialog.Builder(ctx).setView(sv).setTitle("像素小地图的生成").setNegativeButton("开始",new android.content.DialogInterface.OnClickListener()
				{
					onClick:
					function(dialog,which)
					{
						path=e1.getText().toString();
						x=parseInt(ex.getText().toString());
						y=parseInt(ey.getText().toString());
						z=parseInt(ez.getText().toString());
						sd=parseInt(es.getText().toString());
						bitmap=android.graphics.BitmapFactory.decodeFile(path);
						zdgd=bitmap.getHeight();
						zdkd=bitmap.getWidth();
						clientMessage("成功地生成了! \n图像路径: "+ path +",\n 生成坐标: \n ("+x+", "+y+", "+z+" ), \n 游戏模式: "+ms+", \n生成速度:"+sd+" 当 \n 生成时，小地图不可用");
						if(zdgd>256||zdkd>256)
						{
							print("啊哦…你选的地方超过地图边界了… 但是现在仍旧在生成，你现在可以重置选项");
						}
						issz=true;
						if(iscs)Entity.setPosition(getPlayerEnt(),x,y+3,z);
					}
				}).setPositiveButton("取消",null).create();
				dialog.setCanceledOnTouchOutside(false);
				dialog.show();
			}
			catch(err)
			{
				print("Err: "+err+".");
			}
		}
	}));
}
function dip2px(ctx,dips)
{
	return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}



//////////////*Health Indicators X (By Pencil)*//////



var MOBS=[ {id:10, name:"鸡", full:"4"}, {id:11, name:"牛", full:"10"}, {id:12, name:"猪", full:"10"}, {id:13, name:"羊", full:"8"}, {id:32, name:"僵尸", full:"12"}, {id:33, name:"苦力怕", full:"16"}, {id:34, name:"骷髅", full:"10"}, {id:35, name:"蜘蛛", full:"8"}, {id:36, name:"猪人", full:"12"}
]
var COLORS_NAME=["白","灰","深灰","黄","金","绿","深绿","青","深蓝","蓝","蓝黑","紫","深紫","红","深红"]

var COLORS=["§f","§7","§8","§e","§6","§a","§2","§b","§3","§9","§1","§d","§5","§c","§4"]

//var COLORS=["",ChatColor.GRAY,ChatColor.DARK_GRAY,ChatColor.YELLOW,ChatColor.GOLD,ChatColor.GREEN,ChatColor.DARK_GREEN,ChatColor.AQUA,ChatColor.DARK_AQUA,ChatColor.BLUE,ChatColor.DARK_BLUE,ChatColor.LIGHT_PURPLE,ChatColor.DARK_PURPLE,ChatColor.RED,ChatColor.DARK_RED]


var time=0
var timeout=20
var divider=" "
var deathWord="Died"
var mobs=new Array()


function read(str)
{
	return Number(ModPE.readData(str))
}

function entityAddedHook(ent)
{
	var type=Entity.getEntityTypeId(ent)

	for(var i in MOBS)
		if(type==MOBS[i].id)
		{
			var MOB=MOBS[i]
			mobs.push(new Mob(ent,MOB.name,MOB.full,COLORS[MOB.color]))
			break
		}
	}

	function entityRemovedHook(ent)
	{
		for(var i in mobs)
			if(ent==mobs[i].ent)
			{
				mobs.splice(i,1)
				break
			}
		}

		function attackHook()
		{
			time=timeout-1
		}

		function Mob(ent,name,full,color)
		{
			this.ent=ent
			this.name=name
			this.full=full
			this.color=color
			this.hcolor=ChatColor.WHITE

			if(Mob.prototype.update==null) 
				Mob.prototype.update=function()
				{
					var heal=Entity.getHealth(this.ent)
				    try{Entity.setNameTag(this.ent,this.color+this.name+this.hcolor+divider+(heal<=0?deathWord:heal+"/"+this.full)) }
				    catch(err){/*clientMessage("至少要0.8.x以上游戏对应的启动器。");*/}
				}
		}

			function showDialogxheqlth()
			{
				var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
				ctx.runOnUiThread(new java.lang.Runnable({run:function()
					{
						try
						{
							new android.app.AlertDialog.Builder(ctx)
							.setTitle("体力查看器设置")
							.setItems(["颜色","显示模式","更新","语言设置"],new android.content.DialogInterface.OnClickListener()
							{
								onClick:
								function(dialog,which)
								{
									try
									{
										switch(which)
										{
											case 0:
											var NAMES=new Array()
											for(var i in MOBS)
												NAMES.push(MOBS[i].name)
											new android.app.AlertDialog.Builder(ctx)
											.setTitle("选择生物")
											.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
											{
												onClick:
												function()
												{
													dialog.show()
												}
											})
											.setItems(NAMES,new android.content.DialogInterface.OnClickListener()
											{
												onClick:
												function(d0,w0)
												{
													new android.app.AlertDialog.Builder(ctx)
													.setTitle(MOBS[w0].name)
													.setSingleChoiceItems(COLORS_NAME,read("v1 color"+w0),new android.content.DialogInterface.OnClickListener()
													{
														onClick:
														function(d1,w1)
														{
															ModPE.saveData("v1 color"+w0,w1.toString())
															d1.dismiss()
															d0.show()
														}
													})
													.show()
												}
											})
											.show()
											break


											case 1:
											new android.app.AlertDialog.Builder(ctx)
											.setSingleChoiceItems(["单行","双行"],read("v1 doubleLine"),new android.content.DialogInterface.OnClickListener()
											{
												onClick:
												function(d0,w0)
												{
													ModPE.saveData("v1 doubleLine",w0.toString())
													d0.dismiss()
													dialog.show()
												}
											})
											.show()
											break


											case 2:
											var text=new android.widget.EditText(ctx)
											text.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)
											text.setText((timeout/20).toString())
											new android.app.AlertDialog.Builder(ctx)
											.setMessage("输入回血间隙时间（秒）\n最小为0.05秒\n· 立即生效")
											.setView(text)
											.setPositiveButton("采用",new android.content.DialogInterface.OnClickListener()
											{
												onClick:
												function()
												{
													var num=parseInt(Number(text.getText())*20)
													timeout=num>0?num:1
													ModPE.saveData("v1 timeout",timeout)
													dialog.show()
												}
											})
											.show()
											break


											case 3:
											new android.app.AlertDialog.Builder(ctx)
											.setSingleChoiceItems(["English","中文"],read("v1 eng"),new android.content.DialogInterface.OnClickListener()
											{
												onClick:
												function(d0,w0)
												{
													ModPE.saveData("v1 eng",w0.toString())
													d0.dismiss()
													dialog.show()
												}
											})
											.show()
										}
									}
									catch(err)
									{
										print(err)
									}
								}
							})
.setPositiveButton("确定",new android.content.DialogInterface.OnClickListener()
{
	onClick:
	function()
	{
		new android.os.Handler().postDelayed(new java.lang.Runnable({run:function()
			{
				stkMessage("请重启启动器来使改变生效")
			}
		}),1000)
	}
})
.show()
}
catch(err)
{
	print(err)
}
}
}))
}




///////////*Super Entity Spawner*//////////


var sx
var sy
var sz
var enid
var spawnmode = 0;
function sesmenuopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menuses = new android.widget.LinearLayout(ctx);
				var scrollses = new android.widget.ScrollView(ctx);

				menuses.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollses.addView( menuses );

				var dialogses = new android.app.Dialog(ctx);
				dialogses .setContentView(scrollses);
				dialogses .setTitle("超级实体生成器");

				var entityid = new android.widget.EditText(ctx);
				entityid.setHint("实体ID");
				menuses .addView(entityid);
				entityid.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/
				/*entityid.setEnabled(true);*/

				var xspawn = new android.widget.EditText(ctx);
				xspawn .setHint("X");
				xspawn .setText(""+getPlayerX())
				menuses .addView( xspawn );
				xspawn.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				var yspawn = new android.widget.EditText(ctx);
				yspawn .setHint("Y");
				yspawn .setText(""+getPlayerY())
				menuses .addView( yspawn );
				yspawn.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				var zspawn = new android.widget.EditText(ctx);
				zspawn .setHint("Z");
				zspawn .setText(""+getPlayerZ())
				menuses .addView( zspawn );
				zspawn.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/



				var spawnentbtokn = new android.widget.Button(ctx);

				spawnentbtokn.setTextSize(textsize)
				spawnentbtokn.setText("生成实体");

				spawnentbtokn.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						stkMessage("生成实体的 ID: "+entityid.getText()+" !")
						sx = parseInt(xspawn.getText())
						sy = parseInt(yspawn.getText())
						sz = parseInt(zspawn.getText())
						enid = parseInt(entityid.getText())
						spsppp = 1;
						dialogses.dismiss()
					}
				});

				menuses.addView( spawnentbtokn );


				var spawnatplaterpos = new android.widget.Button(ctx);
				spawnatplaterpos .setTextSize(textsize)
				spawnatplaterpos .setText("设置玩家位置为xyz");
				spawnatplaterpos .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						xspawn.setText(""+getPlayerX());
						yspawn.setText(""+getPlayerY());
						zspawn.setText(""+getPlayerZ());
					}
				});
				menuses.addView( spawnatplaterpos );



				var Arrow = new android.widget.Button(ctx);
				Arrow .setTextSize(textsize)
				Arrow .setText("箭");
				Arrow .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("80")
					}
				});
				menuses.addView( Arrow );

				var Chicken = new android.widget.Button(ctx);
				Chicken .setTextSize(textsize)
				Chicken .setText("鸡");
				Chicken .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("10")
					}
				});
				menuses.addView( Chicken );


				var Cow = new android.widget.Button(ctx);
				Cow .setTextSize(textsize)
				Cow .setText("牛");
				Cow .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("11")
					}
				});
				menuses.addView( Cow );


				var Creeper = new android.widget.Button(ctx);
				Creeper .setTextSize(textsize)
				Creeper .setText("苦力怕");
				Creeper .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("33")
					}
				});
				menuses.addView( Creeper );


				var Egg = new android.widget.Button(ctx);
				Egg .setTextSize(textsize)
				Egg .setText("鸡蛋");
				Egg .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("82")
					}
				});
				menuses.addView( Egg );



				var Minecart = new android.widget.Button(ctx);
				Minecart .setTextSize(textsize)
				Minecart .setText("矿车");
				Minecart .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("84")
					}
				});
				menuses.addView( Minecart );

				var Pig = new android.widget.Button(ctx);
				Pig .setTextSize(textsize)
				Pig .setText("猪");
				Pig .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("12")
					}
				});
				menuses.addView( Pig );


				var PigZombie = new android.widget.Button(ctx);
				PigZombie .setTextSize(textsize)
				PigZombie .setText("猪人");
				PigZombie .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("36")
					}
				});
				menuses.addView( PigZombie );


				var PrimedTnt = new android.widget.Button(ctx);
				PrimedTnt .setTextSize(textsize)
				PrimedTnt .setText("点燃的TNT");
				PrimedTnt .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("65")
					}
				});
				menuses.addView( PrimedTnt );


				var Sheep = new android.widget.Button(ctx);
				Sheep .setTextSize(textsize)
				Sheep .setText("羊");
				Sheep .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("13")
					}
				});
				menuses.addView( Sheep );


				var Skeleton = new android.widget.Button(ctx);
				Skeleton .setTextSize(textsize)
				Skeleton .setText("骷髅");
				Skeleton .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("34")
					}
				});
				menuses.addView( Skeleton );

				var Snowball = new android.widget.Button(ctx);
				Snowball .setTextSize(textsize)
				Snowball .setText("雪球");
				Snowball .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("81")
					}
				});
				menuses.addView( Snowball );

				var Spider = new android.widget.Button(ctx);
				Spider .setTextSize(textsize)
				Spider .setText("蜘蛛");
				Spider .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("35")
					}
				});
				menuses.addView( Spider );

				var Zombie = new android.widget.Button(ctx);
				Zombie .setTextSize(textsize)
				Zombie .setText("僵尸");
				Zombie .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						entityid .setText("32")
					}
				});
				menuses.addView( Zombie );


				dialogses.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

///////////*Running and Sneak*/////////
/*
Entity.setSneaking(Player.getEntity(), boolean);
*/

function racopenmenu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsicrc = new android.widget.LinearLayout(ctx);
				var scrollmsicrc = new android.widget.ScrollView(ctx);

				menumsicrc.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsicrc.addView(menumsicrc);

				var dialogmsicrc = new android.app.Dialog(ctx);
				dialogmsicrc.setContentView(scrollmsicrc);
				dialogmsicrc.setTitle("疾跑与潜行");


				var runbtn = new android.widget.Button(ctx);
				if(isRunning)
				{
					runbtn.setText("行走");
				}
				else if(isRunning == false)
				{
					runbtn.setText("疾跑");
				}
				runbtn .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(isRunning==false)
						{
							runbtn.setText("行走");
							isRunning=true;
						}
						else if(isRunning)
						{
							runbtn.setText("疾跑");
							isRunning =false
						}

					}
				})

				runbtn.setTextSize(textsize)
				menumsicrc.addView(runbtn);


				var sneakbtn = new android.widget.Button(ctx);
				if(isSneaking)
				{
					sneakbtn .setText("站立");
				}
				else if(isSneaking == false)
				{
					sneakbtn .setText("潜行");
				}
				sneakbtn .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(isSneaking==false)
						{
							sneakbtn .setText("站立");
							isSneaking =true;
							Entity.setSneaking(getPlayerEnt(), true);
						}
						else if(isSneaking)
						{
							sneakbtn .setText("潜行");
							isSneaking =false
							Entity.setSneaking(getPlayerEnt(), false);
						}

					}
				})

				sneakbtn .setTextSize(textsize)
				menumsicrc.addView(sneakbtn);


				/*isSneaking*/

				dialogmsicrc.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

/////////////*Time/GameMode*//////////
var mctime = Math.round(Level.getTime());

function tgmopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menutgm = new android.widget.LinearLayout(ctx);
				var scrolltgm = new android.widget.ScrollView(ctx);

				menutgm.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrolltgm.addView(menutgm);

				var dialogtgm = new android.app.Dialog(ctx);
				dialogtgm.setContentView(scrolltgm);
				dialogtgm.setTitle("游戏时间与模式");

				var timeedit = new android.widget.EditText(ctx);
				timeedit.setHint("MC时间");
				timeedit.setText(""+mctime);
				menutgm.addView(timeedit);
				timeedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)


				var timesave = new android.widget.Button(ctx);
				timesave .setTextSize(textsize)
				timesave .setText("设定游戏时间");
				timesave .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(timeedit.getText()!="")
						{

							mctime = timeedit.getText();
							Level.setTime(mctime);
							stkMessage("已经设置游戏时间到"+mctime+"!");
							dialogtgm.dismiss()
						}
						else
						{
							print("请填写要设置的mc时间！");
						}
					}
				});
				menutgm.addView(timesave);

				var daytime = new android.widget.Button(ctx);
				daytime.setTextSize(textsize)
				daytime .setText("白天");
				daytime .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setTime(0);
						dialogtgm.dismiss()
						stkMessage("已经设置游戏时间到白天");
					}
				});
				menutgm.addView(daytime);

				var nighttime = new android.widget.Button(ctx);
				nighttime .setTextSize (textsize)
				nighttime .setText("晚上");
				nighttime .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setTime(14000);
						stkMessage("已经设置游戏时间到晚上!");
						dialogtgm.dismiss()
					}
				});
				menutgm.addView(nighttime);

				var gmsur = new android.widget.Button(ctx);
				gmsur .setTextSize (textsize)
				gmsur .setText("生存");
				gmsur .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setGameMode(0);
						stkMessage("已经设置游戏模式到生存!");
						dialogtgm.dismiss()
					}
				});
				menutgm.addView(gmsur);

				gmcreava = new android.widget.Button(ctx);
				gmcreava .setTextSize (textsize)
				gmcreava .setText("冒险");
				gmcreava .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setGameMode(2);
						stkMessage("已经设置游戏模式到冒险!");
						dialogtgm.dismiss()
					}
				});
				menutgm.addView( gmcreava );

				gmcrea = new android.widget.Button(ctx);
				gmcrea .setTextSize (textsize)
				gmcrea .setText("创造");
				gmcrea .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setGameMode(1);
						stkMessage("已经设置游戏模式到创造!");
						dialogtgm.dismiss()
					}
				});
				menutgm.addView(gmcrea);


				gmcreavas = new android.widget.Button(ctx);
				gmcreavas .setTextSize (textsize)
				gmcreavas .setText("旁观");
				gmcreavas .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Level.setGameMode(3);
						stkMessage("已经设置游戏模式到旁观");
						dialogtgm.dismiss()
					}
				});
				menutgm.addView( gmcreavas );

				dialogtgm.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}


//////////*Destory Block Function*/////////

function destroyBlock(x,y,z,side)
{
	if(Level.getGameMode() == 3)
	{
		preventDefault();
	}
}


//////////////////*TMI*//////////////////

var itemid = "0";
var itemamount = "0";
var itemdata = "0";

function tmiopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menutmi = new android.widget.LinearLayout(ctx);
				var scrolltmi = new android.widget.ScrollView(ctx);

				menutmi.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrolltmi.addView(menutmi);

				var dialogtmi = new android.app.Dialog(ctx);
				dialogtmi.setContentView(scrolltmi);
				dialogtmi.setTitle("内置修改器（TMI）");

				var idedit = new android.widget.EditText(ctx);
				idedit.setHint("物品ID");
				menutmi.addView(idedit);
				idedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				var amountedit = new android.widget.EditText(ctx);
				amountedit.setHint("数量（默认1）");
				menutmi.addView(amountedit);
				amountedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				var dataedit = new android.widget.EditText(ctx);
				dataedit.setHint("特殊数据值/损坏度");
				menutmi.addView(dataedit);
				dataedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				/*
				Data File:
				-idedit
				-amountedit
				-dataedit
				*/

				var tmibuttonsave = new android.widget.Button(ctx);
				tmibuttonsave.setTextSize(textsize)
				tmibuttonsave.setText("增加物品");
				tmibuttonsave.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(idedit.getText()!="")
						{

							itemid = idedit.getText();
						}
						else
						{
							print("请输入物品id！");
						}
						if(amountedit.getText()!="")
						{

							itemamount = amountedit.getText();
						}
						else
						{
							itemamount = 0;
						}
						if(dataedit.getText()!="")
						{


							itemdata = dataedit.getText();
						}
						else
						{

							itemdata = 0;
						}
						additemtmi()
						dialogtmi.dismiss()
					}
				});
				menutmi.addView(tmibuttonsave);


				dialogtmi.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

////////*Add Item(TMI)*/////////
function additemtmi()
{
	Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.pop", 1, 1);
	if(Level.getGameMode() == 1)
	{
		Entity.setCarriedItem(getPlayerEnt(), itemid,
			itemamount, itemdata);
	}
	Player.addItemInventory(itemid ,itemamount ,itemdata);
	itemid = "0";
	itemamount = "0";
	itemdata = "0";
}


///////////*Msic Menu*/////////////
function msicmenu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsic = new android.widget.LinearLayout(ctx);
				var scrollmsic = new android.widget.ScrollView(ctx);

				menumsic.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsic.addView(menumsic);

				var dialogmsic = new android.app.Dialog(ctx);
				dialogmsic.setContentView(scrollmsic);
				dialogmsic.setTitle("五花八门的选项（杂项设置）");

				var healthbackbtn = new android.widget.Button(ctx);
				healthbackbtn .setText("回满体力");
				healthbackbtn .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setHealth(20);
						dialogmsic.dismiss()
					}
				});
				healthbackbtn .setTextSize(textsize)
				menumsic.addView(healthbackbtn);

				var suicidebtn = new android.widget.Button(ctx);
				suicidebtn .setText("自杀");
				suicidebtn .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setHealth(0);
						dialogmsic.dismiss()
					}
				});
				suicidebtn .setTextSize(textsize)
				menumsic.addView(suicidebtn);



				var gsbtrnhsettphome = new android.widget.Button(ctx);
				gsbtrnhsettphome .setText("传送回家");
				gsbtrnhsettphome .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if (ModPE.readData("setHomeData") == 1)
						{
							Entity.setPosition(Player.getEntity(), parseInt(ModPE.readData("homeX")) + 0.5, parseInt(ModPE.readData("homeY")) + 2, parseInt(ModPE.readData("homeZ")) + 0.5);
							stkMessage("已经传送你回家了");
						}
						else
						{
							stkMessage("你还没设置家的位置!");
						}
						dialogmsic.dismiss()
					}
				});
				gsbtrnhsettphome .setTextSize(textsize)
				menumsic.addView( gsbtrnhsettphome );




				var gsbtrnhset = new android.widget.Button(ctx);
				gsbtrnhset .setText("设定家的位置");
				gsbtrnhset .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						ModPE.saveData("homeX",parseInt(Player.getX()));
						ModPE.saveData("homeY",parseInt(Player.getY()));
						ModPE.saveData("homeZ",parseInt(Player.getZ()));
						ModPE.saveData("setHomeData",1);
						stkMessage("家的位置在 " + Math.floor(ModPE.readData("homeX")) + ", " + Math.floor(ModPE.readData("homeY")) + ", " + Math.floor(ModPE.readData("homeZ")));
						dialogmsic.dismiss()
					}
				});
				gsbtrnhset .setTextSize(textsize)
				menumsic.addView( gsbtrnhset );




				var gsbtrnhsetdel = new android.widget.Button(ctx);
				gsbtrnhsetdel .setText("删除家的位置");
				gsbtrnhsetdel .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if (ModPE.readData("setHomeData") == 1)
						{
							ModPE.saveData("setHomeData",0);
							stkMessage("家的位置已经删除");
						}
						else if (ModPE.readData("setHomeData") == 0)
						{
							stkMessage(" 你还没设置家的位置! ");
						}

						dialogmsic.dismiss()
					}
				});
				gsbtrnhsetdel .setTextSize(textsize)
				menumsic.addView( gsbtrnhsetdel );


				var gsbtrn = new android.widget.Button(ctx);
				gsbtrn.setText("修复盔甲");
				gsbtrn.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, Player.getArmorSlot(0), 0);
						Player.setArmorSlot(1, Player.getArmorSlot(1), 0);
						Player.setArmorSlot(2, Player.getArmorSlot(2), 0);
						Player.setArmorSlot(3, Player.getArmorSlot(3), 0);
						stkMessage("修复现有所有装甲");
						dialogmsic.dismiss()
					}
				});
				gsbtrn.setTextSize(textsize)
				menumsic.addView(gsbtrn);


				var gsbtrni = new android.widget.Button(ctx);
				gsbtrni.setText("盔甲信息");
				gsbtrni.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						stkclientMessage("头盔:\n种类: " + Player.getArmorSlot(0) + "; 损坏度: " + Player.getArmorSlotDamage(0));
						stkclientMessage("胸甲:\n种类: " + Player.getArmorSlot(1) + "; 损坏度: " + Player.getArmorSlotDamage(1));
						stkclientMessage("腿部装甲:\n种类: " + Player.getArmorSlot(2) + "; 损坏度: " + Player.getArmorSlotDamage(2));
						stkclientMessage("靴子:\n种类: " + Player.getArmorSlot(3) + "; 损坏度: " + Player.getArmorSlotDamage(3));
						dialogmsic.dismiss()
					}
				});
				gsbtrni.setTextSize(textsize)
				menumsic.addView(gsbtrni);


				var amorbtn = new android.widget.Button(ctx);
				amorbtn.setText("设定装甲");
				amorbtn.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						amoropen()
						dialogmsic.dismiss()
					}
				});
				amorbtn.setTextSize(textsize)
				menumsic.addView(amorbtn);


				var gsbtn = new android.widget.Button(ctx);
				gsbtn.setText("游戏速度设置");
				gsbtn.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						gsmenuopen()
						dialogmsic.dismiss()
					}
				});
				gsbtn.setTextSize(textsize)
				menumsic.addView(gsbtn);


				var worldbutton = new android.widget.Button(ctx);
				worldbutton.setText("多世界世界切换");
				worldbutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						worldmenu()
						dialogmsic.dismiss()
					}
				});
				worldbutton.setTextSize(textsize)
				menumsic.addView(worldbutton);

				var tpbutton = new android.widget.Button(ctx);
				tpbutton.setText("传送");
				tpbutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						tpmenu()
						dialogmsic.dismiss()
					}
				});
				tpbutton.setTextSize(textsize)
				menumsic.addView(tpbutton);

				var spawnsbutton = new android.widget.Button(ctx);
				spawnsbutton.setText("设置重生点");
				spawnsbutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						spawnmenu()
						dialogmsic.dismiss()
					}
				});
				spawnsbutton.setTextSize(textsize)
				menumsic.addView(spawnsbutton);



				dialogmsic.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

//////////////*Change Game Speed(Msic)*///////////
var gamespeed = 20;
function gsmenuopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsicwgs = new android.widget.LinearLayout(ctx);
				var scrollmsicwgs = new android.widget.ScrollView(ctx);

				menumsicwgs.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsicwgs.addView(menumsicwgs);

				var dialogmsicwgs = new android.app.Dialog(ctx);
				dialogmsicwgs.setContentView(scrollmsicwgs);
				dialogmsicwgs.setTitle("游戏速度设置");

				var gsedit = new android.widget.EditText(ctx);
				gsedit.setHint("设定速度（普通速度20）");
				gsedit.setText(""+gamespeed);
				gsedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/
				menumsicwgs.addView(gsedit);

				var gsgobutton = new android.widget.Button(ctx);
				gsgobutton.setTextSize(textsize)
				gsgobutton.setText("采用");
				gsgobutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(gsedit.getText()!="")
						{
							dialogmsicwgs.dismiss()
							gamespeed = gsedit.getText();
							ModPE.setGameSpeed(gamespeed)
						}
						else
						{
							gamespeed = 20;
						}
					}
				});
				menumsicwgs.addView(gsgobutton);
				dialogmsicwgs.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

/////////////////*Set Armor (msic)*/////////////////

function amoropen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsicwa = new android.widget.LinearLayout(ctx);
				var scrollmsicwa = new android.widget.ScrollView(ctx);

				menumsicwa.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsicwa.addView(menumsicwa);

				var dialogmsicwa = new android.app.Dialog(ctx);
				dialogmsicwa.setContentView(scrollmsicwa);
				dialogmsicwa.setTitle("设定装甲");



				var ao = new android.widget.Button(ctx);
				ao .setTextSize(textsize)
				ao .setText("穿上皮革装甲");
				ao .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, 298, 0);
						Player.setArmorSlot(1, 299, 0);
						Player.setArmorSlot(2, 300, 0);
						Player.setArmorSlot(3, 301, 0);
						stkMessage("装甲设定完毕");
						dialogmsicwa.dismiss()
					}
				});
				menumsicwa.addView( ao )


				var aoo = new android.widget.Button(ctx);
				aoo .setTextSize(textsize)
				aoo .setText("穿上链甲");
				aoo .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, 302, 0);
						Player.setArmorSlot(1, 303, 0);
						Player.setArmorSlot(2, 304, 0);
						Player.setArmorSlot(3, 305, 0);
						stkMessage("装甲设定完毕!");
						dialogmsicwa.dismiss()
					}
				});
				menumsicwa.addView( aoo )


				var aooo = new android.widget.Button(ctx);
				aooo .setTextSize(textsize)
				aooo .setText("穿上铁甲");
				aooo .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, 306, 0);
						Player.setArmorSlot(1, 307, 0);
						Player.setArmorSlot(2, 308, 0);
						Player.setArmorSlot(3, 309, 0);
						stkMessage("装甲设定完毕");
						dialogmsicwa.dismiss()
					}
				});
				menumsicwa.addView( aooo )


				var aoooo = new android.widget.Button(ctx);
				aoooo .setTextSize(textsize)
				aoooo .setText("穿上钻石护甲");
				aoooo .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, 310, 0);
						Player.setArmorSlot(1, 311, 0);
						Player.setArmorSlot(2, 312, 0);
						Player.setArmorSlot(3, 313, 0);
						stkMessage("装甲设定完毕");
						dialogmsicwa.dismiss()
					}
				});
				menumsicwa.addView( aoooo )


				var aooooo = new android.widget.Button(ctx);
				aooooo .setTextSize(textsize)
				aooooo .setText("穿上金护甲");
				aooooo .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						Player.setArmorSlot(0, 314, 0);
						Player.setArmorSlot(1, 315, 0);
						Player.setArmorSlot(2, 316, 0);
						Player.setArmorSlot(3, 317, 0);
						stkMessage("装甲设定完毕");
						dialogmsicwa.dismiss()
					}
				});
				menumsicwa.addView( aooooo )


				dialogmsicwa.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

//////////////*(Msic)World Changer*///////////
function worldmenu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsicw = new android.widget.LinearLayout(ctx);
				var scrollmsicw = new android.widget.ScrollView(ctx);

				menumsicw.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsicw.addView(menumsicw);

				var dialogmsicw = new android.app.Dialog(ctx);
				dialogmsicw.setContentView(scrollmsicw);
				dialogmsicw.setTitle("多世界世界转换");

				var worldedit = new android.widget.EditText(ctx);
				worldedit.setHint("世界名字");
				menumsicw.addView(worldedit);

				var worldgobutton = new android.widget.Button(ctx);
				worldgobutton.setTextSize(textsize)
				worldgobutton.setText("走你~!");
				worldgobutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(worldedit.getText()!="")
						{
							dialogmsicw.dismiss()
							ModPE.selectLevel(worldedit.getText());
						}
						else
						{
							print("请输入世界名字！");
						}
					}
				});
				menumsicw.addView(worldgobutton);
				dialogmsicw.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

/////////////////*(Msic)Teleport system*////////////

function tpmenu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menumsictp = new android.widget.LinearLayout(ctx);
				var scrollmsictp = new android.widget.ScrollView(ctx);

				menumsictp.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollmsictp.addView(menumsictp);

				var dialogmsictp = new android.app.Dialog(ctx);
				dialogmsictp.setContentView(scrollmsictp);
				dialogmsictp.setTitle("传送");

				var xedit = new android.widget.EditText(ctx);
				xedit.setHint("X");
				xedit.setText(String(getPlayerX()))
				menumsictp.addView(xedit);

				var yedit = new android.widget.EditText(ctx);
				yedit.setHint("Y");
				yedit.setText(String(getPlayerY()))
				menumsictp.addView(yedit);

				var zedit = new android.widget.EditText(ctx);
				zedit.setHint("Z");
				zedit.setText(String(getPlayerZ()))
				menumsictp.addView(zedit);

				var tpgobutton = new android.widget.Button(ctx);
				tpgobutton.setTextSize(textsize)
				tpgobutton.setText("超时空传送!");
				tpgobutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{

						var tx = parseInt(xedit.getText());
						var ty = parseInt(yedit.getText());
						var tz = parseInt(zedit.getText());
						Entity.setPosition(getPlayerEnt(), tx, ty, tz);

						stkMessage("传送到"+" "+"X:"+" "+tx+" "+"Y:"+" "+ty+" "+"Z:"+" "+tz)
						dialogmsictp.dismiss()
					}
				});
				menumsictp.addView(tpgobutton);

				dialogmsictp.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

////////////*Set Spawn(Msic)*/////////
function spawnmenu ()
{
	ctx.runOnUiThread(new java.lang.Runnable({ run: function()
		{
			try
			{
				var builder = new android.app.AlertDialog.Builder(ctx);
				builder.setIconAttribute(android.R.attr.alertDialogIcon);
				builder.setTitle("设置重生点");
				builder.setMessage("你确定把此地设为重生点？");
				builder.setPositiveButton("是", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());
						stkMessage("重生点已设置!");
					}
				}));
				builder.setNegativeButton("否", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						stkMessage("没有设置重生点!");
					}
				}));
				builder.show();
			}
			catch(err)
			{
				clientMessage("§c" + err);
			}
		}
	}));
}
///////////*Show Button*////////
function showbtnposbtn()
{
	ctx.runOnUiThread(new java.lang.Runnable({ run: function()
		{
			try
			{
				var btnposbuilder = new android.app.AlertDialog.Builder(ctx);

				btnposbuilder .setTitle("显示/隐藏 GUI");

				btnposbuilder .setPositiveButton("显示 GUI", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						saveguishowing = true;
						guishowing = true;
						rakbtnopen()
						tmibtnopengui()
					}
				}));

				btnposbuilder.setNeutralButton("隐藏 GUI", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						saveguishowing = false;
						guishowing = false;
						if (rakmenu != null)
						{
							rakmenu.dismiss();
						}
						if(tmiguimenu != null)
						{
							tmiguimenu.dismiss();
						}
					}
				}));


				btnposbuilder.show();
			}
			catch(err)
			{
				clientMessage("§c" + err);
			}
		}
	}));
}

////////*STK DATA*//////
function showbtnstkdatabtn()
{
	ctx.runOnUiThread(new java.lang.Runnable({ run: function()
		{
			try
			{
				var stkdatabuilder = new android.app.AlertDialog.Builder(ctx);

				stkdatabuilder.setTitle("工具箱数据");

				stkdatabuilder.setPositiveButton("显示工具箱数据(GUI)", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						ftype()
					}
				}));

				stkdatabuilder.setNeutralButton("隐藏工具箱数据(GUI)", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						if (btn != null)
						{
							btn.dismiss();
						}
					}
				}));


				stkdatabuilder.show();
			}
			catch(err)
			{
				clientMessage("§c" + err);
			}
		}
	}));
}
//////////*Notes Parts*//////////
/*
dialog.dismiss()
dialogtmi.dismiss()
dialogmsic.show()

*/
/*
var button=new android.widget.ImageButton(ctx)
    button.setBackgroundDrawable(null) button.setImageDrawable(ctx.getResources().getDrawable(android.R.drawable.ic_menu_preferences))
    */
/*
var tx = parseInt(etX.getText());
var ty = parseInt(etY.getText());
var tz = parseInt(etZ.getText());
Entity.setPosition(getPlayerEnt(), tx, ty, tz);
*/
/*
Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());

sgMessage("Spawn set!");
*/
/*
textgm.setTextSize(15)
*/

////////*Open Menu Button(Move by A5)*////////

var stkmenu = null;
var menubtn = null;


function menubtnopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{
				stkmenu = new android.widget.PopupWindow(ctx);
				var layout = new android.widget.LinearLayout(ctx);

				var menubtn =new android.widget.ImageButton(ctx);

				menubtn.setBackgroundDrawable(null)

				menubtn.setImageDrawable(ctx.getResources().getDrawable(android.R.drawable.ic_menu_preferences))


				menubtn.setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function(viewarg)
					{
						menu()
					}
				}));

				menubtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
				{
					onLongClick:
					function(v,t)
					{
						down=true;
						ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
						stkMessage("你能够移动按钮了!")
						return true
					}
				});
				menubtn.setOnTouchListener(new android.view.View.OnTouchListener(
				{
					onTouch :function(v, e)
					{
						if(!down)
						{
							mX=e.getX()
							mY=e.getY()
						}
						if(down)
						{
							var a=e.getAction()
							if(a==2)
							{
								var X=parseInt(e.getX() - mX)*-1/10;
								var Y=parseInt(e.getY() - mY)*-1/10;
								tpopx = tpopx + X;
								tpopy = tpopy + Y;
								stkmenu.update(parseInt(tpopx), parseInt(tpopy), -1, -1);
							}
							if(a==1) down=false;
						}
						return false;
					}
				}));

				layout.addView(menubtn);

				stkmenu.setContentView(layout);

				stkmenu.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				stkmenu.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				stkmenu.setBackgroundDrawable(new
					android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

				stkmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT,tpopx,tpopy);

			}
			catch(error)
			{
				print("Error: "+error);
			}
		}
	});
}
//////////*GUI BTN*//////////
//tgmopen()
var tmiguimenu = null;
var tmibtnopen = null;

function tmibtnopengui()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				tmiguimenu = new android.widget.PopupWindow();

				var layouttmi = new android.widget.LinearLayout(ctx);

				var tmibtnopen = new android.widget.Button(ctx);

				layouttmi.setOrientation(android.widget.LinearLayout.VERTICAL);

				tmibtnopen.setText("内置修改器（TMI）");

				tmibtnopen.setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function(viewarg)
					{
						tmiopen()
					}
				}));
				tmibtnopen.setTextSize(textsize)
				layouttmi.addView(tmibtnopen);


				var gmtimebtnopen = new android.widget.Button(ctx);


				gmtimebtnopen.setText("游戏时间与模式");

				gmtimebtnopen.setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function(viewarg)
					{
						tgmopen()
					}
				}));

				gmtimebtnopen.setTextSize(textsize)
				layouttmi.addView(gmtimebtnopen);

				var msicbtnopen = new android.widget.Button(ctx);

				msicbtnopen.setText("杂项设置");

				msicbtnopen.setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function(viewarg)
					{
						msicmenu()
					}
				}));

				msicbtnopen.setTextSize(textsize)

				layouttmi.addView(msicbtnopen);


				tmiguimenu.setContentView(layouttmi);

				tmiguimenu.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				tmiguimenu.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				tmiguimenu.setBackgroundDrawable(new
					android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

				tmiguimenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 60);

			}
			catch(error)
			{
				print("Error: "+error);
			}
		}
	});
}

//////////*RAS BTN*////////
var rakmenu = null;


function rakbtnopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{
				rakmenu = new android.widget.PopupWindow();
				var layoutrak = new android.widget.LinearLayout(ctx);
				layoutrak.setOrientation(android.widget.LinearLayout.VERTICAL);



				var runbtnopen = new android.widget.Button(ctx);
				if(isRunning)
				{
					runbtnopen .setText("行走");
				}
				else if(isRunning == false)
				{
					runbtnopen .setText("疾跑");
				}
				runbtnopen .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(isRunning==false)
						{
							runbtnopen .setText("行走");
							isRunning=true;
						}
						else if(isRunning)
						{
							runbtnopen .setText("疾跑");
							isRunning =false
						}

					}
				})

				runbtnopen .setTextSize(textsize)
				layoutrak.addView(runbtnopen);

				var sneakbtnopen = new android.widget.Button(ctx);
				if(isSneaking)
				{
					sneakbtnopen .setText("站立");
				}
				else if(isSneaking == false)
				{
					sneakbtnopen .setText("潜行");
				}
				sneakbtnopen .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(isSneaking==false)
						{
							sneakbtnopen .setText("站立");
							isSneaking =true;
							Entity.setSneaking(getPlayerEnt(), true);
						}
						else if(isSneaking)
						{
							sneakbtnopen .setText("潜行");
							isSneaking =false
							Entity.setSneaking(getPlayerEnt(), false);
						}

					}
				})

				sneakbtnopen.setTextSize(textsize)
				layoutrak.addView(sneakbtnopen);




				rakmenu.setContentView(layoutrak);

				rakmenu.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				rakmenu.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				rakmenu.setBackgroundDrawable(new
					android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));

				rakmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 150);

			}
			catch(error)
			{
				print("Error: "+error);
			}
		}
	});
}


/////////*Setting Menu*//////////////
function settingmenu()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menuset = new android.widget.LinearLayout(ctx);
				var scrollset = new android.widget.ScrollView(ctx);

				menuset.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollset.addView(menuset);

				var dialogset = new android.app.Dialog(ctx);
				dialogset.setContentView(scrollset);
				dialogset.setTitle("工具箱设置");

				var tsedit = new android.widget.EditText(ctx);
				tsedit.setHint("字体大小");
				tsedit.setText(""+textsize);
				menuset.addView(tsedit);
				tsedit.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL)/*Number Only*/

				var applybutton = new android.widget.Button(ctx);
				applybutton.setTextSize(textsize)
				applybutton.setText("采用");
				applybutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						if(tsedit.getText()!="")
						{
							textsize = ModPE.readData("textsize");
							ModPE.saveData("textsize", textsize);
							dialogset.dismiss()
							textsize = tsedit.getText();
						}
						else
						{
							textsize = ModPE.readData("textsize");
							ModPE.saveData("textsize", textsize);
							textsize = 15;
							print("请输入字体大小!");
						}

					}
				});
				menuset.addView(applybutton);

				var posbutton = new android.widget.Button(ctx);
				posbutton.setText("工具箱按钮位置");
				posbutton.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						posbtn()
						dialogset.dismiss();
					}
				});
				posbutton.setTextSize(textsize)
				menuset.addView(posbutton);

				var shbtnos = new android.widget.Button(ctx);
				shbtnos .setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick:
					function()
					{
						showbtnposbtn()
						dialogset.dismiss()
					}
				})
				shbtnos.setText("显示/隐藏 GUI")
				shbtnos.setTextSize(textsize)
				menuset .addView(shbtnos);
				dialogset.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

/////////////*pos btn(setting)*////////////
function posbtn()
{
	ctx.runOnUiThread(new java.lang.Runnable({ run: function()
		{
			try
			{
				var posbuilder = new android.app.AlertDialog.Builder(ctx);

				posbuilder.setTitle("工具箱按钮位置");

				posbuilder.setMessage("长摁工具箱按钮来移动!");

				posbuilder.setPositiveButton("左上", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						stkmenu.dismiss();
						stkmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 0);
					}
				}));

				posbuilder.setNeutralButton("右下", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						stkmenu.dismiss();
						stkmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
					}
				}));

				posbuilder.setNegativeButton("右上", android.content.DialogInterface.OnClickListener(
				{
					onClick: function()
					{
						stkmenu.dismiss();
						stkmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
					}
				}));

				posbuilder.show();
			}
			catch(err)
			{
				clientMessage("§c" + err);
			}
		}
	}));
}

/////////////*Leave Game Function*////////
function leaveGame()
{
	iskq=false;
	mobs=new Array()
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			if(stkmenu != null)
			{
				stkmenu.dismiss();
			}
			if (rakmenu != null)
			{
				rakmenu.dismiss();
			}
			if(tmiguimenu != null)
			{
				tmiguimenu.dismiss();
			}
			if(btn != null)
			{
				btn.dismiss();
			}
		}
	});
}

var btn=null
var n=null
var dp
var allofgytype=[0,0,0,0,0]
var n
var l=1
									var fx=["↑","↗","→","↘","↓","↙","←","↖"]//方向
									var jg=0
									function ftype()
									{

										ctx.runOnUiThread(new java.lang.Runnable(
										{
											run: function()
											{
												try
												{

													dp = ctx.getResources().getDisplayMetrics().density;

													var mX,mY;
													tpopx = 5*dp;
													tpopy = 25*dp;

													var layout=new android.widget.LinearLayout(ctx);
													layout.setOrientation(1)
													btn=new android.widget.Button(ctx);
													btn.setTextSize(10)
													btn.setText("加载数据中……");
													n=btn
													btn.setOnTouchListener(new android.view.View.OnTouchListener(
													{
														onTouch :function(v, e)
														{
															switch (e.getAction())
															{
																case 0:
																mX=e.getX();
																mY=e.getY();
																break;
																case 2:
																var delX=parseInt(e.getX()-mX);
																var delY=parseInt(e.getY()-mY);
																tpopx = tpopx + delX;
																tpopy = tpopy + delY;
																btn.update(parseInt(tpopx), parseInt(tpopy), -1, -1);
																break;
															}
															return true;
														}
													}));
													layout.addView(btn);
													btn=new android.widget.PopupWindow(layout,ctx.getWindowManager().getDefaultDisplay().getHeight()*0.28, ctx.getWindowManager().getDefaultDisplay().getHeight()*0.28);
													btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, tpopx, tpopy);
													updata()
												}
												catch(err)
												{
													clientMessage("Error:"+err);

												}
											}
										}))
}



function updata()
{
	ctx.runOnUiThread(new java.lang.Runnable(
	{
		run: function()
		{
			new android.os.Handler().postDelayed(new java.lang.Runnable(
			{
				run: function()
				{
					if(n!=null)n.setText("x增方向:"+fx[getyaw()]+"\nX:"+ Math.round(Player.getX())+"\nY:"+Math.round(Player.getY())+"\nZ:"+Math.round(Player.getZ())+"\nMC 时间:"+Math.round(Level.getTime())+"\n游戏模式:"+Level.getGameMode()+"\n超级工具箱");
					updata()
				}
			}),60);
		}
	}))
}



function getyaw()
{
	var yaw=getYaw()%360+360;
	if(yaw%360>337.5||yaw%360<=22.5)
	{
		return 6
	}
	else if(yaw%360>22.5&&yaw%360<=76.5)
	{
		return 5
	}
	else if(yaw%360>67.5&&yaw%360<=112.5)
	{
		return 4
	}
	else if(yaw%360>112.5&&yaw%360<=157.5)
	{
		return 3
	}
	else if(yaw%360>157.5&&yaw%360<=202.5)
	{
		return 2
	}
	else if(yaw%360>202.5&&yaw%360<=247.5)
	{
		return 1
	}
	else if(yaw%360>247.5&&yaw%360<=292.5)
	{
		return 0
	}
	else if(yaw%360>292.5&&yaw%360<=337.5)
	{
		return 7
	}
}
///////*Mod Tick*//////
var guishowing = false;

function modTick()
{
	if (++time==timeout)
	{
		time=0
		for(var i in mobs)
			mobs[i].update()
	}
	if (guishowing == true)
	{
		guishowing = false;
	}
	if (guishowing == false)
	{
	}
	if(spsppp==1)
	{
		Level.spawnMob(sx,sy ,sz,enid);
		spsppp = 0;
	}
	if(js)
	{
		jssj--
	}
	if(jssj==0)
	{
		js=false
		jssj=80
		try
		{
			playername=Player.getName(getPlayerEnt())
			ModPE.showTipMessage(space+ChatColor.YELLOW + "[工具箱]:"+ChatColor.WHITE+"欢迎您,"+" "+ChatColor.YELLOW+playername+ChatColor.WHITE+"!")
		}
		catch(err)
		{
			ModPE.showTipMessage(space+ChatColor.YELLOW + "[工具箱]:"+ChatColor.WHITE+"欢迎您,"+" "+ChatColor.YELLOW+playername+ChatColor.WHITE+"!")
		}
	}
	if(isRunning)
	{
//From WhyTofu's Sprint Mod
if(s==1)
{
	Xpos=getPlayerX();
	Zpos=getPlayerZ();
	s = s + 1;
}
else if(s==3)
{
	s=1;
	Xdiff=getPlayerX()-Xpos;
	Zdiff=getPlayerZ()-Zpos;
	setVelX(getPlayerEnt(),Xdiff);
	setVelZ(getPlayerEnt(),Zdiff);
	Xdiff=0;
	Zdiff=0;
}
if(s!=1)
{
	s = s + 1;
}
}
else if(isRunning==false)
{
	return null;
}
if(isSneaking)
{
	Entity.setSneaking(getPlayerEnt(), true);
	isSneaking = true;
}
else if(isSneaking==false)
{
	Entity.setSneaking(getPlayerEnt(), false);
	isSneaking = false;
	return null;
}
if(spawnmode==1)
{
}
if(issz==true)
{
	for(var js=1; js<=sd; js++)
	{
		var color=bitmap.getPixel(dqkd,dqgd);
		if(rgb==false)
		{
			var he=gethsv(color);
			var jg=jiance(he[0],he[1],he[2]);
			var id=35;
		}
		else if(rgb)
		{
			var r=android.graphics.Color.red(color),g=android.graphics.Color.green(color),b=android.graphics.Color.blue(color);
			var temp=jiancergb(r,g,b);
			var jg=0,id;
			if(temp<=15)
			{
				jg=temp;
				id=35;
			}
			else
			{
				switch(temp)
				{
					case 16:
					id=1;
					break;
					case 17:
					id=3;
					break;
				}
			}
		}
		if(android.graphics.Color.alpha(color)<=20)
		{
			if(ms==0)
				setTile(x+dqkd,y,z+dqgd,0);
			else
				setTile(x+dqkd,y-dqgd,z,0);
		}
		else
		{
			if(ms==0)
				setTile(x+dqkd,y,z+dqgd,id,jg);
			else
				setTile(x+dqkd,y-dqgd,z,id,jg);
		}
		dqkd++;
		if(dqkd==zdkd&&dqgd==zdgd-1)
		{
			dqkd=dqgd=0;
			rgb=iscs=issz=false;
			print("完成");
			ms=x=y=z=0;
			path=null;
			sd=1;
		}
		else if(dqkd==zdkd)
		{
			dqkd=0;
			dqgd++;
		}
	}
}
}
function jiance(h,s,v)
{
	if(h>80&&h<=160)
	{
		if(s>0.1&&0.2<v&&v<=0.55)
			return 13;
		else
			return 5;
	}
	if(s<=0.1&&v>0.85)
	{
		return 0;
	}
	if(s<=0.1&&v>0.65&&v<=0.85)
	{
		return 8;
	}
	if(v<=0.3)
	{
		return 15;
	}
	if(s<=0.1&&0.3<v&&v<=0.65)
	{
		return 7;
	}
	if(h>20&&h<=50)
	{
		if(s>0.1&&0.3<v&&v<=0.55)
			return 12;
		else
			return 1;
	}
	if(h>280&&h<=300)
	{
		return 2;
	}
	if(h>200&&h<=220)
	{
		return 3;
	}
	if(h>50&&h<=80)
	{
		if(s>0.1&&0.3<v&&v<=0.5)
			return 12;
		else
			return 4;
	}
	if(h>300&&h<=340)
	{
		return 6;
	}
	if(h>160&&h<=190)
	{
		return 9;
	}
	if(h>260&&h<=280)
	{
		return 10;
	}
	if(h>190&&h<=260)
	{
		return 11;
	}
	if((h>340&&h<=360)||(h>=0&&h<=20))
	{
		if(0.1<=s&&s<=0.5&&v>=0.75)
			return 6;
		return 14;
	}
	else
	{
		return 15;
	}
}
function jiancergb(R,G,B)
{
	var minrgb=Math.sqrt(Math.pow(R-209,2)+Math.pow(G-209,2)+Math.pow(B-209,2));
	var minjs;
	for(var forjs=0; forjs<18; forjs++)
	{
		var tempr,tempg,tempb,temprgb;
		temprgb=Math.sqrt(Math.pow(R-r[forjs],2)+Math.pow(G-g[forjs],2)+Math.pow(B-b[forjs],2));
		if(temprgb<=minrgb)
		{
			minjs=forjs;
			minrgb=temprgb;
		}
	}
	return minjs;
}
var bitmap,issz=false,dqgd=0,dqkd=0,zdkd,zdgd;
var path,x=0,y=0,z=0,ms=0,sd=1;
function gethsv(ys)
{
	var r=android.graphics.Color.red(ys)/255,g=android.graphics.Color.green(ys)/255,b=android.graphics.Color.blue(ys)/255;
	var h,s,v;
	var min,max,delta;
	min=Math.min(Math.min(r,g),b);
	max=Math.max(Math.max(r,g),b);
	v=max;
	delta=max-min;
	if(max!=0)
		s=delta/max;
	else
	{
		s=0;
		h=-1;
		return[h,s,v];
	}
	if(max==min)
		h=0;
	if(max==r&&g>=b)
		h=60*(g-b)/delta;
	if(max==r&&g<b)
		h=60*(g-b)/delta+360;
	if(max==g)
		h=60*(b-r)/delta+120;
	if(max==b)
		h=60*(r-g)/delta+240;
	return[h,s,v];
}



///////////*Version*/////////

function infoopenver()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menuinfov = new android.widget.LinearLayout(ctx);
				var scrollinfov = new android.widget.ScrollView(ctx);

				menuinfov.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollinfov.addView(menuinfov);

				var dialoginfov = new android.app.Dialog(ctx);
				dialoginfov.setContentView(scrollinfov);
				dialoginfov.setTitle("工具箱版本信息");



				var tttbpmicnlogovv = new android.widget.ImageView(ctx);

				tttbpmicnlogovv.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode( tbpmlogover , 0), 0, android.util.Base64.decode( tbpmlogover , 0).length))

				tttbpmicnlogovv .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("超级工具箱!");
					}
				}));

				menuinfov.addView(tttbpmicnlogovv);


				dialoginfov.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

////////*Info*//////
function infoopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menuinfo = new android.widget.LinearLayout(ctx);
				var scrollinfo = new android.widget.ScrollView(ctx);

				menuinfo.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollinfo.addView(menuinfo);

				var dialoginfo = new android.app.Dialog(ctx);
				dialoginfo.setContentView(scrollinfo);
				dialoginfo.setTitle("超级工具箱的更新信息");



				var tttbpmicnlogo = new android.widget.ImageView(ctx);

				tttbpmicnlogo.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logopic, 0), 0, android.util.Base64.decode(logopic, 0).length))

				tttbpmicnlogo .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("超级工具箱!");
					}
				}));

				menuinfo.addView(tttbpmicnlogo);


				var tbpmicn = new android.widget.ImageView(ctx);

				tbpmicn.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(icaltbpmnew, 0), 0, android.util.Base64.decode(icaltbpmnew, 0).length))

				tbpmicn .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("偶系TBPM~亲，为啥点我那？点arjay好了~");
					}
				}));
				menuinfo.addView(tbpmicn);



				var tbpms = new android.widget.TextView(ctx);
				tbpms.setText("TBPM（超级工具箱编写者）");
				tbpms.setGravity(android.view.Gravity.CENTER);
				tbpms.setTextSize(textsize)
				menuinfo.addView(tbpms);


				var arjicn = new android.widget.ImageView(ctx);
				arjicn.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(icaltarjaynew, 0), 0, android.util.Base64.decode(icaltarjaynew, 0).length))

				arjicn .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("我是arjay，别点我，去点TBPM");
					}
				}));
				menuinfo.addView(arjicn);

				var arjay = new android.widget.TextView(ctx);
				arjay .setText("Arjay_07 编程人员(创意总监)\n\n\n\nTBPM:亲，为我们点个赞吧~\n这个项目真是酷毙了!\n我要在super gamer里边更新点函数,\n然后修复些gui的bug!\n我知道一群gui糊在屏幕哪都是会很讨厌\n，所以我会把它们放到一个菜单里!");
				arjay .setGravity(android.view.Gravity.CENTER);
				arjay .setTextSize(textsize)
				menuinfo.addView(arjay);


				var tbpmicnnn = new android.widget.ImageView(ctx);

				tbpmicnnn .setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(icaltbpmnewqsef, 0), 0, android.util.Base64.decode(icaltbpmnewqsef, 0).length))

				tbpmicnnn .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("我是啦啦~!顺便给a5，铅笔，小崔点个赞！");
					}
				}));
				menuinfo.addView(tbpmicnnn);


				var healthh = new android.widget.TextView(ctx);
				healthh .setText("啦啦君（小地图制作）");
				healthh .setGravity(android.view.Gravity.CENTER);
				healthh .setTextSize(textsize)
				menuinfo.addView( healthh );


				var healthbtn = new android.widget.ImageView(ctx);
				healthbtn.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode( healthbtnicn , 0), 0, android.util.Base64.decode( healthbtnicn , 0).length))

				healthbtn .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("我是铅笔！诶我肿么出来了？潜水！");
					}
				}));
				menuinfo.addView( healthbtn );

				var health = new android.widget.TextView(ctx);
				health .setText("铅笔（生物体力显示）");
				health .setGravity(android.view.Gravity.CENTER);
				health .setTextSize(textsize)
				menuinfo.addView(health);


				var afive = new android.widget.ImageView(ctx);
				afive.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode( afiveicn , 0), 0, android.util.Base64.decode( afiveicn , 0).length))

				afive .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
						print("我是a5！上吧骚年！");
					}
				}));
				menuinfo.addView( afive );

				var arjaya = new android.widget.TextView(ctx);
				arjaya .setText("a5（硬件指导）");
				arjaya .setGravity(android.view.Gravity.CENTER);
				arjaya .setTextSize(textsize)
				menuinfo.addView(arjaya);

				var translaterr = new android.widget.ImageView(ctx);
				translaterr.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode( translatericnnn , 0), 0, android.util.Base64.decode( translatericnnn , 0).length))

				translaterr .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
					}
				}));
				menuinfo.addView( translaterr );

				var translaterdd = new android.widget.TextView(ctx);
				translaterdd .setText(" 小崔（汉化人员）\n\n 我是小崔，可能对于minecraftpe吧的吧友来说我还比较陌生\n我在超级工具箱的发布中担任汉化，也希望能够借此机会与大家熟悉，\n谢谢大家的支持！同色也希望大家能够去我的世界手机版吧，\n我正在那里更新钢铁侠js，\n希望大家能提出宝贵的意见和建议!\n我勒个去800多k，\n我三辈子也做不出来啊…");
				translaterdd .setGravity(android.view.Gravity.CENTER);
				translaterdd .setTextSize(textsize)
				menuinfo.addView(translaterdd);


				var translater = new android.widget.ImageView(ctx);
				translater.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode( translatericn , 0), 0, android.util.Base64.decode( translatericn , 0).length))

				translater .setOnClickListener(new android.view.View.OnClickListener(
				{
					onClick: function()
					{
					}
				}));
				menuinfo.addView( translater );

				var translaterd = new android.widget.TextView(ctx);
				translaterd .setText("小白（汉化人员）");
				translaterd .setGravity(android.view.Gravity.CENTER);
				translaterd .setTextSize(textsize)
				menuinfo.addView(translaterd);



				dialoginfo.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}

//////////*Command GUI*////////


function cmdoopen()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run:
		function()
		{
			try
			{

				var menuinfocm = new android.widget.LinearLayout(ctx);
				var scrollinfocm = new android.widget.ScrollView(ctx);

				menuinfocm.setOrientation(android.widget.LinearLayout.VERTICAL);

				scrollinfocm.addView(menuinfocm);

				var dialoginfocm = new android.app.Dialog(ctx);
				dialoginfocm.setContentView(scrollinfocm);
				dialoginfocm.setTitle("各种指令");



				var cmdlist = new android.widget.TextView(ctx);
				cmdlist.setText("-/armor <set|info>\n-/armor set <leather|chain|iron|diamond|gold>\n-/chest <set|info> <slot>\n -/chest set <slot> <id> [amount] [data]\n-/clear [item] [data]\n-/coords\n-/gamemode <mode>\n-/gamespeed <ticks>\n-/give <id> [amount] [data]\n-/help [page|command name]\n-/home [set|delete]\n-/id\n-/kill\n-/me <action >\n-/playsound <sound> [x] [y] [z] [volume] [pitch]\n-/setblock <x> <y> <z> <TileName> [dataValue] [oldBlockHandling]\n-/setworldspawn <x> <y> <z>\n-/summon <EntityName> [x] [y] [z]\n-/time <set|add> <value>\n-/tp <x> <y> <z> ");
				cmdlist .setGravity(android.view.Gravity.LEFT);
				cmdlist .setTextSize(textsize)
				menuinfocm.addView( cmdlist );



				dialoginfocm.show()

			}
			catch (e)
			{
				print ("Error: "+e)
			}
		}
	});
}


//////////////*Command*/////////////

var usage = ChatColor.RED + "Usage: ";

var cmdArmor = "/armor <set|repair|info>";
var cmdArmorSet = "/armor set <leather|chain|iron|diamond|gold>";
var cmdChest = "/chest <set|info> <slot>";
var cmdChestSet = "/chest set <slot> <id> [amount] [data]";
var cmdClear = "/clear [item] [data]";
var cmdCoords = "/coords";
var cmdGamemode = "/gamemode <mode>";
var cmdGamespeed = "/gamespeed <ticks>";
var cmdGive = "/give <id> [amount] [data]";
var cmdHelp = "/help [page|command name]";
var cmdHome = "/home [set|delete]";
var cmdId = "/id";
var cmdKill = "/kill";
var cmdMe = "/me <action ...>";
var cmdPlaysound = "/playsound <sound> [x] [y] [z] [volume] [pitch]";
var cmdSetblock = "/setblock <x> <y> <z> <TileName> [dataValue] [oldBlockHandling]";
var cmdSetworldspawn = "/setworldspawn OR /setworldspawn <x> <y> <z>";
var cmdSummon = "/summon <EntityName> [x] [y] [z]";
var cmdTime = "/time <set|add> <value>";
var cmdTp = "/tp <x> <y> <z>";

var items = [
"空气",
"石头",
"草方块",
"土块",
"圆石",
"木板",
"树苗",
"基岩",
"水",
"静止的水",
"岩浆",
"静止的岩浆",
"沙子",
"沙砾",
"金矿",
"铁矿",
"煤矿",
"木头",
"树叶",
"海绵",
"玻璃",
"青金石矿",
"青金石块",
"Dispenser",
"沙石",
"Note Block",
"床",
"动力铁轨",
"Detector Rail",
"Sticky Piston",
"蜘蛛网",
"草",
"枯枝子",
"Piston",
"Piston",
"羊毛",
"piston_extension",
"蒲公英",
"玫瑰",
"棕蘑菇",
"红蘑菇",
"金块",
"铁块",
"双石板砖",
"石板砖",
"砖",
"TNT",
"书架",
"苔石",
"黑曜石",
"火把"
];

var itemNameToId =
{
	"空气": 0, "石头": 1, "草方块": 2, "土": 3, "圆石": 4, "木板": 5, "树苗": 6, "基岩": 7, "水": 8, "静止的水": 9,
	"岩浆": 10, "静止的岩浆": 11, "沙子": 12, "沙砾": 13, "金矿": 14, "铁矿": 15, "煤矿": 16, "log": 17, "树叶": 18, "海绵": 19,
	"玻璃": 20, "青金石矿": 21, "青金石块": 22, "dispenser": 23, "沙石": 24, "noteblock": 25, "床": 26, "动力铁轨": 27, "detector_rail": 28, "sticky_piston": 29,
	"蜘蛛网": 30, "长草": 31, "枯树枝": 32, "piston": 33, "piston_head": 34, "羊毛": 35, "piston_extension": 36, "蒲公英": 37, "玫瑰": 38, "棕蘑菇": 39,
	"红蘑菇": 40, "金块": 41, "铁块": 42, "双石板砖": 43, "石板砖": 44, "砖": 45, "tnt": 46, "书架": 47, "苔石": 48, "黑曜石": 49,
	"火把": 50, "火": 51, "mob_spawner": 52, "橡木楼梯": 53, "箱子": 54, "redstone_wire": 55, "钻石矿": 56, "钻石块": 57, "工作台": 58, "小麦": 59,
	"耕地": 60, "火炉": 61, "燃烧的火炉": 62, "站立的告示牌": 63, "木门": 64, "梯子": 65, "铁轨": 66, "石头楼梯": 67, "墙上的告示牌": 68, "lever": 69,
	"stone_pressure_plate": 70, "铁门": 71, "wooden_pressure_plate": 72, "红石矿": 73, "lit_redstone_ore": 74, "unlit_redstone_torch": 75, "redstone_torch": 76, "stone_button": 77, "一层雪": 78, "冰": 79,
	"雪": 80, "仙人掌": 81, "粘土": 82, "reeds": 83, "jukebox": 84, "栅栏": 85, "南瓜": 86, "地狱岩": 87, "soul_sand": 88, "荧石": 89,
	"portal": 90, "lit_pumpkin": 91, "蛋糕": 92
};

var commands =
{
	generic:
	{
		exception:
		ChatColor.RED + "不晓得哪里出错了0_o",
		permission:
		ChatColor.RED + "权限不足，无法使用这个指令",
		syntax:
		ChatColor.RED + "语法问题",
		player:
		{
			notFound:
			ChatColor.RED + "无法找到该玩家"
		},
		notFound:
		ChatColor.RED + "不知此指令，试试/help来打开指令表",
		num:
		{
			invalid:
			function(arg1) { return ChatColor.RED + "'" + arg1 + "' 并不是有效数字"; },
			tooSmall:
			function(arg1, arg2) { return ChatColor.RED + "你输入的数字 (" + parseInt(arg1) + ") 太小了，至少需要到达 " + parseInt(arg2); },
			tooBig:
			function(arg1, arg2)
			{
				return ChatColor.RED + "你输入的数字(" + parseInt(arg1) + ") 太大了，撑死只能是" + parseInt(arg2)
			}
		},
		boolean:
		{
			invalid:
			function(arg1)
			{
				return ChatColor.RED + "'" + arg1 + "' 不是true或者false";
			}
		},
		double:
		{
			tooSmall:
			function(arg1, arg2) { return ChatColor.RED + "你输入的数字 (" + parseFloat(arg1).toFixed(2) + ") 太小了，至少要到达" + parseFloat(arg2).toFixed(2); },
			tooBig:
			function(arg1, arg2)
			{
				return ChatColor.RED + "你输入的数字(" + parseFloat(arg1).toFixed(2) + ") 太大了，撑死只能是" + parseFloat(arg2).toFixed(2);
			}
		},
		usage:
		function(arg1)
		{
			return ChatColor.RED + "用法: " + arg1;
		}
	}
};


// var players = new Array();

// Commands
function procCmd(c)
{
	var p = c.split(" ");
	var command = p[0];
	switch(command)
	{
		case 'eval':
		{
			stkclientMessage(ChatColor.YELLOW + "<- " + c.slice(5));
			try
			{
				stkclientMessage("-> " + eval(c.slice(5)));
			}
			catch(err)
			{
				stkclientMessage(ChatColor.RED + err);
			}
			break;
		}
		case '?':
		case 'help':
		{
			if (isNaN(p[1]))
			{
				switch(p[1])
				{
					case 'armor':
					{
						switch(p[2])
						{
							case 'set':
							{
								stkclientMessage(commands.generic.usage(cmdArmorSet));
								break;
							}
							default:
							{
								stkclientMessage(commands.generic.usage(cmdArmor));
								break;
							}
						}
						break;
					}
					case 'chest':
					{
						switch(p[2])
						{
							case 'set':
							{
								stkclientMessage(usage + cmdChestSet);
								break;
							}
							default:
							{
								stkclientMessage(usage + cmdChest);
								break;
							}
						}
						break;
					}
					case 'clear':
					{
						stkclientMessage(usage + cmdClear);
						break;
					}
					case 'coords':
					{
						stkclientMessage(usage + cmdCoords);
						break;
					}
					case 'gamemode':
					{
						stkclientMessage(usage + cmdGamemode);
						break;
					}
					case 'gamespeed':
					{
						stkclientMessage(usage + cmdGamespeed);
						break;
					}
					case 'give':
					{
						stkclientMessage(usage + cmdGive);
						break;
					}
					case '?':
					case 'help':
					{
						stkclientMessage(usage + cmdHelp);
						break;
					}
					case 'home':
					{
						stkclientMessage(usage + cmdHome);
						break;
					}
					case 'id':
					{
						stkclientMessage(usage + cmdId);
						break;
					}
					case 'kill':
					{
						stkclientMessage(usage + cmdKill);
						break;
					}
					case 'me':
					{
						stkclientMessage(usage + cmdMe);
						break;
					}
					case 'playsound':
					{
						stkclientMessage(usage + cmdPlaysound);
						break;
					}
					case 'setblock':
					{
						stkclientMessage(usage + cmdSetblock);
						break;
					}
					case 'setworldspawn':
					{
						stkclientMessage(usage + cmdSetworldspawn);
						break;
					}
					case 'summon':
					{
						stkclientMessage(usage + cmdSummon);
						break;
					}
					case 'time':
					{
						stkclientMessage(usage + cmdTime);
						break;
					}
					case 'tp':
					{
						stkclientMessage(usage + cmdTp);
						break;
					}
					case undefined:
					{
						clientMessage(ChatColor.YELLOW + "--- 帮助1/4 ---");
						stkclientMessage("§r" + cmdArmor);
						stkclientMessage("§r" + cmdChest);
						stkclientMessage("§r" + cmdClear);
						stkclientMessage("§r" + cmdCoords);
						stkclientMessage("§r" + cmdGamemode);
						break;
					}
					default:
					{
						stkclientMessage(commands.generic.notFound);
						break;
					}
				}
			}
			else
			{
				switch(p[1])
				{
					case '1':
					{
						clientMessage(ChatColor.YELLOW + "--- 帮助1/4 ---");
						stkclientMessage("§r" + cmdArmor);
						stkclientMessage("§r" + cmdChest);
						stkclientMessage("§r" + cmdClear);
						stkclientMessage("§r" + cmdCoords);
						stkclientMessage("§r" + cmdGamemode);
						break;
					}
					case '2':
					{
						clientMessage(ChatColor.YELLOW + "--- 帮助2/4 ---");
						stkclientMessage("§r" + cmdGamespeed);
						stkclientMessage("§r" + cmdGive);
						stkclientMessage("§r" + cmdHelp);
						stkclientMessage("§r" + cmdHome);
						stkclientMessage("§r" + cmdId);
						break;
					}
					case '3':
					{
						clientMessage(ChatColor.YELLOW + "--- 帮助3/4 ---");
						stkclientMessage("§r" + cmdKill);
						stkclientMessage("§r" + cmdMe);
						stkclientMessage("§r" + cmdPlaysound);
						stkclientMessage("§r" + cmdSetblock);
						stkclientMessage("§r" + cmdSetworldspawn);
						break;
					}
					case '4':
					{
						clientMessage(ChatColor.YELLOW + "--- 帮助4/4 ---");
						stkclientMessage("§r" + cmdSummon);
						stkclientMessage("§r" + cmdTime);
						stkclientMessage("§r" + cmdTp);
						break;
					}
					default:
					{
						if (p[1] < 1)
						{
							stkclientMessage(commands.generic.num.tooSmall(p[1], 1));
						}
						if (p[1] > 4)
						{
							stkclientMessage(commands.generic.num.tooBig(p[1], 4));
						}
						break;
					}
				}
			}
			break;
		}
		case 'armor':
		{
			switch(p[1])
			{
				case 'set':
				{
					switch(p[2])
					{
						case 'leather':
						{
							Player.setArmorSlot(0, 298, 0);
							Player.setArmorSlot(1, 299, 0);
							Player.setArmorSlot(2, 300, 0);
							Player.setArmorSlot(3, 301, 0);
							stkclientMessage("已经穿上皮革衣服");
							break;
						}
						case 'chain':
						{
							Player.setArmorSlot(0, 302, 0);
							Player.setArmorSlot(1, 303, 0);
							Player.setArmorSlot(2, 304, 0);
							Player.setArmorSlot(3, 305, 0);
							stkclientMessage("已经穿上链盔甲");
							break;
						}
						case 'iron':
						{
							Player.setArmorSlot(0, 306, 0);
							Player.setArmorSlot(1, 307, 0);
							Player.setArmorSlot(2, 308, 0);
							Player.setArmorSlot(3, 309, 0);
							stkclientMessage("已经穿上铁盔甲");
							break;
						}
						case 'diamond':
						{
							Player.setArmorSlot(0, 310, 0);
							Player.setArmorSlot(1, 311, 0);
							Player.setArmorSlot(2, 312, 0);
							Player.setArmorSlot(3, 313, 0);
							stkclientMessage("已经穿上钻石盔甲");
							break;
						}
						case 'gold':
						{
							Player.setArmorSlot(0, 314, 0);
							Player.setArmorSlot(1, 315, 0);
							Player.setArmorSlot(2, 316, 0);
							Player.setArmorSlot(3, 317, 0);
							stkclientMessage("已经穿上金盔甲");
							break;
						}
						default:
						{
							stkclientMessage(commands.generic.usage(cmdArmorSet));
							break;
						}
					}
					break;
				}
				case 'repair':
				{
					Player.setArmorSlot(0, Player.getArmorSlot(0), 0);
					Player.setArmorSlot(1, Player.getArmorSlot(1), 0);
					Player.setArmorSlot(2, Player.getArmorSlot(2), 0);
					Player.setArmorSlot(3, Player.getArmorSlot(3), 0);
					stkclientMessage("所有装甲已修复");
					break;
				}
				case 'info':
				{
					stkclientMessage("帽子:\n种类: " + Player.getArmorSlot(0) + "; 损坏度: " + Player.getArmorSlotDamage(0));
					stkclientMessage("胸甲:\n种类: " + Player.getArmorSlot(1) + "; 损坏度: " + Player.getArmorSlotDamage(1));
					stkclientMessage("腿甲:\n种类: " + Player.getArmorSlot(2) + "; 损坏度: " + Player.getArmorSlotDamage(2));
					stkclientMessage("靴子:\n种类: " + Player.getArmorSlot(3) + "; 损坏度: " + Player.getArmorSlotDamage(3));
					break;
				}
				default:
				{
					stkclientMessage(commands.generic.usage(cmdArmor));
					break;
				}
			}
			break;
		}
		case 'chest':
		{
			switch(p[1])
			{
				case 'set':
				{
					if (Level.getTile(Player.getX(), Player.getY() - 2, Player.getZ()) == 54)
					{
						if (isSet(p[2]))
						{
							if (parseInt(p[3]) > 0 && parseInt(p[3]) < 460)
							{
								if (isSet(p[4]))
								{
									Level.setChestSlot(Player.getX(), Player.getY() - 2, Player.getZ(), parseInt(p[2]), parseInt(p[3]), parseInt(p[5]), parseInt(p[4]));
									stkclientMessage("向箱子里放置 " + Math.floor(Player.getX()) + ", " + Math.floor(Player.getY() - 2) + ", " + Math.floor(Player.getZ()) + " 格子 " + parseInt(p[2]) + ":\n种类: " + parseInt(p[3]) + "; 损坏度: " + parseInt(p[5]) + "; 数量: " + parseInt(p[4]));
								}
								else
								{
									Level.setChestSlot(Player.getX(), Player.getY() - 2, Player.getZ(), parseInt(p[2]), parseInt(p[3]), parseInt(p[5]), 1);
									stkclientMessage("向箱子里放置 " + Math.floor(Player.getX()) + ", " + Math.floor(Player.getY() - 2) + ", " + Math.floor(Player.getZ()) + " 格子 " + parseInt(p[2]) + ":\n种类: " + parseInt(p[3]) + "; 损坏度: " + parseInt(p[5]) + "; 数量: 1");
								}
							}
							else
							{
								stkclientMessage(ChatColor.RED + "没有与id匹配的物品 " + parseInt(p[1]));
							}
						}
						else
						{
							stkclientMessage(ChatColor.RED + "你需要进一步探究格子，来放置东西");
						}
					}
					else
					{
						stkclientMessage(ChatColor.RED + "站在选定的箱子上，才能设定物品");
					}
					break;
				}
				case 'info':
				{
					if (Level.getTile(Player.getX(), Player.getY() - 2, Player.getZ()) == 54)
					{
						if (isSet(p[2]))
						{
							stkclientMessage("箱子 " + Math.floor(Player.getX()) + ", " + Math.floor(Player.getY() - 2) + ", " + Math.floor(Player.getZ()) + " 格子 " + parseInt(p[2]) + ":\n种类: " + Level.getChestSlot(Player.getX(), Player.getY() - 2, Player.getZ(), parseInt(p[2])) + "; 损坏度: " + Level.getChestSlotData(Player.getX(), Player.getY() - 2, Player.getZ(), parseInt(p[2])) + "; 数量: " + Level.getChestSlotCount(Player.getX(), Player.getY() - 2, Player.getZ(), parseInt(p[2])));
						}
						else
						{
							stkclientMessage(ChatColor.RED + " 你需要进一步探究格子，来看里面的东西 ");
						}
					}
					else
					{
						stkclientMessage(ChatColor.RED + " 站在选定的箱子上，才能看到物品 ");
					}
					break;
				}
				default:
				{
					stkclientMessage(usage + cmdChest);
					break;
				}
			}
			break;
		}
		case 'clear':
		{
			var invCount = new Array();
			for (var i = 9; i < 45; i++) invCount[i] = 0;
				if (isSet(p[1]))
				{
					if (isFinite(p[1]))
					{
						if (p[1] > 0 && p[1] < 460)
						{
							if (isSet(p[2]))
							{
								if (isFinite(p[2]))
								{
									for (var i = 9; i < 45; i++)
									{
										if (Player.getInventorySlot(i) == p[1] && Player.getInventorySlotData(i) == p[2])
										{
											invCount[i] = Player.getInventorySlotCount(i);
										}
									}
									stkclientMessage("清除 " + Player.getName(Player.getEntity()) + "的背包里 " + (invCount[9] + invCount[10] + invCount[11] + invCount[12] + invCount[13] + invCount[14] + invCount[15] + invCount[16] + invCount[17] + invCount[18] + invCount[19] + invCount[20] + invCount[21] + invCount[22] + invCount[23] + invCount[24] + invCount[25] + invCount[26] + invCount[27] + invCount[28] + invCount[29] + invCount[30] + invCount[31] + invCount[32] + invCount[33] + invCount[34] + invCount[35] + invCount[36] + invCount[37] + invCount[38] + invCount[39] + invCount[40] + + invCount[41] + invCount[42] + invCount[43] + invCount[44]) + " 的物品");
									for (var i = 9; i < 45; i++)
									{
										if (Player.getInventorySlot(i) == p[1] && Player.getInventorySlotData(i) == p[2])
										{
											Player.clearInventorySlot(i);
										}
										invCount[i] = 0;
									}
								}
								else
								{
									stkclientMessage(commands.generic.num.invalid(p[2]));
								}
							}
							else
							{
								for (var i = 9; i < 45; i++)
								{
									if (Player.getInventorySlot(i) == p[1] && Player.getInventorySlotData(i) == 0)
									{
										invCount[i] = Player.getInventorySlotCount(i);
									}
								}
								stkclientMessage("清除 " + Player.getName(Player.getEntity()) + "的 " + (invCount[9] + invCount[10] + invCount[11] + invCount[12] + invCount[13] + invCount[14] + invCount[15] + invCount[16] + invCount[17] + invCount[18] + invCount[19] + invCount[20] + invCount[21] + invCount[22] + invCount[23] + invCount[24] + invCount[25] + invCount[26] + invCount[27] + invCount[28] + invCount[29] + invCount[30] + invCount[31] + invCount[32] + invCount[33] + invCount[34] + invCount[35] + invCount[36] + invCount[37] + invCount[38] + invCount[39] + invCount[40] + + invCount[41] + invCount[42] + invCount[43] + invCount[44]) + "的物品");
								for (var i = 9; i < 45; i++)
								{
									if (Player.getInventorySlot(i) == p[1] && Player.getInventorySlotData(i) == 0)
									{
										Player.clearInventorySlot(i);
									}
									invCount[i] = 0;
								}
							}
						}
						else
						{
							stkclientMessage(ChatColor.RED + "没有与id匹配的物品" + parseInt(p[1]));
						}
					}
					else
					{
						stkclientMessage(commands.generic.num.invalid(p[1]));
					}
				}
				else
				{
					stkclientMessage("清除了" + Player.getName(Player.getEntity()) + "的 " + (Player.getInventorySlotCount(9) + Player.getInventorySlotCount(10) + Player.getInventorySlotCount(11) + Player.getInventorySlotCount(12) + Player.getInventorySlotCount(13) + Player.getInventorySlotCount(14) + Player.getInventorySlotCount(15) + Player.getInventorySlotCount(16) + Player.getInventorySlotCount(17) + Player.getInventorySlotCount(18) + Player.getInventorySlotCount(19) + Player.getInventorySlotCount(20) + Player.getInventorySlotCount(21) + Player.getInventorySlotCount(22) + Player.getInventorySlotCount(23) + Player.getInventorySlotCount(24) + Player.getInventorySlotCount(25) + Player.getInventorySlotCount(26) + Player.getInventorySlotCount(27) + Player.getInventorySlotCount(28) + Player.getInventorySlotCount(29) + Player.getInventorySlotCount(30) + Player.getInventorySlotCount(31) + Player.getInventorySlotCount(32) + Player.getInventorySlotCount(33) + Player.getInventorySlotCount(34) + Player.getInventorySlotCount(35) + Player.getInventorySlotCount(36) + Player.getInventorySlotCount(37) + Player.getInventorySlotCount(38) + Player.getInventorySlotCount(39) + Player.getInventorySlotCount(40) + + Player.getInventorySlotCount(41) + Player.getInventorySlotCount(42) + Player.getInventorySlotCount(43) + Player.getInventorySlotCount(44)) + " 的物品");
					for (var i = 9; i < 45; i++)
					{
						Player.clearInventorySlot(i);
					}
				}
				break;
			}
			case 'coords':
			{
				stkclientMessage("坐标查询:");
				stkclientMessage("x: " + Player.getX());
				stkclientMessage("y: " + (Player.getY() - 1));
				stkclientMessage("z: " + Player.getZ());
				break;
			}
			case 'gamemode':
			{
				switch(p[1])
				{
					case 's':
					case '0':
					case 'survival':
					{
						Level.setGameMode(0);
						stkclientMessage("游戏设置为生存模式");
						break;
					}
					case 'c':
					case '1':
					case 'creative':
					{
						Level.setGameMode(1);
						stkclientMessage("游戏设置为创造模式");
						break;
					}
					case 'a':
					case '2':
					case 'adventure':
					{
						Level.setGameMode(2);
						stkclientMessage("游戏设置为冒险模式");
						break;
					}
					default:
					{
						stkclientMessage(usage + cmdGamemode);
						break;
					}
				}
				break;
			}
			case 'gamespeed':
			{
				if (isFinite(p[1]))
				{
					if (p[1] > 0)
					{
						ModPE.setGameSpeed(p[1]);
						stkclientMessage("已经设置游戏速度为" + p[1] + " 帧每秒，普通速度为20帧每秒");
					}
					else
					{
						stkclientMessage(commands.generic.num.tooSmall(p[1], 1));
					}
				}
				else
				{
					stkclientMessage(commands.generic.num.invalid(p[1]));
				}
				break;
			}
			case 'give':
			{
				if (isSet(p[1]))
				{
					if (itemNameToId[p[1]] != undefined)
					{
						if (isSet(p[2]))
						{
							if (isFinite(p[2]))
							{
								if (p[2] > 0 && p[2] < 65)
								{
									if (isSet(p[3]))
									{
										if (isFinite(p[3]))
										{
											Player.addItemInventory(itemNameToId[p[1]], p[2], p[3]);
											Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.pop", 1, 1);
											stkclientMessage("给了" + items[itemNameToId[p[1]]] + " * " + p[2] + " 到 " + Player.getName(Player.getEntity()));
										}
										else
										{
											stkclientMessage(commands.generic.num.invalid(p[3]));
										}
									}
									else
									{
										Player.addItemInventory(itemNameToId[p[1]], p[2], 0);
										Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.pop", 1, 1);
										stkclientMessage("给了 " + items[itemNameToId[p[1]]] + " * " + p[2] + " 到 " + Player.getName(Player.getEntity()));
									}
								}
								else
								{
									if (p[2] < 1)
									{
										stkclientMessage(commands.generic.num.tooSmall(p[2], 1));
									}
									if (p[2] > 64)
									{
										stkclientMessage(commands.generic.num.tooBig(p[2], 64));
									}
								}
							}
							else
							{
								stkclientMessage(commands.generic.num.invalid(p[2]));
							}
						}
						else
						{
							Player.addItemInventory(itemNameToId[p[1]], 1, 0);
							Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.pop", 1, 1);
							stkclientMessage("给了 " + items[itemNameToId[p[1]]] + " * 1 到 " + Player.getName(Player.getEntity()));
						}
					}
					else
					{
						stkclientMessage(ChatColor.RED + "没有叫这个名字的东西： " + p[1]);
					}
				}
				else
				{
					stkclientMessage(usage + cmdGive);
				}
				break;
			}
			case 'home':
			{
				switch(p[1])
				{
					case 'set':
					{
						ModPE.saveData("homeX",parseInt(Player.getX()));
						ModPE.saveData("homeY",parseInt(Player.getY()));
						ModPE.saveData("homeZ",parseInt(Player.getZ()));
						ModPE.saveData("setHomeData",1);
						stkclientMessage("现在家被设置到了" + Math.floor(ModPE.readData("homeX")) + ", " + Math.floor(ModPE.readData("homeY")) + ", " + Math.floor(ModPE.readData("homeZ")));
						break;
					}
					case 'delete':
					{
						if (ModPE.readData("setHomeData") == 1)
						{
							ModPE.saveData("setHomeData",0);
							clientMessage("家的坐标被删除了");
						}
						else if (ModPE.readData("setHomeData") == 0)
						{
							stkclientMessage(ChatColor.RED + "没有设置家");
						}
						break;
					}
					default:
					{
						if (ModPE.readData("setHomeData") == 0)
						{
							stkclientMessage(ChatColor.RED + "没有设置家");
						}
						else if (ModPE.readData("setHomeData") == 1)
						{
							Entity.setPosition(Player.getEntity(), parseInt(ModPE.readData("homeX")) + 0.5, parseInt(ModPE.readData("homeY")) + 2, parseInt(ModPE.readData("homeZ")) + 0.5);
							stkclientMessage("传送到家了");
						}
						break;
					}
				}
				break;
			}
			case 'id':
			{
				stkclientMessage("种类: " + Player.getCarriedItem() + "; 损坏度: " + Player.getCarriedItemData() + "; 数量: " + Player.getCarriedItemCount());
				break;
			}
			case 'kill':
			{
				Player.setHealth(Entity.getHealth(Player.getEntity()) - 1000);
				Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.hurt", 1, 1);
				stkclientMessage("啊~真他喵的疼！");
				break;
			}
			case 'me':
			{
				stkclientMessage("* " + Player.getName(Player.getEntity()) + " " + c.slice(3));
				break;
			}
			case 'playsound':
			{
				if (isSet(p[1]))
				{
					if (isSet(p[2]))
					{
						if (isFinite(p[2]))
						{
							if (isSet(p[3]))
							{
								if (isFinite(p[3]))
								{
									if (isSet(p[4]))
									{
										if (isFinite(p[4]))
										{
											if (isSet(p[5]))
											{
												if (isFinite(p[5]))
												{
													if (isSet(p[6]))
													{
														if (isFinite(p[6]))
														{
															Level.playSound(parseCoordsX(p[2]), parseCoordsY(p[3]), parseCoordsZ(p[4]), p[1], p[5], p[6]);
															clientMessage("播放了'" + p[1] + "'的声音（在你的坐标）" + Player.getName(Player.getEntity()));
														}
														else
														{
															stkclientMessage(commands.generic.num.invalid(p[6]));
														}
													}
													else
													{
														Level.playSound(parseCoordsX(p[2]), parseCoordsY(p[3]), parseCoordsZ(p[4]), p[1], p[5], 1);
														clientMessage("播放了 '" + p[1] + "' 的声音（在你的坐标） " + Player.getName(Player.getEntity()));
													}
												}
												else
												{
													stkclientMessage(commands.generic.num.invalid(p[5]));
												}
											}
											else
											{
												Level.playSound(parseCoordsX(p[2]), parseCoordsY(p[3]), parseCoordsZ(p[4]), p[1], 1, 1);
												stkclientMessage("播放了'" + p[1] + "' 的声音（在你的坐标） " + Player.getName(Player.getEntity()));
											}
										}
										else
										{
											stkclientMessage(commands.generic.num.invalid(p[4]));
										}
									}
									else
									{
										clientMessage(usage + cmdPlaysound);
									}
								}
								else
								{
									stkclientMessage(commands.generic.num.invalid(p[3]));
								}
							}
							else
							{
								stkclientMessage(usage + cmdPlaysound);
							}
						}
						else
						{
							stkclientMessage(commands.generic.num.invalid(p[2]));
						}
					}
					else
					{
						Level.playSound(Player.getX(), Player.getY() - 1, Player.getZ(), p[1], 1, 1);
						clientMessage("播放了 '" + p[1] + "' 的声音（在你的坐标） " + Player.getName(Player.getEntity()));
					}
				}
				else
				{
					stkclientMessage(usage + cmdPlaysound);
				}
				break;
			}
			case 'setblock':
			{
				if (isSet(p[1]))
				{
					if (isFinite(p[1]) || (p[1].slice(0, 1) == "~" && isFinite(p[1].slice(1))))
					{
						if (isSet(p[2]))
						{
							if (isFinite(p[2]) || (p[2].slice(0, 1) == "~" && isFinite(p[2].slice(1))))
							{
								if (isSet(p[3]))
								{
									if (isFinite(p[3]) || (p[3].slice(0, 1) == "~" && isFinite(p[3].slice(1))))
									{
										Level.setTile(parseCoordsX(p[1]), parseCoordsY(p[2]), parseCoordsZ(p[3]), p[4], p[5]);
										stkclientMessage("方块已放置");
									}
									else
									{
										stkclientMessage(commands.generic.num.invalid(p[3]));
									}
								}
								else
								{
									clientMessage(usage + cmdSetblock);
								}
							}
							else
							{
								stkclientMessage(commands.generic.num.invalid(p[2]));
							}
						}
						else
						{
							stkclientMessage(usage + cmdSetblock);
						}
					}
					else
					{
						stkclientMessage(commands.generic.num.invalid(p[1]));
					}
				}
				else
				{
					stkclientMessage(usage + cmdSetblock);
				}
				break;
			}
			case 'setworldspawn':
			{
				if (isSet(p[1]))
				{
					stkLevel.setSpawn(parseInt(p[1]), parseInt(p[2]), parseInt(p[3]));
					stkclientMessage("已经把重生点设置到(" + parseInt(p[1]) + ", " + parseInt(p[2]) + ", " + parseInt(p[3]) + ")");
				}
				else
				{
					Level.setSpawn(Math.floor(Player.getX()), Math.floor(Player.getY() - 1), Math.floor(Player.getZ()));
					stkclientMessage("已经把重生点设置到(" + Math.floor(Player.getX()) + ", " + Math.floor(Player.getY() - 1) + ", " + Math.floor(Player.getZ()) + ")");
				}
				break;
			}
			case 'summon':
			{
				if (isSet(p[1]))
				{
					if (isSet(p[2]))
					{
						switch(p[1])
						{
							case 'Arrow':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 80);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'Chicken':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 10);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'Cow':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 11);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'Creeper':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 33);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'Egg':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 82);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'MinecartRideable':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 84);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'Pig':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 12);
								stkclientMessage("召唤成功！");
								break;
							}
							case 'PigZombie':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 36);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'PrimedTnt':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 65);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Sheep':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 13);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Skeleton':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 34);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Snowball':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 81);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Spider':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 35);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Zombie':
							{
								Level.spawnMob(parseInt(p[2]), parseInt(p[3]), parseInt(p[4]), 32);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							default:
							{
								stkclientMessage("召唤失败！");
								break;
							}
						}
					}
					else
					{
						switch(p[1])
						{
							case 'Arrow':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 80);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Chicken':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 10);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Cow':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 11);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Creeper':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 33);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Egg':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 82);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'MinecartRideable':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 84);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Pig':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 12);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'PigZombie':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 36);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'PrimedTnt':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 65);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Sheep':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 13);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Skeleton':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 34);
								stkclientMessage("召唤成功！ ");
								break;
							}
							case 'Snowball':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 81);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Spider':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 35);
								stkclientMessage(" 召唤成功！ ");
								break;
							}
							case 'Zombie':
							{
								Level.spawnMob(Player.getX(), Player.getY() - 1, Player.getZ(), 32);
								stkclientMessage("召唤成功！");
								break;
							}
							default:
							{
								stkclientMessage("无法召唤！");
								break;
							}
						}
					}
				}
				else
				{
					clientMessage(usage + cmdSummon);
				}
				break;
			}
			case 'time':
			{
				switch(p[1])
				{
					case 'set':
					{
						if (p[2] == 'day')
						{
							Level.setTime(1000);
							stkclientMessage("把时间设定为1000");
						}
						else if (p[2] == 'night')
						{
							Level.setTime(13000);
							stkclientMessage("把时间设定为13000");
						}
						else if (isSet(p[2]))
						{
							if (isFinite(p[2]))
							{
								Level.setTime(p[2]);
								stkclientMessage("把时间设定为" + p[2]);
							}
							else
							{
								stkclientMessage(commands.generic.num.invalid(p[2]));
							}
						}
						break;
					}
					case 'add':
					{
						if (isFinite(p[2]))
						{
							Level.setTime(Level.getTime() + p[2]);
							stkclientMessage("给时间加了" + p[2]);
							break;
						}
						else
						{
							stkclientMessage(commands.generic.num.invalid(p[2]));
						}
					}
					default:
					{
						stkclientMessage(usage + cmdTime);
						break;
					}
				}
				break;
			}
			case 'tp':
			{
				if (isSet(p[1]))
				{
					if (isFinite(p[1]) || (p[1].slice(0, 1) == "~" && isFinite(p[1].slice(1))))
					{
						if (inWorldX(parseCoordsEntX(p[1])))
						{
							if (isSet(p[2]))
							{
								if (isFinite(p[2]) || (p[2].slice(0, 1) == "~" && isFinite(p[2].slice(1))))
								{
									if (inWorldY(parseCoordsEntY(p[2])))
									{
										if (isSet(p[3]))
										{
											if (isFinite(p[3]) || (p[3].slice(0, 1) == "~" && isFinite(p[3].slice(1))))
											{
												if (inWorldZ(parseCoordsEntZ(p[3])))
												{
													Entity.setPosition(Player.getEntity(), parseCoordsEntX(p[1]), parseCoordsEntY(p[2]) + 1, parseCoordsEntZ(p[3]));
													stkclientMessage("传送 " + Player.getName(Player.getEntity()) + " 到了 " + parseCoordsEntX(p[1]).toFixed(2) + "," + parseCoordsEntY(p[2]).toFixed(2) + "," + parseCoordsEntZ(p[3]).toFixed(2));
												}
												else
												{
													if (parseCoordsEntZ(p[3]) < 0)
													{
														stkclientMessage(commands.generic.double.tooSmall(parseCoordsEntZ(p[3]), 0));
													}
													else if (parseCoordsEntZ(p[3]) > 255)
													{
														stkclientMessage(commands.generic.double.tooBig(parseCoordsEntZ(p[3]), 255));
													}
												}
											}
											else
											{
												stkclientMessage(commands.generic.num.invalid(p[3]));
											}
										}
										else
										{
											clientMessage(usage + cmdTp);
										}
									}
									else
									{
										if (parseCoordsEntY(p[2]) < 0)
										{
											stkclientMessage(commands.generic.double.tooSmall(parseCoordsEntY(p[2]), 0));
										}
										else if (parseCoordsEntY(p[2]) > 127)
										{
											stkclientMessage(commands.generic.double.tooBig(parseCoordsEntY(p[2]), 127));
										}
									}
								}
								else
								{
									stkclientMessage(commands.generic.num.invalid(p[2]));
								}
							}
							else
							{
								clientMessage(usage + cmdTp);
							}
						}
						else
						{
							if (parseCoordsEntX(p[1]) < 0)
							{
								stkclientMessage(commands.generic.double.tooSmall(parseCoordsEntX(p[1]), 0));
							}
							else if (parseCoordsEntX(p[1]) > 255)
							{
								stkclientMessage(commands.generic.double.tooBig(parseCoordsEntX(p[1]), 255));
							}
						}
					}
					else
					{
						stkclientMessage(commands.generic.num.invalid(p[1]));
					}
				}
				else
				{
					clientMessage(usage + cmdTp);
				}
				break;
			}
			default:
			{
				stkclientMessage(commands.generic.notFound);
				break;
			}
		}
	}


	function isSet(arrayList)
	{
		return arrayList != undefined && arrayList != "";
	}

	function inWorldX(value)
	{
		return value >= 0 && value <= 256;
	}

	function inWorldY(value)
	{
	return value >= 0 && value <= 128; //world height is 128 blocks, not 256
}

function inWorldZ(value)
{
	return value >= 0 && value <= 256;
}

function parseCoordsX(value)
{
	return parseInt(value.toString().slice(0, 1) == "~"? parseInt(Player.getX()) + (value.toString().slice(1) == ""? 0 : parseInt(value.slice(1))) : parseInt(value));
}

function parseCoordsY(value)
{
	return parseInt(value.toString().slice(0, 1) == "~"? parseInt(Player.getY() - 1) + (value.toString().slice(1) == ""? 0 : parseInt(value.slice(1))) : parseInt(value));
}

function parseCoordsZ(value)
{
	return parseInt(value.toString().slice(0, 1) == "~"? parseInt(Player.getZ()) + (value.toString().slice(1) == ""? 0 : parseInt(value.slice(1))) : parseInt(value));
}

function parseCoordsEntX(value)
{
	return parseFloat(value.slice(0, 1) == "~"? Player.getX() + (value.slice(1) == ""? 0 : parseFloat(value.slice(1)) + (value.slice(1).slice(parseInt(value.slice(1)).toString().length) == ""? (parseFloat(value.slice(1)) < 0? -0.5 : 0.5) : 0)) : parseFloat(value) + (value.slice(parseInt(value).toString().length) == ""? (parseFloat(value) < 0? -0.5 : 0.5) : 0));
}

function parseCoordsEntY(value)
{
	return parseFloat(value.slice(0, 1) == "~"? (Player.getY() - 1) + (value.slice(1) == ""? 0 : parseFloat(value.slice(1))) : parseFloat(value) + (value.slice(parseInt(value).toString().length) == ""? 0.62 : 0));
}

function parseCoordsEntZ(value)
{
	return parseFloat(value.slice(0, 1) == "~"? Player.getZ() + (value.slice(1) == ""? 0 : parseFloat(value.slice(1)) + (value.slice(1).slice(parseInt(value.slice(1)).toString().length) == ""? (parseFloat(value.slice(1)) < 0? -0.5 : 0.5) : 0)) : parseFloat(value) + (value.slice(parseInt(value).toString().length) == ""? (parseFloat(value) < 0? -0.5 : 0.5) : 0));
}





//////////*Base 64 Decode (deleted some of them because they are too large)*////////
var translatericnnn = "";
var icaltbpmnewqsef = "";
var tbpmlogover = "";
var logopic="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";
var healthbtnicn = "";
var afiveicn = "";
var icaltarjaynew = "";
var icaltbpmnew = "";
var vericn = "";
var translatericn = "";
var carl = "";
var icaltbpm = "";
var icaltarjay = "";
var iconlogopic = "";