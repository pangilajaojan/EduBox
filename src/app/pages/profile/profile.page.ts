import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, updateProfile, User } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ProfilePage {
  user: User | null = null;
  isEditing = false;
  
  profileData = {
    displayName: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    skills: ''
  };

  achievements = [
    { title: 'First Project', description: 'Created your first LED cube project', icon: 'star', color: '#f5b202', unlocked: true },
    { title: 'Code Master', description: 'Uploaded 10 projects', icon: 'code', color: '#1972a4', unlocked: true },
    { title: 'Community Helper', description: 'Helped 5 other users', icon: 'people', color: '#28a745', unlocked: true },
    { title: 'Innovator', description: 'Created a unique pattern', icon: 'bulb', color: '#6f42c1', unlocked: false },
    { title: 'Speed Coder', description: 'Complete a project in under 1 hour', icon: 'flash', color: '#dc3545', unlocked: false }
  ];

  stats = [
    { label: 'Projects Created', value: '12', icon: 'code-slash' },
    { label: 'Forum Posts', value: '8', icon: 'chatbubbles' },
    { label: 'Presets Downloaded', value: '25', icon: 'download' },
    { label: 'Devices Connected', value: '3', icon: 'bluetooth' },
    { label: 'Learning Hours', value: '48', icon: 'time' },
    { label: 'Achievements', value: '3/5', icon: 'trophy' }
  ];

  recentActivity = [
    { action: 'Created project', item: 'Rainbow Pattern', time: '2 hours ago', icon: 'add-circle' },
    { action: 'Downloaded preset', item: 'Snake Game', time: '1 day ago', icon: 'download' },
    { action: 'Posted in forum', item: 'Help with LED cube', time: '2 days ago', icon: 'chatbubble' },
    { action: 'Connected device', item: 'EduBox LED Cube 001', time: '3 days ago', icon: 'bluetooth' },
    { action: 'Completed tutorial', item: 'LED Cube Basics', time: '1 week ago', icon: 'checkmark-circle' }
  ];

  constructor(
    private auth: Auth,
    private toastController: ToastController
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.loadProfileData();
      }
    });
  }

  loadProfileData() {
    if (this.user) {
      this.profileData.displayName = this.user.displayName || '';
      this.profileData.email = this.user.email || '';
      this.profileData.bio = 'Passionate LED cube programmer and STEAM enthusiast';
      this.profileData.location = 'Jakarta, Indonesia';
      this.profileData.website = 'https://github.com/eduboxuser';
      this.profileData.skills = 'JavaScript, Python, Arduino, LED Programming';
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  async saveProfile() {
    if (!this.user) return;

    try {
      await updateProfile(this.user, {
        displayName: this.profileData.displayName
      });
      
      this.isEditing = false;
      this.showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      this.showToast('Failed to update profile: ' + error.message, 'danger');
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.loadProfileData();
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    toast.present();
  }

  getAchievementProgress(): number {
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return (unlocked / this.achievements.length) * 100;
  }

  getLevel(): number {
    const totalPoints = this.stats.reduce((sum, stat) => {
      if (stat.label === 'Projects Created') return sum + parseInt(stat.value) * 10;
      if (stat.label === 'Forum Posts') return sum + parseInt(stat.value) * 5;
      if (stat.label === 'Presets Downloaded') return sum + parseInt(stat.value) * 2;
      if (stat.label === 'Devices Connected') return sum + parseInt(stat.value) * 15;
      if (stat.label === 'Learning Hours') return sum + parseInt(stat.value) * 1;
      return sum;
    }, 0);
    
    return Math.floor(totalPoints / 100) + 1;
  }

  getLevelProgress(): number {
    const totalPoints = this.stats.reduce((sum, stat) => {
      if (stat.label === 'Projects Created') return sum + parseInt(stat.value) * 10;
      if (stat.label === 'Forum Posts') return sum + parseInt(stat.value) * 5;
      if (stat.label === 'Presets Downloaded') return sum + parseInt(stat.value) * 2;
      if (stat.label === 'Devices Connected') return sum + parseInt(stat.value) * 15;
      if (stat.label === 'Learning Hours') return sum + parseInt(stat.value) * 1;
      return sum;
    }, 0);
    
    return (totalPoints % 100);
  }
}
