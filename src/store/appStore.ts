import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CompanyType = 'startup' | 'smb' | 'enterprise' | null;
export type CompanyStage = 
  | 'preseed-construccion' | 'pequena-traccion' | 'semilla' // Startup stages
  | 'smb-preseed' | 'smb-traccion' | 'smb-2-5' | 'smb-5plus' // SMB stages
  | 'enterprise-stage' // Enterprise stage
  | null;
export type FlowType = 'completo' | 'estrategico' | 'tactico' | null;
export type PlanType = 'entry' | 'enterprise' | 'premium' | null;
export type Phase = 1 | 2 | 3 | 4 | 5; // 1=type, 2=stage, 3=flow, 4=plan, 5=dashboard
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

// Utility functions for flow routing
export function getAvailableFlows(companyType: CompanyType, stage: CompanyStage): FlowType[] {
  if (stage === 'preseed-construccion' || stage === 'smb-preseed') {
    return ['completo'];
  }
  if (stage === 'pequena-traccion' || stage === 'smb-traccion') {
    return ['completo', 'estrategico'];
  }
  if (companyType === 'startup' && stage === 'semilla') {
    return ['completo', 'estrategico', 'tactico'];
  }
  if (companyType === 'smb' && stage === 'smb-2-5') {
    return ['completo', 'estrategico'];
  }
  if (companyType === 'smb' && stage === 'smb-5plus') {
    return ['completo', 'estrategico', 'tactico'];
  }
  if (companyType === 'enterprise') {
    return ['completo', 'estrategico', 'tactico'];
  }
  return ['completo'];
}

export function getDefaultFlow(companyType: CompanyType, stage: CompanyStage): FlowType {
  const flows = getAvailableFlows(companyType, stage);
  if (flows.length === 1) return flows[0];
  if (companyType === 'smb' && stage === 'smb-2-5') return 'estrategico';
  if (companyType === 'enterprise') return 'estrategico';
  return 'completo';
}

interface AppState {
  phase: Phase;
  companyType: CompanyType;
  companyStage: CompanyStage;
  flowType: FlowType;
  planType: PlanType;
  notificationFilter: NotificationFilter;
  notifications: Notification[];
  questionnaireStep: number;
  questionnaireData: QuestionnaireData;
  questionnaireCompleted: boolean;
  activeView: ActiveView;
  selectedNotification: Notification | null;
  hasDocumentAddon: boolean;
  
  setPhase: (phase: Phase) => void;
  setCompanyType: (type: CompanyType) => void;
  setCompanyStage: (stage: CompanyStage) => void;
  setFlowType: (flow: FlowType) => void;
  setPlanType: (plan: PlanType) => void;
  setNotificationFilter: (filter: NotificationFilter) => void;
  setQuestionnaireStep: (step: number) => void;
  updateQuestionnaireData: (data: Partial<QuestionnaireData>) => void;
  completeQuestionnaire: () => void;
  goBack: () => void;
  setActiveView: (view: ActiveView) => void;
  openNotification: (notification: Notification) => void;
  purchaseDocumentAddon: () => void;
  resetFlow: () => void;
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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      phase: 1,
      companyType: null,
      companyStage: null,
      flowType: null,
      planType: null,
      notificationFilter: 'todos',
      notifications: mockNotifications,
      questionnaireStep: 1,
      questionnaireData: initialQuestionnaireData,
      questionnaireCompleted: false,
      activeView: 'chat',
      selectedNotification: null,
      hasDocumentAddon: false,

      setPhase: (phase) => set({ phase }),
      
      setCompanyType: (companyType) => {
        // Enterprise skips stage selection, goes directly to flow selection
        if (companyType === 'enterprise') {
          set({ companyType, companyStage: 'enterprise-stage', phase: 3 });
        } else {
          set({ companyType, phase: 2 });
        }
      },
      
      setCompanyStage: (companyStage) => {
        const { companyType } = get();
        const availableFlows = getAvailableFlows(companyType, companyStage);
        
        // If only one flow available, auto-select and skip to plan
        if (availableFlows.length === 1) {
          set({ companyStage, flowType: availableFlows[0], phase: 4 });
        } else {
          set({ companyStage, phase: 3 });
        }
      },
      
      setFlowType: (flowType) => set({ flowType, phase: 4 }),
      setPlanType: (planType) => set({ planType, phase: 5 }),
      setNotificationFilter: (notificationFilter) => set({ notificationFilter }),
      setQuestionnaireStep: (questionnaireStep) => set({ questionnaireStep }),
      updateQuestionnaireData: (data) =>
        set((state) => ({
          questionnaireData: { ...state.questionnaireData, ...data },
        })),
      completeQuestionnaire: () => set({ questionnaireCompleted: true }),
      
      goBack: () => {
        const { phase, activeView, companyType, companyStage } = get();
        if (activeView !== 'chat') {
          set({ activeView: 'chat', selectedNotification: null });
        } else if (phase === 2) {
          set({ phase: 1, companyType: null, companyStage: null });
        } else if (phase === 3) {
          // If enterprise, go back to phase 1
          if (companyType === 'enterprise') {
            set({ phase: 1, companyType: null, companyStage: null, flowType: null });
          } else {
            set({ phase: 2, companyStage: null, flowType: null });
          }
        } else if (phase === 4) {
          // Check if flow was auto-selected (only 1 option available)
          const availableFlows = getAvailableFlows(companyType, companyStage);
          if (availableFlows.length === 1) {
            // Go back to stage selection (or company type for enterprise)
            if (companyType === 'enterprise') {
              set({ phase: 1, companyType: null, companyStage: null, flowType: null, planType: null });
            } else {
              set({ phase: 2, companyStage: null, flowType: null, planType: null });
            }
          } else {
            set({ phase: 3, flowType: null, planType: null });
          }
        } else if (phase === 5) {
          set({ phase: 4, planType: null });
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
      purchaseDocumentAddon: () => set({ hasDocumentAddon: true }),
      resetFlow: () => set({
        phase: 1,
        companyType: null,
        companyStage: null,
        flowType: null,
        planType: null,
        questionnaireStep: 1,
        questionnaireData: initialQuestionnaireData,
        questionnaireCompleted: false,
        activeView: 'chat',
        selectedNotification: null,
      }),
    }),
    {
      name: 'faststrat-flow-state',
      partialize: (state) => ({
        phase: state.phase,
        companyType: state.companyType,
        companyStage: state.companyStage,
        flowType: state.flowType,
        planType: state.planType,
        questionnaireData: state.questionnaireData,
        questionnaireCompleted: state.questionnaireCompleted,
        hasDocumentAddon: state.hasDocumentAddon,
      }),
    }
  )
);
