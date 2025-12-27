// ==================== App Configuration ====================
const App = {
    currentPage: 'dashboard',
    theme: localStorage.getItem('theme') || 'light',
    sidebarCollapsed: false,
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.loadPage(this.currentPage);
        this.applyTheme();
        this.initLucideIcons();
    },
    
    // Setup all event listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page === 'logout') {
                    this.handleLogout();
                } else {
                    this.navigateTo(page);
                }
            });
        });
        
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Close mobile sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const mobileToggle = document.getElementById('mobile-menu-toggle');
            
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('mobile-open') &&
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    },
    
    // Navigate to a specific page
    navigateTo(page) {
        this.currentPage = page;
        this.updateActiveNav(page);
        this.loadPage(page);
        
        // Close mobile sidebar after navigation
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('mobile-open');
        }
    },
    
    // Update active navigation item
    updateActiveNav(page) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
    },
    
    // Load page content
    loadPage(page) {
        const content = document.getElementById('main-content');
        content.innerHTML = '<div class="loading">Carregando...</div>';
        
        // In a real application, this would fetch from PHP
        // For now, we'll load the content directly
        setTimeout(() => {
            content.innerHTML = this.getPageContent(page);
            this.initPageScripts(page);
            this.initLucideIcons();
        }, 100);
    },
    
    // Get page content based on page name
    getPageContent(page) {
        switch(page) {
            case 'dashboard':
                return this.getDashboardContent();
            case 'dispositivos':
                return this.getDispositivosContent();
            case 'monitoramento':
                return this.getMonitoramentoContent();
            case 'consumo':
                return this.getConsumoContent();
            case 'seguranca':
                return this.getSegurancaContent();
            case 'climatizacao':
                return this.getClimatizacaoContent();
            case 'integracoes':
                return this.getIntegracoesContent();
            case 'configuracoes':
                return this.getConfiguracoesContent();
            case 'suporte':
                return this.getSuporteContent();
            default:
                return '<div class="not-found"><h1>Página não encontrada</h1></div>';
        }
    },
    
    // Dashboard content
    getDashboardContent() {
        return `
            <div class="space-y-6">
                <!-- Welcome Header -->
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold flex items-center gap-2">
                            Olá, Lando F! 
                            <span class="text-2xl">☀️</span>
                        </h1>
                        <p class="text-muted">Bem-vindo ao painel de controle da sua casa inteligente</p>
                    </div>
                    <button class="button button-primary">
                        Exportar CSV
                    </button>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-4">
                    ${this.createStatsCard({
                        title: 'Total de Dispositivos',
                        value: '11',
                        subtitle: 'Conectados',
                        icon: 'home',
                        trend: { value: '+2', positive: true }
                    })}
                    ${this.createStatsCard({
                        title: 'Dispositivos Ativos',
                        value: '8',
                        subtitle: 'Em funcionamento',
                        icon: 'zap',
                        iconColor: 'success'
                    })}
                    ${this.createStatsCard({
                        title: 'Offline',
                        value: '1',
                        subtitle: 'Requer atenção',
                        icon: 'wifi-off',
                        iconColor: 'destructive'
                    })}
                    ${this.createStatsCard({
                        title: 'Modo Eco',
                        value: '2',
                        subtitle: 'Economia de energia',
                        icon: 'activity',
                        iconColor: 'warning'
                    })}
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-3">
                    <!-- Energy Consumption -->
                    <div style="grid-column: span 2;">
                        <div class="space-y-6">
                            ${this.createEnergyCard()}
                            ${this.createRealtimeCard()}
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div>
                        ${this.createQuickActionsCard()}
                    </div>
                </div>

                <!-- Recent Devices -->
                ${this.createRecentDevicesCard()}
            </div>
        `;
    },
    
    // Create stats card
    createStatsCard({ title, value, subtitle, icon, trend, iconColor = 'primary' }) {
        return `
            <div class="card stats-card animate-fade-in">
                <div class="stats-info">
                    <p class="stats-title">${title}</p>
                    <div class="stats-value">
                        ${value}
                        ${trend ? `<span class="stats-trend ${trend.positive ? 'positive' : 'negative'}">${trend.value}</span>` : ''}
                    </div>
                    ${subtitle ? `<p class="stats-subtitle">${subtitle}</p>` : ''}
                </div>
                <div class="stats-icon ${iconColor}">
                    <i data-lucide="${icon}"></i>
                </div>
            </div>
        `;
    },
    
    // Create energy card
    createEnergyCard() {
        const energyData = [
            { period: 'Janeiro', consumption: 245 },
            { period: 'Fevereiro', consumption: 267 },
            { period: 'Março', consumption: 234 },
            { period: 'Abril', consumption: 278 },
            { period: 'Maio', consumption: 198 },
            { period: 'Junho', consumption: 223 }
        ];
        
        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="card-title">Consumo Mensal</h3>
                            <p class="card-subtitle">Últimos 6 meses</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <div style="text-align: right;">
                                <p class="text-2xl font-bold">223 KZ</p>
                                <p style="font-size: 0.875rem; color: var(--color-success); font-weight: 600;">↓ 12% menor</p>
                            </div>
                            <i data-lucide="bar-chart-3" style="width: 2rem; height: 2rem; color: var(--color-primary);"></i>
                        </div>
                    </div>
                </div>
                <div>
                    ${energyData.map(item => `
                        <div class="flex items-center justify-between" style="margin-bottom: var(--spacing-md);">
                            <span style="font-size: 0.875rem; color: var(--color-muted-foreground); width: 5rem;">${item.period}</span>
                            <div style="flex: 1; margin: 0 1rem;">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(item.consumption / 300) * 100}%;"></div>
                                </div>
                            </div>
                            <span style="font-size: 0.875rem; font-weight: 600; width: 4rem; text-align: right;">${item.consumption} KZ</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    // Create realtime card
    createRealtimeCard() {
        const realtimeData = [
            { time: '00:00', consumption: 2.1 },
            { time: '04:00', consumption: 1.8 },
            { time: '08:00', consumption: 3.2 },
            { time: '12:00', consumption: 4.5 },
            { time: '16:00', consumption: 3.8 },
            { time: '20:00', consumption: 5.2 },
            { time: '24:00', consumption: 2.9 }
        ];
        
        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <h3 class="card-title">Consumo em Tempo Real</h3>
                    <p class="card-subtitle">Últimas 24 horas</p>
                </div>
                <div>
                    ${realtimeData.map(item => `
                        <div class="flex items-center justify-between" style="margin-bottom: var(--spacing-md);">
                            <span style="font-size: 0.875rem; color: var(--color-muted-foreground); width: 4rem;">${item.time}</span>
                            <div style="flex: 1; margin: 0 1rem;">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(item.consumption / 6) * 100}%;"></div>
                                </div>
                            </div>
                            <span style="font-size: 0.875rem; font-weight: 600; width: 3rem; text-align: right;">${item.consumption} KZ</span>
                        </div>
                    `).join('')}
                    <div style="margin-top: var(--spacing-lg); padding: var(--spacing-md); background-color: var(--color-primary-soft); border-radius: var(--radius-lg);">
                        <p style="font-size: 0.875rem; font-weight: 600;">Consumo atual: 3.8 KZ/h</p>
                        <p style="font-size: 0.75rem; color: var(--color-muted-foreground);">Pico hoje: 5.2 KZ às 20:00</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Create quick actions card
    createQuickActionsCard() {
        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <h3 class="card-title">Ações Rápidas</h3>
                    <p class="card-subtitle">Controle rápido dos ambientes</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                    <button class="button button-primary" style="width: 100%; justify-content: flex-start;">
                        <i data-lucide="home"></i>
                        Modo "Saí de Casa"
                    </button>
                    <button class="button button-outline" style="width: 100%; justify-content: flex-start;">
                        <i data-lucide="thermometer"></i>
                        Ajustar Temperatura
                    </button>
                    <button class="button button-outline" style="width: 100%; justify-content: flex-start;">
                        <i data-lucide="lightbulb"></i>
                        Controlar Luzes
                    </button>
                    <button class="button button-outline" style="width: 100%; justify-content: flex-start;">
                        <i data-lucide="camera"></i>
                        Ver Câmeras
                    </button>
                </div>
            </div>
        `;
    },
    
    // Create recent devices card
    createRecentDevicesCard() {
        const devices = [
            { name: 'Luzes Sala', room: 'Sala de Estar', type: 'Iluminação', icon: 'lightbulb', status: 'active', performance: 85 },
            { name: 'TV Samsung', room: 'Sala de Estar', type: 'Entretenimento', icon: 'tv', status: 'active', performance: 92 },
            { name: 'Ar Condicionado', room: 'Quarto Master', type: 'Climatização', icon: 'wind', status: 'eco', performance: 67 },
            { name: 'Câmera Entrada', room: 'Entrada', type: 'Segurança', icon: 'camera', status: 'active', performance: 98 },
            { name: 'Fechadura Digital', room: 'Porta Principal', type: 'Segurança', icon: 'lock', status: 'offline' },
            { name: 'Termostato', room: 'Cozinha', type: 'Climatização', icon: 'thermometer', status: 'active', performance: 76 }
        ];
        
        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="card-title">Dispositivos Recentes</h3>
                            <p class="card-subtitle">Atividade dos últimos dispositivos</p>
                        </div>
                        <button class="button button-outline" style="padding: 0.5rem 1rem;">
                            Ver Todos
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-4" style="max-height: 24rem; overflow-y: auto;">
                    ${devices.map((device, index) => this.createDeviceCard(device, index)).join('')}
                </div>
            </div>
        `;
    },
    
    // Create device card
    createDeviceCard(device, index) {
        const statusConfig = {
            active: { label: 'Ativo', variant: 'default', color: 'active' },
            inactive: { label: 'Inativo', variant: 'secondary', color: 'inactive' },
            offline: { label: 'Offline', variant: 'destructive', color: 'offline' },
            eco: { label: 'Eco', variant: 'outline', color: 'eco' }
        };
        
        const statusInfo = statusConfig[device.status];
        const isOnline = device.status !== 'offline';
        
        return `
            <div class="card device-card animate-fade-in">
                <div class="device-header">
                    <div class="device-info-wrapper">
                        <div class="device-icon ${device.status === 'active' ? 'active' : ''}">
                            <i data-lucide="${device.icon}"></i>
                        </div>
                        <div class="device-info">
                            <h4 class="device-name">${device.name}</h4>
                            <p class="device-meta">${device.room} • ${device.type}</p>
                        </div>
                    </div>
                    <div class="device-status">
                        <span class="badge ${statusInfo.variant}">${statusInfo.label}</span>
                        <div class="status-dot ${statusInfo.color}"></div>
                    </div>
                </div>
                
                ${device.performance !== undefined ? `
                    <div class="performance-section">
                        <div class="performance-header">
                            <span class="performance-label">Desempenho</span>
                            <span class="performance-value">${device.performance}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${device.performance}%;"></div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="device-footer">
                    <span class="device-state">
                        ${device.status === 'active' ? 'Ligado' : 
                          device.status === 'eco' ? 'Modo economia' :
                          device.status === 'offline' ? 'Desconectado' : 'Desligado'}
                    </span>
                    <div class="switch ${device.status === 'active' ? 'checked' : ''} ${!isOnline ? 'disabled' : ''}" 
                         data-device="${index}" 
                         onclick="App.toggleDevice(${index}, ${device.status === 'active'})">
                        <div class="switch-thumb"></div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Other page contents (placeholder)
    getDispositivosContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Dispositivos</h1>
                <p class="text-muted">Gerencie todos os seus dispositivos conectados</p>
                <div class="card">
                    <p>Conteúdo da página de dispositivos será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getMonitoramentoContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Monitoramento</h1>
                <p class="text-muted">Acompanhe a atividade dos dispositivos em tempo real</p>
                <div class="card">
                    <p>Conteúdo da página de monitoramento será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getConsumoContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Consumo de Energia</h1>
                <p class="text-muted">Análise detalhada do consumo energético</p>
                <div class="card">
                    <p>Conteúdo da página de consumo será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getSegurancaContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Segurança</h1>
                <p class="text-muted">Controle de câmeras e sistemas de segurança</p>
                <div class="card">
                    <p>Conteúdo da página de segurança será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getClimatizacaoContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Climatização</h1>
                <p class="text-muted">Controle de temperatura e qualidade do ar</p>
                <div class="card">
                    <p>Conteúdo da página de climatização será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getIntegracoesContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Integrações</h1>
                <p class="text-muted">Conecte com outros serviços e plataformas</p>
                <div class="card">
                    <p>Conteúdo da página de integrações será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getConfiguracoesContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Configurações</h1>
                <p class="text-muted">Personalize suas preferências do sistema</p>
                <div class="card">
                    <p>Conteúdo da página de configurações será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    getSuporteContent() {
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold">Suporte</h1>
                <p class="text-muted">Central de ajuda e documentação</p>
                <div class="card">
                    <p>Conteúdo da página de suporte será carregado aqui...</p>
                </div>
            </div>
        `;
    },
    
    // Initialize page-specific scripts
    initPageScripts(page) {
        // Add any page-specific JavaScript here
    },
    
    // Toggle device state
    toggleDevice(index, currentState) {
        console.log(`Device ${index} toggled to ${!currentState}`);
        // Here you would make an API call to PHP backend
        // For now, just toggle the UI
    },
    
    // Toggle sidebar
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        this.sidebarCollapsed = !this.sidebarCollapsed;
        sidebar.classList.toggle('collapsed');
    },
    
    // Toggle mobile sidebar
    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('mobile-open');
    },
    
    // Toggle theme
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    },
    
    // Apply theme
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
    },
    
    // Handle logout
    handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            // Redirect to logout.php or handle logout
            window.location.href = 'logout.php';
        }
    },
    
    // Initialize Lucide icons
    initLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
