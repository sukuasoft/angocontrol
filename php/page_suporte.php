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
    <title>Suporte - Angocontrol</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
<div id="app" class="app">
    <aside id="sidebar" class="sidebar">
        <div class="sidebar-header">
            <div class="logo-container">
                <div class="logo-icon"><i data-lucide="help-circle"></i></div>
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
                    <li><a href="page_configuracoes.php" class="nav-item"><i data-lucide="settings"></i><span>Configurações</span></a></li>
                    <li><a href="page_suporte.php" class="nav-item active"><i data-lucide="help-circle"></i><span>Suporte</span></a></li>
                    <li><a href="logout.php" class="nav-item"><i data-lucide="log-out"></i><span>Logout</span></a></li>
                </ul>
            </div>
        </nav>
    </aside>

    <div class="main-wrapper">
        <header class="header">
            <div class="header-left">
                <h2 class="logo-title">Suporte</h2>
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
                <!-- Contact Form -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Entrar em contacto</h3>
                        <p class="card-subtitle">Descreva seu problema e envie para nossa equipa</p>
                    </div>
                    <form id="supportForm" style="display: grid; gap: var(--spacing-md);">
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Assunto</label>
                            <input type="text" id="supportSubject" placeholder="Ex: Dispositivo não responde" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);" required>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Categoria</label>
                            <select id="supportCategory" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md);">
                                <option>Geral</option>
                                <option>Dispositivos</option>
                                <option>Conta</option>
                                <option>Billing</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.875rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Mensagem</label>
                            <textarea id="supportMessage" placeholder="Descreva seu problema..." style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); min-height: 8rem; font-family: inherit;" required></textarea>
                        </div>
                        <button type="submit" class="button button-primary" style="width: auto; align-self: flex-start;">Enviar</button>
                    </form>
                </div>

                <div class="grid grid-cols-2">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Perguntas frequentes</h3>
                            <p class="card-subtitle">Respostas rápidas</p>
                        </div>
                        <div class="list" style="margin-top: var(--spacing-md);">
                            <div class="list-item">
                                <p><strong>Como adicionar um novo dispositivo?</strong></p>
                                <p class="text-muted" style="font-size: 0.875rem;">Vá para Dispositivos e clique em "Adicionar dispositivo".</p>
                            </div>
                            <div class="list-item">
                                <p><strong>Por que meu dispositivo está offline?</strong></p>
                                <p class="text-muted" style="font-size: 0.875rem;">Verifique a conexão WiFi e reinicie o dispositivo.</p>
                            </div>
                            <div class="list-item">
                                <p><strong>Como posso exportar dados?</strong></p>
                                <p class="text-muted" style="font-size: 0.875rem;">Acesse Consumo e clique no ícone de exportação.</p>
                            </div>
                            <div class="list-item">
                                <p><strong>Como reset a senha?</strong></p>
                                <p class="text-muted" style="font-size: 0.875rem;">Clique em "Esqueci a senha" na página de login.</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Status do sistema</h3>
                            <p class="card-subtitle">Estado atual dos serviços</p>
                        </div>
                        <div class="list" style="margin-top: var(--spacing-md);">
                            <div class="list-item">
                                <p style="font-weight: 600; font-size: 0.875rem;">API</p>
                                <span style="background: #84cc16; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;">Operacional</span>
                            </div>
                            <div class="list-item">
                                <p style="font-weight: 600; font-size: 0.875rem;">Dashboard</p>
                                <span style="background: #84cc16; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;">Operacional</span>
                            </div>
                            <div class="list-item">
                                <p style="font-weight: 600; font-size: 0.875rem;">Autenticação</p>
                                <span style="background: #84cc16; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;">Operacional</span>
                            </div>
                            <div class="list-item">
                                <p style="font-weight: 600; font-size: 0.875rem;">Base de dados</p>
                                <span style="background: #84cc16; color: white; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem;">Operacional</span>
                            </div>
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
        
        // Handle support form
        document.getElementById('supportForm')?.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'support_ticket');
            formData.append('subject', document.getElementById('supportSubject').value);
            formData.append('category', document.getElementById('supportCategory').value);
            formData.append('message', document.getElementById('supportMessage').value);
            
            fetch('../php/actions.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Ticket enviado! Responderemos em breve.');
                    document.getElementById('supportForm').reset();
                } else {
                    alert('Erro: ' + (data.message || 'Falha ao enviar'));
                }
            })
            .catch(err => alert('Erro: ' + err.message));
        });
    });
</script>
</body>
</html>
