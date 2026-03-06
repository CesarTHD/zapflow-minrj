import { AppLayout } from "@/components/AppLayout";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const contacts = [
  { name: "Maria Silva", phone: "+55 11 98765-4321", city: "São Paulo", lastPurchase: "May 15, 2026", total: "R$ 2,340", tags: ["VIP", "Active"] },
  { name: "João Santos", phone: "+55 21 97654-3210", city: "Rio de Janeiro", lastPurchase: "Apr 20, 2026", total: "R$ 890", tags: ["Active"] },
  { name: "Ana Oliveira", phone: "+55 31 96543-2109", city: "Belo Horizonte", lastPurchase: "Jan 10, 2026", total: "R$ 5,120", tags: ["VIP", "Inactive"] },
  { name: "Carlos Souza", phone: "+55 41 95432-1098", city: "Curitiba", lastPurchase: "Jun 1, 2026", total: "R$ 430", tags: ["New"] },
  { name: "Fernanda Lima", phone: "+55 51 94321-0987", city: "Porto Alegre", lastPurchase: "Mar 8, 2026", total: "R$ 1,780", tags: ["Active"] },
  { name: "Pedro Costa", phone: "+55 71 93210-9876", city: "Salvador", lastPurchase: "Feb 22, 2026", total: "R$ 3,200", tags: ["VIP"] },
  { name: "Juliana Mendes", phone: "+55 61 92109-8765", city: "Brasília", lastPurchase: "May 30, 2026", total: "R$ 670", tags: ["Active"] },
  { name: "Ricardo Almeida", phone: "+55 85 91098-7654", city: "Fortaleza", lastPurchase: "Dec 15, 2025", total: "R$ 1,200", tags: ["Inactive"] },
];

const tagColor: Record<string, string> = {
  VIP: "bg-primary/10 text-primary",
  Active: "bg-accent/10 text-accent",
  Inactive: "bg-destructive/10 text-destructive",
  New: "bg-warning/10 text-warning",
};

const ContactsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contacts</h1>
            <p className="text-muted-foreground">Customers imported from your ERP database.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-sm bg-muted rounded-lg px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">City</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Last Purchase</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Total Purchases</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Tags</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.phone} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4 text-muted-foreground font-mono text-xs">{c.phone}</td>
                    <td className="p-4">{c.city}</td>
                    <td className="p-4">{c.lastPurchase}</td>
                    <td className="p-4 font-medium">{c.total}</td>
                    <td className="p-4">
                      <div className="flex gap-1.5">
                        {c.tags.map((tag) => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColor[tag] || "bg-muted text-muted-foreground"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 8 of 3,241 contacts</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactsPage;
