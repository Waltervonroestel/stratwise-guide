import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  BarChart3,
  FileText,
  Target,
  AtSign,
  Briefcase,
  Bell,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { NotificationsDropdown } from './NotificationsDropdown';

const sidebarItems = [
  { icon: MessageSquare, label: 'Chat', view: 'chat' as const },
  { icon: Target, label: 'Estrategias', view: 'chat' as const },
  { icon: BarChart3, label: 'Reportes', view: 'report' as const },
  { icon: FileText, label: 'Drafts', view: 'draft' as const },
  { icon: AtSign, label: 'Mentions', view: 'chat' as const },
  { icon: Briefcase, label: 'Proyectos', view: 'chat' as const },
];

export function IconSidebar() {
  const { goBack, activeView, setActiveView } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-16 bg-sidebar flex flex-col items-center py-4 border-r border-sidebar-border">
      {/* Logo */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-heading font-bold text-xl">F</span>
        </div>
      </div>

      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goBack}
        className="mb-4 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {sidebarItems.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView(item.view)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeView === item.view
                ? 'bg-primary text-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col items-center gap-3 mt-auto">
        {/* Notifications - Larger bell */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-sidebar" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
