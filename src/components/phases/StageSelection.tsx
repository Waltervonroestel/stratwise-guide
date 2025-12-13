import { motion } from 'framer-motion';
import { ArrowLeft, Sprout, Zap, TrendingUp, Building, Timer, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, CompanyStage } from '@/store/appStore';

const stageOptions = {
  startup: [
    {
      stage: 'preseed' as CompanyStage,
      title: 'Pre-seed',
      description: 'Idea o MVP, buscando validación inicial',
      icon: Sprout,
    },
    {
      stage: 'traccion' as CompanyStage,
      title: 'Tracción Inicial',
      description: 'Primeros clientes, validando product-market fit',
      icon: Zap,
    },
    {
      stage: 'crecimiento' as CompanyStage,
      title: 'Crecimiento Constante',
      description: 'Escalando operaciones y equipo',
      icon: TrendingUp,
    },
  ],
  smb: [
    {
      stage: 'pyme-construccion' as CompanyStage,
      title: 'PYME en Construcción de Marca',
      description: 'Estableciendo presencia y posicionamiento',
      icon: Building,
    },
    {
      stage: 'smb-2-5' as CompanyStage,
      title: 'SMB 2-5 Años',
      description: 'Negocio consolidado buscando expansión',
      icon: Timer,
    },
    {
      stage: 'smb-5plus' as CompanyStage,
      title: 'SMB +5 Años',
      description: 'Empresa madura con operaciones estables',
      icon: Award,
    },
  ],
  enterprise: [
    {
      stage: 'enterprise-stage' as CompanyStage,
      title: 'Enterprise',
      description: 'Organización grande con necesidades estratégicas complejas',
      icon: Building,
    },
  ],
};

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

export function StageSelection() {
  const { goBack, setCompanyStage, companyType } = useAppStore();

  if (!companyType) return null;

  const stages = stageOptions[companyType];
  const companyLabel = companyType === 'startup' ? 'Startup' : companyType === 'smb' ? 'SMB' : 'Enterprise';

  const handleStageSelect = (stage: CompanyStage) => {
    setCompanyStage(stage);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
    >
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
            ¿En qué etapa está tu {companyLabel}?
          </h1>
          <p className="text-muted-foreground text-sm">
            Selecciona la etapa que mejor describe tu situación actual
          </p>
        </div>
      </motion.div>

      {/* Stage Cards */}
      <motion.div
        variants={containerVariants}
        className={`grid gap-6 w-full max-w-3xl ${
          stages.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 
          stages.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
          'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {stages.map((option) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.stage}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStageSelect(option.stage)}
              className="card-interactive p-6 cursor-pointer text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                {option.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {option.description}
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
