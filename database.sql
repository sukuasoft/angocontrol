-- Banco de dados para o sistema Angocontrol
-- Execute este script para criar as tabelas necessárias

CREATE DATABASE IF NOT EXISTS angocontrol CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE angocontrol;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de cômodos
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'home',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de tipos de dispositivos
CREATE TABLE IF NOT EXISTS device_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    category ENUM('lighting', 'climate', 'security', 'entertainment', 'energy', 'other') DEFAULT 'other',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de dispositivos
CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT,
    type_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    status ENUM('active', 'inactive', 'offline', 'eco') DEFAULT 'inactive',
    performance INT DEFAULT 0,
    ip_address VARCHAR(45),
    mac_address VARCHAR(17),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    FOREIGN KEY (type_id) REFERENCES device_types(id) ON DELETE RESTRICT,
    INDEX idx_user_id (user_id),
    INDEX idx_room_id (room_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de logs de energia
CREATE TABLE IF NOT EXISTS energy_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    device_id INT,
    consumption DECIMAL(10, 2) NOT NULL,
    cost DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_device_id (device_id),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de eventos de segurança
CREATE TABLE IF NOT EXISTS security_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    device_id INT,
    event_type ENUM('motion', 'door_open', 'door_close', 'alarm', 'camera_triggered', 'other') NOT NULL,
    description TEXT,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_severity (severity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de automações
CREATE TABLE IF NOT EXISTS automations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    trigger_type ENUM('time', 'sensor', 'device_state', 'manual') NOT NULL,
    trigger_config JSON NOT NULL,
    action_config JSON NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir tipos de dispositivos padrão
INSERT INTO device_types (name, icon, category) VALUES
('Lâmpada', 'lightbulb', 'lighting'),
('Interruptor', 'toggle-right', 'lighting'),
('Ar Condicionado', 'wind', 'climate'),
('Termostato', 'thermometer', 'climate'),
('Ventilador', 'fan', 'climate'),
('Câmera', 'camera', 'security'),
('Fechadura', 'lock', 'security'),
('Sensor de Movimento', 'activity', 'security'),
('Alarme', 'bell', 'security'),
('TV', 'tv', 'entertainment'),
('Som', 'speaker', 'entertainment'),
('Medidor de Energia', 'zap', 'energy'),
('Tomada Inteligente', 'plug', 'energy'),
('Sensor de Temperatura', 'thermometer', 'other'),
('Sensor de Umidade', 'droplet', 'other');

-- Inserir usuário de teste (senha: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Lando F', 'admin@angocontrol.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Inserir cômodos de exemplo
INSERT INTO rooms (user_id, name, icon) VALUES
(1, 'Sala de Estar', 'sofa'),
(1, 'Quarto Master', 'bed'),
(1, 'Cozinha', 'utensils'),
(1, 'Banheiro', 'bath'),
(1, 'Entrada', 'door-open');

-- Inserir dispositivos de exemplo
INSERT INTO devices (user_id, room_id, type_id, name, status, performance) VALUES
(1, 1, 1, 'Luzes Sala', 'active', 85),
(1, 1, 10, 'TV Samsung', 'active', 92),
(1, 2, 3, 'Ar Condicionado', 'eco', 67),
(1, 5, 6, 'Câmera Entrada', 'active', 98),
(1, 5, 7, 'Fechadura Digital', 'offline', NULL),
(1, 3, 4, 'Termostato', 'active', 76);
