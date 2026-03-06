import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterRow {
  id: number;
  field: string;
  condition: string;
  value: string;
}

const fieldOptions = [
  "Birthday",
  "Last Purchase",
  "Total Purchases",
  "Product Purchased",
  "City",
  "Inactive Days",
];

const conditionOptions: Record<string, string[]> = {
  Birthday: ["is today", "next 3 days", "this month", "next 7 days"],
  "Last Purchase": ["more than", "less than", "exactly"],
  "Total Purchases": ["greater than", "less than", "equals"],
  "Product Purchased": ["equals", "contains"],
  City: ["equals", "not equals"],
  "Inactive Days": ["more than", "less than"],
};

const SegmentationPage = () => {
  const [filters, setFilters] = useState<FilterRow[]>([
    { id: 1, field: "Last Purchase", condition: "more than", value: "60 days" },
  ]);

  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), field: "Birthday", condition: "is today", value: "" }]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const updateFilter = (id: number, key: keyof FilterRow, value: string) => {
    setFilters(filters.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const estimatedCount = 347 + filters.length * 12;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold">Create Customer Segment</h1>
          <p className="text-muted-foreground">Filter your ERP customers to create targeted segments.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Segment Name</label>
            <Input placeholder="e.g., Inactive customers 60+ days" className="max-w-md" />
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-3">Filters</h3>
            <div className="space-y-3">
              {filters.map((filter, index) => (
                <div key={filter.id} className="flex items-center gap-3 flex-wrap">
                  {index > 0 && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">AND</span>
                  )}
                  <Select value={filter.field} onValueChange={(v) => updateFilter(filter.id, "field", v)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldOptions.map((f) => (
                        <SelectItem key={f} value={f}>{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filter.condition} onValueChange={(v) => updateFilter(filter.id, "condition", v)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(conditionOptions[filter.field] || ["equals"]).map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    value={filter.value}
                    onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                    placeholder="Value..."
                    className="w-40"
                  />

                  <button
                    onClick={() => removeFilter(filter.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addFilter}
              className="mt-3 flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Plus className="w-4 h-4" /> Add filter
            </button>
          </div>
        </div>

        {/* Estimated */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{estimatedCount}</p>
              <p className="text-sm text-muted-foreground">Estimated customers in this segment</p>
            </div>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90">
            Save Segment
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SegmentationPage;
