/*
* @Author: oscar84922tw
* @Date:   2016-03-16 01:36:36
* @Last Modified by:   oscar84922tw
* @Last Modified time: 2016-03-16 01:55:08
*/
'use strict';
var buttonFlag=0;
function pause(){
if (buttonFlag == 1)
{
buttonFlag = 0;
document.getElementById("01").innerHTML="Start";
}else{

buttonFlag = 1;
document.getElementById("01").innerHTML="Stop";
minus();
}
}
function reset(){
document.getElementById("num").innerHTML = "0" + 0;
}
function minus() {
if(buttonFlag==0){
return 0;
}
if (document.getElementById("num")) {
var curr = parseInt(document.getElementById("num").innerHTML);
}
if (curr >= 0 && curr <= 59) {
if (curr < 9) {
document.getElementById("num").innerHTML = "0" + (curr + 1);
} else {
document.getElementById("num").innerHTML = curr + 1;
}
} else {
document.getElementById("num").innerHTML = "0" + 0;
}
setTimeout(function() {
minus();
}, 1000);
};
minus();
