"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DocumentUploader } from "@/components/upload/document-uploader"
import { DocumentAnalysisOptions } from "@/components/upload/document-analysis-options"

export default function UploadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [documentUploaded, setDocumentUploaded] = useState(false)
  const [uploadedDocument, setUploadedDocument] = useState<any>(null)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Upload Documents</h1>
              <p className="text-muted-foreground">
                Upload your legal documents for AI-powered analysis and simplification
              </p>
            </div>

            {!documentUploaded ? (
              <DocumentUploader
                onUploadComplete={(document) => {
                  setUploadedDocument(document)
                  setDocumentUploaded(true)
                }}
              />
            ) : (
              <DocumentAnalysisOptions document={uploadedDocument} onBack={() => setDocumentUploaded(false)} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
