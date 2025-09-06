import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Bot, X, Send, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Sentinel HR assistant. I can help you with questions about psychological safety, team performance metrics, and implementation strategies. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('score') || message.includes('psychological safety')) {
      return "Psychological safety scores range from 0-100 and are calculated based on team communication patterns, participation rates, and sentiment analysis. A score above 80 indicates excellent psychological safety, while scores below 60 require attention. Would you like specific suggestions for improvement?";
    }
    
    if (message.includes('improve') || message.includes('suggestions')) {
      return "Great question! Based on your current team score, I recommend: 1) Implementing weekly check-ins to build trust, 2) Creating a peer recognition program, 3) Hosting 'failure learning' sessions to reduce fear of mistakes. Would you like detailed implementation steps for any of these?";
    }
    
    if (message.includes('chart') || message.includes('data') || message.includes('analytics')) {
      return "The performance charts show trends over time using multiple data points including participation rates, sentiment analysis, and engagement metrics. You can filter by week, month, or year to identify patterns. Is there a specific time period you'd like to analyze?";
    }
    
    if (message.includes('team') || message.includes('members')) {
      return "Team dynamics are analyzed through communication frequency, response patterns, and participation in meetings and discussions. The system identifies when team members might be withdrawing or when engagement drops. Would you like tips on re-engaging specific team members?";
    }
    
    if (message.includes('implementation') || message.includes('how to')) {
      return "Implementation success depends on leadership buy-in and gradual rollout. I recommend starting with one or two initiatives, measuring results for 2-4 weeks, then expanding. The key is consistency and creating safe spaces for feedback. Which specific area would you like to focus on first?";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return "Hello! I'm here to help you understand and improve your team's psychological safety. I can explain metrics, suggest improvements, help with implementation strategies, or answer questions about the platform. What would you like to know?";
    }
    
    return "That's an interesting question! While I specialize in psychological safety and team performance topics, I might not have specific information about that. Could you ask about team dynamics, safety scores, improvement strategies, or platform features? I'm here to help with your HR analytics needs!";
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage = {
      id: messages.length + 1,
      text: trimmedInput,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponseText = getBotResponse(trimmedInput);
      
      setMessages(prev => {
        const botResponse = {
          id: prev.length + 1,
          text: botResponseText,
          isBot: true,
          timestamp: new Date()
        };
        return [...prev, botResponse];
      });
      
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary shadow-hover hover:shadow-focus transition-all duration-200"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card className={cn(
        "w-80 shadow-hover transition-all duration-300",
        isMinimized ? "h-14" : "h-96"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Sentinel Assistant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 text-white hover:bg-white/20"
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 max-h-64 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg text-sm",
                      message.isBot
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-100" />
                      <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about psychological safety..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;