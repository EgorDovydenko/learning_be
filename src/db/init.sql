CREATE TABLE tasks (
  id uuid PRIMARY KEY,
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  done boolean NOT NULL DEFAULT false
);
