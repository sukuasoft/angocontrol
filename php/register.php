<?php
require_once 'config.php';

if (isAuthenticated()) {
    header('Location: ../index.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
        $error = 'Por favor, preencha todos os campos';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Email inválido';
    } elseif (strlen($password) < 6) {
        $error = 'A senha deve ter pelo menos 6 caracteres';
    } elseif ($password !== $confirmPassword) {
        $error = 'As senhas não coincidem';
    } else {
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $existingUser = $stmt->fetch();

        if ($existingUser) {
            $error = 'Este email já está em uso';
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $insertStmt = $pdo->prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "user")');
            $insertStmt->execute([$name, $email, $hashedPassword]);

            header('Location: login.php?registered=1');
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: var(--color-background);">
    <div class="card" style="width: 100%; max-width: 32rem; padding: 2rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="width: 4rem; height: 4rem; background-color: var(--color-primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="1" x2="9" y2="4"></line>
                    <line x1="15" y1="1" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="23"></line>
                    <line x1="15" y1="20" x2="15" y2="23"></line>
                    <line x1="20" y1="9" x2="23" y2="9"></line>
                    <line x1="20" y1="14" x2="23" y2="14"></line>
                    <line x1="1" y1="9" x2="4" y2="9"></line>
                    <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
            </div>
            <h1 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">Criar conta</h1>
            <p style="color: var(--color-muted-foreground); font-size: 0.875rem;">Cadastre-se para acessar o Angocontrol</p>
        </div>

        <?php if (isset($error)): ?>
            <div style="background-color: var(--color-destructive); color: white; padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 1rem; font-size: 0.875rem;">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <div style="margin-bottom: 1rem;">
                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Nome completo</label>
                <input type="text" name="name" required class="search-input" style="width: 100%; padding: 0.75rem;" placeholder="Seu nome"
                    value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>">
            </div>

            <div style="margin-bottom: 1rem;">
                <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Email</label>
                <input type="email" name="email" required class="search-input" style="width: 100%; padding: 0.75rem;" placeholder="seu@email.com"
                    value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>">
            </div>

            <div style="margin-bottom: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Senha</label>
                    <input type="password" name="password" required class="search-input" style="width: 100%; padding: 0.75rem;" placeholder="••••••••">
                </div>
                <div>
                    <label style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">Confirmar senha</label>
                    <input type="password" name="confirm_password" required class="search-input" style="width: 100%; padding: 0.75rem;" placeholder="••••••••">
                </div>
            </div>

            <button type="submit" class="button button-primary" style="width: 100%; padding: 0.75rem; justify-content: center;">
                Registrar
            </button>
        </form>

        <p style="text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--color-muted-foreground);">
            Já tem uma conta? <a href="login.php" style="color: var(--color-primary); font-weight: 600;">Fazer login</a>
        </p>
    </div>
</body>
</html>
