"use client";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const demoUsers = [
    { role: "Backer", email: "backer@revivefund.demo", color: "from-emerald-500/20 to-teal-500/20", icon: "💎" },
    { role: "Owner", email: "owner@revivefund.demo", color: "from-blue-500/20 to-indigo-500/20", icon: "🏗️" },
    { role: "Expert", email: "expert@revivefund.demo", color: "from-purple-500/20 to-pink-500/20", icon: "🧠" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />

      <div className="max-w-4xl w-full grid md:grid-cols-5 gap-8 items-stretch relative z-10">
        {/* Info Column */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-8 p-8 glass-panel rounded-3xl border-white/5">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Revive<span className="text-accent underline decoration-accent/30 underline-offset-8">Fund</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation of climate health and green tech startups through community-driven revival.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/80">
              One-Tap Demo Access
            </h2>
            <div className="grid gap-3">
              {demoUsers.map((user) => (
                <button
                  key={user.role}
                  onClick={() => {
                    // This is a demo placeholder, in a real app this would fill the form
                    const input = document.querySelector('input[type="email"]') as HTMLInputElement;
                    const pass = document.querySelector('input[type="password"]') as HTMLInputElement;
                    if (input && pass) {
                      input.value = user.email;
                      pass.value = "demo1234";
                    }
                  }}
                  className={`group flex items-center gap-4 p-3 rounded-2xl border border-white/5 bg-gradient-to-br ${user.color} hover:border-white/10 transition-all text-left w-full hover:scale-[1.02] active:scale-95`}
                >
                  <span className="text-2xl">{user.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-accent transition-colors">{user.role}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/60 text-center italic">
              Pass: demo1234
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-3 glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col">
          <div className="flex bg-white/5 p-1 rounded-2xl mb-8 self-start border border-white/5">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${isLogin ? 'bg-accent text-background shadow-lg shadow-accent/20' : 'text-muted-foreground hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${!isLogin ? 'bg-accent text-background shadow-lg shadow-accent/20' : 'text-muted-foreground hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <div className="flex-1 animate-slide-up">
            {isLogin ? (
              <div key="login" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Welcome Back</h3>
                  <p className="text-sm text-muted-foreground">Log in to manage your ventures or pledges.</p>
                </div>
                <LoginForm />
              </div>
            ) : (
              <div key="register" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Join the Mission</h3>
                  <p className="text-sm text-muted-foreground">Create an account to start supporting climate tech.</p>
                </div>
                <RegisterForm />
              </div>
            )}
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
