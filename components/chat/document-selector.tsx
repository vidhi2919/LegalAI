"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  riskLevel: "low" | "medium" | "high"
  status: "completed" | "processing"
}

interface DocumentSelectorProps {
  selectedDocuments: string[]
  onSelectionChange: (selected: string[]) => void
}

const availableDocuments: Document[] = [
  {
    id: "1",
    name: "Employment Contract - TechCorp",
    type: "PDF",
    riskLevel: "medium",
    status: "completed",
  },
  {
    id: "2",
    name: "NDA Agreement - ClientX",
    type: "DOCX",
    riskLevel: "low",
    status: "completed",
  },
  {
    id: "3",
    name: "Service Agreement - VendorY",
    type: "PDF",
    riskLevel: "high",
    status: "completed",
  },
  {
    id: "4",
    name: "Lease Agreement - Office Space",
    type: "PDF",
    riskLevel: "medium",
    status: "completed",
  },
  {
    id: "5",
    name: "Software License Agreement",
    type: "PDF",
    riskLevel: "high",
    status: "completed",
  },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function DocumentSelector({ selectedDocuments, onSelectionChange }: DocumentSelectorProps) {
  const handleDocumentToggle = (documentId: string) => {
    const newSelection = selectedDocuments.includes(documentId)
      ? selectedDocuments.filter((id) => id !== documentId)
      : [...selectedDocuments, documentId]

    onSelectionChange(newSelection)
  }

  const selectAll = () => {
    onSelectionChange(availableDocuments.map((doc) => doc.id))
  }

  const clearAll = () => {
    onSelectionChange([])
  }

  return (
    <Card className="border-b border-border rounded-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Select Documents</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs h-6">
              All
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6">
              None
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Choose documents for AI analysis ({selectedDocuments.length} selected)
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {availableDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
            onClick={() => handleDocumentToggle(doc.id)}
          >
            <Checkbox
              checked={selectedDocuments.includes(doc.id)}
              onChange={() => handleDocumentToggle(doc.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium truncate">{doc.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {doc.type}
                </Badge>
                <Badge className={`${getRiskColor(doc.riskLevel)} text-xs`} variant="secondary">
                  {doc.riskLevel}
                </Badge>
                {doc.status === "completed" && <CheckCircle className="h-3 w-3 text-green-600" />}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
