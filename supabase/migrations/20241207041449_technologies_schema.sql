 CREATE TABLE technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

-- ENABLE RLS
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;

-- POLICIES
-- ALLOW ALL USER TO READ
CREATE POLICY "Allow all users to read technologies" ON technologies FOR SELECT USING (true);

-- ALLOW ONLY AUTHENTICATED USERS TO INSERT
CREATE POLICY "Allow only authenticated users to insert technologies" ON technologies FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ALLOW ONLY AUTHENTICATED USERS TO UPDATE
CREATE POLICY "Allow only authenticated users to update technologies" ON technologies FOR UPDATE USING (auth.role() = 'authenticated');

-- ALLOW ONLY AUTHENTICATED USERS TO DELETE
CREATE POLICY "Allow only authenticated users to delete technologies" ON technologies FOR DELETE USING (auth.role() = 'authenticated');
