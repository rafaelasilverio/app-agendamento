import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Servico {
  id: number;
  image: string;
  images?: string[];
  name: string;
  description: string;
  category: string;
  availableDays: string;
  dailyHours: string;
  duration: string;
  attendanceType: string;
  location: string;
  price: string | number;
  agendado?: boolean;
}

@Component({
  selector: 'app-servico-detalhes-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servico-detalhes-modal.component.html',
  styleUrls: ['./servico-detalhes-modal.component.scss']
})
export class ServicoDetalhesModalComponent {
  @Input() servico!: Servico;

  @Output() close = new EventEmitter<void>();
  @Output() agendar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<Servico>();

  onClose() { this.close.emit(); }
  onAgendar() { this.agendar.emit(); }
  cancelarServico() { this.cancelar.emit(this.servico); }
}
