import { 
  Camera, 
  Wifi, 
  AlertTriangle, 
  Shield, 
  Eye,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  MapPin
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const securityDevices = [
  { 
    name: "Câmera Entrada", 
    location: "Porta Principal", 
    status: "active", 
    signal: 95,
    lastActivity: "Agora",
    type: "camera"
  },
  { 
    name: "Sensor Movimento", 
    location: "Hall de Entrada", 
    status: "active", 
    signal: 88,
    lastActivity: "2 min",
    type: "sensor"
  },
  { 
    name: "Sensor Porta", 
    location: "Porta dos Fundos", 
    status: "active", 
    signal: 92,
    lastActivity: "5 min",
    type: "sensor"
  },
  { 
    name: "Câmera Garagem", 
    location: "Garagem", 
    status: "offline", 
    signal: 0,
    lastActivity: "2h",
    type: "camera"
  },
  { 
    name: "Sensor Janela", 
    location: "Sala de Estar", 
    status: "active", 
    signal: 78,
    lastActivity: "1 min",
    type: "sensor"
  },
  { 
    name: "Detector Fumaça", 
    location: "Cozinha", 
    status: "active", 
    signal: 96,
    lastActivity: "30 min",
    type: "sensor"
  }
]

const recentAlerts = [
  {
    id: 1,
    type: "movement",
    message: "Movimento detectado na entrada",
    time: "13:45",
    status: "resolved",
    location: "Porta Principal"
  },
  {
    id: 2,
    type: "offline",
    message: "Câmera da garagem desconectou",
    time: "11:30",
    status: "pending",
    location: "Garagem"
  },
  {
    id: 3,
    type: "door",
    message: "Porta dos fundos aberta",
    time: "09:15",
    status: "resolved",
    location: "Porta dos Fundos"
  },
  {
    id: 4,
    type: "system",
    message: "Backup do sistema concluído",
    time: "08:00",
    status: "info",
    location: "Sistema"
  }
]

const liveFeeds = [
  { name: "Entrada Principal", active: true, viewers: 0 },
  { name: "Sala de Estar", active: true, viewers: 0 },
  { name: "Cozinha", active: true, viewers: 0 },
  { name: "Garagem", active: false, viewers: 0 }
]

export default function Monitoramento() {
  const activeDevices = securityDevices.filter(d => d.status === "active").length
  const offlineDevices = securityDevices.filter(d => d.status === "offline").length
  const pendingAlerts = recentAlerts.filter(a => a.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoramento em Tempo Real</h1>
          <p className="text-muted-foreground">Acompanhe a segurança e atividade da sua casa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Ver Todas as Câmeras
          </Button>
          <Button className="bg-primary hover:bg-primary-hover">
            <Shield className="w-4 h-4 mr-2" />
            Ativar Modo Segurança
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dispositivos Ativos</p>
                <p className="text-2xl font-bold text-success">{activeDevices}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dispositivos Offline</p>
                <p className="text-2xl font-bold text-destructive">{offlineDevices}</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas Pendentes</p>
                <p className="text-2xl font-bold text-warning">{pendingAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Online</p>
                <p className="text-2xl font-bold text-primary">99.8%</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Devices */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Dispositivos de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-card-border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        device.status === 'active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {device.type === 'camera' ? 
                          <Camera className="w-4 h-4" /> : 
                          <Activity className="w-4 h-4" />
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{device.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {device.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {device.status === 'active' ? 'Online' : 'Offline'}
                        </p>
                        <div className="flex items-center gap-1">
                          <Wifi className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{device.signal}%</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Última atividade</p>
                        <p className="text-sm font-medium text-foreground">{device.lastActivity}</p>
                      </div>
                      
                      <Badge 
                        variant={device.status === 'active' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {device.status === 'active' ? 'Ativo' : 'Offline'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Live Feeds */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg border border-card-border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {alert.time} • {alert.location}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          alert.status === 'resolved' ? 'default' :
                          alert.status === 'pending' ? 'destructive' : 'secondary'
                        }
                        className="text-xs ml-2"
                      >
                        {alert.status === 'resolved' ? 'Resolvido' :
                         alert.status === 'pending' ? 'Pendente' : 'Info'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Camera Feeds */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Câmeras ao Vivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveFeeds.map((feed, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-card-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${feed.active ? 'bg-success' : 'bg-destructive'}`} />
                      <span className="text-sm font-medium text-foreground">{feed.name}</span>
                    </div>
                    <Button size="sm" variant="outline" disabled={!feed.active}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}