//页面加载完成后，调用函数不止一个时
function addLoadEvent(func) {
	var oldOnLoad=window.onload;
	if(typeof oldOnLoad != "function") {
		window.onload=func;
	}else{
		window.onload=function() {
			oldOnLoad();
			func();
		}
	}
}
//声明变量
var ex_number="";//放入符号前面的数字
var sign="";//放入符号
var condition="";//放入符号后面的数字

//判断错误信息
function judge(text) {
	var text=text;
	//不能没有内容
	if(text=="") {
		return false;
	}
	//不能除以0
	if(text.indexOf("÷0")>=0) {
		return false;
	}
	//不能除以0
	if(text.indexOf("%0")>=0) {
		return false;
	}
	return true;//其余正确的信息
}

//计算函数
function jisuan(num1,mark,num2) {
	var sum;
	var num1=parseFloat(num1);
	var num2=parseFloat(num2);
	switch(mark) {
		case "+":
			sum=num1+num2;
			break;
		case "-":
			sum=num1-num2;
			break;
		case "×":
			sum=num1*num2;
			break;
		case "÷":
			sum=num1/num2;
			break;
		case "%":
			sum=num1%num2;
			break;
		default:
			break;
	}
	sum=parseFloat(sum.toFixed(6));
	return sum;
}

//计算器功能函数
function gongneng() {
	var value=this.innerText;
	switch(value) {
		//符号键时添加内容
		case "-":
		case "+":
		case "×":
		case "÷":
		case "%":
			if(sign=="" && ex_number=="") {
				ex_number=hint.innerText;
				sign=value;
				hint.innerText+=value;
			}else if( sign=="" && !(ex_number=="") ) {
				sign=value;
				hint.innerText+=value;
			}else if( !(ex_number=="") && !(sign=="") && !(condition=="") ) {
				var a=jisuan(ex_number,sign,condition);
				ex_number=a;
				sign=value;
				condition="";
				hint.innerText+=value;
			}else{//防止符号连续出现
				hint.innerText+="";
			}				
			break;
		//清除所有数据
		case "C":
			ex_number="";
			sign="";
			condition="";
			hint.innerText="";
			result.value=0;
			break;
		//删除最后一个字符
		case "←":
			var oldHint=hint.innerText;
			var newHint;
			if( ex_number=="" ) {//还没添置符号时
				newHint=oldHint.substring(0,oldHint.length-1);
				hint.innerText=newHint;
			}else if( !(ex_number=="") && !(sign=="") && condition=="" ) {
				//有符号，但是符号后面没有数据时，删除符号
				newHint=oldHint.substring(0,oldHint.length-1);
				hint.innerText=newHint;
				sign="";
			}else if( !(ex_number=="") && sign=="" ) {
				//符号前有数据，但是没有符号时，删除符号前数据的最后一个字
				newHint=oldHint.substring(0,oldHint.length-1);
				hint.innerText=newHint;
				var new_ex_number=ex_number.substring(0,ex_number.length-1);
				ex_number=new_ex_number;
			}else{
				//其余情况
				newHint=oldHint.substring(0,oldHint.length-1);
				hint.innerText=newHint;
				var new_condition=condition.substring(0,condition.lenrth-1);
				condition=new_condition;
			}					
			break;
		//若已经有小数点，不再添加；若没有，添加
		case ".":
			var point=hint.innerText;
			if( !(point.indexOf(".")>=0) ) {//之前没有小数点时
				if( point=="" ) {//小数点前无数字时
					hint.innerText=0+value;
				}else if( !(ex_number=="") && condition=="" ) {
					//小数点前无数字时
					hint.innerText=hint.innerText+0+value;
				}else{
					hint.innerText+=value;
				}

			}else{
				if( ex_number=="" ) {//防止小数点数过多
					hint.inner+="";
				}else{
					if( ex_number.indexOf(".")>=0 && condition=="" ) {
						hint.innerText=hint.innerText+0+value;
						condition=0+value;
					}
					if( ex_number.indexOf(".")>=0 && !(condition.indexOf(".")>=0) ) {
						//若小数点是在符号前的数据里面，符号后面的数据允许小数点出现
						hint.innerText+=value;
						condition+=value;
					}
					if( !(ex_number.indexOf(".")>=0) ) {
						hint.innerText+="";
						}
				}
			}
			break;
		case "=":
			var equal=hint.innerText;
			//判断输入的信息是否正确
			if(!judge(equal)) {
				result.value="NaN";
				break;
			}
			//计算内容
			var number=jisuan(ex_number,sign,condition);
			result.value=number;
			break;
		//其余是数字的情况
		default:
			if( ex_number=="" ) {
				hint.innerText+=value;
			}else{
				hint.innerText+=value;
				condition+=value;
			}
			break;
	}
}

//点击内容
function calculate() {
	//判断浏览器是否支持语句
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("hint")) return false;
	if(!document.getElementById("result")) return false;
	if(!document.getElementsByTagName("li")) return false;

	//点击按键时
	var hint=document.getElementById("hint");//计算过程
	var result=document.getElementById("result");//计算结果
	var cal=document.getElementById("cal");
	var btn=cal.getElementsByTagName("li");//获取按键信息
	for(var i=0; i<btn.length; i++) {
		if( btn[i].addEventListener ) {
			btn[i].addEventListener("mousedown",function() {
				this.style.backgroundColor="#34DB60";
		},false);

		}else{
			btn[i].attachEvent("onmousedown",function() {
				this.style.backgroundColor="#34DB60";
		});

		}
		if( btn[i].addEventListener ) {
			btn[i].addEventListener("mouseup",function() {
				var name=this.className;
				if(name=="bg_tool" || name=="equal") {
					this.style.backgroundColor="#3498db";
				}else{
					this.style.backgroundColor="transparent";
				}
			},false);

		}else{
			btn[i].attachEvent("onmouseup",function() {
				var name=this.className;
				if( name=="bg_tool" || name=="equal" ) {
					this.style.backgroundColor="#3498db";
				}else{
					this.style.backgroundColor="transparent";
				}
			});

		}
				
		//计算器功能
		if( btn[i].addEventListener ) {
			btn[i].addEventListener("click",gongneng,false);
		}else{
			btn[i].attachEvent("onclick",gongneng);
		}
		
	}
}
addLoadEvent(calculate);