"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, FileText, MessageSquare, Shield, ArrowRight, CheckCircle, Users, Zap } from "lucide-react"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <Scale className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">LegalAI Assistant</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Enhanced hero content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  AI-Powered Legal Analysis
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                  Simplify Legal Documents with
                  <span className="text-secondary"> AI</span>
                </h2>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Transform complex legal language into clear, understandable text. Upload contracts, get AI-powered
                  analysis, and chat with your documents in seconds.
                </p>
              </div>

              {/* Enhanced features with better icons and layout */}
              <div className="grid gap-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Smart Document Analysis</h3>
                    <p className="text-muted-foreground">
                      Color-coded highlights for risks, rights, and obligations with instant insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">AI Chat Assistant</h3>
                    <p className="text-muted-foreground">
                      Ask questions about your contracts in natural language and get instant answers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise Security</h3>
                    <p className="text-muted-foreground">
                      Bank-level encryption and privacy protection for your sensitive documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA section */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-blue-500" />
                  Trusted by 10,000+ legal professionals
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Start Your Free Trial"}</CardTitle>
                  <CardDescription className="text-base">
                    {isLogin
                      ? "Sign in to access your legal document workspace"
                      : "Join thousands of legal professionals using AI to simplify contracts"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLogin ? <LoginForm /> : <SignupForm />}

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {isLogin ? "Don't have an account? Sign up free" : "Already have an account? Sign in"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/30 -mx-4 px-4 rounded-3xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to understand legal documents
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes complex legal language accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Upload & Analyze</h4>
              <p className="text-muted-foreground">
                Simply upload your legal documents and get instant AI-powered analysis with risk assessments
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Ask Questions</h4>
              <p className="text-muted-foreground">
                Chat with your documents using natural language to understand clauses, obligations, and rights
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Stay Protected</h4>
              <p className="text-muted-foreground">
                Enterprise-grade security ensures your sensitive legal documents remain private and secure
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
