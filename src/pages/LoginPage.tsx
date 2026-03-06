import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary flex-col justify-between p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-2 border-current" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-current" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-current" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ZapCRM</span>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Reach your customers
            <br />
            where they already are.
          </h1>
          <p className="text-lg opacity-80 max-w-md">
            Connect your ERP database to WhatsApp and send targeted campaigns that drive real results.
          </p>
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm opacity-70">Open rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold">45%</p>
              <p className="text-sm opacity-70">Response rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold">3x</p>
              <p className="text-sm opacity-70">More conversions</p>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-sm opacity-60">© 2026 ZapCRM. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-4">
            <div className="w-10 h-10 rounded-xl gradient-whatsapp flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight">ZapCRM</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded border-input" />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Link to="/dashboard">
              <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90 mt-2">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
