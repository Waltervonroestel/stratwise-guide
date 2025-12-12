import { create } from 'zustand';

export type CompanyType = 'startup' | 'smb' | 'enterprise' | null;
export type PlanType = 'entry' | 'enterprise' | 'premium' | null;
export type Phase = 1 | 2 | 3;
export type NotificationFilter = 'todos' | 'insights' | 'reportes' | 'drafts';
export type ActiveView = 'chat' | 'insight' | 'report' | 'draft';

export interface Notification {
  id: string;
  type: 'insight' | 'report' | 'draft' | 'processing';
  title: string;
  description: string;
  status: 'new' | 'read' | 'critical' | 'processing';
  timestamp: Date;
}

export interface QuestionnaireData {
  name: string;
  website: string;
  socialMedia: string;
  industry: string;
  reach: string;
  businessType: string;
  monthlyCustomers: string;
  salesApproach: string;
  grossRevenue: string;
  netProfitMargin: string;
  marketingBudget: string;
  businessGoals: string;
  idealCustomer: string;
  problemsSolved: string;
}

interface AppState {
  phase: Phase;
  companyType: CompanyType;
  planType: PlanType;
  notificationFilter: NotificationFilter;
  notifications: Notification[];
  questionnaireStep: number;
  questionnaireData: QuestionnaireData;
  questionnaireCompleted: boolean;
  activeView: ActiveView;
  selectedNotification: Notification | null;
  
  setPhase: (phase: Phase) => void;
  setCompanyType: (type: CompanyType) => void;
  setPlanType: (plan: PlanType) => void;
  setNotificationFilter: (filter: NotificationFilter) => void;
  setQuestionnaireStep: (step: number) => void;
  updateQuestionnaireData: (data: Partial<QuestionnaireData>) => void;
  completeQuestionnaire: () => void;
  goBack: () => void;
  setActiveView: (view: ActiveView) => void;
  openNotification: (notification: Notification) => void;
}

const initialQuestionnaireData: QuestionnaireData = {
  name: '',
  website: '',
  socialMedia: '',
  industry: '',
  reach: '',
  businessType: '',
  monthlyCustomers: '',
  salesApproach: '',
  grossRevenue: '',
  netProfitMargin: '',
  marketingBudget: '',
  businessGoals: '',
  idealCustomer: '',
  problemsSolved: '',
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'insight',
    title: 'Oportunidad de mercado detectada',
    description: 'Nuevo segmento B2B identificado en sector tecnológico. Se ha detectado un crecimiento del 45% en demanda de servicios de consultoría estratégica para empresas de tecnología en la región.',
    status: 'new',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'report',
    title: 'Reporte de Competencia Q3',
    description: 'Análisis completo de 15 competidores directos con métricas de posicionamiento, estrategias de precios y canales de distribución.',
    status: 'read',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    type: 'draft',
    title: 'Campaña Email Marketing',
    description: 'Borrador de secuencia de 5 emails para nurturing de leads B2B. Requiere revisión de copy y CTAs antes de activación.',
    status: 'critical',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    type: 'processing',
    title: 'Analizando respuestas...',
    description: 'Generando estrategia personalizada basada en las respuestas del cuestionario BrandOS.',
    status: 'processing',
    timestamp: new Date(),
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  phase: 1,
  companyType: null,
  planType: null,
  notificationFilter: 'todos',
  notifications: mockNotifications,
  questionnaireStep: 1,
  questionnaireData: initialQuestionnaireData,
  questionnaireCompleted: false,
  activeView: 'chat',
  selectedNotification: null,

  setPhase: (phase) => set({ phase }),
  setCompanyType: (companyType) => set({ companyType, phase: 2 }),
  setPlanType: (planType) => set({ planType, phase: 3 }),
  setNotificationFilter: (notificationFilter) => set({ notificationFilter }),
  setQuestionnaireStep: (questionnaireStep) => set({ questionnaireStep }),
  updateQuestionnaireData: (data) =>
    set((state) => ({
      questionnaireData: { ...state.questionnaireData, ...data },
    })),
  completeQuestionnaire: () => set({ questionnaireCompleted: true }),
  goBack: () => {
    const { phase, activeView } = get();
    if (activeView !== 'chat') {
      set({ activeView: 'chat', selectedNotification: null });
    } else if (phase === 2) {
      set({ phase: 1, companyType: null });
    } else if (phase === 3) {
      set({ phase: 2, planType: null });
    }
  },
  setActiveView: (activeView) => set({ activeView }),
  openNotification: (notification) => {
    if (notification.type === 'processing') return;
    const viewMap: Record<string, ActiveView> = {
      insight: 'insight',
      report: 'report',
      draft: 'draft',
    };
    set({
      activeView: viewMap[notification.type] || 'chat',
      selectedNotification: notification,
    });
  },
}));
