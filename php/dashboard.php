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

// Dados de estatísticas
$stats = [
    [
        'title' => 'Total de Dispositivos',
        'value' => '11',
        'subtitle' => 'Conectados',
        'icon' => 'home',
        'trend' => ['value' => '+2', 'positive' => true]
    ],
    [
        'title' => 'Dispositivos Ativos',
        'value' => '8',
        'subtitle' => 'Em funcionamento',
        'icon' => 'zap',
        'iconColor' => 'success'
    ],
    [
        'title' => 'Offline',
        'value' => '1',
        'subtitle' => 'Requer atenção',
        'icon' => 'wifi-off',
        'iconColor' => 'destructive'
    ],
    [
        'title' => 'Modo Eco',
        'value' => '2',
        'subtitle' => 'Economia de energia',
        'icon' => 'activity',
        'iconColor' => 'warning'
    ]
];

// Dados de dispositivos
$devices = [
    [
        'id' => 1,
        'name' => 'Luzes Sala',
        'room' => 'Sala de Estar',
        'type' => 'Iluminação',
        'icon' => 'lightbulb',
        'status' => 'active',
        'performance' => 85
    ],
    [
        'id' => 2,
        'name' => 'TV Samsung',
        'room' => 'Sala de Estar',
        'type' => 'Entretenimento',
        'icon' => 'tv',
        'status' => 'active',
        'performance' => 92
    ],
    [
        'id' => 3,
        'name' => 'Ar Condicionado',
        'room' => 'Quarto Master',
        'type' => 'Climatização',
        'icon' => 'wind',
        'status' => 'eco',
        'performance' => 67
    ],
    [
        'id' => 4,
        'name' => 'Câmera Entrada',
        'room' => 'Entrada',
        'type' => 'Segurança',
        'icon' => 'camera',
        'status' => 'active',
        'performance' => 98
    ],
    [
        'id' => 5,
        'name' => 'Fechadura Digital',
        'room' => 'Porta Principal',
        'type' => 'Segurança',
        'icon' => 'lock',
        'status' => 'offline'
    ],
    [
        'id' => 6,
        'name' => 'Termostato',
        'room' => 'Cozinha',
        'type' => 'Climatização',
        'icon' => 'thermometer',
        'status' => 'active',
        'performance' => 76
    ]
];

// Dados de consumo mensal
$energyData = [
    ['period' => 'Janeiro', 'consumption' => 245],
    ['period' => 'Fevereiro', 'consumption' => 267],
    ['period' => 'Março', 'consumption' => 234],
    ['period' => 'Abril', 'consumption' => 278],
    ['period' => 'Maio', 'consumption' => 198],
    ['period' => 'Junho', 'consumption' => 223]
];

// Dados de consumo em tempo real
$realtimeData = [
    ['time' => '00:00', 'consumption' => 2.1],
    ['time' => '04:00', 'consumption' => 1.8],
    ['time' => '08:00', 'consumption' => 3.2],
    ['time' => '12:00', 'consumption' => 4.5],
    ['time' => '16:00', 'consumption' => 3.8],
    ['time' => '20:00', 'consumption' => 5.2],
    ['time' => '24:00', 'consumption' => 2.9]
];

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
        'name' => $_SESSION['user_name'] ?? 'Lando F',
        'role' => $_SESSION['user_role'] ?? 'Administrador'
    ]
];
?>
