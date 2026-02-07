import { motion } from 'framer-motion';
import { ArrowLeft, Sprout, Zap, TrendingUp, Building, Timer, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, CompanyStage } from '@/store/appStore';

const stageOptions = {
  startup: [
    {
      stage: 'preseed-construccion' as CompanyStage,
      title: 'Pre-seed/Building',
      description: 'In the ideation or initial building phase',
      icon: Sprout,
    },
    {
      stage: 'pequena-traccion' as CompanyStage,
      title: 'Seed',
      description: 'Has some initial clients or users',
      icon: Zap,
    },
    {
      stage: 'semilla' as CompanyStage,
      title: 'Growth',
      description: 'Has obtained seed funding with demonstrable traction',
      icon: Rocket,
    },
  ],
  smb: [
    {
      stage: 'smb-preseed' as CompanyStage,
      title: '0-1 years of operation',
      description: 'New or rebuilding business',
      icon: Building,
    },
    {
      stage: 'smb-traccion' as CompanyStage,
      title: '1-2 years of operation',
      description: 'Some clients but limited growth',
      icon: Zap,
    },
    {
      stage: 'smb-2-5' as CompanyStage,
      title: '2+ years of operation',
      description: 'Established business with over 2 years of operation',
      icon: Timer,
    },
  ],
  enterprise: [],
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

  if (!companyType || companyType === 'enterprise') return null;

  const stages = stageOptions[companyType];
  const companyLabel = companyType === 'startup' ? 'Startup' : 'SMB';
  const totalSteps = 5;
  const currentStep = 2;

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
            What stage is your {companyLabel} at?
          </h1>
          <p className="text-muted-foreground text-sm">
            Select the stage that best describes your current situation
          </p>
        </div>
      </motion.div>

      {/* Stage Cards */}
      <motion.div
        variants={containerVariants}
        className={`grid gap-6 w-full max-w-4xl ${
          stages.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 
          stages.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
          'grid-cols-1 md:grid-cols-2'
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
          Back
        </Button>
      </motion.div>
    </motion.div>
  );
}
