import React from 'react';
import { Bot, User, Volume2, Mic } from 'lucide-react';
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
          'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
          isAssistant
            ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold'
            : 'bg-neutral-200 border border-[#E7E7E3] text-[#181818]'
        )}
      >
        {isAssistant ? <Mic className="w-4 h-4" /> : <User className="w-4 h-4 text-[#666666]" />}
      </div>

      {/* Message Card */}
      <div
        className={cn(
          'max-w-[85%] sm:max-w-[75%] rounded-[18px] p-3.5 shadow-subtle text-sm leading-relaxed',
          isAssistant
            ? 'bg-white border border-[#E7E7E3] text-[#181818] rounded-tl-sm'
            : 'bg-amber-50/90 border border-amber-200 text-[#181818] rounded-tr-sm',
          isLatest && 'ring-1 ring-amber-400/50'
        )}
      >
        <div className="flex items-center justify-between gap-3 mb-1 pb-1 border-b border-neutral-100">
          <span className="text-[10px] font-bold tracking-wide uppercase font-mono text-[#8A8A8A]">
            {isAssistant ? 'UNNATI Voice Assistant' : 'Beneficiary Response'}
          </span>
          {isAssistant && onPlayAudio && (
            <button
              onClick={() => onPlayAudio(message.text)}
              className="p-1 rounded-md hover:bg-neutral-100 text-[#666666] hover:text-amber-600 transition-colors"
              title="Hear aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm font-medium tracking-normal text-[#181818] whitespace-pre-line">
          {message.text}
        </p>
      </div>
    </div>
  );
};
