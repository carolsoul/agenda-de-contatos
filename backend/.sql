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

-- inserindo dados fictícios
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

SELECT * FROM contatos;

-------------------------------------------------------------------------------------------------------------------

-- Tabela de categorias
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO categorias (nome) VALUES ('Família'), ('Amigos'), ('Trabalho');

ALTER TABLE contatos
    ADD categoria_id INT,
    ADD CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id);

ALTER TABLE contatos DROP COLUMN category;
