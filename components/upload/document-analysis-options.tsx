"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { FileText, AlertTriangle, MessageSquare, ArrowLeft, Send } from "lucide-react"

interface DocumentAnalysisOptionsProps {
  document: any
  onBack: () => void
}

export function DocumentAnalysisOptions({ document, onBack }: DocumentAnalysisOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  const handleOptionSelect = async (option: string) => {
    setSelectedOption(option)
    setIsLoading(true)

    // Simulate AI analysis
    setTimeout(() => {
      let result = ""
      switch (option) {
        case "summary":
          result =
            "This contract is a standard employment agreement between ABC Corp and John Doe. Key terms include: 2-year employment period, $75,000 annual salary, standard benefits package, 30-day notice period for termination, and non-compete clause for 6 months post-employment. The agreement includes intellectual property assignment and confidentiality provisions."
          break
        case "stress":
          result =
            "Main stress points identified: 1) Non-compete clause extends 6 months post-employment which may limit future opportunities. 2) Intellectual property clause assigns all work-related inventions to company. 3) Termination clause allows company to terminate with 30-day notice without cause. 4) Overtime compensation not clearly defined for exempt employees."
          break
        default:
          result = "Analysis complete. Please ask your specific question about the document."
      }
      setAnalysisResult(result)
      setIsLoading(false)
    }, 2000)
  }

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return

    setSelectedOption("question")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setAnalysisResult(
        `Based on your question: "${question}", here's what I found in the document: The employment agreement does include provisions for remote work arrangements, subject to manager approval and company policy compliance. Remote work days are limited to 2 days per week maximum.`,
      )
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Document Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-lg">Document Uploaded Successfully</CardTitle>
                <CardDescription>
                  {document?.name || "Employment_Agreement.pdf"} • {document?.size || "2.4 MB"} • PDF
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Ready for Analysis
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Analysis Options */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedOption === "summary" ? "ring-2 ring-primary" : ""}`}
          onClick={() => handleOptionSelect("summary")}
        >
          <CardHeader className="text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Document Summary</CardTitle>
            <CardDescription>
              Get a comprehensive overview of the document's key points and main content
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedOption === "stress" ? "ring-2 ring-primary" : ""}`}
          onClick={() => handleOptionSelect("stress")}
        >
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Main Stress Points</CardTitle>
            <CardDescription>
              Identify potential risks, concerns, and important clauses that need attention
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`${selectedOption === "question" ? "ring-2 ring-primary" : ""}`}>
          <CardHeader className="text-center">
            <MessageSquare className="h-12 w-12 text-blue-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Ask Any Question</CardTitle>
            <CardDescription>Ask specific questions about the document content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="What would you like to know about this document?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[80px]"
            />
            <Button onClick={handleQuestionSubmit} disabled={!question.trim() || isLoading} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Ask Question
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Result */}
      {(isLoading || analysisResult) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {selectedOption === "summary" && <FileText className="h-5 w-5" />}
              {selectedOption === "stress" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
              {selectedOption === "question" && <MessageSquare className="h-5 w-5 text-blue-500" />}
              <span>
                {selectedOption === "summary" && "Document Summary"}
                {selectedOption === "stress" && "Stress Points Analysis"}
                {selectedOption === "question" && "AI Response"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Analyzing document...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed">{analysisResult}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Back Button */}
      <div className="flex justify-start">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Upload Another Document
        </Button>
      </div>
    </div>
  )
}
