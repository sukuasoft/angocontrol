<?php
require_once 'config.php';

if (!isAuthenticated()) {
    jsonResponse(['error' => 'Não autenticado'], 401);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isAjax()) {
    $action = $_POST['action'] ?? '';
    $userId = $_SESSION['user_id'];

    switch ($action) {
        // ===== DISPOSITIVOS =====
        case 'device_add':
            $name = $_POST['name'] ?? '';
            $room_id = $_POST['room_id'] ?? null;
            $type_id = $_POST['type_id'] ?? 1;
            
            if (empty($name)) {
                jsonResponse(['error' => 'Nome do dispositivo obrigatório'], 400);
            }
            
            $stmt = $pdo->prepare("INSERT INTO devices (user_id, name, room_id, type_id, status) VALUES (?, ?, ?, ?, 'inactive')");
            $result = $stmt->execute([$userId, $name, $room_id ?: null, $type_id]);
            jsonResponse(['success' => $result, 'message' => 'Dispositivo criado com sucesso']);
            
        case 'device_toggle':
            $id = $_POST['id'] ?? null;
            
            if (!$id) jsonResponse(['error' => 'ID inválido'], 400);
            
            $stmt = $pdo->prepare("SELECT status FROM devices WHERE id = ? AND user_id = ?");
            $stmt->execute([$id, $userId]);
            $device = $stmt->fetch();
            
            if (!$device) jsonResponse(['error' => 'Dispositivo não encontrado'], 404);
            
            $newStatus = ($device['status'] === 'active') ? 'inactive' : 'active';
            $upd = $pdo->prepare("UPDATE devices SET status = ?, updated_at = NOW() WHERE id = ? AND user_id = ?");
            $upd->execute([$newStatus, $id, $userId]);
            
            jsonResponse(['success' => true, 'newStatus' => $newStatus]);
            
        case 'device_delete':
            $id = $_POST['id'] ?? null;
            
            if (!$id) jsonResponse(['error' => 'ID inválido'], 400);
            
            $stmt = $pdo->prepare("DELETE FROM devices WHERE id = ? AND user_id = ?");
            $result = $stmt->execute([$id, $userId]);
            
            jsonResponse(['success' => $result, 'message' => 'Dispositivo removido']);

        // ===== CONSUMO =====
        case 'energy_add':
            $device_id = $_POST['device_id'] ?? null;
            $consumption = $_POST['consumption'] ?? 0;
            
            $stmt = $pdo->prepare("INSERT INTO energy_logs (user_id, device_id, consumption, timestamp) VALUES (?, ?, ?, NOW())");
            $result = $stmt->execute([$userId, $device_id ?: null, $consumption]);
            
            jsonResponse(['success' => $result, 'message' => 'Leitura registrada']);

        // ===== SEGURANÇA =====
        case 'event_add':
            $device_id = $_POST['device_id'] ?? null;
            $event_type = $_POST['event_type'] ?? 'other';
            $description = $_POST['description'] ?? '';
            $severity = $_POST['severity'] ?? 'low';
            
            $stmt = $pdo->prepare("INSERT INTO security_events (user_id, device_id, event_type, description, severity, timestamp) VALUES (?, ?, ?, ?, ?, NOW())");
            $result = $stmt->execute([$userId, $device_id ?: null, $event_type, $description, $severity]);
            
            jsonResponse(['success' => $result, 'message' => 'Evento registrado']);

        // ===== CONFIGURAÇÕES =====
        case 'profile_update':
            $name = $_POST['name'] ?? null;
            $email = $_POST['email'] ?? null;
            
            $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
            $result = $stmt->execute([$name, $email, $userId]);
            
            if ($result) {
                $_SESSION['user_name'] = $name;
            }
            
            jsonResponse(['success' => $result, 'message' => 'Perfil atualizado']);

        // ===== CLIMATIZAÇÃO =====
        case 'climate_adjust':
            $room = $_POST['room'] ?? '';
            $temperature = $_POST['temperature'] ?? 22;
            $mode = $_POST['mode'] ?? 'auto';
            
            try {
                $stmt = $pdo->prepare("INSERT INTO automations (user_id, name, trigger_type, trigger_config, action_config, enabled) VALUES (?, ?, ?, ?, ?, 1)");
                $trigger = json_encode(['type' => 'manual']);
                $action = json_encode(['room' => $room, 'temperature' => $temperature, 'mode' => $mode]);
                $result = $stmt->execute([$userId, "Climate: $room", 'manual', $trigger, $action]);
                jsonResponse(['success' => $result, 'message' => 'Climatização ajustada']);
            } catch (Exception $e) {
                jsonResponse(['error' => 'Erro ao ajustar climatização: ' . $e->getMessage()], 500);
            }

        // ===== INTEGRAÇÕES =====
        case 'integration_add':
            $service = $_POST['service'] ?? '';
            $api_key = $_POST['api_key'] ?? '';
            $endpoint = $_POST['endpoint'] ?? '';
            
            try {
                $stmt = $pdo->prepare("INSERT INTO automations (user_id, name, trigger_type, trigger_config, action_config, enabled) VALUES (?, ?, ?, ?, ?, 1)");
                $trigger = json_encode(['type' => 'manual']);
                $action = json_encode(['service' => $service, 'api_key' => $api_key, 'endpoint' => $endpoint]);
                $result = $stmt->execute([$userId, "Integration: $service", 'manual', $trigger, $action]);
                jsonResponse(['success' => $result, 'message' => 'Integração adicionada']);
            } catch (Exception $e) {
                jsonResponse(['error' => 'Erro ao adicionar integração: ' . $e->getMessage()], 500);
            }

        // ===== SUPORTE =====
        case 'support_ticket':
            $subject = $_POST['subject'] ?? '';
            $category = $_POST['category'] ?? 'general';
            $message = $_POST['message'] ?? '';
            
            try {
                $stmt = $pdo->prepare("INSERT INTO automations (user_id, name, trigger_type, trigger_config, action_config, enabled) VALUES (?, ?, ?, ?, ?, 1)");
                $trigger = json_encode(['type' => 'manual']);
                $action = json_encode(['category' => $category, 'message' => $message, 'status' => 'open']);
                $result = $stmt->execute([$userId, "Ticket: $subject", 'manual', $trigger, $action]);
                jsonResponse(['success' => $result, 'message' => 'Ticket de suporte criado']);
            } catch (Exception $e) {
                jsonResponse(['error' => 'Erro ao criar ticket: ' . $e->getMessage()], 500);
            }

        default:
            jsonResponse(['error' => 'Ação inválida'], 400);
    }
}

jsonResponse(['error' => 'Método não permitido'], 405);
?>
