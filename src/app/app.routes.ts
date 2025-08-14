import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then(m => m.LandingPage),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'coding',
        loadComponent: () => import('./pages/coding/coding.page').then(m => m.CodingPage)
      },
      {
        path: 'forum',
        loadComponent: () => import('./pages/forum/forum.page').then(m => m.ForumPage)
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/library/library.page').then(m => m.LibraryPage)
      },
      {
        path: 'devices',
        loadComponent: () => import('./pages/devices/devices.page').then(m => m.DevicesPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
      }
    ]
  }
];
