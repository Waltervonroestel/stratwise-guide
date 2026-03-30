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
  const isTrialUpgrade = previousPlan === 'entry' && !!upgradedToPlan && planType !== 'entry';
  const upgradedPlanName = upgradedToPlan === 'enterprise' ? 'Foundation' : 'Growth Suite';
  const decisionTitle = isTrialUpgrade
    ? `Upgraded from Free Trial to ${upgradedPlanName}`
    : 'Before you continue';
  const decisionDescription = isTrialUpgrade
    ? 'Do you want to: A) start over, B) edit the responses you used in your trial, or C) generate your reports?'
    : 'Do you want to: A) start over, B) edit the responses you used in your trial, or C) I am happy with my response please generate my reports.';
  const optionCDescription = planType === 'entry'
    ? 'This will submit your responses and continue your Free Trial flow.'
    : 'This will open the warning box before final submission.';

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
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <h4 className="font-heading text-sm font-semibold text-foreground">
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
                    className="h-7 gap-1 text-xs"
                  >
                    <Edit3 className="h-3 w-3" /> Edit
                  </Button>
                </div>

                <div className="space-y-1.5 p-3">
                  {filledAnswers.map(([key, value]) => (
                    <div key={key} className="rounded-lg border border-border/50 bg-background p-2.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        {labels[key] || key}
                      </span>
                      <p className="mt-0.5 line-clamp-3 whitespace-pre-wrap text-sm text-foreground">
                        {value}
                      </p>
                    </div>
                  ))}
                  {filledAnswers.length === 0 && (
                    <p className="py-2 text-center text-xs italic text-muted-foreground">
                      No answers provided for this packet.
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {showUpgradeChoices && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary to-primary-hover p-5 text-primary-foreground"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
              <ArrowUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold">{decisionTitle}</h3>
              <p className="text-sm opacity-90">{decisionDescription}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={onStartOver}
              className="flex w-full items-center gap-3 rounded-lg bg-primary-foreground/10 p-3 text-left transition-all hover:bg-primary-foreground/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                <RefreshCw className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">A) Start over</h4>
                <p className="text-xs opacity-80">Chat starts over from the beginning.</p>
              </div>
            </button>

            <button
              onClick={onEditResponses}
              className="flex w-full items-center gap-3 rounded-lg bg-primary-foreground/10 p-3 text-left transition-all hover:bg-primary-foreground/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                <Edit3 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">B) Edit the responses you used in your trial</h4>
                <p className="text-xs opacity-80">See all the answers from your original Q&amp;A and edit them.</p>
              </div>
            </button>

            <button
              onClick={onKeepResponses}
              className="flex w-full items-center gap-3 rounded-lg bg-primary-foreground/10 p-3 text-left transition-all hover:bg-primary-foreground/20"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/20">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">C) I am happy with my response please generate my reports</h4>
                <p className="text-xs opacity-80">{optionCDescription}</p>
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {!showUpgradeChoices && (
        <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">
                ⚠️ Once submitted, re-editing costs apply:
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                <strong>$2.00</strong> per question edit • <strong>$50.00</strong> per full resubmission
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
