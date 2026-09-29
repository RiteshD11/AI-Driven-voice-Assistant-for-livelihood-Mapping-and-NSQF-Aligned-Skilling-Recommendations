import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { ConversationMessage } from '../types';

interface ConversationBubbleProps {
  message: ConversationMessage;
  isLatest?: boolean;
  onPlayAudio?: (text: string) => void;
  className?: string;
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({
  message,
  isLatest = false,
  onPlayAudio,
  className,
}) => {
  const isAssistant = message.sender === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full transition-all duration-300',
        isAssistant ? 'justify-start' : 'justify-end flex-row-reverse',
        className
      )}
    >
      {/* Sender Avatar */}
      <div
        className={cn(
          'w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md',
          isAssistant
            ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-bold'
            : 'bg-slate-800 border border-slate-700 text-slate-300'
        )}
      >
        {isAssistant ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>

      {/* Message Card */}
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg text-sm leading-relaxed backdrop-blur-md',
          isAssistant
            ? 'bg-slate-900/80 border border-slate-700/80 text-slate-200 rounded-tl-sm'
            : 'bg-gradient-to-r from-amber-600/25 to-orange-600/25 border border-amber-500/40 text-amber-100 rounded-tr-sm',
          isLatest && 'ring-1 ring-amber-400/40'
        )}
      >
        <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/5">
          <span className="text-[11px] font-semibold tracking-wide uppercase font-mono text-slate-400">
            {isAssistant ? 'Kaushal Saathi Voice AI' : 'Beneficiary Response'}
          </span>
          {isAssistant && onPlayAudio && (
            <button
              onClick={() => onPlayAudio(message.text)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
              title="Hear aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-sm font-medium tracking-normal text-slate-100 whitespace-pre-line">
          {message.text}
        </p>
      </div>
    </div>
  );
};
