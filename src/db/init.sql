CREATE TABLE tasks (
  id uuid PRIMARY KEY,
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  done boolean NOT NULL DEFAULT false
);

CREATE TABLE themes (
  id uuid PRIMARY KEY,
  title text NOT NULL UNIQUE CHECK (char_length(title) BETWEEN 1 AND 20)
);

CREATE TABLE task_themes (
  task_id uuid NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
  theme_id uuid NOT NULL REFERENCES themes (id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, theme_id)
);

CREATE INDEX task_themes_theme_id_idx ON task_themes (theme_id);