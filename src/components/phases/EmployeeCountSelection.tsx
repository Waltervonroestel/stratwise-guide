import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore, EnterpriseSize } from '@/store/appStore';

const sizeOptions: { size: EnterpriseSize; title: string; description: string }[] = [
  {
    size: '0-50',
    title: '0 to 50 employees',
    description: 'Lean enterprise team focused on agility',
  },
  {
    size: '50-100',
    title: '50 to 100 employees',
    description: 'Expanding business optimizing strategy',
  },
  {
    size: '100-500',
    title: '100 to 500 employees',
    description: 'Large organization with complex operations',
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

export function EmployeeCountSelection() {
  const { goBack, setEnterpriseSize } = useAppStore();

  const totalSteps = 5;
  const currentStep = 2;

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
            How many employees does your company have?
          </h1>
          <p className="text-muted-foreground text-sm">
            Select the range that best describes your organization's size
          </p>
        </div>
      </motion.div>

      {/* Size Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 w-full max-w-3xl grid-cols-1 md:grid-cols-3"
      >
        {sizeOptions.map((option) => (
          <motion.div
            key={option.size}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEnterpriseSize(option.size)}
            className="card-interactive p-6 cursor-pointer text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              {option.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {option.description}
            </p>
          </motion.div>
        ))}
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
