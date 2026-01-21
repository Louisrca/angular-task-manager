import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../../core/auth/interfaces/credentials';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService: AuthService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  error = signal('');

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const credentials: Credentials = this.registerForm.getRawValue();
    this.authService
      .register(credentials)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          console.log('user created');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.error.set(err.error.message);
        },
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}
