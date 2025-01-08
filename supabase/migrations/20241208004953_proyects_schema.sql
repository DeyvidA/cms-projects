CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  repo_link TEXT NOT NULL,
  demo_link TEXT NOT NULL,
  starting_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ending_at TIMESTAMP WITH TIME ZONE NOT NULL,
  tag TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- ENABLE RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- ALLOW ALL USER TO READ
CREATE POLICY "Allow all users to read projects" ON projects FOR SELECT USING (true);

-- ALLOW ONLY AUTHENTICATED USERS TO INSERT
CREATE POLICY "Allow only authenticated users to insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ALLOW ONLY AUTHENTICATED USERS TO UPDATE
CREATE POLICY "Allow only authenticated users to update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');

-- ALLOW ONLY AUTHENTICATED USERS TO DELETE
CREATE POLICY "Allow only authenticated users to delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
