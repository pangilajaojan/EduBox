import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class LandingPage {
  selectedTab = 'dashboard';
  isSidebarOpen = false;

  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate([`/landing/${tab}`]);
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
