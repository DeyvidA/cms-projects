import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    repo_link: new FormControl(''),
    demo_link: new FormControl(''),
    starting_at: new FormControl(''),
    ending_at: new FormControl(''),
    tag: new FormControl(''),
    technologies: new FormControl([]),
  });

  onInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.fetchTechnologies();
  }

  selectedFile: File | null = null;

  async fetchTechnologies() {
    const { data, error } = await supabase.from('technologies').select('*');

    if (error) {
      console.error('Error fetching technologies:', error);
    } else {
      this.dropdownList = data.map((technology) => ({
        item_id: technology.id,
        item_text: technology.name,
      }));

      console.log('dropdownList:', this.dropdownList);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
