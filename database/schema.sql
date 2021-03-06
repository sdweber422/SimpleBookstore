DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  description TEXT,
  image_url VARCHAR(512),
  title VARCHAR(256) NOT NULL
);

DROP TABLE IF EXISTS authors;
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS genres;
CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE
);

-- we create our join table below
DROP TABLE IF EXISTS book_authors;
CREATE TABLE IF NOT EXISTS book_authors (
  book_id INTEGER,
  author_id INTEGER
);

DROP TABLE IF EXISTS book_genres;
CREATE TABLE IF NOT EXISTS book_genres (
  book_id INTEGER,
  genre_id INTEGER
);
