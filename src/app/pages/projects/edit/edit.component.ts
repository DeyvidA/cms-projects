import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { supabase } from '../../../../utils/supabaseClient';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
})
export class EditComponent {
  projectId!: string;
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    repo_link: new FormControl(''),
    demo_link: new FormControl(''),
    starting_at: new FormControl(''),
    ending_at: new FormControl(''),
    tag: new FormControl(''),
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.projectId = id;
        this.fetchProject();
      }
    });
  }

  async fetchProject() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', this.projectId)
      .single();

    if (error) {
      console.error('Error fetching project:', error);
    } else {
      console.log('data:', data);
      this.form.setValue({
        title: data?.title,
        description: data?.description,
        repo_link: data?.repo_link,
        demo_link: data?.demo_link,
        starting_at: data?.starting_at,
        ending_at: data?.ending_at,
        tag: data?.tag,
      });
    }
  }

  async onSubmit() {
    const {
      title,
      description,
      repo_link,
      demo_link,
      starting_at,
      ending_at,
      tag,
    } = this.form.value;

    if (
      !title ||
      !description ||
      !repo_link ||
      !demo_link ||
      !starting_at ||
      !ending_at ||
      !tag
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    const { error } = await supabase
      .from('projects')
      .update({
        title,
        description,
        repo_link,
        demo_link,
        starting_at,
        ending_at,
        tag,
      })
      .eq('id', this.projectId);

    if (error) {
      console.error('Error updating project:', error);
    } else {
      this.router.navigate(['/projects']);
    }
  }
}
