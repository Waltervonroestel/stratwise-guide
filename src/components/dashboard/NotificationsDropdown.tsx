import { motion } from 'framer-motion';
import {
  Lightbulb,
  BarChart3,
  FileText,
  Loader2,
  X,
} from 'lucide-react';
import { useAppStore, NotificationFilter } from '@/store/appStore';
import { Button } from '@/components/ui/button';

const filters: { value: NotificationFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'insights', label: 'Insights' },
  { value: 'reportes', label: 'Reportes' },
  { value: 'drafts', label: 'Drafts' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'insight':
      return Lightbulb;
    case 'report':
      return BarChart3;
    case 'draft':
      return FileText;
    case 'processing':
      return Loader2;
    default:
      return FileText;
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-destructive/10 border-destructive/20';
    case 'critical':
      return 'bg-warning-light border-warning/30';
    case 'processing':
      return 'bg-info-light border-info/30';
    default:
      return 'bg-secondary border-border';
  }
};

interface NotificationsDropdownProps {
  onClose: () => void;
}

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const { notifications, notificationFilter, setNotificationFilter } = useAppStore();

  const filteredNotifications = notifications.filter((n) => {
    if (notificationFilter === 'todos') return true;
    if (notificationFilter === 'insights') return n.type === 'insight';
    if (notificationFilter === 'reportes') return n.type === 'report';
    if (notificationFilter === 'drafts') return n.type === 'draft';
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full ml-2 bottom-0 w-80 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">Notificaciones</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters */}
      <div className="p-3 border-b border-border flex gap-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setNotificationFilter(filter.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              notificationFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No hay notificaciones
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const isProcessing = notification.status === 'processing';

            return (
              <motion.button
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`w-full p-4 text-left border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${getStatusStyles(
                  notification.status
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'insight'
                        ? 'bg-amber-100 text-amber-600'
                        : notification.type === 'report'
                        ? 'bg-blue-100 text-blue-600'
                        : notification.type === 'draft'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-info-light text-info'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isProcessing ? 'animate-spin-slow' : ''}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {notification.title}
                      </h4>
                      {notification.status === 'new' && (
                        <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                      )}
                      {notification.status === 'critical' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-warning text-white">
                          Revisión
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
