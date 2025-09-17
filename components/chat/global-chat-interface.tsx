"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, FileText, Copy, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  references?: { document: string; section: string }[]
}

interface GlobalChatInterfaceProps {
  selectedDocuments: string[]
}

const welcomeMessages = [
  "Hello! I'm your AI legal assistant. I can help you analyze contracts, compare documents, and answer questions about legal terms.",
  "I have access to all your uploaded documents. You can ask me to compare contracts, find specific clauses, or explain legal concepts.",
  "Try asking me something like 'Compare the termination clauses in my employment contracts' or 'What are the risks in my latest NDA?'",
]

const suggestedQuestions = [
  "What are the main differences between my employment contracts?",
  "Find all non-compete clauses across my documents",
  "Which contracts have the highest risk scores?",
  "Explain the confidentiality terms in simple language",
  "What should I negotiate in my next contract?",
  "Compare payment terms across all my agreements",
]

export function GlobalChatInterface({ selectedDocuments }: GlobalChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
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
      const aiResponse = generateGlobalAIResponse(content, selectedDocuments)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        timestamp: new Date(),
        references: aiResponse.references,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const generateGlobalAIResponse = (
    question: string,
    documents: string[],
  ): { content: string; references?: { document: string; section: string }[] } => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("compare") || lowerQuestion.includes("difference")) {
      return {
        content: `I've analyzed your contracts and found several key differences:\n\n**Termination Notice:**\n• Employment Contract (TechCorp): 30 days notice required\n• Consulting Agreement: 14 days notice required\n• Service Agreement: 60 days notice required\n\n**Non-Compete Duration:**\n• Employment Contract: 12 months\n• Consulting Agreement: 6 months\n• Service Agreement: No non-compete clause\n\n**Compensation Structure:**\n• Employment: Fixed salary ($120,000/year)\n• Consulting: Hourly rate ($150/hour)\n• Service: Project-based milestone payments\n\nThe Employment Contract appears to have the most restrictive terms, while the Service Agreement is the most flexible.`,
        references: [
          { document: "Employment Contract - TechCorp", section: "Section 4: Termination" },
          { document: "Consulting Agreement", section: "Section 3: Termination" },
          { document: "Service Agreement", section: "Section 5: Payment Terms" },
        ],
      }
    }

    if (lowerQuestion.includes("risk") || lowerQuestion.includes("highest risk")) {
      return {
        content: `Based on my analysis, here are your contracts ranked by risk level:\n\n**🔴 High Risk (Score: 85/100)**\n• Software License Agreement\n• Issues: Broad liability clauses, automatic renewal, limited warranty\n\n**🟡 Medium Risk (Score: 65/100)**\n• Employment Contract - TechCorp\n• Issues: Long non-compete period, broad confidentiality\n\n**🟡 Medium Risk (Score: 60/100)**\n• Lease Agreement - Office Space\n• Issues: Personal guarantees, maintenance responsibilities\n\n**🟢 Low Risk (Score: 25/100)**\n• NDA Agreement - ClientX\n• Issues: Standard terms, reasonable duration\n\nI recommend prioritizing review of the Software License Agreement due to its high risk score.`,
        references: [
          { document: "Software License Agreement", section: "Section 7: Liability" },
          { document: "Employment Contract - TechCorp", section: "Section 6: Non-Compete" },
          { document: "Lease Agreement", section: "Section 12: Guarantees" },
        ],
      }
    }

    if (lowerQuestion.includes("non-compete") || lowerQuestion.includes("compete")) {
      return {
        content: `I found non-compete clauses in 2 of your 4 contracts:\n\n**Employment Contract - TechCorp:**\n• Duration: 12 months after termination\n• Scope: Any competing business\n• Geographic: No limitations specified\n• Risk: HIGH - May be unenforceable due to broad scope\n\n**Consulting Agreement - FreelancerA:**\n• Duration: 6 months after termination\n• Scope: Direct competitors only\n• Geographic: Within 50-mile radius\n• Risk: MEDIUM - More reasonable and likely enforceable\n\n**Recommendations:**\n1. Negotiate the TechCorp non-compete to 6 months maximum\n2. Add geographic limitations to make it more reasonable\n3. Consider adding compensation for non-compete period`,
        references: [
          { document: "Employment Contract - TechCorp", section: "Section 6: Non-Compete" },
          { document: "Consulting Agreement", section: "Section 8: Restrictions" },
        ],
      }
    }

    if (lowerQuestion.includes("payment") || lowerQuestion.includes("compensation")) {
      return {
        content: `Here's a breakdown of payment terms across your contracts:\n\n**Employment Contract - TechCorp:**\n• Base: $120,000/year salary\n• Payment: Bi-weekly via standard payroll\n• Benefits: Full benefits package included\n\n**Consulting Agreement:**\n• Rate: $150/hour\n• Payment: Net 30 days after invoice\n• Expenses: Reimbursable with receipts\n\n**Service Agreement - VendorY:**\n• Structure: Milestone-based payments\n• Terms: 50% upfront, 50% on completion\n• Late fees: 1.5% per month on overdue amounts\n\n**Lease Agreement:**\n• Rent: $8,500/month\n• Due: 1st of each month\n• Late fee: $250 after 5-day grace period\n\nThe consulting agreement offers the highest hourly equivalent but requires invoice management.`,
        references: [
          { document: "Employment Contract - TechCorp", section: "Section 2: Compensation" },
          { document: "Consulting Agreement", section: "Section 4: Payment" },
          { document: "Service Agreement", section: "Section 3: Payment Terms" },
        ],
      }
    }

    return {
      content: `I'm here to help you understand and analyze your legal documents. I can:\n\n• **Compare contracts** - Find differences between similar agreements\n• **Identify risks** - Highlight problematic clauses and terms\n• **Explain legal terms** - Break down complex language into plain English\n• **Find specific clauses** - Search across all your documents\n• **Provide recommendations** - Suggest improvements and negotiations\n\nWhat would you like to explore? You can ask about specific documents, compare multiple contracts, or get general legal advice.`,
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Legal Assistant</h3>
          <Badge variant="secondary" className="ml-auto">
            {selectedDocuments.length} documents selected
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Ask me anything about your legal documents - I can compare, analyze, and explain
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              {welcomeMessages.map((message, index) => (
                <div key={index} className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <div className="text-sm">{message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
                    <div className="mt-3 pt-3 border-t border-border/20">
                      <div className="text-xs opacity-75 mb-2">Referenced documents:</div>
                      <div className="space-y-1">
                        {message.references.map((ref, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <FileText className="h-3 w-3" />
                            <span className="font-medium">{ref.document}</span>
                            <span className="opacity-75">• {ref.section}</span>
                          </div>
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
                  <span className="text-xs text-muted-foreground">Analyzing your documents...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3 text-left"
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
            placeholder="Ask me anything about your legal documents..."
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
