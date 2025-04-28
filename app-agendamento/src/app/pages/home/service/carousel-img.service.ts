import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselImgService {

  constructor() { }

  getCarouselItems() {
    return [
      {
        name: 'Manicure',
        description: 'Serviços de manicure e pedicure realizados com cuidado, qualidade e profissionalismo. Agende já!',
        image: '../../../../assets/img/carousel/manicure.jpg'
      },
      {
        name: 'Design Gráfico',
        description: 'Criação de logotipos, banners, materiais digitais e identidade visual para destacar o seu negócio.',
        image: '../../../../assets/img/carousel/design.jpg'
      },
      {
        name: 'Eletricista',
        description: 'Serviços de instalação, manutenção e reparos elétricos com segurança e agilidade.',
        image: '../../../../assets/img/carousel/eletricista.jpg'
      },
      {
        name: 'Aulas de Inglês Online',
        description: 'Aprenda inglês com professores experientes e materiais de apoio, tudo no conforto da sua casa.',
        image: '../../../../assets/img/carousel/professora.jpg'
      }
    ];
  }
}
