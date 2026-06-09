import React from 'react';
import { Activity, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useBrowserStore } from '@/store/browserStore';
import { cn } from '@/lib/utils';

export const TaskStatus: React.FC = () => {
  const { currentTask } = useBrowserStore();

  const getStatusIcon = () => {
    switch (currentTask.status) {
      case 'thinking':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'searching':
        return <Activity className="w-4 h-4 animate-pulse text-yellow-500" />;
      case 'clicking':
      case 'typing':
      case 'navigating':
        return <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (currentTask.status) {
      case 'thinking':
        return 'Thinking...';
      case 'searching':
        return 'Searching...';
      case 'clicking':
        return 'Clicking element...';
      case 'typing':
        return 'Typing...';
      case 'navigating':
        return 'Navigating...';
      case 'complete':
        return 'Task Complete';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800",
          currentTask.status !== 'idle' && 'neon-glow'
        )}>
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {currentTask.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {getStatusText()}
          </p>
        </div>

        {currentTask.progress !== undefined && (
          <div className="w-16">
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${currentTask.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
