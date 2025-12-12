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
      '¡Hola! Soy tu asistente estratégico de Faststrat. Para comenzar a desarrollar tu estrategia personalizada, necesito conocer mejor tu negocio. Completa el siguiente cuestionario:',
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
            'Excelente pregunta. Basado en tu perfil y los datos que me compartiste, puedo ayudarte a desarrollar una estrategia enfocada en ese aspecto.',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Glosario de terminos</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-success h-2 rounded-full w-40 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '30%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-success rounded-full"
            />
          </div>
          <span className="text-sm text-muted-foreground">16/53 (30%)</span>
        </div>
      </header>

      {/* Team Avatars */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {['MARKETING', 'RESEARCH', 'DATA', 'PRODUCT', 'BRAND', 'MEDIA'].map(
            (team, idx) => (
              <motion.div
                key={team}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg border border-border min-w-fit ${
                  idx === 0 ? 'bg-primary/10 border-primary/30' : 'bg-card'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                <div>
                  <div className="text-xs font-medium text-foreground">{team}</div>
                  <div className="text-xs text-muted-foreground">
                    {['Marta', 'Rikki', 'Dana', 'Pablo', 'Brenda', 'Matt'][idx]}
                  </div>
                </div>
              </motion.div>
            )
          )}
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                      alt="AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm">
                    <p className="text-foreground text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}

              {message.type === 'user' && (
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-4 max-w-xl">
                    <p className="text-sm leading-relaxed">{message.content}</p>
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm">
                <p className="text-foreground text-sm leading-relaxed">
                  ¡Excelente! He recibido toda la información. Ahora estoy analizando tus
                  respuestas para generar una estrategia personalizada. Esto tomará solo
                  unos momentos...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
            <Package className="w-3 h-3" />
            Ver Paquetes
          </button>
          <span className="text-xs text-muted-foreground">Paquete 3 activo</span>
          <div className="ml-auto">
            <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              MODO BORRADOR ACTIVO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground px-2"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="h-8 w-8 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
