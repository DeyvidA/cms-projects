import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { supabase } from '../../../../utils/supabaseClient';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  constructor(private router: Router) {}

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  selectedFile: File | null = null;

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    repo_link: new FormControl(''),
    demo_link: new FormControl(''),
    starting_at: new FormControl(''),
    ending_at: new FormControl(''),
    technologies: new FormControl([]),
  });

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSelectAll: false,
      allowSearchFilter: false,
    };

    this.fetchTechnologies();
  }

  async fetchTechnologies() {
    const { data, error } = await supabase.from('technologies').select('id, name');

    if (error) {
      console.error('Error fetching technologies:', error);
    } else {
      this.dropdownList = data.map((technology) => ({
        item_id: technology.id,
        item_text: technology.name,
      }));
      console.log('Technologies Loaded:', this.dropdownList);
    }
  }

  onItemSelect(item: any) {
    console.log('Selected Item:', item);
  }

  onSelectAll(items: any) {
    console.log('All Selected Items:', items);
  }

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
      technologies,
    } = this.form.value;

    if (
      !title ||
      !description ||
      !repo_link ||
      !demo_link ||
      !starting_at ||
      !ending_at ||
      !this.selectedFile
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    // Upload project image
    const id = Math.random().toString(36).substring(7);
    const imageName = `${id}.png`;
    const { data: imageData, error: imageError } = await supabase.storage
      .from('projects')
      .upload(imageName, this.selectedFile);

    if (imageError) {
      console.error('Error uploading image:', imageError.message);
      return;
    }

    // Insert project into projects table
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          title,
          description,
          repo_link,
          demo_link,
          starting_at,
          ending_at,
          image_url: imageData.fullPath,
        },
      ])
      .select('id')
      .single();

    if (projectError) {
      console.error('Error inserting project:', projectError.message);
      return;
    }

    // Insert selected technologies into project_technologies table
    if (technologies && technologies.length > 0) {
      const projectId = projectData.id;
      const projectTechnologies = technologies.map((tech: any) => ({
        project_id: projectId,
        technology_id: tech.item_id,
      }));

      const { error: techError } = await supabase
        .from('project_technologies')
        .insert(projectTechnologies);

      if (techError) {
        console.error('Error inserting project technologies:', techError.message);
        return;
      }
    }

    alert('Project created successfully!');
    this.router.navigate(['/projects']);
  }

}
