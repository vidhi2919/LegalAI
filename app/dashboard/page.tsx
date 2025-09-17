"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome back, John</h1>
              <p className="text-muted-foreground">Here's what's happening with your legal documents today.</p>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Overview & Recent Documents */}
              <div className="lg:col-span-2 space-y-6">
                <DashboardOverview />
                <RecentDocuments />
              </div>

              {/* Right Column - Notifications */}
              <div className="space-y-6">
                <NotificationsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
