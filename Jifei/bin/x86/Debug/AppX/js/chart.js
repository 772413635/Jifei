function ReadPie() {
    var duration = 500;
    var radiusOffset = 10;
    var offset = {};

    $("#chart_content2").bind("wijpiechartmouseover", function (e, objData) {
        if (objData != null) {
            var animation = "Scale";
            if (animation == "None") {
                return;
            }

            var series = objData;
            var sector = $("#chart_content2").wijpiechart("getSector", series.index);
            var shadow = sector.shadow;
            var tracker = sector.tracker;

            //Scale
            if (animation == "Scale") {
                var center = sector.center;
                sector.animate({
                    transform: Raphael.format("s{0},{1},{2},{3}", 1.1, 1.1, sector.center.x, sector.center.y)
                }, duration, "elastic");

                if (shadow) {
                    shadow.animate({
                        transform: Raphael.format("s{0},{1},{2},{3}", 1.1, 1.1, sector.center.x, sector.center.y)
                    }, duration, "elastic");
                }
                if (tracker) {
                    tracker.animate({
                        transform: Raphael.format("s{0},{1},{2},{3}", 1.1, 1.1, sector.center.x, sector.center.y)
                    }, duration, "elastic");
                }
            }
                //Explode
            else {
                offset = sector.getOffset(radiusOffset);

                sector.animate({
                    translation: offset.x + " " + offset.y
                }, duration, "elastic");

                if (shadow) {
                    shadow.animate({
                        translation: offset.x + " " + offset.y
                    }, duration, "elastic");
                }
                if (tracker) {
                    tracker.animate({
                        translation: offset.x + " " + offset.y
                    }, duration, "elastic");
                }
            }
        }
    });

    $("#chart_content2").bind("wijpiechartmouseout", function (e, objData) {
        if (objData != null) {
            var animation = "Scale";

            if (animation == "None") {
                return;
            }

            var series = objData;
            var sector = $("#chart_content2").wijpiechart("getSector", series.index);
            var shadow = sector.shadow;
            var tracker = sector.tracker;

            //Scale
            if (animation == "Scale") {
                sector.animate({
                    transform: Raphael.format("s{0},{1},{2},{3}", 1, 1, sector.center.x, sector.center.y)
                }, duration, "elastic");
                if (shadow) {
                    shadow.animate({
                        transform: Raphael.format("s{0},{1},{2},{3}", 1, 1, sector.center.x, sector.center.y)
                    }, duration, "elastic");
                }
                if (tracker) {
                    tracker.animate({
                        transform: Raphael.format("s{0},{1},{2},{3}", 1, 1, sector.center.x, sector.center.y)
                    }, duration, "elastic");
                }
            }
                //Explode
            else {
                sector.animate({
                    translation: -offset.x + " " + offset.y * -1
                }, duration, "elastic");

                if (shadow) {
                    shadow.animate({
                        translation: -offset.x + " " + offset.y * -1
                    }, duration, "elastic");
                }
                if (tracker) {
                    tracker.animate({
                        translation: -offset.x + " " + offset.y * -1
                    }, duration, "elastic");
                }
                offset = { x: 0, y: 0 };
            }
        }
    });

}


function LoadBar() {
    $("#tip_bar").addClass("tip_active");
    $("#tip_cloumn").removeClass("tip_active");
    if (result == null) {
    } else {
        $("#chartPie").show();
        $("#chartCloumn").hide();
        if (isFirstPie) {
            isFirstPie = false;//是否第一次加载饼图
            var seriesList;
            if (result.length == 1) {
                seriesList = [{
                    label: "所有消费",
                    legendEntry: true,
                    data: result[0]["y"][0],
                    offset: 0
                }];
            } else {
                var name = result[0]["x"];
                var cost = result[0]["y"];
                var avg = result[1]["y"][0];
                seriesList = new Array();
                for (var i = 0; i < name.length; i++) {
                    seriesList.push({ label: name[i], legendEntry: true, data: cost[i] + avg, offset: 0 });
                }
            }
            $("#chart_content2").wijpiechart({
                showChartLabels: true,//显示标签
                hint: {
                    content: function () {
                        return this.data.label + ":￥" + this.value + "(" + Globalize.format((this.total==0?0:(this.value / this.total)), "p2") + ")";
                    },
                    style: {//提示样式
                        fill: "#333",
                        "stroke-width": 2,//边框粗细
                        opacity: 0.8
                    }
                },
                header: {
                    text: "消费统计表"//大标题
                },
                animation: {
                    enabled: false//是否启用动画
                },
                seriesList: seriesList,
                seriesStyles: [{//各个饼的样式
                    fill: "45-#5b95cf-#5b95cf", stroke: "#5b95cf", "stroke-width": 1.5
                }, {
                    fill: "45-#4db849-#4db849", stroke: "#4db849", "stroke-width": 1.5
                }, {
                    fill: "45-#e95045-#e95045", stroke: "#e95045", "stroke-width": 1.5
                }, {
                    fill: "45-#fad00c-#fad00c", stroke: "#fad00c", "stroke-width": 1.5
                }, {
                    fill: "45-#6aaba7-#5f9996", stroke: "#5f9996", "stroke-width": 1.5
                }, {
                    fill: "45-#a6a6a6-#959595", stroke: "#959595", "stroke-width": 1.5
                }, {
                    fill: "45-#6c8587-#617779", stroke: "#617779", "stroke-width": 1.5
                }, {
                    fill: "45-#c7de7a-#b2c76d", stroke: "#b2c76d", "stroke-width": 1.5
                }, {
                    fill: "45-#8ede43-#7fc73c", stroke: "#7fc73c", "stroke-width": 1.5
                }, {
                    fill: "45-#c3ff00-#afe500", stroke: "#afe500", "stroke-width": 1.5
                }, {
                    fill: "45-#a6a6a6-#959595", stroke: "#959595", "stroke-width": 1.5
                }, {
                    fill: "45-#53b9fc-#4aa6e2", stroke: "#4aa6e2", "stroke-width": 1.5
                }, {
                    fill: "45-#537bfc-#4a6ee2", stroke: "#4a6ee2", "stroke-width": 1.5
                }]
            });
        }
        $(".wijchart-header-text").css({
            "fontFamily": "宋体",
            "fontWeight": "bold",
            "fontSize": "14px",
        });
        $("text[class='wijchart-canvas-object wijpiechart']").attr({
            "fontFamily": "宋体",
            "fontSize": "12px",
            "color":"white"
        });
    }


}

function LoadCloumn() {
    $("#tip_bar").removeClass("tip_active");
    $("#tip_cloumn").addClass("tip_active");
    if (result == null) {
    } else {
        $("#chartCloumn").show();
        $("#chartPie").hide();
    }
}