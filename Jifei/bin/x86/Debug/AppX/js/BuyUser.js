function BuyUser() {

    var selectUserDiv = "<div class='selectUserDiv'></div>";
    this.LoadBuyUser = function(dom) {
        $("#user").after(selectUserDiv);
        loadData("");
        $(".selectUserDiv").animate({
            width: 140,
            height: 190
        }, 500);
    };
    
    this.RemoveBuyUser = function (dom) {
        $(".selectUserDiv").animate({
            width: 0,
            height: 0
        }, 500, function () {
            $(".selectUserDiv").remove();
        });
      
    };
    

    this.loadUserData = function (dom) {
        $("#selectUserUl").remove();
        loadData(dom);

    };

    function loadData(name) {
        var js_cs = new Js_CSharp();
        var query = js_cs.searchUser(name);
        var list = eval(query);
        var result = "<ul id='selectUserUl'><li>所有人</li>";
        for (var i = 0; i < list.length; i++) {
            if(i==list.length-1)
                result += "<li style='border-bottom: 1px dotted #333;'>" + list[i]["Name"] + "</li>";
            else {
                result += "<li>" + list[i]["Name"] + "</li>";
            }
        }
        result += "</ul>";
        $(".selectUserDiv").append(result);
        $("#selectUserUl li").click(function () {
            $("#user").val(this.innerText).css("color", "#333");
        });
    };

}

