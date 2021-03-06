﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication5.Models
{
    public class SaleDTO
    {
        public int Id { get; set; }

        public int? ProductId { get; set; }

        public int? CustomerId { get; set; }

        public int? StoreId { get; set; }

        public System.DateTime? DateSold { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual Product Product { get; set; }

        public virtual Store Store { get; set; }
    }
}