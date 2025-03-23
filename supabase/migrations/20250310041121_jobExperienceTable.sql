CREATE TABLE job_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  description TEXT,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

ALTER TABLE job_experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to read job_experiences" ON job_experiences FOR SELECT USING (true);
CREATE POLICY "Allow only authenticated users to insert job_experiences" ON job_experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to update job_experiences" ON job_experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to delete job_experiences" ON job_experiences FOR DELETE USING (auth.role() = 'authenticated');
