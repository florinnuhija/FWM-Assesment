CREATE DATABASE IF NOT EXISTS full_stack_assignment;
USE full_stack_assignment;

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);