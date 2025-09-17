"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Calendar, Zap, FileText, MessageSquare } from "lucide-react"

export function BillingSettings() {
  const currentPlan = {
    name: "Pro Plan",
    price: "$29",
    period: "month",
    features: ["Unlimited document analysis", "Advanced AI chat", "Priority support", "Team collaboration"],
  }

  const usage = {
    documentsAnalyzed: 24,
    documentsLimit: 100,
    aiConversations: 156,
    aiLimit: 500,
    storageUsed: 2.4,
    storageLimit: 10,
  }

  const invoices = [
    { id: "INV-001", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-003", date: "Oct 1, 2024", amount: "$29.00", status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Current Plan
          </CardTitle>
          <CardDescription>Manage your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{currentPlan.name}</h3>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-2xl font-bold">
                {currentPlan.price}
                <span className="text-sm font-normal text-muted-foreground">/{currentPlan.period}</span>
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Plan Features</h4>
            <ul className="space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your current usage against plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Documents Analyzed</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.documentsAnalyzed} / {usage.documentsLimit}
                </span>
              </div>
              <Progress value={(usage.documentsAnalyzed / usage.documentsLimit) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Conversations</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.aiConversations} / {usage.aiLimit}
                </span>
              </div>
              <Progress value={(usage.aiConversations / usage.aiLimit) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Storage Used</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.storageUsed} GB / {usage.storageLimit} GB
                </span>
              </div>
              <Progress value={(usage.storageUsed / usage.storageLimit) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice, index) => (
              <div key={invoice.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{invoice.status}</Badge>
                    <span className="font-medium">{invoice.amount}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index < invoices.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
