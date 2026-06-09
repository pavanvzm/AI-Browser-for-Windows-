import React from 'react';
import { useBrowserStore } from '@/store/browserStore';

export const BrowserViewport: React.FC = () => {
  const { currentUrl, isLoading } = useBrowserStore();

  return (
    <div className="flex-1 bg-background relative overflow-hidden">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-800 overflow-hidden">
          <div className="h-full bg-primary animate-pulse-slow" style={{ width: '60%' }} />
        </div>
      )}
      
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              {currentUrl === 'about:blank' ? 'New Tab' : new URL(currentUrl).hostname}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {currentUrl === 'about:blank'
                ? 'Start browsing or use voice commands to navigate the web with AI assistance.'
                : 'Page content would be rendered here in the full Electron implementation.'}
            </p>
          </div>

          {currentUrl === 'about:blank' && (
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-4">
              {[
                { title: 'Google', url: 'https://google.com' },
                { title: 'GitHub', url: 'https://github.com' },
                { title: 'YouTube', url: 'https://youtube.com' },
                { title: 'Reddit', url: 'https://reddit.com' },
              ].map((site) => (
                <button
                  key={site.title}
                  className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-primary/50 hover:bg-zinc-800 transition-all text-left group"
                >
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {site.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {site.url}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
