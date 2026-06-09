import React, { useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBrowserStore } from '@/store/browserStore';
import { cn } from '@/lib/utils';

export const AgentChat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { chatMessages, addMessage, voiceState, updateVoiceState } = useBrowserStore();

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    addMessage({
      role: 'user',
      content: inputValue,
    });
    
    // Simulate AI response
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `I'll help you with: "${inputValue}". Let me navigate and perform the necessary actions.`,
      });
    }, 1000);
    
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    updateVoiceState({ isListening: !voiceState.isListening });
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 border-l border-zinc-800">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-foreground">AI Assistant</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Powered by GPT-4o-mini
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                <Mic className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Ask me anything or use voice commands
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Say "Hey Agent" to activate
              </p>
            </div>
          ) : (
            chatMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    message.role === 'user'
                      ? 'user-bubble'
                      : 'agent-bubble neon-glow'
                  )}
                >
                  <p className="text-foreground">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex gap-2">
          <Button
            variant={voiceState.isListening ? 'destructive' : 'outline'}
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={toggleListening}
          >
            {voiceState.isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
          
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-zinc-950 border-zinc-800"
          />
          
          <Button
            variant="default"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {voiceState.isListening && (
          <div className="mt-3 flex items-center gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-waveform"
                style={{
                  height: `${Math.random() * 20 + 4}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
