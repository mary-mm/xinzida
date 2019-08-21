// 当前日期
$(function(){
    function show(){
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "-";
        str += (mydate.getMonth()+1) + "-";
        str += mydate.getDate();
        return str;
    }

    $(".date_now").text(show());




});

/**
 *
 * 获取当前时间
 */
function getNow(s) {
    return s < 10 ? '0' + s: s;
}
var t = null;
function time(){
    dt = new Date();
    var y=dt.getFullYear();
    var h=dt.getHours();
    var m=dt.getMinutes();
    var s=dt.getSeconds();
    $(".time_now").text(getNow(h)+':'+getNow(m)+":"+getNow(s));
    t = setTimeout(time,1000);
}
window.onload=function(){time()}




// 星期
var week;
if(new Date().getDay()==0) week="Sunday"
if(new Date().getDay()==1) week="Monday"
if(new Date().getDay()==2) week="Tuesday"
if(new Date().getDay()==3) week="Wednesday"
if(new Date().getDay()==4) week="Thursday"
if(new Date().getDay()==5) week="Friday"
if(new Date().getDay()==6) week="Saturday"
// console.log(week)
$('.xingqi').text(week);

