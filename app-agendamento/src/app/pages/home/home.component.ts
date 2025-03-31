import { Component } from '@angular/core';
import { DisplayContainerComponent } from '../../layout/display-container/display-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DisplayContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  services: any[] = [];

  constructor() { }

  ngOnInit() {
    this.services = [
      { name: 'Consultoria de TI', description: 'Serviço especializado para otimizar sua infraestrutura tecnológica.' },
      { name: 'Desenvolvimento Web', description: 'Criação de sites e sistemas personalizados para seu negócio.' },
      { name: 'Segurança da Informação', description: 'Proteção contra ameaças cibernéticas e compliance com normas.' },
      { name: 'Suporte Técnico', description: 'Atendimento rápido para solucionar problemas e manter sua operação ativa.' }
    ];
  }
}
