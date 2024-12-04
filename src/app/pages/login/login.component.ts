import { Component } from '@angular/core';
import { supabase } from '../../../utils/supabaseClient';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  async login() {
    console.log('Logging in with:', this.email, this.password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      console.log('User logged in:', data.user);
    }
  }
}
