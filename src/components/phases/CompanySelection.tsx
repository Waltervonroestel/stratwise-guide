import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Building2 } from 'lucide-react';
import { useAppStore, CompanyType } from '@/store/appStore';

const companyCards = [
  {
    type: 'startup' as CompanyType,
    title: 'Startup',
    subtitle: 'Pre-seed, primeros clientes o crecimiento temprano',
    icon: Rocket,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    type: 'smb' as CompanyType,
    title: 'SMB',
    subtitle: 'Negocios en operación de 0 a 5+ años',
    icon: TrendingUp,
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    type: 'enterprise' as CompanyType,
    title: 'Enterprise',
    subtitle: 'Organizaciones grandes que requieren profundidad estratégica',
    icon: Building2,
    gradient: 'from-slate-600 to-slate-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function CompanySelection() {
  const setCompanyType = useAppStore((state) => state.setCompanyType);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-xl">F</span>
          </div>
          <span className="font-heading font-bold text-2xl text-foreground">Faststrat</span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3 text-center"
      >
        Selecciona tu tipo de empresa
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-muted-foreground text-lg mb-12 text-center max-w-md"
      >
        Personalizaremos tu experiencia estratégica
      </motion.p>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        {companyCards.map((card) => (
          <motion.button
            key={card.type}
            variants={cardVariants}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCompanyType(card.type)}
            className="card-interactive p-8 flex flex-col items-center text-center cursor-pointer group"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
            >
              <card.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {card.subtitle}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
