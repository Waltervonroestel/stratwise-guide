import { AlertTriangle, RefreshCw, Edit3, CheckCircle } from 'lucide-react';
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
}

export function UpgradeDialog({
  isOpen,
  onClose,
  onStartOver,
  onEditResponses,
  onKeepResponses,
}: UpgradeDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">Welcome to your upgraded plan! 🎉</DialogTitle>
          <DialogDescription>
            You completed your trial questionnaire. How would you like to proceed with your upgraded plan?
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
                Begin the questionnaire from scratch with fresh, detailed responses.
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
                Review and refine the answers you provided during your trial.
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
