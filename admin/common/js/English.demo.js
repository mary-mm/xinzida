$(function () {
    var option = $("<option>").val("0").text("Please choose the province");
    $("[name='province']").append(option);
    option = $("<option>").val("0").text("Please choose the city");
    $("[name='city']").append(option);
    option = $("<option>").val("0").text("Please choose the prefecture");
    $("[name='county']").append(option);
    for (var i = 0; i < areas.length; i++) {
        if (parseInt(areas[i].level) == 1) {
            option = $("<option>").val(areas[i].code).text(areas[i].name);
            $("[name='province']").append(option);
        }
    }
    $("[name='province']").bind("change", function () {
        var code = parseInt($(this).val());
        if (code > 0) {
            $("[name='city'] option:gt(0)").remove();
            $("[name='county'] option:gt(0)").remove();
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].parentCode) == code) {
                    option = $("<option>").val(areas[i].code).text(areas[i].name);
                    $("[name='city']").append(option);
                }
            }
        } else {
            $("[name='city'] option:gt(0)").remove();
            $("[name='county'] option:gt(0)").remove();
        }
        if (code > 0) {
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {
                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;
                    loadPlace(longitude, latitude, 10);
                    break;
                }
            }
        }
    });
    $("[name='city']").bind("change", function () {
        var code = parseInt($(this).val());
        if (code > 0) {
            $("[name='county'] option:gt(0)").remove();
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].parentCode) == code) {
                    option = $("<option>").val(areas[i].code).text(areas[i].name);
                    $("[name='county']").append(option);
                }
            }
        } else {
            $("[name='county'] option:gt(0)").remove();
        }
        if (code > 0) {
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {
                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;
                    loadPlace(longitude, latitude, 12);
                    break;
                }
            }
        }
    });
    $("[name='county']").bind("change", function () {
        var code = parseInt($(this).val());
        if (code > 0) {
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {
                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;
                    loadPlace(longitude, latitude);
                    break;
                }
            }
        }
    });
});

function cancel() {
}