using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataControl
{
    public sealed class Project
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public float Price { get; set; }

        public string BuyUserName { get; set; }

        public string BuyTime { get; set; }
    }
}
