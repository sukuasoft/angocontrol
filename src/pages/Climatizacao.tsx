import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Plus, 
  Minus, 
  Snowflake, 
  Flame, 
  Zap, 
  Leaf,
  AlertTriangle,
  Power,
  Home,
  ChartLine
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const temperatureData = [
  { time: "00:00", temperatura: 22, umidade: 65 },
  { time: "04:00", temperatura: 20, umidade: 68 },
  { time: "08:00", temperatura: 24, umidade: 62 },
  { time: "12:00", temperatura: 28, umidade: 58 },
  { time: "16:00", temperatura: 30, umidade: 55 },
  { time: "20:00", temperatura: 26, umidade: 60 },
  { time: "24:00", temperatura: 23, umidade: 64 },
];

const zonas = [
  { id: 1, nome: "Sala de Estar", temperatura: 24, desejada: 23, status: "Resfriando", ambiente: "living" },
  { id: 2, nome: "Quarto Master", temperatura: 22, desejada: 22, status: "Ideal", ambiente: "bedroom" },
  { id: 3, nome: "Escritório", temperatura: 26, desejada: 24, status: "Resfriando", ambiente: "office" },
  { id: 4, nome: "Cozinha", temperatura: 25, desejada: 23, status: "Aquecendo", ambiente: "kitchen" },
];

const alertas = [
  { id: 1, tipo: "warning", mensagem: "Filtro do ar-condicionado da sala precisa ser trocado", tempo: "2h atrás" },
  { id: 2, tipo: "info", mensagem: "Temperatura do escritório fora do padrão estabelecido", tempo: "5h atrás" },
];

export default function Climatizacao() {
  const [temperaturaDesejada, setTemperaturaDesejada] = useState([23]);
  const [modoOperacao, setModoOperacao] = useState("auto");
  const [velocidadeVentilador, setVelocidadeVentilador] = useState("media");
  const [sistemaLigado, setSistemaLigado] = useState(true);
  const [graficoTipo, setGraficoTipo] = useState("24h");

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Climatização</h1>
          <p className="text-muted-foreground">Controle inteligente do clima da sua casa</p>
        </div>
        <Button
          onClick={() => setSistemaLigado(!sistemaLigado)}
          variant={sistemaLigado ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Power className="w-4 h-4" />
          {sistemaLigado ? "Sistema Ligado" : "Sistema Desligado"}
        </Button>
      </div>

      {/* Status Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperatura Atual</CardTitle>
            <Thermometer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24°C</div>
            <p className="text-xs text-muted-foreground">Ambiente agradável</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Umidade</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62%</div>
            <p className="text-xs text-muted-foreground">Nível ideal</p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status do Sistema</CardTitle>
            <Wind className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={sistemaLigado ? "default" : "secondary"}>
                {sistemaLigado ? "Ligado" : "Desligado"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Funcionando normalmente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controles */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Controle de Temperatura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Termostato */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Temperatura Desejada</span>
                <span className="text-2xl font-bold">{temperaturaDesejada[0]}°C</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTemperaturaDesejada([Math.max(16, temperaturaDesejada[0] - 1)])}
                  disabled={!sistemaLigado}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <div className="flex-1">
                  <Slider
                    value={temperaturaDesejada}
                    onValueChange={setTemperaturaDesejada}
                    max={30}
                    min={16}
                    step={1}
                    disabled={!sistemaLigado}
                    className="w-full"
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTemperaturaDesejada([Math.min(30, temperaturaDesejada[0] + 1)])}
                  disabled={!sistemaLigado}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Modos de Operação */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Modo de Operação</span>
              <ToggleGroup type="single" value={modoOperacao} onValueChange={(value) => value && setModoOperacao(value)}>
                <ToggleGroupItem value="frio" aria-label="Modo Frio" disabled={!sistemaLigado}>
                  <Snowflake className="w-4 h-4 mr-2" />
                  Frio
                </ToggleGroupItem>
                <ToggleGroupItem value="calor" aria-label="Modo Calor" disabled={!sistemaLigado}>
                  <Flame className="w-4 h-4 mr-2" />
                  Calor
                </ToggleGroupItem>
                <ToggleGroupItem value="auto" aria-label="Modo Automático" disabled={!sistemaLigado}>
                  <Zap className="w-4 h-4 mr-2" />
                  Auto
                </ToggleGroupItem>
                <ToggleGroupItem value="eco" aria-label="Modo Eco" disabled={!sistemaLigado}>
                  <Leaf className="w-4 h-4 mr-2" />
                  Eco
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Separator />

            {/* Velocidade do Ventilador */}
            <div className="space-y-3">
              <span className="text-sm font-medium">Velocidade do Ventilador</span>
              <ToggleGroup type="single" value={velocidadeVentilador} onValueChange={(value) => value && setVelocidadeVentilador(value)}>
                <ToggleGroupItem value="baixa" disabled={!sistemaLigado}>Baixa</ToggleGroupItem>
                <ToggleGroupItem value="media" disabled={!sistemaLigado}>Média</ToggleGroupItem>
                <ToggleGroupItem value="alta" disabled={!sistemaLigado}>Alta</ToggleGroupItem>
                <ToggleGroupItem value="automatica" disabled={!sistemaLigado}>Auto</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico */}
        <Card className="hover-scale">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Histórico de Clima
              </CardTitle>
              <ToggleGroup type="single" value={graficoTipo} onValueChange={(value) => value && setGraficoTipo(value)}>
                <ToggleGroupItem value="24h">24h</ToggleGroupItem>
                <ToggleGroupItem value="7d">7d</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="temperatura" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                <Line type="monotone" dataKey="umidade" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zonas e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zonas */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Zonas / Ambientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {zonas.map((zona) => (
                  <div key={zona.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <div className="font-medium">{zona.nome}</div>
                      <div className="text-sm text-muted-foreground">
                        Atual: {zona.temperatura}°C | Desejada: {zona.desejada}°C
                      </div>
                    </div>
                    <Badge 
                      variant={zona.status === "Ideal" ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {zona.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alertas e Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {alertas.map((alerta) => (
                  <div key={alerta.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${alerta.tipo === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{alerta.mensagem}</p>
                      <p className="text-xs text-muted-foreground">{alerta.tempo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}