using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StoreLocation.Model
{
    [Table("Cadastro")]
    public class Cadastro
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string CpfCnpj { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string SenhaConfirm { get; set; }
        public string Endereco { get; set; }
        public int Numero { get; set; }
        public string Cep { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string HoraAbertura { get; set; }
        public string HoraFechamento { get; set; }
        public string Categoria { get; set; }
        public string entrega { get; set; }
    }
}
