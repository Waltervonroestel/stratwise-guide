import { motion } from 'framer-motion';
import { Check, Package, ArrowUp, RefreshCw, Edit3, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PACKETS, ExtendedQuestionnaireData } from '@/store/questionnaireStore';
import { PACKET_FIELD_LABELS, getPacketAnswers } from './packets/PacketForm';
import { PlanType } from '@/store/appStore';

interface FinalSummaryPacketProps {
  data: ExtendedQuestionnaireData;
  planType: PlanType;
  previousPlan?: 'entry' | null;
  showUpgradeChoices: boolean;
  upgradedToPlan?: string | null;
  onStartOver: () => void;
  onEditResponses: () => void;
  onKeepResponses: () => void;
  onEditPacket: (idx: number) => void;
}

export function FinalSummaryPacket({
  data,
  planType,
  previousPlan,
  showUpgradeChoices,
  upgradedToPlan,
  onStartOver,
  onEditResponses,
  onKeepResponses,
  onEditPacket,
}: FinalSummaryPacketProps) {
  const upgradedPlanName = upgradedToPlan === 'enterprise' ? 'Foundation' : 'Growth Suite';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" />
        <h3 className="font-heading font-bold text-foreground text-lg">Complete Summary — All 7 Packets</h3>
      </div>

      <ScrollArea className="max-h-[500px]">
        <div className="space-y-4 pr-2">
          {PACKETS.map((packet, idx) => {
            const answers = getPacketAnswers(idx, data);
            const labels = PACKET_FIELD_LABELS[idx] || {};
            const filledAnswers = Object.entries(answers).filter(([, v]) => !!v);

            return (
              <motion.div
                key={packet.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <div className="flex items-center justify-between bg-secondary/30 px-4 py-2.5 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="font-heading font-semibold text-sm text-foreground">
                      Packet {idx + 1}: {packet.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      ({filledAnswers.length} answers)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditPacket(idx)}
                    className="text-xs gap-1 h-7"
                  >
                    <Edit3 className="w-3 h-3" /> Edit
                  </Button>
                </div>

                <div className="p-3 space-y-1.5">
                  {filledAnswers.map(([key, value]) => (
                    <div key={key} className="bg-background rounded-lg p-2.5 border border-border/50">
                      <span className="text-xs font-medium text-muted-foreground">
                        {labels[key] || key}
                      </span>
                      <p className="text-sm text-foreground mt-0.5 whitespace-pre-wrap line-clamp-3">
                        {value}
                      </p>
                    </div>
                  ))}
                  {filledAnswers.length === 0 && (
                    <p className="text-xs text-muted-foreground italic py-2 text-center">
                      No answers provided for this packet.
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {isUpgraded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary to-primary-hover p-5 text-primary-foreground"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <ArrowUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">
                Upgraded from Free Trial to {upgradedPlanName}
              </h3>
              <p className="text-sm opacity-90">
                Do you want to: A) start over, B) edit the responses you used in your trial, or C) generate your reports?
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={onStartOver}
              className="w-full flex items-center gap-3 rounded-lg bg-white/10 p-3 text-left transition-all hover:bg-white/20"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">A) Start over</h4>
                <p className="text-xs opacity-80">Chat starts over from the beginning.</p>
              </div>
            </button>

            <button
              onClick={onEditResponses}
              className="w-full flex items-center gap-3 rounded-lg bg-white/10 p-3 text-left transition-all hover:bg-white/20"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">B) Edit the responses you used in your trial</h4>
                <p className="text-xs opacity-80">See all the answers from your original Q&amp;A and edit them.</p>
              </div>
            </button>

            <button
              onClick={onKeepResponses}
              className="w-full flex items-center gap-3 rounded-lg bg-white/10 p-3 text-left transition-all hover:bg-white/20"
            >
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">C) I am happy with my response please generate my reports</h4>
                <p className="text-xs opacity-80">This will open the warning box before final submission.</p>
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {!isUpgraded && (
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">
                ⚠️ Once submitted, re-editing costs apply:
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>$2.00</strong> per question edit • <strong>$50.00</strong> per full resubmission
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
