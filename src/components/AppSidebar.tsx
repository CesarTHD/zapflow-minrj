import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Filter,
  Send,
  Zap,
  History,
  Settings,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navItems = [
  // { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  // { title: "Contacts", icon: Users, path: "/contacts" },
  // { title: "Segmentation", icon: Filter, path: "/segmentation" },
  { title: "Campaigns", icon: Send, path: "/campaigns" },
  // { title: "Automations", icon: Zap, path: "/automations" },
  { title: "History", icon: History, path: "/history" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg gradient-whatsapp flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-4 h-4 text-accent-foreground" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">
            ZapCRM
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
