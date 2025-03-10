import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { supabase } from '../../../../utils/supabaseClient';

@Component({
  selector: 'app-create',
  standalone: true, // ✅ Ensure standalone is true
  imports: [ReactiveFormsModule, CommonModule], // ✅ Include CommonModule
  templateUrl: './create.component.html',
})
export class CreateComponent {
  constructor(private router: Router) {}

  technologyTypes: any[] = []; // Ensure it's an array
  technologyCategories: any[] = []; // Ensure it's an array

  form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    category: new FormControl(''),
  });

  selectedFile: File | null = null;

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  ngOnInit() { // ✅ Fix: Use ngOnInit instead of onInit
    this.fetchTechnologyTypes();
    this.fetchTechnologyCategories();
  }

  async fetchTechnologyTypes() {
    const { data, error } = await supabase.from('technology_types').select('*');

    if (error) {
      console.error('Error fetching technology types:', error);
    } else {
      this.technologyTypes = data;
      console.log('technologyTypes:', this.technologyTypes);
    }
  }

  async fetchTechnologyCategories() {
    const { data, error } = await supabase.from('technology_categories').select('*');

    if (error) {
      console.error('Error fetching technology categories:', error);
    } else {
      this.technologyCategories = data;
      console.log('technologyCategories:', this.technologyCategories);
    }
  }

  async onSubmit() {
    const { name, description, type, category } = this.form.value;

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
        type_id: type,
        category_id: category,
        logo_url: data.fullPath,
      },
    ]);

    this.router.navigate(['/technologies']);
    alert('Technology created successfully!');
  }
}
