import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AuthPage {
  isLogin = true;
  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  loading = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Please fill in all fields', 'danger');
      return;
    }

    this.loading = true;
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/landing']);
      this.showToast('Login successful!', 'success');
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    } finally {
      this.loading = false;
    }
  }

  async register() {
    if (!this.email || !this.password || !this.confirmPassword || !this.name) {
      this.showToast('Please fill in all fields', 'danger');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showToast('Passwords do not match', 'danger');
      return;
    }

    if (this.password.length < 6) {
      this.showToast('Password must be at least 6 characters', 'danger');
      return;
    }

    this.loading = true;
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/landing']);
      this.showToast('Registration successful!', 'success');
    } catch (error: any) {
      this.showToast(error.message, 'danger');
    } finally {
      this.loading = false;
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
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
}
