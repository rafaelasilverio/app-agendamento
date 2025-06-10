import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AgendamentoSyncService {
  private agendamentoAtualizadoSource = new Subject<void>();
  agendamentoAtualizado$ = this.agendamentoAtualizadoSource.asObservable();

  notificarAtualizacao() {
    this.agendamentoAtualizadoSource.next();
  }
}
