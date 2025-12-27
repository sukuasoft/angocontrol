<?php
require_once 'config.php';

if (!isAuthenticated()) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integrações - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="puzzle"></i></div>
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
                    <li><a href="page_integracoes.php" class="nav-item active"><i data-lucide="puzzle"></i><span>Integrações</span></a></li>
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
                <h2 class="logo-title">Integrações</h2>
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
                <!-- Add Integration Form -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Adicionar integração</h3>
                        <p class="card-subtitle">Conecte serviços externos</p>
                    </div>
                    <form id="integrationForm" style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: var(--spacing-md); align-items: end;">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Serviço</label>
                            <select id="integrationService" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option>Assistente de voz</option>
                                <option>IFTTT / Webhooks</option>
                                <option>API REST</option>
                                <option>Google Home</option>
                                <option>Amazon Alexa</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">API Key (opcional)</label>
                            <input type="password" id="apiKey" placeholder="Chave de autenticação" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Endpoint (opcional)</label>
                            <input type="text" id="endpoint" placeholder="https://api.service.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                        </div>
                        <button type="submit" class="button button-primary">Conectar</button>
                    </form>
                </div>

                <div class="grid grid-cols-2">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Serviços disponíveis</h3>
                            <p class="card-subtitle">Expanda as funcionalidades</p>
                        </div>
                        <ul class="list" style="margin-top: var(--spacing-md);">
                            <li>🎤 Assistente de voz</li>
                            <li>⚡ IFTTT / Webhooks</li>
                            <li>🔌 API REST</li>
                            <li>🏠 Google Home</li>
                            <li>🔊 Amazon Alexa</li>
                        </ul>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Integração ativas</h3>
                            <p class="card-subtitle">Conexões já configuradas</p>
                        </div>
                        <p class="text-muted" style="margin-top: var(--spacing-md);">Nenhuma integração ativa no momento.</p>
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
        
        // Handle integration form
        document.getElementById('integrationForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'integration_add');
            formData.append('service', document.getElementById('integrationService').value);
            formData.append('api_key', document.getElementById('apiKey').value);
            formData.append('endpoint', document.getElementById('endpoint').value);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Integração conectada!');
                    document.getElementById('integrationForm').reset();
                    location.reload();
                } else {
                    alert('Erro: ' + (data.error || data.message || 'Falha ao conectar'));
                }
            })
            .catch(err => {
                console.error('Erro:', err);
                alert('Erro na requisição: ' + err.message);
            });
        });
    });
</script>
</body>
</html>
