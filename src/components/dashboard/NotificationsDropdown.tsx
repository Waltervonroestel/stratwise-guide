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
      return 'bg-primary/5 border-l-4 border-l-primary';
    case 'critical':
      return 'bg-warning-light border-l-4 border-l-warning';
    case 'processing':
      return 'bg-info-light border-l-4 border-l-info';
    default:
      return 'bg-card border-l-4 border-l-transparent';
  }
};

interface NotificationsDropdownProps {
  onClose: () => void;
}

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const { notifications, notificationFilter, setNotificationFilter, openNotification } = useAppStore();

  const filteredNotifications = notifications.filter((n) => {
    if (notificationFilter === 'todos') return true;
    if (notificationFilter === 'insights') return n.type === 'insight';
    if (notificationFilter === 'reportes') return n.type === 'report';
    if (notificationFilter === 'drafts') return n.type === 'draft';
    return true;
  });

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.type !== 'processing') {
      openNotification(notification);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute left-full ml-3 top-0 w-96 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between bg-card">
        <h3 className="font-heading font-semibold text-lg text-foreground">Notificaciones</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-border flex gap-2 flex-wrap bg-secondary/30">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setNotificationFilter(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              notificationFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-secondary border border-border'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto bg-card">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-base">
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
                onClick={() => handleNotificationClick(notification)}
                disabled={isProcessing}
                className={`w-full p-5 text-left border-b border-border last:border-0 transition-colors ${getStatusStyles(
                  notification.status
                )} ${isProcessing ? 'opacity-70 cursor-wait' : 'hover:bg-secondary/50 cursor-pointer'}`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
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
                      className={`w-6 h-6 ${isProcessing ? 'animate-spin' : ''}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-medium text-foreground truncate">
                        {notification.title}
                      </h4>
                      {notification.status === 'new' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    {notification.status === 'critical' && (
                      <span className="inline-block mt-2 text-sm px-3 py-1 rounded bg-warning text-white font-medium">
                        Requiere revisión
                      </span>
                    )}
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
