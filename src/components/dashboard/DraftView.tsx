import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Edit3, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/appStore';
import { useState } from 'react';

const emailDraft = {
  subject: 'Discover how to optimize your growth strategy',
  preview: 'Hi {name}, we\'ve identified key opportunities for your business...',
  body: `Hi {name},

We hope this message finds you well. We've been analyzing market trends and want to share some opportunities that could be relevant for {company}.

**Key points we've identified:**

1. The tech sector is experiencing 45% growth in demand for strategic consulting services.

2. Companies implementing data-driven growth strategies are seeing 3x higher ROI.

3. There is a window of opportunity to position before the competition.

Would you like to schedule a 15-minute call to explore how we can help you capitalize on these opportunities?

Best regards,
The Faststrat Team`,
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
              <p className="text-xs text-muted-foreground">Draft - Last edited 1 hour ago</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="gap-2">
            <Edit3 className="w-4 h-4" />
            {isEditing ? 'Preview' : 'Edit'}
          </Button>
          <Button className="btn-primary-gradient gap-2">
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {selectedNotification.status === 'critical' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-warning-light border border-warning/30 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground">Review required</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  This draft needs to be reviewed before sending. Please verify the content and CTAs.
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm"
          >
            <div className="p-4 border-b border-border bg-secondary/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground w-16">Subject:</span>
                  <span className="text-sm text-foreground font-medium">{emailDraft.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground w-16">Preview:</span>
                  <span className="text-sm text-muted-foreground">{emailDraft.preview}</span>
                </div>
              </div>
            </div>

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Words', value: content.split(' ').length },
              { label: 'Characters', value: content.length },
              { label: 'Read time', value: '~2 min' },
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
