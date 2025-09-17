"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, MoreHorizontal, Eye, Download, MessageSquare, Star, Trash2, Share } from "lucide-react"

interface DocumentGridProps {
  searchQuery: string
  category: string
  riskLevel: string
  sortBy: string
}

const mockDocuments = [
  {
    id: "1",
    name: "Employment Contract - TechCorp",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2 hours ago",
    riskLevel: "medium",
    status: "completed",
    category: "contracts",
    isFavorite: true,
    thumbnail: "/contract-document.png",
  },
  {
    id: "2",
    name: "NDA Agreement - ClientX",
    type: "DOCX",
    size: "1.8 MB",
    uploadedAt: "1 day ago",
    riskLevel: "low",
    status: "completed",
    category: "agreements",
    isFavorite: false,
    thumbnail: "/legal-document-stack.png",
  },
  {
    id: "3",
    name: "Service Agreement - VendorY",
    type: "PDF",
    size: "3.2 MB",
    uploadedAt: "3 days ago",
    riskLevel: "high",
    status: "completed",
    category: "agreements",
    isFavorite: true,
    thumbnail: "/service-agreement.jpg",
  },
  {
    id: "4",
    name: "Lease Agreement - Office Space",
    type: "PDF",
    size: "4.1 MB",
    uploadedAt: "1 week ago",
    riskLevel: "medium",
    status: "completed",
    category: "contracts",
    isFavorite: false,
    thumbnail: "/lease-document.jpg",
  },
  {
    id: "5",
    name: "Software License Agreement",
    type: "PDF",
    size: "2.8 MB",
    uploadedAt: "2 weeks ago",
    riskLevel: "high",
    status: "completed",
    category: "agreements",
    isFavorite: false,
    thumbnail: "/software-license-agreement.png",
  },
  {
    id: "6",
    name: "Consulting Agreement - FreelancerA",
    type: "DOCX",
    size: "1.5 MB",
    uploadedAt: "3 weeks ago",
    riskLevel: "low",
    status: "completed",
    category: "contracts",
    isFavorite: true,
    thumbnail: "/consulting-contract.jpg",
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

export function DocumentGrid({ searchQuery, category, riskLevel, sortBy }: DocumentGridProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              {/* Document Thumbnail */}
              <div className="relative mb-3">
                <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                  <img
                    src={doc.thumbnail || "/placeholder.svg"}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {doc.isFavorite && (
                    <div className="bg-background/80 backdrop-blur-sm rounded-full p-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    </div>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-3 w-3" />
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

              {/* Document Info */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight line-clamp-2">{doc.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <Badge className={`${getRiskColor(doc.riskLevel)} text-xs`} variant="secondary">
                        {doc.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>{doc.size}</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
