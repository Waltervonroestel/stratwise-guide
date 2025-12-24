import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Target, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, FlowType, getAvailableFlows } from '@/store/appStore';

const flowOptions = [
  {
    type: 'completo' as FlowType,
    title: 'Completo',
    description: 'Plan completo desde cero (todas las preguntas)',
    icon: FileText,
    detail: 'Ideal si estás empezando o quieres una estrategia integral',
  },
  {
    type: 'estrategico' as FlowType,
    title: 'Estratégico',
    description: 'Solo estrategias (ya tienes plan principal)',
    icon: Target,
    detail: 'Perfecto si ya tienes dirección pero necesitas refinar tu enfoque',
  },
  {
    type: 'tactico' as FlowType,
    title: 'Táctico',
    description: 'Solo tácticas de implementación',
    icon: Wrench,
    detail: 'Para cuando necesitas acciones concretas de ejecución',
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
  
  const totalSteps = companyType === 'enterprise' ? 3 : 4;
  const currentStep = companyType === 'enterprise' ? 2 : 3;

  const getCompanyLabel = () => {
    if (companyType === 'startup') return 'Startup';
    if (companyType === 'smb') return 'SMB';
    return 'Enterprise';
  };

  const getStageLabel = () => {
    const labels: Record<string, string> = {
      'preseed-construccion': 'Pre-seed/Construcción',
      'pequena-traccion': 'Pequeña tracción',
      'semilla': 'Semilla',
      'smb-preseed': 'Pre-seed/Construcción',
      'smb-traccion': 'Pequeña tracción',
      'smb-2-5': '2-5 años',
      'smb-5plus': '+5 años',
      'enterprise-stage': 'Enterprise',
    };
    return companyStage ? labels[companyStage] || '' : '';
  };

  const handleFlowSelect = (flow: FlowType) => {
    setFlowType(flow);
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
            ¿Qué tipo de flujo necesitas?
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
          return (
            <motion.div
              key={option.type}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFlowSelect(option.type)}
              className="card-interactive p-6 cursor-pointer"
            >
              <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {option.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {option.description}
              </p>
              <p className="text-xs text-muted-foreground/80 italic">
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
          Volver
        </Button>
      </motion.div>
    </motion.div>
  );
}
