using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SQLite;

namespace Sqlite
{
    public class MeDataContent
    {
        private readonly static string DataSource="e:/MeData.db";
        /// <summary>
        /// 创建数据库
        /// </summary>
        /// <param name="path">数据库绝对地址，后缀名为.db</param>
        public void CreateData(string path)
        {
            SQLiteConnection.CreateFile(path);
        }

        public bool ExecuteSql(string text)
        {
            var conn = CreateConn();
            var com = new SQLiteCommand();
            com.Connection = conn;
            com.CommandText = text;
            com.ExecuteNonQuery();
            conn.Close();
            return true;
        }


        public SQLiteConnection CreateConn()
        {
            var conn = new SQLiteConnection();
            var connstr = new SQLiteConnectionStringBuilder();
            connstr.DataSource = DataSource;
            connstr.Password = "admin";//设置密码，SQLite ADO.NET实现了数据库密码保护
            conn.ConnectionString = connstr.ToString();
            conn.Open();
            return conn;
        }
    }
}
