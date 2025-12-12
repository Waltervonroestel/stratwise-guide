import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Edit3, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';

const emailDraft = {
  subject: 'Descubre cómo optimizar tu estrategia de crecimiento',
  preview: 'Hola {nombre}, hemos identificado oportunidades clave para tu negocio...',
  body: `Hola {nombre},

Esperamos que este mensaje te encuentre bien. Hemos estado analizando las tendencias del mercado y queremos compartir contigo algunas oportunidades que podrían ser relevantes para {empresa}.

**Puntos clave que hemos identificado:**

1. El sector tecnológico está experimentando un crecimiento del 45% en demanda de servicios de consultoría estratégica.

2. Las empresas que implementan estrategias de growth basadas en datos están viendo un ROI 3x mayor.

3. Existe una ventana de oportunidad para posicionarse antes que la competencia.

¿Te gustaría agendar una llamada de 15 minutos para explorar cómo podemos ayudarte a capitalizar estas oportunidades?

Saludos,
El equipo de Faststrat`,
};

export function DraftView() {
  const { selectedNotification, goBack } = useAppStore();
  const [content, setContent] = useState(emailDraft.body);
  const [isEditing, setIsEditing] = useState(false);

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
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="font-heading font-semibold text-foreground">{selectedNotification.title}</h1>
              <p className="text-xs text-muted-foreground">Borrador - Última edición hace 1 hora</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Vista previa' : 'Editar'}
          </Button>
          <Button className="btn-primary-gradient gap-2">
            <Send className="w-4 h-4" />
            Enviar
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Warning Banner */}
          {selectedNotification.status === 'critical' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-warning-light border border-warning/30 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Revisión requerida</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Este borrador necesita ser revisado antes de enviarse. Verifica el contenido y los CTAs.
                </p>
              </div>
            </motion.div>
          )}

          {/* Email Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            {/* Email Header */}
            <div className="p-4 border-b border-border bg-secondary/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground w-16">Asunto:</span>
                  <span className="text-sm text-foreground font-medium">{emailDraft.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground w-16">Preview:</span>
                  <span className="text-sm text-muted-foreground">{emailDraft.preview}</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6">
              {isEditing ? (
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  {content.split('\n').map((line, idx) => (
                    <p key={idx} className={`text-foreground ${line.startsWith('**') ? 'font-semibold' : ''}`}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Palabras', value: content.split(' ').length },
              { label: 'Caracteres', value: content.length },
              { label: 'Tiempo lectura', value: '~2 min' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
