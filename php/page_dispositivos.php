<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Buscar dispositivos do usuário
$stmt = $pdo->prepare(
    "SELECT 
        d.id, d.name, d.status, d.performance,
        COALESCE(r.name, 'Sem cômodo') AS room,
        COALESCE(dt.name, 'Dispositivo') AS type,
        COALESCE(dt.icon, 'cpu') AS icon
     FROM devices d
     LEFT JOIN rooms r ON d.room_id = r.id
     LEFT JOIN device_types dt ON d.type_id = dt.id
     WHERE d.user_id = ?
     ORDER BY d.updated_at DESC"
);
$stmt->execute([$_SESSION['user_id']]);
$devices = $stmt->fetchAll();

// Buscar cômodos e tipos
$rooms_stmt = $pdo->prepare("SELECT id, name FROM rooms WHERE user_id = ? ORDER BY name");
$rooms_stmt->execute([$_SESSION['user_id']]);
$rooms = $rooms_stmt->fetchAll();

$types_stmt = $pdo->prepare("SELECT id, name FROM device_types ORDER BY name");
$types_stmt->execute();
$types = $types_stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dispositivos - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <div id="app" class="app">
        <aside id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <div class="logo-container">
                    <div class="logo-icon"><i data-lucide="cpu"></i></div>
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
                        <li><a href="page_dispositivos.php" class="nav-item active"><i data-lucide="cpu"></i><span>Dispositivos</span></a></li>
                        <li><a href="page_monitoramento.php" class="nav-item"><i data-lucide="activity"></i><span>Monitoramento</span></a></li>
                        <li><a href="page_consumo.php" class="nav-item"><i data-lucide="bar-chart-3"></i><span>Consumo</span></a></li>
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
                    <h2 class="logo-title">Dispositivos</h2>
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
                    <!-- Formulário para novo dispositivo -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Adicionar dispositivo</h3>
                            <p class="card-subtitle">Preencha os dados abaixo</p>
                        </div>
                        <form id="deviceForm" style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                            <div>
                                <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Nome</label>
                                <input type="text" id="deviceName" placeholder="Ex: Lâmpada Sala" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                            </div>
                            <div>
                                <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Cômodo</label>
                                <select id="deviceRoom" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                    <option value="">Sem cômodo</option>
                                    <?php foreach ($rooms as $room): ?>
                                        <option value="<?php echo $room['id']; ?>"><?php echo htmlspecialchars($room['name']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div>
                                <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Tipo</label>
                                <select id="deviceType" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                    <?php foreach ($types as $type): ?>
                                        <option value="<?php echo $type['id']; ?>"><?php echo htmlspecialchars($type['name']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <button type="submit" class="button button-primary">Adicionar</button>
                        </form>
                    </div>

                    <!-- Lista de dispositivos -->
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 style="font-size: 1.5rem; font-weight: 700;">Dispositivos</h2>
                            <p class="text-muted">Inventário dos seus dispositivos conectados</p>
                        </div>
                        <a class="button button-outline" href="page_dispositivos.php"><i data-lucide="refresh-ccw"></i> Atualizar</a>
                    </div>

                    <div class="grid grid-cols-4" style="max-height: 32rem; overflow-y: auto;">
                        <?php if (!$devices): ?>
                            <div class="card" style="grid-column: span 4;">
                                <div class="empty-state">
                                    <i data-lucide="cpu" style="width: 2rem; height: 2rem;"></i>
                                    <p>Nenhum dispositivo cadastrado.</p>
                                </div>
                            </div>
                        <?php else: ?>
                            <?php foreach ($devices as $device): ?>
                                <div class="card device-card">
                                    <div class="device-header">
                                        <div class="device-info-wrapper">
                                            <div class="device-icon <?php echo $device['status'] === 'active' ? 'active' : ''; ?>">
                                                <i data-lucide="<?php echo htmlspecialchars($device['icon']); ?>"></i>
                                            </div>
                                            <div class="device-info">
                                                <h4 class="device-name"><?php echo htmlspecialchars($device['name']); ?></h4>
                                                <p class="device-meta"><?php echo htmlspecialchars($device['room']); ?></p>
                                            </div>
                                        </div>
                                        <button class="button button-outline" onclick="deleteDevice(<?php echo $device['id']; ?>)" style="padding: 0.5rem; font-size: 0.75rem;">Deletar</button>
                                    </div>
                                    <?php if ($device['performance'] !== null): ?>
                                        <div class="performance-section">
                                            <div class="performance-header">
                                                <span class="performance-label">Desempenho</span>
                                                <span class="performance-value"><?php echo (int)$device['performance']; ?>%</span>
                                            </div>
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: <?php echo (int)$device['performance']; ?>%;"></div>
                                            </div>
                                        </div>
                                    <?php endif; ?>
                                    <div class="device-footer">
                                        <span class="device-state" id="state-<?php echo $device['id']; ?>">
                                            <?php 
                                            echo $device['status'] === 'active' ? 'Ligado' : 
                                                 ($device['status'] === 'eco' ? 'Modo economia' :
                                                 ($device['status'] === 'offline' ? 'Desconectado' : 'Desligado'));
                                            ?>
                                        </span>
                                        <button class="button button-outline" onclick="toggleDevice(<?php echo $device['id']; ?>)" style="padding: 0.5rem;">
                                            <?php echo $device['status'] === 'active' ? '⏹ Desligar' : '▶ Ligar'; ?>
                                        </button>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
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

            // Adicionar dispositivo
            document.getElementById('deviceForm')?.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('action', 'device_add');
                formData.append('name', document.getElementById('deviceName').value);
                formData.append('room_id', document.getElementById('deviceRoom').value);
                formData.append('type_id', document.getElementById('deviceType').value);

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

            // Toggle dispositivo
            function toggleDevice(id) {
                const formData = new FormData();
                formData.append('action', 'device_toggle');
                formData.append('id', id);

                fetch('../php/actions.php', {
                    method: 'POST',
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    body: formData
                })
                .then(r => r.json())
                .then(data => {
                    if (data.success) location.reload();
                    else alert(data.error);
                })
                .catch(e => alert('Erro: ' + e));
            }

            // Deletar dispositivo
            function deleteDevice(id) {
                if (!confirm('Tem a certeza?')) return;
                const formData = new FormData();
                formData.append('action', 'device_delete');
                formData.append('id', id);

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
            }
        </script>
</body>
</html>
