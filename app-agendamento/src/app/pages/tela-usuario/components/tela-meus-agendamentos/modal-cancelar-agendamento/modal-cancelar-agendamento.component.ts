import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-cancel-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-cancelar-agendamento.component.html',
  styleUrl: './modal-cancelar-agendamento.component.scss'
})
export class ModalCancelarAgendamentoComponent {
  @Input() visivel = false;
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
}
