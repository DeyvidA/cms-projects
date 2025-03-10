CREATE TABLE technology_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g., "Frontend", "Backend", "DevOps"
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE technology_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ADD COLUMN type_id UUID REFERENCES technology_types(id);

CREATE POLICY "Allow all users to read technology_types" ON technology_types FOR SELECT USING (true);
CREATE POLICY "Allow only authenticated users to insert technology_types" ON technology_types FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to update technology_types" ON technology_types FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to delete technology_types" ON technology_types FOR DELETE USING (auth.role() = 'authenticated');

CREATE TABLE technology_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::TEXT, now()) NOT NULL
);

ALTER TABLE technology_categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE technologies ADD COLUMN category_id UUID REFERENCES technology_categories(id);

CREATE POLICY "Allow all users to read technology_categories" ON technology_categories FOR SELECT USING (true);
CREATE POLICY "Allow only authenticated users to insert technology_categories" ON technology_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to update technology_categories" ON technology_categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to delete technology_categories" ON technology_categories FOR DELETE USING (auth.role() = 'authenticated');
