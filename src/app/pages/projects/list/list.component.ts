import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { supabase } from '../../../../utils/supabaseClient';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  projects: any[] = [];
  loading: boolean = true;
  bucketsUrl = environment.bucketsUrl;

  async ngOnInit() {
    await this.fetchProjects();
  }

  async fetchProjects() {
    try {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        this.projects = data || [];
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      this.loading = false;
    }
  }

  async deleteProject(id: string) {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        console.error('Error deleting project:', error);
      } else {
        this.projects = this.projects.filter((project) => project.id !== id);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
}
