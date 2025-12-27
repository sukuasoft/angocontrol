<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Get recent security events
$stmt = $pdo->prepare(
    "SELECT id, event_type, severity, description, timestamp FROM security_events 
     WHERE user_id = ? ORDER BY timestamp DESC LIMIT 10"
);
$stmt->execute([$_SESSION['user_id']]);
$events = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Segurança - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="shield"></i></div>
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
                    <li><a href="page_seguranca.php" class="nav-item active"><i data-lucide="shield"></i><span>Segurança</span></a></li>
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
                <h2 class="logo-title">Segurança</h2>
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
                <!-- Registrar alerta manual -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Registrar alerta</h3>
                        <p class="card-subtitle">Ativar um alerta de segurança manualmente</p>
                    </div>
                    <form id="alertForm" style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Tipo de alerta</label>
                            <select id="alertType" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option>Movimento detectado</option>
                                <option>Tentativa de acesso</option>
                                <option>Janela aberta</option>
                                <option>Porta aberta</option>
                                <option>Comportamento suspeito</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Nível</label>
                            <select id="alertLevel" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option value="low">Baixo</option>
                                <option value="medium">Médio</option>
                                <option value="high">Alto</option>
                                <option value="critical">Crítico</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Descrição</label>
                            <input type="text" id="alertDescription" placeholder="Detalhes..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                        </div>
                        <button type="submit" class="button button-primary">Registrar alerta</button>
                    </form>
                </div>

                <div class="grid grid-cols-3">
                    <div class="card">
                        <h3 class="card-title">Alertas</h3>
                        <p class="card-subtitle">Últimos eventos críticos</p>
                        <?php 
                        $critical = array_filter($events, function($e) { return $e['severity'] === 'critical'; });
                        ?>
                        <p class="text-muted" style="margin-top: var(--spacing-md);">
                            <?php echo count($critical) ? count($critical) . ' alertas críticos' : 'Nenhum alerta crítico.'; ?>
                        </p>
                    </div>
                    <div class="card">
                        <h3 class="card-title">Câmeras</h3>
                        <p class="card-subtitle">Monitoramento visual</p>
                        <p class="text-muted" style="margin-top: var(--spacing-md);">Streams serão exibidos aqui.</p>
                    </div>
                    <div class="card">
                        <h3 class="card-title">Acesso</h3>
                        <p class="card-subtitle">Fechaduras inteligentes</p>
                        <p class="text-muted" style="margin-top: var(--spacing-md);">Tranque/destranque dispositivos integrados.</p>
                    </div>
                </div>

                <!-- Recent events -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Histórico de eventos</h3>
                        <p class="card-subtitle">Ultimas 10 ações de segurança</p>
                    </div>
                    <?php if (!$events): ?>
                        <div class="empty-state">
                            <i data-lucide="shield-alert" style="width: 2rem; height: 2rem;"></i>
                            <p>Nenhum evento registrado.</p>
                        </div>
                    <?php else: ?>
                        <div class="list">
                            <?php foreach ($events as $event): ?>
                                <div class="list-item">
                                    <div style="flex: 1;">
                                        <p style="font-weight: 600; font-size: 0.875rem;"><?php echo htmlspecialchars($event['event_type']); ?></p>
                                        <p class="text-muted"><?php echo htmlspecialchars($event['description'] ?? ''); ?></p>
                                    </div>
                                    <span style="background: <?php 
                                        echo match($event['severity']) {
                                            'critical' => '#ef4444',
                                            'high' => '#f97316',
                                            'medium' => '#eab308',
                                            default => '#84cc16'
                                        };
                                    ?>; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600;">
                                        <?php echo htmlspecialchars($event['severity']); ?>
                                    </span>
                                </div>
                            <?php endforeach; ?>
                        </div>
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
        
        // Handle alert form
        document.getElementById('alertForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'event_add');
            formData.append('event_type', document.getElementById('alertType').value);
            formData.append('severity', document.getElementById('alertLevel').value);
            formData.append('description', document.getElementById('alertDescription').value);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Alerta registrado!');
                    document.getElementById('alertForm').reset();
                    location.reload();
                } else {
                    alert('Erro: ' + (data.message || 'Falha ao registrar'));
                }
            })
            .catch(err => alert('Erro: ' + err.message));
        });
    });
</script>
</body>
</html>
