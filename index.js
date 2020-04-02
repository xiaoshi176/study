var Answer = [];
var Test = [];
var btn = document.getElementsByClassName('clearAll')[0];
var Create = document.getElementsByClassName('Create')[0];
var Input = document.getElementsByClassName('number')[0];
var rightNumBox = document.getElementsByClassName('rightNum')[0];
var rightNum = 0;
var center = document.getElementsByClassName('center')[0];
Create.onclick = function(){
	if(Input.value > 0){
		Render(Input.value);
	}
}
btn.onclick = clear;
function Render(num){
	clear()
	var questions = document.getElementsByClassName('questions')[0];
	getRandomTest(num);
	var str = "";
	Test.forEach(function(ele,index){
		str += '<li class="question">\
					<div class="title">'+ele+'</div>\
					<div class="answerbox">\
						<input class="answer" type="text">\
					</div>\
					<div class="isresult"></div>\
				</li>';
	})
	console.log(str)
	questions.innerHTML = str;
	str = "";
	bindBtn(num);
}
function clear(){
	var questions = document.getElementsByClassName('questions')[0];
	questions.innerHTML = "";
	Test = [];
	Answer = [];
	rightNum = 0;
	rightNumBox.innerText = '正确数量：'+ rightNum;
}



function bindBtn(num){
	var isresult = document.getElementsByClassName('isresult');
	var answer = document.getElementsByClassName('answer');
	for(var i = 0;i < num;i ++){
		answer[i].setAttribute('data-index',i);
		answer[i].onblur = function(){
			var oldValue = "";
			if(this.value != '' && oldValue != this.value){
				oldValue = this.value;
				if(Answer[this.getAttribute('data-index')] == parseInt(this.value)){
					rightNum ++;
					this.disabled = true;
					isresult[this.getAttribute('data-index')].innerText = '正确';
					isresult[this.getAttribute('data-index')].style.color = 'green';
					rightNumBox.innerText = '正确数量：'+ rightNum
				}else{
					isresult[this.getAttribute('data-index')].innerText = '错误';
					isresult[this.getAttribute('data-index')].style.color = 'red';
				}
			}
		}
	}
}

function getRandomTest(num){
	var add = 0;
	var sub = 0;
	var mul = 0;
	var div = 0;
	var random;
	for(var i = 0;i < num;i ++){
		random = Math.floor((Math.random()*4)+1);
		if(random == 1){
			add ++;
		}else if(random == 2){
			sub ++;
		}else if(random == 3){
			mul ++;
		}else{
			div ++;
		}
	}
	handleArr(getTest(add,'add'));
	handleArr(getTest(sub,'sub'));
	handleArr(getTest(mul,'mul'));
	handleArr(getTest(div,'div'));
}

function handleArr(arr){
	var arr1 = arr.slice(0,arr.length/2);
	var arr2 = arr.slice(arr.length/2,arr.length);
	for(var i = 0;i < arr1.length;i ++){
		Test.push(arr1[i]);
		Answer.push(arr2[i]);
	}
}

function getRandom(){
	return Math.floor((Math.random()*100)+1);
}

function getTest(num,sigal){
	var arr = [];
	var answer = [];
	var first;
	var second;
	var str = '';
	while(arr.length < num){
		first = getRandom();
		second = getRandom();
		if(sigal=='add' && first + second <= 100 ){
			str = "" + first+' + ' + second;
			arr.push(str)
			answer.push(first + second)
		}
		if(sigal == 'mul' && first * second <= 100){
			str = '' + first + ' * ' + second; 
			arr.push(str)
			answer.push(first * second)
		}
		if(sigal == 'sub'){
			str = '' + Math.max(first,second) + ' - ' + Math.min(first,second);
			arr.push(str)
			answer.push(Math.abs(first - second));
		}
		if(sigal == 'div' && Math.max(first,second)%Math.min(first,second) == 0 && Math.min(first,second)!=1 && first!=second){
			var a  = Math.max(first,second);
			var b = Math.min(first,second)
			str = '' + a + ' / ' + b;
			arr.push(str)
			answer.push(a/b);
		}
	}
	return arr.concat(answer);
}