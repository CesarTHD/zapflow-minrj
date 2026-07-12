import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { Loader2Icon, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SegmentationBuilder } from "@/components/SegmentationBuilder";
import { getSegments } from "@/functions/getSegments";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSegmentCount } from "@/functions/getSegmentationCount";
import { createSegment } from "@/functions/createSegment";
import { removeSegment } from "@/functions/removeSegment";

interface FilterRow {
  id: number;
  field: string;
  condition: string;
  value: string;
}

const SegmentationPage = () => {
  const [filters, setFilters] = useState<FilterRow[]>([]);
  const [estimatedCount, setEstimatedCount] = useState(0);
  const [segmentName, setSegmentData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadSegments, setLoadSegments] = useState(true);
  const [segments, setSegments] = useState([]);
  const [loja, setLoja] = useState("01");

  const lojaOptions = [
    { value: "01", label: "01 - Loja Gávea" },
    { value: "08", label: "08 - Loja Ipanema" },
  ];

  useEffect(() => {
    if (!filters.length) return;

    setLoading(true);

    getSegmentCount(filters, loja)
      .then((data) => {
        setEstimatedCount(data[0]?.COUNT ?? 0);
      })
      .catch((err) => {
        console.error(err);
        setEstimatedCount(0);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const saveFilters = async () => {
    setLoading(true);

    const payload = {
      name: segmentName,
      description: "",
      company_id: import.meta.env.VITE_COMPANY_ID,
      // created_by: "c51cc764-885e-46ce-b228-6e32ce4a8047",
      loja,
      filters
    }

    try {
      await createSegment(payload);

      setLoadSegments(true);
      setFilters([]);
      setSegmentData("");
      setEstimatedCount(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSegment = async (id) => {
    setLoading(true);

    try {
      const res = await removeSegment(id);

      if (res.status === 500) {
        alert("Não é possível excluir um segmento que já foi vinculado a uma campanha.");
        return;
      }

      setLoadSegments(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar segmento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadSegments) return;
    getSegments(setLoading).then(res => {
      setSegments(res.data);
      setLoadSegments(false);
    });
  }, [loadSegments]);


  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold">Novo Segmento de Clientes</h1>
          <p className="text-muted-foreground">Filtre seus clientes de ERP para criar segmentos direcionados.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do Segmento</label>
            <Input value={segmentName} onChange={(e) => setSegmentData(e.target.value)} placeholder="ex.: Clientes inativos 60+ dias" className="max-w-md" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Loja</label>

            <Select
              value={loja}
              onValueChange={(v) => setLoja(v)}
            >
              <SelectTrigger className="w-64">
                <SelectValue>
                  {lojaOptions.find((l) => l.value === loja)?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {lojaOptions.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-3">Filtros</h3>
            <SegmentationBuilder filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              {loading ? (<Loader2Icon className="animate-spin w-7 h-7 text-accent " />) : (<p className="text-2xl font-bold">{estimatedCount}</p>)}
              <p className="text-sm text-muted-foreground">Clientes estimados neste segmento</p>
            </div>
          </div>
          <Button onClick={saveFilters} disabled={!segmentName || !filters.length || loading} className="gradient-primary text-primary-foreground hover:opacity-90">
            Salvar Segmento
          </Button>
        </div>
        <h3 className="text-2xl font-bold">Seus segmentos de clientes</h3>
        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {
              loading ?
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
                :
                !segments ? <p className="text-red-600">Não foram encotrados segmentos.</p> : segments.map((seg) => (
                  <div
                    key={seg.name}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left border-border relative`}
                  >
                    <button onClick={() => deleteSegment(seg.id)} disabled={loading} className="absolute right-5">
                      <Trash2 className="w-4 h-4 text-red-700 text-muted-foreground hover:text-red-500 transition-colors disabled:text-red-200" />
                    </button>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{seg.name}</p>
                        <p className="text-xs text-muted-foreground">{seg.count} contacts</p>
                      </div>
                    </div>
                    {/* {selectedSegment === seg.name && (
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )} */}
                  </div>
                ))}
          </div>
        </div>
      </div>

    </AppLayout>
  );
}

export default SegmentationPage;
