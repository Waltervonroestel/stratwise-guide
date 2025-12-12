import { create } from 'zustand';

export type CompanyType = 'startup' | 'smb' | 'enterprise' | null;
export type PlanType = 'entry' | 'enterprise' | 'premium' | null;
export type Phase = 1 | 2 | 3;
export type NotificationFilter = 'todos' | 'insights' | 'reportes' | 'drafts';

export interface Notification {
  id: string;
  type: 'insight' | 'report' | 'draft' | 'processing';
  title: string;
  description: string;
  status: 'new' | 'read' | 'critical' | 'processing';
  timestamp: Date;
}

export interface QuestionnaireData {
  // Step 1: General Info
  name: string;
  website: string;
  socialMedia: string;
  industry: string;
  reach: string;
  // Step 2: Business Model
  businessType: string;
  monthlyCustomers: string;
  salesApproach: string;
  // Step 3: Financials & Goals
  grossRevenue: string;
  netProfitMargin: string;
  marketingBudget: string;
  businessGoals: string;
  // Step 4: Target Audience
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
  
  setPhase: (phase: Phase) => void;
  setCompanyType: (type: CompanyType) => void;
  setPlanType: (plan: PlanType) => void;
  setNotificationFilter: (filter: NotificationFilter) => void;
  setQuestionnaireStep: (step: number) => void;
  updateQuestionnaireData: (data: Partial<QuestionnaireData>) => void;
  completeQuestionnaire: () => void;
  goBack: () => void;
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
    description: 'Nuevo segmento B2B identificado en sector tecnológico',
    status: 'new',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'report',
    title: 'Reporte de Competencia Q3',
    description: 'Análisis completo de 15 competidores directos',
    status: 'read',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    type: 'draft',
    title: 'Campaña Email Marketing',
    description: 'Borrador requiere revisión antes de envío',
    status: 'critical',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '4',
    type: 'processing',
    title: 'Analizando respuestas...',
    description: 'Generando estrategia personalizada',
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
    const { phase } = get();
    if (phase === 2) {
      set({ phase: 1, companyType: null });
    } else if (phase === 3) {
      set({ phase: 2, planType: null });
    }
  },
}));
