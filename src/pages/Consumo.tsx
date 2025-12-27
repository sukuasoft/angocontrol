import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Zap, 
  Calendar,
  Download,
  Lightbulb,
  Tv,
  Wind
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const monthlyData = [
  { month: "Jan", consumption: 245, cost: 189.50 },
  { month: "Fev", consumption: 267, cost: 206.80 },
  { month: "Mar", consumption: 234, cost: 181.20 },
  { month: "Abr", consumption: 278, cost: 215.40 },
  { month: "Mai", consumption: 198, cost: 153.40 },
  { month: "Jun", consumption: 223, cost: 172.80 }
]

const dailyData = [
  { day: "Seg", consumption: 8.5 },
  { day: "Ter", consumption: 7.2 },
  { day: "Qua", consumption: 9.1 },
  { day: "Qui", consumption: 8.8 },
  { day: "Sex", consumption: 7.6 },
  { day: "Sáb", consumption: 6.4 },
  { day: "Dom", consumption: 5.9 }
]

const deviceConsumption = [
  { name: "Ar Condicionado", icon: Wind, consumption: 45.2, percentage: 35, cost: 89.40 },
  { name: "Iluminação", icon: Lightbulb, consumption: 28.7, percentage: 22, cost: 56.80 },
  { name: "TV e Eletrônicos", icon: Tv, consumption: 18.3, percentage: 14, cost: 36.20 },
  { name: "Outros", icon: Zap, consumption: 37.8, percentage: 29, cost: 74.80 }
]

export default function Consumo() {
  const maxConsumption = Math.max(...monthlyData.map(item => item.consumption))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            Consumo de Energia
          </h1>
          <p className="text-muted-foreground">Monitore e gerencie o consumo energético da sua casa</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Este Mês
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Consumo Atual</p>
                <p className="text-lg font-bold text-foreground">223 KZ</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -12% vs mês anterior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Economia</p>
                <p className="text-lg font-bold text-foreground">32.8 KZ</p>
                <p className="text-xs text-muted-foreground">vs média</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Média Diária</p>
                <p className="text-lg font-bold text-foreground">7.4 KZ</p>
                <p className="text-xs text-muted-foreground">últimos 7 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pico</p>
                <p className="text-lg font-bold text-foreground">12.3 KZ</p>
                <p className="text-xs text-muted-foreground">ontem 14:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico Principal */}
        <Card className="lg:col-span-2 bg-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Histórico de Consumo</span>
              <Badge variant="outline">Últimos 6 meses</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="daily">Diário</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="space-y-4 mt-4">
                {monthlyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground w-12">{item.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={(item.consumption / maxConsumption) * 100} 
                          className="h-3"
                        />
                      </div>
                      <div className="text-right w-24">
                        <span className="text-sm font-medium text-foreground">{item.consumption} KZ</span>
                        <p className="text-xs text-muted-foreground">R$ {item.cost.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="daily" className="space-y-4 mt-4">
                {dailyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground w-12">{item.day}</span>
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={(item.consumption / 10) * 100} 
                          className="h-3"
                        />
                      </div>
                      <div className="text-right w-16">
                        <span className="text-sm font-medium text-foreground">{item.consumption} KZ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Consumo por Dispositivo */}
        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle>Consumo por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceConsumption.map((device, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <device.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{device.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{device.percentage}%</span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={device.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{device.consumption} KZ</span>
                      <span>R$ {device.cost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle>Meta de Consumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">200 KZ</div>
                <p className="text-sm text-muted-foreground">Meta mensal</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso atual</span>
                  <span className="font-medium">223 / 200 KZ</span>
                </div>
                <Progress value={111.5} className="h-3" />
                <p className="text-xs text-warning text-center">
                  Você está 11.5% acima da meta
                </p>
              </div>

              <Button variant="outline" className="w-full">
                Ajustar Meta
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle>Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">💡 Economia Inteligente</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Configure o ar-condicionado para 24°C e economize até 15% na conta
                </p>
              </div>
              
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">🌱 Modo Eco</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ative o modo eco durante a madrugada para reduzir o consumo
                </p>
              </div>
              
              <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-foreground">⚡ Alerta</p>
                <p className="text-xs text-muted-foreground mt-1">
                  TV da sala está ligada há 8 horas consecutivas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}