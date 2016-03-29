function changeTwoDecimal_f(floatvar) {
    var fX = parseFloat(floatvar);
    if (isNaN(fX)) {
        return false;
    }
    fX = Math.round(floatvar * 100) / 100;
    var sX = fX.toString();
    var posDecimal = sX.indexOf('.');
    if (posDecimal < 0) {
        posDecimal = sX.length;
        sX += '.';
    }
    while (sX.length <= posDecimal + 2) {
        sX += '0';
    }
    return sX;
}

function showMessage(theMessage) {
    Windows.UI.Popups.MessageDialog(theMessage).showAsync().then();
}


//数据对象
function MeData(id,name,pirce,user,date) {
    this.id = id;
    this.name = name;
    this.pirce = pirce;
    this.name = name;
    this.user = user;
    this.date = date;
}

function GetGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "";
    }
    return guid;

}
