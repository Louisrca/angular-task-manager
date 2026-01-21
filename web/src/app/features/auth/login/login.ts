import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService: AuthService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  error = signal('');

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
      const credentials = this.loginForm.getRawValue();
      this.authService.login(credentials).subscribe((next) => {
        this.router.navigate(['/tasks']);
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}
