import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-conta-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tipo-conta-selector.component.html',
  styleUrl: './tipo-conta-selector.component.scss'
})
export class TipoContaSelectorComponent {

  constructor(private router: Router) { }

  escolherTipo(tipo: 'CLIENT' | 'PROVIDER') {
    if (tipo === 'CLIENT') {
      this.router.navigate(['/login']);
    } else if (tipo === 'PROVIDER') {
      this.router.navigate(['/login-provider']);
    }
  }
}
