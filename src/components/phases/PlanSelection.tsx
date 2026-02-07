import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, PlanType, FlowType } from '@/store/appStore';
import { useState } from 'react';

const allPlans = [
  {
    type: 'entry' as PlanType,
    name: 'Free Trial',
    subtitle: 'Exploring the power of our insights.',
    priceAmount: '0',
    period: 'Free trial is available for 7 days',
    tag: null,
    cta: 'Start 7-day trial',
    features: [
      'Complete conversation',
      'Access insights on:',
      'Research, Data, Brand, Product, Media and Marketing',
    ],
  },
  {
    type: 'enterprise' as PlanType,
    name: 'Foundation Plan',
    subtitle: 'Startups and businesses that need a clear, professional marketing strategy.',
    priceAmount: '499',
    period: 'One-time payment',
    tag: null,
    cta: 'Choose Foundation',
    features: [
      '1 Custom Branded Annual Marketing Plan',
      'Industry and Market Research',
      'SWOT Analysis',
      'Buyer Persona Definition',
      'Strategies, Tactics & KPIs',
      '2 user seats (1 free, 1 paid)',
    ],
  },
  {
    type: 'premium' as PlanType,
    name: 'Growth Suite',
    subtitle: 'Businesses looking to execute, measure, and optimize their marketing continuously.',
    priceAmount: '999',
    period: 'As low as',
    tag: 'Best Value',
    cta: 'Choose Growth',
    features: [
      'Everything in the Foundation Plan, plus:',
      'AI Content Generator (up to 500)',
      'KPI Dashboard to measure results',
      'Integrate with your platforms (APIs) *Coming soon',
      'Create weekly, monthly & quarterly reports *Coming soon',
      '3 user seats (2 free, 1 paid)',
    ],
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

export function PlanSelection() {
  const { goBack, setPlanType, companyType, companyStage, flowType } = useAppStore();
  
  // All plans available for everyone now
  const availablePlans = allPlans;

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('enterprise');

  const totalSteps = companyType === 'enterprise' ? 4 : 5;
  const currentStep = totalSteps - 1;

  const handleContinue = () => {
    if (selectedPlan) {
      setPlanType(selectedPlan);
    }
  };

  const getStageLabel = () => {
    const labels: Record<string, string> = {
      'preseed-construccion': 'Pre-seed/Construcción',
      'pequena-traccion': 'Seed',
      'semilla': 'Grow',
      'smb-preseed': '0-1 años de operación',
      'smb-traccion': '1-2 años de operación',
      'smb-2-5': 'Más de 2 años de operación',
      'enterprise-stage': 'Enterprise',
    };
    return companyStage ? labels[companyStage] || '' : '';
  };

  const getFlowLabel = (flow: FlowType) => {
    const labels: Record<string, string> = {
      'completo': 'Completo',
      'estrategico': 'Estratégico',
      'tactico': 'Táctico',
    };
    return flow ? labels[flow] || '' : '';
  };

  const getCompanyLabel = () => {
    if (companyType === 'startup') return 'Startup';
    if (companyType === 'smb') return 'SMB';
    return 'Enterprise';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col px-4 py-8"
    >
      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-primary font-medium">Paso {currentStep}</span>
          <span>de</span>
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
        className="flex items-center gap-4 mb-8"
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
            Elige tu plan
          </h1>
          <p className="text-muted-foreground text-sm">
            {getCompanyLabel()} • {getStageLabel()} • Flujo {getFlowLabel(flowType)}
          </p>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto w-full mb-6"
      >
        <div className="bg-secondary/30 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-foreground mb-2">Resumen de tu selección</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground">
              {getCompanyLabel()}
            </span>
            <span className="px-3 py-1 bg-background rounded-full text-xs text-muted-foreground">
              {getStageLabel()}
            </span>
            <span className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
              Flujo {getFlowLabel(flowType)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <motion.div
        variants={containerVariants}
        className="flex-1 flex items-center justify-center"
      >
        <div className={`grid gap-6 max-w-5xl w-full ${
          availablePlans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {availablePlans.map((plan) => {
            const isSelected = selectedPlan === plan.type;
            const isBestValue = plan.tag === 'Best Value';

            return (
              <motion.div
                key={plan.type}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPlan(plan.type)}
                className={`relative card-interactive p-6 cursor-pointer ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20'
                    : ''
                } ${isBestValue ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Tag */}
                {plan.tag && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-primary text-primary-foreground"
                  >
                    <Sparkles className="w-3 h-3" />
                    {plan.tag}
                  </div>
                )}

                {/* Content */}
                <div className="text-center mb-4 pt-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                    {plan.subtitle}
                  </p>
                  <div className="flex flex-col items-center">
                    {plan.period === 'As low as' && (
                      <span className="text-xs text-muted-foreground mb-1">{plan.period}</span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.priceAmount}
                    </span>
                    {plan.period !== 'As low as' && (
                      <span className="text-muted-foreground text-xs mt-1">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* CTA / Selection */}
                <div
                  className={`w-full py-2.5 rounded-lg text-center text-sm font-medium transition-colors mb-5 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {isSelected ? 'Seleccionado' : plan.cta}
                </div>

                {/* Key Features Header */}
                <p className="text-xs font-semibold text-foreground mb-3">Key features</p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 mt-8"
      >
        <Button variant="outline" onClick={goBack} className="px-6">
          Volver
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="btn-primary-gradient px-8"
        >
          Iniciar Conversación
        </Button>
      </motion.div>
    </motion.div>
  );
}
