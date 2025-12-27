<?php
/**
 * Arquivo de configuração do sistema
 */

// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'angocontrol');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configurações da aplicação
define('APP_NAME', 'Angocontrol');
define('APP_VERSION', '1.0.0');
define('BASE_URL', 'http://localhost/angocontrol');

// Timezone
date_default_timezone_set('Africa/Luanda');

// Session
session_start();

// Conexão com banco de dados
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    die("Erro de conexão: " . $e->getMessage());
}

// Função para verificar autenticação
function isAuthenticated() {
    return isset($_SESSION['user_id']);
}

// Função para verificar se é requisição AJAX
function isAjax() {
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

// Função para retornar JSON
function jsonResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
?>
