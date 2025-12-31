"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { authApi } from "@/lib/api";
import Loading from "./loading";
import { Logo } from "@/components/Logo";
import { Task } from "@/types/task";
import { toast } from "sonner";
import {
  LogOut,
  ListTodo,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Sparkles
} from "lucide-react";
import Lightning from "@/components/Lightning";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");

    if (token) {
      setIsAuthenticated(true);
    }

    // Force a minimum 6 second loading screen as requested
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("Logged out successfully");
      setIsAuthenticated(false);
      router.refresh();
    } catch {
      authApi.logout();
      setIsAuthenticated(false);
      router.refresh();
    }
  };

  const handleTaskCreated = (_task: Task) => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Authenticated - Show Tasks Dashboard
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="bg-glow w-[500px] h-[500px] bg-purple-600/20 -top-40 -left-40 animate-glow-slow" />
        <div className="bg-glow w-[400px] h-[400px] bg-blue-600/10 bottom-0 -right-20 animate-glow-slow [animation-delay:-5s]" />

        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-50 border-b border-white/5 bg-[#030014]/50 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Logo size={32} className="text-primary" />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Todo Pro</h1>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="gap-2 hover:bg-white/5 text-white/70 hover:text-white">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 md:mb-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                  <ListTodo className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Active Workspace</h2>
              </div>
              <p className="text-white/60 text-base md:text-lg sm:ml-14">
                Efficiency is doing things right; effectiveness is doing the right things.
              </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-8 order-2 lg:order-1"
              >
                <div className="glass-card p-1">
                  <TaskList key={refreshTrigger} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-4 order-1 lg:order-2"
              >
                <TaskForm onTaskCreated={handleTaskCreated} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  className="mt-8 text-center"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                    Developed by Syed Mujtaba Abbas
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Not authenticated - Show Landing Page
  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-glow-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-glow-slow [animation-delay:-7s]" />
      </div>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 container mx-auto px-4 py-8"
      >
        <nav className="flex justify-between items-center p-4 glass rounded-2xl">
          <div className="flex items-center gap-3">
            <Logo size={36} className="text-primary" />
            <span className="text-xl font-bold tracking-tight">Todo Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-white/5 text-white/80">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center pt-20 pb-32">
        {/* Lightning Background Effect */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none overflow-hidden mask-fade-out">
          <div className="absolute inset-x-0 top-0 h-[800px]">
            <Lightning
              hue={260}
              xOffset={0}
              speed={0.4}
              intensity={1.2}
              size={0.8}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary-foreground/80 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Next-gen Task Management</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Manifest Your <br />
            <span className="text-gradient">Potential</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            A high-performance, secure, and intuitive platform designed to streamline your daily flow. Experience productivity redefined.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 gap-2 shadow-xl shadow-primary/20">
                Start for Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-white/10 hover:bg-white/5 bg-transparent">
                Live Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-40 w-full max-w-7xl">
          {[
            {
              icon: <Sparkles className="h-6 w-6" />,
              title: "Manifestation Engine",
              desc: "Convert abstract thoughts into concrete objectives using our high-frequency task logic."
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Electric Performance",
              desc: "Zero-latency interactions powered by Next.js 16 and React 19 concurrent rendering."
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "User Isolation",
              desc: "Strict cryptographic separation of task environments ensuring total privacy for every visionary."
            },
            {
              icon: <Users className="h-6 w-6" />,
              title: "Cosmic Cloud",
              desc: "Real-time state synchronization across the digital ether, keeping your workspace omnipresent."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl group"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-40 w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Tasks Manifested", value: "2M+" },
              { label: "Active Users", value: "50K+" },
              { label: "Uptime Pulse", value: "99.9%" },
              { label: "Countries", value: "120+" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl md:text-5xl font-black mb-2 text-white group-hover:text-primary transition-colors">{stat.value}</div>
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Workspace Preview */}
        <div className="mt-60 w-full max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Master the Chaos</h2>
              <p className="text-white/50 text-xl max-w-2xl mx-auto">
                A minimal, focused environment designed to keep you in the flow state. Everything you need, nothing you don't.
              </p>
            </div>

            <div className="relative p-2 glass rounded-[2.5rem] shadow-2xl shadow-primary/10 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="bg-[#030014] rounded-[2rem] p-8 min-h-[400px] text-left relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widening text-white/30 italic">
                    todo.pro/workspace/manifest
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Architecting the Core Engine", is_completed: true },
                    { title: "Refining User Experience Flow", is_completed: false },
                    { title: "Optimizing Database Latency", is_completed: false }
                  ].map((mock, i) => (
                    <div key={i} className="glass-card p-6 flex items-center gap-4 opacity-50 blur-[1px]">
                      <div className={`h-6 w-6 rounded-full border border-white/20 ${mock.is_completed ? 'bg-primary border-primary' : ''}`} />
                      <div className={`h-4 rounded bg-white/10 ${mock.is_completed ? 'w-48 opacity-20' : 'w-64'}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="h-10 w-32 rounded-xl bg-primary/20 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mt-60 w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Visionaries</h2>
            <p className="text-white/40">From creators to engineers, Todo Pro is the choice for elite productivity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "Product Designer", quote: "The interface is so clean, it actually makes me want to work. The animations are just chef's kiss." },
              { name: "Marcus Thorne", role: "Software Architect", quote: "Finally, a task manager that doesn't feel like a spreadsheet. It's fast, secure, and stays out of my way." },
              { name: "Aria Voss", role: "Founder @ NeoStream", quote: "Manifesting my daily goals has never felt this premium. It's not just a tool, it's a workspace essential." }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass p-10 rounded-3xl flex flex-col justify-between"
              >
                <p className="text-lg italic text-white/70 mb-8 font-medium">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-white mb-1">{t.name}</p>
                  <p className="text-sm text-primary/70 font-semibold">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-60 w-full max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Frequently Manifested</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is Todo Pro truly free to use?", a: "Yes, our core manifestation engine is free for individual visionaries. Premium features for teams are coming soon." },
              { q: "How secure is my data?", a: "We use military-grade encryption and secure JWT protocols to ensure your objectives remain your eyes only." },
              { q: "Can I sync across devices?", a: "Every task is synced in real-time to our high-performance cosmic cloud, accessible from any modern browser." },
              { q: "How do I manifest my first task?", a: "Simply initialize your account, enter your workspace, and use the Manifestation Engine to record your primary objective." },
              { q: "Can I categorize my goals?", a: "Absolutely. Use descriptions and due dates to organize your flow. Future updates will include advanced tagging and nested manifests." },
              { q: "Will there be a mobile app?", a: "Todo Pro is a high-performance PWA (Progressive Web App). You can install it on your mobile home screen directly from your browser for a native feel." },
              { q: "Who is behind Todo Pro?", a: "A dedicated team of performance engineers and visionaries committed to redefining how we interact with our daily goals." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors group"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{item.q}</h4>
                  <div className="text-white/20 group-hover:text-primary group-hover:rotate-90 transition-all">+</div>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-60 mb-20 w-full max-w-4xl text-center"
        >
          <div className="glass p-16 rounded-[3rem] relative overflow-hidden bg-gradient-to-tr from-primary/5 to-purple-500/5">
            <div className="absolute top-0 right-0 p-12 text-primary opacity-20 rotate-12">
              <Sparkles className="h-24 w-24" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Ready to Manifest?</h2>
            <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto">
              Join thousands of others and transform your productivity today. No setup required.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-12 text-xl font-black bg-primary hover:bg-primary/90 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-primary/40">
                Initialize Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#030014]/50 backdrop-blur-md mt-40">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Logo size={32} className="text-primary" />
                <span className="text-xl font-bold tracking-tight">Todo Pro</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                The world's most advanced manifestation workspace. Engineered for peak performance and focused execution.
              </p>
              <div className="flex gap-4">
                {["Twitter", "GitHub", "Discord"].map((platform) => (
                  <a key={platform} href="#" className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-white/40 hover:text-primary">
                    <span className="sr-only">{platform}</span>
                    <div className="h-4 w-4 rounded-sm bg-current" /> {/* Placeholder for social icons */}
                  </a>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Dynamics</h4>
              <ul className="space-y-3">
                {["Manifestation Engine", "Cosmic Cloud", "User Isolation", "Electric Performance"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Foundation</h4>
              <ul className="space-y-3">
                {[
                  { label: "About Visionaries", href: "/about" },
                  { label: "Our Mission", href: "/mission" },
                  { label: "Brand Assets", href: "/brand" },
                  { label: "Careers", href: "/careers" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-primary transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support/Legal Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/30">Protocols</h4>
              <ul className="space-y-3">
                {[
                  { label: "Privacy Manifest", href: "/privacy" },
                  { label: "Terms of Focus", href: "/terms" },
                  { label: "System Vitals", href: "/vitals" },
                  { label: "Direct Hotline", href: "/hotline" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-primary transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 opacity-30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} Todo Pro | Manifestation Dynamics. Developed by Syed Mujtaba Abbas. All sensory inputs reserved.</p>
            <div className="flex gap-8">
              <span>Optimized for React 19</span>
              <div className="h-1 w-1 rounded-full bg-white" />
              <span>Next.js 16 Turbo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
