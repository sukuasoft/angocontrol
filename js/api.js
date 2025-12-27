/**
 * API Helper - Facilita chamadas para o backend PHP
 */

const API = {
    baseURL: 'php/',
    
    /**
     * Fazer requisição GET
     */
    async get(endpoint, params = {}) {
        const url = new URL(this.baseURL + endpoint, "http://localhost/angocontrol/");
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            console.error('Erro na requisição GET:', error);
            throw error;
        }
    },
    
    /**
     * Fazer requisição POST
     */
    async post(endpoint, data = {}) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            
            const response = await fetch(this.baseURL + endpoint, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            console.error('Erro na requisição POST:', error);
            throw error;
        }
    },
    
    /**
     * Fazer requisição PUT
     */
    async put(endpoint, data = {}) {
        data._method = 'PUT';
        return await this.post(endpoint, data);
    },
    
    /**
     * Fazer requisição DELETE
     */
    async delete(endpoint, data = {}) {
        data._method = 'DELETE';
        return await this.post(endpoint, data);
    },
    
    /**
     * Processar resposta
     */
    async handleResponse(response) {
        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        if (!response.ok) {
            const payload = isJson ? await response.json().catch(() => ({})) : await response.text();
            const message = isJson ? (payload.message || JSON.stringify(payload)) : payload?.toString().slice(0, 200);
            throw new Error(message || 'Erro na requisição');
        }

        if (isJson) {
            return await response.json();
        }

        // Se o backend devolveu HTML (ex: redirect para login), lance erro legível
        const text = await response.text();
        throw new Error('Resposta inesperada do servidor: ' + text.slice(0, 200));
    },
    
    /**
     * Dashboard - Buscar dados
     */
    async getDashboard() {
        return await this.get('dashboard.php');
    },
    
    /**
     * Dispositivos - Listar todos
     */
    async getDevices() {
        return await this.post('dispositivos.php', { action: 'list' });
    },
    
    /**
     * Dispositivos - Adicionar novo
     */
    async addDevice(device) {
        return await this.post('dispositivos.php', {
            action: 'add',
            ...device
        });
    },
    
    /**
     * Dispositivos - Atualizar
     */
    async updateDevice(id, updates) {
        return await this.post('dispositivos.php', {
            action: 'update',
            id: id,
            ...updates
        });
    },
    
    /**
     * Dispositivos - Deletar
     */
    async deleteDevice(id) {
        return await this.post('dispositivos.php', {
            action: 'delete',
            id: id
        });
    },
    
    /**
     * Dispositivos - Toggle status
     */
    async toggleDevice(id) {
        return await this.post('dispositivos.php', {
            action: 'toggle',
            id: id
        });
    }
};

// Exemplo de uso:
/*

// Buscar dados do dashboard
API.getDashboard()
    .then(data => {
        console.log('Stats:', data.stats);
        console.log('Devices:', data.devices);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

// Listar dispositivos
API.getDevices()
    .then(data => {
        console.log('Dispositivos:', data.devices);
    });

// Adicionar dispositivo
API.addDevice({
    name: 'Nova Lâmpada',
    room_id: 1,
    type_id: 1,
    status: 'active'
})
    .then(data => {
        if (data.success) {
            alert('Dispositivo adicionado!');
        }
    });

// Atualizar dispositivo
API.updateDevice(5, { name: 'Nome Atualizado' })
    .then(data => {
        if (data.success) {
            alert('Dispositivo atualizado!');
        }
    });

// Toggle dispositivo
API.toggleDevice(3)
    .then(data => {
        if (data.success) {
            alert('Status alterado!');
        }
    });

// Deletar dispositivo
API.deleteDevice(7)
    .then(data => {
        if (data.success) {
            alert('Dispositivo removido!');
        }
    });

*/
