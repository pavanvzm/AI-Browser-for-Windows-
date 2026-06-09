import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBrowserStore } from '@/store/browserStore';
import { cn } from '@/lib/utils';

export const BrowserChrome: React.FC = () => {
  const {
    currentUrl,
    navigate,
    goBack,
    goForward,
    refresh,
    goHome,
    tabs,
    activeTabId,
    addTab,
    closeTab,
    switchTab,
    isLoading,
  } = useBrowserStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let url = e.currentTarget.value;
      if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('about:')) {
        url = `https://${url}`;
      }
      navigate(url);
    }
  };

  return (
    <div className="flex flex-col bg-zinc-950 border-b border-zinc-800">
      {/* Tab Bar */}
      <div className="flex items-center h-10 px-2 bg-zinc-950 border-b border-zinc-800/50">
        <div className="flex items-center flex-1 gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "group flex items-center gap-2 px-3 py-1.5 rounded-t-md text-sm transition-all min-w-[120px] max-w-[200px] cursor-pointer",
                tab.id === activeTabId
                  ? "bg-zinc-900 text-foreground border-t border-l border-r border-zinc-800"
                  : "bg-zinc-950/50 text-muted-foreground hover:bg-zinc-900/50"
              )}
              onClick={() => switchTab(tab.id)}
            >
              <span className="truncate flex-1">{tab.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-zinc-700 rounded p-0.5 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 ml-2 hover:bg-zinc-800"
          onClick={() => addTab()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation Bar */}
      <div className="flex items-center gap-2 p-2 bg-zinc-900">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-zinc-800"
            onClick={goBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-zinc-800"
            onClick={goForward}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 hover:bg-zinc-800", isLoading && "animate-spin")}
            onClick={refresh}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-zinc-800"
            onClick={goHome}
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1">
          <Input
            type="text"
            value={currentUrl}
            onChange={(e) => {}}
            onKeyDown={handleKeyDown}
            placeholder="Search or enter address"
            className="h-9 bg-zinc-950 border-zinc-800 focus:border-primary/50 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950 rounded-md border border-zinc-800">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isLoading ? "bg-yellow-500 animate-pulse" : "bg-emerald-500"
            )} />
            <span className="text-xs text-muted-foreground">
              {isLoading ? 'Loading' : 'Secure'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
