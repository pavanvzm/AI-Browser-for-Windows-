export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  thumbnail?: string;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface AgentTask {
  id: string;
  status: 'idle' | 'thinking' | 'searching' | 'clicking' | 'typing' | 'navigating' | 'complete';
  description: string;
  progress?: number;
}

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  wakeWordDetected: boolean;
  transcript: string;
}

export interface BrowserState {
  tabs: Tab[];
  activeTabId: string;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  error?: string;
}
