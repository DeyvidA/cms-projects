import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { supabase } from '../../../../utils/supabaseClient';
import { title } from 'process';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    repo_link: new FormControl(''),
    demo_link: new FormControl(''),
    starting_at: new FormControl(''),
    ending_at: new FormControl(''),
    tag: new FormControl(''),
  });

  selectedFile: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
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
      !tag ||
      !this.selectedFile
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    const id = Math.random().toString(36).substring(7);
    const imageName = `${id}.png`;
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(imageName, this.selectedFile);

    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }

    await supabase.from('projects').insert([
      {
        title,
        description,
        repo_link,
        demo_link,
        starting_at,
        ending_at,
        tag,
        image_url: data.fullPath,
      },
    ]);

    alert('Project created successfully!');
  }
}
