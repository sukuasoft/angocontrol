<?php
require_once 'config.php';

// Limpar sessão
session_destroy();

// Redirecionar para login
header('Location: login.php');
exit;
?>
