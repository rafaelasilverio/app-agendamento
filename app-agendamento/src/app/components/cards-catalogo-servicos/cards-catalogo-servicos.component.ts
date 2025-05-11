import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-catalogo-servicos',
  imports: [CommonModule],
  templateUrl: './cards-catalogo-servicos.component.html',
  styleUrl: './cards-catalogo-servicos.component.scss'
})
export class CardsCatalogoServicosComponent {
  @Input() imagem: string = '';
  @Input() titulo: string = '';
  @Input() descricao: string = '';
  @Input() preco: string = '';
  @Input() prestador: string = '';
}
