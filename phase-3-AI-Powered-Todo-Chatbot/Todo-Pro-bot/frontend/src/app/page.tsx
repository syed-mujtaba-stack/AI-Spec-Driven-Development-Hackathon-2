/**
 * Home page - Dynamic entry point for the Todo application.
 * Shows ChatGPT-style chat if authenticated, landing page if not.
 */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatLayout } from "@/components/chat/ChatLayout";
import {
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");

    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);



  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  // Authenticated - Show ChatGPT-style Chat Interface
  if (isAuthenticated) {
    return (
      <div className="h-screen">
        <ChatLayout />
      </div>
    );
  }

  // Not authenticated - Show Landing Page
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Logo size={40} />
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Todo Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-primary/5">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container relative mx-auto px-4 sm:px-8 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Powered by Gemini Flash</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Manifest Your Goals with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-indigo-500">
              Agent
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            Experience the next generation of task management. Just talk to your assistant,
            and let AI handle the organization while you focus on what matters.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
            <Link href="/register">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all gap-2 group">
                Try it for Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-2">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating UI Preview Decorative */}
        <div className="mt-20 relative max-w-5xl mx-auto animate-in zoom-in-95 fade-in duration-1000 delay-700">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-20" />
          <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent" />
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-4 text-muted-foreground/30">
                <Logo size={80} />
                <span className="font-medium">Intelligent Task Interface</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-8 mt-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-card border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Logo size={24} />
            <span className="text-sm font-semibold tracking-tight">Todo Pro</span>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Crafted with excellence for productivity.
            </p>
            <p className="text-xs text-muted-foreground/70">
              Developed by <span className="text-primary font-semibold">Syed Mujtaba Abbas</span>
            </p>
          </div>
          <div className="flex gap-4">
            {["Twitter", "GitHub", "Discord"].map((platform) => (
              <Link key={platform} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {platform}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Natural Language",
    description: "Input tasks naturally. 'Remind me to call John at 5 PM' is all you need to say.",
    icon: Zap,
  },
  {
    title: "Secure & Built-in",
    description: "Your productivity is private. Industry-leading encryption keeps your tasks safe.",
    icon: Shield,
  },
  {
    title: "Gemini Intelligence",
    description: "Leverage Google's latest models for task suggestions and intelligent organization.",
    icon: Sparkles,
  },
];

import { Sparkles } from "lucide-react";
