import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servico-detalhes-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servico-detalhes-modal.component.html',
  styleUrls: ['./servico-detalhes-modal.component.scss']
})
export class ServicoDetalhesModalComponent {
  @Input() servico!: {
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
  };

  @Output() close = new EventEmitter<void>();
  @Output() agendar = new EventEmitter<void>();

  onClose() { this.close.emit(); }
  onAgendar() { this.agendar.emit(); }
}
