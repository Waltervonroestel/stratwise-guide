import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RefreshCw, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandOSQuestionnaire } from './BrandOSQuestionnaire';
import { useAppStore } from '@/store/appStore';

interface Message {
  id: string;
  type: 'ai' | 'user' | 'widget';
  content?: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content:
      'Toda gran empresa tiene un propósito. ¿Cuál es la misión que impulsa a la tuya?',
  },
  {
    id: '2',
    type: 'widget',
  },
];

export function ChatArea() {
  const { questionnaireCompleted } = useAppStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content:
            'Interesante. ¿Y cuál es tu modelo de ingresos principal? ¿Contratos a largo plazo, compras puntuales, suscripciones? Descríbemelo un poco.',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-card">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-secondary rounded-lg border border-border">
            <span className="text-sm font-medium text-foreground">A</span>
          </div>
          <span className="text-sm text-foreground font-medium">Glosario de terminos</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-48 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '17%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-success rounded-full"
            />
          </div>
          <span className="text-sm text-muted-foreground">9/53 (17%)</span>
        </div>
      </header>

      {/* Team Avatars */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { name: 'MARKETING', person: 'Marta', active: true },
            { name: 'RESEARCH', person: 'Rikki', active: false },
            { name: 'DATA', person: 'Dana', active: false },
            { name: 'PRODUCT', person: 'Pablo', active: false },
            { name: 'BRAND', person: 'Brenda', active: false },
            { name: 'MEDIA', person: 'Matt', active: false },
          ].map((team, idx) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border min-w-fit cursor-pointer transition-colors ${
                team.active
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card border-border hover:bg-secondary/50'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    ['1573496359142-b8d87734a5a2', '1507003211169-0a1dd7228f2d', '1438761681033-6461ffad8d80', '1500648767791-00dcc994a43e', '1494790108377-be9c29b29330', '1472099645785-5658abf4ff4e'][idx]
                  }?w=80&h=80&fit=crop&crop=face`}
                  alt={team.person}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">{team.name}</div>
                <div className="text-xs text-muted-foreground">{team.person}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {message.type === 'ai' && (
                <div className="flex gap-4 max-w-3xl">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                      alt="AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border-l-4 border-l-primary rounded-r-xl p-4 shadow-sm">
                      <p className="text-foreground text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {message.type === 'user' && (
                <div className="flex justify-end pl-16">
                  <div className="bg-primary/5 border-l-4 border-l-primary rounded-r-xl p-4 max-w-2xl">
                    <p className="text-foreground text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )}

              {message.type === 'widget' && <BrandOSQuestionnaire />}
            </motion.div>
          ))}

          {questionnaireCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 max-w-3xl"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-card border-l-4 border-l-primary rounded-r-xl p-4 shadow-sm">
                  <p className="text-foreground text-sm leading-relaxed">
                    ¡Excelente! He recibido toda la información. Ahora estoy analizando tus
                    respuestas para generar una estrategia personalizada...
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <span className="text-xs text-muted-foreground ml-2">Esperando respuesta, por favor no cierres la pestaña ni la sesión...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex items-center gap-2 mb-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors">
            <Package className="w-3 h-3" />
            Ver Paquetes
          </button>
          <span className="text-xs text-muted-foreground">Paquete 1 activo</span>
          <div className="ml-auto">
            <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              MODO BORRADOR ACTIVO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-secondary/50 border border-border rounded-xl p-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-medium text-sm">F</span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="h-9 w-9 bg-success hover:bg-success/90 text-white rounded-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
