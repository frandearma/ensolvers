DROP TABLE IF EXISTS folder;
DROP TABLE IF EXISTS task;
CREATE TABLE folder (
    id integer AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(200) NOT NULL
);
CREATE TABLE task (
    id integer AUTO_INCREMENT  PRIMARY KEY,
    detail VARCHAR(200) NOT NULL,
    checked boolean DEFAULT false,
    folder_id integer NOT NULL DEFAULT 0
);