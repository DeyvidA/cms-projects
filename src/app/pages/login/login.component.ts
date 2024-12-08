import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { supabase } from '../../../utils/supabaseClient';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(8)],
    }),
  });

  async login() {
    const { email, password } = this.loginForm.value;

    if (!email || !password) {
      alert('Please fill out all required fields.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      localStorage.setItem('supabase.auth.token', data?.session?.access_token);
      window.location.href = '/dashboard';
    }
  }
}
