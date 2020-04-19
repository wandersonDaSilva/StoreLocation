import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroModel } from '../model/cadastro';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastro = new CadastroModel();
  cep: any;
  isDisabled = false;
  isInvalid: boolean;
  formRadioOpition: any[];
  form: FormGroup;

  fazEntrega = [
    { valor: 's', desc: 'Sim' },
    { valor: 'n', desc: 'Não' },
  ];

  constructor(
    private cadastroService: CadastroService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.isDisabled = state.isDisabled;
    }
  }

  ngOnInit(): void {
    this.formRadioOpition = this.fazEntrega;

    this.form = this.fb.group({
      nome: [{ value: null, disabled: this.isDisabled }, [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      senhaConfirm: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      horaAbertura: ['', [Validators.required]],
      horaFechamento: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      entrega: ['', [Validators.required]],

    });
  }

  salvar() {
    debugger;
    this.cadastroService.salvar(this.cadastro).subscribe(
      res => {

      },
      error => {
        this.isInvalid = true;
      }
    );
  }

  Cancelar() {
    this.router.navigate(['']);
  }

  consultaCEP(event) {
    this.cep = this.cadastro.cep;
    this.cep = this.cep.replace(/\D/g, '');

    // tslint:disable-next-line: triple-equals
    if (this.cep != '') {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(this.cep)) {
        this.cadastroService.consultaCEP(this.cep).subscribe(
          res => {
            this.cadastro.cep = res.cep;
            this.cadastro.endereco = res.endereco;
            this.cadastro.bairro = res.bairro;
            this.cadastro.cidade = res.cidade;
            this.cadastro.estado = res.estado;
          },
        );
      } else {
        this.cadastro.endereco = '';
        this.cadastro.bairro = '';
        this.cadastro.cidade = '';
        this.cadastro.estado = '';
      }
    }
  }

  hasError(field: any) {
    this.isInvalid = true;
    return this.form.get(field).errors;
  }


}
