"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Eye, MessageSquare, ExternalLink } from "lucide-react"

interface SearchResultsProps {
  query: string
  filters: any
}

const mockResults = [
  {
    id: "1",
    document: "Employment Contract - TechCorp.pdf",
    section: "Section 6: Non-Compete",
    content:
      "Employee agrees that during employment and for a period of twelve (12) months after termination, Employee will not engage in any business that competes with Company...",
    riskLevel: "high",
    relevanceScore: 95,
    highlights: ["twelve (12) months", "termination", "competes with Company"],
  },
  {
    id: "2",
    document: "Service Agreement - VendorY.pdf",
    section: "Section 4: Termination",
    content:
      "Either party may terminate this Agreement with sixty (60) days written notice. Upon termination, all obligations shall cease except for payment obligations...",
    riskLevel: "medium",
    relevanceScore: 88,
    highlights: ["terminate", "sixty (60) days", "written notice"],
  },
  {
    id: "3",
    document: "NDA Agreement - ClientX.docx",
    section: "Section 2: Confidential Information",
    content:
      "Confidential Information means any and all non-public information disclosed by Company to Recipient, including but not limited to technical data, trade secrets...",
    riskLevel: "low",
    relevanceScore: 76,
    highlights: ["Confidential Information", "non-public information", "trade secrets"],
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

export function SearchResults({ query, filters }: SearchResultsProps) {
  if (!query) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Start Your Search</h3>
          <p className="text-muted-foreground">
            Enter search terms above to find specific clauses, terms, or content across your documents
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Results</CardTitle>
        <p className="text-sm text-muted-foreground">
          Found {mockResults.length} results for "{query}"
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockResults.map((result) => (
            <div key={result.id} className="border border-border rounded-lg p-4 space-y-3">
              {/* Result Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{result.document}</h4>
                    <p className="text-xs text-muted-foreground">{result.section}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {result.relevanceScore}% match
                  </Badge>
                  <Badge className={`${getRiskColor(result.riskLevel)} text-xs`} variant="secondary">
                    {result.riskLevel} risk
                  </Badge>
                </div>
              </div>

              {/* Content Preview */}
              <div className="bg-muted/30 rounded p-3">
                <p className="text-sm leading-relaxed">
                  {result.content.split(new RegExp(`(${result.highlights.join("|")})`, "gi")).map((part, index) => {
                    const isHighlight = result.highlights.some(
                      (highlight) => highlight.toLowerCase() === part.toLowerCase(),
                    )
                    return isHighlight ? (
                      <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
                        {part}
                      </mark>
                    ) : (
                      part
                    )
                  })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to Section
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
