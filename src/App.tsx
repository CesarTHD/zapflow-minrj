import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactsPage from "./pages/ContactsPage";
import SegmentationPage from "./pages/SegmentationPage";
import CampaignPage from "./pages/CampaignPage";
import AutomationsPage from "./pages/AutomationsPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
       <AuthProvider>
        <Routes>
           <Route path="/login" element={<LoginPage />} />
           <Route path="/" element={<Navigate to="/dashboard" />} />
           <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
           <Route path="/contacts" element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
           <Route path="/segmentation" element={<ProtectedRoute><SegmentationPage /></ProtectedRoute>} />
           <Route path="/campaigns" element={<ProtectedRoute><CampaignPage /></ProtectedRoute>} />
           <Route path="/automations" element={<ProtectedRoute><AutomationsPage /></ProtectedRoute>} />
           <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
           <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
       </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
