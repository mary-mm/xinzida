


// 当前日期
$(function(){
    function show(){
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "年";
        str += (mydate.getMonth()+1) + "月";
        str += mydate.getDate() + "日";
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
if(new Date().getDay()==0) week="星期日"
if(new Date().getDay()==1) week="星期一"
if(new Date().getDay()==2) week="星期二"
if(new Date().getDay()==3) week="星期三"
if(new Date().getDay()==4) week="星期四"
if(new Date().getDay()==5) week="星期五"
if(new Date().getDay()==6) week="星期六"
// console.log(week)
$('.xingqi').text(week);




// 点击添加灯杆
$(".add_lamp_btn").click(function () {
    window.location.href="map.cn";
    $(".lamp_modal").show();

    
})
$(".lamp_modal .close").click(function () {
    $(".lamp_modal").hide();

})
$(".lamp_modal .cancle_modal_btn").click(function () {
    $(".lamp_modal").hide();

})

// 点击取消键
$(".cancle_modal_btn").click(function () {



})
// .点击确定键
$(".sumbit_modal_btn").click(function () {



})









    $(document).ready(function() {
        $("cn, body").scrollTop(0);
        var scroll_top;
        var page_h = $(document).height();
        var clien_h = $(window).height();
        var map_t = $(".map").offset().top;
        var tab_h = clien_h - map_t - 24;
        var pop_h = $(".monitoring_content").height()
        $(".map").css({"min-height": tab_h});
        $("#allmap_3d").css({"min-height": tab_h});
        $(".tab_c_list>.pills-tab").css({"min-height": tab_h});
        $("#allmap1").css({"height": tab_h})
        // 点击灯杆弹出检测点
        $(".lamp_post>li").click(function () {

            if ($(this).is(".active")) {
                $(".monitoring_content").hide()
                $(this).removeClass("active")
                $("#allmap1").css({"height": tab_h})
                $(".tab_c_list>.pills-tab").css({"height": tab_h});

            } else {
                $(".monitoring_content").show()
                $(this).addClass("active")
                $("#allmap1").css({"height": pop_h + map_t})

            }

        })

    var titleTop = $('.monitoring_c_list').offset().top;
    // console.log(titleTop)


    $(document).on('scroll',function(){
            $('.monitoring_c_list').css({
                "position":"fixed",
                "top":"90px",
                "height":tab_h +"px"
            });
            $(".monitoring_c_list>.pills-tab").css({"height":"100%"});

    })
})



// 回到顶部
if ($('#back-to-top').length) {
    var scrollTrigger = 100;
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > scrollTrigger) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    $('#back-to-top').on('click', function (e) {
        // cn,body 都写是为了兼容浏览器
        $('cn,body').animate({
            scrollTop: 0
        }, 700);

        return false;
    });
}
var img ='../../common/images/timg.gif';
//获取浏览器页面可见高度和宽度

var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
    _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#F4F4F4;opacity:1;filter:alpha(opacity=80);z-index:10000;">\
<div class="spinner" style="position: absolute;width: 16rem; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; \
"><img src='+img+' alt="loading" class="img-responsive"></div></div>';

document.write(_LoadingHtml);
//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        var loadingMask = document.getElementById('loadingDiv');
        loadingMask.parentNode.removeChild(loadingMask);
        $('body').removeClass('show-body-loading');
    }
}