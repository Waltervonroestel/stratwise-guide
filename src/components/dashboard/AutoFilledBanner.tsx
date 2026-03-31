import { motion } from 'framer-motion';
import { Sparkles, Zap, FileCheck, Clock } from 'lucide-react';

export function AutoFilledBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 p-6 mb-5 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header with sparkle icon */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg"
          >
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-lg font-bold text-foreground"
            >
              All 53 questions answered automatically
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              Our AI agents analyzed your documents and did the work for you.
            </motion.p>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-3 py-2">
            <FileCheck className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">7 Packets</p>
              <p className="text-[10px] text-muted-foreground">Fully completed</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-3 py-2">
            <Zap className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">53 Answers</p>
              <p className="text-[10px] text-muted-foreground">AI-generated</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border/50 px-3 py-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">~45 min</p>
              <p className="text-[10px] text-muted-foreground">Time saved</p>
            </div>
          </div>
        </motion.div>

        {/* CTA message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="rounded-lg bg-primary/5 border border-primary/10 p-3"
        >
          <p className="text-sm text-foreground leading-relaxed">
            <strong>You're all set — zero typing required.</strong> We've pre-filled every question based on the documents you uploaded. 
            Review the answers below, and if something doesn't look right, just hit <strong>"Edit"</strong> on any packet to fine-tune it. 
            Once you're happy, confirm each packet and submit to generate your strategy.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}