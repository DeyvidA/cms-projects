export const environment = {
  production: false,
  supabaseUrl: import.meta.env.NG_APP_SUPABASE_URL || 'http://127.0.0.1:54321',
  supabaseKey:
    import.meta.env.NG_APP_SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  bucketsUrl:
    import.meta.env.NG_APP_BUCKETS_URL ||
    'http://127.0.0.1:54321/storage/v1/object/public',
};
