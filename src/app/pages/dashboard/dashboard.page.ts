import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DashboardPage {
  stats = [
    { title: 'Projects Created', value: '12', icon: 'code-slash', color: '#1972a4' },
    { title: 'Forum Posts', value: '8', icon: 'chatbubbles', color: '#f5b202' },
    { title: 'Devices Connected', value: '3', icon: 'bluetooth', color: '#28a745' },
    { title: 'Presets Downloaded', value: '25', icon: 'download', color: '#dc3545' }
  ];

  recentProjects = [
    { name: 'Rainbow Pattern', type: 'Animation', date: '2 hours ago' },
    { name: 'Game Controller', type: 'Game', date: '1 day ago' },
    { name: 'Math Visualizer', type: 'Education', date: '3 days ago' }
  ];

  quickActions = [
    { title: 'Start Coding', icon: 'code-slash', route: '/landing/coding', color: '#1972a4' },
    { title: 'Browse Forum', icon: 'people', route: '/landing/forum', color: '#f5b202' },
    { title: 'Upload Project', icon: 'cloud-upload', route: '/landing/library', color: '#28a745' },
    { title: 'Connect Device', icon: 'bluetooth', route: '/landing/devices', color: '#dc3545' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
