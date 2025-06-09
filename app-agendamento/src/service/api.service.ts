import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
// Defina ou importe a interface UserProfile conforme necessário
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obter todos os serviços disponíveis
  buscarTodosServicos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }

  // Criar um novo serviço (somente provider)
  cadastrarServico(dados: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/services`, dados, { headers });
  }

  // Editar serviço existente (somente provider)
  atualizarServico(id: number, dados: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/services/${id}`, dados, { headers });
  }

  // Remover serviço existente (somente provider)
  removerServico(id: number, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/services/${id}`, { headers });
  }

  // Listar serviços do provider logado
  buscarMeusServicos(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/services/mine`, { headers });
  }

  // Login de usuário
  login(dados: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, dados);
  }

  // Cadastro de usuário
  cadastrarUsuario(dados: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, dados);
  }

  // Obter dados do usuário autenticado
  obterPerfil(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserProfile>(`${this.baseUrl}/users/profile`, { headers });
  }

  // Atualizar dados do usuário (incluindo senha se necessário)
  atualizarPerfil(dados: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/users/profile`, dados, { headers });
  }

  //Deletar conta do usuário
  deletarConta(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/users/profile`, { headers });
  }

  // Criar agendamento
  agendarServico(dados: any, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/appointments`, dados, { headers });
  }

  // Buscar agendamentos do usuário logado
  buscarMeusAgendamentos(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/appointments`, { headers });
  }

  // Cancelar agendamento
  cancelarAgendamento(id: number, token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.baseUrl}/appointments/${id}/cancel`, {}, { headers });
  }

  atualizarUsuarioParaProvider(email: string) {
    return this.http.patch('/usuarios/provider', { email });
  }

}
