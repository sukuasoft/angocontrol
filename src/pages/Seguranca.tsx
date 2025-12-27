import { useState } from "react"
import { 
  Shield, 
  Camera, 
  DoorOpen, 
  AlertTriangle, 
  Activity, 
  Lock,
  Unlock,
  Eye,
  Bell,
  MapPin
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

const cameras = [
  { id: 1, name: "Câmera da Entrada", location: "Porta Principal", status: "online", recording: true },
  { id: 2, name: "Câmera da Sala", location: "Sala de Estar", status: "online", recording: false },
  { id: 3, name: "Câmera do Quintal", location: "Área Externa", status: "offline", recording: false },
  { id: 4, name: "Câmera da Garagem", location: "Garagem", status: "online", recording: true }
]

const sensors = [
  { id: 1, name: "Sensor Porta Principal", type: "Porta", status: "closed", battery: 85 },
  { id: 2, name: "Sensor Janela Sala", type: "Janela", status: "open", battery: 72 },
  { id: 3, name: "Detector de Movimento", type: "Movimento", status: "active", battery: 91 },
  { id: 4, name: "Detector de Fumaça", type: "Fumaça", status: "normal", battery: 68 }
]

const alerts = [
  { id: 1, type: "warning", message: "Janela da sala detectada aberta há 2 horas", time: "14:32" },
  { id: 2, type: "info", message: "Câmera do quintal offline", time: "13:15" },
  { id: 3, type: "success", message: "Sistema de alarme ativado", time: "12:45" },
  { id: 4, type: "warning", message: "Bateria baixa - Detector de fumaça", time: "11:20" }
]

export default function Seguranca() {
  const [alarmEnabled, setAlarmEnabled] = useState(true)
  const [motionDetection, setMotionDetection] = useState(true)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            Segurança
          </h1>
          <p className="text-muted-foreground">Monitore e controle a segurança da sua casa</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${alarmEnabled ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
            {alarmEnabled ? 'Sistema Ativo' : 'Sistema Inativo'}
          </Badge>
          <Button 
            variant={alarmEnabled ? "destructive" : "default"}
            onClick={() => setAlarmEnabled(!alarmEnabled)}
          >
            {alarmEnabled ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            {alarmEnabled ? 'Desativar' : 'Ativar'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Camera className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Câmeras Online</p>
                <p className="text-lg font-bold text-foreground">3/4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sensores Ativos</p>
                <p className="text-lg font-bold text-foreground">4/4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Alertas Hoje</p>
                <p className="text-lg font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <DoorOpen className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Abertos</p>
                <p className="text-lg font-bold text-foreground">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Câmeras */}
        <Card className="lg:col-span-2 bg-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Câmeras de Segurança
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cameras.map((camera) => (
                <Card key={camera.id} className="bg-muted/20 border-0 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{camera.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {camera.location}
                        </p>
                      </div>
                      <Badge 
                        variant={camera.status === 'online' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {camera.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </div>
                    
                    {/* Mock camera feed */}
                    <div className="bg-muted rounded-lg h-24 mb-3 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${camera.recording ? 'bg-destructive animate-pulse' : 'bg-muted'}`} />
                        <span className="text-xs text-muted-foreground">
                          {camera.recording ? 'Gravando' : 'Parado'}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 px-2">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Alertas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.type === 'warning' ? 'text-warning' :
                    alert.type === 'success' ? 'text-success' : 'text-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sensores */}
      <Card className="bg-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Sensores e Detectores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sensors.map((sensor) => (
              <Card key={sensor.id} className="bg-muted/20 border-0 hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {sensor.type}
                    </Badge>
                    <Badge 
                      variant={sensor.status === 'normal' || sensor.status === 'closed' || sensor.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {sensor.status === 'closed' ? 'Fechado' :
                       sensor.status === 'open' ? 'Aberto' :
                       sensor.status === 'active' ? 'Ativo' : 'Normal'}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-foreground text-sm mb-3">{sensor.name}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Bateria</span>
                      <span className="font-medium">{sensor.battery}%</span>
                    </div>
                    <Progress value={sensor.battery} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Controles Rápidos */}
      <Card className="bg-card border-card-border">
        <CardHeader>
          <CardTitle>Controles Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between bg-muted/20 p-4 rounded-lg flex-1">
              <div>
                <h4 className="font-medium text-foreground">Detecção de Movimento</h4>
                <p className="text-sm text-muted-foreground">Notificações automáticas</p>
              </div>
              <Switch 
                checked={motionDetection}
                onCheckedChange={setMotionDetection}
              />
            </div>
            
            <Button variant="outline" className="sm:w-auto">
              <Shield className="w-4 h-4 mr-2" />
              Modo Ausente
            </Button>
            
            <Button variant="destructive" className="sm:w-auto">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergência
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}