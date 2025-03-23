export const environment = {
  production: false,
  supabaseUrl: import.meta.env.NG_APP_SUPABASE_URL || 'http://127.0.0.1:54321',
  supabaseKey:
    import.meta.env.NG_APP_SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
  bucketsUrl:
    import.meta.env.NG_APP_BUCKETS_URL ||
    'http://127.0.0.1:54321/storage/v1/object/public',
};
