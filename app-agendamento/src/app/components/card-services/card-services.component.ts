import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-services',
  imports: [CommonModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})
export class CardServicesComponent {
  @Input() servico: any;
  @Output() editar = new EventEmitter<number>();
  @Output() deletar = new EventEmitter<number>();

  onEditar() {
    this.editar.emit(this.servico.id);
  }

  onDeletar() {
    this.deletar.emit(this.servico.id);
  }
}
