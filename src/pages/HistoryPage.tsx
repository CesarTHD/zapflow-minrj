import { AppLayout } from "@/components/AppLayout";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const campaigns = [
  { name: "Birthday Promo - June", segment: "June Birthdays", sent: 342, delivered: 338, responses: 89, date: "Jun 1, 2026", status: "Completed" },
  { name: "Win-back Inactive", segment: "Inactive 60+ days", sent: 1205, delivered: 1180, responses: 245, date: "May 28, 2026", status: "Completed" },
  { name: "New Collection Launch", segment: "All Customers", sent: 4200, delivered: 4100, responses: 890, date: "May 20, 2026", status: "Completed" },
  { name: "Mother's Day Special", segment: "Female Customers", sent: 1890, delivered: 1850, responses: 420, date: "May 10, 2026", status: "Completed" },
  { name: "Flash Sale Weekend", segment: "VIP Customers", sent: 156, delivered: 155, responses: 78, date: "May 5, 2026", status: "Completed" },
  { name: "Loyalty Rewards", segment: "Total > R$1000", sent: 890, delivered: 875, responses: 312, date: "Apr 28, 2026", status: "Completed" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-accent/10 text-accent",
  Sending: "bg-primary/10 text-primary",
  Failed: "bg-destructive/10 text-destructive",
};

const HistoryPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Campaign History</h1>
          <p className="text-muted-foreground">View all past campaigns and their performance.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 max-w-sm bg-muted rounded-lg px-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search campaigns..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Segment</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Sent</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Delivered</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Responses</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{c.segment}</span>
                    </td>
                    <td className="p-4">{c.sent.toLocaleString()}</td>
                    <td className="p-4">{c.delivered.toLocaleString()}</td>
                    <td className="p-4">{c.responses}</td>
                    <td className="p-4 text-muted-foreground">{c.date}</td>
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
