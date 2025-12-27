<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}

// Buscar eventos de segurança recentes
$stmt = $pdo->prepare(
    "SELECT se.id, se.event_type, se.description, se.severity, se.timestamp,
            COALESCE(d.name,'Dispositivo') AS device_name
     FROM security_events se
     LEFT JOIN devices d ON se.device_id = d.id
     WHERE se.user_id = ?
     ORDER BY se.timestamp DESC
     LIMIT 20"
);
$stmt->execute([$_SESSION['user_id']]);
$events = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoramento - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="activity"></i></div>
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
                    <li><a href="page_monitoramento.php" class="nav-item active"><i data-lucide="activity"></i><span>Monitoramento</span></a></li>
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
                <h2 class="logo-title">Monitoramento</h2>
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
                <!-- Registrar evento -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Registrar evento</h3>
                        <p class="card-subtitle">Adicione um evento de segurança</p>
                    </div>
                    <form id="eventForm" style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Tipo de evento</label>
                            <select id="eventType" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option>Movimento detectado</option>
                                <option>Porta aberta</option>
                                <option>Porta fechada</option>
                                <option>Janela aberta</option>
                                <option>Alarme ativado</option>
                                <option>Tentativa de acesso</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Severidade</label>
                            <select id="severity" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                                <option value="critical">Crítica</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Descrição</label>
                            <input type="text" id="description" placeholder="Detalhes do evento" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                        </div>
                        <button type="submit" class="button button-primary">Registrar</button>
                    </form>
                </div>

                <div class="grid grid-cols-3">
                    <div class="card">
                        <h3 class="card-title">Status</h3>
                        <p class="card-subtitle">Fluxo em tempo real</p>
                        <p class="text-muted" style="margin-top: var(--spacing-md);">Sem dados recebidos. Aguarde eventos ou integre sensores.</p>
                    </div>
                    <div class="card" style="grid-column: span 2;">
                        <div class="card-header">
                            <h3 class="card-title">Eventos recentes</h3>
                            <p class="card-subtitle">Últimos registros de segurança</p>
                        </div>
                        <?php if (!$events): ?>
                            <div class="empty-state">
                                <i data-lucide="bell" style="width: 2rem; height: 2rem;"></i>
                                <p>Nenhum evento no momento.</p>
                            </div>
                        <?php else: ?>
                            <div class="list" style="max-height: 20rem; overflow-y: auto;">
                                <?php foreach ($events as $e): ?>
                                    <div class="list-item">
                                        <div class="flex items-center gap-2">
                                            <i data-lucide="alert-triangle"></i>
                                            <strong><?php echo ucfirst($e['event_type']); ?></strong>
                                            <span class="badge"><?php echo ucfirst($e['severity']); ?></span>
                                        </div>
                                        <div class="text-muted">
                                            <?php echo htmlspecialchars($e['device_name']); ?> • <?php echo htmlspecialchars($e['description'] ?? ''); ?>
                                        </div>
                                        <div class="text-muted" style="font-size: 0.75rem;">
                                            <?php echo htmlspecialchars($e['timestamp']); ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
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
        
        // Handle event form
        document.getElementById('eventForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'event_add');
            formData.append('event_type', document.getElementById('eventType').value);
            formData.append('severity', document.getElementById('severity').value);
            formData.append('description', document.getElementById('description').value);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Evento registrado com sucesso!');
                    document.getElementById('eventForm').reset();
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
