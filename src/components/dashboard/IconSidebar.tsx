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
  ArrowLeft,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { NotificationsDropdown } from './NotificationsDropdown';

const sidebarItems = [
  { icon: MessageSquare, label: 'Chat', active: true },
  { icon: Target, label: 'Estrategias', active: false },
  { icon: BarChart3, label: 'Reportes', active: false },
  { icon: FileText, label: 'Drafts', active: false },
  { icon: AtSign, label: 'Mentions', active: false },
  { icon: Briefcase, label: 'Proyectos', active: false },
];

export function IconSidebar() {
  const { goBack } = useAppStore();
  const [activeItem, setActiveItem] = useState(0);
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
        {sidebarItems.map((item, index) => (
          <motion.button
            key={item.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveItem(index)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              activeItem === index
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </nav>

      {/* Bottom Items */}
      <div className="flex flex-col items-center gap-2 mt-auto">
        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse-dot" />
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
