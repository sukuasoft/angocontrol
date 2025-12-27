# Angocontrol - Sistema Domótico em Vanilla JavaScript e PHP

Este é o sistema Angocontrol convertido para **JavaScript Vanilla**, **HTML** e **PHP**, permitindo fácil integração com backends PHP.

## 📁 Estrutura do Projeto

```
vanilla/
├── index.php              # Página principal
├── css/
│   └── styles.css          # Estilos CSS
├── js/
│   └── app.js              # Lógica JavaScript
├── php/
│   ├── config.php          # Configurações e conexão DB
│   ├── dashboard.php       # API do dashboard
│   ├── dispositivos.php    # API de dispositivos
│   ├── login.php           # Página de login
│   └── logout.php          # Logout
└── database.sql            # Script SQL para criar banco de dados
```

## 🚀 Como Instalar

### 1. Configurar o Servidor

Você precisa de um servidor com PHP e MySQL. Opções:
- **XAMPP** (Windows/Linux/Mac)
- **WAMP** (Windows)
- **LAMP** (Linux)
- **MAMP** (Mac)

### 2. Copiar Arquivos

Copie a pasta `vanilla` para o diretório do seu servidor web:
- XAMPP: `C:\xampp\htdocs\angocontrol\`
- WAMP: `C:\wamp\www\angocontrol\`
- Linux: `/var/www/html/angocontrol/`

### 3. Criar Banco de Dados

1. Acesse o phpMyAdmin: `http://localhost/phpmyadmin`
2. Clique em "SQL"
3. Copie e cole o conteúdo do arquivo `database.sql`
4. Clique em "Executar"

### 4. Configurar Conexão

Edite o arquivo `php/config.php` e ajuste as credenciais do banco de dados:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'angocontrol');
define('DB_USER', 'root');
define('DB_PASS', '');  // Sua senha do MySQL
```

### 5. Acessar o Sistema

Abra seu navegador e acesse:
```
http://localhost/angocontrol/index.html
```

## 👤 Login Padrão

- **Email:** admin@angocontrol.com
- **Senha:** admin123

## 📋 Funcionalidades

### ✅ Implementadas

- ✅ Layout responsivo com sidebar
- ✅ Tema claro/escuro
- ✅ Dashboard com estatísticas
- ✅ Cards de dispositivos
- ✅ Gráficos de consumo
- ✅ Navegação entre páginas
- ✅ Sistema de autenticação PHP
- ✅ API REST para dispositivos
- ✅ Banco de dados completo

### 🔄 Estrutura de Navegação

O sistema funciona com Single Page Application (SPA):
- A navegação acontece sem recarregar a página
- O conteúdo é carregado dinamicamente via JavaScript
- URLs amigáveis com hash routing (`#dashboard`, `#dispositivos`, etc.)

## 🔌 Integração com PHP

### Exemplo: Buscar Dados do Dashboard

**JavaScript (app.js):**
```javascript
fetch('php/dashboard.php', {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data.stats);
    console.log(data.devices);
});
```

**PHP (dashboard.php):**
```php
<?php
require_once 'config.php';

if (isAjax()) {
    $data = [
        'stats' => getStats(),
        'devices' => getDevices()
    ];
    jsonResponse($data);
}
?>
```

### Exemplo: Controlar Dispositivo

**JavaScript:**
```javascript
function toggleDevice(deviceId, currentState) {
    fetch('php/dispositivos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: `action=toggle&id=${deviceId}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Dispositivo atualizado!');
            // Recarregar lista de dispositivos
        }
    });
}
```

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS no arquivo `css/styles.css`:

```css
:root {
    --color-primary: #3b82f6;       /* Cor principal */
    --color-success: #22c55e;       /* Verde */
    --color-warning: #f59e0b;       /* Amarelo */
    --color-destructive: #ef4444;   /* Vermelho */
}
```

### Adicionar Nova Página

1. **Adicionar link na sidebar** (`index.html`):
```html
<li><a href="#minhapagina" class="nav-item" data-page="minhapagina">
    <i data-lucide="star"></i>
    <span>Minha Página</span>
</a></li>
```

2. **Criar função de conteúdo** (`js/app.js`):
```javascript
getMinhaPaginaContent() {
    return `
        <div class="space-y-6">
            <h1 class="text-3xl font-bold">Minha Página</h1>
            <div class="card">
                <p>Conteúdo aqui...</p>
            </div>
        </div>
    `;
}
```

3. **Adicionar no switch** (`js/app.js`):
```javascript
getPageContent(page) {
    switch(page) {
        // ... outros cases
        case 'minhapagina':
            return this.getMinhaPaginaContent();
        // ...
    }
}
```

4. **Criar arquivo PHP** (`php/minhapagina.php`):
```php
<?php
require_once 'config.php';

if (!isAuthenticated()) {
    jsonResponse(['error' => 'Não autenticado'], 401);
}

// Sua lógica aqui
$data = [
    'exemplo' => 'dados'
];

jsonResponse($data);
?>
```

## 🔐 Segurança

### Proteção de Páginas

Todas as páginas PHP verificam autenticação:
```php
if (!isAuthenticated()) {
    jsonResponse(['error' => 'Não autenticado'], 401);
}
```

### Senhas

As senhas são armazenadas com `password_hash()` do PHP.

Para criar nova senha:
```php
$senha = password_hash('minhasenha', PASSWORD_DEFAULT);
```

## 📊 Banco de Dados

### Principais Tabelas

- `users` - Usuários do sistema
- `rooms` - Cômodos da casa
- `device_types` - Tipos de dispositivos
- `devices` - Dispositivos conectados
- `energy_logs` - Logs de consumo
- `security_events` - Eventos de segurança
- `automations` - Automações configuradas

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilos (com variáveis CSS)
- **JavaScript Vanilla** - Lógica do frontend
- **PHP 7.4+** - Backend
- **MySQL** - Banco de dados
- **Lucide Icons** - Ícones (via CDN)

## 📱 Responsividade

O sistema é totalmente responsivo:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🐛 Debugging

Para debugar, abra o Console do navegador (F12):
```javascript
// Ver página atual
console.log(App.currentPage);

// Ver tema
console.log(App.theme);

// Forçar navegação
App.navigateTo('dashboard');
```

## 📝 Notas Importantes

1. **Sem Frameworks**: Este projeto usa apenas JavaScript puro, sem React, Vue ou jQuery
2. **SPA**: Funciona como Single Page Application
3. **API REST**: Backend PHP retorna JSON
4. **Sessões**: Usa sessões PHP para autenticação
5. **AJAX**: Todas as requisições são via fetch API

## 🆘 Suporte

Se tiver problemas:

1. Verifique se o servidor Apache e MySQL estão rodando
2. Confirme que o banco de dados foi criado
3. Verifique as configurações em `config.php`
4. Veja o Console do navegador para erros JavaScript
5. Veja os logs do PHP no servidor

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ para o sistema Angocontrol**
