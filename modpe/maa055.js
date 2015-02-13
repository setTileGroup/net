/*
 *			mcpe全能助手  by lzjyzq2
 *
 *
 *
 */


/*
	使用本js即代表同意以下声明：

		本ModPE Script的所有者为setTile工作室的@lzjyzq2。
		除此之外，setTile工作室的@高达朱朱、@709924470、@2639439也参与了部分代码的编写工作，
		同时感谢那些收集资料的人。
		未经所有者同意，禁止任何人转载或修改后二次发布本js的全部或部分代码。
		本js的最新版可以在百度settile吧找到：
		http://tieba.baidu.com/f?kw=settile
		欢迎加入我们工作室：QQ外群号码：287474030(经过审核后即可进入内群)，百度贴吧群号(仅供日常聊天或活动，请到QQ群交流讨论)：67401730，百度贴吧：settile。
*/




var ctx;              //菜单
var btnWindow=null;
var simpleGUI=null;
var nmenu=null;
var sGUI=null;
var nbutton=null;
var mainbutton=null;
var mbuttontime=0;

var menux=1,menuy=75;    //主菜单按钮位置
var tpopx=5,tpopy=5;     //信息面板按钮位置
var helperver=50;     //全能助手版本号，用于判断配置文件版本
var movemenu=true,showinfo=true,lockinfo=false,showheal=true,showscrshot=true,allowshake=true;
//是否允许拖动按钮，是否显示信息面板，是否锁定信息面板，是否显示生物血量，是否显示截屏按钮，允许长按时震动


var gamespeed=20;    //游戏速度
var warps=new Array();    //传送点坐标
var entities=new Array();    //存储实体的数组

var ride=false;     //是否准备骑乘生物
var riding=false,ridingAnimal=0;      //是否正在骑乘生物,正在骑乘的生物

var running=0;   //疾跑模式，0为行走，1为疾跑，2为潜行
var Xpos=0,Zpos=0,runi=1,Xdiff=0,Zdiff=0;  //疾跑的坐标记录


var wk=false;    //挖矿精灵
var wq=false;    //一键砍树
var fk=false;    //方块复制
var xq=false;    //雪球传送


var pf=false,ji=false,niu=false,zhu=false,yang=false,zz=false,js=false,kl=false,klp=false,jszr=false,kc=false;     
//皮肤开关、各种皮肤，分别为：鸡、牛、猪、羊、蜘蛛、僵尸、骷髅、苦力怕、僵尸猪人、矿车


var spawnOnTap=0,spawncount=1;   //点击方块生成实体的id(0为无)，数量
var mobs_map=[      //实体表
{id:10,name:"鸡(10)",full:4,type:1},
{id:11,name:"牛(11)",full:10,type:1},
{id:12,name:"猪(12)",full:10,type:1},
{id:13,name:"羊(13)",full:8,type:1},
{id:32,name:"僵尸(32)",full:20,type:2},
{id:33,name:"苦力怕(33)",full:20,type:2},
{id:34,name:"骷髅(34)",full:20,type:2},
{id:35,name:"蜘蛛(35)",full:20,type:2},
{id:36,name:"僵尸猪人(36)",full:20,type:2},
{id:64,name:"掉落的物品(64)",full:1,type:3},
{id:65,name:"激活的TNT(65)",full:1,type:3},
{id:80,name:"箭(80)",full:1,type:3},
{id:81,name:"雪球(81)",full:1,type:3},
{id:82,name:"鸡蛋(82)",full:1,type:3},
{id:83,name:"画(83)",full:1,type:3}
];





var mobtext1,mobtext2,mobhealbar,attackmobcheck;      //生物血量显示
var attackmobname,amobfullhealth,attackmobtime,attackmob;
var MOB=[
new Mob(0,"玩家","20"),
new Mob(10,"鸡","4"),
new Mob(11,"牛", "10"),
new Mob(12,"猪","10"),
new Mob(13,"羊","8"),
new Mob(32,"僵尸","20"),
new Mob(33,"爬行者","20"),
new Mob(34,"骷髅","20"),
new Mob(35,"蜘蛛","20"),
new Mob(36,"僵尸猪人","20"),
new Mob(83,"画","1"),
new Mob(84,"矿车","1") ];
function Mob(id,name,full)
{
	this.id=id;
	this.name=name;
	this.full=full;
}
function findMob(type)
{
	attackmobname="",amobfullhealth="";
	for(var i in MOB)
	{
		if(type==MOB[i].id)
		{
			attackmobname=MOB[i].name;
			attackmobname+="("+type+")";
			amobfullhealth=MOB[i].full;
			break;
		}
	}
}






function newLevel()
{
	try
	{
		var optionfile = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/全能助手设置.dat");
		if(optionfile.exists())   //存在配置文件
		{
			var fos=new java.io.FileInputStream(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/全能助手设置.dat");
			var readver=fos.read();
			if(readver==helperver)
			{
				movemenu=fos.read()==1?true:false;
				showinfo=fos.read()==1?true:false;
				lockinfo=fos.read()==1?true:false;
				showheal=fos.read()==1?true:false;
				showscrshot=fos.read()==1?true:false;
				allowshake=fos.read()==1?true:false;
			}
			else
			{
				if(readver>helperver)
				{
					perr("全能助手配置文件比本js版本高，请去检查更新。");
				}
				else if(readver<helperver)   //依照不同版本进行读取
				{
				}
			}
			fos.close();
		}
	}
	catch(err)
	{
		perr("无法读取配置文件",err);
	}
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	menu();
	ftype();
	ctx.runOnUiThread(new java.lang.Runnable(    //截屏按钮
	{
		run: function()
		{
			if(showscrshot)
			{
				try
				{
					simpleGUI = new android.widget.PopupWindow();
					var layout = new android.widget.RelativeLayout(ctx);
					var button = new android.widget.Button(ctx);
					button.setText("截屏");

					button.setOnClickListener(new android.view.View.OnClickListener(
					{
						onClick: function(viewarg)
						{
							ModPE.takeScreenshot("sdcard/Pictures/Blocklauncher");
						}
					}));
					layout.addView(button);
					simpleGUI.setContentView(layout);
					simpleGUI.setWidth(dip2px(ctx, 60));
					simpleGUI.setHeight(dip2px(ctx, 40));
					simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 60, 40);
				}
				catch(err)
				{
					perr("无法显示截屏按钮",err);
				}
			}
		}
	}));
	
	ctx.runOnUiThread(new java.lang.Runnable({     //生物血量显示
		run:function()
		{
			if(showheal)
			{
				try
				{
					var dp=ctx.getResources().getDisplayMetrics().density;
					sGUI=new android.widget.PopupWindow(ctx);
					var layout=new android.widget.LinearLayout(ctx);
					var Layout=new android.widget.LinearLayout(ctx);

					mobtext1=new android.widget.TextView(ctx);
					mobtext2=new android.widget.TextView(ctx);
					mobtext1.setTextSize(13);
					mobtext2.setTextSize(13);
					mobtext1.getPaint().setFakeBoldText(true);
					mobtext2.getPaint().setFakeBoldText(true);
					mobtext1.setTextColor(android.graphics.Color.CYAN);
					mobtext2.setTextColor(android.graphics.Color.WHITE);
					mobtext1.setShadowLayer(2,0,0,android.graphics.Color.BLACK);
					mobtext2.setShadowLayer(2,0,0,android.graphics.Color.BLACK);

					mobhealbar=new android.widget.ProgressBar(ctx,null,android.R.attr.progressBarStyleHorizontal);
					mobhealbar.setLayoutParams(new android.widget.LinearLayout.LayoutParams(80*dp,-2));
					mobhealbar.setVisibility(5);

					var params=new android.widget.LinearLayout.LayoutParams(-2,-2);
					params.setMargins(20*dp,0,0,0);
					Layout.addView(mobtext1);
					Layout.addView(mobtext2,params);
					layout.setOrientation(1);
					layout.addView(mobhealbar);
					layout.addView(Layout);

					sGUI.setContentView(layout);
					sGUI.setWidth(130*dp);
					sGUI.setHeight(50*dp);
					sGUI.setBackgroundDrawable(null);
					sGUI.setTouchable(false);
					sGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP,0,110*dp);
				}
				catch(err)
				{
					perr("无法显示生物血量菜单",err);
				}
			}
		}
	}));
}


function ftype()
{
	ctx.runOnUiThread(new java.lang.Runnable(
	{
		run: function()
		{
			if(showinfo)
			{
				try
				{
					var mX,mY;
					var layout=new android.widget.LinearLayout(ctx);
					layout.setOrientation(1);
					nmenu=new android.widget.PopupWindow(layout,ctx.getWindowManager().getDefaultDisplay().getHeight()*0.34, ctx.getWindowManager().getDefaultDisplay().getHeight()*0.34);
					nmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, tpopx, tpopy);
					nmenu.setTouchable(!lockinfo);
					nbutton=new android.widget.Button(ctx);
					nbutton.setTextSize(10);
					nbutton.setPadding(2,2,2,2);
					nbutton.setBackgroundColor(android.graphics.Color.argb(85,200,200,200));
					nbutton.setOnTouchListener(new android.view.View.OnTouchListener(
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
								var delX=parseInt(e.getX()-mX)/3;
								var delY=parseInt(e.getY()-mY)/3;
								tpopx = tpopx + delX;
								tpopy = tpopy + delY;
								nmenu.update(parseInt(tpopx), parseInt(tpopy), -1, -1);
								break;
							}
							return true;
						}
					}));
					layout.addView(nbutton);
					updata();
				}
				catch(err)
				{
					perr("无法显示信息面板",err);
				}
			}
		}
	}));
}


function updata()
{
	try
	{
		ctx.runOnUiThread(new java.lang.Runnable(
		{
			run: function()
			{
				new android.os.Handler().postDelayed(new java.lang.Runnable(
				{
					run: function()
					{
						if(nbutton!=null)
						{
							var ddd = new Date();
							var hs = ddd.getHours();
							var ms = ddd.getMinutes();
							var ss = ddd.getSeconds();
							var timezone = -ddd.getTimezoneOffset()/60;
							var mcms=0;
							if(Level.getGameMode()==0)
							{
								mcms="生存";
							}
							if(Level.getGameMode()==1)
							{
								mcms="创造";
							}
							if(Level.getGameMode()==2)
							{
								mcms="冒险";
							}
							if(Level.getGameMode()==3)
							{
								mcms="旁观";
							}
							var wjx=Player.getX().toFixed(1);
							var wjy=Player.getY().toFixed(0);
							var wjz=Player.getZ().toFixed(1);
							var yaw1=parseInt(getYaw(getPlayerEnt()))%360;
							if(Math.abs(yaw1)!=yaw1)
							{
								yaw1+=360;
							}
							var pitch1=parseInt(-Entity.getPitch(getPlayerEnt()));
							var tilea=getTile(Player.getX(),Player.getY()-2,Player.getZ());
							var dataa=Level.getData(Player.getX(),Player.getY()-2,Player.getZ());

							if(nbutton!=null)
							{
								nbutton.setText("\nmc时间:"+Level.getTime()%19200+"\n模式:"+mcms+"\nx:"+wjx+"  y:"+wjy+"  z:"+wjz+
									"\n仰角:"+pitch1+"° 旋转角:"+yaw1+"°"+"\n物品:"+Player.getCarriedItem()+":"+Player.getCarriedItemData()+
									"   "+Player.getCarriedItemCount()+"个\n脚下方块:"+tilea+":"+dataa+"\n"+
									(hs<10?"0":"")+hs+":"+(ms<10?"0":"")+ms+":"+(ss<10?"0":"")+ss+"  GMT+"+timezone+"\n"
								);
								updata();
							}
						}
					}
				}),110);
			}
		}));
	}
	catch(err)
	{
		perr("无法更新信息面板",err);
	}
}


function logocolor()
{
	try
	{
		ctx.runOnUiThread(new java.lang.Runnable(
		{
			run: function()
			{
				new android.os.Handler().postDelayed(new java.lang.Runnable(
				{
					run: function()
					{
						function newcolor(a,b,time)
						{
							return a+parseInt((b-a)/80*time);
						}
						if(mainbutton!=null)
						{
							if(mbuttontime<160)
								mbuttontime+=1;
							else
								mbuttontime=0;
							if(mbuttontime<80)
							{
								var newr=newcolor(90,220,mbuttontime);
								var newg=newcolor(220,150,mbuttontime);
								var newb=newcolor(230,240,mbuttontime);
							}
							else
							{
								var newr=newcolor(220,90,mbuttontime-80);
								var newg=newcolor(150,220,mbuttontime-80);
								var newb=newcolor(240,230,mbuttontime-80);
							}
							mainbutton.setTextColor(android.graphics.Color.argb(255,newr,newg,newb));
							logocolor();
						}
					}
				}),80);
			}
		}));
	}
	catch(err)
	{
		perr("无法更新助手按钮",err);
	}
}


function menu()
{
	ctx.runOnUiThread(new java.lang.Runnable({run:function()
		{
			try
			{
				btnWindow = new android.widget.PopupWindow();
				var dx=0,dy=0,longclicked=false;
				var layout = new android.widget.RelativeLayout(ctx);
				var button = new android.widget.Button(ctx);
				mainbutton=button;
				logocolor();
				button.setPadding(2,2,2,2);
				button.setText("助");
				button.setTextSize(20);
				button.setShadowLayer(2,0,0,android.graphics.Color.argb(200,255,255,255));
				button.setBackgroundColor(android.graphics.Color.argb(20,255,255,255));
				button.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick: function(viewarg)
					{
						openMenu();
					}
				});
				button.setOnLongClickListener(new android.view.View.OnLongClickListener()   //拖动按钮
				{
onLongClick: 		function(v)
					{
						if(movemenu)
						{
							ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(allowshake?40:0);
							longclicked=true;
						}
						return true;
					}
				});
				button.setOnTouchListener(new android.view.View.OnTouchListener()
				{
onTouch:   			function(v,e)
					{
						if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)
						{
							dx=e.getX();
							dy=e.getY();
						}
						if(longclicked)
						{
							menux+= -parseInt((e.getX()-dx)/4);
							menuy+= parseInt((e.getY()-dy)/4);
							btnWindow.update(menux, menuy, -1, -1);
						}
						if(e.getAction()==android.view.MotionEvent.ACTION_UP)
						{
							longclicked=false;
						}
						return false;
					}
				});
				layout.addView(button);
				btnWindow.setContentView(layout);
				btnWindow.setWidth(dip2px(ctx, 40));
				btnWindow.setHeight(dip2px(ctx, 40));
				btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				btnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP,menux,menuy);
			}
			catch(err)
			{
				perr("无法显示按钮",err);
			}
		}
	}));
}


function openMenu()    //主菜单
{
	try
	{
		var menu=new android.widget.PopupWindow();
		menu.setFocusable(true);
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);

		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
		var stitle=new android.widget.TextView(ctx);
		stitle.setText("MCPE全能助手\n作者:  @lzjyzq2\n  setTile工作室");
		stitle.setTextSize(16);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(95,200,200,200));
		stitle.setLayoutParams(textParams);
		stitle.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				aboutd();
			}
		}));
		layout.addView(stitle);


		var tbutton1 = new android.widget.ToggleButton(ctx); 
		tbutton1.setTextOn("挖矿精灵 开");    
		tbutton1.setTextOff("挖矿精灵 关"); 
		tbutton1.setTextSize(18); 
		tbutton1.setChecked(wk);   
		tbutton1.setText(wk?"挖矿精灵 开":"挖矿精灵");    
		tbutton1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
		{
			onCheckedChanged:function(v,c)    
			{
				wk=c;
			}
		});
		layout.addView(tbutton1);

		var tbutton2 = new android.widget.ToggleButton(ctx); 
		tbutton2.setTextOn("一键砍树 开");    
		tbutton2.setTextOff("一键砍树 关"); 
		tbutton2.setTextSize(18); 
		tbutton2.setChecked(wq);   
		tbutton2.setText(wq?"一键砍树 开":"一键砍树");    
		tbutton2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
		{
			onCheckedChanged:function(v,c)    
			{
				wq=c;
			}
		});
		layout.addView(tbutton2);

		var tbutton3 = new android.widget.ToggleButton(ctx); 
		tbutton3.setTextOn("方块复制 开");    
		tbutton3.setTextOff("方块复制 关"); 
		tbutton3.setTextSize(18); 
		tbutton3.setChecked(fk);   
		tbutton3.setText(fk?"方块复制 开":"方块复制");    
		tbutton3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
		{
			onCheckedChanged:function(v,c)    
			{
				fk=c;
			}
		});
		layout.addView(tbutton3);


		var buttowo=new android.widget.Button(ctx);
		buttowo.setText("实体管理");
		buttowo.setOnClickListener(new android.view.View.OnClickListener(
		{
onClick: 	function(viewarg)
			{
				stgl();
			}
		}));
		layout.addView(buttowo);


		var buttonv=new android.widget.Button(ctx);
		buttonv.setText("传送");
		buttonv.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				cs();
			}
		}));
		layout.addView(buttonv);


		var buttow=new android.widget.Button(ctx);
		buttow.setText("杂项功能");
		buttow.setOnClickListener(new android.view.View.OnClickListener(
		{
onClick: 	function(viewarg)
			{
				zaxiang();
			}
		}));
		layout.addView(buttow);


		var buttonf=new android.widget.Button(ctx);
		buttonf.setText("游戏设置");
		buttonf.setOnClickListener(new android.view.View.OnClickListener(
		{
onClick: 	function(viewarg)
			{
				jna();
			}
		}));
		layout.addView(buttonf);






		var buttonj=new android.widget.Button(ctx);
		buttonj.setText("说明and关于");
		buttonj.setOnClickListener(new android.view.View.OnClickListener(
		{
onClick: 	function(viewarg)
			{
				aboutd();
			}
		}));
		layout.addView(buttonj);


		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,0,0);
	}
	catch(err)
	{
		perr("无法打开主菜单",err);
	}
}


function aboutd()      //说明and关于菜单
{
	try
	{
		var layout2 = new android.widget.LinearLayout(ctx);
		layout2.setOrientation(android.widget.LinearLayout.VERTICAL);
		var scroll2=new android.widget.ScrollView(ctx);
		scroll2.addView(layout2);
		var dialog=new android.app.AlertDialog.Builder(ctx);
		dialog.setView(scroll2);
		dialog.setTitle("说明and关于");


		var ts=new android.widget.TextView(ctx);
		ts.setTextSize(16);
		ts.setText(
			"                功能补充说明：\n"+
			"      全能助手内附信息显示、生物血量显示等功能。长按助手按钮后可以拖动。此版本全能助手对应0.8.x游戏。\n"+
			"      截屏：截取游戏屏幕并保存到 /sdcard/Pictures/Blocklauncher （不能截取GUI）。\n"+
			"      挖矿精灵：使用任意一种镐子点击地面，检测是否有矿物。\n"+
			"      一键砍树：破坏树干上的木头方块，即可砍掉整棵树。\n"+
			"      方块复制：开启后，方块将无法被破坏，但会掉落物品。\n\n"+
			"本js的最新版可以在百度settile吧找到：\n"+
			"    http://tieba.baidu.com/f?kw=settile\n"+
			"欢迎加入我们的工作室。\n\n"+
			"有问题请@lzjyzq2\n"
		);
		layout2.addView(ts);


		dialog.setPositiveButton("js设置",new android.content.DialogInterface.OnClickListener()
		{
			onClick:
			function(dia,w)
			{
				var layout3 = new android.widget.LinearLayout(ctx);
				layout3.setOrientation(android.widget.LinearLayout.VERTICAL);
				var scroll3=new android.widget.ScrollView(ctx);
				scroll3.addView(layout3);
				var dialog2=new android.app.AlertDialog.Builder(ctx);
				dialog2.setView(scroll3);
				dialog2.setTitle("全能助手设置");
				dialog2.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
				{
					onClick:
					function(dia,w)
					{
					}
				});
				alertdialog2=dialog2.create();

				var ts=new android.widget.TextView(ctx);
				ts.setTextSize(16);
				ts.setText("设置在重新进入关卡时生效，你的设置将会被保存到 /sdcard/games/com.mojang/全能助手设置.dat 。 ");
				layout3.addView(ts);
				
				var ch1 = new android.widget.CheckBox(ctx);
				ch1.setText("长按后拖动主菜单按钮");
				ch1.setChecked(movemenu);
				ch1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						movemenu=c;
					}
				});
				layout3.addView(ch1);
				
				var ch2 = new android.widget.CheckBox(ctx);
				ch2.setText("显示信息面板");
				ch2.setChecked(showinfo);
				ch2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						showinfo=c;
					}
				});
				layout3.addView(ch2);

				var ch3 = new android.widget.CheckBox(ctx);
				ch3.setText("信息面板不被拖动");
				ch3.setChecked(lockinfo);
				ch3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						lockinfo=c;
					}
				});
				layout3.addView(ch3);

				var ch4 = new android.widget.CheckBox(ctx);
				ch4.setText("攻击时显示生物血量");
				ch4.setChecked(showheal);
				ch4.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						showheal=c;
					}
				});
				layout3.addView(ch4);

				var ch5 = new android.widget.CheckBox(ctx);
				ch5.setText("显示截屏按钮");
				ch5.setChecked(showscrshot);
				ch5.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						showscrshot=c;
					}
				});
				layout3.addView(ch5);

				var ch6 = new android.widget.CheckBox(ctx);
				ch6.setText("长按按钮时允许振动");
				ch6.setChecked(allowshake);
				ch6.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
				{
					onCheckedChanged:function(v,c)
					{
						allowshake=c;
					}
				});
				layout3.addView(ch6);

				var buttonrs = new android.widget.Button(ctx);
				buttonrs.setText("恢复默认设置");
				buttonrs.setOnClickListener(new android.view.View.OnClickListener()
				{
					onClick: 	function(v)
					{
						movemenu=true;
						showinfo=true;
						lockinfo=false;
						showheal=true;
						showscrshot=true;
						allowshake=true;
						alertdialog2.dismiss();
					}
				});
				layout3.addView(buttonrs);

				alertdialog2.show();
				alertdialog2.getWindow().setLayout(dip2px(ctx,420),dip2px(ctx,280));
			}
		});
		dialog.setNegativeButton("知道了",new android.content.DialogInterface.OnClickListener()
		{
			onClick:
			function(dia,w)
			{
			}
		});
		alertdialog1=dialog.create();
		alertdialog1.show();
		alertdialog1.getWindow().setLayout(dip2px(ctx,420),dip2px(ctx,280));
	}
	catch(err)
	{
		perr("无法打开关于菜单",err);
	}
}


function jna()    //游戏设置
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var menu=new android.widget.PopupWindow(layout, dip2px(ctx,85 ), dip2px(ctx, 40));
		menu.setFocusable(true);


		var stitle=new android.widget.TextView(ctx);
		stitle.setText("游戏设置");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);


		var buttond=new android.widget.Button(ctx);
		buttond.setText("时间设置");
		buttond.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 4);
					addToArray(arr,0,["日出","白天","日落","黑夜"]);

					var builder = new android.app.AlertDialog.Builder(ctx);
					builder.setTitle("时间设置");
					builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
					{
onClick: 				function(dialog, which)
						{
							if(which==0)
							{
								Level.setTime(209);
							}
							else if(which==1)
							{
								Level.setTime(5);
							}
							else if(which==2)
							{
								Level.setTime(3);
							}
							else if(which==3)
							{
								Level.setTime(29);
							}
						}
					});
					builder.show();
				}					
				catch(err)
				{
					perr("无法打开游戏时间对话框",err);
				}
			}
		}));
		layout.addView(buttond);


		var buttonf=new android.widget.Button(ctx)
		buttonf.setText("模式设置")
		buttonf.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 4);
					addToArray(arr,0,["生存","创造","冒险(无用)","旁观(无用)"]);

					var builder = new android.app.AlertDialog.Builder(ctx);
					builder.setTitle("模式设置");
					builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
					{
onClick: 				function(dialog, which)
						{
							Level.setGameMode(which);
						}
					});
					builder.show();
				}					
				catch(err)
				{
					perr("无法打开游戏模式对话框",err);
				}
			}
		}));
		layout.addView(buttonf);


		var buttosp=new android.widget.Button(ctx);
		buttosp.setText("游戏速度");
		buttosp.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("设置游戏速度");

					var ts=new android.widget.TextView(ctx);
					ts.setTextSize(15);
					ts.setText("默认速度为20刻/秒。");
					layout1.addView(ts);

					var ts1=new android.widget.TextView(ctx);
					ts1.setTextSize(15);
					ts1.setText("当前速度："+gamespeed+"刻/秒。");
					layout1.addView(ts1);

					var seekbar1=new android.widget.SeekBar(ctx);
					seekbar1.setMax(39);
					seekbar1.setProgress(gamespeed/5-1);
					seekbar1.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener()
					{
						onProgressChanged:function(v,i,b)
						{
							ts1.setText("当前速度："+(i*5+5)+"刻/秒。");
						}
					});
					layout1.addView(seekbar1);

					var button1 = new android.widget.Button(ctx);
					button1.setText("确认");
					button1.setOnClickListener(new android.view.View.OnClickListener()
					{
onClick: 				function(p1)
						{
							dialog.dismiss();
							gamespeed=seekbar1.getProgress()*5+5;
							ModPE.setGameSpeed(gamespeed);
							print("已设置游戏速度。");
						}
					});
					layout1.addView(button1);

					dialog.show();
				}
				catch(err)
				{
					  perr("无法打开设置游戏速度对话框",err);
				}
			}
		}));
		layout.addView(buttosp);


		var buttoja=new android.widget.Button(ctx);
		buttoja.setText("步行模式");
		buttoja.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("步行模式");

					var radiogroup1 = new android.widget.RadioGroup(ctx);   
					layout1.addView(radiogroup1);    
					var radio1 = new android.widget.RadioButton(ctx);    
					radio1.setText("行走");
					radiogroup1.addView(radio1);
					var radio2 = new android.widget.RadioButton(ctx);   
					radio2.setText("疾跑");
					radiogroup1.addView(radio2);
					var radio3 = new android.widget.RadioButton(ctx);   
					radio3.setText("潜行");
					radiogroup1.addView(radio3); 
					if(running==0)
						radio1.setChecked(true);
					else if(running==1)
						radio2.setChecked(true);
					else if(running==2)
						radio3.setChecked(true);

					var button1 = new android.widget.Button(ctx);
					button1.setText("确认");
					button1.setOnClickListener(new android.view.View.OnClickListener()
					{
						onClick: function(p1)
						{
							dialog.dismiss();
							if(radio1.isChecked())
							{
								running=0;
								Entity.setSneaking(getPlayerEnt(),false);
							}
							else if(radio2.isChecked())
							{
								running=1;
								Entity.setSneaking(getPlayerEnt(),false);
							}
							else if(radio3.isChecked())
							{
								running=2;
								Entity.setSneaking(getPlayerEnt(),true);
							}
						}
					});
					layout1.addView(button1);

					dialog.show();
				}
				catch(err)
				{
					  perr("无法打开设置步行模式对话框",err);
				}
			}
		}));
		layout.addView(buttoja);


		var buttoqa=new android.widget.Button(ctx);
		buttoqa.setText("玩家坐标");
		buttoqa.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("输入玩家坐标");

					var ts=new android.widget.TextView(ctx);
					ts.setTextSize(15);
					ts.setText("请依次输入玩家的x,y,z坐标。");
					layout1.addView(ts);

					var edit1 = new android.widget.EditText(ctx);
					edit1.setHint("x坐标");
					edit1.setText(parseInt(Player.getX()).toString());
					edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit1);

					var edit2 = new android.widget.EditText(ctx);
					edit2.setHint("y坐标");
					edit2.setText(parseInt(Player.getY()).toString());
					edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit2);

					var edit3 = new android.widget.EditText(ctx);
					edit3.setHint("z坐标");
					edit3.setText(parseInt(Player.getZ()).toString());
					edit3.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit3);

					var button1 = new android.widget.Button(ctx);
					button1.setText("确认");
					button1.setOnClickListener(new android.view.View.OnClickListener()
					{
onClick: 				function(p1)
						{
							dialog.dismiss();
							Entity.setPosition(getPlayerEnt(), parseInt(edit1.getText()),parseInt(edit2.getText()),parseInt(edit3.getText()));
							print("已设置玩家坐标。");
						}
					});
					layout1.addView(button1);

					dialog.show();
				}
				catch(err)
				{
					  perr("无法打开设置玩家坐标对话框",err);
				}
			}
		}));
		layout.addView(buttoqa);


		var buttoq=new android.widget.Button(ctx);
		buttoq.setText("出生点设置");
		buttoq.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("输入出生点坐标");

					var ts=new android.widget.TextView(ctx);
					ts.setTextSize(15);
					ts.setText("请依次输入x,y,z坐标，已把数值设定为玩家当前坐标。");
					layout1.addView(ts);

					var edit1 = new android.widget.EditText(ctx);
					edit1.setHint("x坐标");
					edit1.setText(parseInt(Player.getX()).toString());
					edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit1);

					var edit2 = new android.widget.EditText(ctx);
					edit2.setHint("y坐标");
					edit2.setText(parseInt(Player.getY()).toString());
					edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit2);

					var edit3 = new android.widget.EditText(ctx);
					edit3.setHint("z坐标");
					edit3.setText(parseInt(Player.getZ()).toString());
					edit3.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit3);

					var button1 = new android.widget.Button(ctx);
					button1.setText("确认");
					button1.setOnClickListener(new android.view.View.OnClickListener()
					{
onClick: 				function(p1)
						{
							dialog.dismiss();
							Level.setSpawn(parseInt(edit1.getText()),parseInt(edit2.getText()),parseInt(edit3.getText()));
							print("设置出生点成功。");
						}
					});
					layout1.addView(button1);

					dialog.show();
				}
				catch(err)
				{
					  perr("无法打开设置出生点对话框",err);
				}
			}
		}));
		layout.addView(buttoq);




		var mlayout=makeMenu(ctx,menu,layout)
		menu.setContentView(mlayout)
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25)
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight())
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)))
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25,0)
	}
	catch(err)
	{
		perr("无法游戏设置菜单 ",err);
	}
}


function cs()     //传送
{
	try
	{
		function initi()   //初始化按钮
		{
			for(var i in btns)
			{
				layout.removeView(btns[i]);
			}
		}
		function addbtn(a)   //添加按钮
		{
			var butt=new android.widget.Button(ctx);
			butt.setText(warps[a].text);
			butt.setOnClickListener(new android.view.View.OnClickListener()
			{
				onClick:function(viewarg)
				{
					Entity.setPosition(getPlayerEnt(),warps[a].x,warps[a].y,warps[a].z);
				}
			});
			butt.setOnLongClickListener(new android.view.View.OnLongClickListener()
			{
				onLongClick:function(v)
				{
					ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(allowshake?30:0);
					layout.removeView(btns[a]);
					btns.splice(a,1);
					warps.splice(a,1);
					edit1.setText("传送点"+warps.length);
					initi();
					for(var i in warps)
					{
						addbtn(i);
					}
					return true;
				}
			});
			layout.addView(butt);
			btns.push(butt);
		}

		var menu=new android.widget.PopupWindow();
		menu.setFocusable(true);
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		var btns=new Array();         //存储按钮的数组
		var stitle=new android.widget.TextView(ctx);
		stitle.setText("传送");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);

		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("   by @2639439\n长按传送点按钮删除对应传送点。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);

		var buttono=new android.widget.Button(ctx);
		buttono.setText("添加传送点");
		buttono.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				warps.push({x:Player.getX(),y:Player.getY(),z:Player.getZ(),text:edit1.getText()});
				edit1.setText("传送点"+warps.length);
				initi();
				for(var i in warps)
				{
					addbtn(i);
				}
			}
		}));
		layout.addView(buttono);

		var edit1 = new android.widget.EditText(ctx);
		edit1.setHint("传送点名称");
		edit1.setTextSize(15);
		edit1.setText("传送点"+warps.length);
		edit1.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
		layout.addView(edit1);

		initi();
		for(var i in warps)
		{
			addbtn(i);
		}
		


		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25,0);
	}
	catch(err)
	{
		perr("无法打开传送菜单",err);
	}
}


function zaxiang()    //杂项功能
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var menu=new android.widget.PopupWindow(layout, dip2px(ctx,85 ), dip2px(ctx, 40));
		menu.setFocusable(true);


		var stitle=new android.widget.TextView(ctx);
		stitle.setText("杂项功能");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("随机抽奖：随机获得物品。\n雪球传送：传送到扔出的雪球掉落处。\n盔甲修复：修复身上盔甲耐久。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);
		

		var buttod=new android.widget.Button(ctx);
		buttod.setText("回满血");
		buttod.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				Entity.setHealth(getPlayerEnt(),20);
				print("血量已回满。");
			}
		}));
		layout.addView(buttod);


		var buttos=new android.widget.Button(ctx);
		buttos.setText("保留物品自杀");
		buttos.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				Entity.setHealth(getPlayerEnt(),0);
			}
		}));
		layout.addView(buttos);


		var buttonvv=new android.widget.Button(ctx);
		buttonvv.setText("随机抽奖");
		buttonvv.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				var wpid1=Level.getTime()-Math.floor(Level.getTime()/100)*100;
				var dialog=new android.app.AlertDialog.Builder(ctx);
				dialog.setTitle("随机抽奖");
				dialog.setMessage("你要抽奖吗？");
				dialog.setPositiveButton("要",new android.content.DialogInterface.OnClickListener()
				{
					onClick:
					function(dia,w)
					{
						var wpid2=Level.getTime()-Math.floor(Level.getTime()/100)*100;
						var wpid3=Level.getTime()-Math.floor(Level.getTime()/100)*100;
						var wpid=wpid1+wpid2+wpid3;
						
						var wpsl=Math.round(Math.random()*80);
						if(wpsl>64)
						{
							wpsl=wpsl-64;
						}
						if(wpid>255)
						{
							wpid=0;
							var dialog=new android.app.AlertDialog.Builder(ctx);
							dialog.setTitle("随机抽奖");
							dialog.setMessage("很抱歉，您没有获得任何物品。");
							dialog.setPositiveButton("确定",new android.content.DialogInterface.OnClickListener()
							{
								onClick:
								function(dia,w)
								{
								}
							});
							dialog.show();
						}
						if(wpid>0)
						{
							var dialog=new android.app.AlertDialog.Builder(ctx);
							dialog.setTitle("随机抽奖");
							dialog.setMessage("您获得了id为:"+wpid+"的物品;数量为:"+wpsl);
							dialog.setPositiveButton("确定",new android.content.DialogInterface.OnClickListener()
							{
								onClick:
								function(dia,w)
								{
									Player.addItemInventory(wpid,wpsl,0);
								}
							});
							dialog.setNegativeButton("放弃",new android.content.DialogInterface.OnClickListener()
							{
								onClick:
								function(dia,w)
								{
								}
							});
							dialog.show();
						}
					}
				});
				dialog.setNegativeButton("不愿意",new android.content.DialogInterface.OnClickListener()
				{
					onClick:
					function(dia,w)
					{
					}
				});
				dialog.show();
			}
		}));
		layout.addView(buttonvv);

		var tbutton1 = new android.widget.ToggleButton(ctx); 
		tbutton1.setTextOn("雪球传送 开");    
		tbutton1.setTextOff("雪球传送 关"); 
		tbutton1.setTextSize(18); 
		tbutton1.setChecked(xq);   
		tbutton1.setText(xq?"雪球传送 开":"雪球传送");    
		tbutton1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
		{
			onCheckedChanged:function(v,c)    
			{
				xq=c;
			}
		});
		layout.addView(tbutton1);


		var buttoa=new android.widget.Button(ctx);
		buttoa.setText("盔甲修复");
		buttoa.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				var zb=Player.getArmorSlot(0);
				if(zb==310||zb==314||zb==306||zb==302||zb==298)
				{
					Player.setArmorSlot(0,zb,0);
				}
				zb=Player.getArmorSlot(1);
				if(zb==311||zb==315||zb==307||zb==303||zb==299)
				{
					Player.setArmorSlot(1,zb,0);
				}
				zb=Player.getArmorSlot(2);
				if(zb==312||zb==316||zb==308||zb==304||zb==300)
				{
					Player.setArmorSlot(2,zb,0);
				}
				zb=Player.getArmorSlot(3);
				if(zb==313||zb==317||zb==309||zb==305||zb==301)
				{
					Player.setArmorSlot(3,zb,0);
				}
				print("已修复盔甲。");
			}
		}));
		layout.addView(buttoa);

		



		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25,0);
	}
	catch(err)
	{
		perr("无法打开杂项功能菜单",err);
	}
}


function stgl()      //实体管理
{
	if(spawnOnTap!=0)
	{
		spawnOnTap=0;
		print("取消生成实体。");
	}

	try
	{

		function addbtn(a)   //添加按钮
		{
			var butt=new android.widget.Button(ctx);
			butt.setText(warps[a].text);
			butt.setOnClickListener(new android.view.View.OnClickListener()
			{
				onClick:function(viewarg)
				{
					Entity.setPosition(getPlayerEnt(),warps[a].x,warps[a].y,warps[a].z);
				}
			});
			butt.setOnLongClickListener(new android.view.View.OnLongClickListener()
			{
				onLongClick:function(v)
				{
					ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(allowshake?30:0);
					layout.removeView(btns[a]);
					btns.splice(a,1);
					warps.splice(a,1);
					edit1.setText("传送点"+warps.length);
					initi();
					for(var i in warps)
					{
						addbtn(i);
					}
					return true;
				}
			});
			layout.addView(butt);
			btns.push(butt);
		}

		var menu=new android.widget.PopupWindow();
		menu.setFocusable(true);
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		var btns=new Array();         //存储按钮的数组
		var stitle=new android.widget.TextView(ctx);
		stitle.setText("实体管理");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);

		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("   by @lzjyzq2\n         @2639439\n设置筛选条件后，可以筛选出符合条件的实体。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);

		var buttonoe=new android.widget.Button(ctx);
		buttonoe.setText("更多管理");
		buttonoe.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				gdstgl();
			}
		}));
		layout.addView(buttonoe);
		

		var kinds=new Array();    //筛选实体种类
		var kindch=new Array();   //实体种类复选框
		for(var i in mobs_map)
		{
			kinds.push(true);
		}
		var buttonkf=new android.widget.Button(ctx);
		buttonkf.setText("筛选实体");
		buttonkf.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var results=new Array();    //筛选出的实体
					function scanforentity()
					{
						var entid=0;
						var foundid=false;
						for(var i in entities)    //逐个筛选
						{
							foundid=false;
							entid=Entity.getEntityTypeId(entities[i]);
							if(ch1.isChecked())     //按血量
							{
								if(id2type(entid)>=1&&id2type(entid)<=2)
								{
									if(Entity.getHealth(entities[i])<parseInt(editp1.getText())||Entity.getHealth(entities[i])>parseInt(editp2.getText()))
										continue;
								}
							}
							if(ch2.isChecked())     //按坐标
							{
								if( Entity.getX(entities[i])<parseInt(editpx1.getText())||Entity.getX(entities[i])>parseInt(editpx2.getText()) || 
									Entity.getY(entities[i])<parseInt(editpy1.getText())||Entity.getY(entities[i])>parseInt(editpy2.getText()) || 
									Entity.getZ(entities[i])<parseInt(editpz1.getText())||Entity.getZ(entities[i])>parseInt(editpz2.getText()) )
										continue;
							}
							for(var j in kinds)      //按种类
							{
								if(kinds[j]==true&&entid==mobs_map[j].id)
								{
									foundid=true;
									break;
								}
							}
							if(foundid==false)
								continue;
							results.push(entities[i]);    //找到结果
						}
					}

					var scroll1 = new android.widget.ScrollView(ctx);   
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);  
					scroll1.addView(layout1);     
					var builder1 = new android.app.AlertDialog.Builder(ctx);
					builder1.setView(scroll1);       
					builder1.setTitle("筛选实体");
					builder1.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
					{
						onClick: function(d,w)
						{
						}
					});
					var alertdialog1=builder1.create();


					scanforentity();
					var str="根据条件";
					if(ch1.isChecked())
						str+="  \"血量为"+parseInt(editp1.getText())+"~"+parseInt(editp2.getText())+"\"";
					if(ch2.isChecked())
						str+="  \"坐标为 x:"+parseInt(editpx1.getText())+"~"+parseInt(editpx2.getText())+
							" y:"+parseInt(editpy1.getText())+"~"+parseInt(editpy2.getText())+
							" z:"+parseInt(editpz1.getText())+"~"+parseInt(editpz2.getText())+"\"";
					str+="  \"种类为 ";
					for(var i in mobs_map)
					{
						if(kinds[i])
							str+=mobs_map[i].name+" ";
					}
					str+="\"  进行筛选，";
					if(results.length==0)
					{
						str+="没有找到符合条件的实体。";
					}
					else
					{
						str+="找到"+results.length+"个符合条件的实体。长按复选框传送到相应实体。";
					}
					var titlef = new android.widget.TextView(ctx);    
					titlef.setTextSize(13);
					titlef.setText(str);
					layout1.addView(titlef);  


					if(results.length!=0)    //选择要管理的实体
					{
						var checks=new Array();     //存储复选框和文字
						var btnp = new android.widget.Button(ctx);
						btnp.setText("管理选中实体");
						btnp.setOnClickListener(new android.view.View.OnClickListener()
						{
							onClick: function(p1)
							{
								try
								{
									var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence,5);

									addToArray(arr, 0, [
										"移除选中实体",
										"设置实体坐标",
										"设置生物血量",
										"让生物着火",
										"设置动物年龄"
									]);

									var builder2 = new android.app.AlertDialog.Builder(ctx);
									builder2.setTitle("管理选中实体");
									builder2.setItems(arr, new android.content.DialogInterface.OnClickListener()
									{
										onClick: function(d,w)
										{
											if(w==0)
											{
												for(var i in results)
												{
													if(checks[i].isChecked())
													{
														Entity.remove(results[i]);
													}
												}
												print("已移除选中实体。");
												alertdialog1.dismiss();
											}
											else if(w==1)
											{
												try
												{
													var scroll2 = new android.widget.ScrollView(ctx);   
													var layout2 = new android.widget.LinearLayout(ctx);
													layout2.setOrientation(android.widget.LinearLayout.VERTICAL);  
													scroll2.addView(layout2);     
													var builder2 = new android.app.AlertDialog.Builder(ctx);
													builder2.setView(scroll2);       
													builder2.setTitle("设置实体坐标");
													builder2.setPositiveButton("取消",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
														}
													});
													builder2.setNegativeButton("确定",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
															var newx=parseInt(edit1.getText()),newy=parseInt(edit2.getText()),newz=parseInt(edit3.getText());
															for(var i in results)
															{
																if(checks[i].isChecked())
																{
																	Entity.setPosition(results[i],newx,newy,newz);
																}
															}
															print("已设置实体坐标。");
															alertdialog1.dismiss();
														}
													});
													var alertdialog2=builder2.create();

													var ts=new android.widget.TextView(ctx);
													ts.setTextSize(15);
													ts.setText("设置实体坐标对所有实体有效，请依次输入实体的x,y,z坐标(默认设置为玩家坐标)。");
													layout2.addView(ts);

													var edit1 = new android.widget.EditText(ctx);
													edit1.setHint("x坐标");
													edit1.setText(parseInt(Player.getX()).toString());
													edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
													layout2.addView(edit1);
													var edit2 = new android.widget.EditText(ctx);
													edit2.setHint("y坐标");
													edit2.setText(parseInt(Player.getY()).toString());
													edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
													layout2.addView(edit2);
													var edit3 = new android.widget.EditText(ctx);
													edit3.setHint("z坐标");
													edit3.setText(parseInt(Player.getZ()).toString());
													edit3.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
													layout2.addView(edit3);

													alertdialog2.show();
													alertdialog2.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
												}
												catch(err)
												{
													perr("无法打开设置实体坐标对话框",err);
												}
											}
											else if(w==2)
											{
												try
												{
													var scroll2 = new android.widget.ScrollView(ctx);   
													var layout2 = new android.widget.LinearLayout(ctx);
													layout2.setOrientation(android.widget.LinearLayout.VERTICAL);  
													scroll2.addView(layout2);     
													var builder2 = new android.app.AlertDialog.Builder(ctx);
													builder2.setView(scroll2);       
													builder2.setTitle("设置生物血量");
													builder2.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
														}
													});
													builder2.setNegativeButton("确定",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
															var entid2=0;
															if(radio1.isChecked())
															{
																for(var i in results)
																{
																	entid2=Entity.getEntityTypeId(entities[i]);
																	if(checks[i].isChecked()&&id2type(entid2)>=1&&id2type(entid2)<=2)
																	{
																		Entity.setHealth(results[i],id2fullhp(entid2));
																	}
																}
															}
															else if(radio2.isChecked())
															{
																for(var i in results)
																{
																	entid2=Entity.getEntityTypeId(entities[i]),newhp=parseInt(edit1.getText());
																	if(checks[i].isChecked()&&id2type(entid2)>=1&&id2type(entid2)<=2)
																	{
																		Entity.setHealth(results[i],newhp);
																	}
																}
															}
															print("已设置生物血量。");
															alertdialog1.dismiss();
														}
													});
													var alertdialog2=builder2.create();

													var ts=new android.widget.TextView(ctx);
													ts.setTextSize(15);
													ts.setText("设置生物血量对动物和怪物有效，请输入要设置的生物血量。");
													layout2.addView(ts);

													var radiogroup1 = new android.widget.RadioGroup(ctx);    
													layout2.addView(radiogroup1);    
													var radio1 = new android.widget.RadioButton(ctx);    
													radio1.setText("设为满血量");
													radiogroup1.addView(radio1);    
													var radio2 = new android.widget.RadioButton(ctx);   
													radio2.setText("设为固定值：");
													radiogroup1.addView(radio2);  
													radio1.setChecked(true);

													var edit1 = new android.widget.EditText(ctx);
													edit1.setHint("输入血量");
													edit1.setText("20");
													edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
													layout2.addView(edit1);

													alertdialog2.show();
													alertdialog2.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
												}
												catch(err)
												{
													perr("无法打开设置生物血量对话框",err);
												}
											}
											else if(w==3)
											{
												try
												{
													var scroll2 = new android.widget.ScrollView(ctx);   
													var layout2 = new android.widget.LinearLayout(ctx);
													layout2.setOrientation(android.widget.LinearLayout.VERTICAL);  
													scroll2.addView(layout2);     
													var builder2 = new android.app.AlertDialog.Builder(ctx);
													builder2.setView(scroll2);       
													builder2.setTitle("生物着火");
													builder2.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
														}
													});
													builder2.setNegativeButton("确定",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
															var entid2=0,firetick=parseInt(edit1.getText());
															if(firetick<=0)
															{
																firetick=1;
															}
															for(var i in results)
															{
																entid2=Entity.getEntityTypeId(entities[i]);
																if(checks[i].isChecked()&&id2type(entid2)>=1&&id2type(entid2)<=2)
																{
																	Entity.setFireTicks(results[i],firetick);
																}
															}
															print("已让生物着火。");
															alertdialog1.dismiss();
														}
													});
													var alertdialog2=builder2.create();

													var ts=new android.widget.TextView(ctx);
													ts.setTextSize(15);
													ts.setText("设置实体坐标对动物和怪物有效，请输入生物着火时间。");
													layout2.addView(ts);

													var edit1 = new android.widget.EditText(ctx);
													edit1.setHint("输入生物着火时间");
													edit1.setText("10");
													edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
													layout2.addView(edit1);


													alertdialog2.show();
													alertdialog2.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
												}
												catch(err)
												{
													perr("无法打开生物着火对话框",err);
												}
											}
											else if(w==4)
											{
												try
												{
													var scroll2 = new android.widget.ScrollView(ctx);   
													var layout2 = new android.widget.LinearLayout(ctx);
													layout2.setOrientation(android.widget.LinearLayout.VERTICAL);  
													scroll2.addView(layout2);     
													var builder2 = new android.app.AlertDialog.Builder(ctx);
													builder2.setView(scroll2);       
													builder2.setTitle("设置动物年龄");
													builder2.setPositiveButton("返回",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
														}
													});
													builder2.setNegativeButton("确定",new android.content.DialogInterface.OnClickListener()
													{
														onClick: function(d,w)
														{
															var entid2=0;
															if(radio1.isChecked())
															{
																for(var i in results)
																{
																	entid2=Entity.getEntityTypeId(entities[i]);
																	if(checks[i].isChecked()&&id2type(entid2)>=1&&id2type(entid2)<=1)
																	{
																		Entity.setAnimalAge(results[i],-24000);
																	}
																}
															}
															else if(radio2.isChecked())
															{
																for(var i in results)
																{
																	entid2=Entity.getEntityTypeId(entities[i]);
																	if(checks[i].isChecked()&&id2type(entid2)>=1&&id2type(entid2)<=1)
																	{
																		Entity.setAnimalAge(results[i],0);
																	}
																}
															}
															print("已设置动物年龄。");
															alertdialog1.dismiss();
														}
													});
													var alertdialog2=builder2.create();

													var ts=new android.widget.TextView(ctx);
													ts.setTextSize(15);
													ts.setText("设置动物年龄仅对动物有效，请选择年龄。");
													layout2.addView(ts);

													var radiogroup1 = new android.widget.RadioGroup(ctx);    
													layout2.addView(radiogroup1);    
													var radio1 = new android.widget.RadioButton(ctx);    
													radio1.setText("幼儿");
													radiogroup1.addView(radio1);    
													var radio2 = new android.widget.RadioButton(ctx);   
													radio2.setText("成体");
													radiogroup1.addView(radio2);  
													radio2.setChecked(true);


													alertdialog2.show();
													alertdialog2.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
												}
												catch(err)
												{
													perr("无法打开设置动物年龄对话框",err);
												}
											}

										}
									});
									var alertdialog2=builder2.create();
									alertdialog2.show();
									alertdialog2.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
								}
								catch(err)
								{
									perr("无法打开管理选中实体对话框",err);
								}
							}
						});
						layout1.addView(btnp);

						var cancelbyuser1=true;    //是否用户取消全选
						var chk1 = new android.widget.CheckBox(ctx);   //全选
						chk1.setText("选中全部实体");
						chk1.setTextSize(15);
						chk1.setChecked(true);
						chk1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
						{
							onCheckedChanged: function(v,c)
							{
								if(c)
								{
									for(var i in checks)
										checks[i].setChecked(true);
								}
								else if(cancelbyuser1)
								{
									for(var i in checks)
										checks[i].setChecked(false);
								}
							}
						});
						layout1.addView(chk1);

						function makecheck(a,mob)
						{
							var entid1=Entity.getEntityTypeId(mob);
							var str=id2name(entid1)+"    x:"+Entity.getX(mob).toFixed(1)+"  y:"+Entity.getY(mob).toFixed(0)+"  z:"+Entity.getZ(mob).toFixed(1);
							if(id2type(entid1)>=1&&id2type(entid1)<=2)
							{
								str+="    血量:"+Entity.getHealth(mob);
							}
							var chm = new android.widget.CheckBox(ctx);
							chm.setText(str);
							chm.setTextSize(15);
							chm.setChecked(true);
							chm.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
							{
								onCheckedChanged: function(v,c)
								{
									var all1=true;   //全部选中
									for(var i in checks)
									{
										if(checks[i].isChecked()==false)
											all1=false;
									}
									if(all1==true)
									{
										chk1.setChecked(true);
									}
									else
									{
										cancelbyuser1=false;      //非用户取消全选
										chk1.setChecked(false);
										cancelbyuser1=true;
									}
								}
							});
							chm.setOnLongClickListener(new android.view.View.OnLongClickListener()
							{
								onLongClick: 		function(v)
								{
									ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(allowshake?30:0);
									Entity.setPosition(getPlayerEnt(),Entity.getX(results[a]),Entity.getY(results[a])+2,Entity.getZ(results[a]));
									return true;
								}
							});
							layout1.addView(chm);
							checks.push(chm);
						}
					}
					for(var i in results)    //添加实体筛选复选框
					{
						makecheck(i,results[i]);
					}
					


					alertdialog1.show();
					alertdialog1.getWindow().setLayout(dip2px(ctx,450),dip2px(ctx,300));
				}
				catch(err)
				{
					perr("无法打开筛选实体对话框",err);
				}
			}
		}));
		layout.addView(buttonkf);


		var stitle2=new android.widget.TextView(ctx);
		stitle2.setText("筛选条件");
		stitle2.setTextSize(14);
		layout.addView(stitle2);

		var ch1 = new android.widget.CheckBox(ctx);     //按血量筛选
		ch1.setText("血量为(对动物、怪物有效)：");
		ch1.setTextSize(12);
		ch1.setChecked(false);
		layout.addView(ch1);
		var layoutp1=new android.widget.LinearLayout(ctx);
		layoutp1.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
		layout.addView(layoutp1);
		var editp1 = new android.widget.EditText(ctx);
		editp1.setHint("最低");
		editp1.setTextSize(14);
		editp1.setText("0");
		editp1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutp1.addView(editp1);
		var stitlep1=new android.widget.TextView(ctx);
		stitlep1.setText("~");
		stitlep1.setTextSize(14);
		layoutp1.addView(stitlep1);
		var editp2 = new android.widget.EditText(ctx);
		editp2.setHint("最高");
		editp2.setTextSize(14);
		editp2.setText("20");
		editp2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutp1.addView(editp2);

		var ch2 = new android.widget.CheckBox(ctx);      //按坐标筛选
		ch2.setText("坐标为(已设为玩家附近10格)：");
		ch2.setTextSize(12);
		ch2.setChecked(false);
		layout.addView(ch2);
		var layoutpx=new android.widget.LinearLayout(ctx);
		layoutpx.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
		layout.addView(layoutpx);
		var stitlepx1=new android.widget.TextView(ctx);
		stitlepx1.setText("x:");
		stitlepx1.setTextSize(14);
		layoutpx.addView(stitlepx1);
		var editpx1 = new android.widget.EditText(ctx);
		editpx1.setHint("最低");
		editpx1.setTextSize(14);
		editpx1.setText(Math.floor(Player.getX()-5).toString());
		editpx1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpx.addView(editpx1);
		var stitlepx2=new android.widget.TextView(ctx);
		stitlepx2.setText("~");
		stitlepx2.setTextSize(14);
		layoutpx.addView(stitlepx2);
		var editpx2 = new android.widget.EditText(ctx);
		editpx2.setHint("最高");
		editpx2.setTextSize(14);
		editpx2.setText(Math.floor(Player.getX()+5).toString());
		editpx2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpx.addView(editpx2);

		var layoutpy=new android.widget.LinearLayout(ctx);
		layoutpy.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
		layout.addView(layoutpy);
		var stitlepy1=new android.widget.TextView(ctx);
		stitlepy1.setText("y:");
		stitlepy1.setTextSize(14);
		layoutpy.addView(stitlepy1);
		var editpy1 = new android.widget.EditText(ctx);
		editpy1.setHint("最低");
		editpy1.setTextSize(14);
		editpy1.setText(Math.floor(Player.getY()-5).toString());
		editpy1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpy.addView(editpy1);
		var stitlepy2=new android.widget.TextView(ctx);
		stitlepy2.setText("~");
		stitlepy2.setTextSize(14);
		layoutpy.addView(stitlepy2);
		var editpy2 = new android.widget.EditText(ctx);
		editpy2.setHint("最高");
		editpy2.setTextSize(14);
		editpy2.setText(Math.floor(Player.getY()+5).toString());
		editpy2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpy.addView(editpy2);

		var layoutpz=new android.widget.LinearLayout(ctx);
		layoutpz.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
		layout.addView(layoutpz);
		var stitlepz1=new android.widget.TextView(ctx);
		stitlepz1.setText("z:");
		stitlepz1.setTextSize(14);
		layoutpz.addView(stitlepz1);
		var editpz1 = new android.widget.EditText(ctx);
		editpz1.setHint("最低");
		editpz1.setTextSize(14);
		editpz1.setText(Math.floor(Player.getZ()-5).toString());
		editpz1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpz.addView(editpz1);
		var stitlepz2=new android.widget.TextView(ctx);
		stitlepz2.setText("~");
		stitlepz2.setTextSize(14);
		layoutpz.addView(stitlepz2);
		var editpz2 = new android.widget.EditText(ctx);
		editpz2.setHint("最高");
		editpz2.setTextSize(14);
		editpz2.setText(Math.floor(Player.getZ()+5).toString());
		editpz2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpz.addView(editpz2);


		var cancelbyuser=true;    //是否用户取消全选
		var chk1 = new android.widget.CheckBox(ctx);   //全选
		chk1.setText("选择全部种类");
		chk1.setTextSize(13);
		chk1.setChecked(true);
		chk1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
		{
			onCheckedChanged: function(v,c)
			{
				if(c)
				{
					for(var i in kindch)
						kindch[i].setChecked(true);
				}
				else if(cancelbyuser)
				{
					for(var i in kindch)
						kindch[i].setChecked(false);
				}
			}
		});
		layout.addView(chk1);		

		function addmobkinds(a)     //添加实体种类
		{
			var chm = new android.widget.CheckBox(ctx);
			chm.setText(mobs_map[a].name);
			chm.setTextSize(13);
			chm.setChecked(true);
			chm.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
			{
onCheckedChanged: function(v,c)
				{
					kinds[a]=c;
					var all=true;   //全部选中
					for(var i in kindch)
					{
						if(kindch[i].isChecked()==false)
							all=false;
					}
					if(all==true)
					{
						chk1.setChecked(true);
					}
					else
					{
						cancelbyuser=false;      //非用户取消全选
						chk1.setChecked(false);
						cancelbyuser=true;
					}
				}
			});
			layout.addView(chm);
			kindch[a]=chm;
		}
		for(var i in mobs_map)    //添加实体种类筛选复选框
		{
			addmobkinds(i);
		}



		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25,0);
	}
	catch(err)
	{
		perr("无法打开实体管理菜单",err);
	}
}


function gdstgl()     //更多实体管理
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var menu=new android.widget.PopupWindow(layout,dip2px(ctx,85),dip2px(ctx,40));
		menu.setFocusable(true);


		var stitle=new android.widget.TextView(ctx);
		stitle.setText("更多实体管理");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("生物骑乘：点击生物骑乘上去，生物会跟随玩家方向移动。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);

		
		var buttono=new android.widget.Button(ctx);
		buttono.setText("生成实体");
		buttono.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("生成实体");

					var spinner1=new android.widget.Spinner(ctx);
					var str=new Array();
					for(var i in mobs_map)
					{
						str.push(mobs_map[i].name);
					}
					spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
					layout1.addView(spinner1);

					var layout2=new android.widget.LinearLayout(ctx);
					layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
					layout1.addView(layout2);

					var stitlea2=new android.widget.TextView(ctx);
					stitlea2.setText("数量：");
					layout2.addView(stitlea2);

					var edit1 = new android.widget.EditText(ctx);
					edit1.setHint("请输入生成实体数量");
					edit1.setText(spawncount.toString());
					edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout2.addView(edit1);

					var radiogroup1 = new android.widget.RadioGroup(ctx);    
					layout1.addView(radiogroup1);    
					var radio1 = new android.widget.RadioButton(ctx);    
					radio1.setText("生成位置(已设为玩家坐标)：");
					radiogroup1.addView(radio1);

					var layout3=new android.widget.LinearLayout(ctx);
					layout3.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
					radiogroup1.addView(layout3); 
					var stitlex=new android.widget.TextView(ctx);
					stitlex.setText("x:");
					layout3.addView(stitlex);
					var editx1 = new android.widget.EditText(ctx);
					editx1.setHint("x坐标");
					editx1.setText(Math.floor(Player.getX()).toString());
					editx1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout3.addView(editx1);
					var stitley=new android.widget.TextView(ctx);
					stitley.setText("y:");
					layout3.addView(stitley);
					var edity1 = new android.widget.EditText(ctx);
					edity1.setHint("y坐标");
					edity1.setText(Math.floor(Player.getY()).toString());
					edity1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout3.addView(edity1);
					var stitlez=new android.widget.TextView(ctx);
					stitlez.setText("z:");
					layout3.addView(stitlez);
					var editz1 = new android.widget.EditText(ctx);
					editz1.setHint("z坐标");
					editz1.setText(Math.floor(Player.getZ()).toString());
					editz1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout3.addView(editz1);

					var radio2 = new android.widget.RadioButton(ctx);   
					radio2.setText("点击方块生成实体");
					radiogroup1.addView(radio2);  
					radio1.setChecked(true);


					var btn1 = new android.widget.Button(ctx);
					btn1.setText("确认");
					btn1.setOnClickListener(new android.view.View.OnClickListener()
					{
						onClick:function(p1)
						{
							spawncount=parseInt(edit1.getText()),spawnid=name2id(spinner1.getSelectedItem());
							if(radio1.isChecked())
							{
								if(spawnid!=0)
								{
									for (var i=0; i<spawncount; i++)
									{
										Level.spawnMob(parseInt(editx1.getText()),parseInt(edity1.getText()),parseInt(editz1.getText()),spawnid);
									}
								}
							}
							else if(radio2.isChecked())
							{
								spawnOnTap=spawnid;
								print("请点击方块生成实体。");
							}
							dialog.dismiss();
						}
					});
					layout1.addView(btn1);
					dialog.show();
				}
				catch(err)
				{
					perr("无法打开生成实体对话框",err);
				}
			}
		}));
		layout.addView(buttono);


		var buttonr=new android.widget.Button(ctx);
		buttonr.setText("骑乘生物");
		buttonr.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				if(ride)
				{
					ride=false;
					print("取消骑乘。");
				}
				else
				{
					ride=true;
					print("请点击你想要骑的生物，再次点击本按钮取消操作。");
				}
			}
		}));
		layout.addView(buttonr);


		var buttonf1=new android.widget.Button(ctx);
		buttonf1.setText("实体模型更换");
		buttonf1.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				menu.dismiss();
				mxth();
			}
		}));
		layout.addView(buttonf1);






		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.5,0);
	}
	catch(err)
	{
		perr("无法打开更多实体管理菜单",err);
	}
}


function mxth()      //实体模型
{
	function closeall()
	{
		pf=false;
		ji=false;
		niu=false;
		zhu=false;
		yang=false;
		zz=false;
		js=false;
		kl=false;
		klp=false;
		jszr=false;
		kc=false;
	}

	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var menu=new android.widget.PopupWindow();
		menu.setFocusable(true);
		

		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
		var stitle=new android.widget.TextView(ctx);
		stitle.setTextSize(17);
		stitle.setText("生物变形(实体模型更换)");
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		stitle.setLayoutParams(textParams);
		layout.addView(stitle);


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("   by @高达朱朱\n选择一种模型，然后点击实体即可更换。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);



		var buttonk=new android.widget.Button(ctx);
		if(pf==true)
		{
			buttonk.setText("皮肤(已开)");
		}
		else if(pf==false)
		{
			buttonk.setText("皮肤(已关)");
		} 
		buttonk.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(viewarg)
			{
				if(pf==false)
				{
					buttonk.setText("皮肤(已开)");
					pf=true;
					clientMessage("皮肤变形已开启");
				}
				else if(pf==true)
				{
					buttonk.setText("皮肤(已关)");
					pf=false;
					clientMessage("皮肤变形已关闭");
				}
			}
		}));
		layout.addView(buttonk)   ;

		var button1=new android.widget.Button(ctx);
		button1.setText("关闭所有");
		button1.setOnClickListener(new android.view.View.OnClickListener({
	onClick:function(viewarg)
			{
				closeall();
			}
		}));
		layout.addView(button1);

		var button2=new android.widget.Button(ctx);
		button2.setText("鸡");
		button2.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				ji=true;
				clientMessage("变形鸡已开启");
			}
		}));
		layout.addView(button2);

		var button3=new android.widget.Button(ctx);
		button3.setText("牛");
		button3.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				niu=true;
				clientMessage("变形牛已开启");
			}
		}));
		layout.addView(button3);

		var button4=new android.widget.Button(ctx);
		button4.setText("猪");
		button4.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				zhu=true;
				clientMessage("变形猪已开启");
			}
		}));
		layout.addView(button4);

		var button5=new android.widget.Button(ctx);
		button5.setText("羊");
		button5.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				yang=true;
				clientMessage("变形羊已开启");
			}
		}));
		layout.addView(button5);

		var button6=new android.widget.Button(ctx);
		button6.setText("蜘蛛");
		button6.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				zz=true;
				clientMessage("变形蜘蛛已开启");
			}
		}))
		layout.addView(button6);

		var button7=new android.widget.Button(ctx);
		button7.setText("僵尸");
		button7.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				js=true;
				clientMessage("变形僵尸已开启");
			}
		}));
		layout.addView(button7);

		var button8=new android.widget.Button(ctx);
		button8.setText("骷髅");
		button8.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				kl=true
				clientMessage("变形骷髅已开启");
			}
		}));
		layout.addView(button8);

		var button9=new android.widget.Button(ctx);
		button9.setText("苦力怕");
		button9.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				klp=true;
				clientMessage("变形苦力怕已开启");
			}
		}));
		layout.addView(button9);

		var button10=new android.widget.Button(ctx);
		button10.setText("僵尸猪人");
		button10.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				jszr=true;
				clientMessage("变形猪人已开启");
			}
		}));
		layout.addView(button10);

		var button11=new android.widget.Button(ctx);
		button11.setText("矿车");
		button11.setOnClickListener(new android.view.View.OnClickListener({
			onClick:function(viewarg)
			{
				closeall();
				kc=true;
				clientMessage("变形矿车已开启");
			}
		}));
		layout.addView(button11);


		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.5,0);
	}
	catch(err)
	{
		perr("无法打开实体模型菜单",err);
	}
}


function template()     //模板，建造菜单请复制此模板
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var menu=new android.widget.PopupWindow(layout,dip2px(ctx,85),dip2px(ctx,40));
		menu.setFocusable(true);


		var stitle=new android.widget.TextView(ctx);
		stitle.setText("标题");
		stitle.setTextSize(18);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		layout.addView(stitle);


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("这是副标题。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);

		//在这里写代码


		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
		menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25,0);
	}
	catch(err)
	{
		perr("无法打开***菜单",err);
	}
}


function makeMenu(ctx,menu,layout)
{
	var mlayout=new android.widget.RelativeLayout(ctx);
	var svParams=new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT,android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
	var scrollview=new android.widget.ScrollView(ctx);
	var pad = dip2px(ctx,5);
	scrollview.setPadding(pad,pad,pad,pad);
	scrollview.setLayoutParams(svParams);
	scrollview.addView(layout);
	mlayout.addView(scrollview);
	return mlayout;
}


function perr(action,err)    //输出错误 
{
	print("\n错误："+action+"："+err);
}


function dip2px(ctx,dips)
{
	return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density)
}


function addToArray(arr, sindex, entries)
{
	for(var i=0;i<entries.length;i++)
		arr[sindex+i] = entries[i];
}


function name2id(name)     //实体名称、id、种类互相查询
{
	for(var i in mobs_map)
	{
		if(name==mobs_map[i].name)
			return mobs_map[i].id;
	}
	return 0;
}
function id2name(id)
{
	for(var i in mobs_map)
	{
		if(id==mobs_map[i].id)
			return mobs_map[i].name;
	}
	return "unknown";
}
function id2fullhp(id)
{
	for(var i in mobs_map)
	{
		if(id==mobs_map[i].id)
			return mobs_map[i].full;
	}
	return 20;
}
function id2type(id)
{
	for(var i in mobs_map)
	{
		if(id==mobs_map[i].id)
			return mobs_map[i].type;
	}
	return 2;
}


function leaveGame()
{
	try
	{
		ctx.runOnUiThread(new java.lang.Runnable(
		{
			run:function()
			{
				if(btnWindow!=null)
				{
					mainbutton=null;
					btnWindow.dismiss();
					btnWindow=null;
				}
				if(sGUI != null) 
				{
					sGUI.dismiss();
					sGUI=null;
				}
				if(simpleGUI != null)
				{
					simpleGUI.dismiss();
					simpleGUI = null;
				}
				if(nmenu!=null)
				{
					nbutton=null;
					nmenu.dismiss();
					nmenu=null;
				}
			}
		}));
	}
	catch(err)
	{
		perr("无法关闭菜单",err);
	}
	try    //保存配置文件
	{
		var fos=new java.io.FileOutputStream(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/全能助手设置.dat");
		fos.write(helperver);
		fos.write(movemenu?1:0);
		fos.write(showinfo?1:0);
		fos.write(lockinfo?1:0);
		fos.write(showheal?1:0);
		fos.write(showscrshot?1:0);
		fos.write(allowshake?1:0);
		fos.close();
	}
	catch(err)
	{
		perr("无法保存配置文件",err);
	}

	gamespeed=20;
	warps=new Array();
	spawnOnTap=0;
	nuke=0;zl=0;cen=0;sml=0;big=0;dsx=0;dsj=0;ryh=0;  //科技武器
	qj=false;csj=false;rsj=false;	   //小技能						
	bzj=false;    //爆炸箭
	pf=false;     //实体皮肤
	ride=false;riding=false;  //骑乘
	attackmobtime=0;    //生物血量显示
}


function modTick()
{
	if(showheal&&attackmobtime>0)     //生物血量显示
	{
		attackmobtime-=1;
		if(attackmobtime%20==0)
		{
			if(attackmobcheck)
			{
				health=Entity.getHealth(attackmob);
				if(health<=0)
				{
					health=0;
					attackmobtime=60;
					attackmobcheck=false;
				}
			}
			try
			{
				ctx.runOnUiThread(new java.lang.Runnable(
				{
run: 				function()
					{	
						mobhealbar.setVisibility(1);
						if(!isNaN(amobfullhealth)) 
						{
							mobhealbar.setMax(amobfullhealth);
						}
						else mobhealbar.setMax(1)
						{
							mobhealbar.setProgress(health);
						}
						mobtext1.setText(attackmobname);
						mobtext2.setText(health+"/"+amobfullhealth);
					}	
				}));
			}
			catch(err)
			{
				perr("无法更新生物信息",err);	
			}
		}
		if(attackmobtime==0)
		{
			attackmobtime-=1;
			try
			{
				ctx.runOnUiThread(new java.lang.Runnable(
				{
run: 				function() 
					{
						mobhealbar.setVisibility(5);
						mobtext1.setText("");
						mobtext2.setText("");
					}
				}));
			}
			catch(err)
			{
				perr("无法更新生物信息",err);
			}
		}
	}

	if(riding)    //生物骑乘
	{
		var velX=-Math.sin(Entity.getYaw(getPlayerEnt())/180*Math.PI)*0.2,velZ=Math.cos(Entity.getYaw(getPlayerEnt())/180*Math.PI)*0.2,velY=0;
		var jumpVel=0.2;
		if(velX>0)
		{
			if (getTile(Player.getX()+1, Math.floor(Entity.getY(ridingAnimal)), Player.getZ()) != 0)
				velY=jumpVel;
		}
		else if(getTile(Player.getX()-1, Math.floor(Entity.getY(ridingAnimal)), Player.getZ()) != 0)
		{	
			velY=jumpVel;
		}
		if(velZ>0)
		{
			if(getTile(Player.getX(), Math.floor(Entity.getY(ridingAnimal)), Player.getZ()+1) != 0)
				velY=jumpVel;
		}
		else if(getTile(Player.getX(), Math.floor(Entity.getY(ridingAnimal)), Player.getZ()-1) != 0)
		{
			velY=jumpVel;
		}
		if(velY==0&&getTile(Player.getX(),Player.getY()-2,Player.getZ())==0) 
		{
			velY=-jumpVel;
		}
		Entity.setVelX(ridingAnimal, velX);
		Entity.setVelY(ridingAnimal, velY);
		Entity.setVelZ(ridingAnimal, velZ);
	}

	if(running==1)   //疾跑
	{
		if(runi==1)
		{
			Xpos=Player.getX();
			Zpos=Player.getZ();
			runi=runi+1;
		}
		else if(runi==3)
		{
			runi=1;
			Xdiff=Player.getX()-Xpos;
			Zdiff=Player.getZ()-Zpos;
			Entity.setVelX(getPlayerEnt(),Xdiff);
			Entity.setVelZ(getPlayerEnt(),Zdiff);
			Xdiff=0;
			Zdiff=0;
		}
		if(runi!=1)
		{
			runi=runi+1;
		}
	}

}





function useItem(x,y,z,itemid,blockid,side,itemDamage,blockDamage)
{
	if(wk==true)     //挖矿精灵
	{
		if(itemid==270||itemid==257||itemid==285||itemid==278||itemid==274)
		{
			var b=0,ti1=0;
			if(blockid==14||blockid==15||blockid==16||blockid==21||blockid==56||blockid==73)
			{
				clientMessage("你点击的方块就是矿石！");
				b=128;
			}
			for( ; b<128; b++)
			{
				ti1=getTile(x,y-b,z);
				if(ti1==14||ti1==15||ti1==16||ti1==21||ti1==56||ti1==73)
				{
					clientMessage("此处有矿石，位于地下"+b+"层处。");
					break;
				}
				if(ti1==7)
				{
					clientMessage("此处没有矿石。");
					break;
				}
			}
		}
	}

	if(spawnOnTap!=0)     //生成实体
	{
		for (var i=0; i<spawncount; i++)
		{
			Level.spawnMob(x-(side==4?1:0)+(side==5?1:0)+0.5,y-(side==0?1:0)+(side==1?1:0)+0.5,z-(side==2?1:0)+(side==3?1:0)+0.5,spawnOnTap);
		}
		spawnOnTap=0;
		preventDefault();
	}
}


function destroyBlock(x,y,z,side)
{
	if(wq==true&&Level.getTile(x,y,z)==17)      //一键砍树
	{
		for(var i=0; Level.getTile(x,y+i,z)==17; i++)
		{
			Level.destroyBlock(x,y+i,z,1);
		}
		for(var i=-1; Level.getTile(x,y+i,z)==17; i--)
		{
			Level.destroyBlock(x,y+i,z,1);
		}
	};

	if(fk==true)           //方块复制
	{
		preventDefault();
		Level.dropItem(x,y,z,0,Level.getTile(x,y,z),1,Level.getData(x,y,z));
	}

}


function entityAddedHook(ent)
{
	entities.push(ent);    //实体管理

}


function entityRemovedHook(ent)
{
	entities.splice(entities.indexOf(ent),1);    //实体管理

	if(xq==true)   //雪球传送
	{
		var io=0;
		if(Entity.getEntityTypeId(ent)==81)
		{
			x=Entity.getX(ent);
			y=Entity.getY(ent);
			z=Entity.getZ(ent);
			io=0;
			if(y<0)
			{
				io=1;
			}
			if(io!=1)
			{
				Entity.setPosition(getPlayerEnt(),x,y+2,z);
				io=0;
				clientMessage("已传送");
			}
		}
	}

}


function attackHook(attacker,victim)
{
	if(showheal)     //生物血量显示
	{
		findMob(Entity.getEntityTypeId(victim));
		if(attackmobname!="")
		{
			attackmobtime=201;
			attackmob=victim;
			attackmobcheck=true;
		}
	}


	if(ride)
	{
		Entity.rideAnimal(attacker, victim);
		riding = true;
		ridingAnimal = victim;
		ride = false;
	}


	var bgjstx=Entity.getX(victim),bgjsty=Entity.getY(victim),bgjstz=Entity.getZ(victim);
	if(attacker==getPlayerEnt())
	{
		var id=Entity.getEntityTypeId(victim);    //生物模型更换
		if(id!=84&&id!=65&&id!=83&&id!=66)
		{
			if(ji)
			{
				Entity.setRenderType(victim,6);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/chicken.png");
				}
			}
			if(niu)
			{
				Entity.setRenderType(victim,7);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/cow.png");
				}
			}
			if(zhu)
			{
				Entity.setRenderType(victim,8);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/pig.png");
				}
			}
			if(yang)
			{
				Entity.setRenderType(victim,9);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/sheep.png");
				}
			}
			if(zz)
			{
				Entity.setRenderType(victim,13);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/spider.png");
				}
			}
			if(js)
			{
				Entity.setRenderType(victim,11);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/zombie.png");
				}
			}
			if(kl)
			{
				Entity.setRenderType(victim,12);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/skeleton.png");
				}
			}
			if(klp)
			{
				Entity.setRenderType(victim,14);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/creeper.png");
				}
			}
			if(jszr)
			{
				Entity.setRenderType(victim,3);
				if(pf)
				{
					Entity.setMobSkin(victim,"mob/pigzombie.png");
				}
			}
			if(kc)
			{
				Entity.setRenderType(victim,21);
			}
		}
	}

}









