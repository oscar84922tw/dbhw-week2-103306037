/*
* @Author: oscar
* @Date:   2016-03-16 19:17:04
* @Last Modified by:   oscar84922tw
* @Last Modified time: 2016-03-16 20:04:10
*/
'use strict';
var canvas,ctx;
var vertexes = [];
var diffPt = [];var autoDiff = 1000;
var verNum = 250;
var canvasW = window.innerWidth+40;
var addListener = function( e, str, func ) {
if( e.addEventListener ) {
e.addEventListener( str, func, false );
}else if( e.attachEvent ) {
e.attachEvent( "on" + str, func );
}else {
}
};
addListener( window, "load", init );
function resize(){
canvasW = document.getElementById('container').offsetWidth + 40;  initCanvas(canvasW,window.innerHeight);
var cW = canvas.width;
var cH = canvas.height;
for(var i = 0;i < verNum;i++)
vertexes[i] = new Vertex(cW / (verNum -1) * i , cH / 2,cH/2);
initDiffPt();
var win_3 = window.innerWidth/3;
}
function init(){
resize();
var FPS =30;
var interval = 1000 / FPS >> 0;
var timer = setInterval( update, interval );
if ( window.addEventListener ) addListener( window, "DOMMouseScroll", wheelHandler );
addListener( window, "mousewheel", wheelHandler );
addListener(window,"resize",resize);
canvas.onmousedown=function(e)
{
var mouseX,mouseY;
if (e) {
mouseX = e.pageX;
mouseY = e.pageY;
}else {
}
if(window.innerHeight/2 - mouseY < 50 && window.innerHeight/2 - mouseY> -50)
{
autoDiff = 1000;
if(mouseX<canvas.width-2){
xx = 1 + Math.floor((verNum - 2) * mouseX / canvas.width);
diffPt[xx] = autoDiff;
}
}
}
}
var wheelHandler = function( e ) {
var s = ( e.detail ) ? -e.detail : e.wheelDelta;
s > 0 ? ( dd > 15 ? dd-- :  dd=dd) : ( dd < 50 ? dd++ : dd=dd );
};
function initDiffPt(){
for(var i=0;i<verNum;i++)
diffPt[i]= 0;
}
var xx = 150;
var dd = 15;
function update(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
autoDiff -= autoDiff*0.9;
diffPt[xx] = autoDiff;
for(var i=xx-1;i>0;i--)
{
var d = xx-i;
if(d > dd)d=dd;
diffPt[i] -= (diffPt[i]-diffPt[i+1])*(1-0.01*d);
}
for(var i=xx+1;i<verNum;i++)
{
var d = i-xx;
if(d > dd)d=dd;
diffPt[i] -= (diffPt[i]-diffPt[i-1])*(1-0.01*d);
}
for(var i = 0;i < vertexes.length;i++){
vertexes[i].updateY(diffPt[i]);
}
draw();
}
var color1="#6ca0f6";
var color2 = "#367aec";
function draw(){
ctx.beginPath();
ctx.moveTo(0,window.innerHeight);
ctx.fillStyle=color1;
ctx.lineTo(vertexes[0].x,vertexes[0].y);
for(var i = 1;i < vertexes.length;i++){
ctx.lineTo(vertexes[i].x,vertexes[i].y);
}
ctx.lineTo(canvas.width,window.innerHeight);
ctx.lineTo(0,window.innerHeight);
ctx.fill();
ctx.beginPath();
ctx.moveTo(0,window.innerHeight);
ctx.fillStyle=color2;
ctx.lineTo(vertexes[0].x+15,vertexes[0].y+5);
for(var i = 1;i < vertexes.length;i++){
ctx.lineTo(vertexes[i].x+15,vertexes[i].y+5);
}
ctx.lineTo(canvas.width,window.innerHeight);
ctx.lineTo(0,window.innerHeight);
ctx.fill();
}
function initCanvas(width,height){
canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
ctx = canvas.getContext("2d");
}
function Vertex(x,y,baseY){
this.baseY = baseY;
this.x = x;
this.y = y;
this.vy = 0;
this.targetY = 0;
this.friction = 0.15;
this.deceleration = 0.95;
}
Vertex.prototype.updateY = function(diffVal){
this.targetY = diffVal + this.baseY;
this.vy += this.targetY - this.y
this.y += this.vy * this.friction;
this.vy *= this.deceleration;
}
