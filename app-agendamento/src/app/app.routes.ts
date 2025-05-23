import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/tela-login/tela-login.component').then(m => m.TelaLoginComponent) },
  {
    path: 'register-choice',
    loadComponent: () => import('./pages/tipo-conta-selector/tipo-conta-selector.component')
      .then(m => m.TipoContaSelectorComponent)
  },
  { path: 'register', loadComponent: () => import('./pages/tela-cadastro/tela-cadastro.component').then(m => m.TelaCadastroComponent) },
  { path: 'service-catalog', loadComponent: () => import('./pages/catalogo-servicos/catalogo-servicos.component').then(m => m.CatalogoServicosComponent) },
  { path: 'team', loadComponent: () => import('./pages/tela-equipe/tela-equipe.component').then(m => m.TelaEquipeComponent) },
  { path: 'about', loadComponent: () => import('./pages/sobre/sobre.component').then(m => m.SobreComponent) },
  { path: 'recover-password', loadComponent: () => import('./pages/tela-recuperacao-senha/tela-recuperacao-senha.component').then(m => m.TelaRecuperacaoSenhaComponent) },
  { path: 'faq', loadComponent: () => import('./pages/tela-faq/tela-faq.component').then(m => m.TelaFaqComponent) },

  // Layout com sidebar para usuários autenticados
  {
    path: '',
    loadComponent: () => import('./layout/usuario-layout/usuario-layout.component').then(m => m.UsuarioLayoutComponent),
    children: [
      { path: 'user', loadComponent: () => import('./pages/tela-usuario/tela-usuario.component').then(m => m.TelaUsuarioComponent) },
      { path: 'profile-settings', loadComponent: () => import('./pages/tela-usuario/components/tela-configuracoes-perfil/tela-configuracoes-perfil.component').then(m => m.TelaConfiguracoesPerfilComponent) },
      { path: 'my-schedules', loadComponent: () => import('./pages/tela-usuario/components/tela-meus-agendamentos/tela-meus-agendamentos.component').then(m => m.TelaMeusAgendamentosComponent) },
      { path: 'manage-services', loadComponent: () => import('./pages/tela-usuario/components/tela-gerenciamento-servicos/tela-gerenciamento-servicos.component').then(m => m.TelaGerenciamentoServicosComponent) },
    ]
  },

  { path: '**', redirectTo: '/home' }
];
