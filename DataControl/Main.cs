using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeData;

namespace DataControl
{
    public sealed class Main
    {
        MeData.MeData _sqlite = new MeData.MeData();
        public void CreateData()
        {

            _sqlite.CreateData();
        }

        public int ExecuteSql(string text)
        {
            return _sqlite.ExecuteSql(text);
        }

        public string SearchUser(string name)
        {
            var query = _sqlite.SearchUser(name);
            string result = "[";
            foreach (var p in query)
            {
                result += "{Id:\"" + p.Id + "\",Name:\"" + p.Name +"\"},";
            }
            return result.TrimEnd(',') + "]";
        }


        /// <summary>
        /// 返回条目表列表
        /// </summary>
        /// <returns></returns>
        public IList<Project> SearchProject()
        {
            var query = from tt in _sqlite.Project
                       select new Project
                           {
                               Id=tt.Id,
                               Name=tt.Name,
                               Price=tt.Price,
                               BuyUserName=tt.BuyUserName
                           };
            return query.ToList();
        }


        /// <summary>
        /// 计算消费
        /// </summary>
        /// <returns></returns>
        public string Jisuan()
        {
            var query =(from t in _sqlite.Project
                        group t by t.BuyUserName
                        into g
                        select new
                            {
                                g.Key,
                                cost = g.Sum(c=>c.Price)
                            }).ToList();//按购买人分类汇总
            var allCost = query.SingleOrDefault(c => c.Key == "所有人") == null ? 0 : query.SingleOrDefault(c => c.Key == "所有人").cost;//总共消费            
            var buyUserCost = query.Where(c => c.Key != "所有人").ToList();
            if (buyUserCost.Any())
            {
                var averageCost = Math.Round(allCost / buyUserCost.Count(),2,MidpointRounding.ToEven); //平均消费
                var r1 = new StringBuilder() ;
                var r2 = new StringBuilder();
                var r3 = new StringBuilder();
                foreach (var q in buyUserCost)
                {
                    r1.Append("\""+q.Key + "\",");
                    r2.Append("\"" + (q.cost) + "\",");
                    r3.Append("\""+averageCost+"\",");
                }
                string s1 = r1.ToString().TrimEnd(',');
                string s2 = r2.ToString().TrimEnd(',');
                string s3 = r3.ToString().TrimEnd(',');
                return "[{x:[" + s1 + "],y:[" + s2 + "]},{x:[" + s1 + "],y:["+s3+"]}]";
            }
            return "[{x:[\"所有消费\"],y:[\"" + allCost+"\"]}]";
        }

        /// <summary>
        /// 添加购买人
        /// </summary>
        /// <param name="text"></param>
        public void AddUser(string text)
        {
            if (!string.IsNullOrEmpty(text) && text != "所有人")
            {
                var query = _sqlite.Db.Table<User>().SingleOrDefault(c => c.Name == text);
                if (query == null)//新的购买人就缓存起来
                {
                    var u = new User
                    {
                        Name = text
                    };
                    _sqlite.Db.Insert(u);
                }
            }
        }
    }
}
