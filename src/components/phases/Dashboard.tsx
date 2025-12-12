import { motion } from 'framer-motion';
import { IconSidebar } from '@/components/dashboard/IconSidebar';
import { ChatArea } from '@/components/dashboard/ChatArea';

export function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full bg-background"
    >
      <IconSidebar />
      <ChatArea />
    </motion.div>
  );
}
