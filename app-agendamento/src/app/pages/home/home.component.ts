import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselImgService } from './service/carousel-img.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  services: any[] = [];

  constructor(
    private carouselImgService: CarouselImgService,
    private router: Router
  ) { }

  ngOnInit() {
    this.services = this.carouselImgService.getCarouselItems();
  }

  irParaEscolhaPerfil() {
  this.router.navigate(['/register-choice']);
}
}
