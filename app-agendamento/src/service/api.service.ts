import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obter todos os serviços disponíveis
  buscarTodosServicos() {
    return this.http.get(`${this.baseUrl}/services`);
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
}
