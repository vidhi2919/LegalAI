"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, Smartphone, AlertTriangle } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    documentAnalysisComplete: true,
    highRiskDetected: true,
    weeklyDigest: true,
    productUpdates: false,
    marketingEmails: false,

    // Push Notifications
    pushDocumentComplete: true,
    pushHighRisk: true,
    pushChatMessages: false,

    // In-App Notifications
    inAppRiskAlerts: true,
    inAppProcessingUpdates: true,
    inAppChatNotifications: true,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Choose what email notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Document Analysis Complete</Label>
                <p className="text-sm text-muted-foreground">Get notified when AI analysis finishes</p>
              </div>
              <Switch
                checked={notifications.documentAnalysisComplete}
                onCheckedChange={(value) => handleNotificationChange("documentAnalysisComplete", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  High Risk Detected
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </Label>
                <p className="text-sm text-muted-foreground">Immediate alerts for high-risk clauses</p>
              </div>
              <Switch
                checked={notifications.highRiskDetected}
                onCheckedChange={(value) => handleNotificationChange("highRiskDetected", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Summary of your document activity</p>
              </div>
              <Switch
                checked={notifications.weeklyDigest}
                onCheckedChange={(value) => handleNotificationChange("weeklyDigest", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Product Updates</Label>
                <p className="text-sm text-muted-foreground">New features and improvements</p>
              </div>
              <Switch
                checked={notifications.productUpdates}
                onCheckedChange={(value) => handleNotificationChange("productUpdates", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Tips, best practices, and promotional content</p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(value) => handleNotificationChange("marketingEmails", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>Manage notifications sent to your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Document Processing Complete</Label>
                <p className="text-sm text-muted-foreground">Push notification when analysis finishes</p>
              </div>
              <Switch
                checked={notifications.pushDocumentComplete}
                onCheckedChange={(value) => handleNotificationChange("pushDocumentComplete", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>High Risk Alerts</Label>
                <p className="text-sm text-muted-foreground">Immediate push alerts for critical issues</p>
              </div>
              <Switch
                checked={notifications.pushHighRisk}
                onCheckedChange={(value) => handleNotificationChange("pushHighRisk", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>AI Chat Messages</Label>
                <p className="text-sm text-muted-foreground">Notifications for AI assistant responses</p>
              </div>
              <Switch
                checked={notifications.pushChatMessages}
                onCheckedChange={(value) => handleNotificationChange("pushChatMessages", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            In-App Notifications
          </CardTitle>
          <CardDescription>Control notifications shown within the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Risk Alerts</Label>
                <p className="text-sm text-muted-foreground">Show risk notifications in the app</p>
              </div>
              <Switch
                checked={notifications.inAppRiskAlerts}
                onCheckedChange={(value) => handleNotificationChange("inAppRiskAlerts", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Processing Updates</Label>
                <p className="text-sm text-muted-foreground">Show document processing status updates</p>
              </div>
              <Switch
                checked={notifications.inAppProcessingUpdates}
                onCheckedChange={(value) => handleNotificationChange("inAppProcessingUpdates", value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Chat Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications for AI chat responses</p>
              </div>
              <Switch
                checked={notifications.inAppChatNotifications}
                onCheckedChange={(value) => handleNotificationChange("inAppChatNotifications", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
