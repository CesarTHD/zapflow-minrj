import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Cake, Clock, Plus, ArrowRight, Zap, Filter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutomationFlow {
  id: number;
  name: string;
  trigger: string;
  triggerIcon: typeof Cake;
  condition?: string;
  action: string;
  active: boolean;
}

const automations: AutomationFlow[] = [
  { id: 1, name: "Birthday Greeting", trigger: "Customer birthday", triggerIcon: Cake, action: "Send birthday message with coupon", active: true },
  { id: 2, name: "Win-back Campaign", trigger: "Inactive for 60 days", triggerIcon: Clock, condition: "Total purchases > R$ 500", action: "Send win-back message", active: true },
  { id: 3, name: "Welcome Message", trigger: "New customer added", triggerIcon: Zap, action: "Send welcome WhatsApp", active: false },
];

const AutomationsPage = () => {
  const [flows] = useState(automations);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Automations</h1>
            <p className="text-muted-foreground">Create automated WhatsApp flows triggered by events.</p>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90 flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Automation
          </Button>
        </div>

        <div className="space-y-4">
          {flows.map((flow) => (
            <div key={flow.id} className="bg-card rounded-xl shadow-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{flow.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${flow.active ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    {flow.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={flow.active} className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>

              {/* Flow visualization */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border-2 border-primary/20">
                  <flow.triggerIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Trigger</p>
                    <p className="text-sm font-medium">{flow.trigger}</p>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground" />

                {flow.condition && (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-warning/10 border-2 border-warning/20">
                      <Filter className="w-5 h-5 text-warning" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-warning font-semibold">Condition</p>
                        <p className="text-sm font-medium">{flow.condition}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </>
                )}

                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent/10 border-2 border-accent/20">
                  <Send className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-accent font-semibold">Action</p>
                    <p className="text-sm font-medium">{flow.action}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AutomationsPage;
