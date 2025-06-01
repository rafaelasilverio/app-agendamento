import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PrimeNG } from 'primeng/config';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, NavbarComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-agendamento';
  usuarioLogado: boolean = false;

  constructor(private primeng: PrimeNG, private authService: AuthService) { }

  ngOnInit() {
    this.primeng.ripple.set(true);

    // Observa se há usuário logado
    this.authService.usuario$.subscribe(usuario => {
      this.usuarioLogado = !!usuario;
    });
  }
}
