using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StoreLocation.Model;

namespace StoreLocation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private readonly CadastroContext _context;

        public CadastroController(CadastroContext context)
        {
            _context = context;
        }

        // GET: api/Cadastro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cadastro>>> GetCadastro()
        {
            return await _context.Cadastro.ToListAsync();
        }

        // GET: api/Cadastro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cadastro>> GetCadastro(int id)
        {
            var cadastro = await _context.Cadastro.FindAsync(id);

            if (cadastro == null)
            {
                return NotFound();
            }

            return cadastro;
        }

        // PUT: api/Cadastro/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCadastro(int id, Cadastro cadastro)
        {
            if (id != cadastro.Id)
            {
                return BadRequest();
            }

            _context.Entry(cadastro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CadastroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cadastro
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Cadastro>> PostCadastro(Cadastro cadastro)
        {
            _context.Cadastro.Add(cadastro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCadastro", new { id = cadastro.Id }, cadastro);
        }

        // DELETE: api/Cadastro/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cadastro>> DeleteCadastro(int id)
        {
            var cadastro = await _context.Cadastro.FindAsync(id);
            if (cadastro == null)
            {
                return NotFound();
            }

            _context.Cadastro.Remove(cadastro);
            await _context.SaveChangesAsync();

            return cadastro;
        }

        private bool CadastroExists(int id)
        {
            return _context.Cadastro.Any(e => e.Id == id);
        }
    }
}
