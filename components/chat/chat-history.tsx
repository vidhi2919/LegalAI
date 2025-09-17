"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, MoreHorizontal } from "lucide-react"

const chatHistory = [
  {
    id: "1",
    title: "Contract Risk Analysis",
    lastMessage: "The main risks in your employment contract are...",
    timestamp: "2 hours ago",
    messageCount: 8,
    documents: ["Employment Contract - TechCorp"],
  },
  {
    id: "2",
    title: "Non-compete Comparison",
    lastMessage: "I found non-compete clauses in 2 of your contracts...",
    timestamp: "Yesterday",
    messageCount: 12,
    documents: ["Employment Contract", "Consulting Agreement"],
  },
  {
    id: "3",
    title: "Payment Terms Review",
    lastMessage: "Here's a breakdown of payment terms across...",
    timestamp: "2 days ago",
    messageCount: 6,
    documents: ["Service Agreement", "Consulting Agreement"],
  },
  {
    id: "4",
    title: "NDA Questions",
    lastMessage: "The confidentiality clause in your NDA...",
    timestamp: "1 week ago",
    messageCount: 4,
    documents: ["NDA Agreement - ClientX"],
  },
]

export function ChatHistory() {
  return (
    <Card className="flex-1 border-t border-border rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-medium truncate">{chat.title}</h4>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{chat.lastMessage}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{chat.messageCount}</span>
              </div>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>

            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {chat.documents.map((doc, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {doc.length > 20 ? `${doc.substring(0, 20)}...` : doc}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
