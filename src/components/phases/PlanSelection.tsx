import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, PlanType } from '@/store/appStore';
import { useState, useMemo } from 'react';

const allPlans = [
  {
    type: 'entry' as PlanType,
    name: 'Entry Level',
    price: '$',
    priceAmount: '49',
    period: '/mes',
    tag: null,
    features: [
      '5 búsquedas por insight',
      'Calidad estándar',
      'Dashboard básico',
      'Soporte por email',
    ],
  },
  {
    type: 'enterprise' as PlanType,
    name: 'Enterprise',
    price: '$$',
    priceAmount: '149',
    period: '/mes',
    tag: 'Recomendado',
    features: [
      '20 búsquedas por insight',
      'Calidad por encima del mercado',
      '1 Reporte mensual',
      'Análisis de competencia',
      'Soporte prioritario',
    ],
  },
  {
    type: 'premium' as PlanType,
    name: 'Top Consultancy',
    price: '$$$',
    priceAmount: '349',
    period: '/mes',
    tag: 'Premium',
    features: [
      '200 búsquedas por insight',
      'Frameworks Big Four (McKinsey)',
      'Múltiples reportes',
      'Consultor AI dedicado',
      'Integraciones avanzadas',
      'API Access',
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
  const { goBack, setPlanType, companyType, companyStage } = useAppStore();
  
  // Filter plans based on company type - Enterprise doesn't get Entry Level
  const availablePlans = useMemo(() => {
    if (companyType === 'enterprise') {
      return allPlans.filter(plan => plan.type !== 'entry');
    }
    return allPlans;
  }, [companyType]);

  const [selectedPlan, setSelectedPlan] = useState<PlanType>(
    companyType === 'enterprise' ? 'enterprise' : 'enterprise'
  );

  const handleContinue = () => {
    if (selectedPlan) {
      setPlanType(selectedPlan);
    }
  };

  const getStageLabel = () => {
    const stageLabels: Record<string, string> = {
      'preseed': 'Pre-seed',
      'traccion': 'Tracción Inicial',
      'crecimiento': 'Crecimiento Constante',
      'pyme-construccion': 'PYME en Construcción',
      'smb-2-5': 'SMB 2-5 años',
      'smb-5plus': 'SMB +5 años',
      'enterprise-stage': 'Enterprise',
    };
    return companyStage ? stageLabels[companyStage] || '' : '';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col px-4 py-8"
    >
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
            Perfil: {companyType === 'startup' ? 'Startup' : companyType === 'smb' ? 'SMB' : 'Enterprise'} • {getStageLabel()}
          </p>
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
            const isRecommended = plan.tag === 'Recomendado';
            const isPremium = plan.tag === 'Premium';

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
                } ${isRecommended ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {/* Tag */}
                {plan.tag && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      isRecommended
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    }`}
                  >
                    {isPremium && <Crown className="w-3 h-3" />}
                    {isRecommended && <Sparkles className="w-3 h-3" />}
                    {plan.tag}
                  </div>
                )}

                {/* Content */}
                <div className="text-center mb-6 pt-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.priceAmount}
                    </span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection indicator */}
                <div
                  className={`w-full py-2 rounded-lg text-center text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {isSelected ? 'Seleccionado' : 'Seleccionar'}
                </div>
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
