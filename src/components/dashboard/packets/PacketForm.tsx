import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExtendedQuestionnaireData } from '@/store/questionnaireStore';

interface PacketFormProps {
  packetIndex: number;
  data: ExtendedQuestionnaireData;
  onUpdate: (partial: Partial<ExtendedQuestionnaireData>) => void;
}

function Field({ label, id, value, onChange, textarea, placeholder, rows }: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; textarea?: boolean; placeholder?: string; rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm">{label}</Label>
      {textarea ? (
        <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} rows={rows || 3} />
      ) : (
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} />
      )}
    </div>
  );
}

export function PacketForm({ packetIndex, data, onUpdate }: PacketFormProps) {
  const anim = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  switch (packetIndex) {
    case 0: // Company Profile
      return (
        <motion.div {...anim} key="p0" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Company Profile</h4>
          <Field label="Personal Introduction" id="personalIntro" value={data.personalIntro}
            onChange={(v) => onUpdate({ personalIntro: v })} textarea placeholder="Hello! Tell us about yourself..." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Your Name" id="name" value={data.name}
              onChange={(v) => onUpdate({ name: v })} placeholder="Ana Ramírez" />
            <Field label="Company Name & Location" id="companyNameLocation" value={data.companyNameLocation}
              onChange={(v) => onUpdate({ companyNameLocation: v })} placeholder="Creative Studio, Bogotá, Colombia" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Website" id="website" value={data.website}
              onChange={(v) => onUpdate({ website: v })} placeholder="https://example.com" />
            <Field label="Social Media" id="socialMedia" value={data.socialMedia}
              onChange={(v) => onUpdate({ socialMedia: v })} placeholder="@company" />
          </div>
          <Field label="Industry" id="industry" value={data.industry}
            onChange={(v) => onUpdate({ industry: v })} placeholder="Creative services / Digital consulting" />
          <Field label="What does your company do?" id="whatCompanyDoes" value={data.whatCompanyDoes}
            onChange={(v) => onUpdate({ whatCompanyDoes: v })} textarea placeholder="Describe your products/services..." rows={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Mission" id="mission" value={data.mission}
              onChange={(v) => onUpdate({ mission: v })} textarea placeholder="Your company's mission..." rows={2} />
            <Field label="Vision" id="vision" value={data.vision}
              onChange={(v) => onUpdate({ vision: v })} textarea placeholder="Your company's vision..." rows={2} />
          </div>
          <Field label="Business Scope" id="businessScope" value={data.businessScope}
            onChange={(v) => onUpdate({ businessScope: v })} placeholder="Local, regional, national, or global?" />
          <Field label="Main Objective" id="mainObjective" value={data.mainObjective}
            onChange={(v) => onUpdate({ mainObjective: v })} textarea placeholder="What's your primary business objective?" rows={2} />
        </motion.div>
      );

    case 1: // Business Model & Market
      return (
        <motion.div {...anim} key="p1" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Business Model & Market</h4>
          <Field label="Business Focus (services, products, or mix)" id="businessFocus" value={data.businessFocus}
            onChange={(v) => onUpdate({ businessFocus: v })} textarea placeholder="Describe your offerings..." rows={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Time in Market" id="timeInMarket" value={data.timeInMarket}
              onChange={(v) => onUpdate({ timeInMarket: v })} placeholder="e.g., 2 years" />
            <Field label="Average Customers/Month" id="monthlyCustomers" value={data.monthlyCustomers}
              onChange={(v) => onUpdate({ monthlyCustomers: v })} placeholder="e.g., 8-12" />
          </div>
          <Field label="Main Competitors" id="mainCompetitors" value={data.mainCompetitors}
            onChange={(v) => onUpdate({ mainCompetitors: v })} textarea placeholder="List your main competitors..." rows={3} />
          <Field label="Customer Reach (B2B, B2C, etc.)" id="customerReach" value={data.customerReach}
            onChange={(v) => onUpdate({ customerReach: v })} placeholder="B2B, B2C, or both" />
          <Field label="Sales Channels" id="salesChannels" value={data.salesChannels}
            onChange={(v) => onUpdate({ salesChannels: v })} textarea placeholder="How do you sell? Direct, referrals, online..." rows={2} />
          <Field label="Revenue Model" id="revenueModel" value={data.revenueModel}
            onChange={(v) => onUpdate({ revenueModel: v })} textarea placeholder="Project-based, retainers, subscriptions..." rows={2} />
          <Field label="Revenue Goal" id="revenueGoal" value={data.revenueGoal}
            onChange={(v) => onUpdate({ revenueGoal: v })} placeholder="e.g., $120,000 annual by end of 2026" />
        </motion.div>
      );

    case 2: // Financial Health
      return (
        <motion.div {...anim} key="p2" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Financial Health</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Current Gross Revenue" id="grossRevenue" value={data.grossRevenue}
              onChange={(v) => onUpdate({ grossRevenue: v })} placeholder="e.g., $45,000" />
            <Field label="Net Profit Margin (%)" id="netProfitMargin" value={data.netProfitMargin}
              onChange={(v) => onUpdate({ netProfitMargin: v })} placeholder="e.g., 25%" />
          </div>
          <Field label="Year-over-Year Growth" id="yoyGrowth" value={data.yoyGrowth}
            onChange={(v) => onUpdate({ yoyGrowth: v })} placeholder="e.g., 40% from 2024 to 2025" />
          <Field label="Sales Objectives & Timeframe" id="salesObjectives" value={data.salesObjectives}
            onChange={(v) => onUpdate({ salesObjectives: v })} textarea placeholder="Specific sales targets with deadlines..." rows={3} />
          <Field label="Key KPIs (most important)" id="keyKPIs" value={data.keyKPIs}
            onChange={(v) => onUpdate({ keyKPIs: v })} textarea placeholder="Client retention, MRR, CAC, conversion rate..." rows={3} />
        </motion.div>
      );

    case 3: // Product & Pricing
      return (
        <motion.div {...anim} key="p3" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Product & Pricing</h4>
          <Field label="Product Lifecycle Stage" id="productLifecycle" value={data.productLifecycle}
            onChange={(v) => onUpdate({ productLifecycle: v })} placeholder="e.g., Growth stage" />
          <Field label="Pricing Strategy" id="pricingStrategy" value={data.pricingStrategy}
            onChange={(v) => onUpdate({ pricingStrategy: v })} textarea placeholder="How do you price? Value-based, cost-plus..." rows={2} />
          <Field label="Main Product/Service Pricing" id="mainProductPrice" value={data.mainProductPrice}
            onChange={(v) => onUpdate({ mainProductPrice: v })} textarea placeholder="List services and their prices..." rows={4} />
          <Field label="Competitor Pricing" id="competitorPricing" value={data.competitorPricing}
            onChange={(v) => onUpdate({ competitorPricing: v })} textarea placeholder="What do competitors charge?" rows={3} />
          <Field label="Quality Assurance" id="qualityAssurance" value={data.qualityAssurance}
            onChange={(v) => onUpdate({ qualityAssurance: v })} textarea placeholder="How do you ensure quality?" rows={3} />
          <Field label="Expansion Plans" id="expansionPlans" value={data.expansionPlans}
            onChange={(v) => onUpdate({ expansionPlans: v })} textarea placeholder="Future products, services, or market expansion..." rows={3} />
        </motion.div>
      );

    case 4: // Brand Identity
      return (
        <motion.div {...anim} key="p4" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Brand Identity</h4>
          <Field label="Website Features (current or planned)" id="websiteFeatures" value={data.websiteFeatures}
            onChange={(v) => onUpdate({ websiteFeatures: v })} textarea placeholder="Portfolio, blog, booking, testimonials..." rows={3} />
          <Field label="Brand Key Messages" id="brandKeyMessages" value={data.brandKeyMessages}
            onChange={(v) => onUpdate({ brandKeyMessages: v })} textarea placeholder="Core messages your brand communicates..." rows={3} />
          <Field label="Brand Tone" id="brandTone" value={data.brandTone}
            onChange={(v) => onUpdate({ brandTone: v })} textarea placeholder="Friendly, professional, empowering, authentic..." rows={2} />
          <Field label="Brand Personality" id="brandPersonality" value={data.brandPersonality}
            onChange={(v) => onUpdate({ brandPersonality: v })} textarea placeholder="If your brand were a person, who would they be?" rows={3} />
          <Field label="Ideal Customer Profile" id="idealCustomer" value={data.idealCustomer}
            onChange={(v) => onUpdate({ idealCustomer: v })} textarea placeholder="Type, industry, age, location, pain points..." rows={4} />
          <Field label="Audience Segmentation" id="audienceSegmentation" value={data.audienceSegmentation}
            onChange={(v) => onUpdate({ audienceSegmentation: v })} textarea placeholder="Demographics, psychographics, behavioral..." rows={4} />
        </motion.div>
      );

    case 5: // Customer Journey & UVP
      return (
        <motion.div {...anim} key="p5" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Customer Journey & UVP</h4>
          <Field label="Customer Pain Points" id="customerPainPoints" value={data.customerPainPoints}
            onChange={(v) => onUpdate({ customerPainPoints: v })} textarea placeholder="What problems do your customers face?" rows={3} />
          <Field label="Key Problem Your Business Solves" id="keyProblemSolved" value={data.keyProblemSolved}
            onChange={(v) => onUpdate({ keyProblemSolved: v })} textarea placeholder="The core problem you solve..." rows={3} />
          <Field label="Unique Differentiator" id="uniqueDifferentiator" value={data.uniqueDifferentiator}
            onChange={(v) => onUpdate({ uniqueDifferentiator: v })} textarea placeholder="What makes you different from competitors?" rows={3} />
          <Field label="How You Communicate Your UVP" id="communicatingUVP" value={data.communicatingUVP}
            onChange={(v) => onUpdate({ communicatingUVP: v })} textarea placeholder="Channels and methods to share your value..." rows={3} />
          <Field label="Free Media Channels (organic)" id="freeMediaChannels" value={data.freeMediaChannels}
            onChange={(v) => onUpdate({ freeMediaChannels: v })} textarea placeholder="Instagram, LinkedIn, YouTube, email..." rows={3} />
          <Field label="Paid Advertising" id="paidAdvertising" value={data.paidAdvertising}
            onChange={(v) => onUpdate({ paidAdvertising: v })} textarea placeholder="Ad channels, budget allocation, goals..." rows={3} />
          <Field label="Personalization" id="personalization" value={data.personalization}
            onChange={(v) => onUpdate({ personalization: v })} textarea placeholder="How do you personalize for each customer?" rows={2} />
          <Field label="ROI Measurement" id="roiMeasurement" value={data.roiMeasurement}
            onChange={(v) => onUpdate({ roiMeasurement: v })} textarea placeholder="How do you track return on investment?" rows={2} />
          <Field label="Best ROI Campaign" id="bestROICampaign" value={data.bestROICampaign}
            onChange={(v) => onUpdate({ bestROICampaign: v })} textarea placeholder="Your most successful campaign and results..." rows={3} />
        </motion.div>
      );

    case 6: // Marketing Strategy
      return (
        <motion.div {...anim} key="p6" className="space-y-4">
          <h4 className="font-heading font-semibold text-foreground">Marketing Strategy & Analytics</h4>
          <Field label="Leads Per Year" id="leadsPerYear" value={data.leadsPerYear}
            onChange={(v) => onUpdate({ leadsPerYear: v })} placeholder="e.g., ~150 leads annually" />
          <Field label="Awareness Stage (lead capture)" id="awarenessStage" value={data.awarenessStage}
            onChange={(v) => onUpdate({ awarenessStage: v })} textarea placeholder="Content, lead magnets, social..." rows={3} />
          <Field label="Interest Stage (nurture)" id="interestStage" value={data.interestStage}
            onChange={(v) => onUpdate({ interestStage: v })} textarea placeholder="Email sequences, case studies, calls..." rows={3} />
          <Field label="Consideration Stage" id="considerationStage" value={data.considerationStage}
            onChange={(v) => onUpdate({ considerationStage: v })} textarea placeholder="Proposals, comparisons, ROI calculators..." rows={3} />
          <Field label="Decision Stage" id="decisionStage" value={data.decisionStage}
            onChange={(v) => onUpdate({ decisionStage: v })} textarea placeholder="Discounts, guarantees, payment plans..." rows={3} />
          <Field label="Post-Sale Support" id="postSaleSupport" value={data.postSaleSupport}
            onChange={(v) => onUpdate({ postSaleSupport: v })} textarea placeholder="Onboarding, check-ins, referral programs..." rows={3} />
          <Field label="Marketing Tests" id="marketingTests" value={data.marketingTests}
            onChange={(v) => onUpdate({ marketingTests: v })} textarea placeholder="A/B tests, experiments, results..." rows={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Marketing Budget" id="marketingBudget" value={data.marketingBudget}
              onChange={(v) => onUpdate({ marketingBudget: v })} placeholder="e.g., $6,000/year" />
            <Field label="Calendar Start Date" id="calendarStartDate" value={data.calendarStartDate}
              onChange={(v) => onUpdate({ calendarStartDate: v })} placeholder="e.g., 2026-02-14" />
          </div>
          <Field label="Analytics Tools" id="analyticsTools" value={data.analyticsTools}
            onChange={(v) => onUpdate({ analyticsTools: v })} textarea placeholder="GA4, Meta Business, CRM, etc." rows={2} />
          <Field label="Marketing KPIs" id="marketingKPIs" value={data.marketingKPIs}
            onChange={(v) => onUpdate({ marketingKPIs: v })} textarea placeholder="Website traffic, conversion rates, CAC..." rows={3} />
        </motion.div>
      );

    default:
      return null;
  }
}

// Field labels for display in packet confirmation summaries
export const PACKET_FIELD_LABELS: Record<number, Record<string, string>> = {
  0: {
    personalIntro: 'Introduction', name: 'Name', companyNameLocation: 'Company & Location',
    website: 'Website', socialMedia: 'Social Media', industry: 'Industry',
    whatCompanyDoes: 'What You Do', mission: 'Mission', vision: 'Vision',
    businessScope: 'Scope', mainObjective: 'Main Objective',
  },
  1: {
    businessFocus: 'Business Focus', timeInMarket: 'Time in Market',
    mainCompetitors: 'Competitors', monthlyCustomers: 'Monthly Customers',
    customerReach: 'Customer Reach', salesChannels: 'Sales Channels',
    revenueModel: 'Revenue Model', revenueGoal: 'Revenue Goal',
  },
  2: {
    grossRevenue: 'Gross Revenue', netProfitMargin: 'Net Profit Margin',
    yoyGrowth: 'YoY Growth', salesObjectives: 'Sales Objectives', keyKPIs: 'Key KPIs',
  },
  3: {
    productLifecycle: 'Product Stage', pricingStrategy: 'Pricing Strategy',
    mainProductPrice: 'Product Pricing', competitorPricing: 'Competitor Pricing',
    qualityAssurance: 'Quality Assurance', expansionPlans: 'Expansion Plans',
  },
  4: {
    websiteFeatures: 'Website Features', brandKeyMessages: 'Key Messages',
    brandTone: 'Brand Tone', brandPersonality: 'Brand Personality',
    idealCustomer: 'Ideal Customer', audienceSegmentation: 'Segmentation',
  },
  5: {
    customerPainPoints: 'Pain Points', keyProblemSolved: 'Problem Solved',
    uniqueDifferentiator: 'Differentiator', communicatingUVP: 'UVP Communication',
    freeMediaChannels: 'Organic Channels', paidAdvertising: 'Paid Ads',
    personalization: 'Personalization', roiMeasurement: 'ROI Measurement',
    bestROICampaign: 'Best Campaign',
  },
  6: {
    leadsPerYear: 'Leads/Year', awarenessStage: 'Awareness', interestStage: 'Interest',
    considerationStage: 'Consideration', decisionStage: 'Decision',
    postSaleSupport: 'Post-Sale', marketingTests: 'Marketing Tests',
    marketingBudget: 'Budget', analyticsTools: 'Analytics', calendarStartDate: 'Start Date',
    marketingKPIs: 'KPIs',
  },
};

export function getPacketAnswers(packetIndex: number, data: ExtendedQuestionnaireData): Record<string, string> {
  const labels = PACKET_FIELD_LABELS[packetIndex] || {};
  const result: Record<string, string> = {};
  for (const key of Object.keys(labels)) {
    result[key] = (data as any)[key] || '';
  }
  return result;
}
