import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/tela-login/tela-login.component').then(m => m.TelaLoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/tela-cadastro/tela-cadastro.component').then(m => m.TelaCadastroComponent) },
  { path: 'user', loadComponent: () => import('./pages/tela-usuario/tela-usuario.component').then(m => m.TelaUsuarioComponent) },
  { path: 'profile-settings', loadComponent: () => import('./pages/tela-configuracoes-perfil/tela-configuracoes-perfil.component').then(m => m.TelaConfiguracoesPerfilComponent) },
  { path: 'register-services', loadComponent: () => import('./pages/cadastrar-servicos/cadastrar-servicos.component').then(m => m.CadastrarServicosComponent) },
  { path: 'my-schedules', loadComponent: () => import('./pages/tela-meus-agendamentos/tela-meus-agendamentos.component').then(m => m.TelaMeusAgendamentosComponent) },
  { path: 'service-catalog', loadComponent: () => import('./pages/catalogo-servicos/catalogo-servicos.component').then(m => m.CatalogoServicosComponent) },
  { path: 'team', loadComponent: () => import('./pages/tela-equipe/tela-equipe.component').then(m => m.TelaEquipeComponent) },
  { path: 'about', loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent) },
  { path: 'recover-password', loadComponent: () => import('./pages/tela-recuperacao-senha/tela-recuperacao-senha.component').then(m => m.TelaRecuperacaoSenhaComponent) },

  { path: '**', redirectTo: '/home' }
];
