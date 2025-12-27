<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Buscar dados do usuário
$stmt = $pdo->prepare("SELECT name, email FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configurações - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="settings"></i></div>
                <div class="logo-text">
                    <h1 class="logo-title">Angocontrol</h1>
                    <p class="logo-subtitle">Domótica</p>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-section">
                <p class="nav-label">PRINCIPAL</p>
                <ul class="nav-menu">
                    <li><a href="../index.php" class="nav-item"><i data-lucide="home"></i><span>Dashboard</span></a></li>
                    <li><a href="page_dispositivos.php" class="nav-item"><i data-lucide="cpu"></i><span>Dispositivos</span></a></li>
                    <li><a href="page_monitoramento.php" class="nav-item"><i data-lucide="activity"></i><span>Monitoramento</span></a></li>
                    <li><a href="page_consumo.php" class="nav-item"><i data-lucide="bar-chart-3"></i><span>Consumo</span></a></li>
                    <li><a href="page_seguranca.php" class="nav-item"><i data-lucide="shield"></i><span>Segurança</span></a></li>
                    <li><a href="page_climatizacao.php" class="nav-item"><i data-lucide="thermometer"></i><span>Climatização</span></a></li>
                    <li><a href="page_integracoes.php" class="nav-item"><i data-lucide="puzzle"></i><span>Integrações</span></a></li>
                </ul>
            </div>
            <div class="nav-section nav-bottom">
                <ul class="nav-menu">
                    <li><a href="page_configuracoes.php" class="nav-item active"><i data-lucide="settings"></i><span>Configurações</span></a></li>
                    <li><a href="page_suporte.php" class="nav-item"><i data-lucide="help-circle"></i><span>Suporte</span></a></li>
                    <li><a href="logout.php" class="nav-item"><i data-lucide="log-out"></i><span>Logout</span></a></li>
                </ul>
            </div>
        </nav>
    </aside>

    <div class="main-wrapper">
        <header class="header">
            <div class="header-left">
                <h2 class="logo-title">Configurações</h2>
            </div>
            <div class="header-right">
                <div class="user-profile">
                    <div class="user-info">
                        <span class="user-name"><?php echo htmlspecialchars($_SESSION['user_name'] ?? 'Usuário'); ?></span>
                        <span class="user-role"><?php echo ucfirst($_SESSION['user_role'] ?? 'user'); ?></span>
                    </div>
                    <div class="user-avatar"><?php echo strtoupper(substr($_SESSION['user_name'] ?? 'US', 0, 2)); ?></div>
                </div>
            </div>
        </header>

        <main id="main-content" class="main-content">
            <div class="space-y-6">
                <div class="grid grid-cols-2">
                    <div class="card">
                        <h3 class="card-title">Perfil</h3>
                        <p class="card-subtitle">Atualize seus dados</p>
                        <form id="profileForm" style="margin-top: var(--spacing-md);">
                            <div style="margin-bottom: var(--spacing-md);">
                                <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Nome</label>
                                <input type="text" id="userName" value="<?php echo htmlspecialchars($user['name']); ?>" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                            </div>
                            <div style="margin-bottom: var(--spacing-md);">
                                <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Email</label>
                                <input type="email" id="userEmail" value="<?php echo htmlspecialchars($user['email']); ?>" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                            </div>
                            <button type="submit" class="button button-primary">Guardar mudanças</button>
                        </form>
                    </div>
                    <div class="card">
                        <h3 class="card-title">Notificações</h3>
                        <p class="card-subtitle">Configure alertas</p>
                        <div style="margin-top: var(--spacing-md);">
                            <label style="display: flex; align-items: center; margin-bottom: var(--spacing-md);">
                                <input type="checkbox" checked style="margin-right: var(--spacing-md);">
                                Alertas por email
                            </label>
                            <label style="display: flex; align-items: center;">
                                <input type="checkbox" style="margin-right: var(--spacing-md);">
                                Notificações push
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<script src="https://unpkg.com/lucide@latest"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.lucide) { lucide.createIcons(); }
    });

    document.getElementById('profileForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('action', 'profile_update');
        formData.append('name', document.getElementById('userName').value);
        formData.append('email', document.getElementById('userEmail').value);

        fetch('../php/actions.php', {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            body: formData
        })
        .then(r => r.json())
        .then(data => {
            alert(data.message || data.error);
            if (data.success) location.reload();
        })
        .catch(e => alert('Erro: ' + e));
    });
</script>
</body>
</html>
