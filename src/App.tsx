import React from 'react';
import { BrowserChrome, BrowserViewport } from '@/components/browser';
import { AgentSidebar } from '@/components/agent';
import { VoiceControl } from '@/components/voice';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-background overflow-hidden">
      {/* Voice Control (background service) */}
      <VoiceControl />
      
      {/* Browser Chrome (tabs + navigation) */}
      <BrowserChrome />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Browser Viewport */}
        <BrowserViewport />
        
        {/* Agent Sidebar */}
        <AgentSidebar />
      </div>
    </div>
  );
};

export default App;
