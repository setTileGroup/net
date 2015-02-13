/*
 Too Many Items Script by MrARM
 translate by 旋转风琴 and 小綮丶
 recompose by yyf1069107050
 second recompose by 2639439
 点击屏幕右下角的M按钮开启菜单。
*/

var ctx;
var btnWindow = null;
var mainMenu = null;
var btnMenu = null;
var btnMenuSub = null;
var subMenu = null;
var infoMenu = null;
var menux=0,menuy=0;      //菜单按钮所在坐标

var addId=0,addDmg=0,addCount=0;    //添加的物品id，数量，特殊值
var ride=false;     //是否准备骑乘生物
var entityctrl=0;      //生物控制，为1和2时控制生物骑乘，3一击杀死生物，4攻击时生物着火，5改变动物生长阶段，6生物血量改为10，7生物血量改为50，8生物血量改为40
var tmpentity=0;
var riding=false,ridingAnimal=0;      //是否正在骑乘生物,正在骑乘的生物
var spawnOnTap=-1,spawncount=1;    //点击方块生成的生物id，-1为不生成，生成的数量

var fullxp=false,running=0;   //无敌模式，疾跑模式，0为行走，1为疾跑，2为潜行
var Xpos=0,Zpos=0,runi=1,Xdiff=0,Zdiff=0;  //疾跑的坐标记录
var existhome=false,homex=0,homey=0,homez=0;        //是否存在家，家的坐标
var sbx=0,sby=0,sbz=0;           //炸弹坐标
var existbomb=false;         //是否存在炸弹
var radium=4;              //爆炸半径
var entities=new Array();      //存储实体的数组

var buildmode=0,submode=0;   //建造模式：1连线，2实心长方体，3空心长方体，4长方体框架，5圆环，6圆，7球，8空心球，9金字塔，10空心金字塔，20编辑告示牌，25替换，30复制，31粘贴，32高级粘贴；建造中的阶段
var keepbuild=false,usesameid=false,makeroad=0;       //持续建造，使用固定方块建造，铺路，0为不铺路，1为使用拿着的方块铺路，2为使用固定方块铺路
var buildid=0,builddmg=0;    //建造方块的id与特殊值
var s1=new Array(), s2=new Array(), blockgroup=new Array();    //几何体方块坐标，剪贴板
var sphererad=3;        //金字塔/圆/球的半径
var replaceblock=0,replacedamage=0;          //将要替换的方块和特殊值
var nopasteair=0,nopastewater=0,nopastelava=0,nocover=0;           //不粘贴的方块，1为不粘贴；不覆盖原有方块，1为不覆盖
var pastedir=0;      //旋转方向，0为不旋转，1至9分别为x,y,z轴的90,180,270度旋转




var CAT_ALL_ITEMS = [];        //所有物品，第一次使用时添加

var CAT_BUILDING_ITEMS = [
{name: "石头", id: 1, data: 0},
{name: "草方块", id: 2, data: 0},
{name: "泥土", id: 3, data: 0},
{name: "圆石", id: 4, data: 0},
{name: "橡木木板", id: 5, data: 0},
{name: "云杉木板", id: 5, data: 1},
{name: "桦木木板", id: 5, data: 2},
{name: "丛林木板", id: 5, data: 3},
{name: "基岩", id: 7, data: 0},
{name: "沙子", id: 12, data: 0},
{name: "砂砾", id: 13, data: 0},
{name: "橡木", id: 17, data: 0},
{name: "云杉木", id: 17, data: 1},
{name: "桦木", id: 17, data: 2},
{name: "丛林木", id: 17, data: 3},
{name: "玻璃", id: 20, data: 0},
{name: "钻石矿石", id: 56, data: 0},
{name: "金矿石", id: 14, data: 0},
{name: "铁矿石", id: 15, data: 0},
{name: "煤矿石", id: 16, data: 0},
{name: "青金石矿石", id: 21, data: 0},
{name: "红石矿石", id: 73, data: 0},
{name: "沙石", id: 24, data: 0},
{name: "錾制沙石", id: 24, data: 1},
{name: "平滑沙石", id: 24, data: 2},
{name: "钻石块", id: 57, data: 0},
{name: "金块", id: 41, data: 0},
{name: "铁块", id: 42, data: 0},
{name: "青金石块", id: 22, data: 0},
{name: "煤块", id: 173, data: 0},
{name: "石英块", id: 155, data: 0},
{name: "錾制石英块", id: 155, data: 1},
{name: "竖纹石英块", id: 155, data: 2},
{name: "双石台阶", id: 43, data: 0},
{name: "双沙石台阶", id: 43, data: 1},
{name: "双圆石台阶", id: 43, data: 3},
{name: "双红砖台阶", id: 43, data: 4},
{name: "石台阶", id: 44, data: 0},
{name: "沙石台阶", id: 44, data: 1},
{name: "圆石台阶", id: 44, data: 3},
{name: "红砖台阶", id: 44, data: 4},
{name: "石砖台阶", id: 44, data: 5},
{name: "石英台阶", id: 44, data: 6},
{name: "橡木台阶", id: 158, data: 0},
{name: "云杉木台阶", id: 158, data: 1},
{name: "桦木台阶", id: 158, data: 2},
{name: "丛林木台阶", id: 158, data: 3},
{name: "砖块", id: 45, data: 0},
{name: "苔石", id: 48, data: 0},
{name: "黑曜石", id: 49, data: 0},
{name: "橡木楼梯", id: 53, data: 0},
{name: "云杉木楼梯", id: 134, data: 0},
{name: "桦木楼梯", id: 135, data: 0},
{name: "丛林木楼梯", id: 136, data: 0},
{name: "圆石楼梯", id: 67, data: 0},
{name: "红砖楼梯", id: 108, data: 0},
{name: "石砖楼梯", id: 109, data: 0},
{name: "地狱楼梯", id: 114, data: 0},
{name: "沙石楼梯", id: 128, data: 0},
{name: "石英楼梯", id: 156, data: 0},
{name: "粘土块", id: 82, data: 0},
{name: "栅栏", id: 85, data: 0},
{name: "地狱岩", id: 87, data: 0},
{name: "石砖", id: 98, data: 0},
{name: "苔石砖", id: 98, data: 1},
{name: "裂石砖", id: 98, data: 2},
{name: "玻璃板", id: 102, data: 0},
{name: "栅栏门", id: 107, data: 0},
{name: "地狱砖块", id: 112, data: 0},
{name: "另一种木台阶*", id: 44, data: 2},
{name: "另一种石台阶*", id: 44, data: 7},
{name: "发光的红石矿石*", id:74, data: 0},
{name: "隐形基岩*", id: 95, data: 0}];

var CAT_DECORATION_ITEMS = [
{name: "白色羊毛", id: 35, data: 0},
{name: "橙色羊毛", id: 35, data: 1},
{name: "品红色羊毛", id: 35, data: 2},
{name: "淡蓝色羊毛", id: 35, data: 3},
{name: "黄色羊毛", id: 35, data: 4},
{name: "黄绿色羊毛", id: 35, data: 5},
{name: "粉红色羊毛", id: 35, data: 6},
{name: "灰色羊毛", id: 35, data: 7},
{name: "淡灰色羊毛", id: 35, data: 8},
{name: "青色羊毛", id: 35, data: 9},
{name: "紫色羊毛", id: 35, data: 10},
{name: "蓝色羊毛", id: 35, data: 11},
{name: "棕色羊毛", id: 35, data: 12},
{name: "绿色羊毛", id: 35, data: 13},
{name: "红色羊毛", id: 35, data: 14},
{name: "黑色羊毛", id: 35, data: 15},
{name: "黄花", id: 37, data: 0},
{name: "青花", id: 38, data: 0},
{name: "书架", id: 47, data: 0},
{name: "雪", id: 78, data: 0},
{name: "冰", id: 79, data: 0},
{name: "雪块", id: 80, data: 0},
{name: "仙人掌", id: 81, data: 0},
{name: "南瓜", id: 86, data: 0},
{name: "荧石", id: 89, data: 0},
{name: "西瓜", id: 103, data: 0},
{name: "画", id: 321, data: 0},
{name: "甘蔗", id: 338, data: 0},
{name: "干草块", id: 170, data: 0},
{name: "甘蔗方块*", id:83 , data: 0},
{name: "蛋糕方块*", id:92 , data: 0},
{name: "游戏更新方块1*", id: 248, data: 0},
{name: "游戏更新方块2*", id: 249, data: 0},
{name: "故障草*", id:253 , data: 0},
{name: "故障叶*", id:254 , data: 0},
{name: "(技术方块).name*", id:255 , data: 0}];

var CAT_ARMOUR_ITEMS = [
{name: "钻石头盔", id: 310, data: 0},
{name: "钻石胸甲", id: 311, data: 0},
{name: "钻石护腿", id: 312, data: 0},
{name: "钻石靴子", id: 313, data: 0},
{name: "金头盔", id: 314, data: 0},
{name: "金胸甲", id: 315, data: 0},
{name: "金护腿", id: 316, data: 0},
{name: "金靴子", id: 317, data: 0},
{name: "铁头盔", id: 306, data: 0},
{name: "铁胸甲", id: 307, data: 0},
{name: "铁护腿", id: 308, data: 0},
{name: "铁靴子", id: 309, data: 0},
{name: "锁链头盔", id: 302, data: 0},
{name: "锁链胸甲", id: 303, data: 0},
{name: "锁链护腿", id: 304, data: 0},
{name: "锁链靴子", id: 305, data: 0},
{name: "皮革帽子", id: 298, data: 0},
{name: "皮革外套", id: 299, data: 0},
{name: "皮革裤子", id: 300, data: 0},
{name: "皮革鞋子", id: 301, data: 0}];

var CAT_TOOLS_ITEMS = [
{name: "弓", id: 261, data: 0},
{name: "箭", id: 262, data: 0},
{name: "钻石剑", id: 276, data: 0},
{name: "钻石锹", id: 277, data: 0},
{name: "钻石镐", id: 278, data: 0},
{name: "钻石锄", id: 293, data: 0},
{name: "钻石斧", id: 279, data: 0},
{name: "金剑", id: 283, data: 0},
{name: "金锹", id: 284, data: 0},
{name: "金镐", id: 285, data: 0},
{name: "金锄", id: 294, data: 0},
{name: "金斧", id: 286, data: 0},
{name: "铁剑", id: 267, data: 0},
{name: "铁锹", id: 256, data: 0},
{name: "铁镐", id: 257, data: 0},
{name: "铁锄", id: 292, data: 0},
{name: "铁斧", id: 258, data: 0},
{name: "石剑", id: 272, data: 0},
{name: "石锹", id: 273, data: 0},
{name: "石镐", id: 274, data: 0},
{name: "石锄", id: 291, data: 0},
{name: "石斧", id: 275, data: 0},
{name: "木剑", id: 268, data: 0},
{name: "木锹", id: 269, data: 0},
{name: "木镐", id: 270, data: 0},
{name: "木锄", id: 290, data: 0},
{name: "木斧", id: 271, data: 0},
{name: "打火石", id: 259, data: 0},
{name: "桶", id: 325, data: 0},
{name: "指南针", id: 345, data: 0},
{name: "钟", id: 347, data: 0},
{name: "剪刀", id: 359, data: 0}];

var CAT_FOOD_ITEMS = [
{name: "棕蘑菇", id: 39, data: 0},
{name: "红蘑菇", id: 40, data: 0},
{name: "苹果", id: 260, data: 0},
{name: "蘑菇汤", id: 282, data: 0},
{name: "小麦", id: 296, data: 0},
{name: "面包", id: 297, data: 0},
{name: "生猪排", id: 319, data: 0},
{name: "熟猪排", id: 320, data: 0},
{name: "牛奶桶", id: 325, data: 1},
{name: "糖", id: 353, data: 0},
{name: "蛋糕", id: 354, data: 0},
{name: "西瓜片", id: 360, data: 0},
{name: "生牛排", id: 363, data: 0},
{name: "熟牛排", id: 364, data: 0},
{name: "生鸡肉", id: 365, data: 0},
{name: "熟鸡肉", id: 366, data: 0},
{name: "胡萝卜", id: 391, data: 0},
{name: "土豆", id: 392, data: 0},
{name: "烤土豆", id: 393, data: 0},
{name: "甜菜根", id: 457, data: 0},
{name: "甜菜汤", id: 459, data: 0},
{name: "生物蛋（鸡）", id: 383, data: 10},
{name: "生物蛋（牛）", id: 383, data: 11},
{name: "生物蛋（猪）", id: 383, data: 12},
{name: "生物蛋（羊）", id: 383, data: 13}];

var CAT_DYES_ITEMS = [
{name: "墨囊", id: 351, data: 0},
{name: "玫瑰红", id: 351, data: 1},
{name: "仙人掌绿", id: 351, data: 2},
{name: "可可豆", id: 351, data: 3},
{name: "青金石", id: 351, data: 4},
{name: "紫色染料", id: 351, data: 5},
{name: "青色染料", id: 351, data: 6},
{name: "淡灰色染料", id: 351, data: 7},
{name: "灰色染料", id: 351, data: 8},
{name: "粉色染料", id: 351, data: 9},
{name: "黄绿色染料", id: 351, data: 10},
{name: "蒲公英黄", id: 351, data: 11},
{name: "淡蓝色染料", id: 351, data: 12},
{name: "品红色染料", id: 351, data: 13},
{name: "橙色染料", id: 351, data: 14},
{name: "骨粉", id: 351, data: 15},
{name: "白色羊毛地毯", id: 171, data: 0},
{name: "橙色羊毛地毯", id: 171, data: 1},
{name: "深粉色羊毛地毯", id: 171, data: 2},
{name: "浅蓝色羊毛地毯", id: 171, data: 3},
{name: "黄色羊毛地毯", id: 171, data: 4},
{name: "浅绿色羊毛地毯", id: 171, data: 5},
{name: "浅粉色羊毛地毯", id: 171, data: 6},
{name: "深灰色羊毛地毯", id: 171, data: 7},
{name: "浅灰色羊毛地毯", id: 171, data: 8},
{name: "青色羊毛地毯", id: 171, data: 9},
{name: "紫色羊毛地毯", id: 171, data: 10},
{name: "深蓝色羊毛地毯", id: 171, data: 11},
{name: "棕色羊毛地毯", id: 171, data: 12},
{name: "深绿色羊毛地毯", id: 171, data: 13},
{name: "红色羊毛地毯", id: 171, data: 14},
{name: "黑色羊毛地毯", id: 171, data: 15}];

var CAT_ITEMS_ITEMS = [
{name: "钻石", id: 264, data: 0},
{name: "金锭", id: 266, data: 0},
{name: "铁锭", id: 265, data: 0},
{name: "煤炭", id: 263, data: 0},
{name: "木炭", id: 263, data: 1},
{name: "红石粉", id: 331, data: 0},
{name: "下界石英", id: 406, data: 0},
{name: "木棍", id: 280, data: 0},
{name: "燧石", id: 318, data: 0},
{name: "碗", id: 281, data: 0},
{name: "骨头", id: 352, data: 0},
{name: "蜘蛛丝", id: 287, data: 0},
{name: "皮革", id: 334, data: 0},
{name: "羽毛", id: 288, data: 0},
{name: "火药", id: 289, data: 0},
{name: "水桶", id: 325, data: 8},
{name: "岩浆桶", id: 325, data: 10},
{name: "鞍", id: 329, data: 0},
{name: "雪球", id: 332, data: 0},
{name: "粘液球", id: 341, data: 0},
{name: "鸡蛋", id: 344, data: 0},
{name: "粘土", id: 337, data: 0},
{name: "红砖", id: 336, data: 0},
{name: "纸", id: 339, data: 0},
{name: "书", id: 340, data: 0},
{name: "荧石粉", id: 348, data: 0},
{name: "地狱砖", id: 405, data: 0}];

//var CAT_SPAWN_ITEMS = [];

var CAT_MISCELLANEOUS_ITEMS = [
{name: "工作台", id: 58, data: 0},
{name: "熔炉", id: 61, data: 0},
{name: "石材切割机", id: 245, data: 0},
{name: "箱子", id: 54, data: 0},
{name: "火把", id: 50, data: 0},
{name: "梯子", id: 65, data: 0},
{name: "木门", id: 324, data: 0},
{name: "铁门", id: 330, data: 0},
{name: "陷阱门", id: 96, data: 0},
{name: "告示牌", id: 323, data: 0},
{name: "床", id: 355, data: 0},
{name: "橡木树苗", id: 6, data: 0},
{name: "云杉木树苗", id: 6, data: 1},
{name: "桦木树苗", id: 6, data: 2},
{name: "丛林木树苗", id: 6, data: 3},
{name: "西瓜梗", id: 105, data: 0},
{name: "小麦种子", id: 295, data: 0},
{name: "南瓜种子", id: 361, data: 0},
{name: "西瓜种子", id: 362, data: 0},
{name: "甜菜种子", id: 458, data: 0},
{name: "橡木树叶", id: 18, data: 0},
{name: "云杉木树叶", id: 18, data: 1},
{name: "桦木树叶", id: 18, data: 2},
{name: "丛林木树叶", id: 18, data: 3},
{name: "蜘蛛网", id: 30, data: 0},
{name: "枯死的灌木", id: 31, data: 0},
{name: "动力铁轨", id: 27, data: 0},
{name: "铁轨", id: 66, data: 0},
{name: "矿车", id: 328, data: 0},
{name: "TNT", id: 46, data: 0},
{name: "发光的黑曜石", id: 246, data: 0},
{name: "下界反应核", id: 247, data: 0},
{name: "流动的水*", id: 8, data: 0},
{name: "静止的水*", id:9, data: 0},
{name: "流动的岩浆*", id: 10, data: 0},
{name: "静止的岩浆*", id:11, data: 0},
{name: "床方块*", id: 26, data: 0},
{name: "火方块*", id:51, data: 0},
{name: "生长的小麦*", id:59, data: 0},
{name: "耕地*", id: 60, data: 0},
{name: "燃烧的熔炉*", id:62, data: 0},
{name: "放在地上的告示牌*", id:63, data: 0},
{name: "放在墙上的告示牌*", id:68, data: 0},
{name: "木门方块*", id:64, data: 0},
{name: "铁门方块*", id:71, data: 0},
{name: "camera*", id: 456, data: 0}];




function dip2px(ctx, dips)
{
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function openMenu()
{
	try
	{
		showButtons();
		//var menu = new android.widget.PopupWindow();
		//menu.setFocusable(true);
		//mainMenu = menu;

		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);

		var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		var title1 = new android.widget.TextView(ctx);
		title1.setTextSize(20);
		title1.setText("Power Tools");
		title1.setLayoutParams(textParams);
		layout.addView(title1);

		var buildBtn = new android.widget.Button(ctx);
		buildBtn.setText("建造助手");
		buildBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				buildTool();
			}
		});
		layout.addView(buildBtn);

		var entBtn = new android.widget.Button(ctx);
		entBtn.setText("生物管理");
		entBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				mobTool();
			}
		});
		layout.addView(entBtn);

		var ent3Btn = new android.widget.Button(ctx);
		ent3Btn.setText("建造(old)");
		ent3Btn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
		openMore(ctx, ent3Btn.getLeft(), ent3Btn.getTop());	
		}
		});
		layout.addView(ent3Btn);

		var aboutBtn = new android.widget.Button(ctx);
		aboutBtn.setText("帮助与说明");
		aboutBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				aboutWindow();
			}
		});
		layout.addView(aboutBtn);

		var title2 = new android.widget.TextView(ctx);
		title2.setTextSize(20);
		title2.setText("Too Many Items");
		title2.setLayoutParams(textParams);
		layout.addView(title2);

		addMenuCategory(ctx, layout, "全部物品", CAT_ALL_ITEMS);
		addMenuCategory(ctx, layout, "建筑方块", CAT_BUILDING_ITEMS);
		addMenuCategory(ctx, layout, "装饰方块", CAT_DECORATION_ITEMS);
		addMenuCategory(ctx, layout, "盔甲", CAT_ARMOUR_ITEMS);
		addMenuCategory(ctx, layout, "工具", CAT_TOOLS_ITEMS);
		addMenuCategory(ctx, layout, "食物和生物蛋", CAT_FOOD_ITEMS);
		addMenuCategory(ctx, layout, "染料和地毯", CAT_DYES_ITEMS);
		addMenuCategory(ctx, layout, "矿物等", CAT_ITEMS_ITEMS);
		//addMenuCategory(ctx, layout, "生物蛋", CAT_SPAWN_ITEMS);
		addMenuCategory(ctx, layout, "工作台等", CAT_MISCELLANEOUS_ITEMS);
		addMenuCategory(ctx, layout, "通过物品ID添加", null);

		mainMenu = new android.widget.PopupWindow();
		var mlayout = makeMenu(ctx, mainMenu, layout, true);
		mainMenu.setContentView(mlayout);
		//mainMenu.setFocusable(true); // <-- I can't find better solution
		mainMenu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/3);
		mainMenu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		mainMenu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		mainMenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
	}
	catch(err)
	{
		print("菜单加载失败，因为: "+err);
	}
}

function makeMenu(ctx, menu, layout, main)
{
	var mlayout = new android.widget.RelativeLayout(ctx); // main layout

	var btnParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	btnParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
	btnParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);

	var xbutton = new android.widget.Button(ctx);
	xbutton.setText("x");
	xbutton.setLayoutParams(btnParams);
	xbutton.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick:function(v)
		{
			if(menu != null)
			{
				if(menu==infoMenu)
				{
					infoMenu=null;
				}
				else if(menu==subMenu)
				{
					subMenu=null;
				}
				else if(menu==mainMenu)
				{
					mainMenu=null;
				}
				menu.dismiss();
			}
			if(main && btnMenu != null)
			{
				btnMenu.dismiss();
				btnMenu = null;
			}
		}
	});

	var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
	var scrollview = new android.widget.ScrollView(ctx);
	var pad = dip2px(ctx, 5);
	scrollview.setPadding(pad, pad, pad, pad);
	scrollview.setLayoutParams(svParams);

	scrollview.addView(layout);
	mlayout.addView(scrollview);
	mlayout.addView(xbutton);
	return mlayout;
}

function addMenuCategory(ctx, layout, text, catid)
{
	var button = new android.widget.Button(ctx);
	button.setText(text);
	//button.setWidth(100);
	//button.setHeight(100);
	button.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick:function(v)
		{
			if(catid == null)
			{
				openInfoDialogMenu(ctx, 1, 0);
			}
			else
			{
				openSubMenu(ctx, text, catid);
			}
		}
	});
	layout.addView(button);
}

function openSubMenu(ctx, cname, cat)
{
	try
	{
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);

		var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
		var title = new android.widget.TextView(ctx);
		title.setTextSize(20);
		title.setText("Too Many Items");
		title.setLayoutParams(textParams);
		layout.addView(title);
		var stitle = new android.widget.TextView(ctx);
		stitle.setTextSize(14);
		stitle.setText(cname);
		stitle.setLayoutParams(textParams);
		layout.addView(stitle);

		var i=0;

		if(cat==CAT_ALL_ITEMS&&cat.length==0)    //第一次使用所有物品，把别的物品增加到所有物品中
		{
			for(i in CAT_BUILDING_ITEMS)
				CAT_ALL_ITEMS.push(CAT_BUILDING_ITEMS[i]);

			for(i in CAT_DECORATION_ITEMS)
				CAT_ALL_ITEMS.push(CAT_DECORATION_ITEMS[i]);

			for(i in CAT_ARMOUR_ITEMS)
				CAT_ALL_ITEMS.push(CAT_ARMOUR_ITEMS[i]);

			for(i in CAT_TOOLS_ITEMS)
				CAT_ALL_ITEMS.push(CAT_TOOLS_ITEMS[i]);

			for(i in CAT_FOOD_ITEMS)
				CAT_ALL_ITEMS.push(CAT_FOOD_ITEMS[i]);

			for(i in CAT_DYES_ITEMS)
				CAT_ALL_ITEMS.push(CAT_DYES_ITEMS[i]);

			for(i in CAT_ITEMS_ITEMS)
				CAT_ALL_ITEMS.push(CAT_ITEMS_ITEMS[i]);

			//for(i in CAT_SPAWN_ITEMS)
			//CAT_ALL_ITEMS.push(CAT_SPAWN_ITEMS[i]);

			for(i in CAT_MISCELLANEOUS_ITEMS)
				CAT_ALL_ITEMS.push(CAT_MISCELLANEOUS_ITEMS[i]);
		}

		for(i in cat)
			addMenuItem(ctx, layout, cat[i].name, cat[i].id, cat[i].data);

		var subMenu = new android.widget.PopupWindow();
		var mlayout = makeMenu(ctx, subMenu, layout, false);
		subMenu.setContentView(mlayout);
		subMenu.setFocusable(true);
		subMenu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/3);
		subMenu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		subMenu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		subMenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
	}
	catch(err)
	{
		print("菜单加载失败，因为: "+err);
	}
}

function addMenuItem(ctx, layout, text, id, data)
{
	var button = new android.widget.Button(ctx);
	button.setText(text);
	//button.setWidth(100);
	//button.setHeight(100);
	button.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick:function(v)
		{
			if(Level.getGameMode() == 1)
			{
				Entity.setCarriedItem(getPlayerEnt(), id, 1, data);
			}
			else
			{
				openInfoDialogMenu(ctx, id, data);
			}
		}
	});
	layout.addView(button);
}

function openInfoDialogMenu(ctx, id, damage)
{
	try
	{
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);

		var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);

		var textParams2 = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		textParams2.setMargins(dip2px(ctx, 5), dip2px(ctx, 10), 0, 0);
		var title = new android.widget.TextView(ctx);
		title.setTextSize(20);
		title.setText("Too Many Items");
		title.setLayoutParams(textParams);
		layout.addView(title);
		var stitle = new android.widget.TextView(ctx);
		stitle.setTextSize(14);
		stitle.setText("添加物品...");
		stitle.setLayoutParams(textParams);
		layout.addView(stitle);

		var iidt = new android.widget.TextView(ctx);
		iidt.setTextSize(14);
		iidt.setText("物品 ID:");
		iidt.setLayoutParams(textParams2);
		layout.addView(iidt);

		var itemId = new android.widget.EditText(ctx);
		itemId.setText(id.toString());
		itemId.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layout.addView(itemId);

		var idmgt = new android.widget.TextView(ctx);
		idmgt.setTextSize(14);
		idmgt.setText("物品特殊值:");
		idmgt.setLayoutParams(textParams2);
		layout.addView(idmgt);

		var itemDmg = new android.widget.EditText(ctx);
		itemDmg.setText(damage.toString());
		itemDmg.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		layout.addView(itemDmg);

		var ict = new android.widget.TextView(ctx);
		ict.setTextSize(14);
		ict.setText("物品数量:");
		ict.setLayoutParams(textParams2);
		if(Level.getGameMode() != 1)
		{
			layout.addView(ict);
		}


		var itemCount = new android.widget.EditText(ctx);
		itemCount.setText("1");
		itemCount.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		if(Level.getGameMode() != 1)
		{
			layout.addView(itemCount);
		}


		var addBtnParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		addBtnParams.setMargins(0, dip2px(ctx, 10), 0, 0);

		var add = new android.widget.Button(ctx);
		add.setText("添加");
		add.setLayoutParams(addBtnParams);
		add.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				if(Level.getGameMode() == 1)
				{
					Entity.setCarriedItem(getPlayerEnt(), parseInt(itemId.getText()), 1,parseInt(itemDmg.getText()));
				}
				else
				{
					addId = parseInt(itemId.getText());
					addDmg = parseInt(itemDmg.getText());
					addCount = parseInt(itemCount.getText());
					Player.addItemInventory(addId, addCount, addDmg);
				}
			}
		});
		layout.addView(add);


		var fullstack = new android.widget.Button(ctx);
		fullstack.setText("添加一组");
		fullstack.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				itemCount.setText("64");
				addId = parseInt(itemId.getText());
				addDmg = parseInt(itemDmg.getText());
				addCount = parseInt(itemCount.getText());
				Player.addItemInventory(addId, addCount, addDmg);
			}
		});
		if(Level.getGameMode() != 1)
		{
			layout.addView(fullstack);
		}

		infoMenu = new android.widget.PopupWindow();
		var mlayout = makeMenu(ctx, infoMenu, layout, false);
		infoMenu.setContentView(mlayout);
		infoMenu.setFocusable(true);
		infoMenu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/3);
		infoMenu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
		infoMenu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
		infoMenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
	}
	catch(err)
	{
		print("菜单加载失败，因为: "+err);
	}
}

function showButtons()
{
	function updateTime()
	{
		var ltime = Level.getTime()-Math.floor(Level.getTime()/19200)*19200;
		day = ltime < (19200/2);
		timeBtn.setText(day?"白天":"夜晚");
	}
	function updateRunMode() 
	{
		if(running==0)
		{
			runBtn.setText("行走");
		}
		else if(running==1)
		{
			runBtn.setText("疾跑");
		}
		else if(running==2)
		{
			runBtn.setText("潜行");
		}
	};

	try
	{
		var scroll = new android.widget.HorizontalScrollView(ctx); 
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);

		var healBtn = new android.widget.Button(ctx);
		healBtn.setText(fullxp?"退出无敌":"恢复生命");
		healBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				if(fullxp)
				{
					fullxp=false;
					healBtn.setText(fullxp?"退出无敌":"恢复生命");
				}
				Entity.setHealth(getPlayerEnt(),20);
			}
		});
		healBtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
		{
onLongClick:function(v)
			{
				ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
				fullxp=!fullxp;
				Entity.setHealth(getPlayerEnt(),20);
				healBtn.setText(fullxp?"退出无敌":"恢复生命");
				return true;
			}
		});
		layout.addView(healBtn);

		var gamemodeBtn = new android.widget.Button(ctx);
		var currSurvival = Level.getGameMode();
		gamemodeBtn.setText(currSurvival?"创造":"生存");
		gamemodeBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				currSurvival=!currSurvival;
				Level.setGameMode(currSurvival);
				updateTime();
				gamemodeBtn.setText(currSurvival?"创造":"生存");
			}
		});
		layout.addView(gamemodeBtn);

		var day = true;
		var timeBtn = new android.widget.Button(ctx);
		timeBtn.setText("白天");
		timeBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				updateTime();
				try
				{
					var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 4);
					addToArray(arr,0,["日出","白天","日落","黑夜"]);

					var builder = new android.app.AlertDialog.Builder(ctx);
					builder.setTitle("切换时间");
					builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
					{
						onClick: 					function(dialog, which)
						{
								//time:209,5,3,29
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
					    print("打开菜单错误: "+err);
				}
			}
		});
		layout.addView(timeBtn);
		updateTime();

		var runBtn = new android.widget.Button(ctx);
		updateRunMode();
		runBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				if(running==0)
				{
					running=1;
					Xpos=Player.getX();
					Zpos=Player.getZ();
					runBtn.setText("疾跑");
				}
				else if(running!=0)
				{
					running=0;
					Entity.setSneaking(getPlayerEnt(),false);
					runBtn.setText("行走");
				}
			}
		});
		runBtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
		{
onLongClick:function(v)
			{
				ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
				if(running!=2)
				{
					running=2;
					Entity.setSneaking(getPlayerEnt(),true);
					runBtn.setText("潜行");
				}
				else if(running==2)
				{
					running=0;
					Entity.setSneaking(getPlayerEnt(),false);
					runBtn.setText("行走");
				}
				return true;
			}
		});
		layout.addView(runBtn);

		var homeBtn = new android.widget.Button(ctx);
		homeBtn.setText(existhome?"回到家":"设置家");
		homeBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				if(existhome)
				{
					Entity.setPosition(getPlayerEnt(), homex, homey, homez);
				}
				else
				{
					homex = Player.getX();  
					homey = Player.getY();
					homez = Player.getZ();
					existhome = true;
					homeBtn.setText("回到家");
					print("已经设置家。");
				}
			}
		});
		homeBtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
		{
onLongClick:function(v)
			{
				if(existhome)
				{
					ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
					existhome=false;
					homeBtn.setText("设置家");
					print("已经删除家。");
				}
				return true;
			}
		});
		layout.addView(homeBtn);

		var spawnBtn = new android.widget.Button(ctx);
		spawnBtn.setText("出生点");
		spawnBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());
				print("你的出生点已被设置为当前位置。");
			}
		});
		spawnBtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
		{
onLongClick:function(v)
			{
				ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
				Entity.setHealth(getPlayerEnt(),0);
				print("已保留物品自杀。");
				return true;
			}
		});
		layout.addView(spawnBtn);

		var bombBtn = new android.widget.Button(ctx);
		bombBtn.setText(existbomb?"引爆":"炸弹");
		bombBtn.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				if(existbomb)
				{
					Level.explode(sbx, sby, sbz, radium);
					existbomb=false;
					print("引爆成功！");
					bombBtn.setText("炸弹");
				}
				else
				{
					sbx = Player.getX(); 
					sby = Player.getY();
					sbz = Player.getZ();
					existbomb=true;
					bombBtn.setText("引爆");
				}
			}
		});
		bombBtn.setOnLongClickListener(new android.view.View.OnLongClickListener()
		{
onLongClick:function(v)
			{
				ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
				existbomb=false;
				bombBtn.setText("炸弹");
				try
				{
					var layout1 = new android.widget.LinearLayout(ctx);
					layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

					var scroll=new android.widget.ScrollView(ctx);
					scroll.addView(layout1);

					var dialog = new android.app.Dialog(ctx);
					dialog.setContentView(scroll);
					dialog.setTitle("输入默认爆炸直径");

					var edit1 = new android.widget.EditText(ctx);
					edit1.setHint("请输入爆炸直径");
					edit1.setText(radium.toString());
					edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
					layout1.addView(edit1);

					var button1 = new android.widget.Button(ctx);
					button1.setText("确认");
					button1.setOnClickListener(new android.view.View.OnClickListener()
					{
onClick: 				function(p1)
						{
							dialog.dismiss();
							radium=parseInt(edit1.getText());
							print("已保存。");
						}
					});
					layout1.addView(button1);

					dialog.show();
				}
				catch(err)
				{
					    print("打开菜单错误: "+err);
				}
				return true;
			}
		});
		layout.addView(bombBtn);

		var more = new android.widget.Button(ctx);
		more.setText("...");
		more.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(v)
			{
				openMore(ctx, more.getLeft(), more.getTop()+more.getHeight());
			}
		});
		layout.addView(more);

		scroll.addView(layout);
		btnMenu = new android.widget.PopupWindow(scroll, ctx.getWindowManager().getDefaultDisplay().getWidth()/3*2, dip2px(ctx,55));
		btnMenu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		//btnMenu.setFocusable(true);
		//menu.setContentView(layout);
		//menu.setWidth(-2);
		//menu.setHeight(-2);
		btnMenu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
	}
	catch(err)
	{
		print("无法打开菜单: "+err);
	}
}

function buildTool()
{
	if(buildmode!=0)
	{
		buildmode=0;
		submode=0;
		print("取消建造。");
	}
	if(makeroad)
	{
		makeroad=false;
		print("停止铺路。");
	}
	spawnOnTap=-1;
	replaceblock=0;
	replacedamage=0;
	pastedir=0;
	nopasteair=0;
	nopastewater=0;
	nopastelava=0;
	nocover=0;

	try
	{
		var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 7);
		addToArray(arr, 0, ["脱离窒息", "编辑告示牌", "铺路", "连线/长方体", "金字塔/球等", "替换", "复制/粘贴"]);

		var builder = new android.app.AlertDialog.Builder(ctx);
		builder.setTitle("建造助手");
		builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
		{
onClick: 	function(dialog, which)
			{
				if(which == 0)
				{
					var x=parseInt(Player.getX());
					var y=parseInt(Player.getY());
					var z=parseInt(Player.getZ());
					for(var i=0; i<128; i++)
					{
						if(getTile(x,y+i,z)==0)
						{
							Entity.setPosition(getPlayerEnt(),x+0.5,y+i+1,z+0.5);
							print("成功脱离。");
							break;
						}
					}
				}
				else if(which == 1)
				{
					buildmode=20;
					submode=1;
					print("请点击一个告示牌，点击建造助手按钮取消。");
				}
				else if(which == 2)
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog = new android.app.Dialog(ctx);
						dialog.setContentView(scroll);
						dialog.setTitle("铺路");

						var checkbox1 = new android.widget.CheckBox(ctx);
						checkbox1.setText("使用固定方块铺路：");
						layout1.addView(checkbox1);

						var layout2=new android.widget.LinearLayout(ctx);
						layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
						layout1.addView(layout2);

						var edit1 = new android.widget.EditText(ctx);
						edit1.setHint("请输入方块id          ");
						edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit1);

						var edit2 = new android.widget.EditText(ctx);
						edit2.setHint("方块特殊值");
						edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit2);

						checkbox1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
						{
onCheckedChanged: 			function(v,c)
							{
								if(c)
								{
									edit1.setText(Player.getCarriedItem().toString());
									edit2.setText(Player.getCarriedItemData().toString());
								}
								else
								{
									edit1.setText("");
									edit2.setText("");
								}	
							}
						});
						checkbox1.setChecked(usesameid);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								makeroad=true;
								usesameid=checkbox1.isChecked();
								buildid=parseInt(edit1.getText());
								builddmg=parseInt(edit2.getText());
								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
				else if(which == 3)
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog = new android.app.Dialog(ctx);
						dialog.setContentView(scroll);
						dialog.setTitle("连线/长方体");

						var spinner1=new android.widget.Spinner(ctx);
						var str=["连线", "实心长方体", "空心长方体", "长方体框架"];
						spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
						layout1.addView(spinner1);

						var checkbox1 = new android.widget.CheckBox(ctx);
						checkbox1.setText("持续建造");
						checkbox1.setChecked(keepbuild);
						layout1.addView(checkbox1);

						var checkbox2 = new android.widget.CheckBox(ctx);
						checkbox2.setText("使用指定方块建造：");
						layout1.addView(checkbox2);

						var layout2=new android.widget.LinearLayout(ctx);
						layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
						layout1.addView(layout2);

						var edit1 = new android.widget.EditText(ctx);
						edit1.setHint("请输入方块id          ");
						edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit1);

						var edit2 = new android.widget.EditText(ctx);
						edit2.setHint("方块特殊值");
						edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit2);

						checkbox2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
						{
onCheckedChanged: 			function(v,c)
							{
								if(c)
								{
									edit1.setText(Player.getCarriedItem().toString());
									edit2.setText(Player.getCarriedItemData().toString());
								}
								else
								{
									edit1.setText("");
									edit2.setText("");
								}	
							}
						});
						checkbox2.setChecked(usesameid);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								var choice=spinner1.getSelectedItemId();
								if(choice==0)
								{
									buildmode=1;
								}
								else if(choice==1)
								{
									buildmode=2;
								}
								else if(choice==2)
								{
									buildmode=3;
								}
								else if(choice==3)
								{
									buildmode=4;
								}
								submode=1;
								keepbuild=checkbox1.isChecked();
								usesameid=checkbox2.isChecked();
								buildid=parseInt(edit1.getText());
								builddmg=parseInt(edit2.getText());
								print("请点击第一个方块，点击建造助手按钮取消。");
								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
				else if(which == 4)
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog = new android.app.Dialog(ctx);
						dialog.setContentView(scroll);
						dialog.setTitle("金字塔/球等");

						var spinner1=new android.widget.Spinner(ctx);
						var str=["金字塔", "正八面体", "球", "平行x轴圆", "平行y轴圆", "平行z轴圆"];
						spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
						layout1.addView(spinner1);

						var edit0 = new android.widget.EditText(ctx);
						edit0.setHint("请输入半径");
						edit0.setText(sphererad.toString());
						edit0.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout1.addView(edit0);

						var checkbox1 = new android.widget.CheckBox(ctx);
						checkbox1.setText("持续建造");
						checkbox1.setChecked(keepbuild);
						layout1.addView(checkbox1);

						var checkbox2 = new android.widget.CheckBox(ctx);
						checkbox2.setText("空心");
						checkbox2.setChecked(false);
						layout1.addView(checkbox2);

						var checkbox3 = new android.widget.CheckBox(ctx);
						checkbox3.setText("使用指定方块建造：");
						layout1.addView(checkbox3);

						var layout2=new android.widget.LinearLayout(ctx);
						layout2.setOrientation(android.widget.LinearLayout.HORIZONTAL); 
						layout1.addView(layout2);

						var edit1 = new android.widget.EditText(ctx);
						edit1.setHint("请输入方块id          ");
						edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit1);

						var edit2 = new android.widget.EditText(ctx);
						edit2.setHint("方块特殊值");
						edit2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout2.addView(edit2);

						checkbox3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
						{
onCheckedChanged: 			function(v,c)
							{
								if(c)
								{
									edit1.setText(Player.getCarriedItem().toString());
									edit2.setText(Player.getCarriedItemData().toString());
								}
								else
								{
									edit1.setText("");
									edit2.setText("");
								}	
							}
						});
						checkbox3.setChecked(usesameid);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								var choice=spinner1.getSelectedItemId(),un=checkbox2.isChecked();
								submode=1;
								if(choice==0&&un==true)
								{
									buildmode=10;
								}
								else if(choice==0&&un==false)
								{
									buildmode=9;
								}
								else if(choice==1&&un==true)
								{
									buildmode=10;
								}
								else if(choice==1&&un==false)
								{
									buildmode=9;
								}
								else if(choice==2&&un==true)
								{
									buildmode=8;
								}
								else if(choice==2&&un==false)
								{
									buildmode=7;
								}
								else if(choice>=3&&choice<=5)
								{
									if(un)
									{
										buildmode=5;
									}
									else
									{
										buildmode=6;
									}
									submode=choice-2;
								}
								keepbuild=checkbox1.isChecked();
								usesameid=checkbox3.isChecked();
								buildid=parseInt(edit1.getText());
								builddmg=parseInt(edit2.getText());
								sphererad=parseInt(edit0.getText());
								print("请点击一个方块作为中心，点击建造助手按钮取消。");
								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
			}
		});
		builder.show();
	}
	catch(err)
	{
		print("打开菜单错误: "+err);
	}
}

function mobTool()
{
	if(entityctrl!=0||ride==true)
	{
		entityctrl=0;
		ride=false;
		print("取消管理生物。");
	}
	if(spawnOnTap!=-1)
	{
		spawnOnTap=-1;
		print("停止生成实体。");
	}

	try
	{
		var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 4);
		addToArray(arr, 0, ["骑乘生物","生成实体","攻击生物的操作","集体管理实体"]);

		var builder = new android.app.AlertDialog.Builder(ctx);
		builder.setTitle("生物管理");
		builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
		{
onClick: 	function(dialog, which)
			{
				if(which == 0)
				{
					ride = true;
					print("点击你想要骑的生物，点击生物管理按钮取消操作。");
				}
				else if(which == 1)
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
						var str=["鸡", "牛", "猪", "羊","僵尸", "苦力怕", "骷髅", "蜘蛛", "僵尸猪人", "矿车", "激活的TNT", "箭", "雪球", "鸡蛋"];
						spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
						layout1.addView(spinner1);

						var edit1 = new android.widget.EditText(ctx);
						edit1.setHint("请输入生成实体数量");
						edit1.setText(spawncount.toString());
						edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
						layout1.addView(edit1);

						var checkbox1 = new android.widget.CheckBox(ctx);
						checkbox1.setText("点击方块生成实体");
						checkbox1.setChecked(false);
						layout1.addView(checkbox1);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								spawncount=parseInt(edit1.getText());
								if(checkbox1.isChecked()==false)
								{
									for (var i=0; i<spawncount; i++)
									{
										Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), name2id(spinner1.getSelectedItem()));
									}
								}
								else
								{
									buildmode=0;
									submode=0;
									spawnOnTap=name2id(spinner1.getSelectedItem());
									print("点击方块生成实体，点击生物管理按钮停止。");
								}
								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
				else if(which == 2)
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog = new android.app.Dialog(ctx);
						dialog.setContentView(scroll);
						dialog.setTitle("攻击生物的操作");

						var spinner1=new android.widget.Spinner(ctx);
						var str=["一击杀死生物", "攻击生物着火", "改变动物生长阶段", "让两个生物骑乘", "生物血量改为10","生物血量改为20", "生物血量改为40"];
						spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
						layout1.addView(spinner1);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								var choice=spinner1.getSelectedItemId();
								if(choice==0)
								{
									entityctrl=3;
									print("一击杀死生物开启，点击生物管理按钮关闭。");
								}
								else if(choice==1)
								{
									entityctrl=4;
									print("点击生物让它着火，点击生物管理按钮关闭功能。");
								}
								else if(choice==2)
								{
									entityctrl=5;
									print("点击动物修改生长阶段，点击生物管理按钮关闭功能。");
								}
								else if(choice==3)
								{
									entityctrl=1;
									print("依次点击两个生物让他们骑乘，点击生物管理按钮取消操作。");
								}
								else if(choice==4)
								{
									entityctrl=6;
									print("点击生物将血量改为10，点击生物管理按钮关闭功能。");
								}
								else if(choice==5)
								{
									entityctrl=7;
									print("点击生物将血量改为20，点击生物管理按钮关闭功能。");
								}
								else if(choice==6)
								{
									entityctrl=8;
									print("点击生物将血量改为40，点击生物管理按钮关闭功能。");
								}

								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
				else if(which == 3)
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog = new android.app.Dialog(ctx);
						dialog.setContentView(scroll);
						dialog.setTitle("集体管理实体");

						var spinner1=new android.widget.Spinner(ctx);
						var str=["移除实体", "让生物着火", "改变动物生长阶段为幼儿", "改变动物生长阶段为成体", "生物血量变为10","生物血量变为20", "生物血量变为40"];
						var str2=new Array();
						spinner1.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str));
						spinner1.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener()    
						{
onItemSelected: 			function(f,v,p,id)
							{
								if(id==0)
								{
									str2=["鸡", "牛", "猪", "羊","僵尸", "苦力怕", "骷髅", "蜘蛛", "僵尸猪人", "矿车", "激活的TNT", "箭", "雪球", "鸡蛋", "画", "掉落的物品"];
								}
								else if(id>=2&&id<=3)
								{
									str2=["鸡", "牛", "猪", "羊",];
								}
								else if(id==1|| (id>=4&&id<=6) )
								{
									str2=["鸡", "牛", "猪", "羊","僵尸", "苦力怕", "骷髅", "蜘蛛", "僵尸猪人"];
								}
								spinner2.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str2));
							}
						});
						layout1.addView(spinner1);

						var spinner2=new android.widget.Spinner(ctx);
						spinner2.setAdapter(new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,str2));
						layout1.addView(spinner2);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								var choice=spinner1.getSelectedItemId(),entid=name2id(spinner2.getSelectedItem());

								if(choice==0)
								{
									killAll(entid);
								}
								else if(choice==1)
								{
									fireAll(entid,20);
								}
								else if(choice==2)
								{
									ageAll(entid,-24000);
								}
								else if(choice==3)
								{
									ageAll(entid,0);
								}
								else if(choice==4)
								{
									healAll(entid,10);
								}
								else if(choice==5)
								{
									healAll(entid,20);
								}
								else if(choice==6)
								{
									healAll(entid,40);
								}

								dialog.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog.show();
					}
					catch(err)
					{
						print("打开菜单错误: "+err);
					}
				}
			}
		});
		builder.show();
	}
	catch(err)
	{
		print("错误："+err);
	}
}

function aboutWindow()
{
	try
	{
		var layout1 = new android.widget.LinearLayout(ctx);
		layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

		var scroll=new android.widget.ScrollView(ctx);
		scroll.addView(layout1);

		var dialog = new android.app.Dialog(ctx);
		dialog.setContentView(scroll);
		dialog.setTitle("帮助与说明");
		
		var btntitle = new android.widget.Button(ctx);
		btntitle.setTextSize(20);
		btntitle.setTextColor(android.graphics.Color.argb(255,190,255,185));
		btntitle.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
		btntitle.setText("TooManyItems  by MrARM");
		layout1.addView(btntitle);

		var title = new android.widget.TextView(ctx);
		title.setTextSize(16);
		title.setTextColor(android.graphics.Color.argb(255,230,255,215));
		title.setText("      yyf1069107050加入了游戏模式、时间等功能。\n      2639439加入了疾跑、回家、建造助手、生物管理等强大功能，并且修订了0.8物品和技术方块。");
		layout1.addView(title);  

		var btn1 = new android.widget.Button(ctx);
		btn1.setText("功能说明");
		btn1.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(p1)
			{
				try
				{
					var layout2 = new android.widget.LinearLayout(ctx);
					layout2.setOrientation(android.widget.LinearLayout.VERTICAL);

					var scroll2=new android.widget.ScrollView(ctx);
					scroll2.addView(layout2);

					var dialog2 = new android.app.Dialog(ctx);
					dialog2.setContentView(scroll2);
					dialog2.setTitle("功能说明");

					var btntitle2 = new android.widget.Button(ctx);
					btntitle2.setTextSize(18);
					btntitle2.setTextColor(android.graphics.Color.argb(255,200,255,195));
					btntitle2.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
					btntitle2.setText("部分功能补充说明：");
					layout2.addView(btntitle2);

					var title2 = new android.widget.TextView(ctx);
					title2.setTextSize(15);
					title2.setTextColor(android.graphics.Color.argb(255,240,255,225));
					title2.setText(
						"长按菜单按钮后可以拖动按钮。\n\n"+
						"添加物品中，部分是0.8物品，带*号的是技术性方块。\n"+
						"创造模式中不能修改物品数量。\n\n"+
						"长按恢复生命按钮进入无敌模式。\n"+
						"长按行走/疾跑按钮进入潜行模式。\n"+
						"长按回到家按钮删除家。\n"+
						"长按出生点按钮保留物品自杀(回到出生点)。\n"+
						"长按炸弹按钮删除炸弹并设置默认爆炸直径。\n\n"+
						"如果进入关卡时是创造模式，无法使用白天/夜晚功能。\n"+
						"炸弹的爆炸直径取决于设置的默认爆炸直径。\n\n"+
						"玩家骑乘生物时，生物会向玩家面对的方向走。\n"+
						"一击杀死生物会让生物被烧死。\n\n"+
						"如果不拿东西创建几何体，则会用空气填充。\n"+
						"无法复制牌子、箱子和熔炉中的内容。\n"
						);
					layout2.addView(title2);  

					var sbtn1 = new android.widget.Button(ctx);
					sbtn1.setText("确认");
					sbtn1.setOnClickListener(new android.view.View.OnClickListener()
					{
onClick: 				function(p1)
						{
							dialog2.dismiss();
						}
					});
					layout2.addView(sbtn1);

					dialog2.show();
					dialog2.getWindow().setLayout(dip2px(ctx,420), dip2px(ctx,280));
				}
				catch(err)
				{
					    print("打开菜单错误: "+err);
				}
			}
		});
		layout1.addView(btn1);

		var btn2 = new android.widget.Button(ctx);
		btn2.setText("确认");
		btn2.setOnClickListener(new android.view.View.OnClickListener()
		{
onClick: 	function(p1)
			{
				dialog.dismiss();
			}
		});
		layout1.addView(btn2);

		dialog.show();
		dialog.getWindow().setLayout(dip2px(ctx,420), dip2px(ctx,280));
	}
	catch(err)
	{
		    print("打开菜单错误: "+err);
	}
}

function openMore(ctx, x, y)
{
	//var menu = new android.widget.PopupWindow();
	//menu.setFocusable(true);
	//btnMenuSub = menu;

	var scroll = new android.widget.ScrollView(ctx);
	var layout = new android.widget.LinearLayout(ctx);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);


	var buildBtn = new android.widget.Button(ctx);
	buildBtn.setText("建造助手");
	buildBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			buildmode=0;
			submode=0;
			makeroad=false;
			spawnOnTap = -1;
			replaceblock=0;
			replacedamage=0;
			pastedir=0;
			nopasteair=0;
			nopastewater=0;
			nopastelava=0;
			nocover=0;

			try
			{
				var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 8);
				arr[0] = "铺路";
				arr[1] = "两点间连线";
				arr[2] = "脱离窒息";
				arr[3] = "编辑告示牌";
				arr[4] = "长方体/金字塔";
				arr[5] = "圆/球";
				arr[6] = "替换";
				arr[7] = "复制/粘贴";

				var builder = new android.app.AlertDialog.Builder(ctx);
				builder.setTitle("建造助手");
				builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
				{
onClick: function(dialog, which)
					{
						if(which == 0)
						{
							makeroad = true;
							print("正在使用拿着的方块铺路，点击建造助手按钮停止铺路。");
						}
						else if(which == 1)
						{
							buildmode = 1;
							submode=1;
							print("请点击第一个方块，点击建造助手按钮取消。");
						}
						else if(which==2)
						{
							var x=parseInt(Player.getX());
							var y=parseInt(Player.getY());
							var z=parseInt(Player.getZ());
							for(var i=0; i<512; i++)
							{
								if(getTile(x,y+i,z)==0)
								{
									Entity.setPosition(getPlayerEnt(),x+0.5,y+i+1,z+0.5);
									print("成功脱离。");
									break;
								}
							}
						}
						else if(which == 3)
						{
							buildmode = 20;
							submode=1;
							print("请点击一个告示牌，点击建造助手按钮取消。");
						}
						else if (which==4)
						{
							try
							{
								var arre = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 5);

								addToArray(arre, 0, ["实心长方体", "空心长方体", "长方体框架", "金字塔","空心金字塔"]);

								var builder2 = new android.app.AlertDialog.Builder(ctx);
								builder2.setTitle("长方体/金字塔");
								builder2.setItems(arre, new android.content.DialogInterface.OnClickListener()
								{
onClick:  							function(dialog, which2)
									{
										if(which2==0)
										{
											buildmode = 2;
											submode=1;
											print("请点击第一个方块，点击建造助手按钮取消。");
										}
										else if(which2==1)
										{
											buildmode = 3;
											submode=1;
											print("请点击第一个方块，点击建造助手按钮取消。");
										}
										else if(which2==2)
										{
											buildmode = 4;
											submode=1;
											print("请点击第一个方块，点击建造助手按钮取消。");
										}
										else if(which2==3||which2==4)
										{
											buildmode=(which2==3?9:10);
											submode=1;
											print("请点击一个方块作为金字塔底面中心，点击建造助手按钮取消。");

											try
											{
												var tmiLayout = new android.widget.LinearLayout(ctx);
												tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

												var iph = new android.widget.EditText(ctx);
												iph.setHint("请输入半径");
												iph.setText(""+pyramidrad);
												iph.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
												tmiLayout.addView(iph);

												var tmiDialog = new android.app.Dialog(ctx);
												tmiDialog.setContentView(tmiLayout);
												tmiDialog.setTitle("输入金字塔的半径");

												var add = new android.widget.Button(ctx);
												add.setText("确认");
												tmiLayout.addView(add);

												add.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(p1)
													{
														pyramidrad=parseInt(iph.getText());
														tmiDialog.dismiss();
													}
												});
												tmiDialog.show();
											}
											catch(err)
											{
												print("无法打开菜单："+err);
											}
										}
									}
								});
								builder2.show();
							}
							catch(err)
							{
								    print("打开菜单错误: "+err);
							}
						}
						else if(which==5)
						{
							try
							{
								var arre = java.lang.reflect.Array.newInstance(java.lang.CharSequence,8);

								addToArray(arre, 0, ["x轴圆环", "y轴圆环", "z轴圆环", "x轴圆",  "y轴圆",  "z轴圆", "球", "空心球"]);

								var builder2 = new android.app.AlertDialog.Builder(ctx);
								builder2.setTitle("圆/球");
								builder2.setItems(arre, new android.content.DialogInterface.OnClickListener()
								{
onClick:  							function(dialog, which2)
									{
										if(which2>=0&&which2<=2)
										{
											buildmode = 5;
											submode=1+which2;
											print("请点击一个方块作为圆心，点击建造助手按钮取消。");
										}
										else if(which2>=3&&which2<=5)
										{
											buildmode =6;
											submode=which2-2;
											print("请点击一个方块作为圆心，点击建造助手按钮取消。");
										}
										else if(which2==6)
										{
											buildmode = 7;
											submode=1;
											print("请点击一个方块作为球心，点击建造助手按钮取消。");
										}
										else if(which2==7)
										{
											buildmode = 8;
											submode=1;
											print("请点击一个方块作为球心，点击建造助手按钮取消。");
										}

										try
										{
											var tmiLayout = new android.widget.LinearLayout(ctx);
											tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

											var iph = new android.widget.EditText(ctx);
											iph.setHint("请输入半径");
											iph.setText(""+sphererad);
											iph.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
											tmiLayout.addView(iph);

											var tmiDialog = new android.app.Dialog(ctx);
											tmiDialog.setContentView(tmiLayout);
											tmiDialog.setTitle("输入圆/球的半径");

											var add = new android.widget.Button(ctx);
											add.setText("确认");
											tmiLayout.addView(add);

											add.setOnClickListener(new android.view.View.OnClickListener()
											{
onClick: 										function(p1)
												{
													sphererad=parseInt(iph.getText());
													tmiDialog.dismiss();
												}
											});
											tmiDialog.show();
										}
										catch(err)
										{
											print("无法打开菜单："+err);
										}

									}
								});
								builder2.show();
							}
							catch(err)
							{
								    print("打开菜单错误: "+err);
							}
						}
						else if(which==6)
						{
							buildmode = 25;
							submode=1;
							print("请用将要替换的方块点击第一个顶点，点击建造助手按钮取消。");
						}
						else if(which==7)
						{
							try
							{
								var arre = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 5);

								addToArray(arre, 0, ["复制", "粘贴", "高级粘贴", "导出剪贴板","导入剪贴板"]);

								var builder2 = new android.app.AlertDialog.Builder(ctx);
								builder2.setTitle("复制/粘贴");
								builder2.setItems(arre, new android.content.DialogInterface.OnClickListener()
								{
onClick:  							function(dialog, which2)
									{
										if(which2==0)
										{
											buildmode = 30;
											submode=1;
											print("请点击第一个方块，点击建造助手按钮取消。");
										}
										else if(which2==1)
										{
											buildmode = 31;
											submode=1;
											print("请点击一个方块粘贴，点击建造助手按钮取消。");
										}
										else if(which2==2)
										{
											try
											{
												var nopasteair1=0;
												var nopastewater1=0;
												var nopastelava1=0;
												var nocover1=0;

												var tmiLayout = new android.widget.LinearLayout(ctx);
												tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

												var tmiDialog = new android.app.Dialog(ctx);
												tmiDialog.setContentView(tmiLayout);
												tmiDialog.setTitle("粘贴选项");

												var C1 = new android.widget.CheckBox(ctx);
												C1.setText("不粘贴空气");
												C1.setChecked(false);
												C1.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
												{
onCheckedChanged: 									function(v, checked)
													{
														nopasteair1=checked;
													}
												});
												tmiLayout.addView(C1);

												var C2 = new android.widget.CheckBox(ctx);
												C2.setText("不粘贴水");
												C2.setChecked(false);
												C2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
												{
onCheckedChanged: 									function(v, checked)
													{
														nopastewater1=checked;
													}
												});
												tmiLayout.addView(C2);

												var C3 = new android.widget.CheckBox(ctx);
												C3.setText("不粘贴岩浆");
												C3.setChecked(false);
												C3.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
												{
onCheckedChanged: 									function(v, checked)
													{
														nopastelava1=checked;
													}
												});
												tmiLayout.addView(C3);

												var C4 = new android.widget.CheckBox(ctx);
												C4.setText("不覆盖原有方块");
												C4.setChecked(false);
												C4.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener()
												{
onCheckedChanged: 									function(v, checked)
													{
														nocover1=checked;
													}
												});
												tmiLayout.addView(C4);

												var add1=new android.widget.Button(ctx);
												add1.setText("确认");
												add1.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(v)
													{
														tmiDialog.dismiss();
														var aarr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 10);
														addToArray(aarr, 0, ["不旋转","y轴90度","y轴180度","y轴270度","x轴90度","x轴180度","x轴270度","z轴90度","z轴180度","z轴270度"]);

														try
														{
															var builder3 = new android.app.AlertDialog.Builder(ctx);
															builder3.setTitle("旋转角度");
															builder3.setItems(aarr, new android.content.DialogInterface.OnClickListener()
															{
onClick: 														function(dialog3, which3)
																{
																	pastedir=which3;
																	buildmode = 32;
																	submode=1;
																	nopasteair=nopasteair1;
																	nopastewater=nopastewater1;
																	nopastelava=nopastelava1;
																	nocover=nocover1;
																	print("请点击一个方块粘贴，点击建造助手按钮取消。");
																}
															});
															builder3.show();
														}
														catch(err)
														{
															    print("打开菜单错误: "+err);
														}
													}
												})
												tmiLayout.addView(add1);

												tmiDialog.show();
											}
											catch(err)
											{
												print("无法打开菜单："+err);
											}
										}
										else if(which2==3)
										{
											try
											{
												var tmiLayout = new android.widget.LinearLayout(ctx);
												tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

												var ts=new android.widget.TextView(ctx);
												ts.setTextSize(15);
												ts.setText("可以复制或粘贴文件到别处。文件位置：\n/sdcard/games/com.mojang/*.block");
												tmiLayout.addView(ts);

												var iph = new android.widget.EditText(ctx);
												iph.setHint("请输入文件名");
												iph.setText("");
												iph.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
												tmiLayout.addView(iph);

												var tmiDialog = new android.app.Dialog(ctx);
												tmiDialog.setContentView(tmiLayout);
												tmiDialog.setTitle("导出剪贴板到文件");

												var layout1=new android.widget.LinearLayout(ctx);

												var add1=new android.widget.Button(ctx);
												add1.setText("确认");
												add1.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(v)
													{
														if(blockgroup!=false)
														{
															saveblocks(iph.getText()+".block");
															print("导出完成。");
														}
														else
														{
															print("剪贴板为空。");
														}
														tmiDialog.dismiss();
													}
												});
												layout1.addView(add1);

												var add2=new android.widget.Button(ctx);
												add2.setText("取消");
												add2.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(v)
													{
														tmiDialog.dismiss();
													}
												});
												layout1.addView(add2);

												tmiLayout.addView(layout1);

												tmiDialog.show();
											}
											catch(err)
											{
												print("无法打开菜单："+err);
											}
										}
										else if(which2==4)
										{
											try
											{
												var tmiLayout = new android.widget.LinearLayout(ctx);
												tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

												var ts=new android.widget.TextView(ctx);
												ts.setTextSize(15);
												ts.setText("输入的文件名不含.block扩展名。文件位置：\n/sdcard/games/com.mojang/*.block");
												tmiLayout.addView(ts);

												var iph = new android.widget.EditText(ctx);
												iph.setHint("请输入文件名");
												iph.setText("");
												iph.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
												tmiLayout.addView(iph);

												var tmiDialog = new android.app.Dialog(ctx);
												tmiDialog.setContentView(tmiLayout);
												tmiDialog.setTitle("从文件导入剪贴板");

												var layout1=new android.widget.LinearLayout(ctx);

												var add1=new android.widget.Button(ctx);
												add1.setText("确认");
												add1.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(v)
													{
														readblocks(iph.getText()+".block");
														tmiDialog.dismiss();
													}
												});
												layout1.addView(add1);

												var add2=new android.widget.Button(ctx);
												add2.setText("取消");
												add2.setOnClickListener(new android.view.View.OnClickListener()
												{
onClick: 											function(v)
													{
														tmiDialog.dismiss();
													}
												});
												layout1.addView(add2);

												tmiLayout.addView(layout1);

												tmiDialog.show();
											}
											catch(err)
											{
												print("无法打开菜单："+err);
											}
										}
									}
								});
								builder2.show();
							}
							catch(err)
							{
								    print("打开菜单错误: "+err);
							}
						}
					}
				});
				builder.show();
			}
			catch(err)
			{
				print("错误："+err);
			}
		}
	});
	layout.addView(buildBtn);



	var FullXP = new android.widget.Button(ctx);
	FullXP.setText(fullxp?"取消无敌":"开启无敌");
	FullXP.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			fullxp=!fullxp;
			Player.setHealth(20);
			FullXP.setText(fullxp?"取消无敌":"开启无敌");
		}
	});
	layout.addView(FullXP);

	var runBtn = new android.widget.Button(ctx);
	runBtn.setText(running?"行走":"奔跑");
	runBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			running=!running;
			runBtn.setText(running?"行走":"奔跑");
		}
	});
	layout.addView(runBtn);

	var bombBtn = new android.widget.Button(ctx);
	bombBtn.setText(existbomb?"引爆炸弹":"设置炸弹");
	bombBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			if(existbomb)
			{
				Level.explode(sbx, sby, sbz, radium);
				print("引爆成功！");
				existbomb=false;
			}
			else
			{
				sbx = Player.getX();             //保存坐标
				sby = Player.getY();
				sbz = Player.getZ();
				existbomb=true;
				print("已设置炸弹。");
			}
			bombBtn.setText(existbomb?"引爆炸弹":"设置炸弹");
		}
	});
	layout.addView(bombBtn);


	var explodeBtn = new android.widget.Button(ctx);
	explodeBtn.setText("爆炸");
	explodeBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick:function(v)
		{
			try
			{
				var tmiLayout = new android.widget.LinearLayout(ctx);
				tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

				var edit1 = new android.widget.EditText(ctx);
				edit1.setHint("请输入爆炸直径");
				edit1.setText(""+radium);
				edit1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
				tmiLayout.addView(edit1);

				var tmiDialog = new android.app.Dialog(ctx);
				tmiDialog.setContentView(tmiLayout);
				tmiDialog.setTitle("输入默认爆炸直径");

				var layout1=new android.widget.LinearLayout(ctx);

				var add = new android.widget.Button(ctx);
				add.setText("确认");
				layout1.addView(add);

				add.setOnClickListener(new android.view.View.OnClickListener()
				{
onClick: 			function(p1)
					{
					    tmiDialog.dismiss();
						radium=parseInt(edit1.getText());
						Level.explode(Player.getX(), Player.getY(), Player.getZ(),  radium );
						print("boom~已爆炸~");
					}
				});

				var add2 = new android.widget.Button(ctx);
				add2.setText("不爆炸，设置为默认直径");
				layout1.addView(add2);

				add2.setOnClickListener(new android.view.View.OnClickListener()
				{
onClick:    		function(p1)
					{
					    tmiDialog.dismiss();
						radium=parseInt(edit1.getText());
						print("设置完毕。");
					}
				});

				tmiLayout.addView(layout1);

				tmiDialog.show();
			}
			catch(err)
			{
				    print("打开菜单错误: "+err);
			}
		}
	});
	layout.addView(explodeBtn);

	var killBtn = new android.widget.Button(ctx);
	killBtn.setText("保留物品自杀");
	killBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			Player.setHealth(0);
		}
	});
	layout.addView(killBtn);

	var homeBtn = new android.widget.Button(ctx);
	homeBtn.setText("设置家");
	homeBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick: function(v)
		{
			homex = Player.getX();             //保存坐标
			homey = Player.getY();
			homez = Player.getZ();
			existhome = true;
			print("已经设置家。");
		}
	});
	layout.addView(homeBtn);

	

	var aboutBtn = new android.widget.Button(ctx);
	aboutBtn.setText("说明");
	aboutBtn.setOnClickListener(new android.view.View.OnClickListener()
	{
onClick:function(v)
		{
			try
			{
				var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence,14);

				addToArray(arr, 0, [
					"       TooManyItems  作者：MrARM",
					"    改编：yyf1069107050，2639439",
					"  部分功能补充说明：",
					"添加物品中，部分是0.8物品，带*号的是技术性方块，可能导致崩溃。",
					"如果进入关卡时是创造模式，无法使用白天/夜晚功能。",
					"炸弹的直径取决于上次设置的默认爆炸直径。",
					"玩家骑乘生物时，生物会向玩家面对的方向走。",
					"一击杀死生物会让生物被烧死。",
					"可以让被骑着的生物骑另一只生物。",
					"管理掉落的物品时有时会失灵。",
					"如果不拿东西创建几何体会用空气填充。",
					"在告示牌中输入‘§数字0-f’会让后面的文本变色。",
					"无法复制牌子、箱子和熔炉中的内容。",
					"高级粘贴的速度比普通粘贴慢。"
				]);

				var builder = new android.app.AlertDialog.Builder(ctx);
				builder.setTitle("说明");
				builder.setItems(arr, new android.content.DialogInterface.OnClickListener()
				{
onClick: function(dialog, which)
					{
					}
				});
				builder.show();
			}
			catch(err)
			{
				    print("打开菜单错误: "+err);
			}
		}
	});
	layout.addView(aboutBtn);


	scroll.addView(layout);

	btnMenuSub = new android.widget.PopupWindow(scroll, dip2px(ctx,150), dip2px(ctx,250));
	btnMenuSub.setFocusable(true);
	//btnMenuSub.setContentView(layout);
	//btnMenuSub.setWidth(dip2px(ctx,150));
	//btnMenuSub.setHeight(dip2px(ctx,250));
	btnMenuSub.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
	btnMenuSub.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x, y);
}


function addToArray(arr, sindex, entries)
{
	for(var i=0;i<entries.length;i++)
		arr[sindex+i] = entries[i];
}

function name2id(name)
{
	if(name == "鸡") return 10;
	if(name == "牛") return 11;
	if(name == "猪") return 12;
	if(name == "羊") return 13;

	if(name == "僵尸") return 32;
	if(name == "苦力怕") return 33;
	if(name == "骷髅") return 34;
	if(name == "蜘蛛") return 35;
	if(name == "僵尸猪人") return 36;

	if(name == "激活的TNT") return 65;
	if(name == "箭") return 80;
	if(name == "雪球") return 81;
	if(name == "鸡蛋") return 82;
	if(name == "画") return 83;
	if(name == "掉落的物品") return 64;

	if(name == "矿车") return 84;

	return -1;
}

function compareMobs(mob1, mob2)
{
	if(mob1 == null || mob2 == null)
	{
		return false;
	}
	if(Entity.getX(mob1) == Entity.getX(mob2) &&
			Entity.getY(mob1) == Entity.getY(mob2) &&
			Entity.getZ(mob1) == Entity.getZ(mob2) &&
			Entity.getEntityTypeId(mob1) == Entity.getEntityTypeId(mob2))
	{
		return true;
	}
	return false;
}

function leaveGame()
{
	ctx.runOnUiThread(new java.lang.Runnable()
	{
run:
		function()
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
			if(btnMenu != null)
			{
				btnMenu.dismiss();
				btnMenu = null;
			}
			if(subMenu != null)
			{
				subMenu.dismiss();
				subMenu = null;
			}
			if(infoMenu != null)
			{
				infoMenu.dismiss();
				infoMenu = null;
			}
		}
	});

	riding=false;
	running=0;
	Xpos=0;
	Zpos=0;
	fullxp=false;
	makeroad=false;
	spawnOnTap=-1;
	entityctrl=0;
	ride=false;
	buildmode=0;
	submode=0;
	s1=false;
	s2=false;
}

function modTick()
{
	if(makeroad)    //铺路
	{
		if(usesameid)
		{
			Level.setTile(Player.getX(),Player.getY()-2,Player.getZ(),buildid,builddmg);
		}
		else if(Player.getCarriedItem()<256)
		{
			Level.setTile(Player.getX(),Player.getY()-2,Player.getZ(),Player.getCarriedItem(),Player.getCarriedItemData());
		}
	}

	if(fullxp)
	{
		Entity.setHealth(getPlayerEnt(),32767);      //设置满血
	}

	if(running==1)
	{
		//Thanks to WhyTofu
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

	if(riding)
	{
		// thanks to 500ISE
		//setRot(ridingAnimal, Entity.getYaw(getPlayerEnt()), 0);
		var velX=-Math.sin(Entity.getYaw(getPlayerEnt())/180*Math.PI)*0.2;
		var velZ=Math.cos(Entity.getYaw(getPlayerEnt())/180*Math.PI)*0.2;
		var velY=0;
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
		//var velY=Math.sin((Entity.getPitch(getPlayerEnt()) - 180) / 180 * Math.PI) * ANIMAL_VERTICAL_SPEED;
		Entity.setVelX(ridingAnimal, velX);
		Entity.setVelY(ridingAnimal, velY);
		Entity.setVelZ(ridingAnimal, velZ);
	}
}

function newLevel()
{
	// run all the stuff at UI thread
	ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
run: 	function()
		{
			try
			{
				var layout = new android.widget.RelativeLayout(ctx);
				var dx=0,dy=0,longclicked=false;
				var button = new android.widget.Button(ctx);
				button.setBackgroundColor(android.graphics.Color.argb(50,255,255,255));
				button.setText("M");
				button.setTextSize(16);
				button.setTextColor(android.graphics.Color.argb(150,255,255,255));
				button.setPadding(2,2,2,2);
				button.setOnClickListener(new android.view.View.OnClickListener()
				{
onClick: 			function(v)
					{
						if(mainMenu==null)
						{
							openMenu();
						}
					}
				});
				button.setOnLongClickListener(new android.view.View.OnLongClickListener()
				{
onLongClick: 		function(v)
					{
						ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(40);
						longclicked=true;
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
							menux+= -parseInt((e.getX()-dx)/5);
							menuy+= -parseInt((e.getY()-dy)/5);
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

				btnWindow = new android.widget.PopupWindow(layout, 32, 32);
				btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				btnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, menux, menuy);
			}
			catch(err)
			{
				print("按钮加载失败，因为: "+err);
			}
		}
	});

}

function attackHook(attacker, victim)
{
	if(riding||ride||entityctrl!=0)
	{
		preventDefault();
		if(riding && compareMobs(victim, ridingAnimal))
		{
			Entity.rideAnimal(attacker, victim);
			riding = false;
		}
		else if(entityctrl==1)
		{
			tmpentity=victim;
			entityctrl=2;
		}
		else if(entityctrl==2)
		{
			if(!compareMobs(victim, tmpentity))
			{
				Entity.rideAnimal(tmpentity, victim);
				print("骑乘成功。再次点击两个生物让他们骑乘，点击生物管理按钮取消操作。");
				entityctrl=1;
			}
		}
		else if(entityctrl==3)
		{
			Entity.setHealth(victim, 1);
			Entity.setFireTicks(victim, 10);
		}
		else if(entityctrl==4)
		{
			Entity.setFireTicks(victim, 20);
		}
		else if(entityctrl==5)
		{
			if(Entity.getEntityTypeId(victim)>=10 && Entity.getEntityTypeId(victim)<=13)
			{
				if(Entity.getAnimalAge(victim)<0)
				{
					Entity.setAnimalAge(victim,0);
				}
				else if(Entity.getAnimalAge(victim)==0)
				{
					Entity.setAnimalAge(victim,-24000);
				}
			}
		}
		else if(entityctrl==6)
		{
			Entity.setHealth(victim, 10);
		}
		else if(entityctrl==7)
		{
			Entity.setHealth(victim, 20);
		}
		else if(entityctrl==8)
		{
			Entity.setHealth(victim, 40);
		}
		else if(ride)
		{
			Entity.rideAnimal(attacker, victim);
			riding = true;
			ridingAnimal = victim;
			print("再次点击该生物停止骑乘。");
			ride = false;
		}
	}
}

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage)
{
	if(spawnOnTap!=-1)
	{
		for (var i=0; i<spawncount; i++)
		{
			Level.spawnMob(x-(side==4?1:0)+(side==5?1:0)+0.5,y-(side==0?1:0)+(side==1?1:0)+0.5,z-(side==2?1:0)+(side==3?1:0)+0.5,spawnOnTap);
		}
		preventDefault();
	}

	if(buildmode>=1&&buildmode<=4&&submode==1)
	{
		preventDefault();
		s1=[x,y,z];
		submode=2;
		print("请点击第二个方块，点击建造助手按钮取消。");
	}
	else if(buildmode>=1&&buildmode<=4&&submode==2)
	{
		preventDefault();
		s2=[x,y,z];
		if(Player.getCarriedItem()<256)
		{
			if(buildmode==1)
			{
				if(usesameid)
				{
					makeline(buildid,builddmg);
				}
				else
				{
					makeline(itemid,itemDamage);
				}
				print("连线完成。");
			}
			else if(buildmode==2)
			{
				if(usesameid)
				{
					cuboid1(buildid,builddmg);
				}
				else
				{
					cuboid1(itemid,itemDamage);
				}
				print("实心长方体建造完成。");
			}
			else if(buildmode==3)
			{
				if(usesameid)
				{
					cuboid2(buildid,builddmg);
				}
				else
				{
					cuboid2(itemid,itemDamage);
				}
				print("空心长方体建造完成。");
			}
			if(buildmode==4)
			{
				if(usesameid)
				{
					cuboid3(buildid,builddmg);
				}
				else
				{
					cuboid3(itemid,itemDamage);
				}
				print("长方体框架建造完成。");
			}
		}
		else
		{
			print("建造失败。");
		}
		if(keepbuild)
		{
			submode=1;	
			print("请点击第一个方块，点击建造助手按钮取消。");
		}
		else
		{
			buildmode=0;
			submode=0;
		}
		s1=false;
		s2=false;
	}
	else if(buildmode>=5&&buildmode<=10)
	{
		preventDefault();
		s2=[x,y,z];
		if(Player.getCarriedItem()<256)
		{
			if(buildmode==5)
			{
				if(usesameid)
				{
					circle(x,y,z,sphererad,buildid,builddmg,submode);
				}
				else
				{
					circle(x,y,z,sphererad,itemid,itemDamage,submode);
				}
				print("圆环建造完成。");
			}
			else if(buildmode==6)
			{
				if(usesameid)
				{
					circle(x,y,z,sphererad,buildid,builddmg,submode);
				}
				else
				{
					circle(x,y,z,sphererad,itemid,itemDamage,submode);
				}
				round(x,y,z,sphererad,itemid,itemDamage,submode);
				print("圆建造完成。");
			}
			else if(buildmode==7)
			{
				if(usesameid)
				{
					sphere(x,y,z,sphererad,buildid,builddmg);
				}
				else
				{
					sphere(x,y,z,sphererad,itemid,itemDamage);
				}
				print("球建造完成。");
			}
			else if(buildmode==8)
			{
				if(usesameid)
				{
					unsphere(x,y,z,sphererad,buildid,builddmg);
				}
				else
				{
					unsphere(x,y,z,sphererad,itemid,itemDamage);
				}
				unsphere(x,y,z,sphererad,itemid,itemDamage);
				print("空心球建造完成。");
			}
			else if(buildmode==9)
			{
				if(usesameid)
				{
					pyramid(x,y,z,sphererad,buildid,builddmg);
				}
				else
				{
					pyramid(x,y,z,sphererad,itemid,itemDamage);
				}
				print("金字塔建造完成。");
			}
			else if(buildmode==10)
			{
				if(usesameid)
				{
					unpyramid(x,y,z,sphererad,buildid,builddmg);
				}
				else
				{
					unpyramid(x,y,z,sphererad,itemid,itemDamage);
				}
				print("空心金字塔建造完成。");
			}
		}
		else
		{
			print("建造失败。");
		}
		if(keepbuild)
		{
			print("请点击一个方块作为中心，点击建造助手按钮取消。");
		}
		else
		{
			buildmode=0;
			submode=0;
		}
		s1=false;
		s2=false;
	}
	else if(buildmode==20)
	{
		preventDefault();
		if(blockid==63||blockid==68)
		{
			ctx.runOnUiThread(new java.lang.Runnable()
			{
run: 			function()
				{
					try
					{
						var layout1 = new android.widget.LinearLayout(ctx);
						layout1.setOrientation(android.widget.LinearLayout.VERTICAL);

						var scroll=new android.widget.ScrollView(ctx);
						scroll.addView(layout1);

						var dialog1 = new android.app.Dialog(ctx);
						dialog1.setContentView(scroll);
						dialog1.setTitle("编辑告示牌内容");

						var l1 = new android.widget.EditText(ctx);
						l1.setHint("第一行");
						l1.setText(Level.getSignText(x,y,z,0));
						l1.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
						layout1.addView(l1);

						var l2 = new android.widget.EditText(ctx);
						l2.setHint("第二行");
						l2.setText(Level.getSignText(x,y,z,1));
						l2.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
						layout1.addView(l2);

						var l3 = new android.widget.EditText(ctx);
						l3.setHint("第三行");
						l3.setText(Level.getSignText(x,y,z,2));
						l3.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
						layout1.addView(l3);

						var l4 = new android.widget.EditText(ctx);
						l4.setHint("第四行");
						l4.setText(Level.getSignText(x,y,z,3));
						l4.setInputType(android.text.InputType.TYPE_CLASS_TEXT);
						layout1.addView(l4);

						var btn1 = new android.widget.Button(ctx);
						btn1.setText("确认");
						btn1.setOnClickListener(new android.view.View.OnClickListener()
						{
onClick: 					function(p1)
							{
								Level.setSignText(x,y,z,0,l1.getText());
								Level.setSignText(x,y,z,1,l2.getText());
								Level.setSignText(x,y,z,2,l3.getText());
								Level.setSignText(x,y,z,3,l4.getText());
								dialog1.dismiss();
							}
						});
						layout1.addView(btn1);

						dialog1.show();
					}
					catch(err)
					{
						print("无法打开菜单："+err);
					}
				}
			});
		}
		else
		{
			print("无法编辑非告示牌方块。");
		}
		buildmode=0;
		submode=0;
	}
	else if(buildmode==25&&submode==1)
	{
		preventDefault();
		if(Player.getCarriedItem()<256)
		{
			s1=[x,y,z];
			submode=2;
			replaceblock=itemid;
			replacedamage=itemDamage;
			print("请用替换后的方块点击第二个顶点，点击建造助手按钮取消。");
		}
		else
		{
			print("替换失败。");
			buildmode=0;
			submode=0;
		}
	}
	else if(buildmode==25&&submode==2)
	{
		preventDefault();
		if(Player.getCarriedItem()<256)
		{
			s2=[x,y,z];
			replace(itemid,itemDamage);
			print("替换完成。");
		}
		else
		{
			print("替换失败。");
		}
		buildmode=0;
		submode=0;
		replaceblock=0;
		replacedamage=0;
	}
	else if(buildmode==30&&submode==1)
	{
		preventDefault();
		s1=[x,y,z];
		submode=2;
		print("请点击第二个方块，点击建造助手按钮取消。");
	}
	else if(buildmode==30&&submode==2)
	{
		preventDefault();
		s2=[x,y,z];
		copyblock();
		print("复制完成。");
		buildmode=0;
		submode=0;
		s1=false;
		s2=false;
	}
	else if(buildmode==31)
	{
		preventDefault();
		if(blockgroup!=false)
		{
			pasteblock(x,y,z);
			print("粘贴完成。");
		}
		else
		{
			print("剪贴板为空。");
		}
		buildmode=0;
		submode=0;
	}
	else if(buildmode==32)
	{
		preventDefault();
		if(blockgroup!=false)
		{
			pasteblockplus(x,y,z);
			print("粘贴完成。");
		}
		else
		{
			print("剪贴板为空。");
		}
		buildmode=0;
		submode=0;
		pastedir=0;
		nopasteair=0;
		nopastewater=0;
		nopastelava=0;
		nocover=0;
	}
}


function procCmd(cmd)
{
	var Data=cmd.split(" ");
}


function deathHook(murderer, victim)
{
}


function selectLevelHook()
{
} 


function levelEventHook(entity, eventType, x, y, z, data)
{
}


function blockEventHook(x, y, z, eventType, data)
{
}


// MOB MANAGER
function entityAddedHook(entity)
{
	entities.push(entity);
}
function entityRemovedCallback(entity)
{
	entities.splice(entities.indexOf(entity),1);
}
function killAll(entType)
{
	for(var i in entities)
	{
		if(Entity.getEntityTypeId(entities[i])==entType)
		{
			Entity.remove(entities[i]);
		}
	}
}
function ageAll(entType, age)
{
	for(var i in entities)
	{
		if(Entity.getEntityTypeId(entities[i])==entType)
		{
			Entity.setAnimalAge(entities[i],age);
		}
	}
}
function fireAll(entType, time)
{
	for(var i in entities)
	{
		if(Entity.getEntityTypeId(entities[i])==entType)
		{
			Entity.setFireTicks(entities[i],time);
		}
	}
}
function healAll(entType, lives)
{
	for(var i in entities)
	{
		if(Entity.getEntityTypeId(entities[i])==entType)
		{
			Entity.setHealth(entities[i],lives);
		}
	}
}


//BUILD FUNCTION    thanks to 6g3y
//连线
function makeline(i,id)
{
	if(s1!=false&&s2!=false)
	{
		var shou=i;
		var dam=id;
		var x1=s1[0],y1=s1[1],z1=s1[2];
		var x2=s2[0],y2=s2[1],z2=s2[2];
		var kyx,kxz,kzy,byx,bxz,bzy;
		var kxy,kzx,kyz,bxy,bzx,byz;
		var na=1,nb=1,nc=1;
		var a,b,c;
        //比较xyz
		var xm=Math.abs(x1-x2),ym=Math.abs(y1-y2),zm=Math.abs(z1-z2);
		if(0<(x1-x2))
		{
			na=-1;
		}
		if(0<(y1-y2))
		{
			nb=-1;
		}
		if(0<(z1-z2))
		{
			nc=-1;
		}
        //k b
		if(0!=x1-x2&&0!=y1-y2&&0!=z1-z2)
		{
            //y=kx+b
			kyx=(y1-y2)/(x1-x2);
			byx=y1-kyx*x1;
            //x=kz+b
			kxz=(x1-x2)/(z1-z2);
			bxz=x1-kxz*z1;
            //z=ky+b
			kzy=(z1-z2)/(y1-y2);
			bzy=z1-kzy*y1;
            //计算
			if(xm==Math.max(xm,ym,zm))
			{
				for(var i=0; i<=xm; i++)
				{
					b=kyx*(x1+na*i)+byx;
					c=kzy*b+bzy;
					a=kxz*c+bxz;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
			else if(ym==Math.max(xm,ym,zm))
			{
				for(var i=0; i<=ym; i++)
				{
					c=kzy*(y1+nb*i)+bzy;
					a=kxz*c+bxz;
					b=kyx*a+byx;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
			else if(zm==Math.max(xm,ym,zm))
			{
				for(var i=0; i<=zm; i++)
				{
					a=kxz*(z1+nc*i)+bxz;
					b=kyx*a+byx;
					c=kzy*b+bzy;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
		}
		else if(0==x1-x2&&0!=y1-y2&&0!=z1-z2)
		{
			if(ym==Math.max(ym,zm))
			{
				//z=ky+b
				kzy=(z1-z2)/(y1-y2);
				bzy=z1-kzy*y1;
				for(var i=0; i<=ym; i++)
				{
					a=x1;
					b=y1+nb*i;
					c=kzy*b+bzy;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
			else if(zm==Math.max(ym,zm))
			{
				//y=kz+b
				kyz=(y1-y2)/(z1-z2);
				byz=y1-kyz*z1;
				for(var i=0; i<=zm; i++)
				{
					a=x1;
					c=z1+nc*i;
					b=kyz*c+byz;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
		}
		else if(0!=x1-x2&&0==y1-y2&&0!=z1-z2)
		{
			if(xm==Math.max(xm,zm))
			{
                //z=kx+b
				kzx=(z1-z2)/(x1-x2);
				bzx=z1-kzx*x1;
				for(var i=0; i<=xm; i++)
				{
					b=y1;
					a=x1+na*i;
					c=kzx*a+bzx;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
			else if(zm==Math.max(xm,zm))
			{
                //x=kz+b
				kxz=(x1-x2)/(z1-z2);
				bxz=x1-kxz*z1;
				for(var i=0; i<=zm; i++)
				{
					b=y1;
					c=z1+nc*i;
					a=kxz*c+bxz;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
		}
		else if(0!=x1-x2&&0!=y1-y2&&0==z1-z2)
		{
			if(ym==Math.max(xm,ym))
			{
                //x=ky+b
				kxy=(x1-x2)/(y1-y2);
				bxy=x1-kxy*y1;
				for(var i=0; i<=ym; i++)
				{
					c=z1;
					b=y1+nb*i;
					a=kxy*b+bxy;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
			else if(xm==Math.max(xm,ym))
			{
                //y=kx+b
				kyx=(y1-y2)/(x1-x2);
				byx=y1-kyx*x1;
				for(var i=0; i<=xm; i++)
				{
					c=z1;
					a=x1+na*i;
					b=kyx*a+byx;
					Level.setTile(Math.round(a),Math.round(b),Math.round(c),shou,dam);
				}
			}
		}
		else if(0!=x1-x2&&0==y1-y2&&0==z1-z2)
		{
			b=y1;
			c=z1;
			for(var i=0; i<=xm; i++)
			{
				a=x1+na*i;
				Level.setTile(a,b,c,shou,dam);
			}
		}
		else if(0==x1-x2&&0!=y1-y2&&0==z1-z2)
		{
			a=x1;
			c=z1;
			for(var i=0; i<=ym; i++)
			{
				b=y1+nb*i;
				Level.setTile(a,b,c,shou,dam);
			}
		}
		else if(0==x1-x2&&0==y1-y2&&0!=z1-z2)
		{
			a=x1;
			b=y1;
			c=z1;
			for(var i=0; i<=zm; i++)
			{
				c=z1+nc*i;
				Level.setTile(a,b,c,shou,dam);
			}
		}
		else if(0==x1-x2&&0==y1-y2&&0==z1-z2)
		{
			a=x1;
			b=y1;
			c=z1;
			Level.setTile(a,b,c,shou,dam);
		}
	}
}
//实心长方体
function cuboid1(i,id)
{
	var sa=s1,sb=s2;
	var x1=sa[0],y1=sa[1],z1=sa[2];
	var x2=sb[0],y2=sb[1],z2=sb[2];
	var n1=Math.min(x1,x2);
	var n2=Math.min(y1,y2);
	var n3=Math.min(z1,z2);
	for(var x=0; x<=Math.max(x1,x2)-Math.min(x1,x2); x++)
	{
		for(var y=0; y<=Math.max(y1,y2)-Math.min(y1,y2); y++)
		{
			for(var z=0; z<=Math.max(z1,z2)-Math.min(z1,z2); z++)
			{
				Level.setTile(n1+x,n2+y,n3+z,i,id);
			}
		}
	}

}
//空心长方体
function cuboid2(i,id)
{
	var sa=s1,sb=s2;
	var x1=sa[0],y1=sa[1],z1=sa[2];
	var x2=sb[0],y2=sb[1],z2=sb[2];
	var n1=Math.min(x1,x2);
	var n2=Math.min(y1,y2);
	var n3=Math.min(z1,z2);
	for(var x=0; x<=Math.max(x1,x2)-Math.min(x1,x2); x++)
	{
		for(var z=0; z<=Math.max(z1,z2)-Math.min(z1,z2); z++)
		{
			Level.setTile(n1+x,y1,n3+z,i,id);
			Level.setTile(n1+x,y2,n3+z,i,id);
		}
	}
	for(var y=0; y<=Math.max(y1,y2)-Math.min(y1,y2); y++)
	{
		for(var x=0; x<=Math.max(x1,x2)-Math.min(x1,x2); x++)
		{
			Level.setTile(n1+x,n2+y,z2,i,id);
			Level.setTile(n1+x,n2+y,z1,i,id);
		}
	}
	for(var z=0; z<=Math.max(z1,z2)-Math.min(z1,z2); z++)
	{
		for(var y=0; y<=Math.max(y1,y2)-Math.min(y1,y2); y++)
		{
			Level.setTile(x1,n2+y,n3+z,i,id);
			Level.setTile(x2,n2+y,n3+z,i,id);
		}
	}
}
//长方体框架
function cuboid3(i,id)
{
	var sa=s1,sb=s2;
	var x1=sa[0],y1=sa[1],z1=sa[2];
	var x2=sb[0],y2=sb[1],z2=sb[2];
	var n1=Math.min(x1,x2);
	var n2=Math.min(y1,y2);
	var n3=Math.min(z1,z2);
	for(var x=0; x<=Math.max(x1,x2)-Math.min(x1,x2); x++)
	{
		Level.setTile(n1+x,y1,z1,i,id);
		Level.setTile(n1+x,y1,z2,i,id);
		Level.setTile(n1+x,y2,z1,i,id);
		Level.setTile(n1+x,y2,z2,i,id);
	}
	for(var y=0; y<=Math.max(y1,y2)-Math.min(y1,y2); y++)
	{
		Level.setTile(x1,n2+y,z1,i,id);
		Level.setTile(x1,n2+y,z2,i,id);
		Level.setTile(x2,n2+y,z1,i,id);
		Level.setTile(x2,n2+y,z2,i,id);
	}
	for(var z=0; z<=Math.max(z1,z2)-Math.min(z1,z2); z++)
	{
		Level.setTile(x1,y1,n3+z,i,id);
		Level.setTile(x1,y2,n3+z,i,id);
		Level.setTile(x2,y1,n3+z,i,id);
		Level.setTile(x2,y2,n3+z,i,id);
	}
}
//圆环
function circle(x,y,z,r,b,bd,sub)
{
	for(var i=-r; i<=r; i++)
	{
		for(var j=-r; j<=r; j++)
		{
			if(i*i+j*j<=r*r&&i*i+j*j>=(r-1)*(r-1))
			{
				if(sub==1)    //x轴
				{
					Level.setTile(x,y+i,z+j,b,bd);
				}
				else if(sub==2)     //y轴
				{
					Level.setTile(x+i,y,z+j,b,bd);
				}
				else if(sub==3)      //z轴
				{
					Level.setTile(x+i,y+j,z,b,bd);
				}
			}
		}
	}
}
//圆
function round(x,y,z,r,b,bd,sub)
{
	for(var i=-r; i<=r; i++)
	{
		for(var j=-r; j<=r; j++)
		{
			if(i*i+j*j<=r*r)
			{
				if(sub==1)
				{
					Level.setTile(x,y+i,z+j,b,bd);
				}
				else if(sub==2)
				{
					Level.setTile(x+i,y,z+j,b,bd);
				}
				else if(sub==3)
				{
					Level.setTile(x+i,y+j,z,b,bd);
				}
			}
		}
	}
}
//球
function sphere(x,y,z,r,b,bd)
{
	for(var i=-r; i<=r; i++)
	{
		for(var j=-r; j<=r; j++)
		{
			for(var k=-r; k<=r; k++)
			{
				if(i*i+j*j+k*k<=r*r)
					Level.setTile(x+i,y+k,z+j,b,bd);
			}
		}
	}
}
//空心球
function unsphere(x,y,z,r,b,bd)
{
	for(var i=-r; i<=r; i++)
	{
		for(var j=-r; j<=r; j++)
		{
			for(var k=-r; k<=r; k++)
			{
				if(i*i+j*j+k*k<=r*r&&i*i+j*j+k*k>=(r-1)*(r-1))
					Level.setTile(x+i,y+k,z+j,b,bd);
			}
		}
	}
}
//金字塔
function pyramid(x,y,z,h,id,bd)
{
	for(var j=0; j<=h; j++)
	{
		var m=h-j;
		for(var a=0; a<=2*(h-j); a++)
		{
			for(var b=0; b<=2*(h-j); b++)
			{
				Level.setTile(x-m+a,y+j,z-m+b,id,bd);
			}
		}
	}
}
//空心金字塔
function unpyramid(x,y,z,h,id,bd)
{
	for(var j=0; j<=h; j++)
	{
		for(var a=0; a<=2*(h-j); a++)
		{
			var m=h-j;
			Level.setTile(x+m,y+j,z-m+a,id,bd);
			Level.setTile(x-m+a,y+j,z+m,id,bd);
			Level.setTile(x-m+a,y+j,z-m,id,bd);
			Level.setTile(x-m,y+j,z-m+a,id,bd);
		}
	}
}
//替换
function replace(i,id)
{
	var sa=s1,sb=s2;
	var x1=sa[0],y1=sa[1],z1=sa[2];
	var x2=sb[0],y2=sb[1],z2=sb[2];
	var n1=Math.min(x1,x2);
	var n2=Math.min(y1,y2);
	var n3=Math.min(z1,z2);
	for(var x=0; x<=Math.max(x1,x2)-Math.min(x1,x2); x++)
	{
		for(var y=0; y<=Math.max(y1,y2)-Math.min(y1,y2); y++)
		{
			for(var z=0; z<=Math.max(z1,z2)-Math.min(z1,z2); z++)
			{
				if(getTile(n1+x,n2+y,n3+z)==replaceblock&&Level.getData(n1+x,n2+y,n3+z)==replacedamage)
				{
					Level.setTile(n1+x,n2+y,n3+z,i,id);
				}
			}
		}
	}

}
//复制
function copyblock()
{
	blockgroup=[];
	var a=[];
	var b=[];
	var c=[];
	var n1=Math.min(s1[0],s2[0]);
	var n2=Math.min(s1[1],s2[1]);
	var n3=Math.min(s1[2],s2[2]);
	for(var x=0; x<=Math.max(s1[0],s2[0])-Math.min(s1[0],s2[0]); x++)
	{
		b=[];
		for(var y=0; y<=Math.max(s1[1],s2[1])-Math.min(s1[1],s2[1]); y++)
		{
			c=[];
			for(var z=0; z<=Math.max(s1[2],s2[2])-Math.min(s1[2],s2[2]); z++)
			{
				c.push([getTile(n1+x,n2+y,n3+z),Level.getData(n1+x,n2+y,n3+z)]);
			}
			b.push(c);
		}
		a.push(b);
	}
	blockgroup=a;
}
//粘贴
function pasteblock(a,b,c)
{
	var n=blockgroup;
	var x=0;
	var y=0;
	var z=0;
	for(x in n)
	{
		for(y in n[x])
		{
			for(z in n[x][y])
			{
				Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
			}
		}
	}
}
//高级粘贴
function pasteblockplus(a,b,c)
{
	function diry_x()      //旋转后各个轴的方向
	{
		if(dir==1)
			return -parseInt(z);
		else if(dir==2)
			return -parseInt(x);
		else if(dir==3)
			return +parseInt(z);
	}
	function diry_z()
	{
		if(dir==1)
			return +parseInt(x);
		else if(dir==2)
			return -parseInt(z);
		else if(dir==3)
			return -parseInt(x);
	}
	function dirx_y()
	{
		if(dir==4)
			return -parseInt(z);
		else if(dir==5)
			return -parseInt(y);
		else if(dir==6)
			return +parseInt(z);
	}
	function dirx_z()
	{
		if(dir==4)
			return +parseInt(y);
		else if(dir==5)
			return -parseInt(z);
		else if(dir==6)
			return -parseInt(y);
	}
	function dirz_x()
	{
		if(dir==7)
			return -parseInt(y);
		else if(dir==8)
			return -parseInt(x);
		else if(dir==9)
			return +parseInt(y);
	}
	function dirz_y()
	{
		if(dir==7)
			return +parseInt(x);
		else if(dir==8)
			return -parseInt(y);
		else if(dir==9)
			return -parseInt(x);
	}

	var n=blockgroup;
	var x=0;
	var y=0;
	var z=0;
	var dir=pastedir;

	if(pastedir==0)         //不旋转
	{
		for(x in n)
		{
			for(y in n[x])
			{
				for(z in n[x][y])
				{
					if(!nocover||getTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z))==0)
					{
						if(n[x][y][z][0]!=0&&(n[x][y][z][0]<8||n[x][y][z][0]>11))
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if(n[x][y][z][0]==0&&!nopasteair)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==8||n[x][y][z][0]==9)&&!nopastewater)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==10||n[x][y][z][0]==11)&&!nopastelava)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+parseInt(y),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
					}
				}
			}
		}
	}
	else if(pastedir>=1&&pastedir<=3)      //绕y轴旋转
	{
		for(x in n)
		{
			for(y in n[x])
			{
				for(z in n[x][y])
				{
					if(!nocover||getTile(parseInt(a)+diry_x(),parseInt(b)+parseInt(y),parseInt(c)+diry_z())==0)
					{
						if(n[x][y][z][0]!=0&&(n[x][y][z][0]<8||n[x][y][z][0]>11))
						{
							Level.setTile(parseInt(a)+diry_x(),parseInt(b)+parseInt(y),parseInt(c)+diry_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if(n[x][y][z][0]==0&&!nopasteair)
						{
							Level.setTile(parseInt(a)+diry_x(),parseInt(b)+parseInt(y),parseInt(c)+diry_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==8||n[x][y][z][0]==9)&&!nopastewater)
						{
							Level.setTile(parseInt(a)+diry_x(),parseInt(b)+parseInt(y),parseInt(c)+diry_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==10||n[x][y][z][0]==11)&&!nopastelava)
						{
							Level.setTile(parseInt(a)+diry_x(),parseInt(b)+parseInt(y),parseInt(c)+diry_z(),n[x][y][z][0],n[x][y][z][1]);
						}
					}
				}
			}
		}
	}
	else if(pastedir>=4&&pastedir<=6)     //绕x轴旋转
	{
		for(x in n)
		{
			for(y in n[x])
			{
				for(z in n[x][y])
				{
					if(!nocover||getTile(parseInt(a)+parseInt(x),parseInt(b)+dirx_y(),parseInt(c)+dirx_z())==0)
					{
						if(n[x][y][z][0]!=0&&(n[x][y][z][0]<8||n[x][y][z][0]>11))
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+dirx_y(),parseInt(c)+dirx_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if(n[x][y][z][0]==0&&!nopasteair)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+dirx_y(),parseInt(c)+dirx_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==8||n[x][y][z][0]==9)&&!nopastewater)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+dirx_y(),parseInt(c)+dirx_z(),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==10||n[x][y][z][0]==11)&&!nopastelava)
						{
							Level.setTile(parseInt(a)+parseInt(x),parseInt(b)+dirx_y(),parseInt(c)+dirx_z(),n[x][y][z][0],n[x][y][z][1]);
						}
					}
				}
			}
		}
	}
	else if(pastedir>=7&&pastedir<=9)     //绕z轴旋转
	{
		for(x in n)
		{
			for(y in n[x])
			{
				for(z in n[x][y])
				{
					if(!nocover||getTile(parseInt(a)+dirz_x(),parseInt(b)+dirz_y(),parseInt(c)+parseInt(z))==0)
					{
						if(n[x][y][z][0]!=0&&(n[x][y][z][0]<8||n[x][y][z][0]>11))
						{
							Level.setTile(parseInt(a)+dirz_x(),parseInt(b)+dirz_y(),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if(n[x][y][z][0]==0&&!nopasteair)
						{
							Level.setTile(parseInt(a)+dirz_x(),parseInt(b)+dirz_y(),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==8||n[x][y][z][0]==9)&&!nopastewater)
						{
							Level.setTile(parseInt(a)+dirz_x(),parseInt(b)+dirz_y(),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
						else if((n[x][y][z][0]==10||n[x][y][z][0]==11)&&!nopastelava)
						{
							Level.setTile(parseInt(a)+dirz_x(),parseInt(b)+dirz_y(),parseInt(c)+parseInt(z),n[x][y][z][0],n[x][y][z][1]);
						}
					}
				}
			}
		}
	}

}
//导出剪贴板到文件
function saveblocks(str)
{
	try
	{
		var f=String(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/"+str);
		var fos=java.io.FileOutputStream(f);
		var n=blockgroup;
		fos.write(n.length);
		fos.write(n[0].length);
		fos.write(n[0][0].length);
		for(x in n)
		{
			for(y in n[x])
			{
				for(z in n[x][y])
				{
					fos.write(n[x][y][z][0]);
					fos.write(n[x][y][z][1]);
				}
			}
		}
		fos.close();
	}
	catch(err)
	{
		print("错误: "+err+".");
	}
}
//从文件导入剪贴板
function readblocks(str)
{
	try
	{
		var f=String(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/"+str);
		var fis=java.io.FileInputStream(f);
		var fz=[];
		var a=0;
		while(1)
		{
			a=fis.read();
			if(a>=0)
			{
				fz.push(a);
			}
			else
			{
				break;
			}
		}
		if(fz.length==(fz[0])*(fz[1])*(fz[2])*2+3)
		{
			var m=fz[0],n=fz[1],o=fz[2];
			var a=[];
			var b=[];
			var c=[];
			for(var x=0; x<m; x++)
			{
				b=[];
				for(var y=0; y<n; y++)
				{
					c=[];
					for(var z=0; z<o; z++)
					{
						var k=fz[(x*n*o+o*y+z)*2+3];
						var e=fz[(x*n*o+o*y+z)*2+4];
						c.push([k,e]);
					}
					b.push(c);
				}
				a.push(b);
			}
			blockgroup=a;
			print("导入完成。");
		}
		else if(fz.length==(fz[0]-1)*(fz[1]-1)*(fz[2]-1)*2+3)
		{
			var m=fz[0]-1,n=fz[1]-1,o=fz[2]-1;
			var a=[];
			var b=[];
			var c=[];
			for(var x=0; x<m; x++)
			{
				b=[];
				for(var y=0; y<n; y++)
				{
					c=[];
					for(var z=0; z<o; z++)
					{
						var k=fz[(x*n*o+o*y+z)*2+3];
						var e=fz[(x*n*o+o*y+z)*2+4];
						c.push([k,e]);
					}
					b.push(c);
				}
				a.push(b);
			}
			blockgroup=a;
			print("导入完成。");
		}
		else
		{
			print("文件格式错误。");
		}
		fis.close();
	}
	catch(err)
	{
		print("错误: "+err+".");
	}
}






