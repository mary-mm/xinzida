$(function() {
    var ATTRIBUTE_TITLE = ['', '内容编辑', '选择图片', '选择视频', '表格导入'];

    var gProgram = 'undefined';
    var gProgramType = -1;
    var gGridImages = [];
    var gSelectedNode;
    var gNodeId = 10;
    var zNodes = [{ id:1, pId:0, name:"节目列表", open:true, icon:"web/images/list.png"}];

    var gPreviewTimer;
    var gPreviewItems;
    var gPreviewCount = 0;
    var gPreviewPlayIndex = 0;
    var gPreviewType;//播放类型
    var addAudio=0;
    var audioInfo=[];
    var audio = document.createElement('audio');

    var realInfoArr=[];
    var cur_ClickCellRowIndex = null;
    var cur_DblClickCellRowIndex = -1;
    var isStop=false;

    $.extend($.fn.datagrid.methods, {
        addEditor: function(jq, param) {
            if (param instanceof Array) {
                $.each(param, function(index, item) {
                    var e = $(jq).datagrid('getColumnOption', item.field);
                    e.editor = item.editor;
                });
            } else {
                var e = $(jq).datagrid('getColumnOption', param.field);
                e.editor = param.editor;
            }
        },
        removeEditor: function(jq, param) {
            if (param instanceof Array) {
                $.each(param, function(index, item) {
                    var e = $(jq).datagrid('getColumnOption', item);
                    e.editor = {};
                });
            } else {
                var e = $(jq).datagrid('getColumnOption', param);
                e.editor = {};
            }
        }
    });


    var um = UE.getEditor('myEditor1', {
        autoHeight: false
    });

    um.addListener('blur',function(){
        var width = $("#edtPWidth").numberbox('getValue');
        var height = $("#edtPHeight").numberbox('getValue');
        $("#displayPanel").empty();
        html2canvas($(".edui-body-container")[0], {
            width: width,
            height: height,
            background: "rgba(0,0,0,1)",
            onrendered: function (canvas) {
                var dataUrl = Canvas2Image.saveAsJPEG(canvas, true, width, height);
                $("#displayPanel").append(dataUrl);
            }
        });
    });

    $("#previewWindow").dialog({
        onClose: function() {
            window.clearInterval(gPreviewTimer);

            var video = $("#previewVideo").find('video')[0];
            if(video.played){
                video.pause();
            }

            if(audio.played){
                audio.pause();
            }
        }
    });

    $("#lamppost").addClass("selected");
    $("#lamppostleddisplay").addClass("selected");
    $("#editTextWindow").window("close");
    $("#editGridWindow").window("close");
    $("#selectImageWindow").dialog("close");
    $("#selectVideoWindow").dialog("close");
    $("#selectAudioWindow").dialog("close");
    $("#previewWindow").dialog("close");
    $("#videoPanel").hide();
    $("#realInfoCfgWindow").dialog("close");
    $("#sendInfoWindow").dialog("close");

    function zfill(str, size) {
        var s = "000000000" + str;
        return s.substr(s.length-size);
    }

    function setProgramEditFlag(flag) {
        if (flag) {
            $('#programFlag').html("节目修改中");
        } else {
            $('#programFlag').html("节目已保存")
        }

    }

    var setting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: zTreeBeforeClick,
            onClick: zTreeOnClick,
            onDblClick: zTreeOnDblClick
        }
    };


    $('#real_info_table').css({"height":"224"});
    $('#real_info_table').css({"width": "100%"});
    $('#real_info_table').datagrid({
        idField: 'id',
        fitColumns: true,
        nowrap: false,
        border:false,
        singleSelect: true,
        selectOnCheck: false,
        checkOnSelect: false,
        columns: [[
            {field:'ck',checkbox:true},
            {title:'ID', field:'id', width: 0,hidden: 'true'},
            {title:'信息类型', field:'name', width:140},
            {title:'播放时长', field:'showTime', width:50,editor: 'numberbox'}
        ]],
        onClickRow: function(index, row) {
            cur_ClickCellRowIndex = index;
            try {
                if (cur_ClickCellRowIndex != cur_DblClickCellRowIndex)
                    $(this).datagrid('endEdit', cur_DblClickCellRowIndex);
                else
                    $(this).datagrid('endEdit', index);
            } catch (e) {}

            preRealInfoImg(index);
        },
        onDblClickCell: function(index, field, value) {
            cur_DblClickCellRowIndex = index;
            $(this).datagrid('removeEditor', 'showTime');
            if (field == "showTime") {
                $(this).datagrid('addEditor', {
                    field: 'showTime',
                    editor: {
                        type: 'numberbox',
                        options: {
                            required: true
                        }
                    }
                });

                $(this).datagrid('beginEdit', index);
                var ed = $(this).datagrid('getEditor', {
                    index: index,
                    field: 'showTime'
                });
                $(ed.target).focus();
            }
        },
        onEndEdit: function(index, row, changes) {
            realInfoArr[index].showTime=row.showTime;
        }
    });


    $('#availableDisplayTable').datagrid({
        rownumbers : true,
        idField : 'id',
        fitColumns : true,
        checkbox: true,
        columns:[[
            {field:'ck',checkbox:true },
            {field:'name',title:'名称',width:200},
            {field:'width',title:'屏宽',width:80,align:'center',fixed:true},
            {field:'height',title:'屏高',width:80,align:'center',fixed:true},
            {field:'status',title:'状态',width:80, align:'center',fixed:true,
                formatter : function(value, row, index) {
                    if (value == 1) {
                        return "在线";
                    } else if (value == 2) {
                        return "离线";
                    } else {
                        return "未知";
                    }
                }
            }
        ]]
    });

    function zTreeBeforeClick(treeId, treeNode, clickFlag) {
        return (treeNode.id != 1);
    };

    function zTreeOnClick(event, treeId, treeNode) {
        if (gSelectedNode) {
            gSelectedNode.time = $("#edtStayTime").numberbox('getValue');
            var treeObj = $.fn.zTree.getZTreeObj("programTree");
            treeObj.updateNode(gSelectedNode);
        }

        gSelectedNode = treeNode;
        var type = treeNode.type;
        $("#edtStayTime").numberbox('setValue', treeNode.time);

        if (type == 3) {
            $("#videoPanel").show();
            $("#displayPanel").css({
                'background': '#000000',
                'background-image': null,
                'background-repeat': null
            });
            if (treeNode.imgUrl) {
                $("#videoPanel").attr('src', treeNode.imgUrl);
            } else {
                $("#videoPanel").attr('src', '');
                $("#videoPanel").hide();
            }
        } else {

            var video = $("#displayPanel").find('video')[0];
            if(video.played){
                video.pause();
            }

            $("#videoPanel").hide();
            if (treeNode.imgUrl) {
                $("#displayPanel").css({
                    'background-image': 'url(' + treeNode.imgUrl + ')',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                });
            } else {
                $("#displayPanel").css({
                    'background': '#000000',
                    'background-image': null,
                    'background-repeat': null
                });
            }
        }
    };

    function zTreeOnDblClick(event, treeId, treeNode) {
        gSelectedNode = treeNode;

        if (treeNode.type == 1) {

            var displayWidth = $("#screenWidth").numberbox('getValue');
            var displayHeight = $("#screenHeight").numberbox('getValue');

            // um.setHeight(displayHeight);//$("#editTextWindow").height() - 40
            // um.setWidth($("#modal1").width());//$("#editTextWindow").width() - 10

            $(".edui-body-container").css({
                'height': displayHeight,
                'min-height': displayHeight,
                'max-height': displayHeight,
                'width':displayWidth,
                'background-color':'#000000',
                'overflow-y':'hidden'
            });

            if (treeNode.text) {
                um.setContent(treeNode.text);
            } else {
                um.setContent("");
            }

            $("#modal1").modal("show")
        } else if (treeNode.type == 2) {
            $("#modal2").modal("show")

        } else if (treeNode.type == 3) {
            $("#modal3").modal("show")

        }else if (treeNode.type == 4) {
            $("#modal4").modal("show")

        }
    };

    $.fn.zTree.init($("#programTree"), setting, zNodes);

    $("#btnRemoveItem").on('click', '', function() {
        if (gSelectedNode && gSelectedNode.id != 1) {
            $.messager.confirm('确认','确认需要删除选中节目?',function(r){
                if (r){
                    var treeObj = $.fn.zTree.getZTreeObj("programTree");
                    treeObj.removeNode(gSelectedNode);
                    setProgramEditFlag(true);

                    var rootNode = treeObj.getNodesByParam("id", "1", null)[0];
                    var children = rootNode.children;
                    if (children.length == 0) {
                        gProgramType = -1;
                        $("#btnAddText").linkbutton('enable');
                        $("#btnAddPicture").linkbutton('enable');
                        $("#btnAddVideo").linkbutton('enable');
                    }
                }
            });
        }
    });

    $("#btnPreviewProgram").on('click', '', function() {
        $("#previewWindow").dialog("open");

        var video = $("#displayPanel").find('video')[0];
        if(video.played){
            video.pause();
        }

        if(audioInfo.length>0){
            audio.src = "";
            if(audioInfo[0].imgUrl !=''){
                audio.src = audioInfo[0].imgUrl;
            }
        }

        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var nodes = treeObj.transformToArray(treeObj.getNodes());

        gPreviewItems = [];
        gPreviewType= [];
        $.each(nodes, function(index, node){
            if (node.imgUrl && node.imgUrl != '') {
                if(node.type!=5){
                    gPreviewItems.push(node.imgUrl);
                    gPreviewType.push(node.type);
                }
            }
        });

        $("#previewImg").hide();
        $("#previewVideo").hide();

        var video = $("#previewVideo").find('video')[0];
        var img = $("#previewImg").find('img')[0];
        if(gPreviewItems.length>0){
            var pType=gPreviewType[0];
            if(pType==3){
                $("#previewVideo").show();
                $(video).attr('src', gPreviewItems[0]);

                gPreviewPlayIndex = 1;
                gPreviewCount = 0;
            }else{
                $("#previewImg").show();
                $(img).attr('src', gPreviewItems[0]);

                gPreviewPlayIndex = 1;
                gPreviewCount = 0;

                if(audio.paused){
                    audio.play();
                }
            }

            gPreviewTimer = window.setInterval(function() {

                if(pType==3){

                    if(audio.played){
                        audio.pause();
                    }

                    if($("#previewVideo").is(":hidden")){
                        $("#previewVideo").show();
                    }

                    if (!$("#previewImg").is(":hidden")) {
                        $("#previewImg").hide();
                    }

                    if (video.paused) {

                        if (gPreviewPlayIndex >= gPreviewItems.length) {
                            gPreviewPlayIndex = 0;
                        }

                        pType=gPreviewType[gPreviewPlayIndex];
                        if(pType==3){
                            $(video).attr('src', gPreviewItems[gPreviewPlayIndex]);
                            video.play();
                        }else{
                            $(img).attr('src', gPreviewItems[gPreviewPlayIndex]);
                        }

                        gPreviewCount = 0;
                        gPreviewPlayIndex++;
                    }


                }else{

                    if(audio.paused){
                        audio.play();
                    }

                    if (!$("#previewVideo").is(":hidden")) {
                        $("#previewVideo").hide();
                    }

                    if($("#previewImg").is(":hidden")){
                        $("#previewImg").show();
                    }

                    if (gPreviewCount > 5) {

                        if (gPreviewPlayIndex >= gPreviewItems.length) {
                            gPreviewPlayIndex = 0;
                        }

                        pType=gPreviewType[gPreviewPlayIndex];
                        if(pType==3){
                            $(video).attr('src', gPreviewItems[gPreviewPlayIndex]);
                            video.play();
                        }else{
                            $(img).attr('src', gPreviewItems[gPreviewPlayIndex]);
                        }

                        gPreviewCount = 0;
                        gPreviewPlayIndex++;
                    }

                }

                gPreviewCount++;

            }, 1000);
        }
    });

    $("#btnSaveProgram").on('click', '', function() {
        var name = $("#edtProgramName").textbox('getText');
        if ($.trim(name) == '') {
            $.messager.alert('提醒', '请输入节目名称！');
            return;
        }

        //yky20180623修复点击保存节目-----更新最后一次节目停留时间
        if (gSelectedNode) {
            gSelectedNode.time = $("#edtStayTime").numberbox('getValue');
            var treeObj = $.fn.zTree.getZTreeObj("programTree");
            treeObj.updateNode(gSelectedNode);
        }

        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var nodes = treeObj.getNodes();
        var temp_nodes={children:[]};

        for(var i=0;i<nodes[0].children.length;i++){
            temp_nodes.children.push(nodes[0].children[i]);
        }

        if(audioInfo.length>0){
            if(audioInfo[0].imgUrl!= ''){
                temp_nodes.children.push(audioInfo[0]);
            }
        }

        var reqData = {};
        var request = {};
        reqData.userId = gUserID;
        reqData.program = temp_nodes;
        reqData.programType = gProgramType;
        reqData.programId = gProgramId;
        reqData.maxId = gNodeId;
        reqData.width = gDisplayWidth;
        reqData.height = gDisplayHeight;
        reqData.name = name;
        request.action = "saveProgram";
        request.data = reqData;

        $.ajax({
            type : "POST",
            url : "web/leddisplay/display.do",
            dataType : "json",
            async: false,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    setProgramEditFlag(false);
                    window.history.back();
                } else {
                    $.messager.alert('提示',res.message);
                }
            }
        });
    });

    $("#btnBack2Table").on('click', '', function() {
        window.history.back();
//		window.location = 'web/leddisplay/programedit.cn';
    });

    $("#btnAddText").on('click', '', function() {
        var nodes = [{ id:gNodeId++, pId:1, name:"文本节目", open:true, icon:"iconfont icon-format_icon", type:1, mediaID:"", time:10, imgUrl:""}];
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var rootNode = treeObj.getNodesByParam("id", "1", null)[0];
        nodes = treeObj.addNodes(rootNode, nodes);
        treeObj.selectNode(nodes[0]);
        zTreeOnClick(null, 'programTree', nodes[0]);
        setProgramEditFlag(true);

        gProgramType = 0;
    });

    $("#btnAddPicture").on('click', '', function() {
        var nodes = [{ id:gNodeId++, pId:1, name:"图片节目", open:true, icon:"iconfont icon-tupian", type:2, mediaID:"", time:10, imgUrl:""}];
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var rootNode = treeObj.getNodesByParam("id", "1", null)[0];
        nodes = treeObj.addNodes(rootNode, nodes);
        treeObj.selectNode(nodes[0]);
        zTreeOnClick(null, 'programTree', nodes[0]);
        setProgramEditFlag(true);

        gProgramType = 0;
    });

    $("#btnAddVideo").on('click', '', function() {
        var nodes = [{ id:gNodeId++, pId:1, name:"视频节目", open:true, icon:"iconfont icon-shipin", type:3, mediaID:"", time:10, imgUrl:""}];
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var rootNode = treeObj.getNodesByParam("id", "1", null)[0];
        nodes = treeObj.addNodes(rootNode, nodes);
        treeObj.selectNode(nodes[0]);
        zTreeOnClick(null, 'programTree', nodes[0]);
        setProgramEditFlag(true);

        gProgramType = 1;
    });

    $("#btnAddAudio").on('click', '', function() {
        if(addAudio==0){
            audioInfo=[{ id:gNodeId++, pId:1, name:"背景音频", open:true, icon:"iconfont  icon-yinyue", type:5, mediaID:"", time:10, imgUrl:""}];
            addAudio=1;
        }

        $("#selectAudioWindow").dialog("open");
    });

    $("#btnClearAudio").on('click', '', function() {
        if(audioInfo.length>0){
            audioInfo[0].imgUrl="";
        }

        $("#selectAudioWindow").dialog('close');
        setProgramEditFlag(true);
    });



    //yky 获取设置实时插播节目配置
    $("#btnRealInfoCfg").on('click', '', function() {
        $('#real_info_table').datagrid('clearChecked');
        var request = {};
        request.action = "getRealInfoCfgInfo";

        $.ajax({
            type : "POST",
            url : "web/leddisplay/display.do",
            dataType : "json",
            async: true,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    var infoArr=res.data.realInfoArr;
                    if(infoArr.length>0){
                        $.each(infoArr, function(index, realInfo) {
                            if(realInfo.id==1){
                                realInfoArr[0].showTime=realInfo.showTime;
                            }else if(realInfo.id==2){
                                realInfoArr[1].showTime=realInfo.showTime;
                            }else if(realInfo.id==3){
                                realInfoArr[2].showTime=realInfo.showTime;
                            }else if(realInfo.id==4){
                                realInfoArr[3].showTime=realInfo.showTime;
                            }else if(realInfo.id==5){
                                realInfoArr[4].showTime=realInfo.showTime;
                            }else if(realInfo.id==6){
                                realInfoArr[5].showTime=realInfo.showTime;
                            }else if(realInfo.id==7){
                                realInfoArr[6].showTime=realInfo.showTime;
                            }

                        });
                    }
                    $('#real_info_table').datagrid('loadData', realInfoArr);

                    if(infoArr.length>0){
                        $.each(infoArr, function(i, realInfo) {
                            $.each(realInfoArr, function(j, info) {
                                if(realInfo.id==info.id){
                                    $('#real_info_table').datagrid('checkRow', j);//勾选
                                    return false;
                                }
                            });
                        });
                    }

                    var img = $("#preRealInfoImg").find('img')[0];
                    $(img).attr('src', "");

                    $("#realInfoCfgWindow").dialog("open");
                } else {
                    $.messager.alert('提示',res.message);
                }
            }
        });

    });

    //发送实时插播节目配置
    $("#btnSendRealInfo").on('click', function() {
        var rows=$('#real_info_table').datagrid('getChecked');
        if(rows.length==0){
            $.messager.alert('提示',"请选择发送信息!");
            return;
        }

        for(var i=0;i<rows.length;i++){
            if(rows[i].showTime==0){
                $.messager.alert('提示',rows[i].name+"的信息播放时长不能为0!");
                return;
            }
        }
        $("#sendLog").empty();
        isStop=false;
        $('#availableDisplayTable').datagrid('clearChecked');
        $("#sendInfoWindow").dialog({title:"[启用]选择显示屏"});
        $("#sendInfoWindow").dialog("open");
    });

    $("#btnStopRealInfo").on('click', function() {
        $("#sendLog").empty();
        isStop=true;
        $('#availableDisplayTable').datagrid('clearChecked');
        $("#sendInfoWindow").dialog({title:"[禁用]选择显示屏"});
        $("#sendInfoWindow").dialog("open");
    });

    $("#btnCloseCfg").on('click', function() {
        $("#realInfoCfgWindow").dialog("close");
    });

    $("#btnSend").on('click', function() {
        $("#sendLog").empty();

        var rows=$('#real_info_table').datagrid('getChecked');
        var playSetting="".trim();
        for(var i=0;i<rows.length;i++){
            if(i!=0){
                playSetting=playSetting+"_";
            }
            playSetting=playSetting+rows[i].id+"_"+rows[i].showTime
        }

        if(isStop){
            playSetting="";//禁播实时插播节目时设置为""空
        }

        rows=$('#availableDisplayTable').datagrid('getChecked');
        if(rows.length==0){
            $("#sendLog").append("请选择发送显示屏!" + "</br>");
            return;
        }

        $.each(rows, function(index, row) {
            if(row.no!=""){
                var log = '正在发送信息到显示屏"' + row.name + '", 请稍后......';
                $("#sendLog").append(log + "</br>");

                var reqData = {};
                var request = {};
                reqData.playSetting=playSetting;
                reqData.deviceNO=row.no;
                request.action = "sendRealInfoCfgInfo";
                request.data = reqData;

                $.ajax({
                    type : "POST",
                    url : "web/leddisplay/display.do",
                    dataType : "json",
                    async: true,
                    contentType : "application/json",
                    data : JSON.stringify(request),
                    success : function(res) {
                        if (res.success) {
                            $("#sendLog").append("["+row.name+"]信息发送成功。" + "</br>");
                        } else {
                            $("#sendLog").append("["+row.name+"]信息发送失败，原因：" + res.message + "</br>");
                        }
                    }
                });
            }
        });

    });

    $("#btnClose").on('click', function() {
        $("#sendInfoWindow").dialog("close");
    });




    function getAllMediaLabel() {
        var request = {};
        request.action = "getMediaLabel";

        $.ajax({
            type : "POST",
            url : "web/leddisplay/display.do",
            dataType : "json",
            async: true,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    var datas = [];
                    datas.push({"id":0,"text":"全部"});
                    $.each(res.data.labels.rows, function(index, label) {
                        datas.push({"id":label.id,"text":label.name});
                    });

                    datas.push({"id":-1,"text":"未分类"});
                    $('#cbxMediaLabel').combobox('loadData', datas);
                    $('#cbxMediaLabel').combobox('setValue', 0);
                    $('#cbxMediaLabel1').combobox('loadData', datas);
                    $('#cbxMediaLabel1').combobox('setValue', 0);
                    $('#cbxMediaLabel2').combobox('loadData', datas);
                    $('#cbxMediaLabel2').combobox('setValue', 0);

                } else {
                    $.messager.alert('提示',res.message);
                }
            }
        });
    }

    function queryMedia(name, startdate, enddata, label, type,pagenumber) {
        var request = {};
        var reqData = {};
        reqData.name = name;
        reqData.startdate = startdate;
        reqData.enddate = enddata;
        reqData.type = type;
        reqData.label = label;
        reqData.pagesize = 30;
        reqData.pagenumber =pagenumber;//1

        request.action = "queryMedias";
        request.data = reqData;

        $.ajax({
            type : "POST",
            url : "web/leddisplay/display.do",
            dataType : "json",
            async: true,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    var medias = res.data.medias.rows;
                    var total=res.data.total;

                    if (type == 1) {

                        if(total==0){
                            $("#imgCurPage").html(0);
                        }

                        $("#imgTotolPage").html(Math.ceil(total/reqData.pagesize));

                        var imgContent = '<img src="#{THUMB}" imgSrc="#{URL}" name="#{ID}" id="media_#{ID}" title="#{NAME}" style="width:100px;height:100px;cursor:pointer;margin:5px;"/>';

                        $("#imageViewer").empty();
                        $.each(medias, function(index, media) {

                            if(media.thumb!=""&&typeof(media.thumb)!="undefined"){
                                var content = imgContent.replace("#{URL}", media.url);
                                content = content.replace("#{THUMB}", media.thumb);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{NAME}", media.name);
                                $("#imageViewer").append(content);
                            }else{
                                var content = imgContent.replace("#{THUMB}", "web/images/picture64.png");
                                content = content.replace("#{URL}", media.url);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{NAME}", media.name);
                                $("#imageViewer").append(content);
                            }

                        });
                    }else if(type == 3){
                        if(total==0){
                            $("#audioCurPage").html(0);
                        }

                        $("#audioTotolPage").html(Math.ceil(total/reqData.pagesize));

                        var imgContent = '<img src="web/images/music96.png" audioSrc="#{URL}" name="#{ID}" id="media_#{ID}" title="#{NAME}" style="width:100px;height:100px;cursor:pointer;margin:5px;"/>';
                        $("#audioViewer").empty();
                        $.each(medias, function(index, media) {
                            var content = imgContent.replace("#{URL}", media.url);
                            content = content.replace("#{ID}", media.id);
                            content = content.replace("#{ID}", media.id);
                            content = content.replace("#{NAME}", media.name);
                            $("#audioViewer").append(content);
                        });
                    } else {
                        if(total==0){
                            $("#videoCurPage").html(0);
                        }

                        $("#videoTotolPage").html(Math.ceil(total/reqData.pagesize));

                        var imgContent = '<img src="#{THUMB}" videoSrc="#{URL}" name="#{ID}" id="media_#{ID}" title="#{NAME}" style="width:100px;height:100px;cursor:pointer;margin:5px;"/>';

                        $("#videoViewer").empty();
                        $.each(medias, function(index, media) {
                            if(media.thumb!=""&&typeof(media.thumb)!="undefined"){
                                var content = imgContent.replace("#{URL}", media.url);
                                content = content.replace("#{THUMB}", media.thumb);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{NAME}", media.name);
                                $("#videoViewer").append(content);
                            }else{
                                var content = imgContent.replace("#{THUMB}", "web/images/video64.png");
                                content = content.replace("#{URL}", media.url);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{ID}", media.id);
                                content = content.replace("#{NAME}", media.name);
                                $("#videoViewer").append(content);
                            }
                        });
                    }


                } else {
                    $.messager.alert('提示',res.message);
                }
            }
        });
    };

    $("#btnQueryImage").on('click', '', function(){
        $("#imgCurPage").html(1);
        queryMedia($("#edtImageName").textbox('getText'), $("#ddStartDate").datebox('getValue'),
            $("#ddEndDate").datebox('getValue'), $("#cbxMediaLabel").combobox('getValue'), 1,1);
    });

    $("#btnPrePageImg").on('click', '', function(){
        if(parseInt($("#imgCurPage").html())==0 || parseInt($("#imgCurPage").html())==1)
            return;

        var pnumber=parseInt($("#imgCurPage").html())-1;
        $("#imgCurPage").html(pnumber);

        queryMedia($("#edtImageName").textbox('getText'), $("#ddStartDate").datebox('getValue'),
            $("#ddEndDate").datebox('getValue'), $("#cbxMediaLabel").combobox('getValue'), 1,pnumber);
    });

    $("#btnNextPageImg").on('click', '', function(){
        if((parseInt($("#imgCurPage").html())+1)>parseInt($("#imgTotolPage").html()))
            return;

        var pnumber=parseInt($("#imgCurPage").html())+1;
        $("#imgCurPage").html(pnumber);

        queryMedia($("#edtImageName").textbox('getText'), $("#ddStartDate").datebox('getValue'),
            $("#ddEndDate").datebox('getValue'), $("#cbxMediaLabel").combobox('getValue'), 1,pnumber);
    });

    $("#btnQueryVideo").on('click', '', function(){
        $("#videoCurPage").html(1);
        queryMedia($("#edtVideoName1").textbox('getText'), $("#ddStartDate1").datebox('getValue'),
            $("#ddEndDate1").datebox('getValue'), $("#cbxMediaLabel1").combobox('getValue'), 2,1);
    });

    $("#btnPrePageVideo").on('click', '', function(){
        if(parseInt($("#videoCurPage").html())==0 || parseInt($("#videoCurPage").html())==1)
            return;

        var pnumber=parseInt($("#videoCurPage").html())-1;
        $("#videoCurPage").html(pnumber);

        queryMedia($("#edtVideoName1").textbox('getText'), $("#ddStartDate1").datebox('getValue'),
            $("#ddEndDate1").datebox('getValue'), $("#cbxMediaLabel1").combobox('getValue'), 2,pnumber);
    });

    $("#btnNextPageVideo").on('click', '', function(){
        if((parseInt($("#videoCurPage").html())+1)>parseInt($("#videoTotolPage").html()))
            return;

        var pnumber=parseInt($("#videoCurPage").html())+1;
        $("#videoCurPage").html(pnumber);

        queryMedia($("#edtVideoName1").textbox('getText'), $("#ddStartDate1").datebox('getValue'),
            $("#ddEndDate1").datebox('getValue'), $("#cbxMediaLabel1").combobox('getValue'), 2,pnumber);
    });

    $("#btnQueryAudio").on('click', '', function(){
        $("#audioCurPage").html(1);
        queryMedia($("#edtAudioName1").textbox('getText'), $("#ddStartDate2").datebox('getValue'),
            $("#ddEndDate2").datebox('getValue'), $("#cbxMediaLabel2").combobox('getValue'), 3,1);
    });

    $("#btnPrePageAudio").on('click', '', function(){
        if(parseInt($("#audioCurPage").html())==0 || parseInt($("#audioCurPage").html())==1)
            return;

        var pnumber=parseInt($("#audioCurPage").html())-1;
        $("#audioCurPage").html(pnumber);

        queryMedia($("#edtAudioName1").textbox('getText'), $("#ddStartDate2").datebox('getValue'),
            $("#ddEndDate2").datebox('getValue'), $("#cbxMediaLabel2").combobox('getValue'), 3,pnumber);
    });

    $("#btnPrePageAudio").on('click', '', function(){
        if((parseInt($("#audioCurPage").html())+1)>parseInt($("#audioTotolPage").html()))
            return;

        var pnumber=parseInt($("#audioCurPage").html())+1;
        $("#audioCurPage").html(pnumber);

        queryMedia($("#edtAudioName1").textbox('getText'), $("#ddStartDate2").datebox('getValue'),
            $("#ddEndDate2").datebox('getValue'), $("#cbxMediaLabel2").combobox('getValue'), 3,pnumber);
    });

    $("#imageViewer").on('click', 'img', function(){
        if ($(this).hasClass('imgSelected')) {
            $(this).removeClass('imgSelected');
        } else {
            $(".imgSelected").removeClass('imgSelected');
            $(this).addClass('imgSelected');
        }
    });

    $("#videoViewer").on('click', 'img', function(){
        if ($(this).hasClass('videoSelected')) {
            $(this).removeClass('videoSelected');
        } else {
            $(".videoSelected").removeClass('videoSelected');
            $(this).addClass('videoSelected');
        }
    });

    $("#audioViewer").on('click', 'img', function(){
        if ($(this).hasClass('audioSelected')) {
            $(this).removeClass('audioSelected');
        } else {
            $(".audioSelected").removeClass('audioSelected');
            $(this).addClass('audioSelected');
        }
    });

    $("#btnSaveEditText").on('click', '', function(){
        gSelectedNode.text = um.getContent();
        gSelectedNode.time = $("#edtStayTime").numberbox('getValue');

        html2canvas($(".edui-body-container")[0], {
            width: gDisplayWidth,
            height: gDisplayHeight,
            background: "rgba(0,0,0,1)",
            onrendered: function (canvas) {
                var request = {};
                var reqData = {};
                reqData.imgData = canvas.toDataURL();
                request.action = "saveTextImage";
                request.data = reqData;

                $.ajax({
                    type : "POST",
                    url : "web/leddisplay/display.do",
                    dataType : "json",
                    async: true,
                    contentType : "application/json",
                    data : JSON.stringify(request),
                    success : function(res) {
                        if (res.success) {
                            gSelectedNode.imgUrl = res.data.url;
                            var treeObj = $.fn.zTree.getZTreeObj("programTree");
                            treeObj.updateNode(gSelectedNode);
                            treeObj.selectNode(gSelectedNode);
                            zTreeOnClick(null, 'programTree', gSelectedNode);

                            setProgramEditFlag(true);
                            $("#editTextWindow").window('close');
                        } else {
                            $.messager.alert('提示',res.message);
                        }
                    }
                });
            }
        });
    });

    $("#btnSaveGrid").on('click', '', function(){
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        gSelectedNode.execel = $("#edtExcelFile").textbox('getText');
        gSelectedNode.startRow = $('#startRow').numberbox('getValue');
        gSelectedNode.endRow = $('#endRow').numberbox('getValue');
        gSelectedNode.startCol = $('#startCol').numberbox('getValue');
        gSelectedNode.endCol = $('#endCol').numberbox('getValue');
        gSelectedNode.rowCount4One = $('#edtRowCount4One').numberbox('getValue');
        gSelectedNode.lineColor = parseInt($('#edtGridColor').textbox('getText').substring(1, 7), 16);
        gSelectedNode.headColor = parseInt($('#edtHeadColor').textbox('getText').substring(1, 7), 16);
        gSelectedNode.headFont = $('#cbxHeadFont').combobox('getValue');
        gSelectedNode.contentColor = parseInt($('#edtContentColor').textbox('getText').substring(1, 7), 16);
        gSelectedNode.contentFont = $('#cbxContentFont').combobox('getValue');
        gSelectedNode.repeatHead = $('#cbRepeatHead').prop('checked');
        treeObj.updateNode(gSelectedNode);

        var nodes = [];
        treeObj.removeChildNodes(gSelectedNode);
        $.each(gGridImages, function(index, image){
            var node = {id:gNodeId++,pId:gSelectedNode.id, type:40, name:"图片节目", open:true, icon:"web/images/picture.png", time:10};
            node.imgUrl = image;
            nodes.push(node);
        });

        treeObj.addNodes(gSelectedNode, nodes);
        $("#editGridWindow").window('close');

        setProgramEditFlag(true);
    });

    $("#btnSaveImage").on('click', '', function(){
        gSelectedNode.time = $("#edtStayTime").numberbox('getValue');
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var selected = $(".imgSelected");
        if (selected.length > 0) {
            // $(".imgSelected")[0].src
            gSelectedNode.imgUrl = decodeURI($(".imgSelected").attr("imgSrc"));
            gSelectedNode.mediaID = $(".imgSelected").attr("name");
            treeObj.updateNode(gSelectedNode);
        }

        treeObj.selectNode(gSelectedNode);
        zTreeOnClick(null, 'programTree', gSelectedNode);
        $("#selectImageWindow").dialog('close');

        setProgramEditFlag(true);
    });

    $("#btnSaveVideo").on('click', '', function(){
        gSelectedNode.time = $("#edtStayTime").numberbox('getValue');
        var treeObj = $.fn.zTree.getZTreeObj("programTree");
        var selected = $(".videoSelected");
        if (selected.length > 0) {
            // $(".videoSelected")[0].src
            gSelectedNode.imgUrl = decodeURI($(".videoSelected").attr("videoSrc"));
            gSelectedNode.mediaID = $(".videoSelected").attr("name");
            treeObj.updateNode(gSelectedNode);
        }

        treeObj.selectNode(gSelectedNode);
        zTreeOnClick(null, 'programTree', gSelectedNode);
        $("#selectVideoWindow").dialog('close');

        setProgramEditFlag(true);
    });

    $("#btnSaveAudio").on('click', '', function(){
        var selected = $(".audioSelected");
        if (selected.length > 0) {
            audioInfo[0].imgUrl = decodeURI($(".audioSelected")[0].src.substring(0,$(".audioSelected")[0].src.indexOf("web"))+$(".audioSelected").attr("audioSrc"));
            audioInfo[0].mediaID = $(".videoSelected").attr("name");
        }
        $("#selectAudioWindow").dialog('close');
        setProgramEditFlag(true);
    });

    //实时插播节目列表
    function initRealInfoCfg(){
        realInfoArr=[];
        realInfoArr.push({id:1,name:"环境信息",showTime:10});
        realInfoArr.push({id:2,name:"路灯信息",showTime:10});
        realInfoArr.push({id:3,name:"停车信息",showTime:10});
        realInfoArr.push({id:4,name:"充电信息",showTime:10});
        realInfoArr.push({id:5,name:"监控信息",showTime:10});
        realInfoArr.push({id:6,name:"路况信息",showTime:10});
        realInfoArr.push({id:7,name:"违章信息",showTime:10});
    }

    function initQueryDisplayDevices(){
        var request = {};
        var reqData = {};
        request.action = "queryDisplayDevices";
        request.data = reqData;

        $.ajax({
            type : "POST",
            url : "web/lamppost/lamppost.do",
            dataType : "json",
            async: true,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    $('#availableDisplayTable').datagrid('loadData', res.data.devices);
                } else {
                }
            }
        });
    }

    function initProgram(programId) {
        var request = {};
        var reqData = {};
        reqData.programId = programId;
        request.action = "getProgram";
        request.data = reqData;

        $.ajax({
            type : "POST",
            url : "web/leddisplay/display.do",
            dataType : "json",
            async: true,
            contentType : "application/json",
            data : JSON.stringify(request),
            success : function(res) {
                if (res.success) {
                    var treeObj = $.fn.zTree.getZTreeObj("programTree");
                    var rootNode = treeObj.getNodesByParam("id", "1", null)[0];

                    var items=[];
                    audioInfo=[];
                    addAudio=0;
                    $.each(res.data.items, function(index, item){
                        if(item.type==5){
                            addAudio=1;
                            audioInfo.push(item);
                        }else{
                            items.push(item);
                        }
                    });

                    treeObj.addNodes(rootNode, items);
                    treeObj.expandAll(true);

                    $("#edtProgramName").textbox('setText', res.data.name);
                    gNodeId = res.data.maxId;
                    gProgramType = res.data.programType;

                    $("#btnAddText").linkbutton('enable');
                    $("#btnAddPicture").linkbutton('enable');
                    $("#btnAddGrid").linkbutton('enable');
                    $("#btnAddVideo").linkbutton('enable');
                } else {
                    $.messager.alert('提示',res.message);
                }
            }
        });
    }


    function init() {
        getAllMediaLabel();
        $("#edtDisplayWidth").numberbox('setValue', gDisplayWidth);
        $("#edtDisplayHeight").numberbox('setValue', gDisplayHeight);
        $("#displayPanel").css({
            width:gDisplayWidth,
            height:gDisplayHeight
        });
        $("#videoPanel").css({
            width:gDisplayWidth,
            height:gDisplayHeight
        });

        if (gProgramId != -1) {
            initProgram(gProgramId);
        }

        initRealInfoCfg();
        initQueryDisplayDevices();
    }

    init();
})

//点击行时预览实时模板图片(格式为jpg)
function preRealInfoImg(index){
    var rows = $("#real_info_table").datagrid('getRows');
    var id=rows[index].id;
    console.log(id);
    var img = $("#preRealInfoImg").find('img')[0];
    $(img).attr('src', "./web/images/0"+id+".jpg");
}

