import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-tela-usuario',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './tela-usuario.component.html',
  styleUrl: './tela-usuario.component.scss'
})
export class TelaUsuarioComponent {

}
