import { AlertTriangle, RefreshCw, Edit3, CheckCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UpgradeDialogProps {
  isOpen: boolean;
  onStartOver: () => void;
  onEditResponses: () => void;
  onKeepResponses: () => void;
  upgradedToPlan?: string | null;
}

export function UpgradeDialog({
  isOpen,
  onStartOver,
  onEditResponses,
  onKeepResponses,
  upgradedToPlan,
}: UpgradeDialogProps) {
  if (!isOpen) return null;

  const planName = upgradedToPlan === 'enterprise' ? 'Foundation' : upgradedToPlan === 'premium' ? 'Growth Suite' : 'your new plan';

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm">
      <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <ArrowUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">
              Upgraded from Free Trial to {planName}! 🎉
            </h3>
            <p className="text-sm opacity-90">
              You now have access to the full suite of features.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">Thank you for upgrading, before we create the reports do you want to:</h3>
          <p className="text-sm text-muted-foreground">
            Choose how you want to continue with the responses you used in your free trial.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onStartOver}
            className="flex w-full items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-primary/40 hover:bg-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-foreground">A) Start over</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Chat starts over from the beginning.
              </p>
            </div>
          </button>

          <button
            onClick={onEditResponses}
            className="flex w-full items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-primary/40 hover:bg-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Edit3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-foreground">B) Edit the responses you used in your trial</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                They will see all the answers from their original Q&amp;A and can edit them.
              </p>
            </div>
          </button>

          <button
            onClick={onKeepResponses}
            className="flex w-full items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:border-primary/40 hover:bg-accent/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-foreground">C) I am happy with my responses, please generate my reports</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Continue with the current answers and then show the warning box before final submit.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

interface SubmitWarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
}

export function SubmitWarningDialog({ isOpen, onClose, onConfirmSubmit }: SubmitWarningDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Important Notice
          </DialogTitle>
        </DialogHeader>

        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mt-2">
          <p className="text-sm text-foreground font-medium mb-3">
            ⚠️ WARNING: Once you hit submit, there will be an extra cost to re-edit and submit.
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            The agents need all the information to create strategies. Any changes to answers may change the plan it creates.
          </p>
          <div className="bg-background/80 rounded-lg p-3 space-y-1">
            <p className="text-sm font-semibold text-foreground">Re-editing costs:</p>
            <p className="text-sm text-foreground">• <strong>$2.00</strong> per question</p>
            <p className="text-sm text-foreground">• <strong>$50.00</strong> per resubmission of all packets to ensure accuracy</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Go Back & Review
          </Button>
          <Button onClick={onConfirmSubmit} className="btn-primary-gradient flex-1">
            I Understand — Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
