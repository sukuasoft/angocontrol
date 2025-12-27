import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive?: boolean
  }
  iconColor?: string
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  iconColor = "text-primary"
}: StatsCardProps) {
  return (
    <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1 truncate">{title}</p>
            <div className="flex items-baseline gap-1 sm:gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">{value}</h3>
              {trend && (
                <span className={`text-xs sm:text-sm font-medium ${
                  trend.positive ? 'text-success' : 'text-destructive'
                }`}>
                  {trend.value}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1 truncate">{subtitle}</p>
            )}
          </div>
          <div className={`p-2 sm:p-3 rounded-xl bg-primary-soft ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}