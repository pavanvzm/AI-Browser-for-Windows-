import React from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBrowserStore } from '@/store/browserStore';
import { AgentChat, TaskStatus } from '@/components/agent';
import { cn } from '@/lib/utils';

export const AgentSidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useBrowserStore();

  return (
    <>
      {/* Toggle Button - Visible when sidebar is closed */}
      {!isSidebarOpen && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 z-50 h-10 w-10 bg-zinc-900 border-zinc-800 hover:bg-zinc-800 neon-glow"
          onClick={toggleSidebar}
        >
          <PanelRightOpen className="w-5 h-5 text-primary" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col w-80 h-full bg-zinc-900 border-l border-zinc-800 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        {isSidebarOpen && (
          <div className="absolute right-4 top-4 z-50">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-zinc-800"
              onClick={toggleSidebar}
            >
              <PanelRightClose className="w-4 h-4" />
            </Button>
          </div>
        )}

        {isSidebarOpen && (
          <>
            <TaskStatus />
            <AgentChat />
          </>
        )}
      </div>
    </>
  );
};
