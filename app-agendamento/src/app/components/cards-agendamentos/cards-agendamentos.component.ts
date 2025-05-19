import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agendamento } from './models/agendamento.interface';

@Component({
  selector: 'app-cards-agendamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-agendamentos.component.html',
  styleUrl: './cards-agendamentos.component.scss'
})
export class CardsAgendamentosComponent {
  @Input() agendamento!: Agendamento;
  @Output() cancelar = new EventEmitter<number>();

  cancelarAgendamento() {
    this.cancelar.emit(this.agendamento.id);
  }
}
