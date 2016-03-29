using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeData
{

    public  class User
    {
        [SQLite.AutoIncrement, SQLite.PrimaryKey]
        public int Id { get; set; }

        public string Name { get; set; }

    }

    public class Project
    {
        [SQLite.Unique, SQLite.PrimaryKey, SQLite.MaxLength(32)]
        public string Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        [SQLite.MaxLength(50)]
        public string BuyUserName { get; set; }

        public DateTime BuyTime { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public int Day { get; set; }
    }

    public class SumProject
    {
        [SQLite.Unique, SQLite.PrimaryKey, SQLite.MaxLength(32)]
        public string Id { get; set; }

        [SQLite.Unique,SQLite.MaxLength(32)]
        public string Pid { get; set; }

        public float Price { get; set; }

        [SQLite.MaxLength(50)]
        public string BuyUserName { get; set; }

    }
}
