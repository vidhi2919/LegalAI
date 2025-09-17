"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ZoomIn, ZoomOut, RotateCw, Share } from "lucide-react"

interface DocumentViewerProps {
  documentId: string
}

// Mock document data
const mockDocument = {
  id: "1",
  name: "Employment Contract - TechCorp.pdf",
  content: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on December 15, 2024, between TechCorp Inc., a Delaware corporation ("Company"), and John Doe ("Employee").

1. POSITION AND DUTIES
Employee shall serve as Senior Software Engineer and shall perform such duties as are customarily associated with such position.

2. COMPENSATION
Company shall pay Employee a base salary of $120,000 per year, payable in accordance with Company's standard payroll practices.

3. BENEFITS
Employee shall be entitled to participate in all employee benefit plans maintained by Company for its employees.

4. TERMINATION
This Agreement may be terminated by either party with thirty (30) days written notice.

5. CONFIDENTIALITY
Employee acknowledges that during employment, Employee may have access to confidential information belonging to Company.

6. NON-COMPETE
Employee agrees that during employment and for a period of twelve (12) months after termination, Employee will not engage in any business that competes with Company.

7. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware.`,
  highlights: [
    { type: "risk", text: "twelve (12) months after termination", position: { start: 1250, end: 1285 } },
    { type: "right", text: "participate in all employee benefit plans", position: { start: 580, end: 620 } },
    { type: "obligation", text: "thirty (30) days written notice", position: { start: 750, end: 780 } },
  ],
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)

  const highlightText = (text: string) => {
    let highlightedText = text

    // Apply highlights (in reverse order to maintain positions)
    mockDocument.highlights
      .sort((a, b) => b.position.start - a.position.start)
      .forEach((highlight) => {
        const before = highlightedText.slice(0, highlight.position.start)
        const highlighted = highlightedText.slice(highlight.position.start, highlight.position.end)
        const after = highlightedText.slice(highlight.position.end)

        const colorClass =
          highlight.type === "risk"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            : highlight.type === "right"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"

        highlightedText = before + `<mark class="${colorClass} px-1 rounded">${highlighted}</mark>` + after
      })

    return highlightedText
  }

  return (
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">{mockDocument.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">2.4 MB</Badge>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Analysis Complete
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Document Controls */}
      <div className="border-b border-border bg-muted/30 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-200 rounded"></div>
              <span>Risks</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Rights</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Obligations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8" style={{ fontSize: `${zoom}%` }}>
          <div
            className="prose prose-sm max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightText(mockDocument.content).replace(/\n/g, "<br/>") }}
          />
        </div>
      </div>
    </div>
  )
}
