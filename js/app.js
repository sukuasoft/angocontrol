// ==================== App Configuration ====================
const App = {
    currentPage: 'dashboard',
    theme: localStorage.getItem('theme') || 'light',
    sidebarCollapsed: false,
    dashboardData: null,
    
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
    async loadPage(page) {
        const content = document.getElementById('main-content');
        content.innerHTML = '<div class="loading">Carregando...</div>';

        if (page === 'dashboard') {
            try {
                this.dashboardData = await API.getDashboard();
                content.innerHTML = this.renderDashboard(this.dashboardData);
                this.initPageScripts(page, this.dashboardData);
            } catch (error) {
                console.error('Erro ao carregar dashboard:', error);
                content.innerHTML = `
                    <div class="card" style="color: var(--color-destructive);">
                        <h3 class="card-title">Erro ao carregar dados</h3>
                        <p class="text-muted">${error.message || 'Tente novamente mais tarde.'}</p>
                        <p class="text-muted" style="font-size: 0.85rem; margin-top: 0.5rem;">Verifique se a sessão está ativa e se php/dashboard.php retorna JSON.</p>
                    </div>
                `;
            }
            this.initLucideIcons();
            return;
        }

        content.innerHTML = this.getPageContent(page);
        this.initPageScripts(page);
        this.initLucideIcons();
    },
    
    // Get page content based on page name
    getPageContent(page) {
        switch(page) {
            case 'dashboard':
                return this.dashboardData ? this.renderDashboard(this.dashboardData) : '<div class="loading">Carregando...</div>';
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
    
    // Dashboard content rendered from API data
    renderDashboard(data) {
        const userName = (window.userData && window.userData.name) || 'Usuário';
        const greetingIcon = this.theme === 'dark' ? '🌙' : '☀️';

        return `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold flex items-center gap-2">
                            Olá, ${userName}! 
                            <span class="text-2xl">${greetingIcon}</span>
                        </h1>
                        <p class="text-muted">Bem-vindo ao painel de controle da sua casa inteligente</p>
                    </div>
                    <button class="button button-primary">
                        Exportar CSV
                    </button>
                </div>

                <div class="grid grid-cols-4">
                    ${(data?.stats || []).map(stat => this.createStatsCard(stat)).join('') || '<p class="text-muted">Sem dados de estatísticas.</p>'}
                </div>

                <div class="grid grid-cols-3">
                    <div style="grid-column: span 2;">
                        <div class="space-y-6">
                            ${this.createEnergyCard(data?.energyData || [])}
                            ${this.createRealtimeCard(data?.realtimeData || [])}
                        </div>
                    </div>
                    <div>
                        ${this.createQuickActionsCard()}
                    </div>
                </div>

                ${this.createRecentDevicesCard(data?.devices || [])}
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
    createEnergyCard(energyData) {
        if (!energyData.length) {
            return `
                <div class="card animate-fade-in">
                    <div class="card-header">
                        <h3 class="card-title">Consumo Mensal</h3>
                        <p class="card-subtitle">Sem registros de consumo</p>
                    </div>
                    <p class="text-muted">Adicione medições em energy_logs para ver o histórico.</p>
                </div>
            `;
        }

        const maxConsumption = Math.max(...energyData.map(item => item.consumption), 1);

        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="card-title">Consumo Mensal</h3>
                            <p class="card-subtitle">Últimos 6 meses</p>
                        </div>
                        <i data-lucide="bar-chart-3" style="width: 2rem; height: 2rem; color: var(--color-primary);"></i>
                    </div>
                </div>
                <div>
                    ${energyData.map(item => `
                        <div class="flex items-center justify-between" style="margin-bottom: var(--spacing-md);">
                            <span style="font-size: 0.875rem; color: var(--color-muted-foreground); width: 5rem;">${item.period}</span>
                            <div style="flex: 1; margin: 0 1rem;">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(item.consumption / maxConsumption) * 100}%;"></div>
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
    createRealtimeCard(realtimeData) {
        if (!realtimeData.length) {
            return `
                <div class="card animate-fade-in">
                    <div class="card-header">
                        <h3 class="card-title">Consumo em Tempo Real</h3>
                        <p class="card-subtitle">Sem registros das últimas horas</p>
                    </div>
                    <p class="text-muted">Adicione medições para visualizar o gráfico.</p>
                </div>
            `;
        }

        const maxConsumption = Math.max(...realtimeData.map(item => item.consumption), 1);

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
                                    <div class="progress-fill" style="width: ${(item.consumption / maxConsumption) * 100}%;"></div>
                                </div>
                            </div>
                            <span style="font-size: 0.875rem; font-weight: 600; width: 3rem; text-align: right;">${item.consumption} KZ</span>
                        </div>
                    `).join('')}
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
    createRecentDevicesCard(devices) {
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
                    ${devices.length ? devices.map(device => this.createDeviceCard(device)).join('') : '<p class="text-muted">Nenhum dispositivo cadastrado.</p>'}
                </div>
            </div>
        `;
    },
    
    // Create device card
    createDeviceCard(device) {
        const statusConfig = {
            active: { label: 'Ativo', variant: 'default', color: 'active' },
            inactive: { label: 'Inativo', variant: 'secondary', color: 'inactive' },
            offline: { label: 'Offline', variant: 'destructive', color: 'offline' },
            eco: { label: 'Eco', variant: 'outline', color: 'eco' }
        };
        
        const statusInfo = statusConfig[device.status] || statusConfig.inactive;
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
                         data-device-id="${device.id}" 
                         data-status="${device.status}" 
                         onclick="App.toggleDevice(${device.id}, '${device.status}')">
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
    async toggleDevice(id, currentStatus) {
        if (currentStatus === 'offline') {
            alert('Não é possível alternar um dispositivo offline.');
            return;
        }

        try {
            await API.toggleDevice(id);
            this.dashboardData = await API.getDashboard();
            const content = document.getElementById('main-content');
            content.innerHTML = this.renderDashboard(this.dashboardData);
            this.initLucideIcons();
        } catch (error) {
            console.error('Erro ao alternar dispositivo:', error);
            alert('Não foi possível alterar o status agora.');
        }
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
            window.location.href = 'php/logout.php';
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
