import { useState } from "react"
import { 
  Plus, 
  Filter, 
  Search, 
  Lightbulb, 
  Tv, 
  Thermometer, 
  Camera,
  Lock,
  Wind,
  Speaker,
  Cpu,
  MoreVertical
} from "lucide-react"
import { DeviceCard } from "@/components/dashboard/DeviceCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const allDevices = [
  { name: "Luzes Sala Principal", room: "Sala de Estar", type: "Iluminação", icon: Lightbulb, status: "active" as const, performance: 85, category: "lighting" },
  { name: "TV Samsung 65\"", room: "Sala de Estar", type: "Entretenimento", icon: Tv, status: "active" as const, performance: 92, category: "entertainment" },
  { name: "Ar Condicionado Split", room: "Quarto Master", type: "Climatização", icon: Wind, status: "eco" as const, performance: 67, category: "climate" },
  { name: "Câmera de Segurança", room: "Entrada Principal", type: "Segurança", icon: Camera, status: "active" as const, performance: 98, category: "security" },
  { name: "Fechadura Digital", room: "Porta Principal", type: "Segurança", icon: Lock, status: "offline" as const, category: "security" },
  { name: "Termostato Inteligente", room: "Cozinha", type: "Climatização", icon: Thermometer, status: "active" as const, performance: 76, category: "climate" },
  { name: "Luzes Quarto", room: "Quarto Master", type: "Iluminação", icon: Lightbulb, status: "inactive" as const, performance: 0, category: "lighting" },
  { name: "Alto-falante Alexa", room: "Cozinha", type: "Entretenimento", icon: Speaker, status: "active" as const, performance: 89, category: "entertainment" },
  { name: "Sensor de Movimento", room: "Hall de Entrada", type: "Segurança", icon: Cpu, status: "active" as const, performance: 95, category: "security" },
  { name: "Ventilador Teto", room: "Quarto Casal", type: "Climatização", icon: Wind, status: "eco" as const, performance: 45, category: "climate" },
  { name: "TV Quarto", room: "Quarto Master", type: "Entretenimento", icon: Tv, status: "inactive" as const, performance: 0, category: "entertainment" }
]

const categories = [
  { id: "all", label: "Todos", count: allDevices.length },
  { id: "lighting", label: "Iluminação", count: allDevices.filter(d => d.category === "lighting").length },
  { id: "entertainment", label: "Entretenimento", count: allDevices.filter(d => d.category === "entertainment").length },
  { id: "climate", label: "Climatização", count: allDevices.filter(d => d.category === "climate").length },
  { id: "security", label: "Segurança", count: allDevices.filter(d => d.category === "security").length }
]

export default function Dispositivos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDevices = allDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.room.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || device.category === selectedCategory
    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const statusCounts = {
    active: allDevices.filter(d => d.status === "active").length,
    inactive: allDevices.filter(d => d.status === "inactive").length,
    offline: allDevices.filter(d => d.status === "offline").length,
    eco: allDevices.filter(d => d.status === "eco").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dispositivos</h1>
          <p className="text-muted-foreground">Gerencie todos os dispositivos da sua casa inteligente</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Dispositivo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-card-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{statusCounts.active}</div>
            <div className="text-sm text-muted-foreground">Ativos</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-card-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{statusCounts.inactive}</div>
            <div className="text-sm text-muted-foreground">Inativos</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-card-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{statusCounts.offline}</div>
            <div className="text-sm text-muted-foreground">Offline</div>
          </CardContent>
        </Card>
        <Card className="bg-card border-card-border">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">{statusCounts.eco}</div>
            <div className="text-sm text-muted-foreground">Modo Eco</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-card-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar dispositivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="eco">Modo Eco</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.label}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDevices.map((device, index) => (
              <DeviceCard 
                key={index} 
                {...device}
                onToggle={(enabled) => console.log(`${device.name} ${enabled ? 'ligado' : 'desligado'}`)}
              />
            ))}
          </div>
          
          {filteredDevices.length === 0 && (
            <Card className="bg-card border-card-border">
              <CardContent className="p-8 text-center">
                <Cpu className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum dispositivo encontrado</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros ou adicionar novos dispositivos.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}