import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface FilterRow {
  id: number;
  field: string;
  condition: string;
  value: string;
}

const fieldOptions = [
  // { label: "Aniversário", value: "birthday" },
  { label: "Última Compra", value: "last_purchase" },
  { label: "Total de Compras", value: "total_purchases" },
  { label: "Cidade", value: "city" },
];

const conditionOptions: Record<string, { label: string; value: string }[]> = {
  birthday: [
    { label: "é hoje", value: "today" },
    { label: "nos próximos 3 dias", value: "next3" },
    { label: "este mês", value: "month" },
  ],

  last_purchase: [
    { label: "mais de", value: "gt" },
    { label: "menos de", value: "lt" },
    { label: "exatamente", value: "eq" },
  ],

  total_purchases: [
    { label: "maior que", value: "gt" },
    { label: "menor que", value: "lt" },
    { label: "igual a", value: "eq" },
  ],

  city: [
    { label: "igual a", value: "eq" },
    { label: "diferente de", value: "neq" },
  ],
};

interface Props {
  filters: FilterRow[];
  setFilters: (filters: FilterRow[]) => void;
}

export const SegmentationBuilder = ({ filters, setFilters }: Props) => {

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: Date.now(),
        field: "",
        condition: "",
        value: "",
      },
    ]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const updateField = (id: number, field: string) => {

    const firstCondition = conditionOptions[field]?.[0]?.value || "";

    setFilters(
      filters.map((f) =>
        f.id === id
          ? { ...f, field, condition: firstCondition, value: "" }
          : f
      )
    );
  };

  const updateCondition = (id: number, condition: string) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, condition } : f)));
  };

  const updateValue = (id: number, value: string) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  return (
    <div className="space-y-3">
      {filters.map((filter, index) => {

        const field = fieldOptions.find((f) => f.value === filter.field);
        const conditions = conditionOptions[filter.field] || [];

        return (
          <div key={filter.id} className="flex items-center gap-3 flex-wrap">

            {index > 0 && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                E
              </span>
            )}

            <Select
              value={filter.field}
              onValueChange={(v) => updateField(filter.id, v)}
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  {field?.label}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {fieldOptions.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filter.condition}
              onValueChange={(v) => updateCondition(filter.id, v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {conditions.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {filter.field !== "birthday" && (
              <>
                <Input
                  value={filter.value}
                  onChange={(e) => updateValue(filter.id, e.target.value)}
                  placeholder="Valor..."
                  className="w-40"
                />
                {(filter.field === "last_purchase") && <span>dias</span>}
                {filter.field === "total_purchases" && <span>compras</span>}
              </>
            )}

            <button
              onClick={() => removeFilter(filter.id)}
              className="p-2 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </button>

          </div>
        );
      })}

      <button
        onClick={addFilter}
        className="mt-2 flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <Plus className="w-4 h-4" /> Adicionar filtro
      </button>
    </div>
  );
};