<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Agregar consumo dos últimos 6 meses
$stmt = $pdo->prepare(
    "SELECT 
        DATE_FORMAT(timestamp, '%Y-%m') AS period_key,
        DATE_FORMAT(timestamp, '%b/%y') AS period_label,
        SUM(consumption) AS total_consumption
     FROM energy_logs
     WHERE user_id = ? AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
     GROUP BY period_key, period_label
     ORDER BY period_key ASC"
);
$stmt->execute([$_SESSION['user_id']]);
$rows = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consumo - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="bar-chart-3"></i></div>
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
                    <li><a href="page_consumo.php" class="nav-item active"><i data-lucide="bar-chart-3"></i><span>Consumo</span></a></li>
                    <li><a href="page_seguranca.php" class="nav-item"><i data-lucide="shield"></i><span>Segurança</span></a></li>
                    <li><a href="page_climatizacao.php" class="nav-item"><i data-lucide="thermometer"></i><span>Climatização</span></a></li>
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
                <h2 class="logo-title">Consumo de Energia</h2>
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
                <!-- Adicionar leitura -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Registrar consumo</h3>
                        <p class="card-subtitle">Adicione uma nova medição</p>
                    </div>
                    <form id="energyForm" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Consumo (KZ)</label>
                            <input type="number" id="consumption" placeholder="Ex: 12.5" step="0.01" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Dispositivo (opcional)</label>
                            <select id="deviceId" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option value="">Consumo geral</option>
                            </select>
                        </div>
                        <button type="submit" class="button button-primary">Registrar</button>
                    </form>
                </div>

                <!-- Gráfico de consumo -->
                <div class="grid grid-cols-2">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Últimos 6 meses</h3>
                            <p class="card-subtitle">Total por mês</p>
                        </div>
                        <?php if (!$rows): ?>
                            <p class="text-muted">Sem leituras ainda. Adicione dados em energy_logs.</p>
                        <?php else: ?>
                            <div>
                                <?php 
                                $max = 1;
                                foreach ($rows as $r) { $max = max($max, (float)$r['total_consumption']); }
                                foreach ($rows as $r): 
                                    $width = ($r['total_consumption'] / $max) * 100;
                                ?>
                                    <div class="flex items-center justify-between" style="margin-bottom: var(--spacing-md);">
                                        <span style="font-size: 0.875rem; color: var(--color-muted-foreground); width: 6rem;"><?php echo htmlspecialchars($r['period_label']); ?></span>
                                        <div style="flex: 1; margin: 0 1rem;">
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: <?php echo $width; ?>%;"></div>
                                            </div>
                                        </div>
                                        <span style="font-size: 0.875rem; font-weight: 600; width: 5rem; text-align: right;"><?php echo number_format((float)$r['total_consumption'], 2); ?> KZ</span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Próximos passos</h3>
                        </div>
                        <ul class="list" style="margin-top: var(--spacing-md);">
                            <li>Conectar medidor ou enviar leituras</li>
                            <li>Configurar alertas de pico</li>
                            <li>Exportar CSV pelo dashboard</li>
                        </ul>
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
        
        // Load devices for consumption form
        const deviceSelect = document.getElementById('deviceId');
        if (deviceSelect) {
            <?php
            $stmt = $pdo->prepare('SELECT id, name FROM devices WHERE user_id = ?');
            $stmt->execute([$_SESSION['user_id']]);
            $devices = $stmt->fetchAll();
            ?>
            const devices = <?php echo json_encode($devices); ?>;
            devices.forEach(device => {
                const option = document.createElement('option');
                option.value = device.id;
                option.textContent = device.name;
                deviceSelect.appendChild(option);
            });
        }
        
        // Handle energy form
        document.getElementById('energyForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'energy_add');
            formData.append('consumption', document.getElementById('consumption').value);
            formData.append('device_id', document.getElementById('deviceId').value || null);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Leitura registrada com sucesso!');
                    document.getElementById('energyForm').reset();
                    location.reload();
                } else {
                    alert('Erro: ' + (data.message || 'Falha ao registrar'));
                }
            })
            .catch(err => alert('Erro na requisição: ' + err.message));
        });
    });
</script>
</body>
</html>
