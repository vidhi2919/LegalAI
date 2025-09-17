"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, FileText, Upload, MessageSquare, Folder, Settings, HelpCircle, Star, Clock, Archive } from "lucide-react"

interface DashboardSidebarProps {
  open: boolean
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
  { name: "Upload Document", href: "/dashboard/upload", icon: Upload, current: false },
  { name: "My Documents", href: "/dashboard/documents", icon: FileText, current: false },
  { name: "AI Assistant", href: "/dashboard/chat", icon: MessageSquare, current: false },
]

const documentCategories = [
  { name: "Recent", icon: Clock, count: 12 },
  { name: "Favorites", icon: Star, count: 5 },
  { name: "Contracts", icon: Folder, count: 8 },
  { name: "Legal Briefs", icon: Folder, count: 3 },
  { name: "Archived", icon: Archive, count: 15 },
]

export function DashboardSidebar({ open }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ScrollArea className="h-full px-3 py-4">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main</h3>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={item.current ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={item.href}>
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </a>
                  </Button>
                ))}
              </nav>
            </div>

            {/* Document Categories */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Documents</h3>
              <nav className="space-y-1">
                {documentCategories.map((category) => (
                  <Button key={category.name} variant="ghost" className="w-full justify-between">
                    <div className="flex items-center">
                      <category.icon className="mr-3 h-4 w-4" />
                      {category.name}
                    </div>
                    <span className="text-xs text-muted-foreground">{category.count}</span>
                  </Button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-1 pt-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <HelpCircle className="mr-3 h-4 w-4" />
                Help & Support
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
