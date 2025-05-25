import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards-catalogo-servicos',
  imports: [CommonModule],
  templateUrl: './cards-catalogo-servicos.component.html',
  styleUrl: './cards-catalogo-servicos.component.scss'
})
export class CardsCatalogoServicosComponent {
  @Input() imagem = '';
  @Input() titulo = '';
  @Input() descricao = '';
  @Input() preco = '';
  @Input() prestador = '';
  @Input() diasDisponiveis = '';
  @Input() cargaHoraria = '';
  @Input() duracao = '';
  @Input() tipoAtendimento = '';
  @Input() local = '';

  @Output() agendar = new EventEmitter<void>();

  onAgendar() {
    this.agendar.emit();
  }
}
