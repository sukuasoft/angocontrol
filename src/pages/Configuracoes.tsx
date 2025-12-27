import { useState } from "react"
import { 
  User, 
  Bell, 
  Shield, 
  Wifi, 
  Palette, 
  Globe, 
  HardDrive,
  Download,
  Moon,
  Sun
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export default function Configuracoes() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    security: true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
        </div>
        <Badge variant="outline" className="bg-primary-soft text-primary">
          Versão 2.1.0
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perfil do Usuário */}
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">LF</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Lando F</h3>
                <p className="text-sm text-muted-foreground">Administrador</p>
                <Badge variant="secondary" className="mt-1">Premium</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value="lando@angocontrol.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" value="+244 923 456 789" className="mt-1" />
              </div>
            </div>
            <Button className="w-full">Atualizar Perfil</Button>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="text-sm font-medium">Modo Escuro</span>
              </div>
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tema de Cores</Label>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-primary rounded-full border-2 border-primary-foreground cursor-pointer"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-transparent cursor-pointer opacity-50"></div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-transparent cursor-pointer opacity-50"></div>
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-transparent cursor-pointer opacity-50"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email</span>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, email: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, push: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS</span>
              <Switch 
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, sms: checked}))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Alertas de Segurança</span>
              <Switch 
                checked={notifications.security}
                onCheckedChange={(checked) => setNotifications(prev => ({...prev, security: checked}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup e Armazenamento */}
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" />
              Backup & Armazenamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Espaço usado</span>
                <span className="text-sm font-medium">2.4 GB / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Exportar Configurações
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HardDrive className="w-4 h-4 mr-2" />
                Backup Automático
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}