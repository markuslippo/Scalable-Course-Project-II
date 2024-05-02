CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  user_uuid TEXT NOT NULL,
  title text NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  body TEXT NOT NULL,
  user_uuid TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW()
);

CREATE TABLE question_upvotes (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  user_uuid TEXT NOT NULL,
  UNIQUE (question_id, user_uuid)
);

CREATE TABLE answer_upvotes (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  user_uuid TEXT NOT NULL,
  UNIQUE (answer_id, user_uuid)
);

CREATE INDEX idx_questions_course_id ON questions (course_id);
CREATE INDEX idx_answers_question_id ON answers (question_id);

CREATE INDEX idx_questions_user_uuid ON questions (user_uuid);
CREATE INDEX idx_answers_user_uuid ON answers (user_uuid);
CREATE INDEX idx_question_upvotes_user_uuid ON question_upvotes (user_uuid);
CREATE INDEX idx_answer_upvotes_user_uuid ON answer_upvotes (user_uuid);

CREATE INDEX idx_questions_last_activity ON questions (last_activity);
CREATE INDEX idx_answers_last_activity ON answers (last_activity);