import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-usuario',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './tela-usuario.component.html',
  styleUrl: './tela-usuario.component.scss'
})
export class TelaUsuarioComponent {
  constructor(private router: Router) { }

  paginaCadastrarServico() {
    this.router.navigate(['/register-service']);
  }

}
