var sqlite = new DataControl.Main();//创建对象
sqlite.createData();//如果数据库不存在就创建数据库
function Js_CSharp() {

    //同步执行数据库操作，并返回成功个数
    this.executeSql = function (sqltext) {
        return sqlite.executeSql(sqltext);
    };

    //同步执行数据库操作，并返回user表数据的json形式
    this.searchUser = function (name) {
        return sqlite.searchUser(name);
    };
    

    this.searchProject = function () {
        return sqlite.searchProject();
    };
    //计算消费
    this.jisuan = function() {
        return sqlite.jisuan();
    };
    //添加购买人
    this.AddUser = function (text) {
        sqlite.addUser(text);
    };
}