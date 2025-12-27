# 🚀 Guia Rápido de Início - Angocontrol

## ⚡ Instalação Rápida (5 minutos)

### Passo 1: Instalar XAMPP
1. Baixe o XAMPP: https://www.apachefriends.org/
2. Instale e inicie **Apache** e **MySQL**

### Passo 2: Copiar Arquivos
```bash
# Copie a pasta vanilla para:
C:\xampp\htdocs\angocontrol\
```

### Passo 3: Criar Banco de Dados
1. Abra: http://localhost/phpmyadmin
2. Clique em "SQL"
3. Cole o conteúdo de `database.sql`
4. Clique "Executar"

### Passo 4: Acessar
```
http://localhost/angocontrol/php/login.php

Email: admin@angocontrol.com
Senha: admin123
```

---

## 📂 Estrutura dos Arquivos

```
vanilla/
├── index.php           # Versão dinâmica (com PHP)
├── css/
│   └── styles.css      # Todos os estilos
├── js/
│   ├── app.js          # Lógica principal
│   └── api.js          # Helper para chamadas API
├── php/
│   ├── config.php      # Configuração e DB
│   ├── dashboard.php   # API Dashboard
│   ├── dispositivos.php# API Dispositivos
│   ├── login.php       # Página de login
│   └── logout.php      # Logout
└── database.sql        # Script do banco
```


---

## 🔧 Configuração Rápida

### Mudar Credenciais do Banco
Edite `php/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'angocontrol');
define('DB_USER', 'root');
define('DB_PASS', 'sua_senha_aqui');
```

### Criar Novo Usuário
No phpMyAdmin, execute:
```sql
INSERT INTO users (name, email, password, role) VALUES
('Seu Nome', 'seu@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
-- Senha padrão: admin123
```

Para gerar nova senha:
```php
<?php
echo password_hash('suasenha', PASSWORD_DEFAULT);
?>
```

---

## 💻 Exemplos de Código

### JavaScript: Buscar Dados
```javascript
// Usando o API Helper
API.getDashboard()
    .then(data => {
        console.log('Stats:', data.stats);
        console.log('Devices:', data.devices);
    })
    .catch(error => console.error(error));
```

### JavaScript: Controlar Dispositivo
```javascript
// Toggle dispositivo
API.toggleDevice(3)
    .then(data => {
        if (data.success) {
            alert('Dispositivo ligado/desligado!');
        }
    });
```

### PHP: Buscar Dispositivos
```php
<?php
require_once 'config.php';

$stmt = $pdo->prepare("
    SELECT * FROM devices 
    WHERE user_id = ? 
    ORDER BY name
");
$stmt->execute([$_SESSION['user_id']]);
$devices = $stmt->fetchAll();

echo json_encode($devices);
?>
```

---

## 🎨 Customização Rápida

### Mudar Cor Principal
`css/styles.css`:
```css
:root {
    --color-primary: #3b82f6;  /* Mude para sua cor */
}
```

### Adicionar Menu
`index.html`:
```html
<li><a href="#novapagina" class="nav-item" data-page="novapagina">
    <i data-lucide="star"></i>
    <span>Nova Página</span>
</a></li>
```

`js/app.js`:
```javascript
getNovaPaginaContent() {
    return `
        <div class="space-y-6">
            <h1 class="text-3xl font-bold">Nova Página</h1>
            <div class="card">
                <p>Seu conteúdo aqui</p>
            </div>
        </div>
    `;
}
```

---

## 🐛 Resolução de Problemas

### Erro: "Cannot connect to database"
✅ Verifique se MySQL está rodando no XAMPP
✅ Confirme credenciais em `php/config.php`
✅ Verifique se o banco foi criado

### Erro: "404 Not Found"
✅ Verifique o caminho dos arquivos
✅ Certifique-se que está acessando via `localhost`
✅ Confirme que Apache está rodando

### Página em branco
✅ Abra o Console do navegador (F12)
✅ Veja erros JavaScript
✅ Verifique os logs do PHP

### Ícones não aparecem
✅ Verifique conexão com internet (Lucide é via CDN)
✅ Ou baixe Lucide localmente

---

## 📱 Testar em Mobile

1. Descubra seu IP local:
   - Windows: `ipconfig`
   - Linux/Mac: `ifconfig`

2. No celular, acesse:
   ```
   http://SEU_IP:80/angocontrol/
   ```

---

## 🔒 Segurança

### Em Produção:
1. ✅ Mude as senhas padrão
2. ✅ Use HTTPS
3. ✅ Configure firewall
4. ✅ Atualize as credenciais do DB
5. ✅ Adicione validação de inputs
6. ✅ Configure CORS apropriadamente

---

## 📚 Recursos Adicionais

### Documentação:
- PHP: https://www.php.net/docs.php
- MySQL: https://dev.mysql.com/doc/
- Lucide Icons: https://lucide.dev/

### Tutoriais:
- XAMPP: https://www.apachefriends.org/faq.html
- PHP + MySQL: https://www.w3schools.com/php/

---

## ✅ Checklist de Implementação

- [ ] XAMPP instalado e rodando
- [ ] Arquivos copiados para htdocs
- [ ] Banco de dados criado
- [ ] Configurações ajustadas
- [ ] Login funcionando
- [ ] Dashboard carregando
- [ ] Dispositivos listando
- [ ] API respondendo
- [ ] Tema claro/escuro funciona
- [ ] Responsivo no mobile

---

## 🎉 Pronto!

Agora você tem um sistema completo de domótica rodando!

Para dúvidas ou suporte, consulte o arquivo `README.md` completo.
