import { 
  Home, 
  Zap, 
  Wifi, 
  WifiOff, 
  Lightbulb, 
  Tv, 
  Thermometer, 
  Camera,
  Lock,
  Wind,
  BarChart3,
  Activity
} from "lucide-react"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { DeviceCard } from "@/components/dashboard/DeviceCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const statsData = [
  {
    title: "Total de Dispositivos",
    value: "11",
    subtitle: "Conectados",
    icon: Home,
    trend: { value: "+2", positive: true }
  },
  {
    title: "Dispositivos Ativos",
    value: "8",
    subtitle: "Em funcionamento",
    icon: Zap,
    iconColor: "text-success"
  },
  {
    title: "Offline",
    value: "1",
    subtitle: "Requer atenção",
    icon: WifiOff,
    iconColor: "text-destructive"
  },
  {
    title: "Modo Eco",
    value: "2",
    subtitle: "Economia de energia",
    icon: Activity,
    iconColor: "text-warning"
  }
]

const recentDevices = [
  { name: "Luzes Sala", room: "Sala de Estar", type: "Iluminação", icon: Lightbulb, status: "active" as const, performance: 85 },
  { name: "TV Samsung", room: "Sala de Estar", type: "Entretenimento", icon: Tv, status: "active" as const, performance: 92 },
  { name: "Ar Condicionado", room: "Quarto Master", type: "Climatização", icon: Wind, status: "eco" as const, performance: 67 },
  { name: "Câmera Entrada", room: "Entrada", type: "Segurança", icon: Camera, status: "active" as const, performance: 98 },
  { name: "Fechadura Digital", room: "Porta Principal", type: "Segurança", icon: Lock, status: "offline" as const },
  { name: "Termostato", room: "Cozinha", type: "Climatização", icon: Thermometer, status: "active" as const, performance: 76 }
]

const energyData = [
  { period: "Janeiro", consumption: 245 },
  { period: "Fevereiro", consumption: 267 },
  { period: "Março", consumption: 234 },
  { period: "Abril", consumption: 278 },
  { period: "Maio", consumption: 198 },
  { period: "Junho", consumption: 223 }
]

const realtimeData = [
  { time: "00:00", consumption: 2.1 },
  { time: "04:00", consumption: 1.8 },
  { time: "08:00", consumption: 3.2 },
  { time: "12:00", consumption: 4.5 },
  { time: "16:00", consumption: 3.8 },
  { time: "20:00", consumption: 5.2 },
  { time: "24:00", consumption: 2.9 }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            Olá, Lando F! 
            <span className="text-2xl">☀️</span>
          </h1>
          <p className="text-muted-foreground">Bem-vindo ao painel de controle da sua casa inteligente</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
          Exportar CSV
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Consumption Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Consumo Mensal */}
          <Card className="bg-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Consumo Mensal</CardTitle>
                <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">223 KZ</p>
                  <p className="text-sm text-success font-medium">↓ 12% menor</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {energyData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground w-20">{item.period}</span>
                    <div className="flex-1 mx-4">
                      <Progress 
                        value={(item.consumption / 300) * 100} 
                        className="h-2"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-16 text-right">
                      {item.consumption} KZ
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico em Tempo Real */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">Consumo em Tempo Real</CardTitle>
              <p className="text-sm text-muted-foreground">Últimas 24 horas</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realtimeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground w-16">{item.time}</span>
                    <div className="flex-1 mx-4">
                      <Progress 
                        value={(item.consumption / 6) * 100} 
                        className="h-2"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-12 text-right">
                      {item.consumption} KZ
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium text-foreground">Consumo atual: 3.8 KZ/h</p>
                <p className="text-xs text-muted-foreground">Pico hoje: 5.2 KZ às 20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Ações Rápidas</CardTitle>
            <p className="text-sm text-muted-foreground">Controle rápido dos ambientes</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-primary-soft text-primary hover:bg-primary hover:text-primary-foreground">
              <Home className="w-4 h-4 mr-2" />
              Modo "Saí de Casa"
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Thermometer className="w-4 h-4 mr-2" />
              Ajustar Temperatura
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Lightbulb className="w-4 h-4 mr-2" />
              Controlar Luzes
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Ver Câmeras
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Devices */}
      <Card className="bg-card border-card-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Dispositivos Recentes</CardTitle>
            <p className="text-sm text-muted-foreground">Atividade dos últimos dispositivos</p>
          </div>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
            {recentDevices.map((device, index) => (
              <DeviceCard 
                key={index} 
                {...device}
                onToggle={(enabled) => console.log(`${device.name} ${enabled ? 'ligado' : 'desligado'}`)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}