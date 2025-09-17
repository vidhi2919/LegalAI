"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Info, FileText, Users } from "lucide-react"

interface DocumentAnalysisProps {
  documentId: string
}

const analysisData = {
  overallRisk: "medium",
  riskScore: 65,
  keyFindings: [
    {
      type: "risk",
      title: "Non-compete clause duration",
      description: "12-month non-compete period may be excessive and potentially unenforceable",
      severity: "high",
      clause: "Section 6: Non-Compete",
      recommendation: "Consider reducing to 6 months or adding geographic limitations",
    },
    {
      type: "risk",
      title: "Broad confidentiality terms",
      description: "Confidentiality clause lacks specific definition of what constitutes confidential information",
      severity: "medium",
      clause: "Section 5: Confidentiality",
      recommendation: "Add specific examples and exclusions for publicly available information",
    },
    {
      type: "right",
      title: "Comprehensive benefits package",
      description: "Employee entitled to participate in all company benefit plans",
      severity: "low",
      clause: "Section 3: Benefits",
      recommendation: "Ensure benefit plan documents are provided for review",
    },
    {
      type: "obligation",
      title: "30-day notice requirement",
      description: "Both parties must provide 30 days written notice for termination",
      severity: "low",
      clause: "Section 4: Termination",
      recommendation: "Standard notice period, no action required",
    },
  ],
  summary: {
    totalClauses: 7,
    riskyClauses: 2,
    favorableClauses: 1,
    standardClauses: 4,
  },
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
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

const getTypeIcon = (type: string) => {
  switch (type) {
    case "risk":
      return <AlertTriangle className="h-4 w-4 text-red-600" />
    case "right":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "obligation":
      return <Info className="h-4 w-4 text-blue-600" />
    default:
      return <FileText className="h-4 w-4 text-gray-600" />
  }
}

export function DocumentAnalysis({ documentId }: DocumentAnalysisProps) {
  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      {/* Risk Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Assessment</CardTitle>
          <CardDescription>Overall document risk analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Score</span>
            <Badge className={getSeverityColor(analysisData.overallRisk)} variant="secondary">
              {analysisData.overallRisk} risk
            </Badge>
          </div>
          <Progress value={analysisData.riskScore} className="h-2" />
          <p className="text-xs text-muted-foreground">{analysisData.riskScore}/100</p>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{analysisData.summary.totalClauses}</div>
              <div className="text-xs text-muted-foreground">Total Clauses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{analysisData.summary.riskyClauses}</div>
              <div className="text-xs text-muted-foreground">Risky Clauses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysisData.summary.favorableClauses}</div>
              <div className="text-xs text-muted-foreground">Favorable</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{analysisData.summary.standardClauses}</div>
              <div className="text-xs text-muted-foreground">Standard</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Findings</CardTitle>
          <CardDescription>Important clauses requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisData.keyFindings.map((finding, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(finding.type)}
                    <h4 className="font-medium text-sm">{finding.title}</h4>
                  </div>
                  <Badge className={getSeverityColor(finding.severity)} variant="secondary">
                    {finding.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{finding.description}</p>
                <div className="text-xs text-primary font-medium">{finding.clause}</div>
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-xs">
                    <span className="font-medium">Recommendation:</span> {finding.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Generate Full Report
        </Button>
        <Button variant="outline" className="w-full bg-transparent" size="sm">
          <Users className="h-4 w-4 mr-2" />
          Share with Team
        </Button>
      </div>
    </div>
  )
}
