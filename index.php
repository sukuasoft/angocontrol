<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Angocontrol - Sistema Domótico</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php
    // Verificar se está logado
    session_start();

    if (!isset($_SESSION['user_id'])) {
        header('Location: php/login.php');
        exit;
    }
    
    // Buscar informações do usuário
    require_once 'php/config.php';
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch();
    ?>
    
    <div id="app" class="app">
        <!-- Sidebar -->
        <aside id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <div class="logo-container">
                    <div class="logo-icon">
                        <i data-lucide="cpu"></i>
                    </div>
                    <div class="logo-text">
                        <h1 class="logo-title">Angocontrol</h1>
                        <p class="logo-subtitle">Domótica</p>
                    </div>
                </div>
                <button id="sidebar-toggle" class="sidebar-toggle">
                    <i data-lucide="menu"></i>
                </button>
            </div>

            <nav class="sidebar-nav">
                <div class="nav-section">
                    <p class="nav-label">PRINCIPAL</p>
                    <ul class="nav-menu">
                        <li><a href="index.php" class="nav-item active">
                            <i data-lucide="home"></i>
                            <span>Dashboard</span>
                        </a></li>
                        <li><a href="php/page_dispositivos.php" class="nav-item">
                            <i data-lucide="cpu"></i>
                            <span>Dispositivos</span>
                        </a></li>
                        <li><a href="php/page_monitoramento.php" class="nav-item">
                            <i data-lucide="activity"></i>
                            <span>Monitoramento</span>
                        </a></li>
                        <li><a href="php/page_consumo.php" class="nav-item">
                            <i data-lucide="bar-chart-3"></i>
                            <span>Consumo</span>
                        </a></li>
                        <li><a href="php/page_seguranca.php" class="nav-item">
                            <i data-lucide="shield"></i>
                            <span>Segurança</span>
                        </a></li>
                        <li><a href="php/page_climatizacao.php" class="nav-item">
                            <i data-lucide="thermometer"></i>
                            <span>Climatização</span>
                        </a></li>
                        <li><a href="php/page_integracoes.php" class="nav-item">
                            <i data-lucide="puzzle"></i>
                            <span>Integrações</span>
                        </a></li>
                    </ul>
                </div>

                <div class="nav-section nav-bottom">
                    <ul class="nav-menu">
                        <li><a href="php/page_configuracoes.php" class="nav-item">
                            <i data-lucide="settings"></i>
                            <span>Configurações</span>
                        </a></li>
                        <li><a href="php/page_suporte.php" class="nav-item">
                            <i data-lucide="help-circle"></i>
                            <span>Suporte</span>
                        </a></li>
                        <li><a href="php/logout.php" class="nav-item">
                            <i data-lucide="log-out"></i>
                            <span>Logout</span>
                        </a></li>
                    </ul>
                </div>
            </nav>
        </aside>

        <!-- Main Content -->
        <div class="main-wrapper">
            <!-- Header -->
            <header class="header">
                <div class="header-left">
                    <button id="mobile-menu-toggle" class="mobile-menu-toggle">
                        <i data-lucide="menu"></i>
                    </button>
                    
                    <div class="search-container">
                        <i data-lucide="search" class="search-icon"></i>
                        <input type="text" class="search-input" placeholder="Pesquisar...">
                    </div>
                </div>

                <div class="header-right">
                    <button class="icon-button notification-button">
                        <i data-lucide="bell"></i>
                        <span class="badge">3</span>
                    </button>

                    <button id="theme-toggle" class="icon-button">
                        <i data-lucide="sun" class="theme-icon-light"></i>
                        <i data-lucide="moon" class="theme-icon-dark"></i>
                    </button>

                    <div class="user-profile">
                        <div class="user-info">
                            <span class="user-name"><?php echo htmlspecialchars($user['name']); ?></span>
                            <span class="user-role"><?php echo ucfirst($user['role']); ?></span>
                        </div>
                        <div class="user-avatar">
                            <?php echo strtoupper(substr($user['name'], 0, 2)); ?>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main id="main-content" class="main-content">
                <!-- Content will be loaded dynamically here -->
            </main>
        </div>
    </div>

    <!-- Passar dados PHP para JavaScript -->
    <script>
        window.userData = {
            id: <?php echo $user['id']; ?>,
            name: <?php echo json_encode($user['name']); ?>,
            email: <?php echo json_encode($user['email']); ?>,
            role: <?php echo json_encode($user['role']); ?>
        };
    </script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="js/api.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
