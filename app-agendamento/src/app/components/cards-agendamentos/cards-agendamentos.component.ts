import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agendamento } from './models/agendamento.interface';
import { HttpClient } from '@angular/common/http';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { MatDialog } from '@angular/material/dialog';

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

  cancelado = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,


  ) {}

  cancelarAgendamento() {
    this.http.patch(`http://localhost:3000/appointments/${this.agendamento.id}/cancel`, { status: 'cancelled' })
      .subscribe({
        next: () => {
          this.cancelado = true;
          this.agendamento.status = 'cancelado'; // Atualiza status imediatamente
          this.cancelar.emit(this.agendamento.id);
        },
        error: (err) => {
          const mensagem = err?.error?.message || 'Erro ao cancelar agendamento.';
          this.dialog.open(DialogSuccessComponent, {
            data: { mensagem }
          });
        }
      });
  }
}
