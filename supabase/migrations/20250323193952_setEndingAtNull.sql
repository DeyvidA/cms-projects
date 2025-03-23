-- Remover NOT NULL de una columna específica en la tabla projects
ALTER TABLE projects ALTER COLUMN ending_at DROP NOT NULL;
