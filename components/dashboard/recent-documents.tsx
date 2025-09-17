"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, MoreHorizontal, Download, Eye, MessageSquare } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const recentDocuments = [
  {
    id: 1,
    name: "Employment Contract - TechCorp",
    type: "PDF",
    uploadedAt: "2 hours ago",
    status: "processing",
    riskLevel: "medium",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "NDA Agreement - ClientX",
    type: "DOCX",
    uploadedAt: "1 day ago",
    status: "completed",
    riskLevel: "low",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Service Agreement - VendorY",
    type: "PDF",
    uploadedAt: "3 days ago",
    status: "completed",
    riskLevel: "high",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "Lease Agreement - Office Space",
    type: "PDF",
    uploadedAt: "1 week ago",
    status: "completed",
    riskLevel: "medium",
    size: "4.1 MB",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
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

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your latest uploaded and processed documents</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{doc.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadedAt}</span>
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
                      View Document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI About This
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
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
