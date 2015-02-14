

/**** Javascript常用函数 by Anvil ****/

/*

*省略号表示内容是可选的



全局函数：		可直接使用，即 function(arguments) 
属性：			属性是对象具有的一个值，使用 object.attribute 得到
方法：			需要用 object.function(arguments) 使用



**全局对象
*函数
parseFloat(str) 	解析一个字符串并返回一个浮点数。
parseInt(str) 		解析一个字符串并返回一个整数。
eval() 				计算 JavaScript 字符串，并把它作为脚本代码来执行。
String() 			把对象的值转换为字符串。


**字符串对象 String
*属性
length 				字符串长度
*方法
split(a) 			把字符串分割为字符串数组。
substring(a,b) 		提取字符串中两个指定的索引号之间的字符。
toLowerCase()		把字符串转换为小写。
toUpperCase() 		把字符串转换为大写。


**数字对象 Number
*方法
toString() 			把数字转换为字符串。
toFixed(num) 		把数字转换为字符串，结果的小数点后有指定位数的数字。


**数组对象 Array
*创建
var array=new Array(...);
*属性
length				设置或返回数组中元素的数目，设置 length 属性可改变数组的大小。如果设置的值比其当前值小，数组尾部的元素将丢失。
*方法
concat(arr,arr,...) 连接两个或更多的数组，并返回结果。
pop() 				删除并返回数组的最后一个元素。
push(a,...) 		向数组的末尾添加一个或更多元素，并返回新的长度。
reverse() 			颠倒数组中元素的顺序。
shift() 			删除并返回数组的第一个元素。
unshift(a,...) 		向数组的开头添加一个或更多元素，并返回新的长度。
splice(a,n,...)		先从数组第a个元素开始，删除n个元素 (n为0则不会删除) ，然后将新增的项目插入被删除元素的位置


**日期对象 Date
*创建
var date=new Date();
*方法
getDate() 			从 Date 对象返回当天在一个月中的日期 (1 ~ 31) 。
getDay() 			从 Date 对象返回当天在一周中的日期 (0 ~ 6) 。
getMonth() 			从 Date 对象返回月份 (0 ~ 11) 。
getFullYear() 		从 Date 对象以四位数字返回年份。
getHours() 			返回 Date 对象的小时 (0 ~ 23) 。
getMinutes() 		返回 Date 对象的分钟 (0 ~ 59) 。
getSeconds() 		返回 Date 对象的秒数 (0 ~ 59) 。
getMilliseconds() 	返回 Date 对象的毫秒 (0 ~ 999) 。
getTime() 			返回 1970 年 1 月 1 日至今的毫秒数。
getTimezoneOffset() 返回本地时间与格林尼治标准时间 (GMT) 的分钟差。
toString() 			把 Date 对象转换为字符串。
toTimeString() 		把 Date 对象的时间部分转换为字符串。
toDateString() 		把 Date 对象的日期部分转换为字符串。


**数学对象 Math
*创建
Math对象并不是类，可以直接用Math作为对象使用。
*属性
E 					返回算术常量 e，即自然对数的底数（约等于 2.718）。
PI 					返回圆周率 π（约等于 3.14159）。
SQRT2				返回 2 的平方根（约等于 1.414）。
*方法
abs(x) 				返回数的绝对值。
round(x) 			把数四舍五入为最接近的整数，当小数部分为 0.5 时进行上舍入。
ceil(x) 			对数进行向上取整，即与它相差最近且大于它的整数。
floor(x) 			对数进行向下取整，即与它相差最近且小于它的整数。
pow(x,y) 			返回 x 的 y 次幂。
exp(x) 				返回 e 的指数。
log(x) 				返回数的自然对数（底为e）。
sqrt(x) 			返回数的平方根。
max(x,y) 			返回 x 和 y 中的最大值。
min(x,y) 			返回 x 和 y 中的最小值。
random() 			返回位于区间 (0,1) ，即 0 ~ 1 之间的随机小数。
sin(x) 				返回数的正弦。
cos(x) 				返回数的余弦。
tan(x) 				返回角的正切。
acos(x) 			返回数的反余弦值。
asin(x) 			返回数的反正弦值。
atan(x) 			以介于 -π/2 与 π/2 弧度之间的数值来返回 x 的反正切值。
atan2(y,x) 			返回从 x 轴到点 (x,y) 的角度（介于 -π/2 与 π/2 弧度之间）。




*部分资料整理自W3SCHOOL http://www.w3school.com.cn

*/


