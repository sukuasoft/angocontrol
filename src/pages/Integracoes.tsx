import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Plus, 
  Wifi, 
  WifiOff, 
  TestTube,
  Zap,
  Clock,
  Home,
  Smartphone,
  Tv,
  Lightbulb,
  Thermometer,
  Camera,
  Shield,
  Volume2,
  Activity,
  Settings,
  Trash2
} from "lucide-react";

const dispositivos = [
  { 
    id: 1, 
    nome: "Alexa Echo Dot", 
    tipo: "smart_speaker", 
    status: "online", 
    ambiente: "Sala", 
    icon: Volume2,
    conectado: "2023-01-15"
  },
  { 
    id: 2, 
    nome: "Philips Hue Bridge", 
    tipo: "lighting", 
    status: "online", 
    ambiente: "Toda Casa", 
    icon: Lightbulb,
    conectado: "2023-02-20"
  },
  { 
    id: 3, 
    nome: "Samsung Smart TV", 
    tipo: "entertainment", 
    status: "offline", 
    ambiente: "Sala", 
    icon: Tv,
    conectado: "2023-03-10"
  },
  { 
    id: 4, 
    nome: "Nest Thermostat", 
    tipo: "climate", 
    status: "online", 
    ambiente: "Corredor", 
    icon: Thermometer,
    conectado: "2023-01-05"
  },
  { 
    id: 5, 
    nome: "Ring Doorbell", 
    tipo: "security", 
    status: "online", 
    ambiente: "Entrada", 
    icon: Camera,
    conectado: "2023-04-12"
  },
];

const automacoes = [
  {
    id: 1,
    nome: "Climatização Inteligente",
    condicao: "Temperatura > 28°C",
    acao: "Ligar ar-condicionado",
    ativo: true,
    execucoes: 45
  },
  {
    id: 2,
    nome: "Segurança Noturna",
    condicao: "Horário: 22:00",
    acao: "Ativar alarme + Trancar portas",
    ativo: true,
    execucoes: 30
  },
  {
    id: 3,
    nome: "Economia de Energia",
    condicao: "Ninguém em casa",
    acao: "Desligar todas as luzes",
    ativo: false,
    execucoes: 12
  },
];

const eventos = [
  { id: 1, data: "2024-01-09 14:30", acao: "Ar-condicionado ligado automaticamente", dispositivo: "Nest Thermostat" },
  { id: 2, data: "2024-01-09 12:15", acao: "Luzes da sala desligadas", dispositivo: "Philips Hue" },
  { id: 3, data: "2024-01-09 08:00", acao: "Alarme desativado", dispositivo: "Ring Doorbell" },
  { id: 4, data: "2024-01-08 22:00", acao: "Modo noturno ativado", dispositivo: "Sistema" },
  { id: 5, data: "2024-01-08 18:45", acao: "TV ligada via comando de voz", dispositivo: "Alexa Echo" },
];

export default function Integracoes() {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoVisualizacao, setTipoVisualizacao] = useState("todos");
  const [novoDispositivo, setNovoDispositivo] = useState({
    nome: "",
    tipo: "",
    ambiente: "",
  });

  const getIconForType = (tipo: string) => {
    const icons = {
      smart_speaker: Volume2,
      lighting: Lightbulb,
      entertainment: Tv,
      climate: Thermometer,
      security: Camera,
      default: Smartphone
    };
    return icons[tipo as keyof typeof icons] || icons.default;
  };

  const dispositivosFiltrados = tipoVisualizacao === "todos" 
    ? dispositivos 
    : dispositivos.filter(d => d.tipo === tipoVisualizacao);

  const testarDispositivo = (id: number) => {
    console.log(`Testando dispositivo ${id}`);
    // Aqui implementaria a lógica de teste
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrações</h1>
          <p className="text-muted-foreground">Gerencie dispositivos conectados e automações</p>
        </div>
        
        <Dialog open={modalAberto} onOpenChange={setModalAberto}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Adicionar Dispositivo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome do Dispositivo</Label>
                <Input 
                  id="nome"
                  value={novoDispositivo.nome}
                  onChange={(e) => setNovoDispositivo({...novoDispositivo, nome: e.target.value})}
                  placeholder="Ex: Lâmpada Quarto"
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select onValueChange={(value) => setNovoDispositivo({...novoDispositivo, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lighting">Iluminação</SelectItem>
                    <SelectItem value="climate">Climatização</SelectItem>
                    <SelectItem value="security">Segurança</SelectItem>
                    <SelectItem value="entertainment">Entretenimento</SelectItem>
                    <SelectItem value="smart_speaker">Alto-falante Inteligente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ambiente">Ambiente</Label>
                <Select onValueChange={(value) => setNovoDispositivo({...novoDispositivo, ambiente: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ambiente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sala">Sala</SelectItem>
                    <SelectItem value="quarto">Quarto</SelectItem>
                    <SelectItem value="cozinha">Cozinha</SelectItem>
                    <SelectItem value="banheiro">Banheiro</SelectItem>
                    <SelectItem value="escritorio">Escritório</SelectItem>
                    <SelectItem value="garagem">Garagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setModalAberto(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={() => setModalAberto(false)} className="flex-1">
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ToggleGroup type="single" value={tipoVisualizacao} onValueChange={(value) => value && setTipoVisualizacao(value)}>
            <ToggleGroupItem value="todos">Todos</ToggleGroupItem>
            <ToggleGroupItem value="lighting">Iluminação</ToggleGroupItem>
            <ToggleGroupItem value="climate">Clima</ToggleGroupItem>
            <ToggleGroupItem value="security">Segurança</ToggleGroupItem>
            <ToggleGroupItem value="entertainment">Entretenimento</ToggleGroupItem>
            <ToggleGroupItem value="smart_speaker">Alto-falantes</ToggleGroupItem>
          </ToggleGroup>
        </CardContent>
      </Card>

      {/* Lista de Dispositivos */}
      <Card className="hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Dispositivos Integrados ({dispositivosFiltrados.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {dispositivosFiltrados.map((dispositivo) => {
                const IconComponent = getIconForType(dispositivo.tipo);
                return (
                  <div key={dispositivo.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-medium">{dispositivo.nome}</div>
                        <div className="text-sm text-muted-foreground">
                          {dispositivo.ambiente} • Conectado em {dispositivo.conectado}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={dispositivo.status === "online" ? "default" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {dispositivo.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        {dispositivo.status === "online" ? "Online" : "Offline"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testarDispositivo(dispositivo.id)}
                        className="flex items-center gap-1"
                      >
                        <TestTube className="w-3 h-3" />
                        Testar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automações */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Automações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {automacoes.map((automacao) => (
                  <div key={automacao.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{automacao.nome}</div>
                      <Badge variant={automacao.ativo ? "default" : "secondary"}>
                        {automacao.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div><span className="font-medium">Se:</span> {automacao.condicao}</div>
                      <div><span className="font-medium">Então:</span> {automacao.acao}</div>
                      <div><span className="font-medium">Execuções:</span> {automacao.execucoes}x</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Histórico de Eventos */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Histórico de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {eventos.map((evento) => (
                  <div key={evento.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Clock className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div className="flex-1 space-y-1">
                      <div className="text-sm">{evento.acao}</div>
                      <div className="text-xs text-muted-foreground">
                        {evento.dispositivo} • {evento.data}
                      </div>
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