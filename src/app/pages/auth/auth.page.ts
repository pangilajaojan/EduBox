import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AuthPage implements OnInit, OnDestroy {
  isLogin = true;
  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  loading = false;
  private authSubscription: Subscription | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Listen to auth state changes with debounce to ensure stability
    this.authSubscription = authState(this.auth).pipe(
      debounceTime(500), // Wait 500ms for auth state to stabilize
      distinctUntilChanged() // Only emit when auth state actually changes
    ).subscribe(user => {
      if (user) {
        // User is authenticated, redirect to landing
        console.log('User authenticated, redirecting to landing...', user.uid);
        this.router.navigate(['/landing']);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async login() {
    if (this.loading) return; // Prevent multiple clicks
    
    if (!this.email || !this.password) {
      this.showToast('Please fill in all fields', 'danger');
      return;
    }

    this.loading = true;
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.showToast('Login successful!', 'success');
      // Don't navigate here, let the auth state listener handle it
    } catch (error: any) {
      const errorMessage = this.handleAuthError(error);
      this.showToast(errorMessage, 'danger');
    } finally {
      this.loading = false;
    }
  }

  async register() {
    if (this.loading) return; // Prevent multiple clicks
    
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
      this.showToast('Registration successful!', 'success');
      // Don't navigate here, let the auth state listener handle it
    } catch (error: any) {
      const errorMessage = this.handleAuthError(error);
      this.showToast(errorMessage, 'danger');
    } finally {
      this.loading = false;
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.resetForm();
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
    this.loading = false;
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

  private handleAuthError(error: any): string {
    console.error('Auth error:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      return 'Email sudah terdaftar. Silakan gunakan email lain atau login.';
    } else if (error.code === 'auth/weak-password') {
      return 'Password terlalu lemah. Minimal 6 karakter.';
    } else if (error.code === 'auth/invalid-email') {
      return 'Format email tidak valid.';
    } else if (error.code === 'auth/user-not-found') {
      return 'Email tidak terdaftar. Silakan register terlebih dahulu.';
    } else if (error.code === 'auth/wrong-password') {
      return 'Password salah. Silakan coba lagi.';
    } else if (error.code === 'auth/too-many-requests') {
      return 'Terlalu banyak percobaan. Silakan coba lagi nanti.';
    } else {
      return error.message || 'Terjadi kesalahan. Silakan coba lagi.';
    }
  }
}
