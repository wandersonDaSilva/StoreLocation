import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { CadastroModel } from '../model/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private urlAPI = 'https://localhost:44322/api/Cadastro';
  cadastroModel = new CadastroModel();
  resultado: CadastroModel;
  cadastro: any;

  constructor(private http: HttpClient) { }

  salvar(cad: CadastroModel): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const cadastro = JSON.stringify(cad);
    return this.http.post(`${ this.urlAPI }`, cadastro, { headers: header});
  }

  consultaCEP(cep: string): Observable<any> {
    return this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(map(dados => this.resultado = this.converterRespostaParaCep(dados)));

  }
  private converterRespostaParaCep(cepNaResposta): CadastroModel {
    const cep = new CadastroModel();

    cep.cep = cepNaResposta.cep;
    cep.endereco = cepNaResposta.logradouro;
    cep.bairro = cepNaResposta.bairro;
    cep.cidade = cepNaResposta.localidade;
    cep.estado = cepNaResposta.uf;
    return cep;
}
}
