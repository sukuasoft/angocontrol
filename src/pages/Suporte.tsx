import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Video,
  ExternalLink,
  Send
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const faqItems = [
  {
    question: "Como conectar um novo dispositivo?",
    answer: "Vá em Dispositivos > Adicionar Dispositivo e siga o assistente de configuração."
  },
  {
    question: "Posso controlar os dispositivos remotamente?",
    answer: "Sim, desde que tenha conexão com internet e os dispositivos estejam online."
  },
  {
    question: "Como criar uma rotina automática?",
    answer: "Acesse Cenas e Rotinas e configure triggers e ações personalizadas."
  },
  {
    question: "O que fazer se um dispositivo ficar offline?",
    answer: "Verifique a conexão Wi-Fi do dispositivo e reinicie se necessário."
  }
]

export default function Suporte() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Suporte</h1>
          <p className="text-muted-foreground">Obtenha ajuda e suporte técnico para o Angocontrol</p>
        </div>
        <Badge variant="outline" className="bg-success text-success-foreground">
          Online 24/7
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canais de Contato */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Chat ao Vivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Fale conosco em tempo real através do chat
              </p>
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Iniciar Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Telefone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                +244 923 456 789
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Seg-Sex: 8h às 18h
              </p>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Ligar Agora
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                suporte@angocontrol.com
              </p>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ e Recursos */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAQ */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Perguntas Frequentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-card-border last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-foreground mb-2">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recursos de Ajuda */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle>Recursos de Ajuda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Documentação</p>
                      <p className="text-xs text-muted-foreground">Guias e manuais</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="flex items-center gap-3">
                    <Video className="w-6 h-6 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">Tutoriais</p>
                      <p className="text-xs text-muted-foreground">Vídeos explicativos</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Contato */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle>Enviar Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Descreva o problema brevemente" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva detalhadamente seu problema ou dúvida"
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <Button className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}