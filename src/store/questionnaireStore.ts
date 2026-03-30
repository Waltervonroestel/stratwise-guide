import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExtendedQuestionnaireData {
  // Packet 1: Company Profile
  personalIntro: string;
  name: string;
  companyNameLocation: string;
  website: string;
  socialMedia: string;
  industry: string;
  whatCompanyDoes: string;
  mission: string;
  vision: string;
  businessScope: string;
  mainObjective: string;

  // Packet 2: Business Model & Market
  businessFocus: string;
  timeInMarket: string;
  mainCompetitors: string;
  monthlyCustomers: string;
  customerReach: string;
  salesChannels: string;
  revenueModel: string;
  revenueGoal: string;

  // Packet 3: Financial Health
  grossRevenue: string;
  netProfitMargin: string;
  yoyGrowth: string;
  salesObjectives: string;
  keyKPIs: string;

  // Packet 4: Product & Pricing
  productLifecycle: string;
  pricingStrategy: string;
  mainProductPrice: string;
  competitorPricing: string;
  qualityAssurance: string;
  expansionPlans: string;

  // Packet 5: Brand Identity
  websiteFeatures: string;
  brandKeyMessages: string;
  brandTone: string;
  brandPersonality: string;
  idealCustomer: string;
  audienceSegmentation: string;

  // Packet 6: Customer Journey & UVP
  customerPainPoints: string;
  keyProblemSolved: string;
  uniqueDifferentiator: string;
  communicatingUVP: string;
  freeMediaChannels: string;
  paidAdvertising: string;
  personalization: string;
  roiMeasurement: string;
  bestROICampaign: string;

  // Packet 7: Marketing Strategy & Analytics
  leadsPerYear: string;
  awarenessStage: string;
  interestStage: string;
  considerationStage: string;
  decisionStage: string;
  postSaleSupport: string;
  marketingTests: string;
  marketingBudget: string;
  analyticsTools: string;
  calendarStartDate: string;
  marketingKPIs: string;
}

export type PacketStatus = 'pending' | 'answering' | 'review' | 'confirmed';

export interface PacketInfo {
  id: number;
  title: string;
  description: string;
  status: PacketStatus;
}

interface QuestionnaireStore {
  data: ExtendedQuestionnaireData;
  currentPacket: number;
  packetStatuses: PacketStatus[];
  allPacketsConfirmed: boolean;
  showUpgradeDialog: boolean;
  isTrialCompleted: boolean;
  showSubmitWarning: boolean;
  finalSubmitted: boolean;
  previousPlanType: string | null;
  upgradedToPlan: string | null;

  updateData: (partial: Partial<ExtendedQuestionnaireData>) => void;
  setCurrentPacket: (packet: number) => void;
  setPacketStatus: (packetIndex: number, status: PacketStatus) => void;
  confirmPacket: (packetIndex: number) => void;
  checkAllConfirmed: () => void;
  setShowUpgradeDialog: (show: boolean) => void;
  setIsTrialCompleted: (completed: boolean) => void;
  setShowSubmitWarning: (show: boolean) => void;
  setFinalSubmitted: (submitted: boolean) => void;
  resetQuestionnaire: () => void;
  editPacket: (packetIndex: number) => void;
  handlePlanUpgrade: (previousPlan: string, newPlan: string) => void;
}

const initialData: ExtendedQuestionnaireData = {
  personalIntro: '', name: '', companyNameLocation: '', website: '', socialMedia: '',
  industry: '', whatCompanyDoes: '', mission: '', vision: '', businessScope: '', mainObjective: '',
  businessFocus: '', timeInMarket: '', mainCompetitors: '', monthlyCustomers: '',
  customerReach: '', salesChannels: '', revenueModel: '', revenueGoal: '',
  grossRevenue: '', netProfitMargin: '', yoyGrowth: '', salesObjectives: '', keyKPIs: '',
  productLifecycle: '', pricingStrategy: '', mainProductPrice: '', competitorPricing: '',
  qualityAssurance: '', expansionPlans: '',
  websiteFeatures: '', brandKeyMessages: '', brandTone: '', brandPersonality: '',
  idealCustomer: '', audienceSegmentation: '',
  customerPainPoints: '', keyProblemSolved: '', uniqueDifferentiator: '', communicatingUVP: '',
  freeMediaChannels: '', paidAdvertising: '', personalization: '', roiMeasurement: '', bestROICampaign: '',
  leadsPerYear: '', awarenessStage: '', interestStage: '', considerationStage: '',
  decisionStage: '', postSaleSupport: '', marketingTests: '', marketingBudget: '',
  analyticsTools: '', calendarStartDate: '', marketingKPIs: '',
};

const initialStatuses: PacketStatus[] = ['answering', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending'];

export const PACKETS = [
  { id: 1, title: 'Company Profile', description: 'Tell us about your company, mission, and vision' },
  { id: 2, title: 'Business Model & Market', description: 'Your business model, competitors, and market position' },
  { id: 3, title: 'Financial Health', description: 'Revenue, margins, KPIs, and growth metrics' },
  { id: 4, title: 'Product & Pricing', description: 'Your offerings, pricing strategy, and quality standards' },
  { id: 5, title: 'Brand Identity', description: 'Brand voice, personality, and target audience' },
  { id: 6, title: 'Customer Journey & UVP', description: 'Pain points, differentiators, and marketing channels' },
  { id: 7, title: 'Marketing Strategy', description: 'Funnel stages, budget, analytics, and KPIs' },
];

export const useQuestionnaireStore = create<QuestionnaireStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      currentPacket: 0,
      packetStatuses: [...initialStatuses],
      allPacketsConfirmed: false,
      showUpgradeDialog: false,
      isTrialCompleted: false,
      showSubmitWarning: false,
      finalSubmitted: false,

      updateData: (partial) => set((s) => ({ data: { ...s.data, ...partial } })),

      setCurrentPacket: (packet) => {
        const statuses = [...get().packetStatuses];
        if (statuses[packet] === 'pending') {
          statuses[packet] = 'answering';
        }
        set({ currentPacket: packet, packetStatuses: statuses });
      },

      setPacketStatus: (idx, status) => {
        const statuses = [...get().packetStatuses];
        statuses[idx] = status;
        set({ packetStatuses: statuses });
      },

      confirmPacket: (idx) => {
        const statuses = [...get().packetStatuses];
        statuses[idx] = 'confirmed';
        // Auto-advance to next unconfirmed packet
        const next = statuses.findIndex((s, i) => i > idx && s !== 'confirmed');
        const nextPacket = next !== -1 ? next : idx;
        if (next !== -1 && statuses[next] === 'pending') {
          statuses[next] = 'answering';
        }
        const allConfirmed = statuses.every((s) => s === 'confirmed');
        set({ packetStatuses: statuses, currentPacket: nextPacket, allPacketsConfirmed: allConfirmed });
      },

      checkAllConfirmed: () => {
        const allConfirmed = get().packetStatuses.every((s) => s === 'confirmed');
        set({ allPacketsConfirmed: allConfirmed });
      },

      setShowUpgradeDialog: (show) => set({ showUpgradeDialog: show }),
      setIsTrialCompleted: (completed) => set({ isTrialCompleted: completed }),
      setShowSubmitWarning: (show) => set({ showSubmitWarning: show }),
      setFinalSubmitted: (submitted) => set({ finalSubmitted: submitted }),

      editPacket: (idx) => {
        const statuses = [...get().packetStatuses];
        statuses[idx] = 'answering';
        set({ packetStatuses: statuses, currentPacket: idx, allPacketsConfirmed: false });
      },

      resetQuestionnaire: () => set({
        data: initialData,
        currentPacket: 0,
        packetStatuses: [...initialStatuses],
        allPacketsConfirmed: false,
        finalSubmitted: false,
        showSubmitWarning: false,
      }),
    }),
    {
      name: 'faststrat-questionnaire',
      partialize: (state) => ({
        data: state.data,
        currentPacket: state.currentPacket,
        packetStatuses: state.packetStatuses,
        allPacketsConfirmed: state.allPacketsConfirmed,
        isTrialCompleted: state.isTrialCompleted,
        finalSubmitted: state.finalSubmitted,
      }),
    }
  )
);
