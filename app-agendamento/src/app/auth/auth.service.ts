import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<any>(this.carregarUsuarioDoStorage());
  public usuario$ = this.usuarioSubject.asObservable();

  constructor() { }

  //Carrega usuário salvo no localStorage
  private carregarUsuarioDoStorage(): any {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined' || user.trim() === '') {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (e) {
      // Se o valor estiver corrompido, remove do storage e retorna null
      localStorage.removeItem('user');
      return null;
    }
  }

  //Executa login e armazena dados localmente
  login(usuario: any, token: string): void {
    if (!usuario || typeof usuario !== 'object') {
      // Não salva valores inválidos
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.usuarioSubject.next(null);
      return;
    }
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    this.usuarioSubject.next(usuario);
  }

  //Remove dados do usuário e notifica logout
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.usuarioSubject.next(null);
  }

  //Recarrega o usuário salvo e atualiza o BehaviorSubject
  atualizarUsuario(): void {
    const usuario = this.carregarUsuarioDoStorage();
    this.usuarioSubject.next(usuario);
  }

  //Retorna papel atual do usuário (CLIENT, PROVIDER, etc.)
  getRole(): string | null {
    return this.carregarUsuarioDoStorage()?.role ?? null;
  }

  //Retorna e-mail do usuário
  getEmail(): string | null {
    return this.carregarUsuarioDoStorage()?.email ?? null;
  }

  //Verifica se há token de autenticação salvo
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //Acesso direto ao usuário atual
  getUsuarioAtual(): any {
    return this.usuarioSubject.getValue();
  }
}
