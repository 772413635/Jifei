using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeData
{
    public class MeData
    {
        //数据文件保存的位置
        dynamic dbPath = Path.Combine(Windows.Storage.ApplicationData.Current.LocalFolder.Path, "Data.db");
        private SQLite.SQLiteConnection db;
        public void CreateData()
        {



            //打开创建数据库和表

            using (db = new SQLite.SQLiteConnection(dbPath))
            {
                //创建表
                db.CreateTable<User>();
                db.CreateTable<Project>();
            }
        }

        public SQLite.SQLiteConnection Db
        {
            get { return db; }
        }


        public SQLite.TableQuery<Project> Project
        {
            get { return db.Table<Project>(); }
        }

        public SQLite.TableQuery<User> User
        {
            get { return db.Table<User>(); }
        }


        /// <summary>
        /// 执行sql返回受影响的行数
        /// </summary>
        /// <param name="text">sql脚本</param>
        /// <returns></returns>
        public int ExecuteSql(string text)
        {
            db = new SQLite.SQLiteConnection(dbPath);
            var comm = new SQLite.SQLiteCommand(db) { CommandText = text };
            return comm.ExecuteNonQuery();
        }

        public List<User> SearchUser(string name)
        {
            db = new SQLite.SQLiteConnection(dbPath);
            var query = string.IsNullOrEmpty(name) ? db.Table<User>().OrderByDescending(c=>c.Name).ToList() : db.Table<User>().Where(c=>c.Name.Contains(name)).OrderByDescending(c=>c.Name).ToList();
            return query;
        }
    }

}
