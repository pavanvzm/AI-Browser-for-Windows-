import { create } from 'zustand';
import { Tab, ChatMessage, AgentTask, VoiceState } from '../types';

interface BrowserStore {
  // Tabs
  tabs: Tab[];
  activeTabId: string;
  addTab: (url?: string) => void;
  closeTab: (tabId: string) => void;
  switchTab: (tabId: string) => void;
  updateTab: (tabId: string, updates: Partial<Tab>) => void;
  
  // Navigation
  navigate: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
  refresh: () => void;
  goHome: () => void;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  currentUrl: string;
  
  // Agent
  chatMessages: ChatMessage[];
  currentTask: AgentTask;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateTask: (task: Partial<AgentTask>) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Voice
  voiceState: VoiceState;
  updateVoiceState: (updates: Partial<VoiceState>) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useBrowserStore = create<BrowserStore>((set, get) => ({
  // Initial state
  tabs: [{
    id: generateId(),
    title: 'New Tab',
    url: 'about:blank',
    isActive: true,
  }],
  activeTabId: '',
  currentUrl: '',
  history: [],
  historyIndex: -1,
  isLoading: false,
  
  // Agent state
  chatMessages: [],
  currentTask: {
    id: generateId(),
    status: 'idle',
    description: 'Ready for commands',
  },
  isSidebarOpen: true,
  
  // Voice state
  voiceState: {
    isListening: false,
    isSpeaking: false,
    wakeWordDetected: false,
    transcript: '',
  },
  
  // Tab actions
  addTab: (url = 'about:blank') => {
    const newTab: Tab = {
      id: generateId(),
      title: 'New Tab',
      url,
      isActive: true,
    };
    set((state) => ({
      tabs: state.tabs.map(t => ({ ...t, isActive: false })).concat(newTab),
      activeTabId: newTab.id,
      currentUrl: url,
    }));
  },
  
  closeTab: (tabId: string) => {
    set((state) => {
      const tabIndex = state.tabs.findIndex(t => t.id === tabId);
      if (tabIndex === -1) return state;
      
      const newTabs = state.tabs.filter(t => t.id !== tabId);
      
      if (newTabs.length === 0) {
        // Always keep at least one tab
        const newTab: Tab = {
          id: generateId(),
          title: 'New Tab',
          url: 'about:blank',
          isActive: true,
        };
        return { tabs: [newTab], activeTabId: newTab.id, currentUrl: 'about:blank' };
      }
      
      const newActiveTab = tabIndex >= newTabs.length 
        ? newTabs[newTabs.length - 1] 
        : newTabs[tabIndex];
      
      return {
        tabs: newTabs.map(t => ({ ...t, isActive: t.id === newActiveTab.id })),
        activeTabId: newActiveTab.id,
        currentUrl: newActiveTab.url,
      };
    });
  },
  
  switchTab: (tabId: string) => {
    set((state) => ({
      tabs: state.tabs.map(t => ({ ...t, isActive: t.id === tabId })),
      activeTabId: tabId,
      currentUrl: state.tabs.find(t => t.id === tabId)?.url || '',
    }));
  },
  
  updateTab: (tabId: string, updates: Partial<Tab>) => {
    set((state) => ({
      tabs: state.tabs.map(t => t.id === tabId ? { ...t, ...updates } : t),
      currentUrl: tabId === state.activeTabId 
        ? (updates.url || state.currentUrl) 
        : state.currentUrl,
    }));
  },
  
  // Navigation actions
  navigate: (url: string) => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(url);
      
      return {
        currentUrl: url,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        isLoading: true,
        tabs: state.tabs.map(t => 
          t.id === state.activeTabId 
            ? { ...t, url, title: 'Loading...' } 
            : t
        ),
      };
    });
    
    // Simulate page load
    setTimeout(() => {
      set((state) => ({
        isLoading: false,
        tabs: state.tabs.map(t => 
          t.id === state.activeTabId 
            ? { ...t, title: new URL(url).hostname } 
            : t
        ),
      }));
    }, 1000);
  },
  
  goBack: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      const url = state.history[newIndex];
      
      return {
        historyIndex: newIndex,
        currentUrl: url,
        isLoading: true,
        tabs: state.tabs.map(t => 
          t.id === state.activeTabId 
            ? { ...t, url, title: 'Loading...' } 
            : t
        ),
      };
    });
  },
  
  goForward: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      const url = state.history[newIndex];
      
      return {
        historyIndex: newIndex,
        currentUrl: url,
        isLoading: true,
        tabs: state.tabs.map(t => 
          t.id === state.activeTabId 
            ? { ...t, url, title: 'Loading...' } 
            : t
        ),
      };
    });
  },
  
  refresh: () => {
    set((state) => ({
      isLoading: true,
    }));
    
    setTimeout(() => {
      set((state) => ({
        isLoading: false,
      }));
    }, 1000);
  },
  
  goHome: () => {
    get().navigate('about:blank');
  },
  
  // Agent actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    set((state) => ({
      chatMessages: [...state.chatMessages, {
        ...message,
        id: generateId(),
        timestamp: new Date(),
      }],
    }));
  },
  
  updateTask: (task: Partial<AgentTask>) => {
    set((state) => ({
      currentTask: { ...state.currentTask, ...task },
    }));
  },
  
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
  
  // Voice actions
  updateVoiceState: (updates: Partial<VoiceState>) => {
    set((state) => ({
      voiceState: { ...state.voiceState, ...updates },
    }));
  },
}));
