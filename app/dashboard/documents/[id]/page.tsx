"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DocumentViewer } from "@/components/documents/document-viewer"
import { DocumentAnalysis } from "@/components/documents/document-analysis"
import { DocumentChat } from "@/components/documents/document-chat"

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"viewer" | "analysis" | "chat">("viewer")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 lg:ml-64">
          <div className="h-[calc(100vh-4rem)] flex">
            {/* Left Panel - Document Viewer */}
            <div className="flex-1 border-r border-border">
              <DocumentViewer documentId={params.id} />
            </div>

            {/* Right Panel - Analysis & Chat */}
            <div className="w-96 flex flex-col">
              {/* Tab Navigation */}
              <div className="border-b border-border bg-card">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("analysis")}
                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "analysis"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "chat"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    AI Chat
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                {activeTab === "analysis" && <DocumentAnalysis documentId={params.id} />}
                {activeTab === "chat" && <DocumentChat documentId={params.id} />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
