import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) { }

  paginaMeusAgendamentos() {
    this.router.navigate(['/my-schedules']);
  }

  paginaConfiguracoes() {
    this.router.navigate(['/profile-settings']);
  }

  paginaGerenciarServicos() {
    this.router.navigate(['/manage-services']);
  }
}
