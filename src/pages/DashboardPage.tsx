import { AppLayout } from "@/components/AppLayout";
import { Send, Users, Megaphone, DollarSign, Plus, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Link } from "react-router-dom";

const stats = [
  { title: "Messages Sent", value: "12,847", change: "+12%", icon: Send, color: "bg-primary/10 text-primary" },
  { title: "Customers Reached", value: "3,241", change: "+8%", icon: Users, color: "bg-accent/10 text-accent" },
  { title: "Campaigns Created", value: "24", change: "+3", icon: Megaphone, color: "bg-warning/10 text-warning" },
  { title: "Revenue Recovered", value: "R$ 48,320", change: "+22%", icon: DollarSign, color: "bg-success/10 text-success" },
];

const chartData = [
  { name: "Jan", sent: 1200, delivered: 1150 },
  { name: "Feb", sent: 1800, delivered: 1720 },
  { name: "Mar", sent: 2400, delivered: 2300 },
  { name: "Apr", sent: 2100, delivered: 2000 },
  { name: "May", sent: 3200, delivered: 3100 },
  { name: "Jun", sent: 2847, delivered: 2750 },
];

const responseData = [
  { name: "Jan", rate: 32 },
  { name: "Feb", rate: 38 },
  { name: "Mar", rate: 42 },
  { name: "Apr", rate: 39 },
  { name: "May", rate: 48 },
  { name: "Jun", rate: 45 },
];

const recentCampaigns = [
  { name: "Birthday Promo - June", segment: "June Birthdays", sent: 342, delivered: 338, responses: 89, date: "Jun 1, 2026" },
  { name: "Win-back Inactive", segment: "Inactive 60+ days", sent: 1205, delivered: 1180, responses: 245, date: "May 28, 2026" },
  { name: "New Collection Launch", segment: "All Customers", sent: 4200, delivered: 4100, responses: 890, date: "May 20, 2026" },
];

const DashboardPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>
          <Link to="/campaigns">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-whatsapp text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              Create Campaign
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-accent flex items-center gap-0.5">
                  {stat.change} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-2xl font-bold mt-3">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold mb-4">Messages Overview</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Bar dataKey="sent" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivered" fill="hsl(142, 64%, 42%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold mb-4">Response Rate (%)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={{ fill: "hsl(217, 91%, 50%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Campaigns</h3>
            <Link to="/history" className="text-xs text-primary hover:underline">View all</Link>
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
                </tr>
              </thead>
              <tbody>
                {recentCampaigns.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{c.segment}</span>
                    </td>
                    <td className="p-4">{c.sent.toLocaleString()}</td>
                    <td className="p-4">{c.delivered.toLocaleString()}</td>
                    <td className="p-4">{c.responses}</td>
                    <td className="p-4 text-muted-foreground">{c.date}</td>
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

export default DashboardPage;
