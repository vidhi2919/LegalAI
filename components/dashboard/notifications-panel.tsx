"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, CheckCircle, Info, X } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "High Risk Clause Detected",
    message: "Service Agreement contains unusual termination clause",
    time: "5 minutes ago",
    document: "Service Agreement - VendorY",
  },
  {
    id: 2,
    type: "success",
    title: "Document Analysis Complete",
    message: "NDA Agreement analysis finished successfully",
    time: "2 hours ago",
    document: "NDA Agreement - ClientX",
  },
  {
    id: 3,
    type: "info",
    title: "New AI Feature Available",
    message: "Try our new contract comparison tool",
    time: "1 day ago",
    document: null,
  },
  {
    id: 4,
    type: "warning",
    title: "Document Expiring Soon",
    message: "Lease agreement expires in 30 days",
    time: "2 days ago",
    document: "Lease Agreement - Office Space",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "info":
      return <Info className="h-4 w-4 text-blue-600" />
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "warning":
      return "border-l-yellow-500"
    case "success":
      return "border-l-green-500"
    case "info":
      return "border-l-blue-500"
    default:
      return "border-l-gray-500"
  }
}

export function NotificationsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Recent updates and alerts</CardDescription>
        </div>
        <Badge variant="secondary">4</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 bg-muted/30 rounded-r-lg ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    {notification.document && (
                      <p className="text-xs text-primary font-medium">{notification.document}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
