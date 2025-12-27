import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

interface DeviceCardProps {
  name: string
  room: string
  type: string
  icon: LucideIcon
  status: "active" | "inactive" | "offline" | "eco"
  performance?: number
  onToggle?: (enabled: boolean) => void
}

const statusConfig = {
  active: { label: "Ativo", variant: "default" as const, color: "bg-success" },
  inactive: { label: "Inativo", variant: "secondary" as const, color: "bg-muted" },
  offline: { label: "Offline", variant: "destructive" as const, color: "bg-destructive" },
  eco: { label: "Eco", variant: "outline" as const, color: "bg-warning" }
}

export function DeviceCard({ 
  name, 
  room, 
  type, 
  icon: Icon, 
  status, 
  performance,
  onToggle 
}: DeviceCardProps) {
  const statusInfo = statusConfig[status]
  const isOnline = status !== "offline"

  return (
    <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300 group hover:scale-105 hover:-translate-y-1 cursor-pointer animate-fade-in">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className={`p-1.5 sm:p-2 rounded-lg transition-colors ${status === 'active' ? 'bg-primary-soft text-primary' : 'bg-muted text-muted-foreground'}`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-xs sm:text-sm truncate">{name}</h4>
              <p className="text-xs text-muted-foreground truncate">{room} • {type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
            <Badge 
              variant={statusInfo.variant}
              className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
            >
              {statusInfo.label}
            </Badge>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusInfo.color}`} />
          </div>
        </div>

        {performance !== undefined && (
          <div className="mb-2 sm:mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Desempenho</span>
              <span className="text-xs font-medium text-foreground">{performance}%</span>
            </div>
            <Progress value={performance} className="h-1 sm:h-1.5" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground flex-1 mr-2">
            {status === 'active' ? 'Ligado' : 
             status === 'eco' ? 'Modo economia' :
             status === 'offline' ? 'Desconectado' : 'Desligado'}
          </span>
          {onToggle && (
            <Switch 
              checked={status === 'active'}
              onCheckedChange={onToggle}
              disabled={!isOnline}
              className="scale-75 transition-transform hover:scale-90"
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}