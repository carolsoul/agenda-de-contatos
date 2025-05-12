CREATE DATABASE agenda;
USE agenda;

CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    favorite BOOLEAN DEFAULT FALSE,
    photo TEXT,
    address VARCHAR(255),
    `group` ENUM('green', 'purple') NOT NULL DEFAULT 'green',
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contatos (contact_name, phone, email, favorite, photo, address, `group`, category) VALUES
('Alice Souza', '11987654321', 'alice@email.com', TRUE, NULL, 'Rua das Flores, 123', 'green', 'Amigos'),
('Bruno Lima', '11912345678', 'bruno@email.com', FALSE, NULL, 'Av. Brasil, 456', 'purple', 'Trabalho'),
('Carla Mendes', '11923456789', 'carla@email.com', TRUE, NULL, 'Rua Alegre, 789', 'green', 'Família'),
('Daniel Costa', '11934567890', 'daniel@email.com', FALSE, NULL, 'Rua da Paz, 101', 'purple', NULL),
('Emily Rocha', '11944556677', 'emily@email.com', TRUE, NULL, 'Av. Central, 202', 'green', 'Amigos'),
('Fernando Dias', '11999887766', 'fernando@email.com', FALSE, NULL, 'Travessa Azul, 333', 'purple', 'Trabalho'),
('Gabriela Nunes', '11911112222', 'gabi@email.com', TRUE, NULL, 'Rua Bela Vista, 404', 'green', 'Família'),
('Helena Martins', '11933334444', 'helena@email.com', FALSE, NULL, 'Rua do Sol, 505', 'purple', 'Amigos'),
('Igor Pires', '11955556666', 'igor@email.com', TRUE, NULL, 'Alameda Rio, 606', 'green', 'Trabalho'),
('Joana Ribeiro', '11977778888', 'joana@email.com', FALSE, NULL, 'Av. Oceano, 707', 'purple', 'Família');

USE agenda;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (nome, email, senha)
VALUES ('Usuário Teste', 'teste@gmail.com', '123456');

SELECT * FROM usuarios;

SHOW COLUMNS FROM usuarios;

ALTER TABLE usuarios
ADD COLUMN user_phone VARCHAR(20);

SHOW COLUMNS FROM usuarios;

SELECT * FROM usuarios;

USE agenda;

CREATE TABLE verificacoes_email (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE agenda;
SHOW CREATE TABLE usuarios;

INSERT INTO usuarios (user_name, user_email, user_password, user_phone)
VALUES ('Maria Silva', 'maria@email.com', 'senha123', '11987654321');

SELECT * FROM usuarios;