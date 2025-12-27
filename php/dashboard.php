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

// Estatísticas do dashboard
function getDashboardStats(PDO $pdo, int $userId): array {
    $stmt = $pdo->prepare(
        "SELECT
            COUNT(*) AS total,
            SUM(status = 'active') AS active,
            SUM(status = 'offline') AS offline,
            SUM(status = 'eco') AS eco
        FROM devices
        WHERE user_id = ?"
    );
    $stmt->execute([$userId]);
    $totals = $stmt->fetch();

    $total = (int) ($totals['total'] ?? 0);
    $active = (int) ($totals['active'] ?? 0);
    $offline = (int) ($totals['offline'] ?? 0);
    $eco = (int) ($totals['eco'] ?? 0);

    return [
        [
            'title' => 'Total de Dispositivos',
            'value' => (string) $total,
            'subtitle' => 'Conectados',
            'icon' => 'home'
        ],
        [
            'title' => 'Dispositivos Ativos',
            'value' => (string) $active,
            'subtitle' => 'Em funcionamento',
            'icon' => 'zap',
            'iconColor' => 'success'
        ],
        [
            'title' => 'Offline',
            'value' => (string) $offline,
            'subtitle' => 'Requer atenção',
            'icon' => 'wifi-off',
            'iconColor' => 'destructive'
        ],
        [
            'title' => 'Modo Eco',
            'value' => (string) $eco,
            'subtitle' => 'Economia de energia',
            'icon' => 'activity',
            'iconColor' => 'warning'
        ]
    ];
}

// Dispositivos recentes
function getRecentDevices(PDO $pdo, int $userId): array {
    $stmt = $pdo->prepare(
        "SELECT 
            d.id,
            d.name,
            COALESCE(r.name, 'Sem cômodo') AS room,
            COALESCE(dt.name, 'Dispositivo') AS type,
            COALESCE(dt.icon, 'cpu') AS icon,
            d.status,
            d.performance
        FROM devices d
        LEFT JOIN rooms r ON d.room_id = r.id
        LEFT JOIN device_types dt ON d.type_id = dt.id
        WHERE d.user_id = ?
        ORDER BY d.updated_at DESC
        LIMIT 12"
    );
    $stmt->execute([$userId]);
    return $stmt->fetchAll() ?: [];
}

// Consumo mensal (últimos 6 meses)
function getEnergyData(PDO $pdo, int $userId): array {
    $stmt = $pdo->prepare(
        "SELECT 
            DATE_FORMAT(timestamp, '%Y-%m') AS period_key,
            DATE_FORMAT(timestamp, '%b/%y') AS period_label,
            SUM(consumption) AS total_consumption
        FROM energy_logs
        WHERE user_id = ?
          AND timestamp >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY period_key, period_label
        ORDER BY period_key ASC"
    );
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll();

    return array_map(function ($row) {
        return [
            'period' => $row['period_label'],
            'consumption' => (float) $row['total_consumption']
        ];
    }, $rows ?: []);
}

// Consumo em tempo real (últimos 24 registros)
function getRealtimeData(PDO $pdo, int $userId): array {
    $stmt = $pdo->prepare(
        "SELECT 
            DATE_FORMAT(timestamp, '%H:%i') AS time_label,
            consumption
        FROM energy_logs
        WHERE user_id = ?
        ORDER BY timestamp DESC
        LIMIT 24"
    );
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll();

    $data = array_map(function ($row) {
        return [
            'time' => $row['time_label'],
            'consumption' => (float) $row['consumption']
        ];
    }, $rows ?: []);

    return array_reverse($data);
}

$userId = (int) $_SESSION['user_id'];

$stats = getDashboardStats($pdo, $userId);
$devices = getRecentDevices($pdo, $userId);
$energyData = getEnergyData($pdo, $userId);
$realtimeData = getRealtimeData($pdo, $userId);

// Se for requisição AJAX, retornar JSON
if (isAjax()) {
    $data = [
        'stats' => $stats,
        'devices' => $devices,
        'energyData' => $energyData,
        'realtimeData' => $realtimeData
    ];
    jsonResponse($data);
}

// Retornar dados para template
return [
    'stats' => $stats,
    'devices' => $devices,
    'energyData' => $energyData,
    'realtimeData' => $realtimeData,
    'user' => [
        'name' => $_SESSION['user_name'] ?? 'Usuário',
        'role' => $_SESSION['user_role'] ?? 'Administrador'
    ]
];
?>
