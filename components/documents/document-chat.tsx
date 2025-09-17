"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, FileText, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  references?: string[]
}

interface DocumentChatProps {
  documentId: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "assistant",
    content:
      "Hello! I'm your AI legal assistant. I've analyzed your Employment Contract and I'm ready to answer any questions you have about it. You can ask me about specific clauses, risks, or get clarification on legal terms.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
]

const suggestedQuestions = [
  "What are the main risks in this contract?",
  "Can you explain the non-compete clause?",
  "What benefits am I entitled to?",
  "How much notice is required for termination?",
  "Are there any unusual clauses I should be aware of?",
]

export function DocumentChat({ documentId }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        references: aiResponse.references,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string): { content: string; references?: string[] } => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("risk") || lowerQuestion.includes("danger")) {
      return {
        content:
          "Based on my analysis, the main risks in this contract are:\n\n1. **Non-compete clause duration**: The 12-month non-compete period is quite long and may be difficult to enforce in some jurisdictions.\n\n2. **Broad confidentiality terms**: The confidentiality clause doesn't clearly define what constitutes confidential information, which could lead to disputes.\n\nI recommend discussing these points with your legal counsel before signing.",
        references: ["Section 6: Non-Compete", "Section 5: Confidentiality"],
      }
    }

    if (lowerQuestion.includes("non-compete") || lowerQuestion.includes("compete")) {
      return {
        content:
          "The non-compete clause in Section 6 states that you cannot engage in any competing business for 12 months after termination. This is quite restrictive:\n\n• **Duration**: 12 months is on the longer side\n• **Scope**: Applies to any competing business\n• **Geographic limitations**: None specified\n\nConsider negotiating for a shorter period (6 months) or adding geographic limitations to make it more reasonable.",
        references: ["Section 6: Non-Compete"],
      }
    }

    if (lowerQuestion.includes("benefit") || lowerQuestion.includes("compensation")) {
      return {
        content:
          "Your compensation and benefits package includes:\n\n• **Base salary**: $120,000 per year\n• **Benefits**: You're entitled to participate in all employee benefit plans maintained by the company\n• **Payment**: According to standard payroll practices\n\nMake sure to request details about the specific benefit plans (health insurance, retirement, etc.) before signing.",
        references: ["Section 2: Compensation", "Section 3: Benefits"],
      }
    }

    if (lowerQuestion.includes("termination") || lowerQuestion.includes("notice")) {
      return {
        content:
          "The termination clause in Section 4 requires:\n\n• **Notice period**: 30 days written notice from either party\n• **At-will employment**: Either you or the company can terminate with proper notice\n\nThis is a standard notice period and provides reasonable protection for both parties.",
        references: ["Section 4: Termination"],
      }
    }

    return {
      content:
        "I'd be happy to help you understand this contract better. Could you be more specific about what aspect you'd like me to explain? You can ask about:\n\n• Specific clauses or sections\n• Legal terms you don't understand\n• Potential risks or concerns\n• Your rights and obligations\n\nFeel free to reference any section number or quote specific text from the contract.",
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Legal Assistant</h3>
          <Badge variant="secondary" className="ml-auto">
            Online
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Ask me anything about your document</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
              {message.type === "assistant" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  {message.references && (
                    <div className="mt-2 pt-2 border-t border-border/20">
                      <div className="text-xs opacity-75 mb-1">References:</div>
                      <div className="flex flex-wrap gap-1">
                        {message.references.map((ref, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            {ref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "assistant" && (
                  <div className="flex items-center gap-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                    <span className="text-xs text-muted-foreground ml-2">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                )}
              </div>

              {message.type === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-secondary">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="space-y-1">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs h-auto py-2 px-3"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question about this document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={() => handleSendMessage()} disabled={!input.trim() || isLoading} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
