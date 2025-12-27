<?php
require_once 'config.php';

// Verificar autenticação
if (!isAuthenticated()) {
    if (isAjax()) {
        jsonResponse(['error' => 'Não autenticado'], 401);
    } else {
        header('Location: login.php');
        exit;
    }
}

// Listar todos os dispositivos
function getAllDevices() {
    global $pdo;
    
    $stmt = $pdo->prepare("
        SELECT 
            d.*,
            r.name as room_name,
            dt.name as type_name,
            dt.icon as type_icon
        FROM devices d
        LEFT JOIN rooms r ON d.room_id = r.id
        LEFT JOIN device_types dt ON d.type_id = dt.id
        WHERE d.user_id = ?
        ORDER BY d.updated_at DESC
    ");
    
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetchAll();
}

// Adicionar novo dispositivo
function addDevice($data) {
    global $pdo;
    
    $stmt = $pdo->prepare("
        INSERT INTO devices (user_id, name, room_id, type_id, status, performance, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    ");
    
    return $stmt->execute([
        $_SESSION['user_id'],
        $data['name'],
        $data['room_id'],
        $data['type_id'],
        $data['status'] ?? 'inactive',
        $data['performance'] ?? 0
    ]);
}

// Atualizar dispositivo
function updateDevice($id, $data) {
    global $pdo;
    
    $fields = [];
    $values = [];
    
    if (isset($data['name'])) {
        $fields[] = 'name = ?';
        $values[] = $data['name'];
    }
    if (isset($data['status'])) {
        $fields[] = 'status = ?';
        $values[] = $data['status'];
    }
    if (isset($data['performance'])) {
        $fields[] = 'performance = ?';
        $values[] = $data['performance'];
    }
    
    $fields[] = 'updated_at = NOW()';
    $values[] = $id;
    $values[] = $_SESSION['user_id'];
    
    $stmt = $pdo->prepare("
        UPDATE devices 
        SET " . implode(', ', $fields) . "
        WHERE id = ? AND user_id = ?
    ");
    
    return $stmt->execute($values);
}

// Deletar dispositivo
function deleteDevice($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("
        DELETE FROM devices 
        WHERE id = ? AND user_id = ?
    ");
    
    return $stmt->execute([$id, $_SESSION['user_id']]);
}

// Toggle status do dispositivo
function toggleDevice($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("
        SELECT status FROM devices 
        WHERE id = ? AND user_id = ?
    ");
    $stmt->execute([$id, $_SESSION['user_id']]);
    $device = $stmt->fetch();
    
    if (!$device) {
        return false;
    }
    
    $newStatus = $device['status'] === 'active' ? 'inactive' : 'active';
    
    return updateDevice($id, ['status' => $newStatus]);
}

// Processar requisições
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isAjax()) {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'list':
            $devices = getAllDevices();
            jsonResponse(['success' => true, 'devices' => $devices]);
            break;
            
        case 'add':
            $result = addDevice($_POST);
            jsonResponse(['success' => $result, 'message' => 'Dispositivo adicionado com sucesso']);
            break;
            
        case 'update':
            $result = updateDevice($_POST['id'], $_POST);
            jsonResponse(['success' => $result, 'message' => 'Dispositivo atualizado com sucesso']);
            break;
            
        case 'delete':
            $result = deleteDevice($_POST['id']);
            jsonResponse(['success' => $result, 'message' => 'Dispositivo removido com sucesso']);
            break;
            
        case 'toggle':
            $result = toggleDevice($_POST['id']);
            jsonResponse(['success' => $result, 'message' => 'Status atualizado com sucesso']);
            break;
            
        default:
            jsonResponse(['error' => 'Ação inválida'], 400);
    }
}

// Retornar lista de dispositivos para template
if (!isAjax()) {
    $devices = getAllDevices();
    return ['devices' => $devices];
}
?>
