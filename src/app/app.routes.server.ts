import { RenderMode, ServerRoute } from '@angular/ssr';
import { supabase } from '../utils/supabaseClient';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'technologies/edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const { data: technologies, error } = await supabase
        .from('technologies')
        .select('id');

      if (error) {
        console.error('Error fetching technologies:', error);
      }

      return technologies?.map((tech) => ({ id: String(tech.id) })) || [];
    },
  },

  {
    path: 'projects/edit/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('id');

      if (error) {
        console.error('Error fetching projects:', error);
      }

      return projects?.map((project) => ({ id: String(project.id) })) || [];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
