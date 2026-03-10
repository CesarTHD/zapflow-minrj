import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Check, ChevronRight, MessageSquare, Send, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SegmentationBuilder, FilterRow } from "@/components/SegmentationBuilder";

const segments = [
  { name: "Inactive 60+ days", count: 347 },
  { name: "June Birthdays", count: 89 },
  { name: "VIP Customers", count: 156 },
  { name: "São Paulo Region", count: 1203 },
  { name: "Last purchase < 30 days", count: 542 },
];

const variables = ["{{name}}", "{{last_purchase}}", "{{birthday}}", "{{city}}", "{{total_purchases}}"];

const CampaignPage = () => {
  const [step, setStep] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [message, setMessage] = useState(
    "Olá {{name}}! 👋\n\nNotamos que já faz um tempo desde sua última visita. Sentimos sua falta!\n\nVolte e aproveite 15% de desconto na sua próxima compra. Válido somente esta semana!\n\nAté breve! 🎉"
  );

  const [filters, setFilters] = useState<FilterRow[]>([
    // { id: 1, field: "last_purchase", condition: "gt", value: "10" },
  ]);

const loadSegmentData = async () => {
  if (!filters.length) {
    console.log("Nenhum filtro definido");
    return;
  }

  console.log("Filters:", filters);


  try {
    const res = await fetch("http://localhost:3333/segments/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters })
    });

    if (!res.ok) {
      throw new Error("Erro ao buscar preview do segmento");
    }

    const data = await res.json();
    console.log("Segment data:", data);

    setStep(2); // avançar para próximo step

  } catch (error) {
    console.error("Error loading segment data:", error);
  }
};

  const segmentData = segments.find((s) => s.name === selectedSegment);

  const previewMessage = message
    .replace("{{name}}", "Maria")
    .replace("{{last_purchase}}", "May 15, 2026")
    .replace("{{birthday}}", "Jun 12")
    .replace("{{city}}", "São Paulo")
    .replace("{{total_purchases}}", "R$ 2,340");

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
          <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-6">
            <h3 className="text-sm font-semibold">Faça um segmento de cliente</h3>

            <SegmentationBuilder filters={filters} setFilters={setFilters} />

            <div className="flex justify-end pt-2">
              <Button
                onClick={loadSegmentData}
                disabled={(!filters.length || filters[0].condition === "" || filters[0].field === "" || filters[0].value === "")}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* {step === 1 && (
          <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
            <h3 className="text-sm font-semibold">Select a customer segment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {segments.map((seg) => (
                <button
                  key={seg.name}
                  onClick={() => setSelectedSegment(seg.name)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${selectedSegment === seg.name
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{seg.name}</p>
                      <p className="text-xs text-muted-foreground">{seg.count} contacts</p>
                    </div>
                  </div>
                  {selectedSegment === seg.name && (
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <Button
                disabled={!selectedSegment}
                onClick={() => setStep(2)}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )} */}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
              <h3 className="text-sm font-semibold">Write your message</h3>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Insert variable:</p>
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
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="gradient-primary text-primary-foreground hover:opacity-90">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* WhatsApp Preview */}
            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <h3 className="text-sm font-semibold mb-4">Preview</h3>
              <div className="bg-[#e5ddd5] rounded-xl p-4 max-w-sm mx-auto">
                <div className="bg-accent text-accent-foreground rounded-t-xl px-4 py-3 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold">{variables[0]}</p>
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
                <p className="font-semibold mt-1">{segmentData?.count || 0} contatos</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-xs text-muted-foreground">Estimativa de Tempo</p>
                <p className="font-semibold mt-1">~{Math.ceil((segmentData?.count || 0) / 60)} min</p>
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
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button className="gradient-whatsapp text-accent-foreground hover:opacity-90 flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Campaign
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CampaignPage;
