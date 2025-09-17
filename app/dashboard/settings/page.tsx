"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SettingsNavigation } from "@/components/settings/settings-navigation"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PreferencesSettings } from "@/components/settings/preferences-settings"
import { BillingSettings } from "@/components/settings/billing-settings"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const renderSettingsContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <SecuritySettings />
      case "notifications":
        return <NotificationSettings />
      case "preferences":
        return <PreferencesSettings />
      case "billing":
        return <BillingSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {/* Settings Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>

              <div className="flex gap-6">
                {/* Settings Navigation */}
                <div className="w-64 flex-shrink-0">
                  <SettingsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Settings Content */}
                <div className="flex-1">{renderSettingsContent()}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
