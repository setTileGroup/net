/*
 *			mcpe全能助手  by lzjyzq2
 *
 *
 *
 */


/*
	使用本js即代表同意以下声明：

		本ModPE Script的所有者为setTile工作室的@lzjyzq2。
		除此之外，setTile工作室的@高达朱朱、@709924470也参与了部分代码的编写工作，
		同时感谢收集资料的成员。
		未经所有者同意，禁止任何人转载或修改后二次发布本js的全部或部分代码。
		本js的最新版可以在百度settile吧找到：
		http://tieba.baidu.com/f?kw=settile
		欢迎加入我们工作室：QQ群号码：287474030，百度贴吧群号(仅供日常聊天或活动，请到QQ群交流讨论)：67401730，百度贴吧：settile。
*/




var ctx;              //菜单
var btnWindow=null;
var simpleGUI=null;
var nmenu=null;
var sGUI=null;
var nbutton=null;
var mainbutton=null;


var mbuttontime=0;    //主菜单按钮颜色


var menux=1,menuy=75;    //主菜单按钮位置
var tpopx=5,tpopy=5;     //信息面板按钮位置
var helperver=56;     //全能助手版本号，用于判断配置文件版本
var movemenu=true,showinfo=false,lockinfo=false,showheal=true,showscrshot=true,allowshake=true;
//是否允许拖动按钮，是否显示信息面板，是否锁定信息面板，是否显示生物血量，是否显示截屏按钮，允许长按时震动


var gamespeed=20;    //游戏速度
var warps=new Array();    //传送点坐标
var entities=new Array();    //存储实体的数组

var ride=false;     //是否准备骑乘生物
var riding=false,ridingAnimal=0;      //是否正在骑乘生物,正在骑乘的生物

var running=0;   //疾跑模式，0为行走，1为疾跑，2为潜行
var Xpos=0,Zpos=0,runi=1,Xdiff=0,Zdiff=0;  //疾跑的坐标记录


var wq=false;    //一键砍树
var xq=false;    //雪球传送


var helpmsg={
shuawupin:"      添加物品的三种方法：\n 1.点击[全部物品]，打开物品列表(加载物品列表需要稍等一会)。\n 2.输入物品的部分或全部名称(中文名)，点击[搜索]，查找物品。\n 3.点击[手动添加]，输入物品id、附加值与数量(创造模式无法修改数量)，点击[添加]按钮，点击[添加一组]按钮则会获得64个物品。\n\n      物品列表的使用方法：\n 1.物品列表包含物品名称、物品id和物品附加值，点击一项物品可获得该物品(创造模式会把该物品设置为手中物品)。\n 2.长按一项物品会弹出菜单，可以修改物品数量并添加，也可直接添加64个。",
shengcunguanli:""
}


var spawnOnTap=0,spawncount=1;   //点击方块生成实体的id(0为无)，数量
var mobs_map=[      //实体表
{id:10,name:"鸡",full:4,type:1},
{id:11,name:"牛",full:10,type:1},
{id:12,name:"猪",full:10,type:1},
{id:13,name:"羊",full:8,type:1},
{id:14,name:"狼",full:8,type:1},
{id:15,name:"村民",full:20,type:1},
{id:16,name:"哞菇",full:10,type:1},
{id:32,name:"僵尸",full:20,type:2},
{id:33,name:"爬行者",full:20,type:2},
{id:34,name:"骷髅",full:20,type:2},
{id:35,name:"蜘蛛",full:20,type:2},
{id:36,name:"僵尸猪人",full:20,type:2},
{id:37,name:"史莱姆",full:16,type:2},
{id:38,name:"末影人",full:40,type:2},
{id:39,name:"蠹虫",full:8,type:2},
{id:64,name:"掉落的物品",full:1,type:3},
{id:65,name:"激活的TNT",full:1,type:3},
{id:66,name:"下落的方块",full:1,type:3},
{id:80,name:"箭",full:1,type:3},
{id:81,name:"雪球",full:1,type:3},
{id:82,name:"鸡蛋",full:1,type:3},
{id:83,name:"画",full:1,type:3}
];





var mobtext1,mobtext2,mobhealbar;      //生物血量显示
var attackmobname,amobfullhealth,attackmobtime,attackmob;
function findMob(type)
{
	amobfullhealth=0;
	attackmobname=id2name(type);
	//attackmobname+="("+type+")";   //实体id显示
	amobfullhealth=id2fullhp(type);
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
					perr("全能助手配置文件比本js版本高"+"请去检查更新。");
				}
				else if(readver<helperver)   //依照不同版本进行读取
				{
					if(readver==50)
					{
						//全能助手v0.5.5
						//格式：是否允许拖动主菜单按钮(bool) 是否显示信息面板(bool) 是否锁定信息面板(bool) 是否显示生物血量(bool) 是否显示截屏按钮(bool) 是否允许长按时震动(bool) 
						movemenu=fos.read()==1?true:false;
						showinfo=fos.read()==1?true:false;
						lockinfo=fos.read()==1?true:false;
						showheal=fos.read()==1?true:false;
						showscrshot=fos.read()==1?true:false;
						allowshake=fos.read()==1?true:false;
						print("发现v0.5.5配置文件，已转换为新版本。");
					}
				}
			}
			fos.close();
		}
	}
	catch(err)
	{
		perr("无法读取配置文件",err);
	}

	ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
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
					var button = newColorButton();
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

	for(var i in btnbackgroundcode)
	{
		btnbackground.push(new android.graphics.drawable.BitmapDrawable(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(btnbackgroundcode[i],0),0,android.util.Base64.decode(btnbackgroundcode[i],0).length)));
	}

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
					nmenu=new android.widget.PopupWindow(layout,ctx.getWindowManager().getDefaultDisplay().getHeight()*0.38, ctx.getWindowManager().getDefaultDisplay().getHeight()*0.40);
					nmenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, tpopx, tpopy);
					nmenu.setTouchable(!lockinfo);
					nbutton=new android.widget.Button(ctx);
					nbutton.setTextSize(11);
					nbutton.setPadding(2,2,2,2);
					nbutton.setBackgroundColor(android.graphics.Color.argb(85,200,200,200));
					nbutton.setShadowLayer(1,0,0,android.graphics.Color.argb(50,255,255,255));
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
							var biome=Level.getBiomeName(Player.getX(),Player.getZ());

							if(nbutton!=null)
							{
								nbutton.setText("mc时间:"+Level.getTime()%19200+"\n模式:"+mcms+"\nx:"+wjx+"  y:"+wjy+"  z:"+wjz+
									"\n仰角:"+pitch1+"° 方位角:"+yaw1+"°"+"\n物品:"+Player.getCarriedItem()+":"+Player.getCarriedItemData()+
									"   "+Player.getCarriedItemCount()+"个\n脚下方块:"+tilea+":"+dataa+"\n"+
									biome+"\n"+
									(hs<10?"0":"")+hs+":"+(ms<10?"0":"")+ms+":"+(ss<10?"0":"")+ss+"  GMT+"+timezone+""
									);
								nbutton.setTextColor(android.graphics.Color.argb(255,175,250,220));
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
		function newColor(a,b,time,current)     //计算颜色
		{
			return a+parseInt((b-a)/time*current);
		}
		ctx.runOnUiThread(new java.lang.Runnable(
		{
			run: function()
			{
				new android.os.Handler().postDelayed(new java.lang.Runnable(
				{
					run: function()
					{
						if(mainbutton!=null)
						{
							var newr=0;
							var newg=0;
							var newb=0;
							if(mbuttontime<160)
								mbuttontime+=1;
							else
								mbuttontime=0;
							if(mbuttontime<80)
							{
								newr=newColor(90,220,80,mbuttontime);
								newg=newColor(220,150,80,mbuttontime);
								newb=newColor(230,240,80,mbuttontime);
							}
							else
							{
								newr=newColor(220,90,80,mbuttontime-80);
								newg=newColor(150,220,80,mbuttontime-80);
								newb=newColor(240,230,80,mbuttontime-80);
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
						openmainmenu();
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


function openmainmenu()    //主菜单
{
	try
	{
		function setImage(image,id)    //设置图片背景
		{
			//从文件读取 android.graphics.BitmapFactory.decodeFile("sdcard/games/com.mojang/r8.png");
			image.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logobtn[id][0],0),0,android.util.Base64.decode(logobtn[id][0],0).length));
			image.setOnTouchListener(new android.view.View.OnTouchListener()  
			{
				onTouch: function(v,e)
				{
					if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)   
					{
						image.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logobtn[id][1],0),0,android.util.Base64.decode(logobtn[id][1],0).length));
					}
					if(e.getAction()!=0)   
					{
						image.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(logobtn[id][0],0),0,android.util.Base64.decode(logobtn[id][0],0).length));
					}
					return false;
				}
			});
		}

		var menu=new android.widget.PopupWindow();
		menu.setFocusable(true);
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);

		var stitle=new android.widget.Button(ctx);
		stitle.setText("MCPE全能助手\n作者:  @lzjyzq2\n  setTile工作室");
		stitle.setTextSize(16);
		stitle.setTextColor(android.graphics.Color.argb(255,135,230,255));
		stitle.setBackgroundColor(android.graphics.Color.argb(0,255,255,255));
		stitle.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				aboutd();
			}
		}));
		layout.addView(stitle);


		var layout2 = new android.widget.LinearLayout(ctx);
		layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		layout2.setGravity(android.view.Gravity.CENTER_HORIZONTAL);
		layout.addView(layout2);
		var layoutrows=new Array();    //按钮列线性布局
		layoutrows.push(new android.widget.LinearLayout(ctx));
		layoutrows[0].setOrientation(android.widget.LinearLayout.VERTICAL);
		layout2.addView(layoutrows[0]);
		layoutrows.push(new android.widget.LinearLayout(ctx));
		layoutrows[1].setOrientation(android.widget.LinearLayout.VERTICAL);
		layout2.addView(layoutrows[1]);


		var imagebutton1 = new android.widget.ImageView(ctx);
		setImage(imagebutton1,0);
		imagebutton1.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				shengc();
			}
		});
		layoutrows[0].addView(imagebutton1);

		var imagebutton2 = new android.widget.ImageView(ctx);
		setImage(imagebutton2,1);
		imagebutton2.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				shuawupin();
			}
		});
		layoutrows[1].addView(imagebutton2);

		var imagebutton3 = new android.widget.ImageView(ctx);
		setImage(imagebutton3,2);
		imagebutton3.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				stgl();
			}
		});
		layoutrows[0].addView(imagebutton3);

		var imagebutton4 = new android.widget.ImageView(ctx);
		setImage(imagebutton4,3);
		imagebutton4.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				jna();
			}
		});
		layoutrows[1].addView(imagebutton4);

		var imagebutton5 = new android.widget.ImageView(ctx);
		setImage(imagebutton5,4);
		imagebutton5.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				aboutd();
			}
		});
		layoutrows[0].addView(imagebutton5);

		var imagebutton6 = new android.widget.ImageView(ctx);
		setImage(imagebutton6,5);
		imagebutton6.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: function()
			{
				settings();
			}
		});
		layoutrows[1].addView(imagebutton6);

		

		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.30);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(60,0,0,0)));
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
		var layout1 = new android.widget.LinearLayout(ctx);
		layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
		var scroll1=new android.widget.ScrollView(ctx);
		scroll1.addView(layout1);
		var dialog=new android.app.AlertDialog.Builder(ctx);
		dialog.setView(scroll1);
		dialog.setTitle("关于全能助手");


		var ts=new android.widget.TextView(ctx);
		ts.setTextSize(16);
		ts.setText(
			"                功能补充说明：\n"+
			"      全能助手内附信息显示、生物血量显示等功能。长按助手按钮后可以拖动。此版本全能助手对应0.8.x游戏。\n"+
			"      截屏：截取游戏屏幕并保存到 /sdcard/Pictures/Blocklauncher （不能截取GUI）。\n"+
			"      一键砍树：破坏树干上的木头方块，即可砍掉整棵树。\n"+
			"      雪球传送：传送到扔出的雪球掉落处。\n\n"+
			"点击\"检查更新\"可以查找最新版本。\n"+
			"本js的最新版也可以在百度settile吧找到。\n\n"+
			"欢迎加入我们的工作室。\n"+
			"QQ群号码：287474030，百度贴吧群号(仅供日常聊天或活动，请到QQ群交流讨论)：67401730。\n\n"+
			"有问题请@lzjyzq2。\n"
		);
		layout1.addView(ts);


		var layout2 = new android.widget.LinearLayout(ctx);
		layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		layout1.addView(layout2);
		var buttongk = new android.widget.Button(ctx);
		buttongk.setText("打开贴吧");
		buttongk.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: 	function(v)
			{
				var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, 
					android.net.Uri.parse("http://tieba.baidu.com/f?kw=settile"));
				intent.setClassName("com.android.browser", "com.android.browser.BrowserActivity");
				ctx.startActivity(intent);
			}
		});
		layout2.addView(buttongk);

		var buttongd = new android.widget.Button(ctx);
		buttongd.setText("加入qq群");
		buttongd.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: 	function(v)
			{
				var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, 
					android.net.Uri.parse("http://jq.qq.com/?_wv=1027&k=QOTHky"));
				intent.setClassName("com.android.browser", "com.android.browser.BrowserActivity");
				ctx.startActivity(intent);
				for(var i=0;i<2;i++)
				{
					print("\n如有提示，请允许qq打开该链接即可加群。");
				}
			}
		});
		layout2.addView(buttongd);

		dialog.setPositiveButton("检查更新",new android.content.DialogInterface.OnClickListener()
		{
			onClick:
			function(dia,w)
			{
				var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, 
					android.net.Uri.parse("http://pan.baidu.com/share/link?shareid=3292538765&uk=2051007628&third=0&dir=%2Fmcpe%E5%85%A8%E8%83%BD%E5%8A%A9%E6%89%8B&page=1"));
				intent.setClassName("com.android.browser", "com.android.browser.BrowserActivity");
				ctx.startActivity(intent);
				for(var i=0;i<4;i++)
				{
					print("\n当前版本为v0.6.0，如果找到更高版本，请点击该文件后点击\"普通下载\"。如果无法打开网页，请检查网络或到百度settile吧寻找最新版。");
				}
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
	}
	catch(err)
	{
		perr("无法打开关于对话框",err);
	}
}


function settings() 
{
	try{
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
		ts.setText("部分设置在重新进入关卡时生效，你的设置将会被保存到 /sdcard/games/com.mojang/全能助手设置.dat 。 ");
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
	}
	catch(err)
	{
		perr("无法打开设置对话框",err);
	}
}


function jna()    //游戏设置
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		createMenu(layout,1,"游戏设置","");


		var buttond=newColorButton();
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
								Level.setTime(0);
							}
							else if(which==1)
							{
								Level.setTime(4800);
							}
							else if(which==2)
							{
								Level.setTime(10200);
							}
							else if(which==3)
							{
								Level.setTime(14400);
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


		var buttonf=newColorButton();
		buttonf.setText("模式设置");
		buttonf.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				try
				{
					var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 2);
					addToArray(arr,0,["生存","创造"]);

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


		var buttosp=newColorButton();
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


		var buttoja=newColorButton();
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


		var buttoqa=newColorButton();
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


		var buttoq=newColorButton();
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




		
	}
	catch(err)
	{
		perr("无法打开游戏设置菜单 ",err);
	}
}


function shuawupin()    //刷物品
{
	try
	{
		function addbtn(id)   //添加物品按钮
		{
			var butt=new android.widget.TextView(ctx);
			butt.setTextSize(15);
			butt.setText(items_map[id].n+" ("+items_map[id].i+":"+items_map[id].d+")");
			butt.setOnClickListener(new android.view.View.OnClickListener()
			{
				onClick:function(viewarg)
				{
					addItem(items_map[id].i,1,items_map[id].d);
				}
			});
			butt.setOnLongClickListener(new android.view.View.OnLongClickListener()
			{
				onLongClick:function(v)
				{
					addItemAlertDialog(items_map[id].i,items_map[id].d);
					return true;
				}
			});
			butt.setBackgroundColor(android.graphics.Color.argb(80,220,220,220));
			butt.setOnTouchListener(new android.view.View.OnTouchListener()  
			{
				onTouch: function(v,e)
				{
					if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)   
					{
						butt.setBackgroundColor(android.graphics.Color.argb(120,100,100,100));  
					}
					if(e.getAction()!=0)   
					{
						butt.setBackgroundColor(android.graphics.Color.argb(80,220,220,220));  
					}
					return false;
				}
			});
			layout.addView(butt);
			btns.push(butt);
		}
		function removebtn()    //清除物品按钮
		{
			layout.removeView(buttona);
			layout.removeView(buttonf);
			for(var i in btns)
			{
				layout.removeView(btns[i]);
			}
			layout.removeView(text1);
			layout.removeView(buttonr);
		}
		function addItem(id,count,damage)
		{
			if(Level.getGameMode()==1)
			{
				Entity.setCarriedItem(getPlayerEnt(),id,1,damage);
			}
			else
			{
				Player.addItemInventory(id,count,damage);
			}
		}
		function addItemAlertDialog(id,damage)
		{
			try
				{
					var layout=new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var dialog=new android.app.AlertDialog.Builder(ctx);
					dialog.setView(scroll);
					dialog.setTitle("添加物品");


					var text1=new android.widget.TextView(ctx);
					text1.setText("物品id:");
					layout.addView(text1);

					var edit1=new android.widget.EditText(ctx);
					edit1.setHint("请输入物品id");
					edit1.setText(id.toString());
					edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout.addView(edit1);


					var text3=new android.widget.TextView(ctx);
					text3.setText("物品附加值:");
					layout.addView(text3);

					var edit3=new android.widget.EditText(ctx);
					edit3.setHint("请输入物品附加值");
					edit3.setText(damage.toString());
					edit3.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout.addView(edit3);


					var text2=new android.widget.TextView(ctx);
					text2.setText("物品数量:");
					layout.addView(text2);

					var edit2=new android.widget.EditText(ctx);
					edit2.setHint("请输入物品数量");
					edit2.setText("1");
					edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout.addView(edit2);


					dialog.setNegativeButton("添加",new android.content.DialogInterface.OnClickListener()
					{
						onClick:
						function(dia,w)
						{
							addItem(edit1.getText(),edit2.getText(),edit3.getText());
						}
					});
					dialog.setNeutralButton("添加一组",new android.content.DialogInterface.OnClickListener()
					{
						onClick:
						function(dia,w)
						{
							addItem(edit1.getText(),64,edit3.getText());
						}
					});
					dialog.setPositiveButton("取消",new android.content.DialogInterface.OnClickListener()
					{
						onClick:
						function(dia,w)
						{
						}
					});
					alertdialog1=dialog.create();
					alertdialog1.show();
				}
				catch(err)
				{
					perr("无法打开添加物品对话框",err);
				}
		}



		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		createMenu(layout,1,"刷物品",helpmsg.shuawupin);


		var btns=new Array();   //用于存储物品列表的按钮

		var layout1=new android.widget.LinearLayout(ctx);
		layout1.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
		layout.addView(layout1);

		var edit1 = new android.widget.EditText(ctx);
		edit1.setHint("输入物品名");
		edit1.setTextSize(13);
		edit1.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
		layout1.addView(edit1);

		var buttono=new android.widget.TextView(ctx);
		buttono.setText(" 搜索");
		buttono.setTextSize(15);
		buttono.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				var str1=edit1.getText();
				var number=0;
				if(str1!="")
				{
					removebtn();
					layout.addView(buttonr);
					layout.addView(text1);
					for(var i in items_map)   //在物品表中搜索
					{
						if(items_map[i].n.indexOf(str1)>-1)
						{
							number++;
							addbtn(i);
						}
					}
					if(number>0)
					{
						text1.setText("共找到"+number+"个物品。");
					}
					else
					{
						text1.setText("没有找到符合条件的物品。");
					}
				}
			}
		}));
		layout1.addView(buttono);


		var text1=new android.widget.TextView(ctx);
		text1.setTextSize(17);


		var buttona=newColorButton();
		buttona.setText("全部物品");
		buttona.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				var number=0;
				removebtn();
				layout.addView(buttonr);
				layout.addView(text1);
				for(var i in items_map)
				{
					number++;
					addbtn(i);
				}
				text1.setText("共有"+number+"个物品。");
			}
		}));
		layout.addView(buttona);


		var buttonf=newColorButton();
		buttonf.setText("手动添加");
		buttonf.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				addItemAlertDialog(0,0);
			}
		}));
		layout.addView(buttonf);


		var buttonr=newColorButton();
		buttonr.setText("返回");
		buttonr.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				removebtn();
				layout.addView(buttona);
				layout.addView(buttonf);
			}
		}));




		
	}
	catch(err)
	{
		perr("无法打开刷物品菜单 ",err);
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
			var butt=newColorButton();
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

		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		createMenu(layout,2,"传送","");

		var btns=new Array();         //存储按钮的数组

		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("   by @2639439\n长按传送点按钮删除对应传送点。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);

		var buttono=newColorButton();
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
		


	}
	catch(err)
	{
		perr("无法打开传送菜单",err);
	}
}


function shengc()    //生存管理
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		createMenu(layout,1,"生存管理","");

		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("随机抽奖：随机获得物品。\n盔甲修复：修复身上盔甲耐久。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);
		

		var buttod=newColorButton();
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


		var buttos=newColorButton();
		buttos.setText("保留物品自杀");
		buttos.setTextSize(16);
		buttos.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				Entity.setHealth(getPlayerEnt(),0);
			}
		}));
		layout.addView(buttos);


		var buttot=newColorButton();
		buttot.setText("传送");
		buttot.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				cs();
			}
		}));
		layout.addView(buttot);



		var buttonvv=newColorButton();
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


		var buttoa=newColorButton();
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


		var tbutton2 = newColorButton(); 
		tbutton2.setText(wq?"一键砍树 开":"一键砍树");  
		tbutton2.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick:function(viewarg)
			{
				wq=!wq;
				tbutton2.setText(wq?"一键砍树 开":"一键砍树 关"); 
			}
		});
		layout.addView(tbutton2);


		var tbutton4 = newColorButton(); 
		tbutton4.setText(xq?"雪球传送 开":"雪球传送");   
		tbutton4.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick:function(viewarg)
			{
				xq=!xq;
				tbutton4.setText(xq?"雪球传送 开":"雪球传送 关");    
			}
		});
		layout.addView(tbutton4);		
		



	}
	catch(err)
	{
		perr("无法打开杂项功能菜单",err);
	}
}


function stgl()      //实体管理
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		var textParams=new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		createMenu(layout,1,"实体管理","");


		var btns=new Array();         //存储按钮的数组


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("   by @lzjyzq2\n         @2639439\n生物骑乘：点击生物骑乘上去，生物会跟随玩家方向移动。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);


		var buttonoe=newColorButton();
		buttonoe.setText("实体筛选");
		buttonoe.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				stsx();
			}
		}));
		layout.addView(buttonoe);

		
		var buttono=newColorButton();
		buttono.setText("生成实体");
		buttono.setOnClickListener(new android.view.View.OnClickListener(
		{
			onClick:function(viewarg)
			{
				if(spawnOnTap!=0)
				{
					spawnOnTap=0;
					print("取消生成实体。");
				}

				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);
					var dialog=new android.app.AlertDialog.Builder(ctx);
					dialog.setView(scroll);
					dialog.setTitle("生成实体");

					var spinner1=new android.widget.Spinner(ctx);
					var str=new Array();
					for(var i in mobs_map)
					{
						if(mobs_map[i].type!=3)
						{
							str.push(mobs_map[i].name);
						}
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


					dialog.setPositiveButton("确认",new android.content.DialogInterface.OnClickListener()
					{
						onClick:
						function(dia,w)
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
								print("请点击方块生成实体，再次点击本按钮取消操作。");
							}
						}
					});
					alertdialog1=dialog.create();
					alertdialog1.show();
				}
				catch(err)
				{
					perr("无法打开生成实体对话框",err);
				}
			}
		}));
		layout.addView(buttono);


		var buttonr=newColorButton();
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

		

		

	}
	catch(err)
	{
		perr("无法打开实体管理菜单",err);
	}
}


function stsx()     //实体筛选
{
	try
	{
		var layout=new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);

		createMenu(layout,2,"实体筛选","");


		var stitle1=new android.widget.TextView(ctx);
		stitle1.setText("设置筛选条件后，可以筛选出符合条件的实体。");
		stitle1.setTextSize(14);
		stitle1.setTextColor(android.graphics.Color.argb(255,210,245,255));
		layout.addView(stitle1);


		var kinds=new Array();    //筛选实体种类
		var kindch=new Array();   //实体种类复选框
		for(var i in mobs_map)
		{
			kinds.push(true);
		}
		var buttonkf=newColorButton();
		buttonkf.setText("按条件筛选");
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
							var str=id2name(entid1)+"    x:"+Entity.getX(mob).toFixed(0)+"  y:"+Entity.getY(mob).toFixed(0)+"  z:"+Entity.getZ(mob).toFixed(0);
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
		editpx1.setText(Math.floor(Player.getX()-10).toString());
		editpx1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpx.addView(editpx1);
		var stitlepx2=new android.widget.TextView(ctx);
		stitlepx2.setText("~");
		stitlepx2.setTextSize(14);
		layoutpx.addView(stitlepx2);
		var editpx2 = new android.widget.EditText(ctx);
		editpx2.setHint("最高");
		editpx2.setTextSize(14);
		editpx2.setText(Math.floor(Player.getX()+10).toString());
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
		editpy1.setText(Math.floor(Player.getY()-10).toString());
		editpy1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpy.addView(editpy1);
		var stitlepy2=new android.widget.TextView(ctx);
		stitlepy2.setText("~");
		stitlepy2.setTextSize(14);
		layoutpy.addView(stitlepy2);
		var editpy2 = new android.widget.EditText(ctx);
		editpy2.setHint("最高");
		editpy2.setTextSize(14);
		editpy2.setText(Math.floor(Player.getY()+10).toString());
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
		editpz1.setText(Math.floor(Player.getZ()-10).toString());
		editpz1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layoutpz.addView(editpz1);
		var stitlepz2=new android.widget.TextView(ctx);
		stitlepz2.setText("~");
		stitlepz2.setTextSize(14);
		layoutpz.addView(stitlepz2);
		var editpz2 = new android.widget.EditText(ctx);
		editpz2.setHint("最高");
		editpz2.setTextSize(14);
		editpz2.setText(Math.floor(Player.getZ()+10).toString());
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
				
}			}
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



	}
	catch(err)
	{
		perr("无法打开实体筛选菜单",err);
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


function createMenu(layout,level,name,msg)    //生成菜单
{
	try{
		var menu=new android.widget.PopupWindow(layout, dip2px(ctx,85 ), dip2px(ctx, 40));
		menu.setFocusable(true);

		var title=new android.widget.TextView(ctx);
		title.setText(name);
		title.setTextSize(18);
		title.setTextColor(android.graphics.Color.argb(255,135,230,255));
		title.setOnClickListener(new android.view.View.OnClickListener()
		{
			onClick: 	function(v)
			{
				try
				{
					var layout = new android.widget.LinearLayout(ctx);
					layout.setOrientation(android.widget.LinearLayout.VERTICAL);
					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout);
					var dialog=new android.app.AlertDialog.Builder(ctx);
					dialog.setView(scroll);
					dialog.setTitle("功能说明："+name);

					var text=new android.widget.TextView(ctx);
					text.setTextSize(15);
					text.setText(msg);
					layout.addView(text);

					dialog.setPositiveButton("关闭",new android.content.DialogInterface.OnClickListener()
					{
						onClick:
						function(dia,w)
						{
						}
					});
					alertdialog=dialog.create();
					alertdialog.show();
				}
				catch(err)
				{
					perr("无法打开功能说明对话框",err);
				}
			}
		});
		title.setOnTouchListener(new android.view.View.OnTouchListener()  
			{
				onTouch: function(v,e)
				{
					if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)   
					{
						title.setBackgroundColor(android.graphics.Color.argb(60,235,255,255));  
					}
					if(e.getAction()!=0)   
					{
						title.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));  
					}
					return false;
				}
			});
		layout.addView(title);

		var mlayout=makeMenu(ctx,menu,layout);
		menu.setContentView(mlayout);
		menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()*0.25);
		menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());

		if(level==1)
		{
			menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(100,0,0,0)));
			menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.30,0)
		}
		else if(level==2)
		{
			menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(140,0,0,0)));
			menu.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP,ctx.getWindowManager().getDefaultDisplay().getWidth()*0.55,0);
		}
	}
	catch(err)
	{
		perr("无法打开"+name+"菜单 ",err);
	}
}


function newColorButton()    //设置按钮背景图
{
	var btn=new android.widget.Button(ctx);
	btn.setBackgroundDrawable(btnbackground[0]);  
	btn.setOnTouchListener(new android.view.View.OnTouchListener()  
	{
onTouch: function(v,e)
		{
			if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)   
			{
				btn.setBackgroundDrawable(btnbackground[1]);  
			}
			if(e.getAction()!=0)   
			{
				btn.setBackgroundDrawable(btnbackground[0]);  
			}
			return false;
		}
	});
	return btn;
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
	return "实体";
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
					nmenu.dismiss();
					nmenu=null;
					nbutton=null;
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
		// (new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/我的路径/dummy.dat")).getParentFile().mkdirs(); //dummy.dat并不会被创建，只会创建一个路径
		var fos=new java.io.FileOutputStream(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/全能助手设置.dat");   //这个路径一定存在，所以不用创建
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
	btnbackground=new Array();   //按钮背景色

}


function modTick()
{
	if(showheal&&attackmobtime!=-1)     //生物血量显示
	{
		attackmobtime-=1;
		if(attackmobtime%20==0)
		{
			health=Entity.getHealth(attackmob);
			if(health<=0&&attackmobtime>=0)
			{
				health=0;
				attackmobtime=-40;
			}
			try
			{
				ctx.runOnUiThread(new java.lang.Runnable(
				{
run: 				function()
					{	
						mobhealbar.setVisibility(1);
						if(attackmobname!="实体") 
						{
							mobhealbar.setMax(amobfullhealth);
							mobhealbar.setProgress(health);
							mobtext1.setText(attackmobname);
							mobtext2.setText(health+"/"+amobfullhealth);
						}
						else 
						{
							mobhealbar.setMax(1);
							mobhealbar.setProgress(health?1:0);
							mobtext1.setText("实体 id:"+Entity.getEntityTypeId(attackmob));
							mobtext2.setText(""+health);
						}

					}	
				}));
			}
			catch(err)
			{
				perr("无法更新生物信息",err);	
			}
		}
		if(attackmobtime==0||attackmobtime==-100)
		{
			attackmobtime=-1;
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

	if(fk==true)           //方块复制
	{
		preventDefault();
		Level.dropItem(x,y,z,0,blockid,1,blockDamage);
	}


}


function destroyBlock(x,y,z,side)
{
	if(wq==true&& (Level.getTile(x,y,z)==17||Level.getTile(x,y,z)==162) )      //一键砍树
	{
		var i=0,j=0,k=0,v=0;
		var same=false;     //是否重复
		var lastpos=new Array();    //存储被弹出的元素
		var woodblocks=new Array();    //存储木头方块
		woodblocks.push([x,y,z]);
		while(woodblocks.length!=0)
		{
			lastpos=woodblocks.pop();
			Level.destroyBlock(lastpos[0],lastpos[1],lastpos[2],1);
			for(i=-1;i<=1; i++)
			{
				for(j=-1;j<=1; j++)
				{
					for(k=-1;k<=1; k++)
					{
						if(Level.getTile(lastpos[0]+i,lastpos[1]+j,lastpos[2]+k)==17||Level.getTile(lastpos[0]+i,lastpos[1]+j,lastpos[2]+k)==162)   //是木头方块则加入数组
						{
							same=false;
							for(v in woodblocks)
							{
								if(woodblocks[v][0]==lastpos[0]+i&&woodblocks[v][1]==lastpos[1]+j&&woodblocks[v][2]==lastpos[2]+k)   //该方块重复
									same=true;
							}
							if(!same)
							{
								woodblocks.push([lastpos[0]+i,lastpos[1]+j,lastpos[2]+k]);
							}
						}
					}
				}
			}
		}	
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
		attackmobtime=201;
		attackmob=victim;
	}


	if(ride)
	{
		Entity.rideAnimal(attacker, victim);
		riding = true;
		ridingAnimal = victim;
		ride = false;
	}



}







//物品表(经过压缩)
var items_map=eval(function(p,a,c,k,e,r){e=function(c){return c.toString(36)};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[a-ce-hj-mo-v]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('[{n:"石头",i:1,d:0},{n:"花岗岩",i:1,d:1},{n:"磨制花岗岩",i:1,d:2},{n:"闪长岩",i:1,d:3},{n:"磨制闪长岩",i:1,d:4},{n:"安山岩",i:1,d:5},{n:"磨制安山岩",i:1,d:6},{n:"草方块",i:2,d:0},{n:"泥土",i:3,d:0},{n:"圆石",i:4,d:0},{n:"橡木木板",i:5,d:0},{n:"云杉木板",i:5,d:1},{n:"桦木木板",i:5,d:2},{n:"丛林木板",i:5,d:3},{n:"金合欢木板",i:5,d:4},{n:"深色橡木木板",i:5,d:5},{n:"橡树树苗",i:6,d:0},{n:"云杉树苗",i:6,d:1},{n:"白桦树苗",i:6,d:2},{n:"丛林树苗",i:6,d:3},{n:"金合树苗",i:6,d:4},{n:"深色橡树树苗",i:6,d:5},{n:"基岩",i:7,d:0},{n:"沙子",i:12,d:0},{n:"红沙",i:12,d:1},{n:"砂砾",i:13,d:0},{n:"金矿石",i:14,d:0},{n:"铁矿石",i:15,d:0},{n:"煤矿石",i:16,d:0},{n:"橡木",i:17,d:0},{n:"云杉木",i:17,d:1},{n:"桦木",i:17,d:2},{n:"丛林木",i:17,d:3},{n:"橡树树叶",i:18,d:0},{n:"云杉树叶",i:18,d:1},{n:"白桦树叶",i:18,d:2},{n:"丛林树叶",i:18,d:3},{n:"玻璃",i:20,d:0},{n:"青金石矿石",i:21,d:0},{n:"青金石块",i:22,d:0},{n:"沙石",i:24,d:0},{n:"錾制沙石",i:24,d:1},{n:"平滑沙石",i:24,d:2},{n:"动力铁轨",i:27,d:0},{n:"蜘蛛网",i:30,d:0},{n:"草丛",i:31,d:1},{n:"蕨",i:31,d:2},{n:"枯死的灌木",i:32,d:0},{n:"白色羊毛",i:35,d:0},{n:"橙色羊毛",i:35,d:1},{n:"品红色羊毛",i:35,d:2},{n:"淡蓝色羊毛",i:35,d:3},{n:"黄色羊毛",i:35,d:4},{n:"黄绿色羊毛",i:35,d:5},{n:"粉红色羊毛",i:35,d:6},{n:"灰色羊毛",i:35,d:7},{n:"淡灰色羊毛",i:35,d:8},{n:"青色羊毛",i:35,d:9},{n:"紫色羊毛",i:35,d:10},{n:"蓝色羊毛",i:35,d:11},{n:"棕色羊毛",i:35,d:12},{n:"绿色羊毛",i:35,d:13},{n:"红色羊毛",i:35,d:14},{n:"黑色羊毛",i:35,d:15},{n:"罂粟",i:38,d:0},{n:"兰花",i:38,d:1},{n:"绒球葱",i:38,d:2},{n:"茜草花",i:38,d:3},{n:"红色郁金香",i:38,d:4},{n:"橙色郁金香",i:38,d:5},{n:"白色郁金香",i:38,d:6},{n:"粉红色郁金香",i:38,d:7},{n:"法西兰菊",i:38,d:8},{n:"棕蘑菇",i:39,d:0},{n:"红蘑菇",i:40,d:0},{n:"金块",i:41,d:0},{n:"铁块",i:42,d:0},{n:"双石台阶",i:f,d:0},{n:"双沙石台阶",i:f,d:1},{n:"双圆石台阶",i:f,d:3},{n:"双砖块台阶",i:f,d:4},{n:"双石砖台阶",i:f,d:5},{n:"双石英台阶",i:f,d:6},{n:"石台阶",i:g,d:0},{n:"沙石台阶",i:g,d:1},{n:"圆石台阶",i:g,d:3},{n:"砖块台阶",i:g,d:4},{n:"石砖台阶",i:g,d:5},{n:"石英台阶",i:g,d:6},{n:"砖块",i:45,d:0},{n:"TNT",i:46,d:0},{n:"书架",i:47,d:0},{n:"苔石",i:48,d:0},{n:"黑曜石",i:49,d:0},{n:"火把",i:50,d:0},{n:"刷怪笼",i:52,d:0},{n:"橡木楼梯",i:53,d:0},{n:"箱子",i:54,d:0},{n:"钻石矿石",i:56,d:0},{n:"钻石块",i:57,d:0},{n:"工作台",i:58,d:0},{n:"熔炉",i:61,d:0},{n:"梯子",i:65,d:0},{n:"铁轨",i:66,d:0},{n:"圆石楼梯",i:67,d:0},{n:"红石矿石",i:73,d:0},{n:"雪",i:78,d:0},{n:"冰",i:79,d:0},{n:"雪块",i:80,d:0},{n:"仙人掌",i:81,d:0},{n:"粘土块",i:82,d:0},{n:"橡木栅栏",i:h,d:0},{n:"云杉木栅栏",i:h,d:1},{n:"白桦木栅栏",i:h,d:2},{n:"丛林木栅栏",i:h,d:3},{n:"金合欢栅栏",i:h,d:4},{n:"深色橡木栅栏",i:h,d:5},{n:"南瓜",i:86,d:0},{n:"地狱岩",i:87,d:0},{n:"荧石",i:89,d:0},{n:"南瓜灯",i:91,d:6},{n:"陷阱门",i:96,d:0},{n:"石砖",i:m,d:0},{n:"苔石砖",i:m,d:1},{n:"裂石砖",i:m,d:2},{n:"錾制石砖",i:m,d:3},{n:"棕色巨型蘑菇(心)",i:p,d:0},{n:"棕色巨型蘑菇(梗)",i:p,d:10},{n:"棕色巨型蘑菇(盖)",i:p,d:14},{n:"红色巨型蘑菇(心)",i:q,d:0},{n:"红色巨型蘑菇(梗)",i:q,d:10},{n:"红色巨型蘑菇(盖)",i:q,d:14},{n:"玻璃板",i:102,d:0},{n:"西瓜",i:103,d:0},{n:"藤蔓",i:106,d:0},{n:"橡木栅栏门",i:107,d:0},{n:"砖块楼梯",i:108,d:0},{n:"石砖楼梯",i:109,d:0},{n:"菌丝",i:110,d:0},{n:"睡莲",i:111,d:0},{n:"地狱砖块",i:112,d:0},{n:"地狱砖楼梯",i:114,d:0},{n:"末地传送门框架",i:120,d:0},{n:"末地石",i:121,d:0},{n:"沙石楼梯",i:128,d:0},{n:"绿宝石矿石",i:129,d:0},{n:"绿宝石块",i:133,d:0},{n:"云杉楼梯",i:134,d:0},{n:"桦木楼梯",i:135,d:0},{n:"丛林楼梯",i:136,d:0},{n:"圆石墙",i:s,d:0},{n:"苔石墙",i:s,d:1},{n:"石英块",i:r,d:0},{n:"錾制石英块",i:r,d:1},{n:"竖纹石英块",i:r,d:2},{n:"石英楼梯",i:156,d:0},{n:"双橡木台阶",i:j,d:0},{n:"双云杉台阶",i:j,d:1},{n:"双桦木台阶",i:j,d:2},{n:"双丛林台阶",i:j,d:3},{n:"双金合欢台阶",i:j,d:4},{n:"双深色橡木台阶",i:j,d:5},{n:"橡木台阶",i:k,d:0},{n:"云杉台阶",i:k,d:1},{n:"桦木台阶",i:k,d:2},{n:"丛林台阶",i:k,d:3},{n:"金合欢台阶",i:k,d:4},{n:"深色橡木台阶",i:k,d:5},{n:"白色染色粘土",i:a,d:0},{n:"橙色染色粘土",i:a,d:1},{n:"品红色染色粘土",i:a,d:2},{n:"淡蓝色染色粘土",i:a,d:3},{n:"黄色染色粘土",i:a,d:4},{n:"黄绿色染色粘土",i:a,d:5},{n:"粉红色染色粘土",i:a,d:6},{n:"灰色染色粘土",i:a,d:7},{n:"淡灰色染色粘土",i:a,d:8},{n:"青色染色粘土",i:a,d:9},{n:"紫色染色粘土",i:a,d:10},{n:"蓝色染色粘土",i:a,d:11},{n:"棕色染色粘土",i:a,d:12},{n:"绿色染色粘土",i:a,d:13},{n:"红色染色粘土",i:a,d:14},{n:"黑色染色粘土",i:a,d:15},{n:"金合欢树叶",i:t,d:0},{n:"深色橡树树叶",i:t,d:1},{n:"金合欢木",i:u,d:0},{n:"深色橡木",i:u,d:1},{n:"金合欢楼梯",i:163,d:0},{n:"深色橡木楼梯",i:164,d:0},{n:"干草块",i:170,d:0},{n:"白色羊毛地毯",i:b,d:0},{n:"橙色羊毛地毯",i:b,d:1},{n:"品红色羊毛地毯",i:b,d:2},{n:"淡蓝色羊毛地毯",i:b,d:3},{n:"黄色羊毛地毯",i:b,d:4},{n:"黄绿色羊毛地毯",i:b,d:5},{n:"粉红色羊毛地毯",i:b,d:6},{n:"灰色羊毛地毯",i:b,d:7},{n:"淡灰色羊毛地毯",i:b,d:8},{n:"青色羊毛地毯",i:b,d:9},{n:"紫色羊毛地毯",i:b,d:10},{n:"蓝色羊毛地毯",i:b,d:11},{n:"棕色羊毛地毯",i:b,d:12},{n:"绿色羊毛地毯",i:b,d:13},{n:"红色羊毛地毯",i:b,d:14},{n:"黑色羊毛地毯",i:b,d:15},{n:"硬化粘土",i:172,d:0},{n:"煤块",i:173,d:0},{n:"浮冰",i:174,d:0},{n:"向日葵",i:l,d:0},{n:"欧丁香",i:l,d:1},{n:"双草丛",i:l,d:2},{n:"大型蕨",i:l,d:3},{n:"玫瑰丛",i:l,d:4},{n:"牡丹",i:l,d:5},{n:"云杉木栅栏门",i:183,d:0},{n:"白桦木栅栏门",i:184,d:0},{n:"丛林木栅栏门",i:185,d:0},{n:"深色橡木栅栏门",i:186,d:0},{n:"金合欢栅栏门",i:187,d:0},{n:"灰化土",i:243,d:0},{n:"石材切割机",i:245,d:0},{n:"发光的黑曜石",i:246,d:0},{n:"下界反应核",i:247,d:0},{n:"铁锹",i:256,d:0},{n:"铁镐",i:257,d:0},{n:"铁斧",i:258,d:0},{n:"打火石",i:259,d:0},{n:"苹果",i:260,d:0},{n:"弓",i:261,d:0},{n:"箭",i:262,d:0},{n:"煤炭",i:v,d:0},{n:"木炭",i:v,d:1},{n:"钻石",i:264,d:0},{n:"铁锭",i:265,d:0},{n:"金锭",i:266,d:0},{n:"铁剑",i:267,d:0},{n:"木剑",i:268,d:0},{n:"木锹",i:269,d:0},{n:"木镐",i:270,d:0},{n:"木斧",i:271,d:0},{n:"石剑",i:272,d:0},{n:"石锹",i:273,d:0},{n:"石镐",i:274,d:0},{n:"石斧",i:275,d:0},{n:"钻石剑",i:276,d:0},{n:"钻石锹",i:277,d:0},{n:"钻石镐",i:278,d:0},{n:"钻石斧",i:279,d:0},{n:"木棍",i:280,d:0},{n:"碗",i:281,d:0},{n:"蘑菇汤",i:282,d:0},{n:"金剑",i:283,d:0},{n:"金锹",i:284,d:0},{n:"金镐",i:285,d:0},{n:"金斧",i:286,d:0},{n:"蜘蛛丝",i:287,d:0},{n:"羽毛",i:288,d:0},{n:"火药",i:289,d:0},{n:"木锄",i:290,d:0},{n:"石锄",i:291,d:0},{n:"铁锄",i:292,d:0},{n:"钻石锄",i:293,d:0},{n:"金锄",i:294,d:0},{n:"小麦种子",i:295,d:0},{n:"小麦",i:296,d:0},{n:"面包",i:297,d:0},{n:"皮革帽子",i:298,d:0},{n:"皮革外套",i:299,d:0},{n:"皮革裤子",i:300,d:0},{n:"皮革鞋子",i:301,d:0},{n:"锁链头盔",i:302,d:0},{n:"锁链胸甲",i:303,d:0},{n:"锁链护腿",i:304,d:0},{n:"锁链靴子",i:305,d:0},{n:"铁头盔",i:306,d:0},{n:"铁胸甲",i:307,d:0},{n:"铁护腿",i:308,d:0},{n:"铁靴子",i:309,d:0},{n:"钻石头盔",i:310,d:0},{n:"钻石胸甲",i:311,d:0},{n:"钻石护腿",i:312,d:0},{n:"钻石靴子",i:313,d:0},{n:"金头盔",i:314,d:0},{n:"金胸甲",i:315,d:0},{n:"金护腿",i:316,d:0},{n:"金靴子",i:317,d:0},{n:"燧石",i:318,d:0},{n:"生猪排",i:319,d:0},{n:"熟猪排",i:320,d:0},{n:"画",i:321,d:0},{n:"告示牌",i:323,d:0},{n:"木门",i:324,d:0},{n:"牛奶桶",i:o,d:1},{n:"桶",i:o,d:0},{n:"水桶",i:o,d:8},{n:"岩浆桶",i:o,d:10},{n:"矿车",i:328,d:0},{n:"鞍",i:329,d:0},{n:"铁门",i:330,d:0},{n:"红石粉",i:331,d:0},{n:"雪球",i:332,d:0},{n:"皮革",i:334,d:0},{n:"红砖",i:336,d:0},{n:"粘土",i:337,d:0},{n:"甘蔗",i:338,d:0},{n:"纸",i:339,d:0},{n:"书",i:340,d:0},{n:"粘液球",i:341,d:0},{n:"鸡蛋",i:344,d:0},{n:"指南针",i:345,d:0},{n:"钟",i:347,d:0},{n:"荧石粉",i:348,d:0},{n:"墨囊",i:c,d:0},{n:"玫瑰红",i:c,d:1},{n:"仙人掌绿",i:c,d:2},{n:"可可豆",i:c,d:3},{n:"青金石",i:c,d:4},{n:"紫色染料",i:c,d:5},{n:"青色染料",i:c,d:6},{n:"淡灰色染料",i:c,d:7},{n:"灰色染料",i:c,d:8},{n:"粉色染料",i:c,d:9},{n:"黄绿色染料",i:c,d:10},{n:"蒲公英黄",i:c,d:11},{n:"淡蓝色染料",i:c,d:12},{n:"品红色染料",i:c,d:13},{n:"橙色染料",i:c,d:14},{n:"骨粉",i:c,d:15},{n:"骨头",i:352,d:0},{n:"糖",i:353,d:0},{n:"蛋糕",i:354,d:0},{n:"床",i:355,d:0},{n:"曲奇",i:357,d:0},{n:"剪刀",i:359,d:0},{n:"西瓜片",i:360,d:0},{n:"南瓜种子",i:361,d:0},{n:"西瓜种子",i:362,d:0},{n:"生牛排",i:363,d:0},{n:"熟牛排",i:364,d:0},{n:"生鸡肉",i:365,d:0},{n:"熟鸡肉",i:366,d:0},{n:"刷怪蛋(鸡)",i:e,d:10},{n:"刷怪蛋(牛)",i:e,d:11},{n:"刷怪蛋(猪)",i:e,d:12},{n:"刷怪蛋(羊)",i:e,d:13},{n:"刷怪蛋(狼)",i:e,d:14},{n:"刷怪蛋(村民)",i:e,d:15},{n:"刷怪蛋(哞菇)",i:e,d:16},{n:"刷怪蛋(僵尸)",i:e,d:32},{n:"刷怪蛋(爬行者)",i:e,d:33},{n:"刷怪蛋(骷髅)",i:e,d:34},{n:"刷怪蛋(蜘蛛)",i:e,d:35},{n:"刷怪蛋(僵尸猪人)",i:e,d:36},{n:"刷怪蛋(史莱姆)",i:e,d:37},{n:"刷怪蛋(末影人)",i:e,d:38},{n:"刷怪蛋(蠹虫)",i:e,d:39},{n:"绿宝石",i:388,d:0},{n:"胡萝卜",i:391,d:0},{n:"土豆",i:392,d:0},{n:"烤土豆",i:393,d:0},{n:"南瓜派",i:400,d:1},{n:"地狱砖",i:405,d:0},{n:"下界石英",i:406,d:0},{n:"甜菜根",i:457,d:0},{n:"甜菜种子",i:458,d:0},{n:"甜菜汤",i:459,d:0},{n:"流动的水*",i:8,d:0},{n:"静止的水*",i:9,d:0},{n:"流动的岩浆*",i:10,d:0},{n:"静止的岩浆*",i:11,d:0},{n:"床(方块)*",i:26,d:0},{n:"蕨(外观为草丛)*",i:31,d:0},{n:"木台阶(旧版)*",i:g,d:2},{n:"双木台阶(旧版)*",i:f,d:2},{n:"石台阶(旧版)*",i:g,d:7},{n:"双石台阶(旧版)*",i:f,d:7},{n:"火方块*",i:51,d:0},{n:"小麦庄稼*",i:59,d:0},{n:"耕地*",i:60,d:0},{n:"燃烧的熔炉*",i:62,d:0},{n:"告示牌(放在地上)*",i:63,d:0},{n:"木门(方块)*",i:64,d:0},{n:"告示牌(放在墙上)*",i:68,d:0},{n:"铁门(方块)*",i:71,d:0},{n:"发光的红石矿石*",i:74,d:0},{n:"甘蔗方块*",i:83,d:0},{n:"蛋糕方块*",i:92,d:0},{n:"隐形基岩*",i:95,d:0},{n:"南瓜梗*",i:104,d:0},{n:"西瓜梗*",i:105,d:0},{n:"可可果*",i:127,d:0},{n:"胡萝卜庄稼*",i:141,d:0},{n:"马铃薯庄稼*",i:142,d:0},{n:"甜菜庄稼*",i:244,d:0},{n:"游戏更新方块(1)*",i:248,d:0},{n:"游戏更新方块(2)*",i:249,d:0},{n:".name(技术方块)*",i:255,d:0}]',[],32,'||||||||||159|171|351||383|43|44|85||157|158|175|98||325|99|100|155|139|161|162|263'.split('|'),0,{}));

//base64常量
var btnbackgroundcode=["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"];
var btnbackground=new Array();   //按钮背景色
var logobtn=[
["R0lGODlhZABkAJEDAAKe6+73/XvF8////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFGRDVCQkE3OThERjExRTRBMTJDQkFEMjFFMUU3NkNFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFGRDVCQkE2OThERjExRTRBMTJDQkFEMjFFMUU3NkNFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNENUEzMTdERjk4RTQxMUFGRTFDRDc4OUM5RjQ5NDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgB5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWpVCDgTaxObCCrjXCPgoD52xOPi+UAwAwOO9bBNtgcfNB7dhQ+37Cnc4aFUhaXFihIQ4hoAic0t9ji9bdiSaU4mVKJ5niCmciwyUm4EtdWJEla+QmQhYoWqTlpylIIKgs4Wnv2euvmFzzLS9cWWjqcC0Vr1el6kloKrbM69fxia6i7u8B1TG0CfqncrXBtF/56Vr7MXLyU7pLF3i6OLOq9xK6+zk7JzVwCJfxmdILEAl++c0KwMfrSp4VCOfqAjKOR7tC8if87rO24+GKcNID9bHjcUQ+LK3p/RkoMKBCBkWNwcN2T5eXhkpNFUsq792ujvUzwyPjT5q+fRibNlLRytDQkzJgHuOBBFDXbUKIVrwSsqXNn03i6HAp1wtNp2ZRSS95IS3CYL6QqOC4c6KxlTZB1t3JlmDcpGL7R7FIEfA0ixBR0/T2BS+aLwoi53L4dS/bQSspv/P7Fm3fqNpyGD4NOLJqxp9RUZYxhbegQQrSY4+k4NgUyqVdZxRbdfcqKbuBchhPPXft48eTKkf9uPsY4dKbPb1m2aRC7OMsma6u8WcPlWdUlVULU/AmuNPGxzZ9XCd9mvbnzJaes/y8FXITsb+L//8/SffXJhp97lSCBWUaNoAcLfHvFB19nbuiFBz6W6HVHO2n9NyB5BpE24WLsXahYTcjwtOBT8SVDU33+cVjQI3JxiOBvnPVHHozBgAMHPz3qQqKB7J00G3gu+JIQf7Dd0+BeGMpYY1eOJSPUStoc9B9vARJiYpdRIrYdhBl9lwtMnBUm5oGxgQXjl6cVpiNC98WX4mCiWTijkCcmaB44fcLSY4sAvogfOaewJh2Ob6yT5oNxBKqZfYZq+UyEKCRqV2+MApOmpcIQOp8jmHqmqaagdigMkky6MGpbKpi6KTA7hrpNOHrAGWeMIyrkKIQg4kTne4hAMFqutkTF1qE6SqJSLIdxqMHGWqq+Kqyv1HTqqQTTRafttlJU4a1vW4RLHQXkvhPFuZ+lq253HbRbQw7wshDDAPNeWm+++u7Lb7/+/gtwwAIPHHABADs=","R0lGODlhZABkAJEDAO30+Hqv0AJ3sf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJBNkI2NDI0OThERjExRTQ4NDU0OUFDNEM1RDZEOUUwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJBNkI2NDIzOThERjExRTQ4NDU0OUFDNEM1RDZEOUUwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNENUEzMTdERjk4RTQxMUFGRTFDRDc4OUM5RjQ5NDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgJ5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWpNBDgTaxOLCCrjXCPAYD52xOPi2WAwAwOO9bBNtgcfNB7dhQ+37Cnc4aFUhaXFihIQ4hoAic0t9ji9bdiSaU4mVKJ5niCmciwyUm4EtdWJEla+SmQhYoWqbnYSokIOTs6eebm+urmF6y7INgWWjoMqpy5O9b5a5KaDEV7dRz9mGsoS6zAhf0SroIsWnwNl93JvHy0umSnDnzGMq1qXdSbLd3LfnLoDh8QfTPWdSPnz9w3IdBqpNt2KaGcc0DGFUwHkFI5hf8J6pi6CMlevYPeOgbph8VVFnrzZkAsicDIMYzcZHlhJHHiwiUoLeLZJ/KeMzL8CP57eYokzANTWjnKKE4poKFdyrzitq/dkndPoGor5DKnTpNNuzWMKnYH1y5mUUbNqmOtE0v0PrLYOJXilT/xLCJ8Iheer3RFpQatRrXrl0OO7B5Nq1ag4MNFG0tdKgNco1N9tDoJrKSzRpt48+4se7kmrNSmyVphnQIOUsR6m+o4NgU0qWVwx8bcDVw38DHCh1spblwK8uSfJTM/7vy58uicer+ynlIF2K3RwVJOCrllbNjSGHvJngL0tO/XU2JMCX97v7rzv8yfWR+Jc0vf8df/r7/Sff8d8t9i8SATGDYKnldIfO/Flx19hb3hD13BZISgZAUCOF5WGaVC2GEWQnOYXI24ZyB8yfjXT2EbGkXhMgXql5ho4rkg24uF2aFPjnGM6FSGib3EXlEtfOSVRrD0xZcsQtZ2WJE2PmYWi/O1R2GPizXy5GnStAffg7ggNSU/EKJYHWE6pieQlRxmKZuD7x31SzlAHshOggbat2d2PLrpFpwz/qUda8uxN9iZfW1HIIN8RlQeiik6cmhpwHySJJ2KoieMi2/iQN1jbxVa54svtUinC5WKlWmmZo7m6UGugkoLoAWCIeJl5ilKWi4QPogCBDWZiuqlMs42z4uoSQy7YRxqsNEWSxFtet4t1Dr7rHS5SaDttlt0yx0F4IYr7rhCRWFuM0mke8MP7NKQw7ssxDCAvMHSi2+++u7Lb7/+/gtwwAIDXAAAOw=="],
["R0lGODlhZABkAJEDAGTrGvL97afzhP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFEOTJBREM5OThERDExRTQ5RUE1OTRGMzZGREQzRjk3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFEOTJBREM4OThERDExRTQ5RUE1OTRGMzZGREQzRjk3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjE5MzU2MUIzMDcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgB5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTeZCrbc7XUmkQoC5LLZ7P36IM/xOTB2vwXqtWMphwP0rG25/rCEdkJG1yJneHVnhJhSONNotSjklojiRpMn2WD0x0JmE+k0CYTIBWBYeWP2RNqT93ZmCenJxEkZi3amE7fk2lMYSxdXOOuievTLQ7xrMmZSZnwImnyLSxd9gulcSyuNZR2Euc0dcJlN81ikzEPdW66C/EIexL7zrv6eUvmNol4fThy1PXr0nUOTJt6/HvZ2DBzHxxksWQm1DWQYUGAiTf+oJkbzg7DLwh0NeUVE9TEXwUseWVHJGOQiwVyPDJaL1o0kzFLmDuZKdRKay5E6Spq01PKhzJTDghbd+epkL1j7Ig7t6fSGUR0X9YkiCNRTr6w2tt7wKpUft6YuZ5KtYTZURJsda+qR5Y+oVqhAlE4LJuxgPxpx5cI7RjOo3rJ8ozYdfBMORbaQhzQGxnbev2EthRQ2vOcbyJ598lS2zEAMHHoS0bEc/dHzZcyhqxLlMrlaaimrSaMcCbtYq9nLxLoOvloR8XaA+UysqHw3b4oU66T4fPbn6U3Spwu3jnrBFejgXWAvP+U8+uHd17sHoP69bvHy38evL7s9fuv392P/1O/fF/3Nsw9S2/my3GtdnGKRJRfJFM+CEpIXngIOJeYMSqn4YZFvKyQ1CGMAvlDMgqA8M5VkpJW44Dn90GVegkJ9aM4zdpGTWCKLgbXXiC6wiJs5J941hy4hajjNgfDJ6FYsKCEJmBwaxoHWi2+tgF1X2DQ1JSheEtnlRom5RhiTDyIlZG/YpDnjkDriVMmRZfrYQnO7uPnMSkCtiaRExyi5JJ2fqPjGkwZdxec7E2ojoYj0rSLZlnrW6Bx1jyHpEVt4zfmoDcFIOiRYVAm1Jp+/ifQYqnCZ6QeobFIJGKm/zdgnlHNdiUKWkdYW6qFpYsWHO7deutaqgirUKq++f/laG4+0VlkrjFjKWAyR3Sz0YLbFygotp53OQA2wm2G74qdS/oZXpt5+i9gst7b17JBtqYsImTCwUYMxJ8m5EjSMVgRttzHiG2B0BBfMXhgIj1LFwgg27PA6GEScXxIUP9XBxY56oPHAI3R8XQwij0xyySafjHLKKq/McssOFAAAOw==","R0lGODlhZABkAJEDAEyxFPH47ZzSg////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY2MEUxRjVCOThERDExRTQ4NDU4QTU2NkNFMkNFMjU2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2MEUxRjVBOThERDExRTQ4NDU4QTU2NkNFMkNFMjU2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjE5MzU2MUIzMDcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgB5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTeZCrbc7XUmkQoC5LLZ7P36IM/xeQw/kwXqtWPpngMCdNa2XPewhHai15LXd3VnhJhi6NJotSjklojiRpMXINlgBMhCZhPpNAmEyAXQV3mT91Taoyn3xvrJ1Ekpi3amA7f02jMnSxfHZ/myevTLQ2x2MmZSZgwZmnyLSxftTJ1aO9MLZR2Eiam9Wc5X8xikzEP9zS2NfLy9Hi6OvodPnlIpraLeg92OfXreXXqTRoW8gPaCbBtnzlkshPHwUWloyqKmYf8To/1B02XhDoEDLXKb03ETvY+5ImLBCIRevpboDJqI1eoiAzwuT+ZSZRJas3z+bJAsaSnlQ5keawbVcZSXyV6x+FkcSu3pjag6VmrMVkjf0F5ajcLMmMjgxzRUCQkFCPUsrK/xVpF1+7ZoDa5dIz7zE+3nwbJ75c69SRhxS2Nwtxpe5rTnio0UTwrh27VP4pNJWe6qt7PNpn38FhrzLDluaCd3FY66hHozDcyZ95wGa7UyuNVOirl8zUW3r8dz3eEODlIRcWDBDE1M+IV2X5DC6wCQTkuY3kDLmaO0Dqb7su3gU2AvP+U8elfi16dv75497/jr1dPfveB+fPv6Qef/748ef96UBlt98KUSUhcHWUKPTK4lmKBq/91AkznD6JNPOfNUKBsK2KEUUijPtEVQMRFqo5dNQ8DnIDcuFsTHNjSlRZiKLnxoYhcijoaOMLrgZSNi5JnHIk0u3lUJIHAseRVhjcFQZIFOHRlKlT3y+AeNHA7pYZSFMKiSb9iEKVSG7yQZBzFc4hBlLlT+USZQY8IjUYprsjkfDc3J8SYKWF1JJ4JeJAShWXnOEAw2c44oFnUXPuoTIR2tiSNZc1qJWlhjzslZcI/qSGmRlpqJJZPmwHiqhXQFyuqKh74gpm2ktmplqpqpSiOkQhb26iGxAoqinyrdmohxubIaJBLtdKF0ZTfqeOWSsZoi2+F1tGX11lcmyZgoMpNGituNgtRgk7bdZGgZTorNgki4UI6byT9gAiRjnUmteqZsYQCoRhb8cuLvv6RUIfDABBeM38EI65TEwiN54LBjIETs6ggUKxtDxhpvzHHHHn8Mcsgij0xyAwUAADs="],
["R0lGODlhZABkAJEDAPj8/cbp85nZ6v///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJERDAwNTY4OThERDExRTRCNkNBOEMxQTgwOEU5QjA1IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJERDAwNTY3OThERDExRTRCNkNBOEMxQTgwOEU5QjA1IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEYyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgJ5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgRVpAIANaANT2uR5xYrH3K5LsgyP11kzDOJky9vuFVypnq/LddTjqSfH14fTAMa2lQcwSCjgILWWosbY+AgppiWJ1Zhi6aS4qMnpZ4i3GGYiJjrqU2qEqioQxnjF6ugqFJq6KRCbosvpmQtwAkope4ySuSQ8vLXXAqyJmbzTLKR4VY2sMlu8LHQdZDxDrCxdDIVbJEcD3mverc6gJFijq91dWyTeAxpfjgsvefMW1ENkQwumFe+orBuH8Ia2U7+22ejXgw3EQf8Ne2DkkYedRY8PRRbJZ2JLQQWf0PnjONJLyVwxAyqrOWRmLiPAOpKk15JnMYDhdAJB2WIbRVkuHQIFZNEnyn1MjAZpOi3RUqRHPm6skYgPVWZWv4LEWvSpFTpgBz7x+mohC4VLp8A9MiuQTyd38dB9hnNlAlso0Urp27LM2DqI0+hyy7gsIF6oKkk21aayZbVu1KQ0bPeyrS6NR78Vbfo059SbDbJmVfq1YASyR8WuHQRxTUp7Ux7r7dR1OdBMOaLVPDRm2OVILiNnAZnrr3ZzjAUiemv1P71DiUo/gWhReLqCFD7Dfu26vc/LZ4WFJ9CcZ8i7hrKv3+kh25vn+GT/Ub/JQAHi45KAp7hHX3qhsMXWVJtkkg2ExZGxBxngxXNdc6ud0wZ9FxIFDYf/UTiifxgeiCJ6OpXRIXafuTXRfsW5E8pfz9wHj4bCTScfftO49d9z5wXiGzwknkeXjiwxJFeO3YgXjzZS0iclFyoJ6Z6Rcyg5WFIGztWLYg8uiM53PqJgIGBJ5qcdN2FlZqWJu1hZY3TqMcnkNgoCOMaFTMn3GIxZtOfhQG8e2NA17U3S3oWwaCRXlY1SQtl1jNyVRzUWlmcogIxEktwZVk1CBqV1zahMqHMRGCKOLPyhj4W7DIomdmayF6ebDjYY54HcFNJMRD/KqUk127VqnHp8SkRQK3FIUXlcjVcClhQycUK4LLO4mfHFtodR4C1fVYRb1bjkphXFucFhoK4OP7QrEwjwvkHCvKTEgG+++u7Lb7/+/gtwwAIP3EABADs=","R0lGODlhZABkAJEDAPT3+HOjsK7J0P///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZFRjg4Mjk2OThERDExRTRCRTlFREJGM0Y4OEE2MDREIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZFRjg4Mjk1OThERDExRTRCRTlFREJGM0Y4OEE2MDREIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEYyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgF5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgRWpAIAVaAVT2uR5xYrH3K5LsgyP11kzDOJky9vuFVypnq/LddTjqSfH14fTAMa2lQcwSBjgILWWkteY8ggppiWJRelneLinyVnIkLYoZnKKciXq42mUpbUZgJkiy2lZtHiSmlrLiiuka6IoHOqSuQQcvBhL1gLQkodcpCxEXLyyqll8xdhTHUTsrQKtaqsK5Vp0TTM9W64yvgPeI14j3B2vLUTPM2ej6xy6dKSO2KvRDNsJd1TUWUOkoxuzWvJ09PMXCUi+hf8Vb1zcIS1Yx4YFlyjksTHAPn4O151EOYjht5a5Rt6LadMLzVyv+MicWRLPSx3wVrIManDoQhcTVSqdt5Pniy3x8ME78hHI02HdtjRNiTXqw6vREvncyiOrRrQswDIR+4rtQoHJ4BpRU7EZ1Slq72YJJDdIX4N6Y+V8i5TQRrpmBpcqY9SNYyV0GHeZvC7MMMt87ZZq04sQ5rWy3PYZzapu4tSUULMmuOB1ateyBXuu7YQ27rS3d4dd3badt58csx32eJvOMWym55J1mtOsdCS3Nb8Q2ByVnHeIugeinvhaoLNks+8xdV7iHK9en1cDLGiudExmub/jouY+OXilhdH/fa8LI+6k9Bd8pkC2CR2m2QILff+1BFoxym2kWSJ77IWXgXww+F0lYuGl3wqhcafcZueR4Yx2uzDTlXWdAKeSdlxYNoY5INp4k0phtLdZGQ8Cl4qPz2l3zl8uciVejVR5l1Az4MWWTY0qVuViV8zQ1eJ85e04Y4cvQtkWh8H1B00+JULHAmMcsuekh+FJ1x6cK8qI5pFOASbikNm1kpiBbMxp3WLncKllnkg2mYibYHKkJYv1yVhgJLRAB2eitZST5JlqSSOPM4JUqeGloe3pCFwZ0rffgAqdlZdVoMh3BjiKbIjqnJq0Wil7JuJjFix78anOQduIeWs0oQ5jDnx8SESAwqTL0UqlsbkaVta0yzLrW2NoZCtFFdyq9sW3iFEgLmzelgtUEugi18G6NeTgLgsxDBDvl/Pei2+++u7Lb7/+/gtwwPwWAAA7"],
["R0lGODlhZABkAJEDAP328PTMq+ugXP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMyOEFCOTAyOThERDExRTRBREQ1QTM5MTIwM0M1NzZCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMyOEFCOTAxOThERDExRTRBREQ1QTM5MTIwM0M1NzZCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUY5MzU2MUIzMDcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgJ5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTe5ngIB7Uzy7KYAAO8QIgWITQH1WtA2o9BPctl0V+PJb+9j2sWnB6fmdifn0yAVx/bGJTaI6HD0yHb4wtUYOTVpZNe26QJqd8mpaJQJ1zcjlnrV6bmqEyoFW8TYg4siG2Qb1MZrU0oYjHWaC+oa9JnJV3zjO0srxEVm6QZ1jBx2OZrNUDQNZL1bOLwTzSOuvqK3XpO+8z7b3gXcq80DunRfjvd8BhyQfvw2kdOFLt8NO1MYWrIEEIbCG9XODeSDItI8F//xdCC8uALXRokCw0WcYVHjyRUdKVrc8VHXSBYta3xc5sjgSiQTpVUa+KhbqZvwei4k9fKFIIzEyu1MUVOevnP7/FEx2iMpnJDDCG55ChUrO0Jd15jN2XUmTbHykpFTxcytJlpejZVExTTVKFIVlyrbonbtXVRjCO1xa05csiJRhXw6wZcNpro9Gv8KJehZRbCCFyDa9U+Pq6CBv7DV0ncv0yWWvTx6zZlG689aZtO2Yvt2rdO6X/HubWow8M+5hx8pbpzx7+RMljP/5vm5JOfS8QlX0ecvq+rRcFV9aCMO5aGw/5Y//5qn8MUCVr+lAYz9tYxIV7evj99+ouvfByX/S49fK6LZ59B9rxF4yFsqqRcddqothdSD/mmkAlPvecVXfo+FdR1kmRXYQj/3BJUdRE7RB5szB64SjUYJqliJSIZoyIJ9e20Fm4ExaueLN/d5WJ895EAI4zXWyAdkYhrix2GDKOqYyYGDYPQWQamQ0tRUEcWTR2QevuHlHvN5aCST5Syp335OtlOGlaGMAmaXcRoJjDk5oUciSz1B0qaKKtJXijX6VbnJd9fUiWiaAqRzz5ASRmKoge+JSeaXKcSH5zSMuiPkGpOSdeGG9J25R1p4ViNLOkcO6OkwfgHmX6uGSfopqEumOpGgA45KalU+GliqgiD6E6U9neq5nq4mflJ6qJj1MYtlsNM8GiGyg8Xnxj58woqWOzM2u1dqOSnF4h8oEmlrRn2AGCZpq/WF5q040PGQaHr9tEVI2H2K5FfZnorevPRWt1sEBBcMxsHNUaDwwgw3LEQSEFe2wcTQeGCxbCFk3FkOHKsZQ8gij0xyySafjHLKKq/M8gIFAAA7","R0lGODlhZABkAJEDAPbx7LF5RtO1nP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjczQjQ5NUM1OThERDExRTQ4QzhFQjczNjA4MDVGQzMxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjczQjQ5NUM0OThERDExRTQ4QzhFQjczNjA4MDVGQzMxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUY5MzU2MUIzMDcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgF5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTe5ngQC7Uzy7KYAAO8QIgWITQL1OtA2o9BPctl0V+PJb+9DyhXAFwen5nYn59Mwhai35eiY6HDk1kU4EwjX1vc0adRmSFYDaodo5VmUmWkjdnm6SMmpE/nKoOS6g6vphCq0KWTKRlvUmwu6GmQXyOV2VDzbfAsqHC30rINMaVoKBZssCySKsikedL0znLyil65zPgvOE4xn2W7zPlr+OSxuX4OPyR+QTWsI6dsB0IUdRpEuCTxja+C0W3wetXroIiENXf89ODqM98UbMJA25tE7gRGGyHAmeehydfCGxhkte9D6hZJkxpXyKgXhMlHYG47/eGIrFbMGUkc4hVIxqi6XyaDCzEEN90LWy3TZ3F21SU1Fwy1vFqZoiuWrvGPlgA5iy+aYCqppIx6RW4jaUlKhtBKVqTbXmEJdkPKtuIKZzpB2p1Al1YpmSsYLtKBlS5LZZMoKvHASYwhoQc2L7wW2zHZvp9NmRIueMjORmdiytdCuXasy7t1zWPOG7fv36sbCZd8u7iw48uTEl/tR7twa9OhPm889W5oN9QDPLlFN2oJgumCugWIvj75rd8SIBdVMfIiW2T2qUS693x6H0aBM3wb/un9RPfKV419+BDayRjrnHKYMgAA6hYdYkJiCFn74cYJPKXwFFKAmaMEBYYjuuaaMaAqu1NSBlZjnUCgWwncTN+kRhF4KxZCyh32qTcSHYeYVshBejzRo4Yu9WVeRfyROWBgiTWUi42ZnpXROHhqiYKAyWN7xHZdFDlWklkioJUqKw0C25R5lWdkgjuOsiF47C+Z4DGnIzJdjfu5Z9CZ5GvaI5pjW/dKPhQke1OM8+ix6JpzlyWnUIHqYuQ6egaY5JH1zrXgIObJcU+akkcSUaEGItZiXe6HAGOankZZREUx+ljGRmyPSp2I7NIJoCWErrAerl4f2CVp8ZuWqo556cn35643xacZrW/mhSSQ1Ako6yJsvnFhMqVHiiSij7bklpiZhnhtJBNpOqko1LnwWk5BjsONWvYrdqx8d20mRxb68UOAvE1UE3M3ABFcXxcF1JaFwUR00zNnDEAs6wsSKxIBxxhpvzHHHHn8Mcsgij9xAAQA7"],
["R0lGODlhZABkAJEDAPOZmf3v7+tFRf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNGNDI1RjFFOThERDExRTRBODIyRDg3REU2QjE0NTkwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNGNDI1RjFEOThERDExRTRBODIyRDg3REU2QjE0NTkwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgJ5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTe5ngDcQADw9X4BWoFECx6vut9r5Arm1rzkKWSa5tGlD3y7F8fXIOVlVOjk8HRoGIA4uATm9HeUqBRJw1bnMllUecS5KQaqcgn1aFT6kiY6M9rjWdRYsypGI9t5KpSqKuqq4qsDG3Q7yzpnyoBKbAVsIwyoCRf9mgvUjMKVvbOLVQ09Q1urs9ydHGvbK25DvvOsd5OuM12+gHoTPo5rLsTeEn+vr965daLmveh3w90OhKR6GdwUUIGhhw2N2eDWzhsPOf/oLM6i6EzjNoYoHI4DWUPhQky9VkZMcARjCnzwUKYU+Y6XR1uUcI7UWfCaAJkZ9008mO4a0aICY5IcWtCWzZBGlUmaSrWpkkWxngbzCWQpwScqdQltEYgs2CB5Fp6lJxGOGnRYqVWVkslgpjJln9D6W1dI3zKEkawtjNjM4cSEBzNuvPixm8iS7VCurPYuZsSONwvS7JnvZXAsAmvpPGdU29CoWXIVoO5E0tmvg7R2rWk1NtrpTLu4jTYbHTZjtKGtvQQ4C95JXejOrJVtNuHFp+ucDFqZ6eeOsnelOH26mPDWXyJApY06GfLEmZs0f4CR+5bs85Lv6f2i8PZxwh+A90rFaMXscRFyTAjYkYGlKYhMdJ8UEtt1ViiH1C3juYadg2xdKBuBzjEIX3xF0LJCQdOI9xZcGo7D4Ro7heNbVgh2OBU3f034RmiQ5agjjln0+NmPQHZHwZDJYWBkg0gmqWISTCYUwpMzxDCAlCtQiWWWWm7JZZdefglmmGKGWQAAOw==","R0lGODlhZABkAJEDAPjt7dKSkrE0NP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc4QjM1ODNGOThERDExRTRCNDVGRTJERDUwRDk4RjRCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc4QjM1ODNFOThERDExRTRCNDVGRTJERDUwRDk4RjRCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgJ5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZWplTe5ngJcgDfwBXC1AokWLA6ouGi1NXIFj2nf92OK5tWfd6kc+MfXIOVlVOjk8ASmdMg0uLS4JLaUqBT40jX5ogn1eMS56bXXEtnJYAlQgyaauulWVGlosypKdxQrVDpDC9rS24Mb1DrLajMcFNyja/W7k8wzd/ZK5Sk87cIWTQxbDUjD22jMfVp07MtafGOO1d2z7oL+jj2+YHSNia4jf/O8s78ST8c9Z+30qGM1EB49BbJUoUvoa2ECQxBT8BL4r0Y/gf8VUQS8oQ1YQYN0EOrrSGPjyV359JmqZw/lRXUoU47U03GmuJcMj4RcE++Sr5o2yX3qGG8Ui2XIbkLLKIBWzWYijfqEutKR1U9Ya4TjOVFR11CCtqIiukKoVph+vnqlKhHBGbfn0LIz2zZN2jZkVDrJJCbwF7tN8ZI57MIv4sU+nDJmrPjx4ciStVCubMcwZsSXN5dl6/lx59Bre1paShqHY32/8qQeje9rrRRJa9OtCtreqNkWbQctHbZItsGrslV0PQU2C99Jsd2+tVqV8TbTY19R7pAwcinYS0KcDhj8z7u5lbGJmkk8YOYPwcotxz6geuLGoWsGySbNw+pLn7t+P4CHKHZt95lpTrTk0FjkGchIIbyxpCBB97nTiIDf+BcXgKgoZaF1mU2YIF0IXTMcXBm+J0yHaaWzRXvJQSCEUqSsI9WH3aXGjxk42gjjjgXC4SMiUQRp35BEFpbEkRISoaQNOTSZWAxQIhFDlVZeiWWWWm7JZZdefgmmAwUAADs="],
["R0lGODlhZABkAJEDAPfz/ZNH68Of8////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM0QjhDNEJFOThERDExRTRBMDlCREE4MEZFMTM4NTVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0QjhDNEJEOThERDExRTRBMDlCREE4MEZFMTM4NTVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTUyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgF5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZXpTSAAaAEC58Ray2qx4jEzAn6VV2soJO0St7LYswPOorO23eUDvweggmUmdQeYkrVSOHWIaKKXogXn+KiowkXZ8HgyidkHVomY+anJwGlCihIZuomqiiKoJkvlygkLibu6JSQKqBsgl8hH2+MLd8lWKFbnWXtqCby7pSptc2zF+sIFGlxsbItsTTNeg/2kveMcdL6UrrPOHj71fhMvD51dPsdrtwBWbxCxMt3c5EO3zxshPgWPtAsScFhDKw97RNw1keI8I/8XT3R8UlHHR4WoQtrLKBFVAJM0hM1CmYbljIQjG23k4TJOQo0HgdDcyfOfkGQ6YQKSmeebMqNHb8JTmlIlEqdXoHoEakooRKskpa5AujSs169Uqxas+QhsUm7MxsIoK7IM1rRw3drsaReP2rz4tPLVW/evPwWCm+ItbCgw4l6KFz/zG8bxtca5jJK5fBnWN8xkEnH+3DnFMWp8KgskjZoaqJypNbdO3XA022XAUBPELMnZGDKMAuimVS32TWd6mF0uOpPUOm2vYU89TJzLa5Qj+2hjzpZ39neyM2vntixYF+116vCDJTeYeMzbQ6OQTbqTcuDNSY+n5k2X6vqtRQ/9pxXJb/LxVwh+aEU1xH9X9SEgP0Z5Ipdt09Q3kWwLpkIfci5AOJB0m7XHXoX/xYehfBq2EF03OeVHh3QtAtPdQgxmGCGB88VSTG8KgUaIiNABmAkrnthIom/FCNPPND266CJZP14oJFddoSjIJWMkOeGVHurow3+Z4Weig9uAaeQ9uahXXnkwzlOjfTieGMhvpZ1GoZM9MWTdJN8NQp5OQap22y7bCFdRW27mppoaCzGyKJESdvnHoJDQMVGgLXEpHog84gZppJINttenz0kgKmMUlNrXF6jukMSqk5Xgqgs/xGqnB7TiEEOsMezKa6++/gpssMIOS2yxxj5QAAA7","R0lGODlhZABkAJEDAPTw+G81sa+V0v///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkE2MkYzQTAyNTQwQkU0MTFCQjI2OUI4NkM3RENEQkYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEOTVCOEFFOThERDExRTRBRDYwOTFFNTM1QzQzOTRDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEOTVCOEFEOThERDExRTRBRDYwOTFFNTM1QzQzOTRDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTUyRjU0QjEyRjcyRTQxMUIzOEVBRTM1MUY2NENDOTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTlGODA2NEExRDBCRTQxMUJCMjY5Qjg2QzdEQ0RCRjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQBAAADACwAAAAAZABkAAAC/5yPqcvtD6OctNqLs968+w+G4qgF5omm6sq2bksa70zX9ine+s6bXw8MvjjColGVOSqVl6XTaHlKgZXpTSAAaAHY5cRay2qx4jEzAn6VV2soJO0St7Ld4xvO5rK2AucDvwewwjflAKiSNahnZXh4QqeiBdfoGJAY2ZdG6SgZKajZUGmymELKGCpqagIJyiAaoDo6c0mFWhnLmtdZ65qamSIHzPfJuyCaK7xY1rfbs4mHrLuFEqvznBbNgmXa7GwLl31Tbf0NFm7T7d2LPV6Trm7M/svzDq8g39NmV+50nswF0IwXfkr8oaBThsu8M+v6tTv40A/BIgYfRZTY8EjFVf8XMcYr2HHjk2tBRIocObFHyI5SSPIIpoZly5Q6Vi6s5LImsTgyC9EMs3NOT58ZXwbNc/NVTnRHhSVV+pMGLaSvWCwFKvRp1atSq508xLXrwq9gowJVKEZrVR9mwyRUuzZA2Lgzi9LFM/fuQLt6weTt64Yv4LofB7cqbPiU4MQMEUtlfOOvpYhkKlfmBsxynUeaO5NBQnCL6EzZEoo+TWhUM9QCVbNmfZPkmG3KqqFeZrnUrtm05+0mRiqWbGKQ0lbmCRfWombIXr+OHZp4QNhZZ5E21RwtGd7boNvlDX62wC6XuVsSil20pc7cc6MYfjqTwN/O40+elvbf9PqoUwz/tygfcALyR0hCkyWnTUf/cRTgCfUw+EInptlnEYFJLXigag42BWCEn4wGUH4AetbdCvCpp2GKCcK1CzIwMThGiAFdGN12ywl4H4EUrrZTawxapl01GBYX3Ic6nrYhREYelVaI24UzpB65PJihC5JcMkxTE1IH2ndBoqgiVVaCOVoe5/WBJppClrNlmUm24KMi9MXJkYUmboJbgILYyKSNauX3Fm4QRehdVPlRSA2i2tDWGqNHcinXHVaShpA0LImYmXbdbYpQpWxJClljf4S6zxekChHFqUE0oSoPSbQa2QawzvDDrFaFYOt7MdgaQ6++/gpssMIOS2yxxh6L7AMFAQAAOw=="]
];


