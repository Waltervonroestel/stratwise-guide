import { motion, AnimatePresence } from 'framer-motion';
import { X, FileUp, CreditCard, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';

interface DocumentUploadPaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DocumentUploadPaywall({ isOpen, onClose, onSuccess }: DocumentUploadPaywallProps) {
  const { purchaseDocumentAddon } = useAppStore();

  const handlePurchase = () => {
    // Simulate payment process
    purchaseDocumentAddon();
    onSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-primary-foreground relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FileUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl">Auto-completar con Documentos</h3>
                    <p className="text-base opacity-90">Add-on Premium</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-lg text-foreground">Beneficios incluidos:</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'Sube PDFs, Word, Excel o presentaciones',
                      'Auto-completado inteligente con IA',
                      'Extracción de datos de tus documentos',
                      'Ahorra tiempo llenando formularios',
                      'Uso ilimitado de documentos',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-base text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">$29</span>
                    <span className="text-lg text-muted-foreground">/único pago</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Acceso permanente a esta funcionalidad
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <Button 
                    onClick={handlePurchase}
                    className="w-full btn-primary-gradient gap-2 h-14 text-lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    Comprar Ahora
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={onClose}
                    className="w-full h-12"
                  >
                    Quizás más tarde
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
