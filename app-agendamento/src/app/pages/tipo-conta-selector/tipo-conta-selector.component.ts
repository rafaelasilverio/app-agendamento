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
    localStorage.setItem('tipoConta', tipo);
    this.router.navigate(['/register']);
  }

}
