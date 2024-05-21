
const COMIC_TABLE = `CREATE TABLE IF NOT EXISTS comic (
    comic_id BINARY(16) UNIQUE PRIMARY KEY,
    api_id INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(2083),
    release_date DATE,
    type VARCHAR(255) NOT NULL,
    image VARCHAR(2083)
  )`

export default COMIC_TABLE;