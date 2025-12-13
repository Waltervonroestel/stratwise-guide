import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { CompanySelection } from '@/components/phases/CompanySelection';
import { StageSelection } from '@/components/phases/StageSelection';
import { PlanSelection } from '@/components/phases/PlanSelection';
import { Dashboard } from '@/components/phases/Dashboard';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const Index = () => {
  const phase = useAppStore((state) => state.phase);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="phase1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CompanySelection />
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div
            key="phase2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <StageSelection />
          </motion.div>
        )}
        {phase === 3 && (
          <motion.div
            key="phase3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PlanSelection />
          </motion.div>
        )}
        {phase === 4 && (
          <motion.div
            key="phase4"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
