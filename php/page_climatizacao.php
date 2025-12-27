<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Listar dispositivos de categoria 'climate'
$stmt = $pdo->prepare(
    "SELECT d.id, d.name, d.status, d.performance,
            COALESCE(r.name,'Sem cômodo') AS room
     FROM devices d
     LEFT JOIN rooms r ON d.room_id = r.id
     LEFT JOIN device_types dt ON d.type_id = dt.id
     WHERE d.user_id = ? AND dt.category = 'climate'
     ORDER BY d.updated_at DESC"
);
$stmt->execute([$_SESSION['user_id']]);
$devices = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Climatização - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="thermometer"></i></div>
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
                    <li><a href="page_climatizacao.php" class="nav-item active"><i data-lucide="thermometer"></i><span>Climatização</span></a></li>
                    <li><a href="page_integracoes.php" class="nav-item"><i data-lucide="puzzle"></i><span>Integrações</span></a></li>
                </ul>
            </div>
            <div class="nav-section nav-bottom">
                <ul class="nav-menu">
                    <li><a href="page_configuracoes.php" class="nav-item"><i data-lucide="settings"></i><span>Configurações</span></a></li>
                    <li><a href="page_suporte.php" class="nav-item"><i data-lucide="help-circle"></i><span>Suporte</span></a></li>
                    <li><a href="logout.php" class="nav-item"><i data-lucide="log-out"></i><span>Logout</span></a></li>
                </ul>
            </div>
        </nav>
    </aside>

    <div class="main-wrapper">
        <header class="header">
            <div class="header-left">
                <h2 class="logo-title">Climatização</h2>
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
                <!-- Controles de temperatura -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Controlar temperatura</h3>
                        <p class="card-subtitle">Ajuste os termostatos por cômodo</p>
                    </div>
                    <form id="climateForm" style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Cômodo</label>
                            <select id="climateRoom" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option>Sala</option>
                                <option>Quarto</option>
                                <option>Cozinha</option>
                                <option>Banheiro</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Temp. alvo (°C)</label>
                            <input type="number" id="tempTarget" placeholder="22" min="15" max="30" step="0.5" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Modo</label>
                            <select id="climateMode" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option value="cool">Refrigeração</option>
                                <option value="heat">Aquecimento</option>
                                <option value="auto">Automático</option>
                            </select>
                        </div>
                        <button type="submit" class="button button-primary">Ajustar</button>
                    </form>
                </div>

                <?php if (!$devices): ?>
                    <div class="card">
                        <div class="empty-state">
                            <i data-lucide="wind" style="width: 2rem; height: 2rem;"></i>
                            <p>Nenhum dispositivo de climatização cadastrado.</p>
                        </div>
                    </div>
                <?php else: ?>
                    <div class="grid grid-cols-3">
                        <?php foreach ($devices as $d): ?>
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title"><?php echo htmlspecialchars($d['name']); ?></h3>
                                    <p class="card-subtitle"><?php echo htmlspecialchars($d['room']); ?></p>
                                </div>
                                <p class="text-muted">Status: <?php echo htmlspecialchars($d['status']); ?></p>
                                <?php if ($d['performance'] !== null): ?>
                                    <div class="progress-bar" style="margin-top: var(--spacing-md);">
                                        <div class="progress-fill" style="width: <?php echo (int)$d['performance']; ?>%;"></div>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
</div>
<script src="https://unpkg.com/lucide@latest"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (window.lucide) { lucide.createIcons(); }
        
        // Handle climate control form
        document.getElementById('climateForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'climate_adjust');
            formData.append('room', document.getElementById('climateRoom').value);
            formData.append('temperature', document.getElementById('tempTarget').value);
            formData.append('mode', document.getElementById('climateMode').value);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Climatização ajustada!');
                    document.getElementById('climateForm').reset();
                    location.reload();
                } else {
                    alert('Erro: ' + (data.message || 'Falha ao ajustar'));
                }
            })
            .catch(err => alert('Erro: ' + err.message));
        });
    });
</script>
</body>
</html>
