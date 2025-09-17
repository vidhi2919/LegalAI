"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Shield, Bell, Settings, CreditCard, HelpCircle } from "lucide-react"

interface SettingsNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: "profile", name: "Profile", icon: User },
  { id: "security", name: "Security", icon: Shield },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "preferences", name: "Preferences", icon: Settings },
  { id: "billing", name: "Billing", icon: CreditCard },
]

export function SettingsNavigation({ activeTab, onTabChange }: SettingsNavigationProps) {
  return (
    <Card>
      <CardContent className="p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          ))}
          <div className="pt-2 mt-2 border-t border-border">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="mr-3 h-4 w-4" />
              Help & Support
            </Button>
          </div>
        </nav>
      </CardContent>
    </Card>
  )
}
