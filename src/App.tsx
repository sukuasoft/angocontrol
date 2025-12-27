import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Dispositivos from "./pages/Dispositivos";
import Monitoramento from "./pages/Monitoramento";
import Configuracoes from "./pages/Configuracoes";
import Suporte from "./pages/Suporte";
import Seguranca from "./pages/Seguranca";
import Consumo from "./pages/Consumo";
import Climatizacao from "./pages/Climatizacao";
import Integracoes from "./pages/Integracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dispositivos" element={<Dispositivos />} />
            <Route path="/monitoramento" element={<Monitoramento />} />
            <Route path="/consumo" element={<Consumo />} />
            <Route path="/seguranca" element={<Seguranca />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/climatizacao" element={<Climatizacao />} />
            <Route path="/integracoes" element={<Integracoes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
