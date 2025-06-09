import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards-catalogo-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-catalogo-servicos.component.html',
  styleUrl: './cards-catalogo-servicos.component.scss'
})
export class CardsCatalogoServicosComponent {
  @Input() image!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: string;
  @Input() provider!: string;
  @Input() availableDays!: string;
  @Input() dailyHours!: string;
  @Input() duration!: string;
  @Input() attendanceType!: string;
  @Input() location!: string;
  @Input() agendado: boolean = false;

  @Output() agendar = new EventEmitter<void>();
}
