"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { GlobalChatInterface } from "@/components/chat/global-chat-interface"
import { ChatHistory } from "@/components/chat/chat-history"
import { DocumentSelector } from "@/components/chat/document-selector"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 lg:ml-64">
          <div className="h-[calc(100vh-4rem)] flex">
            {/* Left Panel - Chat History & Document Selector */}
            <div className="w-80 border-r border-border flex flex-col">
              <DocumentSelector selectedDocuments={selectedDocuments} onSelectionChange={setSelectedDocuments} />
              <ChatHistory />
            </div>

            {/* Right Panel - Chat Interface */}
            <div className="flex-1">
              <GlobalChatInterface selectedDocuments={selectedDocuments} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
