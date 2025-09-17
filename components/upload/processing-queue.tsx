"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, FileText, Pause, Play, X } from "lucide-react"

const processingQueue = [
  {
    id: 1,
    name: "Employment Contract - TechCorp.pdf",
    status: "analyzing",
    progress: 75,
    estimatedTime: "2 minutes",
    stage: "Extracting key clauses",
  },
  {
    id: 2,
    name: "Service Agreement - VendorY.docx",
    status: "queued",
    progress: 0,
    estimatedTime: "5 minutes",
    stage: "Waiting in queue",
  },
  {
    id: 3,
    name: "Partnership Agreement - CompanyZ.pdf",
    status: "paused",
    progress: 45,
    estimatedTime: "3 minutes",
    stage: "Analysis paused",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "analyzing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "queued":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "paused":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function ProcessingQueue() {
  if (processingQueue.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Processing Queue
        </CardTitle>
        <CardDescription>Documents currently being analyzed by AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {processingQueue.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-primary" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(item.status)} variant="secondary">
                      {item.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {item.status === "paused" ? (
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      ) : item.status === "analyzing" ? (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.stage}</span>
                    <span>ETA: {item.estimatedTime}</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
