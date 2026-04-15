import { AppLayout } from "@/components/AppLayout";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/functions/getCampaigns";
import { Skeleton } from "@/components/ui/skeleton";

const campaigns = [
  { name: "Promoção de aniversário - Junho", segment: "Aniversários de Junho", sent: 342, delivered: 338, responses: 89, date: "11/03/2026", status: "Enviando" },
  { name: "Recuperar Inativos", segment: "Inativo 60+ dias", sent: 1205, delivered: 1180, responses: 245, date: "07/02/2026", status: "Completa" },
  { name: "Nova Coleção", segment: "Todos os Usuários", sent: 4200, delivered: 4100, responses: 890, date: "13/01/2026", status: "Completa" },
  { name: "Especial Dia das Mães", segment: "Clientes Mulheres", sent: 1890, delivered: 1850, responses: 420, date: "01/12/2025", status: "Completa" },
  { name: "Fim de semana de promoção relâmpago", segment: "Clientes VIPs", sent: 156, delivered: 155, responses: 78, date: "06/09/2025", status: "Falhou" },
  { name: "Cupom", segment: "Total > R$1000", sent: 890, delivered: 875, responses: 312, date: "27/07/2025", status: "Completa" },
];

const statusColor: Record<string, string> = {
  Completa: "bg-accent/10 text-accent",
  Enviando: "bg-primary/10 text-primary",
  Falhou: "bg-destructive/10 text-destructive",
};



const HistoryPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCampaigns(setLoading).then(res => {
      setCampaigns(res.data);
    });
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Histórico de Campanhas</h1>
          <p className="text-muted-foreground">Veja todas as campanhas anteriores e seu desempenho.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 max-w-sm bg-muted rounded-lg px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Pesquisar campanhas..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Campanha</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Segmento</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Enviadas</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Sucesso</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Erro</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {loading ?
                  <>
                    <tr>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                      <td className="p-2">
                        <Skeleton className="h-8 w-full" />
                      </td>
                    </tr>
                  </>
                  : campaigns.map((c) => (
                    <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{c.segment}</span>
                      </td>
                      <td className="p-4">{c.sent_count}</td>
                    <td className="p-4">{c.success_count}</td>
                    <td className="p-4">{c.error_count}</td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(c.created_at).toLocaleString("pt-BR")}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
                      </td>
                      <td className="p-4">
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HistoryPage;
