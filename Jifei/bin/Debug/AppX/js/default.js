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
var sum = 0;
var dataList = new Array();
//记一笔函数
function Add() {
    var name = $("#name").val() == "条目" ? "" : $("#name").val();
    var price = isNumber($("#price").val());
    var user = $("#user").val() == "买单人" ? "" : $("#user").val();
    sum += parseFloat(price);//统计金额
    if (resultChange(sum, price)) {//判断总额满足限制了没
        var guid = GetGuid();
        var content = "<tr id="+guid+"><td class='td_ck'><input type='checkbox' value="+guid+"/></td><td class='td_cn'>" + name + "</td><td class='td_cn'>￥" + price + "</td><td class='td_cn'>" + user + "</td></tr>";
        $("#bill_content_table").prepend(content);
        $("#bill_content_table input[type='checkbox']").attr("onClick", "removeTr(this)");
        var d = new MeData(guid, name, parseFloat(price), user, "");
        dataList.push(d);
    }
    $("#me_result").text(changeTwoDecimal_f(sum));
}

function jisuan() {
    $("#chart_content").wijbarchart({
        horizontal: false,
        hint: {
            content: function () {
                return this.data.label + '\n ' + this.y + '';
            }
        },
        header: {
            text: "消费统计表"
        },
        seriesList: [{
            label: "金额",
            legendEntry: false,
            data: { x: ['张三', '李四', '王五'], y: [1, 2, 5] }
        }]
    });
    $(".wijchart-header-text").css({
        "fontFamily":"宋体",
        "fontWeight":"bold",
        "fontSize":"14px",
    });
    $(".wijchart-axis-label").css({
        "fontFamily": "宋体",
        "fontWeight": "normal",
        "fontSize": "12px",
    });
    $(".wijchart-axis-gridline").css({
        "color": "red",
        "height":"1px"
    });
    $(".bartracker").css("background-color","#000");
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
    }
    return true;

}

function clieckText(dmo) {
    if ($(dmo).css('color') == "rgb(221, 221, 255)") {
        dmo.value = "";
        dmo.style.color = "#333";
    } else {
        return false;
    }
}

function blurText(dmo) {
    if (dmo.value == null || dmo.value == "") {
        dmo.value=resetValue(dmo.id);
        dmo.style.color = "#ddf";
    }
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
        $("#" + guid).delay(2000).hide(500, function (id) {
        });
    } else {
        $("#" + guid).stop(true);
    }
}
