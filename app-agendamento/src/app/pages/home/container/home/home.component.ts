import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { ContainerComponent } from '../../../../shared/components/container/container.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
