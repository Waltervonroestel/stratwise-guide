import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, FileUp, File, X, FileText, Package, Send, AlertTriangle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, FlowType } from '@/store/appStore';
import { useQuestionnaireStore, PACKETS } from '@/store/questionnaireStore';
import { DocumentUploadPaywall } from './DocumentUploadPaywall';
import { PacketConfirmation } from './PacketConfirmation';
import { PacketForm, PACKET_FIELD_LABELS, getPacketAnswers } from './packets/PacketForm';
import { UpgradeDialog, SubmitWarningDialog } from './UpgradeDialog';
import { FinalSummaryPacket } from './FinalSummaryPacket';
import { AutoFilledBanner } from './AutoFilledBanner';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

const flowLabels: Record<string, { label: string; description: string }> = {
  completo: { label: 'Blueprint Builder', description: '7 packets • 53 questions' },
  estrategico: { label: 'Strategy Accelerator', description: 'Automated strategy insights' },
  tactico: { label: 'Action Autopilot', description: 'Automated execution tactics' },
};

export function BrandOSQuestionnaire() {
  const { hasDocumentAddon, flowType, planType, questionnaireCompleted, completeQuestionnaire, setPlanType } = useAppStore();
  const {
    data, currentPacket, packetStatuses, allPacketsConfirmed, finalSubmitted,
    showUpgradeDialog, showSubmitWarning, previousPlanType, upgradedToPlan,
    isAutoFilled,
    updateData, setCurrentPacket, confirmPacket, editPacket,
    setPacketStatus, setShowUpgradeDialog, setShowSubmitWarning,
    setFinalSubmitted, resetQuestionnaire, handlePlanUpgrade,
    autoFillFromDocuments, setIsAutoFilled,
  } = useQuestionnaireStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showPacketList, setShowPacketList] = useState(false);
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [showAutoFilledReview, setShowAutoFilledReview] = useState(false);
  const [showUpgradePicker, setShowUpgradePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFlowInfo = flowType ? flowLabels[flowType] || flowLabels.completo : flowLabels.completo;
  const currentStatus = packetStatuses[currentPacket];

  const handleUploadClick = () => {
    if (hasDocumentAddon) {
      fileInputRef.current?.click();
    } else {
      setShowPaywall(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} document(s) uploaded. Analyzing with AI...`);
      // Simulate AI processing delay, then auto-fill
      setTimeout(() => {
        autoFillFromDocuments();
        setShowAutoFilledReview(true);
        setShowFinalSummary(false);
        toast.success('All 53 questions answered automatically from your documents!');
      }, 2000);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePaywallSuccess = () => {
    setShowPaywall(false);
    toast.success('Add-on activated! You can now upload documents');
    setTimeout(() => fileInputRef.current?.click(), 500);
  };

  const handleReviewPacket = () => {
    setPacketStatus(currentPacket, 'review');
  };

  const handleConfirmPacket = () => {
    confirmPacket(currentPacket);
    toast.success(`Packet ${currentPacket + 1} confirmed ✓`);
    // If this was the last packet, auto-show final summary
    const updatedStatuses = [...packetStatuses];
    updatedStatuses[currentPacket] = 'confirmed';
    if (updatedStatuses.every(s => s === 'confirmed')) {
      setShowFinalSummary(true);
    }
  };

  const handleFinalSubmit = () => {
    if (planType === 'entry') {
      // Trial: submit directly without warning
      setFinalSubmitted(true);
      completeQuestionnaire();
      setIsCollapsed(true);
      toast.success('Questionnaire submitted! Generating your strategy...');
    } else {
      // Paid plans: show warning
      setShowSubmitWarning(true);
    }
  };

  const handleConfirmFinalSubmit = () => {
    setShowSubmitWarning(false);
    setFinalSubmitted(true);
    completeQuestionnaire();
    setIsCollapsed(true);
    toast.success('All packets submitted! Your AI agents are now generating strategies...');
  };

  // Upgrade flow handlers
  const handleStartOver = () => {
    setShowUpgradeDialog(false);
    setFinalSubmitted(false);
    setIsCollapsed(false);
    resetQuestionnaire();
    setShowFinalSummary(false);
    toast.info('Starting fresh! Take your time with detailed responses.');
  };

  const handleEditResponses = () => {
    setShowUpgradeDialog(false);
    setFinalSubmitted(false);
    setIsCollapsed(false);
    // Unlock all packets for editing — user stays on summary to see all answers
    for (let i = 0; i < 7; i++) {
      editPacket(i);
    }
    setCurrentPacket(0);
    setShowFinalSummary(true);
    toast.info('Review and edit your previous responses. Click "Edit" on any packet.');
  };

  const handleKeepResponses = () => {
    setShowUpgradeDialog(false);
    setFinalSubmitted(false);
    setIsCollapsed(false);
    // Always show warning before final submit
    setShowSubmitWarning(true);
  };

  const handleUpgradePlan = (newPlan: 'enterprise' | 'premium') => {
    setShowUpgradePicker(false);
    handlePlanUpgrade('entry', newPlan);
    setShowUpgradeDialog(false); // Disable old modal — choices are inline now
    useAppStore.setState({ planType: newPlan });
    setFinalSubmitted(false);
    setIsCollapsed(false);
    setShowFinalSummary(true);
  };

  // Collapsed/completed state
  if (finalSubmitted && isCollapsed) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-500/30 rounded-xl p-4 max-w-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">BrandOS Questionnaire Completed</h4>
                <p className="text-xs text-muted-foreground">
                  {data.name || 'Your company'} • All 7 packets confirmed
                </p>
              </div>
            </div>
            {planType === 'entry' && (
              <div className="relative">
                <Button
                  size="sm"
                  onClick={() => setShowUpgradePicker(!showUpgradePicker)}
                  className="btn-primary-gradient gap-1 text-xs"
                >
                  <ArrowUp className="w-3 h-3" /> Upgrade Plan
                </Button>
                {showUpgradePicker && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg p-2 z-50 min-w-[160px]">
                    <button
                      onClick={() => handleUpgradePlan('enterprise')}
                      className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Foundation — $499
                    </button>
                    <button
                      onClick={() => handleUpgradePlan('premium')}
                      className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      Growth Suite — $999
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        <UpgradeDialog
          isOpen={showUpgradeDialog}
          onStartOver={handleStartOver}
          onEditResponses={handleEditResponses}
          onKeepResponses={handleKeepResponses}
          upgradedToPlan={upgradedToPlan}
        />

        <SubmitWarningDialog
          isOpen={showSubmitWarning}
          onClose={() => setShowSubmitWarning(false)}
          onConfirmSubmit={handleConfirmFinalSubmit}
        />
      </>
    );
  }

  const confirmedCount = packetStatuses.filter(s => s === 'confirmed').length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl shadow-lg max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-hover p-4 text-primary-foreground">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold text-lg">BrandOS Conversation</h3>
              <p className="text-sm opacity-90">
                {showFinalSummary
                  ? 'Final Review • All 7 packets'
                  : `Packet ${currentPacket + 1} of 7 • ${confirmedCount}/7 confirmed`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost" size="sm"
                onClick={() => setShowPacketList(!showPacketList)}
                className="bg-white/20 hover:bg-white/30 text-white gap-1.5"
              >
                <Package className="w-4 h-4" />
                Packets
              </Button>
              <Button
                variant="ghost" size="sm"
                onClick={handleUploadClick}
                className="bg-white/20 hover:bg-white/30 text-white gap-1.5"
              >
                <FileUp className="w-4 h-4" />
                Upload
              </Button>
              <Button
                variant="ghost" size="sm"
                onClick={() => {
                  toast.success('Analyzing documents with AI...');
                  setTimeout(() => {
                    autoFillFromDocuments();
                    setShowAutoFilledReview(true);
                    setShowFinalSummary(false);
                    toast.success('All 53 questions answered automatically!');
                  }, 2000);
                }}
                className="bg-yellow-400/90 hover:bg-yellow-400 text-black gap-1.5 font-semibold"
              >
                ⚡ Demo Auto-Fill
              </Button>
            </div>
          </div>

          {/* Flow info */}
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
            <FileText className="w-4 h-4" />
            <span className="font-medium text-sm">{currentFlowInfo.label}</span>
            <span className="text-xs opacity-75">• {currentFlowInfo.description}</span>
            {planType && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                  {planType === 'entry' ? 'Free Trial' : planType === 'enterprise' ? 'Foundation' : 'Growth Suite'}
                </span>
                {planType === 'entry' && (
                  <div className="relative">
                    <button
                      onClick={() => setShowUpgradePicker(!showUpgradePicker)}
                      className="text-xs bg-white/30 hover:bg-white/40 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                    >
                      <ArrowUp className="w-3 h-3" /> Upgrade
                    </button>
                    {showUpgradePicker && (
                      <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg p-2 z-50 min-w-[160px]">
                        <button
                          onClick={() => handleUpgradePlan('enterprise')}
                          className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                        >
                          Foundation — $499
                        </button>
                        <button
                          onClick={() => handleUpgradePlan('premium')}
                          className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                        >
                          Growth Suite — $999
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(confirmedCount / 7) * 100}%` }}
            />
          </div>

          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" multiple onChange={handleFileChange} className="hidden" />
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="px-4 py-2 bg-secondary/30 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-background rounded-lg px-3 py-1.5 text-sm">
                  <File className="w-4 h-4 text-primary" />
                  <span className="text-foreground truncate max-w-[150px]">{file.name}</span>
                  <button onClick={() => removeFile(idx)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packet List (collapsible sidebar) */}
        <AnimatePresence>
          {showPacketList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-border"
            >
              <ScrollArea className="max-h-[300px]">
                <div className="p-3 space-y-2">
                  {PACKETS.map((packet, idx) => (
                    <PacketConfirmation
                      key={packet.id}
                      packetIndex={idx}
                      status={packetStatuses[idx]}
                      onConfirm={() => confirmPacket(idx)}
                      onEdit={() => editPacket(idx)}
                      onSelect={() => {
                        if (packetStatuses[idx] !== 'pending') {
                          setCurrentPacket(idx);
                          setShowPacketList(false);
                        }
                      }}
                      answers={getPacketAnswers(idx, data)}
                      fieldLabels={PACKET_FIELD_LABELS[idx] || {}}
                    />
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Packet Progress Dots */}
        <div className="px-4 py-3 border-b border-border bg-secondary/20">
          <div className="flex items-center justify-between">
            {PACKETS.map((packet, idx) => (
              <div key={packet.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (packetStatuses[idx] !== 'pending') {
                      setCurrentPacket(idx);
                      setShowFinalSummary(false);
                    }
                  }}
                  disabled={packetStatuses[idx] === 'pending'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    packetStatuses[idx] === 'confirmed'
                      ? 'bg-green-500 text-white'
                      : idx === currentPacket && !showFinalSummary
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                      : packetStatuses[idx] === 'pending'
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary/20 text-primary cursor-pointer'
                  }`}
                >
                  {packetStatuses[idx] === 'confirmed' ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </button>
                {idx < PACKETS.length - 1 && (
                  <div className={`w-4 md:w-6 h-0.5 mx-0.5 transition-colors ${
                    packetStatuses[idx] === 'confirmed' ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
            {/* Final summary dot */}
            <div className="flex items-center">
              <div className={`w-4 md:w-6 h-0.5 mx-0.5 transition-colors ${
                allPacketsConfirmed ? 'bg-green-500' : 'bg-muted'
              }`} />
              <button
                onClick={() => { if (allPacketsConfirmed) setShowFinalSummary(true); }}
                disabled={!allPacketsConfirmed}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  showFinalSummary
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                    : allPacketsConfirmed
                    ? 'bg-green-500 text-white cursor-pointer'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                ✓
              </button>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {showAutoFilledReview ? (
            <ScrollArea className="max-h-[500px]">
              <AutoFilledBanner />
              <FinalSummaryPacket
                data={data}
                planType={planType}
                previousPlan={previousPlanType as 'entry' | null}
                showUpgradeChoices={false}
                upgradedToPlan={upgradedToPlan}
                onStartOver={handleStartOver}
                onEditResponses={handleEditResponses}
                onKeepResponses={handleKeepResponses}
                onEditPacket={(idx) => {
                  editPacket(idx);
                  setShowAutoFilledReview(false);
                }}
              />
            </ScrollArea>
          ) : showFinalSummary ? (
            <FinalSummaryPacket
              data={data}
              planType={planType}
              previousPlan={previousPlanType as 'entry' | null}
              showUpgradeChoices={true}
              upgradedToPlan={upgradedToPlan}
              onStartOver={handleStartOver}
              onEditResponses={handleEditResponses}
              onKeepResponses={handleKeepResponses}
              onEditPacket={(idx) => {
                editPacket(idx);
                setShowFinalSummary(false);
              }}
            />
          ) : (
            <ScrollArea className="max-h-[400px]">
              <AnimatePresence mode="wait">
              {currentStatus === 'review' ? (
                <motion.div
                  key={`review-${currentPacket}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="bg-accent/30 border border-primary/20 rounded-xl p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      Review: {PACKETS[currentPacket].title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      Please review your answers below. Once confirmed, this packet will be locked.
                    </p>

                    <div className="space-y-2">
                      {Object.entries(getPacketAnswers(currentPacket, data)).map(([key, value]) => {
                        if (!value) return null;
                        const label = (PACKET_FIELD_LABELS[currentPacket] || {})[key] || key;
                        return (
                          <div key={key} className="bg-background rounded-lg p-3 border border-border">
                            <span className="text-xs font-medium text-muted-foreground">{label}</span>
                            <p className="text-sm text-foreground mt-0.5 whitespace-pre-wrap">{value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <PacketForm
                  key={`form-${currentPacket}`}
                  packetIndex={currentPacket}
                  data={data}
                  onUpdate={updateData}
                />
              )}
            </AnimatePresence>
          </ScrollArea>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-secondary/20">
          {showAutoFilledReview ? (
            <>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> AI-filled • Review packets above
              </div>
              <Button onClick={() => {
                setShowAutoFilledReview(false);
                setShowSubmitWarning(true);
              }} className="btn-primary-gradient gap-2">
                <Check className="w-4 h-4" /> Approve All & Submit
              </Button>
            </>
          ) : showFinalSummary ? (
            <div className="flex w-full items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-primary" /> Choose an option above to continue
            </div>
          ) : currentStatus === 'review' ? (
            <>
              <Button variant="ghost" onClick={() => editPacket(currentPacket)} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Edit Answers
              </Button>
              <Button onClick={handleConfirmPacket} className="btn-primary-gradient gap-2">
                <Check className="w-4 h-4" /> Confirm & Lock Packet
              </Button>
            </>
          ) : allPacketsConfirmed ? (
            <>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> All 7 packets confirmed
              </div>
              <Button onClick={() => setShowFinalSummary(true)} className="btn-primary-gradient gap-2">
                <Package className="w-4 h-4" /> View Final Summary
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  if (currentPacket > 0) setCurrentPacket(currentPacket - 1);
                }}
                disabled={currentPacket === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={handleReviewPacket} className="btn-primary-gradient gap-2">
                Review Answers <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Final submit warning when all packets confirmed */}
        {allPacketsConfirmed && !finalSubmitted && (
          <div className="px-6 py-3 bg-warning/10 border-t border-warning/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">
                <strong>Note:</strong> Once submitted, re-editing costs $2.00 per question and $50.00 for a full resubmission.
                Make sure all answers are accurate before submitting.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <DocumentUploadPaywall
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={handlePaywallSuccess}
      />

      <UpgradeDialog
        isOpen={showUpgradeDialog}
        onStartOver={handleStartOver}
        onEditResponses={handleEditResponses}
        onKeepResponses={handleKeepResponses}
        upgradedToPlan={upgradedToPlan}
      />

      <SubmitWarningDialog
        isOpen={showSubmitWarning}
        onClose={() => setShowSubmitWarning(false)}
        onConfirmSubmit={handleConfirmFinalSubmit}
      />
    </>
  );
}
