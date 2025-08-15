import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, updateProfile, User } from '@angular/fire/auth';
import { AlertController, ToastController, NavController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

// Single interface definitions
interface ProfileData {
  displayName: string;
  email: string;
  joinDate: string;
  bio: string;
  skills: string;
  xpPoints: number;
  location: string;
  website: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  date?: string;
  xp: number;
}

interface Activity {
  action: string;
  item: string;
  emoji: string;
  time: string;
  xp: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ProfilePage implements OnInit {
  // User data
  user: User | null = null;
  isEditing = false;
  isLoading = false;
  showAchievementModal = false;
  selectedAchievement: Achievement | null = null;

  // Profile data
  profileData: ProfileData = {
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2023-01-15',
    bio: 'Passionate learner and coding enthusiast',
    skills: 'JavaScript, Angular, UI/UX',
    xpPoints: 1250,
    location: 'New York, USA',
    website: 'https://example.com'
  };

  // Achievements data
  achievements: Achievement[] = [
    { id: 1, title: 'Fast Learner', description: 'Completed 5 modules in a week', emoji: '🚀', unlocked: true, date: '2023-05-10', xp: 100 },
    { id: 2, title: 'Code Master', description: 'Solved 50+ coding challenges', emoji: '💻', unlocked: true, date: '2023-06-22', xp: 150 },
    { id: 3, title: 'Quiz Champion', description: 'Scored 100% on 10 quizzes', emoji: '🏆', unlocked: false, xp: 200 },
    { id: 4, title: 'Early Bird', description: 'Logged in 7 days in a row', emoji: '🌅', unlocked: false, xp: 75 },
    { id: 5, title: 'Social Butterfly', description: 'Connected with 10+ friends', emoji: '🦋', unlocked: true, date: '2023-07-15', xp: 125 },
    { id: 6, title: 'Module Master', description: 'Completed all modules in a track', emoji: '🎯', unlocked: false, xp: 300 }
  ];

  // Recent activity data
  recentActivity: Activity[] = [
    { action: 'Completed', item: 'JavaScript Basics', time: '2h ago', emoji: '✅', xp: 50 },
    { action: 'Earned', item: 'Fast Learner Badge', time: '1d ago', emoji: '🎖️', xp: 100 },
    { action: 'Started', item: 'Angular Fundamentals', time: '2d ago', emoji: '📚', xp: 0 },
    { action: 'Shared', item: 'Project on Community', time: '3d ago', emoji: '📤', xp: 25 },
    { action: 'Reached', item: 'Level 5', time: '1w ago', emoji: '⭐', xp: 200 }
  ];

  // Current active tab
  currentTab = 'profile';

  // Navigation items
  navItems: NavItem[] = [
    { id: 'home', label: 'Beranda', icon: '🏠', route: '/home' },
    { id: 'workspace', label: '3D Space', icon: '🎮', route: '/workspace' },
    { id: 'coding', label: 'Coding', icon: '💻', route: '/coding' },
    { id: 'modules', label: 'Modul', icon: '📚', route: '/modules' },
    { id: 'profile', label: 'Profile', icon: '👤', route: '/profile' }
  ];


  // Navigation method
  navigateTo(route: string): void {
    if (this.router.url !== route) {
      this.router.navigate([route]);
    }
  }

  constructor(
    private auth: Auth,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.initializeAuth();
  }

  ngOnInit(): void {
    this.loadProfileData();
    this.simulateLoading();
  }

  // Computed property for unlocked achievements count
  get unlockedAchievementsCount(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }

  private initializeAuth(): void {
    this.auth.onAuthStateChanged((user: User | null) => {
      this.user = user;
      if (user) {
        this.loadProfileData();
      } else {
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  private simulateLoading(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  loadProfileData(): void {
    if (this.user) {
      this.profileData = {
        ...this.profileData,
        displayName: this.user.displayName || this.profileData.displayName,
        email: this.user.email || this.profileData.email
      };
    }
  }

  // Profile editing methods
  startEditing(): void {
    this.isEditing = true;
  }

  async saveProfile(): Promise<void> {
    if (!this.user) return;

    try {
      await updateProfile(this.user, {
        displayName: this.profileData.displayName
      });
      this.isEditing = false;
      this.showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      this.showToast(`Failed to update profile: ${error.message}`, 'danger');
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.loadProfileData();
  }

  // Avatar methods
  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  async changeAvatar(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Change Profile Picture',
      inputs: [{
        name: 'avatarUrl',
        type: 'url',
        placeholder: 'Enter image URL',
        attributes: { inputmode: 'url' }
      }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data: { avatarUrl: string }) => {
            if (data.avatarUrl) {
              this.showToast('Profile picture updated!', 'success');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  // UI feedback methods
  private async showToast(
    message: string, 
    color: 'primary' | 'success' | 'warning' | 'danger' = 'primary'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
      cssClass: 'custom-toast',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    await toast.present();
  }

  // Achievement methods
  viewAchievement(achievement: Achievement): void {
    if (achievement.unlocked) {
      this.selectedAchievement = achievement;
      this.showAchievementModal = true;
    }
  }

  closeModal(): void {
    this.showAchievementModal = false;
    this.selectedAchievement = null;
  }

  // Profile actions
  editProfile(): void {
    this.showToast('Opening profile editor...', 'primary');
    // Tambahkan logika untuk mengedit profil di sini
    // Misalnya, menavigasi ke halaman edit profil
  }

  viewCertificates(): void {
    this.showToast('Loading your certificates...', 'primary');
    // Tambahkan logika untuk melihat sertifikat di sini
    // Misalnya, menavigasi ke halaman sertifikat
  }

  // *** Fungsi yang Anda butuhkan untuk memperbaiki error ***
  openSettings(type: string): void {
    console.log(`Membuka pengaturan untuk: ${type}`);
    this.showToast(`Membuka pengaturan ${type}...`, 'primary');
    // Di sini Anda bisa menambahkan logika navigasi berdasarkan `type`
    // Contoh: 
    // this.router.navigate(['/settings', type]);
  }

  // XP and level calculations
  getLevel(): number {
    const xp = this.getTotalXP();
    return Math.floor(Math.sqrt(xp) / 5) + 1;
  }

  getCurrentXP(): number {
    const level = this.getLevel();
    const baseXP = Math.pow((level - 1) * 5, 2);
    return this.getTotalXP() - baseXP;
  }

  getNextLevelXP(): number {
    const level = this.getLevel();
    return Math.pow(level * 5, 2) - Math.pow((level - 1) * 5, 2);
  }

  getXPToNextLevel(): number {
    return this.getNextLevelXP() - this.getCurrentXP();
  }

  getTotalXP(): number {
    return this.achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.xp, 0);
  }

  getCompletedCount(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }

  getLevelBadge(): string {
    const level = this.getLevel();
    if (level < 5) return '🥉 Beginner';
    if (level < 10) return '🥈 Intermediate';
    if (level < 15) return '🥇 Advanced';
    return '🏆 Master';
  }

  getLevelProgress(): number {
    return (this.getCurrentXP() / this.getNextLevelXP()) * 100;
  }

  // Update profile from auth
  private updateProfileFromAuth(user: User): void {
    if (user.displayName) {
      this.profileData.displayName = user.displayName;
    }
    if (user.email) {
      this.profileData.email = user.email;
    }
  }
}