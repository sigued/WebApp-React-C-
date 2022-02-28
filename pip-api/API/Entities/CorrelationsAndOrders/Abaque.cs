using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.CorrelationsAndOrders
{
    public class Abaque
    {
        public Abaque(string title)
        {
            Id = Guid.NewGuid();
            Path = $"{Id}.png";
            Title = title;
        }

        public Guid Id { get; set; }
        public string Path { get; set; }
        public string Title { get; set; }

    }
}
