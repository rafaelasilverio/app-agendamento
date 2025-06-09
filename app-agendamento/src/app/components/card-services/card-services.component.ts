import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CepPipe } from '../../pipes/cep.pipe';
import { TelefonePipe } from '../../pipes/telefone.pipe';

@Component({
  selector: 'app-card-services',
  imports: [CommonModule, CepPipe, TelefonePipe],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.scss'
})
export class CardServicesComponent {
  @Input() servico: any;
  @Output() editar = new EventEmitter<number>();
  @Output() deletar = new EventEmitter<number>();

  emitirEdicao() {
    this.editar.emit(this.servico.id);
  }

  emitirExclusao() {
    this.deletar.emit(this.servico.id);
  }

  isPrecoValido(preco: any): boolean {
    // Considera válido se for um número finito, não string vazia e maior que zero
    const num = Number(preco);
    return preco !== null && preco !== undefined && preco !== '' && !isNaN(num) && isFinite(num) && num > 0;
  }

  getPrecoFormatado(preco: any): string {
    const num = Number(preco);
    if (isNaN(num) || !isFinite(num)) return '';
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
