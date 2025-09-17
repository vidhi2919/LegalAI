"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Download, Eye, MessageSquare, MoreHorizontal, Calendar } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const uploadHistory = [
  {
    id: 1,
    name: "NDA Agreement - ClientX.docx",
    uploadedAt: "Today, 2:30 PM",
    size: "1.8 MB",
    status: "completed",
    riskLevel: "low",
    analysisTime: "3m 45s",
    keyFindings: 3,
  },
  {
    id: 2,
    name: "Lease Agreement - Office Space.pdf",
    uploadedAt: "Yesterday, 4:15 PM",
    size: "4.1 MB",
    status: "completed",
    riskLevel: "medium",
    analysisTime: "5m 12s",
    keyFindings: 7,
  },
  {
    id: 3,
    name: "Software License Agreement.pdf",
    uploadedAt: "Dec 10, 2024",
    size: "2.3 MB",
    status: "completed",
    riskLevel: "high",
    analysisTime: "4m 33s",
    keyFindings: 12,
  },
  {
    id: 4,
    name: "Consulting Agreement - FreelancerA.docx",
    uploadedAt: "Dec 8, 2024",
    size: "1.5 MB",
    status: "completed",
    riskLevel: "low",
    analysisTime: "2m 58s",
    keyFindings: 2,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

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

export function UploadHistory() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upload History
          </CardTitle>
          <CardDescription>Previously uploaded and analyzed documents</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {uploadHistory.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{doc.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadedAt}</span>
                    <span>•</span>
                    <span>Analysis: {doc.analysisTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">{doc.keyFindings} key findings</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(doc.status)} variant="secondary">
                  {doc.status}
                </Badge>
                <Badge className={getRiskColor(doc.riskLevel)} variant="secondary">
                  {doc.riskLevel} risk
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Analysis
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI About This
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
