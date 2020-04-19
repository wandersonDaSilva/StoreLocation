using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreLocation.Model
{
    public class CadastroContext : DbContext
    {
        public CadastroContext(DbContextOptions<CadastroContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        public DbSet<Cadastro> Cadastro { get; set; }
    }
}