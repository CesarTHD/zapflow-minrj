import { AppLayout } from "@/components/AppLayout";
import { Database, MessageSquare, Users, Settings as SettingsIcon, ExternalLink, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your integrations and preferences.</p>
        </div>

        {/* ERP Integration */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">ERP Integration</h3>
              <p className="text-sm text-muted-foreground">Firebird database connection</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Host</Label>
              <Input defaultValue="192.168.1.100" />
            </div>
            <div className="space-y-2">
              <Label>Port</Label>
              <Input defaultValue="3050" />
            </div>
            <div className="space-y-2">
              <Label>Database Path</Label>
              <Input defaultValue="/data/ERP_DATA.FDB" />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input defaultValue="SYSDBA" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="gradient-primary text-primary-foreground hover:opacity-90">Test Connection</Button>
            <span className="flex items-center gap-1 text-sm text-accent">
              <Check className="w-4 h-4" /> Connected
            </span>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">WhatsApp Connection</h3>
              <p className="text-sm text-muted-foreground">Connect your WhatsApp Business instance</p>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">+55 11 91234-5678</p>
              <p className="text-xs text-muted-foreground">WhatsApp Business API</p>
            </div>
            <span className="flex items-center gap-1 text-sm text-accent">
              <Check className="w-4 h-4" /> Connected
            </span>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Manage Instance
          </Button>
        </div>

        {/* Team */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Team Members</h3>
              <p className="text-sm text-muted-foreground">Manage access to your account</p>
            </div>
          </div>
          {[
            { name: "John Doe", email: "john@company.com", role: "Admin" },
            { name: "Ana Silva", email: "ana@company.com", role: "Editor" },
            { name: "Carlos Souza", email: "carlos@company.com", role: "Viewer" },
          ].map((m) => (
            <div key={m.email} className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                  {m.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-card">{m.role}</span>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Invite Member
          </Button>
        </div>

        {/* General */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">General Settings</h3>
              <p className="text-sm text-muted-foreground">Company and account preferences</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="My Company LTDA" />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input defaultValue="America/Sao_Paulo" />
            </div>
          </div>
          <Button className="gradient-primary text-primary-foreground hover:opacity-90">Save Changes</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
