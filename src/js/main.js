//window.calculate_flow 是记录一个计算过程中表达式的全局变量
window.calculate_flow="";
//因为在split时用的是空格，因此要根据前一位的情况适当添加空格
window.last_is_digit=false;


//以下为各个按钮
//响应过程：
//先判断是否添加空格，并对全局计算流进行修改
//改写空格添加判断的bool值
//显示出修改后的计算流
function numZero() {
    if(window.last_is_digit)
    window.calculate_flow+="0";
    else window.calculate_flow+=" 0";
    window.last_is_digit=true;
    showCurrentFlow();
}

function numOne() {
    if(window.last_is_digit)
        window.calculate_flow+="1";
    else window.calculate_flow+=" 1";
    window.last_is_digit=true;
    showCurrentFlow();
}

function numTwo() {
    if(window.last_is_digit)
        window.calculate_flow+="2";
    else window.calculate_flow+=" 2";
    window.last_is_digit=true;
    showCurrentFlow();
}

function numThree() {
    if(window.last_is_digit)
        window.calculate_flow+="3";
    else window.calculate_flow+=" 3";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numFour() {
    if(window.last_is_digit)
        window.calculate_flow+="4";
    else window.calculate_flow+=" 4";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numFive() {
    if(window.last_is_digit)
        window.calculate_flow+="5";
    else window.calculate_flow+=" 5";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numSix() {
    if(window.last_is_digit)
        window.calculate_flow+="6";
    else window.calculate_flow+=" 6";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numSeven() {
    if(window.last_is_digit)
        window.calculate_flow+="7";
    else window.calculate_flow+=" 7";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numEight() {
    if(window.last_is_digit)
        window.calculate_flow+="8";
    else window.calculate_flow+=" 8";
    window.last_is_digit=true;
    showCurrentFlow();
}
function numNine() {
    if(window.last_is_digit)
        window.calculate_flow+="9";
    else window.calculate_flow+=" 9";
    showCurrentFlow();
    window.last_is_digit=true;
}
function numPoint() {
    if(window.last_is_digit)
        window.calculate_flow+=".";
    else window.calculate_flow+=" 0.";
    showCurrentFlow();
    window.last_is_digit=true;
}
function numAdd() {
    window.calculate_flow+=" +";
    window.last_is_digit=false;
    showCurrentFlow();
}
function numDecrease() {
    if(!window.last_is_digit)
    window.calculate_flow+=" 0 -";
    else window.calculate_flow+=" -";
    window.last_is_digit=false;
    showCurrentFlow();
}
function numMultiply() {
    window.calculate_flow+=" *";
    window.last_is_digit=false;
    showCurrentFlow();
}
function numDivide() {
    window.calculate_flow+=" /";
    window.last_is_digit=false;
    showCurrentFlow();
}
function numLeftBracket() {
    window.calculate_flow+=" (";
    window.last_is_digit=false;
    showCurrentFlow();
}
function numRightBracket() {
    window.calculate_flow+=" )";
    window.last_is_digit=false;
    showCurrentFlow();
}

//此处是计算按钮
//计算出结果以后清空流并重置空格判断
function numCal() {
    calculate(window.calculate_flow);
    window.calculate_flow="";
    window.last_is_digit=false;
}

//主计算函数
//将传入的计算流转换为后缀表达式后进行计算
function calculate(flow)
{
    var cal_stack = new Stack();
    var cal_suffix = infixToSuffix(flow);
    var firstNum = 0,secondNum = 0;
    var reg = /\d/;
    for(var i=0; i<cal_suffix.length; i++){
        if(reg.test(cal_suffix[i])){
            cal_stack.push(cal_suffix[i]);
        }else{
            switch(cal_suffix[i]){
                case '-':
                    firstNum = cal_stack.pop();
                    secondNum = cal_stack.pop();
                    cal_stack.push(Number(secondNum)-Number(firstNum));
                    break;
                case '+':
                    firstNum = cal_stack.pop();
                    secondNum = cal_stack.pop();
                    cal_stack.push(Number(secondNum)+Number(firstNum));
                    break;
                case '*':
                    firstNum = cal_stack.pop();
                    secondNum = cal_stack.pop();
                    cal_stack.push(Number(secondNum)*Number(firstNum));
                    break;
                case '/':
                    firstNum = cal_stack.pop();
                    secondNum = cal_stack.pop();
                    if(firstNum != 0){
                        cal_stack.push(Number(secondNum)/Number(firstNum));
                    }else{
                        alert("除数不能为0");
                        window.calculate_flow="";
                        showCurrentFlow();
                        break;
                    }
            }
        }
    }
    console.log(cal_stack.store);
    var result_target=document.getElementById("result output");
    result_target.innerHTML="Calculate result: "+cal_stack.store.toString();

}
//显示当前计算的表达式
function showCurrentFlow() {
    var current_flow=document.getElementById("current calculate");
    current_flow.innerHTML="Current calculate: "+window.calculate_flow.toString();
}

//用简易的栈来实现计算
function Stack(){
    this.store = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
}

function push(ele){
    this.store[this.top++] = ele;
}

function pop(){
    var top = --this.top;
    if(top >= 0){
        var val =  this.store[top];
        this.store.splice(this.top,1);
        return val;
    }else{
        return 'It\' Ending !';
    }
}
//中缀表达式转后缀表达式
function infixToSuffix(cal_flow){
    //表达式用空格分开
    cal_flow = cal_flow.split(' ');
    var cal_arr = [];
    var cal_stack = new Stack();
    var reg = /\d/;

    for(var i=0; i<cal_flow.length; i++){
        if(reg.test(cal_flow[i])){
            cal_arr.push(cal_flow[i]);

        }
        if(cal_flow[i] == '('){
            cal_stack.push(cal_flow[i]);
        }
        else if(cal_flow[i] == ')'){
            while(cal_stack.store[cal_stack.top-1] != '('){
                cal_arr.push(cal_stack.pop());
            }
            cal_stack.pop();
        }

        else if(cal_stack.store[cal_stack.top-1] == '*' || cal_stack.store[cal_stack.top-1] =='/'){
            cal_arr.push(cal_stack.pop());
        }

        else if(cal_flow[i] == '*' || cal_flow[i] =='/'){
            cal_stack.push(cal_flow[i]);

        }
        else if(cal_flow[i] == '+' || cal_flow[i] =='-'){
            if(cal_stack.top == 0){
                cal_stack.push(cal_flow[i]);
            }
            else if(cal_stack.top > 0){
                if(cal_stack.store[cal_stack.top-1] == '('){
                    cal_stack.push(cal_flow[i]);
                }else{
                    cal_arr.push(cal_stack.pop());
                    cal_stack.push(cal_flow[i]);
                }
            }
        }
    }
    while(cal_stack.store != 0){
        cal_arr.push(cal_stack.pop());
    }
    return cal_arr;
}
