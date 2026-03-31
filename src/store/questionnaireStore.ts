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
  isAutoFilled: boolean;

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
  autoFillFromDocuments: () => void;
  setIsAutoFilled: (val: boolean) => void;
}

const autoFilledData: ExtendedQuestionnaireData = {
  personalIntro: 'John Smith, CEO & Co-Founder with 12+ years in SaaS and digital marketing.',
  name: 'NovaTech Solutions',
  companyNameLocation: 'NovaTech Solutions Inc. — San Francisco, CA',
  website: 'https://novatech.io',
  socialMedia: 'LinkedIn: /novatech • Twitter: @novatech_io • Instagram: @novatech.solutions',
  industry: 'B2B SaaS — Marketing Automation & Analytics',
  whatCompanyDoes: 'NovaTech provides AI-powered marketing automation tools that help mid-market companies optimize their customer acquisition funnels and reduce CAC by up to 40%.',
  mission: 'To democratize enterprise-grade marketing intelligence for growing businesses worldwide.',
  vision: 'A world where every business, regardless of size, has access to data-driven marketing strategies that were once exclusive to Fortune 500 companies.',
  businessScope: 'North America (primary), expanding to UK and DACH region in Q3 2026.',
  mainObjective: 'Achieve $5M ARR by end of 2026 while maintaining a net revenue retention rate above 120%.',
  businessFocus: 'B2B SaaS with a product-led growth model complemented by inside sales for enterprise deals.',
  timeInMarket: '3.5 years — launched MVP in Q3 2022, reached product-market fit in early 2024.',
  mainCompetitors: 'HubSpot (enterprise), Mailchimp (SMB), ActiveCampaign (mid-market), Marketo (enterprise).',
  monthlyCustomers: 'Approximately 2,400 active accounts with an average of 8 users per account.',
  customerReach: 'Primarily inbound — blog, SEO, webinars, and partner referrals drive 70% of new signups.',
  salesChannels: 'Self-serve freemium (60%), inside sales (30%), channel partners (10%).',
  revenueModel: 'Subscription-based with three tiers: Starter ($49/mo), Growth ($199/mo), Enterprise ($799/mo). Annual plans get 20% discount.',
  revenueGoal: '$5M ARR by December 2026, up from current $2.8M ARR.',
  grossRevenue: '$2.8M ARR as of Q1 2026. Quarterly revenue: $720K last quarter.',
  netProfitMargin: '12% net margin — reinvesting heavily in R&D and go-to-market expansion.',
  yoyGrowth: '85% year-over-year revenue growth. Customer count grew 62% YoY.',
  salesObjectives: 'Close 50 enterprise deals ($799/mo+) per quarter. Reduce sales cycle from 45 to 30 days.',
  keyKPIs: 'MRR growth rate, CAC payback period (<12 months), LTV:CAC ratio (target 4:1), NRR (>120%), churn rate (<3% monthly).',
  productLifecycle: 'Growth stage — core platform is mature, launching AI Insights module in Q2 2026.',
  pricingStrategy: 'Value-based pricing anchored on ROI delivered. Premium features gated behind Growth and Enterprise tiers.',
  mainProductPrice: 'Growth tier at $199/mo is our highest-volume plan, representing 55% of revenue.',
  competitorPricing: 'HubSpot Marketing Hub starts at $800/mo. ActiveCampaign at $149/mo. We sit competitively in the mid-range.',
  qualityAssurance: '99.95% uptime SLA. SOC 2 Type II certified. Bi-weekly release cycles with automated QA pipeline.',
  expansionPlans: 'Launching AI-powered predictive analytics module. Expanding to European markets. Building integrations with Salesforce and Shopify.',
  websiteFeatures: 'Interactive ROI calculator, live demo environment, customer success stories, resource hub with 200+ articles.',
  brandKeyMessages: '"Marketing intelligence, simplified." — We make powerful tools accessible without the enterprise price tag or complexity.',
  brandTone: 'Confident but approachable. Technical yet jargon-free. We explain complex concepts simply without being condescending.',
  brandPersonality: 'The knowledgeable friend who happens to be a marketing expert — helpful, direct, and always data-driven.',
  idealCustomer: 'VP of Marketing or Growth Lead at a B2B company with 50-500 employees, $5M-$50M revenue, tech-savvy but resource-constrained.',
  audienceSegmentation: 'Segment A: Early-stage startups (Starter). Segment B: Scale-ups with dedicated marketing teams (Growth). Segment C: Mid-market enterprises needing custom workflows (Enterprise).',
  customerPainPoints: 'Too many disconnected tools. Manual reporting wastes 10+ hours/week. Difficulty attributing revenue to specific campaigns. Lack of actionable insights from raw data.',
  keyProblemSolved: 'We unify marketing data from 50+ sources into a single dashboard and use AI to surface the exact actions that will move the needle — no data science degree required.',
  uniqueDifferentiator: 'Only platform that combines marketing automation, multi-touch attribution, and AI-driven recommendations in one affordable package for mid-market companies.',
  communicatingUVP: 'Through personalized onboarding demos, ROI case studies, and a "Time-to-Value" guarantee — see results within 14 days or get a full refund.',
  freeMediaChannels: 'SEO blog (45K monthly visitors), LinkedIn thought leadership, weekly newsletter (18K subscribers), YouTube tutorials (5K subscribers), podcast guest appearances.',
  paidAdvertising: 'Google Ads ($15K/mo), LinkedIn Ads ($8K/mo), retargeting via Meta ($3K/mo). Total paid budget: $26K/month with blended CAC of $180.',
  personalization: 'Behavioral email sequences based on product usage. In-app recommendations. Personalized onboarding flows based on company size and industry.',
  roiMeasurement: 'Multi-touch attribution model, cohort analysis for retention, incrementality testing for paid campaigns, weekly growth metrics review.',
  bestROICampaign: 'SEO content hub delivering 40% of pipeline at $22 CAC. Second: LinkedIn thought leadership generating 25% of enterprise leads.',
  leadsPerYear: 'Approximately 28,000 marketing-qualified leads per year, converting at 8% to paid accounts.',
  awarenessStage: 'SEO content, social media presence, podcast appearances, industry conference sponsorships, co-marketing with partners.',
  interestStage: 'Free tools and templates, webinars, case study downloads, email nurture sequences, retargeting ads.',
  considerationStage: 'Interactive product demos, free trial (14-day), comparison guides, ROI calculator, peer review sites (G2, Capterra).',
  decisionStage: 'Personalized sales demos, custom pricing proposals, implementation roadmap, customer reference calls, money-back guarantee.',
  postSaleSupport: 'Dedicated CSM for Enterprise, in-app chat support (avg 2-min response), knowledge base, monthly business reviews, user community forum.',
  marketingTests: 'A/B testing landing pages and email subject lines weekly. Running pricing page experiments quarterly. Testing new channels (TikTok, Reddit) in H2 2026.',
  marketingBudget: '$45K/month total. Split: Content & SEO (25%), Paid Acquisition (58%), Events & Partnerships (12%), Tools & Analytics (5%).',
  analyticsTools: 'Google Analytics 4, Mixpanel (product analytics), HubSpot CRM, Looker (BI dashboards), our own platform for marketing attribution.',
  calendarStartDate: 'April 1, 2026 — aligned with Q2 planning cycle.',
  marketingKPIs: 'Pipeline generated ($), Marketing-sourced revenue, CAC by channel, MQL-to-SQL conversion rate, content engagement rate, email click-through rate, NPS score.',
};

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
      previousPlanType: null,
      isAutoFilled: false,

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
        isAutoFilled: false,
      }),

      autoFillFromDocuments: () => {
        const reviewStatuses: PacketStatus[] = Array(7).fill('review');
        set({
          data: autoFilledData,
          packetStatuses: reviewStatuses,
          currentPacket: 0,
          allPacketsConfirmed: false,
          isAutoFilled: true,
          finalSubmitted: false,
        });
      },

      setIsAutoFilled: (val) => set({ isAutoFilled: val }),

      handlePlanUpgrade: (previousPlan, newPlan) => {
        if (previousPlan === 'entry' && newPlan !== 'entry') {
          set({
            previousPlanType: previousPlan,
            upgradedToPlan: newPlan,
            showUpgradeDialog: true,
            finalSubmitted: false,
          });
        }
      },
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
        previousPlanType: state.previousPlanType,
        upgradedToPlan: state.upgradedToPlan,
      }),
    }
  )
);
