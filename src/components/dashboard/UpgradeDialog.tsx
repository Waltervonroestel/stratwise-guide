import { AlertTriangle, RefreshCw, Edit3, CheckCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface UpgradeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOver: () => void;
  onEditResponses: () => void;
  onKeepResponses: () => void;
  upgradedToPlan?: string | null;
}

export function UpgradeDialog({
  isOpen,
  onClose,
  onStartOver,
  onEditResponses,
  onKeepResponses,
  upgradedToPlan,
}: UpgradeDialogProps) {
  const planName = upgradedToPlan === 'enterprise' ? 'Foundation' : upgradedToPlan === 'premium' ? 'Growth Suite' : 'your new plan';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        {/* Upgrade Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-hover rounded-xl p-4 -mx-2 -mt-2 mb-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">
                Upgraded from Free Trial to {planName}! 🎉
              </h3>
              <p className="text-sm opacity-90">
                You now have access to the full suite of features.
              </p>
            </div>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="font-heading text-lg">How would you like to proceed?</DialogTitle>
          <DialogDescription>
            You completed your trial questionnaire. Choose how to handle your existing responses for your upgraded plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <button
            onClick={onStartOver}
            className="w-full flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent/30 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-foreground">A) Start Over</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Begin the questionnaire from scratch with fresh, detailed responses. The chat starts over from the beginning.
              </p>
            </div>
          </button>

          <button
            onClick={onEditResponses}
            className="w-full flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent/30 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Edit3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-foreground">B) Edit My Responses</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                See all the answers from your original trial Q&A and edit them before generating reports.
              </p>
            </div>
          </button>

          <button
            onClick={onKeepResponses}
            className="w-full flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-accent/30 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-foreground">C) I'm Happy — Generate Reports</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Keep your current answers and proceed to report generation.
              </p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
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
            <p className="text-sm text-foreground">• <strong>$2.00</strong> per question edit</p>
            <p className="text-sm text-foreground">• <strong>$50.00</strong> per full resubmission of all packets</p>
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
