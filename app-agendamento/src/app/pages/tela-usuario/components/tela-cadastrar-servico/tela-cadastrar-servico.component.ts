import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-tela-cadastrar-servico',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './tela-cadastrar-servico.component.html',
  styleUrl: './tela-cadastrar-servico.component.scss'
})
export class TelaCadastrarServicoComponent implements OnInit {
  formServico!: FormGroup;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formServico = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      calendario: ['', Validators.required],
      horario: ['', Validators.required],
      tempo: ['', Validators.required],
      tipoAtendimento: ['', Validators.required],
      endereco: ['', Validators.required],
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      contato: ['', Validators.required],
      preco: ['', Validators.required],
      pagamento: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.previewUrls = [];
    this.selectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  cadastrarServico() {
    if (this.formServico.valid) {
      console.log('Dados do serviço:', this.formServico.value);
    } else {
      console.log('Formulário inválido!');
    }
  }

}
