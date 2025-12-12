import { motion, AnimatePresence } from 'framer-motion';
import { IconSidebar } from '@/components/dashboard/IconSidebar';
import { ChatArea } from '@/components/dashboard/ChatArea';
import { InsightView } from '@/components/dashboard/InsightView';
import { ReportView } from '@/components/dashboard/ReportView';
import { DraftView } from '@/components/dashboard/DraftView';
import { useAppStore } from '@/store/appStore';

export function Dashboard() {
  const { activeView } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full bg-background"
    >
      <IconSidebar />
      <AnimatePresence mode="wait">
        {activeView === 'chat' && <ChatArea key="chat" />}
        {activeView === 'insight' && <InsightView key="insight" />}
        {activeView === 'report' && <ReportView key="report" />}
        {activeView === 'draft' && <DraftView key="draft" />}
      </AnimatePresence>
    </motion.div>
  );
}
