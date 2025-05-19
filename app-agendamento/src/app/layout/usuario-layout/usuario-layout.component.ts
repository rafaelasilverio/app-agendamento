import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuario-layout',
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './usuario-layout.component.html',
  styleUrl: './usuario-layout.component.scss'
})
export class UsuarioLayoutComponent {

}
