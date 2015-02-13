
/*```/*                       Minecraft ModPE Script GUI 常用控件测试 V3.6                        *\
````/                                                                                               \
```/                                        by 2639439   - SetTile工作室                             \
``/                                                                                                   \
`/                                        内部资料  请不要转载                                         \
/                                                                                                       \
\        已包含：菜单、对话框、提示框、按钮、文本、文本编辑框、复选框、拖动条、列表选择框、             /
`\              时间拾取器、开关按钮、单选按钮                                                         /
``\                                                                                                   /
```\                                                                                                 /
````\        下一步计划：图片、进度条、线程、文件I/O、读取图片文件等                                /
`````\*                                                                                           */

/*     更新记录：
 *     V1.0 加入菜单、按钮、控件点击事件
 *     V2.0 加入文本、文本编辑框、复选框、复选框选项改变事件、控件文本颜色、控件文本大小、线性布局
 *     V2.4 加入对话框、拖动条、拖动条拖动事件、列表选择框
 *     V2.8 加入控件背景色、控件文本发光效果、振动、控件长按事件
 *     V3.6 加入时间拾取器、开关按钮、单选按钮、提示框、时间拾取器改变事件、控件触碰事件、菜单关闭事件、对话框关闭事件
 *     V .  加入线性布局删除元素、获取元素数量的方法
 *
 *
 */




var ctx;
var btnWindow=null,mainMenu=null,xyzWindow=null;   //保存菜单的变量

var menux=60,menuy=40;   //打开菜单按钮的坐标
var movebutton=0;   //0为不移动按钮，1为可以拖动按钮，2为长按后可以拖动






function newLevel()   //进入游戏
{
	try
	{
		ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();   //获取上下文环境
		ctx.runOnUiThread(new java.lang.Runnable()      //运行代码
		{
run: 		function()
			{
				var layout = new android.widget.LinearLayout(ctx);


				var dx=0,dy=0;    //按钮移动的坐标
				var longclicked=false;
				var button = new android.widget.Button(ctx);    //新建按钮1
				button.setText("按钮");    //按钮文字
				button.setTextSize(18);    //文字大小
				button.setTextColor(android.graphics.Color.argb(255,0,100,210));    //按钮文字颜色，四个整数依次为不透明度，红色，绿色，蓝色，最大255，最小0
				button.setOnClickListener(new android.view.View.OnClickListener()
				{
onClick: 			function(v)      //按下按钮后
					{
						openMenu();    //打开菜单函数
					}
				});
				button.setOnLongClickListener(new android.view.View.OnLongClickListener()   //按钮长按监听器，在后面详细说明
				{
onLongClick: 		function(v)
					{
						if(movebutton==2)    //如果是长按后移动按钮，设置长按为true
						{
							ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
							longclicked=true;
						}
						return true;
					}
				});
				button.setOnTouchListener(new android.view.View.OnTouchListener()  //按钮触碰监听器，在后面详细说明
				{
onTouch:   			function(v,e)
					{
						if(movebutton!=0)
						{
							if(e.getAction()==android.view.MotionEvent.ACTION_DOWN)   //在刚按下时，记录当前坐标
							{
								dx=e.getX();
								dy=e.getY();
							}
							if(movebutton==1||longclicked==true)    //拖动按钮
							{
								menux+= -parseInt((e.getX()-dx)/3);    //计算移动的坐标，把3改成5按钮移动可以更缓慢
								menuy+= -parseInt((e.getY()-dy)/3);
								btnWindow.update(menux, menuy, -1, -1);  //在新的位置显示菜单
							}
							if(e.getAction()==android.view.MotionEvent.ACTION_UP)   //松开时，将长按设置为false
							{
								longclicked=false;
							}
						}
						return false;
					}
				});
				layout.addView(button);   //显示按钮


				btnWindow = new android.widget.PopupWindow(layout, dip2px(ctx, 80), dip2px(ctx, 40));   //按钮显示需要新建一个菜单(此处直接定义了菜单内容、宽度、高度)
				btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));     //菜单颜色透明
				btnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, menux, menuy);
				//菜单显示的位置，这决定了按钮显示的位置(从屏幕右侧到左侧60像素，屏幕底部到顶部40像素，RIGHT和BOTTOM可换为LEFT和TOP)
			}
		});
	}
	catch(err)     //错误提示
	{
		print("按钮加载失败，因为: "+err);
	}
}

function openMenu()
{
	try
	{
		var scroll = new android.widget.ScrollView(ctx);       //新建滚动菜单

		var layout = new android.widget.LinearLayout(ctx);     //新建线性布局
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);    //线性布局0(HORIZONTAL)为横向，1(VERTICAL)为纵向


		var title = new android.widget.TextView(ctx);    //新建文本
		title.setTextSize(15);    //文字大小
		title.setTextColor(android.graphics.Color.argb(120,0,255,0));
		//文字颜色，设置为半透明，所以虽然颜色为纯绿，但会透过背景颜色，除了按钮、文本可以设置颜色外，菜单、复选框、文本编辑框、开关按钮、单选按钮
		//也能设置颜色、背景色、字体大小和发光效果，但时间拾取器只能设置背景色
		title.setBackgroundColor(android.graphics.Color.argb(255,20,25,55));  //文字背景色
		title.setText("常用控件、颜色及对话框的测试");
		layout.addView(title,0);    
		//将文字加入线性布局，默认情况下是把控件加入线性布局末尾，但可以使用layout.addView(title,n)指定加入第n个位置(从0算起)
		//使用layout.getChildCount()可以获得线性布局的元素个数，使用layout.getChildAt(n)返回第n个元素，


		var title3 = new android.widget.TextView(ctx);    //新建文本
		title3.setTextSize(18);    //文字大小
		title3.setTextColor(android.graphics.Color.argb(255,90,155,230));   //文字颜色
		title3.setShadowLayer(4,2,2,android.graphics.Color.argb(255,70,255,163));  //文字发光效果，第一个数字为阴影粗细，第二、第三个为阴影横向、纵向偏移量
		title3.setText("发光文本");
		layout.addView(title3);    //将文字加入线性布局


		var title4 = new android.widget.TextView(ctx);    //新建文本
		title4.setTextSize(18);    //文字大小
		title4.setTextColor(android.graphics.Color.argb(255,74,30,115));   //文字颜色
		title4.setShadowLayer(1,0,0,android.graphics.Color.argb(255,255,255,255));   //文字描边效果，前面的参数已经设置为最佳，描边颜色可以修改
		title4.setText("描边文本");
		layout.addView(title4);    //将文字加入线性布局


		var edit1 = new android.widget.EditText(ctx);     //新建文本编辑框
		edit1.setHint("文本编辑框");    //设置提示文字，当文本编辑框为空时显示
		edit1.setHintTextColor(android.graphics.Color.argb(255,20,70,52));   //提示文字的颜色
		edit1.setText("Hi");         //设置编辑框内文字
		edit1.setInputType(android.text.InputType.TYPE_CLASS_TEXT);  //编辑类型为文字，TYPE_CLASS_TEXT换为TYPE_CLASS_NUMBER则只能编辑数字
		layout.addView(edit1);    //将文本编辑框加入线性布局


		var checkbox1 = new android.widget.CheckBox(ctx);     //新建复选框
		checkbox1.setText("复选框");
		checkbox1.setChecked(false);   //设置为非选中，使用checkbox1.toggle()可以切换选中状态，开关按钮和单选按钮同理
		checkbox1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener() //增加选项改变的事件监听器，用户按下和程序改变选中都会触发
		{
onCheckedChanged:function(v,c)    //checked为true则是选中，为false非选中
			{
				if(c)   //改变编辑框文字
				{
					edit1.setText("Checked");
				}
				else
				{
					edit1.setText("Cancelled");
				}
			}
		});
		layout.addView(checkbox1);    //将复选框加入线性布局


		var btn2 = new android.widget.Button(ctx);    //新建按钮
		btn2.setText("按钮");
		btn2.setOnClickListener(new android.view.View.OnClickListener()
		//按钮按下监听器，文本、复选框也可以设置按下监听器
		{
onClick:    function(v)
			{
				print("按下按钮。请尝试长按按钮。");
				clientMessage("复选框  ："+checkbox1.isChecked());  //获取选中状态
				clientMessage("编辑框  ："+edit1.getText());   //获取编辑框内文字
			}
		});
		btn2.setOnLongClickListener(new android.view.View.OnLongClickListener()   
		//按钮长按监听器，按钮的三种监听器都是可选的，不一定要设置，文本、文本编辑框、复选框、列表选择框都可以设置长按监听器
		{
onLongClick:function(v)
			{
				ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);    //震动40毫秒
				print("你长按了按钮！");
				return true;    //长按事件必须要返回
			}
		});
		btn2.setOnTouchListener(new android.view.View.OnTouchListener()  
		//按钮触碰监听器
		{
onTouch:    function(v,e)    //e为事件
			{
				var a=e.getAction();    //获取事件动作，0(ACTION_DOWN)为按下，1(ACTION_UP)为松开，2(ACTION_MOVE)为拖动
				if(a==android.view.MotionEvent.ACTION_DOWN)
				{
					title2.setText("按下按钮");
				}
				else if(a==android.view.MotionEvent.ACTION_UP)
				{
					title2.setText("松开按钮");
				}
				else if(a==android.view.MotionEvent.ACTION_MOVE)
				{
					title2.setText("拖动按钮 x:"+parseInt(e.getX())+" y:"+parseInt(e.getY()));
				}
				return false;   //一般返回false，表示事件还没有处理完，可以交由其它监听器继续处理
			}
		});
		layout.addView(btn2);


		var title2 = new android.widget.TextView(ctx);    //新建另一段文本
		title2.setTextSize(12);    //文字大小
		title2.setText("拖动条示例");
		layout.addView(title2);    //将文字加入线性布局


		var seekbar1=new android.widget.SeekBar(ctx);       //新建拖动条
		seekbar1.setMax(4);         //把拖动条分为4份，加上头尾共有5个拖动的位置，数值分别为0至4，用seekbar1.getMax()可以获取份数
		seekbar1.setProgress(2);     //设置拖动到数值为2的地方
		seekbar1.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener()   //拖动条事件监听器
		{
onProgressChanged:function(v,i,b)    //拖动中数值改变时执行，i为拖动条数值
			{
				title2.setText("    拖动中："+i);    //改变文本内容
			},
onStartTrackingTouch:function(v)     //开始拖动时执行
			{
				title2.setText("拖动开始："+seekbar1.getProgress());
			},
onStopTrackingTouch:function(v)      //结束拖动时执行，可以用seekbar1.getProgress()方法获得拖动条进度
			{
				title2.setText("拖动结束："+seekbar1.getProgress());
			}
		});
		layout.addView(seekbar1);    //将拖动条加入线性布局


		var btn5 = new android.widget.Button(ctx);    //新建按钮
		btn5.setTextSize(15);
		btn5.setText("删除标题文字");
		btn5.setBackgroundColor(android.graphics.Color.argb(255,20,37,50));  //按钮文字背景色
		btn5.setTextColor(android.graphics.Color.argb(255,180,109,251));       //按钮文字颜色
		btn5.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick:    function(v)
			{
				layout.removeView(title);   //删除标题，也可以使用layout.removeViewAt(n)删除第n个元素，layout.用removeAllViews()删除全部元素
				clientMessage("已删除。现在此按钮是第"+layout.indexOfChild(btn5)+"个元素。");   //获取当前元素在线性布局中的位置(从0算起)
			}
		});
		layout.addView(btn5);     //将该按钮加入线性布局


		var btn3 = new android.widget.Button(ctx);    //新建打开对话框1的按钮
		btn3.setText("打开对话框1");
		btn3.setTextSize(14);    //按钮文字大小
		/*
		btn3.setBackgroundColor(android.graphics.Color.argb(255,20,37,50));  //按钮文字背景色
		btn3.setTextColor(android.graphics.Color.argb(255,180,109,251));       //按钮文字颜色*/
		btn3.setOnClickListener(new android.view.View.OnClickListener()      //按钮按下监听器
		{
onClick:    function(v)
			{
				openDialog1();
			}
		});
		layout.addView(btn3);     //将该按钮加入线性布局

		var btn4 = new android.widget.Button(ctx);    //新建打开提示框1的按钮
		btn4.setText("打开提示框1");
		btn4.setTextSize(14);
		btn4.setOnClickListener(new android.view.View.OnClickListener()      //按钮按下监听器
		{
onClick:    function(v)
			{
				openAlertDialog1();
			}
		});
		layout.addView(btn4);     //将该按钮加入线性布局





		scroll.addView(layout);     //将线性布局加入到滚动菜单中

		var menu = new android.widget.PopupWindow();   //新建菜单
		menu.setContentView(scroll);       //设置菜单内容为该滚动菜单    (这三行语句可以像下面的菜单一样直接在新建菜单方法的参数里写)
		menu.setWidth(dip2px(ctx, 120));   //菜单宽度，120/480=1/4个屏幕宽
		menu.setHeight(400);               //菜单高度，400像素
		menu.setFocusable(true);   //菜单有焦点，即点击菜单以外的地方会关闭菜单
		menu.setTouchable(true);   //菜单可以被点击，默认为true
		mainMenu = menu;           //保存菜单变量
		menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		//菜单颜色黑色(此处的.BLACK可用上面的.argb(255,255,255,255)自定义颜色，其他颜色常量有：灰黑色DKGRAY,灰色GRAY,浅灰色LTGRAY,透明TRANSPARENT,白色WHITE等)
		menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 30, 40);
		menu.setOnDismissListener(new android.widget.PopupWindow.OnDismissListener()    //菜单关闭监听器，用户关闭及程序关闭都会触发
		{
onDismiss:  function()
			{
				clientMessage("菜单被关闭。");
			}
		});
	}
	catch(err)
	{
		print("菜单加载失败，因为: "+err);
	}
}

function openDialog1()
{
	try
	{
		var scroll1 = new android.widget.ScrollView(ctx);   //新建纵向滚动菜单

		var layout1 = new android.widget.LinearLayout(ctx);     //新建线性布局1
		layout1.setOrientation(android.widget.LinearLayout.VERTICAL);   //布局方式为纵向
		scroll1.addView(layout1);      //将线性布局1加入纵向滚动菜单 

		var layout2=new android.widget.LinearLayout(ctx);     //新建线性布局2
		layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL);    //布局方式为横向

		var dialog1 = new android.app.Dialog(ctx);   //新建对话框
		dialog1.setContentView(scroll1);             //设置对话框内容为纵向滚动菜单
		dialog1.setTitle("对话框及线性布局嵌套");    //设置对话框标题
		dialog1.setCanceledOnTouchOutside(true);     //设置在对话框外部点击可以关闭，默认为true


		var title3 = new android.widget.TextView(ctx);    //新建文本
		title3.setTextSize(16);
		title3.setText("这是纵向滚动菜单内部的线性布局1，布局方式为纵向，以下一行为线性布局1内的线性布局2，布局方式为横向。");
		layout1.addView(title3);    //将文字加入线性布局1

		layout1.addView(layout2);    //将线性布局2加入线性布局1


		var spinner1=new android.widget.Spinner(ctx);      //定义列表选择框(注意：列表选择框仅能在对话框或提示框中使用，菜单使用会崩溃)
		var str=["圆石","红石","青金石","黑曜石"];      //列表项
		spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));   
		//定义列表项，设置适配器，把android.R.layout.simple_spinner_item换成android.R.layout.simple_spinner_dropdown_item可以把列表选择项变大
		spinner1.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener()    
		//选中选项监听器(注意：当列表选项框刚显示的时候，也会触发此监听器)
		{
onItemSelected:function(f,v,p,id)    //id为选中的项目id，从0开始算起
			{
				print("选中"+spinner1.getSelectedItem()+"，id为 "+id+"。");
			}
		});
		layout2.addView(spinner1);    //将列表选择框加入线性布局2


		var btn4 = new android.widget.Button(ctx);    //新建按钮
		btn4.setText("确认");
		btn4.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick:    function(v)
			{
				print("\n列表选择框：\n选项为："+spinner1.getSelectedItem()+"，\n是第 "+spinner1.getSelectedItemId()+" 个。");
				//获取列表选择框内选项内容及id
			}
		});
		layout2.addView(btn4);   //将按钮加入线性布局2


		var title4 = new android.widget.TextView(ctx);    //新建文本
		title4.setTextSize(14);
		title4.setText("这一行是线性布局2，布局方式为横向。");
		layout2.addView(title4);    //将文字加入线性布局1


		var date1 = new Date();   //获取时间(此为javascript原生函数，不是GUI内容)
		var timepicker1=new android.widget.TimePicker(ctx);   //新建时间拾取器
		timepicker1.setIs24HourView(true);     //设置为24小时制，为false则有AM/PM选项，方法timepicker1.is24HourView()用于获取是否是24小时制
		timepicker1.setCurrentHour(date1.getHours());     //设置小时(如果是12小时制，会自动转换成AM/PM)
		timepicker1.setCurrentMinute(date1.getMinutes());    //设置分钟
		timepicker1.setBackgroundColor(android.graphics.Color.argb(255,10,14,25));   //设置背景色(文字颜色不能设置)
		timepicker1.setOnTimeChangedListener(new android.widget.TimePicker.OnTimeChangedListener()
		{
onTimeChanged:function(v,h,m)  //h为小时，m为分钟，无论是否使用24小时制，小时的值都是0~24
			{
				title5.setText("时:"+h+" 分:"+m);
			}
		});
		layout1.addView(timepicker1);


		var title5 = new android.widget.TextView(ctx);    //新建文本
		title5.setTextSize(18);
		title5.setText("时间拾取器示例");
		layout1.addView(title5);    //将文字加入线性布局2


		var btn5 = new android.widget.Button(ctx);    //新建按钮
		btn5.setText("关闭");
		btn5.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick:    function(v)
			{
				dialog1.dismiss();    //关闭对话框
				clientMessage("time: "+timepicker1.getCurrentHour()+"h "+timepicker1.getCurrentMinute()+"m");   //获取选择的时间
			}
		});
		layout1.addView(btn5);    //将按钮加入线性布局1


		dialog1.show();    //显示对话框
		dialog1.getWindow().setLayout(dip2px(ctx,400), dip2px(ctx,280));    //可以设置对话框大小，要在show()之后设置
		dialog1.setOnDismissListener(new android.content.DialogInterface.OnDismissListener()  //对话框关闭监听器，用户关闭及程序关闭都会触发，提示框也可以设置
		{
onDismiss:    function(d)
			{
				print("关闭对话框。");
			}
		});
	}
	catch(err)
	{
		    print("打开对话框错误: "+err);
	}
}

function openAlertDialog1()
{
	try
	{
		var scroll1 = new android.widget.ScrollView(ctx);   //新建纵向滚动菜单

		var layout1 = new android.widget.LinearLayout(ctx);     //新建线性布局1
		layout1.setOrientation(android.widget.LinearLayout.VERTICAL);   //布局方式为纵向
		scroll1.addView(layout1);      //将线性布局1加入纵向滚动菜单 


		var builder1 = new android.app.AlertDialog.Builder(ctx);  //新建builder，提示框与对话框类似，只是可以设置确认取消等按钮，并且需要新建builder
		builder1.setView(scroll1);               //设置builder内容为纵向滚动菜单，这一方法与对话框稍微有点不同
		builder1.setTitle("更多控件的测试");     //设置builder标题
		builder1.setPositiveButton("确定",new android.content.DialogInterface.OnClickListener()
		//设置builder的确认取消按钮，最多可设置三个按钮，从右到左分别是Positive、Neutral、Negative，也可以不设置，
		//这种按钮不能设置长按或触碰事件，也不能设置字体大小等属性，点击按钮后就会关闭提示框
		{
onClick: 	function(d,w)
			{
				if(radio1.isChecked())    //获取单选按钮的选项以设置按钮拖动状态
				{
					movebutton=0;
				}
				else if(radio2.isChecked())
				{
					movebutton=1;
				}
				else if(radio3.isChecked()) 
				{
					movebutton=2;
				}
				print("已保存。");
			}
		});
		builder1.setNeutralButton("恢复默认",new android.content.DialogInterface.OnClickListener()
		{
onClick: 	function(d,w)
			{
				movebutton=0;
				menux=60;
				menuy=40;
				btnWindow.update(menux, menuy, -1, -1);  //在新的位置显示菜单
				print("已恢复默认。");
			}
		});
		builder1.setNegativeButton("取消",new android.content.DialogInterface.OnClickListener()
		{
onClick: 	function(d,w)
			{
			}
		});
		var alertdialog1 = builder1.create();     //通过builder的create()方法得到提示框，在执行这个方法之前，需要把builder的标题和按钮等都设置好
		alertdialog1.setCanceledOnTouchOutside(false);   //设置在提示框外部点击不能关闭



		var togglebutton1 = new android.widget.ToggleButton(ctx);   //新建开关按钮，特性与复选框类似，但是如果设置背景色就看不出开关效果
		togglebutton1.setChecked(true);     //设置状态为开
		togglebutton1.setTextOn("开关按钮被打开");    //打开状态显示的文本，用togglebutton1.getTextOn()可以得到该文本
		togglebutton1.setTextOff("开关按钮被关闭");   //关闭状态显示的文本，用togglebutton1.getTextOff()可以得到该文本
		togglebutton1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  //增加选项改变的事件监听器
		{
onCheckedChanged:function(v,c)    //checked为true则是选中，为false非选中，和复选框类似，在外部用togglebutton1.isChecked()可以获取开关状态
			{
				clientMessage("当前状态："+c);    //将开关按钮加入线性布局1
			}
		});
		layout1.addView(togglebutton1);


		var title3 = new android.widget.TextView(ctx);    //新建文本
		title3.setTextSize(16);
		title3.setText("测试。");
		layout1.addView(title3);    //将文字加入线性布局1

		var radiogroup1 = new android.widget.RadioGroup(ctx);
		//新建单选按钮组，一个单选按钮组最多只能有一个单选按钮被选中，并且选中之后不能取消选中，单选按钮组也可以设置布局方式、加入其他类型的元素
		layout1.addView(radiogroup1);    //将单选按钮组加入线性布局1

		var radio1 = new android.widget.RadioButton(ctx);    //新建单选按钮
		radio1.setText("不移动按钮");
		radio1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()  
		//增加选项改变的事件监听器，不仅当选中时会触发，当选项改为其它单选按钮时也会触发
		{
onCheckedChanged:function(v,c)    //checked为true则是选中，为false非选中，在外部可以通过radio1.isChecked()获取选中状态
			{
				if(c)    //选中则改变文字
				{
					title3.setText("主菜单按钮状态：不移动按钮");
				}
			}
		});
		radiogroup1.addView(radio1);    //将单选按钮加入单选按钮组中

		var radio2 = new android.widget.RadioButton(ctx);   //新建单选按钮
		radio2.setText("可以拖动按钮");
		radio2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
		{
onCheckedChanged:function(v,c)
			{
				if(c) 
				{
					title3.setText("主菜单按钮状态：可以拖动按钮");
				}
			}
		});
		radiogroup1.addView(radio2);  

		var radio3 = new android.widget.RadioButton(ctx);   //新建单选按钮
		radio3.setText("长按后拖动按钮");
		radio3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
		{
onCheckedChanged:function(v,c)
			{
				if(c) 
				{
					title3.setText("主菜单按钮状态：长按后拖动按钮");
				}
			}
		});
		radiogroup1.addView(radio3);  

		if(movebutton==0)    //设置单选按钮选中状态，必须在把所有单选按钮加入单选按钮组后才设置，因此会触发选项改变监听器
		{
			radio1.setChecked(true);
		}
		else if(movebutton==1)
		{
			radio2.setChecked(true);
		}
		else if(movebutton==2)
		{
			radio3.setChecked(true);
		}





		


		alertdialog1.show();    //显示提示框
	}
	catch(err)
	{
		    print("打开提示框错误: "+err);
	}
}

function leaveGame()
{
	try
	{
		ctx.runOnUiThread(new java.lang.Runnable()
		{
run: 		function()            //回到游戏主菜单后，关闭菜单
			{
				if(btnWindow != null)
				{
					btnWindow.dismiss();
					btnWindow = null;
				}
				if(mainMenu != null)
				{
					mainMenu.dismiss();
					mainMenu = null;
				}

			}
		});
	}
	catch(err)     //错误提示
	{
		print("菜单关闭失败，因为: "+err);
	}
}



function dip2px(ctx, dips)   //此函数的作用是，把屏幕的几分之几转换为像素，dips=480为屏幕的100%，240为屏幕的50%，以此类推，优点是随着屏幕大小而调节
{
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}







