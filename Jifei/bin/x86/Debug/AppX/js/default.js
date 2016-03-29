// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: 此应用程序刚刚启动。在此处初始化
                //您的应用程序。
            } else {
                // TODO: 此应用程序已从挂起状态重新激活。
                // 在此处恢复应用程序状态。
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: 即将挂起此应用程序。在此处保存
        //需要在挂起中保留的任何状态。您可以使用
        // WinJS.Application.sessionState 对象，该对象将在
        //挂起中自动保存和恢复。如果您需要在
        //挂起应用程序之前完成异步操作，请调用
        // args.setPromise()。
    };

    app.start();
})();
var js_cs = new Js_CSharp();
$(function () {
    var s = js_cs.searchUser();
    if (s.length != 0) {
        s = js_cs.searchUser().split(';');
        var res = "";
        for (var i = 0; i < s.length; i++) {
            var q = s[i].split(',');
            res += "<option value='" + q[0] + "'>" + q[1] + "</option>";
        }
        $("#user").append(res);
    }
    sum = loadNoJiSuanData();
    ReadPie();
});
var sum = 0;
var result;
var isFirstPie = true;
var buyuser = new BuyUser();

//记一笔函数
function Add() {
    var name = $("#name").val() == "条目" ? "" : $("#name").val();
    var price = isNumber($("#price").val());
    var user = $("#user").val() == "买单人" ? "所有人" : $("#user").val();
    var userText = user;
    var guid = GetGuid();
    sum += parseFloat(price);//统计金额
    if (resultChange(sum, price)) {//判断总额满足限制了没
        js_cs.executeSql("insert into Project(Id,Name,Price,BuyUserName) values('" + guid + "','" + name + "'," + price + ",'" + userText + "')");
        js_cs.AddUser(userText);//添加购买人缓存
        var content = "<td class='td_ck'><input type='checkbox' value=" + guid + "/></td><td class='td_cn'>" + name + "</td><td class='td_cn'>￥" + price + "</td><td class='td_cn'>" + userText + "</td>";
        $("#bill_content_table").prepend("<tr id=" + guid + "><td colspan='4' style='height:0;'></td></tr>");
        $("#" + guid + " td").animate({ height: 30 }, 400, function () {
            $("#" + guid + " td").replaceWith(content);
            $("#" + guid + " input[type='checkbox']").attr("onClick", "removeTr(this)");//给checkbox加事件
        });


    }

    $("#me_result").hide(500, function() {
        $(this).text(changeTwoDecimal_f(sum));
    }).delay(100).show(500);

}

function jisuan() {
    isFirstPie = true;
    $("#chartPieNone").hide();
    $("#chartCloumn").show();
    $("#chartPie").hide();
    $("#tip_bar").removeClass("tip_active");
    $("#tip_cloumn").addClass("tip_active");
    var seriesList;
    result = eval("(" + js_cs.jisuan() + ")");//求出计算结果
    if (result.length == 1) {
        seriesList = [{
            label: "所有消费",
            legendEntry: true,
            data: result[0]
        }];
    } else {
        seriesList = [{
            label: "私人",
            legendEntry: true,
            data: result[0]
        },
            {
                label: "AA",
                legendEntry: true,
                data: result[1]
            }
        ];
    }
    $("#chart_content").wijbarchart({
        horizontal: false,
        stacked: true,
        shadow:false,
        hint: {
            content: function () {
                return this.data.label + '\n ￥' + this.y + '';
            },
            style: {
                fill: "#333",
                "stroke-width": 2,
                opacity: 0.8
            }
        },
        header: {
            text: "消费统计表"
        },
        seriesList: seriesList,
        seriesStyles: [{
            fill: "#41b535", stroke: "#41b535", opacity: 0.8
        }, {
            fill: "#f5d109", stroke: "#f5d109", opacity: 0.8
        }],
        seriesHoverStyles: [{
            "stroke-width": 1, opacity: 1
        }, {
            "stroke-width": 1, opacity: 1
        }]

    });
    $(".wijchart-header-text").css({
        "fontFamily": "宋体",
        "fontWeight": "bold",
        "fontSize": "14px",
    });
    $(".wijchart-axis-label").css({
        "fontFamily": "宋体",
        "fontWeight": "normal",
        "fontSize": "12px",
    });
}

function isNumber(d) {
    var exp = /^(\d+\.\d+)|(\d)$/g;
    if (d == "") {
        $("#price").val("0.00");
        return "0.00";
    } else if (d.match(exp)) {
        return changeTwoDecimal_f(d);
    } else {
        $("#price").val("0.00");
        return "0.00";
    }
}

function resultChange(s, p) {
    var value = changeTwoDecimal_f(s);//转换为xx.xx格式
    if (value.length >= 11) {
        if (parseFloat(value) > 999999999.99) {
            showMessage("超过最大数值999999999.99");
            sum -= p;
            return false;
        }
        $("#me_result").css("font-size", "5em");
        return true;
    }
    else if (value.length >= 10) {
        $("#me_result").css("font-size", "7em");
        return true;
    }
    else if (value.length >= 8) {
        $("#me_result").css("font-size", "8em");
        return true;
    }
    else if (value.length >= 7) {
        $("#me_result").css("font-size", "10em");
        return true;
    } else {
        $("#me_result").css("font-size", "12em");
        return true;
    }
    return true;

}

function clieckText(dmo) {
    if (dmo.id == "user") {
        buyuser.LoadBuyUser(dmo);
    }
    if ($(dmo).css('color') == "rgb(221, 221, 255)") {
        dmo.value = "";
        dmo.style.color = "#333";
    } else {
        return false;
    }
   
  
}

function blurText(dmo) {
    if (dmo.value == null || dmo.value == "" || parseFloat(dmo.value)< 0) {
        dmo.value = resetValue(dmo.id);
        dmo.style.color = "#ddf";
    }
    buyuser.RemoveBuyUser(dmo);
}
function resetValue(text) {
    switch (text) {
        case "name":
            return "条目";
        case "price":
            return "0.00";
        case "user":
            return "买单人";
        default:
            return "";
    }
}


function removeTr(dmo) {
    var guid = dmo.value.replace("/", "");
    if (dmo.checked == true) {
        $("#" + guid + " .td_cn").css("text-decoration", "line-through");
        $("#" + guid).delay(1000).show(1, function () {
            deleteData(guid);
        });
    } else {
        $("#" + guid).stop(true);
        $("#" + guid + " .td_cn").css("text-decoration", "none");
    }
}

function deleteData(guid) {
    js_cs.executeSql("delete from project where Id='" + guid + "'");//删除数据
    sum -= parseFloat($("#" + guid + " .td_cn:eq(1)").text().replace('￥', ""));
    resultChange(sum, 0);
    $("#me_result").hide(500, function () {
        $(this).text(changeTwoDecimal_f(sum));
    }).delay(100).show(500);
    $("#" + guid).replaceWith("<tr id=" + guid + "><td colspan='4' style='height:30;'></td></tr>");
    $("#" + guid + " td").animate({ height: 0 }, 500, function () {
        $("#" + guid).remove();
    });
}


function loadNoJiSuanData() {
    var sum = 0;
    var s = js_cs.searchProject();
    var p = eval("(" + s + ")");
    for (var i = 0; i < p.length; i++) {
        var content = "<tr id=" + p[i].Id + "><td class='td_ck'><input type='checkbox' value=" + p[i].Id + "/></td><td class='td_cn'>" + p[i].Name + "</td><td class='td_cn'>￥" + changeTwoDecimal_f(p[i].Price) + "</td><td class='td_cn'>" + p[i].BuyUserId + "</td></tr>";
        $("#bill_content_table").prepend(content);
        sum += parseFloat(p[i].Price);//统计金额
    }
    resultChange(sum, 0);
    $("#bill_content_table input[type='checkbox']").attr("onClick", "removeTr(this)");
    $("#me_result").text(changeTwoDecimal_f(sum));
    return sum;
}

function DloadUserData(name) {
    buyuser.loadUserData(name.value);
}