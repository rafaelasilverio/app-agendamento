import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() titulo: string = 'Modal';
  @Input() visivel: boolean = false;

  @Output() fechar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.visivel) this.fechar.emit();
  }

  emitirFechar() {
    this.fechar.emit();
  }

  emitirCancelar() {
    this.cancelar.emit();
  }

  emitirSalvar() {
    this.salvar.emit();
  }
}
