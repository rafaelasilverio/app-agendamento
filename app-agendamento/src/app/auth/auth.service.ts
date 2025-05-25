import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }
}
