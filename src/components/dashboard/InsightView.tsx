import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

export function InsightView() {
  const { selectedNotification, goBack } = useAppStore();

  if (!selectedNotification) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-screen bg-background"
    >
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center gap-4 px-6 bg-card">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="font-heading font-semibold text-foreground">Strategic Insight</h1>
            <p className="text-xs text-muted-foreground">Auto-generated</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              {selectedNotification.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {selectedNotification.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Key Findings
            </h3>
            <ul className="space-y-3">
              {[
                '45% growth in demand for strategic consulting services',
                'Technology companies show greater willingness to invest in advisory',
                'Direct competitors have not yet penetrated this segment',
              ].map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{finding}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h3 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Recommendations
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Develop a specific value proposition', desc: 'Create messaging focused on the tech sector pain points' },
                { title: 'Educational content campaign', desc: 'Publish case studies and practical guides for CTOs and founders' },
                { title: 'Strategic alliances', desc: 'Identify incubators and accelerators as distribution channels' },
              ].map((rec, idx) => (
                <div key={idx} className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <Button className="btn-primary-gradient">
              Generate Action Plan
            </Button>
            <Button variant="outline">
              Export PDF
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
