import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { supabase } from '../../../utils/supabaseClient';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-technologies',
  imports: [CommonModule, RouterModule],
  templateUrl: './technologies.component.html',
})
export class TechnologiesComponent implements OnInit {
  technologies: any[] = [];
  loading: boolean = true;
  bucketsUrl = environment.bucketsUrl;

  async ngOnInit() {
    await this.fetchTechnologies();
  }

  async fetchTechnologies() {
    try {
      const { data, error } = await supabase.from('technologies').select('*');
      if (error) {
        console.error('Error fetching technologies:', error);
      } else {
        this.technologies = data || [];
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      this.loading = false;
    }
  }

  async deleteTechnology(id: string) {
    try {
      const { error } = await supabase
        .from('technologies')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting technology:', error);
      } else {
        this.technologies = this.technologies.filter(
          (technology) => technology.id !== id
        );
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
}
