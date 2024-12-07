import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { supabase } from '../../../../utils/supabaseClient';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  selectedFile: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    const { name, description } = this.form.value;

    if (!name || !description || !this.selectedFile) {
      alert('Please fill out all required fields.');
      return;
    }

    const id = Math.random().toString(36).substring(7);
    const imageName = `${id}.png`;
    const { data, error } = await supabase.storage
      .from('technologies')
      .upload(imageName, this.selectedFile);

    if (error) {
      console.error('Error uploading image:', error.message);
      return;
    }

    await supabase.from('technologies').insert([
      {
        name,
        description,
        logo_url: data.fullPath,
      },
    ]);

    alert('Technology created successfully!');
  }
}
