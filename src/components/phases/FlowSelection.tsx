import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Target, Wrench, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, FlowType, getAvailableFlows } from '@/store/appStore';
import { useState } from 'react';
import { toast } from 'sonner';

const flowOptions = [
  {
    type: 'completo' as FlowType,
    title: 'Blueprint Builder',
    description: 'Build your full marketing strategy from scratch — step by step, question by question.',
    icon: FileText,
    detail: 'Ideal if you\'re starting out or want a comprehensive strategy tailored to your business',
    available: true,
  },
  {
    type: 'estrategico' as FlowType,
    title: 'Strategy Accelerator',
    description: 'We automate the heavy lifting so you can skip ahead to a refined, data-driven strategy in less time.',
    icon: Target,
    detail: 'Coming soon — available in approximately 2 months',
    available: false,
  },
  {
    type: 'tactico' as FlowType,
    title: 'Action Autopilot',
    description: 'Let AI handle the execution plan — get concrete, ready-to-launch tactics delivered automatically.',
    icon: Wrench,
    detail: 'Coming soon — available in approximately 2 months',
    available: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: { opacity: 0, x: -50 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function FlowSelection() {
  const { goBack, setFlowType, companyType, companyStage } = useAppStore();

  const availableFlows = getAvailableFlows(companyType, companyStage);
  const flows = flowOptions.filter(f => availableFlows.includes(f.type));
  
  const totalSteps = 5;
  const currentStep = 3;

  const getCompanyLabel = () => {
    if (companyType === 'startup') return 'Startup';
    if (companyType === 'smb') return 'SMB';
    return 'Enterprise';
  };

  const getStageLabel = () => {
    const labels: Record<string, string> = {
      'preseed-construccion': 'Pre-seed/Building',
      'pequena-traccion': 'Seed',
      'semilla': 'Grow',
      'smb-preseed': '0-1 years',
      'smb-traccion': '1-2 years',
      'smb-2-5': '2+ years',
      'enterprise-stage': 'Enterprise',
    };
    return companyStage ? labels[companyStage] || '' : '';
  };

  const handleFlowSelect = (option: typeof flowOptions[0]) => {
    if (!option.available) {
      toast.info('Coming Soon!', {
        description: `${option.title} is currently under development and will be available in approximately 2 months. Stay tuned!`,
        duration: 4000,
      });
      return;
    }
    setFlowType(option.type);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
    >
      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-primary font-medium">Step {currentStep}</span>
          <span>of</span>
          <span>{totalSteps}</span>
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 rounded-full transition-colors ${
                i < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8 w-full max-w-3xl"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            What type of workflow do you need?
          </h1>
          <p className="text-muted-foreground text-sm">
            {getCompanyLabel()} • {getStageLabel()}
          </p>
        </div>
      </motion.div>

      {/* Flow Cards */}
      <motion.div
        variants={containerVariants}
        className={`grid gap-6 w-full max-w-4xl ${
          flows.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl' :
          flows.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
          'grid-cols-1'
        }`}
      >
        {flows.map((option) => {
          const Icon = option.icon;
          const isDisabled = !option.available;
          return (
            <motion.div
              key={option.type}
              variants={cardVariants}
              whileHover={isDisabled ? {} : { y: -4, scale: 1.02 }}
              whileTap={isDisabled ? {} : { scale: 0.98 }}
              onClick={() => handleFlowSelect(option)}
              className={`relative card-interactive p-6 cursor-pointer transition-all ${
                isDisabled
                  ? 'opacity-50 grayscale border-muted'
                  : 'ring-2 ring-primary/20 border-primary shadow-lg'
              }`}
            >
              {/* Coming Soon Badge */}
              {isDisabled && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-muted text-muted-foreground border border-border">
                  <Lock className="w-3 h-3" />
                  Coming Soon
                </div>
              )}

              {/* Recommended Badge for Blueprint Builder */}
              {option.available && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-primary text-primary-foreground">
                  ✦ Recommended
                </div>
              )}

              <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center ${
                isDisabled ? 'bg-muted' : 'bg-primary/10'
              }`}>
                <Icon className={`w-7 h-7 ${isDisabled ? 'text-muted-foreground' : 'text-primary'}`} />
              </div>
              <h3 className={`font-heading text-xl font-semibold mb-2 ${
                isDisabled ? 'text-muted-foreground' : 'text-foreground'
              }`}>
                {option.title}
              </h3>
              <p className={`text-sm mb-3 ${
                isDisabled ? 'text-muted-foreground/60' : 'text-muted-foreground'
              }`}>
                {option.description}
              </p>
              <p className={`text-xs italic ${
                isDisabled ? 'text-muted-foreground/50' : 'text-muted-foreground/80'
              }`}>
                {option.detail}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <Button variant="outline" onClick={goBack}>
          Back
        </Button>
      </motion.div>
    </motion.div>
  );
}
