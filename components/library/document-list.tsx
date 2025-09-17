"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, MoreHorizontal, Eye, Download, MessageSquare, Star, Trash2, Share } from "lucide-react"

interface DocumentListProps {
  searchQuery: string
  category: string
  riskLevel: string
  sortBy: string
}

const mockDocuments = [
  {
    id: "1",
    name: "Employment Contract - TechCorp.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "Dec 15, 2024",
    riskLevel: "medium",
    status: "completed",
    category: "contracts",
    isFavorite: true,
    keyFindings: 5,
  },
  {
    id: "2",
    name: "NDA Agreement - ClientX.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "Dec 14, 2024",
    riskLevel: "low",
    status: "completed",
    category: "agreements",
    isFavorite: false,
    keyFindings: 2,
  },
  {
    id: "3",
    name: "Service Agreement - VendorY.pdf",
    type: "PDF",
    size: "3.2 MB",
    uploadedAt: "Dec 12, 2024",
    riskLevel: "high",
    status: "completed",
    category: "agreements",
    isFavorite: true,
    keyFindings: 8,
  },
  {
    id: "4",
    name: "Lease Agreement - Office Space.pdf",
    type: "PDF",
    size: "4.1 MB",
    uploadedAt: "Dec 8, 2024",
    riskLevel: "medium",
    status: "completed",
    category: "contracts",
    isFavorite: false,
    keyFindings: 4,
  },
  {
    id: "5",
    name: "Software License Agreement.pdf",
    type: "PDF",
    size: "2.8 MB",
    uploadedAt: "Dec 1, 2024",
    riskLevel: "high",
    status: "completed",
    category: "agreements",
    isFavorite: false,
    keyFindings: 12,
  },
  {
    id: "6",
    name: "Consulting Agreement - FreelancerA.docx",
    type: "DOCX",
    size: "1.5 MB",
    uploadedAt: "Nov 24, 2024",
    riskLevel: "low",
    status: "completed",
    category: "contracts",
    isFavorite: true,
    keyFindings: 1,
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

export function DocumentList({ searchQuery, category, riskLevel, sortBy }: DocumentListProps) {
  // Filter documents based on props
  let filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      category === "all" || doc.category === category || category === "recent" || category === "favorites"
    const matchesRisk = riskLevel === "all" || doc.riskLevel === riskLevel
    return matchesSearch && matchesCategory && matchesRisk
  })

  // Apply category-specific filters
  if (category === "recent") {
    filteredDocuments = filteredDocuments.slice(0, 8)
  } else if (category === "favorites") {
    filteredDocuments = filteredDocuments.filter((doc) => doc.isFavorite)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Table Header */}
      <div className="border border-border rounded-lg">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 text-sm font-medium text-muted-foreground">
          <div className="col-span-1">
            <Checkbox />
          </div>
          <div className="col-span-5">Name</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Size</div>
          <div className="col-span-1">Risk</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Document Rows */}
        <div className="divide-y divide-border">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="col-span-1 flex items-center">
                <Checkbox />
              </div>

              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    {doc.isFavorite && <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{doc.keyFindings} key findings</p>
                </div>
              </div>

              <div className="col-span-1 flex items-center">
                <Badge variant="outline" className="text-xs">
                  {doc.type}
                </Badge>
              </div>

              <div className="col-span-1 flex items-center">
                <span className="text-sm text-muted-foreground">{doc.size}</span>
              </div>

              <div className="col-span-1 flex items-center">
                <Badge className={`${getRiskColor(doc.riskLevel)} text-xs`} variant="secondary">
                  {doc.riskLevel}
                </Badge>
              </div>

              <div className="col-span-2 flex items-center">
                <span className="text-sm text-muted-foreground">{doc.uploadedAt}</span>
              </div>

              <div className="col-span-1 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <a href={`/dashboard/documents/${doc.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Document
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask AI About This
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" />
                      {doc.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button asChild>
            <a href="/dashboard/upload">Upload Your First Document</a>
          </Button>
        </div>
      )}
    </div>
  )
}
