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