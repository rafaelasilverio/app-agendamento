import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ModalPayload {
  tipo: 'criar' | 'editar';
  dados?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private modalSubject = new Subject<ModalPayload>();
  modal$ = this.modalSubject.asObservable();

  abrirModal(payload: ModalPayload) {
    this.modalSubject.next(payload);
  }
}
