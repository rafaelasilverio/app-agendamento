import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, //Rota principal
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },

  { path: 'login-in', loadComponent: () => import('./pages/tela-login/tela-login.component').then(m => m.TelaLoginComponent) },
  { path: 'cadastrar-se', loadComponent: () => import('./pages/tela-cadastro/tela-cadastro.component').then(m => m.TelaCadastroComponent) },
  { path: 'cadastrar-servicos', loadComponent: () => import('./pages/cadastrar-servicos/cadastrar-servicos.component').then(m => m.CadastrarServicosComponent) },
  { path: 'catalogo-servicos', loadComponent: () => import('./pages/catalogo-servicos/catalogo-servicos.component').then(m => m.CatalogoServicosComponent) },
  { path: 'sobre', loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent) }
];
