import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

const competitors = [
  { name: 'Competitor A', market: 25, growth: 12, trend: 'up' },
  { name: 'Competitor B', market: 18, growth: -3, trend: 'down' },
  { name: 'Competitor C', market: 15, growth: 8, trend: 'up' },
  { name: 'Competitor D', market: 12, growth: 0, trend: 'neutral' },
  { name: 'Tu Empresa', market: 8, growth: 45, trend: 'up', highlight: true },
];

export function ReportView() {
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
      <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-foreground">{selectedNotification.title}</h1>
              <p className="text-xs text-muted-foreground">Actualizado hace 24 horas</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Descargar
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              Resumen Ejecutivo
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {selectedNotification.description}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { label: 'Competidores Analizados', value: '15', change: '+3 vs Q2' },
              { label: 'Cuota de Mercado Promedio', value: '12%', change: '-2% vs Q2' },
              { label: 'Crecimiento Sector', value: '+18%', change: 'YoY' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-5">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            ))}
          </motion.div>

          {/* Competitor Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-heading font-semibold text-foreground">
                Análisis Comparativo
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Cuota de Mercado
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Crecimiento
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tendencia
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {competitors.map((comp, idx) => (
                    <tr key={idx} className={comp.highlight ? 'bg-primary/5' : ''}>
                      <td className="px-4 py-4">
                        <span className={`font-medium ${comp.highlight ? 'text-primary' : 'text-foreground'}`}>
                          {comp.name}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${comp.highlight ? 'bg-primary' : 'bg-muted-foreground'}`}
                              style={{ width: `${comp.market * 4}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{comp.market}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-sm font-medium ${comp.growth > 0 ? 'text-success' : comp.growth < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                          {comp.growth > 0 ? '+' : ''}{comp.growth}%
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {comp.trend === 'up' && <TrendingUp className="w-5 h-5 text-success" />}
                        {comp.trend === 'down' && <TrendingDown className="w-5 h-5 text-destructive" />}
                        {comp.trend === 'neutral' && <Minus className="w-5 h-5 text-muted-foreground" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
