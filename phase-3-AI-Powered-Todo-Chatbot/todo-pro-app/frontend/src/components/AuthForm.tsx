"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi, ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const isLogin = mode === "login";
  const title = isLogin ? "Welcome Back" : "Initialize Account";
  const description = isLogin
    ? "Enter your credentials to access your workspace"
    : "Create your unique profile to begin manifesting goals";
  const submitText = isLogin ? "Sign In" : "Get Started";
  const switchText = isLogin ? "New to Todo Pro?" : "Already a member?";
  const switchLink = isLogin ? "/register" : "/login";
  const switchLinkText = isLogin ? "Create account" : "Sign in";

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!isLogin && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        await authApi.login({ email, password });
        toast.success("Welcome back to your workspace!");
      } else {
        await authApi.register({ email, password });
        toast.success("Account initialized successfully!");
      }

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        const detail = error.data?.detail || error.statusText;
        setErrors({ general: detail });
        toast.error(detail);
      } else {
        setErrors({ general: "An unexpected error occurred" });
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="glass shadow-2xl shadow-primary/10 border-white/5">
        <CardHeader className="space-y-4 text-center pb-8 border-b border-white/5">
          <div className="flex justify-center">
            <Logo size={60} className="text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tight">{title}</CardTitle>
            <CardDescription className="text-white/50 text-base">{description}</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-white/70 ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus:ring-primary/50"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-medium ml-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-white/70 ml-1">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-white/5 border-white/10 h-12 text-white placeholder:text-white/20 focus:ring-primary/50"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-destructive font-medium ml-1">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm text-destructive bg-destructive/10 rounded-xl border border-destructive/20 font-medium"
              >
                {errors.general}
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-2 pb-10">
            <Button
              type="submit"
              className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : submitText}
            </Button>

            <p className="text-sm text-center text-white/50">
              {switchText}{" "}
              <a href={switchLink} className="font-bold text-primary hover:text-primary/80 transition-colors">
                {switchLinkText}
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
