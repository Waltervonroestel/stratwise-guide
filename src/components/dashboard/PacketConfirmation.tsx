import { motion } from 'framer-motion';
import { Check, Edit3, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PACKETS, PacketStatus } from '@/store/questionnaireStore';

interface PacketConfirmationProps {
  packetIndex: number;
  status: PacketStatus;
  onConfirm: () => void;
  onEdit: () => void;
  onSelect: () => void;
  answers: Record<string, string>;
  fieldLabels: Record<string, string>;
}

export function PacketConfirmation({
  packetIndex,
  status,
  onConfirm,
  onEdit,
  onSelect,
  answers,
  fieldLabels,
}: PacketConfirmationProps) {
  const packet = PACKETS[packetIndex];
  const isReview = status === 'review';
  const isConfirmed = status === 'confirmed';
  const isPending = status === 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border rounded-xl p-4 transition-all cursor-pointer ${
        isConfirmed
          ? 'border-green-500/40 bg-green-50/50'
          : isReview
          ? 'border-primary/40 bg-accent/30'
          : isPending
          ? 'border-border/50 bg-muted/20 opacity-60'
          : 'border-border bg-card'
      }`}
      onClick={() => {
        if (!isPending) onSelect();
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              isConfirmed
                ? 'bg-green-500 text-white'
                : isReview
                ? 'bg-primary text-primary-foreground'
                : isPending
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary/20 text-primary'
            }`}
          >
            {isConfirmed ? <Check className="w-3.5 h-3.5" /> : isPending ? <Lock className="w-3 h-3" /> : packet.id}
          </div>
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground">{packet.title}</h4>
            <p className="text-xs text-muted-foreground">{packet.description}</p>
          </div>
        </div>
        {isConfirmed && (
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-xs gap-1">
            <Edit3 className="w-3 h-3" /> Edit
          </Button>
        )}
      </div>

      {/* Show answer summary for review/confirmed states */}
      {(isReview || isConfirmed) && (
        <div className="mt-3 space-y-1.5 text-xs">
          {Object.entries(answers).map(([key, value]) => {
            if (!value) return null;
            const label = fieldLabels[key] || key;
            const displayValue = value.length > 80 ? value.slice(0, 80) + '...' : value;
            return (
              <div key={key} className="flex gap-2">
                <span className="text-muted-foreground min-w-[100px] shrink-0">{label}:</span>
                <span className="text-foreground">{displayValue}</span>
              </div>
            );
          })}
        </div>
      )}

      {isReview && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={(e) => { e.stopPropagation(); onConfirm(); }} className="btn-primary-gradient gap-1 text-xs">
            <Check className="w-3.5 h-3.5" /> Confirm & Lock
          </Button>
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-xs gap-1">
            <Edit3 className="w-3.5 h-3.5" /> Edit Answers
          </Button>
        </div>
      )}
    </motion.div>
  );
}
