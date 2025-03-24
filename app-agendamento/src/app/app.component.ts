import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PrimeNG } from 'primeng/config';
import { HomeComponent } from './pages/home/container/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app-agendamento';

  constructor(private primeng: PrimeNG) { }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
