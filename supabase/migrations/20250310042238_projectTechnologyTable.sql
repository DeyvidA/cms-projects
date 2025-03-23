CREATE TABLE project_technologies (
  project_id UUID NOT NULL,
  technology_id UUID NOT NULL,
  PRIMARY KEY (project_id, technology_id),
  CONSTRAINT fk_project
    FOREIGN KEY(project_id)
      REFERENCES projects(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_technology
    FOREIGN KEY(technology_id)
      REFERENCES technologies(id)
      ON DELETE CASCADE
);

ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all users to read project_technologies" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Allow only authenticated users to insert project_technologies" ON project_technologies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to delete project_technologies" ON project_technologies FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow only authenticated users to update project_technologies" ON project_technologies FOR UPDATE USING (auth.role() = 'authenticated');
