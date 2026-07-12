import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check, ChevronRight, Key, Loader, MessageSquare, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getSegments } from "@/functions/getSegments";

const CampaignPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState<any>();
  const [message, setMessage] = useState(
    "Olá {{NOME}}! 👋\n\nNotamos que já faz um tempo desde sua última visita. \n\nVolte e aproveite 15% de desconto na sua próxima compra. Válido somente esta semana!\n\nAté breve! 🎉"
  );
  const [variables, setVariables] = useState([]);
  const [codeSeller, setCodeSeller] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [clients, setClients] = useState([]);

  const loadSegmentData = async () => {
    if (!selectedSegment.id) {
      console.log("Nenhum segmento definido");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_URL_API}/segments/preview-by-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ segment_id: selectedSegment.id })
      });
      
      if (!res.ok) {
        throw new Error("Erro ao buscar preview do segmento");
      }
      
      
      const data = await res.json();
      
      const keys = Object.keys(data.data[0])
      .filter(col => col !== "CODIGO_CADASTRO_GERAL" && col !== "TEL_CELULAR")
      .map(col => `{{${col}}}`);
      

      setVariables((prev) => {
        const unique = new Set([...prev, ...keys]);
        return [...unique];
      });


      setClients(data.data);

      setStep(2);
      
    } catch (error) {
      console.error("Error loading segment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendCampaign = async () => {
    try {
      setError('');
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_URL_API}/campaigns/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          company_id: import.meta.env.VITE_COMPANY_ID,
          name: campaignName,
          segment_id: selectedSegment.id,
          instance: codeSeller,
          message,
          contacts: clients
          // contacts: [
          //   {
          //     NOME: "César",
          //     CIDADE: "Rio de Janeiro",
          //     TEL_CELULAR: "5561998374202"
          //   }
          // ]
        })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        navigate("/history");
      }
    } catch (error) {
      console.error('asd', error);
      setError(error.error);
    } finally {
      setLoading(false);
    }
  };

  const previewMessage = message
    .replace("{{NOME}}", "Maria")
    .replace("{{ULTIMA_COMPRA}}", "15 de Abril, 2026")
    .replace("{{CIDADE}}", "São Paulo")
    .replace("{{TOTAL_COMPRAS}}", "3")
    .replace("{{TOTAL_PECAS}}", "5")
    .replace("{{VALOR_COMPRAS}}", "R$ 630,10");

  useEffect(() => {
    getSegments(setLoading).then(res => {
      setSegments(res.data);
    });
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Criar Campanha</h1>
          <p className="text-muted-foreground">Envie mensagens de whatsapp para seus clientes</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {[
            { num: 1, label: "Selecionar Segmento" },
            { num: 2, label: "Escrever Mensagem" },
            { num: 3, label: "Confirmar e Enviar" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === s.num
                  ? "gradient-primary text-primary-foreground"
                  : step > s.num
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : <span>{s.num}</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* Step 1 */}

        {step === 1 && (
          <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4 max-w-3xl">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Nome da campanha:</h3>
              <div className="flex items-center gap-2 bg-muted rounded-xl border border-border px-3 py-2 focus-within:ring-2 ">
                <div className="w-96">
                  <input
                    type="text"
                    disabled={loading}
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Ex: [CUPOM 10% DESCONTO] [INATIVOS 90 DIAS]"
                    className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-sm font-semibold pt-4">Selecionar Segmento de Clientes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loading ?
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
                :
                !segments ? <p className="text-red-600">Não foram encotrados segmentos.</p> : segments.map((seg) => (
                  <button
                    key={seg.name}
                    onClick={() => setSelectedSegment(seg)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${selectedSegment === seg
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{seg.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {seg.count} contatos • Loja {seg.loja}
                        </p>
                      </div>
                    </div>
                    {selectedSegment === seg && (
                      <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                disabled={!selectedSegment || !campaignName || loading}
                onClick={loadSegmentData}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                Próximo <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Publico estimado:</h3>
                <p className="text-sm m-0 p-0 text-gray-500 font-light"><span>{clients.length}</span> clientes</p>
              </div>
              <h3 className="text-sm font-semibold">Escreva sua mensagem:</h3>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Inserir variável:</p>
                <div className="flex flex-wrap gap-2">
                  {variables.map((v) => (
                    <button
                      key={v}
                      onClick={() => setMessage(message + " " + v)}
                      className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-mono hover:bg-primary/20 transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>Voltar</Button>
                <Button onClick={() => setStep(3)} className="gradient-primary text-primary-foreground hover:opacity-90">
                  Próximo <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* WhatsApp Preview */}
            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <h3 className="text-sm font-semibold mb-4">Visualização:</h3>
              <div className="bg-[#e5ddd5] rounded-xl p-4 max-w-sm mx-auto">
                <div className="bg-accent text-accent-foreground rounded-t-xl px-4 py-3 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold">Maria</p>
                    <p className="text-xs opacity-80">online</p>
                  </div>
                </div>
                <div className="bg-[#efeae2] p-4 rounded-b-xl min-h-[200px]">
                  <div className="bg-card rounded-lg p-3 shadow-sm max-w-[85%] ml-auto">
                    <p className="text-sm whitespace-pre-line">{previewMessage}</p>
                    <p className="text-[10px] text-muted-foreground text-right mt-1">10:30 AM ✓✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-6 max-w-2xl">
            <h3 className="text-sm font-semibold">Resumo da Campanha</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground">Segment</p>
                <p className="font-semibold mt-1">{selectedSegment}</p>
              </div> */}
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground">Estimativa de Contatos</p>
                <p className="font-semibold mt-1">{clients.length || 0} contatos</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground">Estimativa de Tempo</p>
                <p className="font-semibold mt-1">~{Math.ceil((clients?.length || 0) / 30)} min</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground">Channel</p>
                <p className="font-semibold mt-1 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-accent" /> WhatsApp
                </p>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-xl">
              <p className="text-xs text-muted-foreground mb-2">Pré-visualização de Mensagem</p>
              <p className="text-sm whitespace-pre-line">{previewMessage}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Código do vendedor</h3>

              <div className="flex items-center gap-2 bg-muted rounded-xl border border-border px-3 py-2 focus-within:ring-2 focus-within:ring-accent">
                <Key className="w-4 h-4 text-muted-foreground" />
                <div className="w-96">
                  <input
                    type="text"
                    disabled={loading}
                    value={codeSeller}
                    onChange={(e) => setCodeSeller(e.target.value)}
                    placeholder="Digite o código..."
                    className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-2 items-center">
              <Button disabled={loading} variant="outline" onClick={() => setStep(2)}>Voltar</Button>
              <Button disabled={loading} onClick={sendCampaign} className="gradient-whatsapp w-44 text-accent-foreground hover:opacity-90 flex items-center gap-2">
                {loading ? (
                  <Loader className="w-4 h-4" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Enviar Campanha
                  </>
                )}
              </Button>
              {error && (<p className="text-sm text-red-500">{error}! Tente novamente.</p>)}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CampaignPage;
