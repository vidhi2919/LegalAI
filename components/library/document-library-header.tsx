"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Grid3X3, List, Upload, FolderPlus } from "lucide-react"

interface DocumentLibraryHeaderProps {
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function DocumentLibraryHeader({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}: DocumentLibraryHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
          <p className="text-muted-foreground">Organize and manage your legal documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button size="sm" asChild>
            <a href="/dashboard/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </a>
          </Button>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
